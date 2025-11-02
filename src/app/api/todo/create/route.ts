import connectToDB from "@/lib/connectToDB";
import { logError, logErrorSerious, logInfo, logSuccess } from "@/lib/log";
import { responseFailure, responseSuccess } from "@/lib/response";
import { categoryModel } from "@/models/category.model";
import { todoModel } from "@/models/todo.model";

export async function POST(req: Request) {

    await connectToDB();
    const userId = req.headers.get("x-user-id");
    if (!userId) {
        logError("Login Please!");
        return responseFailure("Login Please!");
    }

    const { parentCategoryId, todoName, todoDescription } = await req.json();
    if (
        !parentCategoryId ||
        typeof parentCategoryId !== "string" ||
        !todoName ||
        !todoDescription
    ) {
        logError("InComplete or Wrong Credentials");
        return responseFailure("InComplete or Wrong Credentials");
    }

    // check whther parentCategoryId exist or not
    const parentCategory = await categoryModel.findById(parentCategoryId);
    if (!parentCategory) {
        logError("Parent Category does not exist");
        return responseFailure("Parent Category does not exist");
        
    }

    // creating todo
    logInfo(`Creating todo: ${todoName}`);
    try {
        const newTodo = await todoModel.create({
            parentCategoryId: parentCategoryId,
            title: todoName,
            description: todoDescription,
            createdBy: userId,
        });

        logSuccess(`Todo Created Successfully: ${newTodo._id}`);
        return responseSuccess("Todo Created Successfully", newTodo);
        
    } catch (error) {
        logErrorSerious(error);
        return responseFailure("Internal Server Error");
    }
}

