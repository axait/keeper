import connectToDB from "@/lib/connectToDB";
import { logError, logErrorSerious, logSuccess } from "@/lib/log";
import { responseFailure, responseSuccess } from "@/lib/response";
import { todoModel } from "@/models/todo.model";


export async function DELETE(req: Request) {
    // here todoId is _id of todo collection.
    try {
        await connectToDB();

        const userId = req.headers.get("x-user-id");
        if (!userId) {
            return responseFailure("Login Please!",)
        }

        const { todoId } = await req.json();
        if (!todoId) {
            logError("TodoId is not given",)
            return responseFailure("InComplete Data is given",)
        }

        const existingTodo = await todoModel.findById(todoId, "title createdBy");
        if (!existingTodo) {
            return responseFailure("Todo does not exist");
        }

        if (existingTodo.createdBy !== userId) {
            logError(`UnAuthorized request  to delete the todo: ${existingTodo.todoId} by User: ${userId}`);
            return responseFailure("You are not authorized to delete this todo");
        }
        
        await todoModel.findByIdAndDelete(todoId)

        logSuccess(`Deleted todo: ${existingTodo._id}`)


        return responseSuccess(`Todo deleted succesfully ${existingTodo._id}`, {});


    } catch (error) {
        logErrorSerious(`ERROR: ${error}`)
        return responseFailure(`Error occured. ${error}`)
    }
}