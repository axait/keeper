import connectToDB from "@/lib/connectToDB";
import { logError, logErrorSerious, logProcessing, logSuccess } from "@/lib/log";
import { responseFailure, responseSuccess } from "@/lib/response";
import { categoryModel } from "@/models/category.model";


export async function POST(req: Request) {
    // here categoryId is _id of category collection.
    try {
        await connectToDB();

        const userId = req.headers.get("x-user-id");
        if (!userId) {
            return responseFailure("Login Please!",)
        }

        logProcessing(`Processing Category Fetching ...`)
        const { categoryId } = await req.json();
        if (!categoryId) {
            logError("CategoryId is not given",)
            return responseFailure("CategoryId is not given",)
        }

        const existingCategory = await categoryModel.findById(categoryId);
        if (!existingCategory) {
            logError("Category does not exist");
            return responseFailure("Category does not exist");
        }

        if (existingCategory.createdBy !== userId) {
            logError(`UnAuthorized request  to Get category: ${existingCategory.categoryId}`);
            logError(`Category: ${existingCategory.categoryId} is owned by User: ${userId}`);
            return responseFailure("You are not authorized to get this category");
        }

        logSuccess(`Category sended: ${existingCategory._id}`)


        return responseSuccess(`Category Fetched succesfully ${existingCategory._id}`, existingCategory);


    } catch (error) {
        logErrorSerious(`ERROR: ${error}`)
        return responseFailure(`Error occured. ${error}`)
    }
}