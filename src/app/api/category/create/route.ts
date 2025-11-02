import connectToDB from "@/lib/connectToDB";
import { logErrorSerious, logInfo, logSuccess } from "@/lib/log";
import { responseFailure, responseSuccess } from "@/lib/response";
import { categoryModel } from "@/models/category.model";

export async function POST(req: Request) {
    
    await connectToDB();
    const userId = req.headers.get("x-user-id");
    if (!userId) {
        return responseFailure("Login Please!");
    }
    
    const { categoryName, categoryDescription, isDefault } = await req.json();
    if (!categoryName || !categoryDescription) {
        return responseFailure("InComplete Credentials");
    }

    logInfo(`Creating category: ${categoryName}`);

    try {
        const newCategory = await categoryModel.create({
            title: categoryName,
            description: categoryDescription,
            createdBy: userId,
            isDefault: !!isDefault || false
        });

        logSuccess(`Category Created Successfully: ${newCategory._id}`);
        return responseSuccess("Category Created Successfully", newCategory);
    } catch (error) {
        logErrorSerious(error);
        return responseFailure("Internal Server Error");
    }
}

