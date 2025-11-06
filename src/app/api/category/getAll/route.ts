import connectToDB from "@/lib/connectToDB";
import { logErrorSerious, logInfo, logSuccess } from "@/lib/log";
import { responseFailure, responseSuccess } from "@/lib/response";
import { categoryModel } from "@/models/category.model";

export async function POST(req: Request) {

    const userId = req.headers.get("x-user-id");
    if (!userId) {
        return responseFailure("Login Please!");
    }

    try {
        logInfo(`Fetching all categories ...`);
        await connectToDB();

        const allCategory = await categoryModel.find({ createdBy: userId });

        logSuccess(`Toall  ${allCategory.length} Categories`);

        return responseSuccess("Category Updated Successfully", allCategory);
    } catch (error) {
        logErrorSerious(error);
        return responseFailure("Internal Server Error");
    }
}

