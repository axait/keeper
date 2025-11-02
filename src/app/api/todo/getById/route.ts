import connectToDB from "@/lib/connectToDB";
import { logError, logErrorSerious, logProcessing, logSuccess } from "@/lib/log";
import { responseFailure, responseSuccess } from "@/lib/response";
import { todoModel } from "@/models/todo.model";


export async function POST(req: Request) {
    // here todoId is _id of todo collection.
    try {
        await connectToDB();

        const userId = req.headers.get("x-user-id");
        if (!userId) {
            return responseFailure("Login Please!",)
        }

        logProcessing(`Processing Todo Fetching ...`)
        // 
        const { todoId } = await req.json();
        if (!todoId) {
            logError("TodoId is not given",)
            return responseFailure("TodoId is not given",)
        }

        const existingTodo = await todoModel.findById(todoId);
        if (!existingTodo) {
            logError("Todo does not exist");
            return responseFailure("Todo does not exist");
        }

        if (existingTodo.createdBy !== userId) {
            logError(`UnAuthorized request  to Get todo: ${existingTodo.todoId}`);
            logError(`Todo: ${existingTodo.todoId} is owned by User: ${userId}`);
            return responseFailure("You are not authorized to get this todo");
        }

        logSuccess(`Todo sended: ${existingTodo._id}`)


        return responseSuccess(`Todo Fetched succesfully ${existingTodo._id}`, existingTodo);


    } catch (error) {
        logErrorSerious(`ERROR: ${error}`)
        return responseFailure(`Error occured. ${error}`)
    }
}