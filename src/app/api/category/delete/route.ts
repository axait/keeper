import connectToDB from "@/lib/connectToDB";
import { logError, logErrorSerious, logMe, logSuccess } from "@/lib/log";
import { responseFailure, responseSuccess } from "@/lib/response";
import { categoryModel } from "@/models/category.model";


export async function DELETE(req: Request) {
    // here categoryId is _id of category collection.
    try {
        await connectToDB();

        const userId = req.headers.get("x-user-id");
        if (!userId) {
            return responseFailure("Login Please!",)
        }

        const { categoryId } = await req.json();
        if (!categoryId) {
            logError("CategoryId is not given",)
            return responseFailure("InComplete Data is given",)
        }

        const existingCategory = await categoryModel.findById(categoryId, "title sessionId createdBy");
        if (!existingCategory) {
            return responseFailure("Category does not exist");
        }

        if (existingCategory.createdBy !== userId) {
            logError(`UnAuthorized request  to delete the category: ${existingCategory.categoryId} by user: ${userId}`);
            return responseFailure("You are not authorized to delete this category");
        }

        await categoryModel.findByIdAndDelete(categoryId)

        logSuccess(`Deleted category: ${existingCategory._id}`)


        return responseSuccess(`Category deleted succesfully ${existingCategory._id}`, {});


    } catch (error) {
        logErrorSerious(`ERROR: ${error}`)
        return responseFailure(`Error occured. ${error}`)
    }
}