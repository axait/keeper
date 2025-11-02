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

        const allCategories = await categoryModel.find({ createdBy: userId });

        logSuccess(`Toall  ${allCategories} Categories`);

        return responseSuccess("Category Updated Successfully", allCategories);
    } catch (error) {
        logErrorSerious(error);
        return responseFailure("Internal Server Error");
    }
}

