import { logError, logErrorSerious, logInfo, logSuccess } from "@/lib/log";
import { responseFailure, responseSuccess } from "@/lib/response";
import { todoModel } from "@/models/todo.model";

export async function POST(req: Request) {

    const userId = req.headers.get("x-user-id");
    if (!userId) {
        logError("Login Please!");
        return responseFailure("Login Please!");
    }

    const { todoId, todoName, todoDescription, isComplete } = await req.json();
    if (!todoId || !todoName || !todoDescription || typeof isComplete !== "boolean") {
        logError("InComplete Credentials");
        return responseFailure("InComplete Credentials");
    }

    try {
        // checking whther already todo exist or not
        const existingTodo = await todoModel.findById(todoId);
        if (!existingTodo) {
            logError("Todo does not exist");
            return responseFailure("Todo does not exist");
        }

        logInfo(`Updating todo ...`);
        await existingTodo.updateOne({
            title: todoName,
            description: todoDescription,
            isComplete: isComplete
        });
        existingTodo.save();

        logSuccess(`Todo Updated Successfully: ${existingTodo._id}`);
        const updatedTodo = await todoModel.findById(existingTodo._id);
        return responseSuccess("Todo Updated Successfully", updatedTodo);
    } catch (error) {
        logErrorSerious(error);
        return responseFailure("Internal Server Error");
    }
}

