import { logError, logErrorSerious, logInfo, logProcessing, logSuccess } from "@/lib/log";
import { responseFailure, responseSuccess } from "@/lib/response";
import { todoModel } from "@/models/todo.model";

export async function POST(req: Request) {

    const userId = req.headers.get("x-user-id");
    const { parentCategoryId } = await req.json();

    // checking if userId is given or not.
    if (!userId) {
        logError("Login Please!");
        return responseFailure("Login Please!");
    }

    // checking if parentCategoryId is given or not.
    if (!parentCategoryId) {
        logError("InComplete data is given");
        return responseFailure("Icomplete data is given");
    }

    try {
        logProcessing(`Fetching all todos of parentCategoryId: ${parentCategoryId} ...`);

        const allTodo = await todoModel.find({ parentCategoryId, createdBy: userId });

        logSuccess(`Total  ${allTodo.length} Todo`);

        return responseSuccess(`Total ${allTodo.length} Todos fetched Successfully`, allTodo);
        
    } catch (error) {
        logErrorSerious(error);
        return responseFailure("Internal Server Error");
    }
}

