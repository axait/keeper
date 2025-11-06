import connectToDB from "@/lib/connectToDB";
import { logErrorSerious, logInfo, logSuccess } from "@/lib/log";
import { responseFailure, responseSuccess } from "@/lib/response";
import { categoryModel } from "@/models/category.model";

export async function POST(req: Request) {

    const userId = req.headers.get("x-user-id");
    if (!userId) {
        return responseFailure("Login Please!");
    }

    const { categoryId, categoryName, categoryDescription } = await req.json();
    if (!categoryId || !categoryName || !categoryDescription) {
        return responseFailure("InComplete Credentials");
    }

    try {
        await connectToDB();
        
        const existingCategory = await categoryModel.findById(categoryId);
        if (!existingCategory) {
            return responseFailure("Category does not exist");
        }
        logInfo(`Updating category ...`);

        await existingCategory.updateOne({
            title: categoryName,
            description: categoryDescription,
            isDefault: false
        });
        existingCategory.save();

        logSuccess(`Category Updated Successfully: ${existingCategory._id}`);

        const updatedCategory = await categoryModel.findById(existingCategory._id);
        return responseSuccess("Category Updated Successfully", updatedCategory);
        
    } catch (error) {
        logErrorSerious(error);
        return responseFailure("Internal Server Error");
    }
}

