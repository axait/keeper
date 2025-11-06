import connectToDB from "@/lib/connectToDB";
import { logError, logErrorSerious, logProcessing, logSuccess } from "@/lib/log";
import { responseFailure, responseSuccess } from "@/lib/response";
import { todoModel } from "@/models/todo.model";

export async function POST(req: Request) {

    await connectToDB();
    
    const userId = req.headers.get("x-user-id");
    let parentCategoryId: string = '';

    try {
        const { parentCategoryId: parentId } = await req.json();
        parentCategoryId = parentId;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.message.includes("Unexpected end of JSON input")) {
            parentCategoryId = "";
        }
    }

    // checking if userId is given or not.
    if (!userId) {
        logError("Login Please!");
        return responseFailure("Login Please!");
    }

    try {
        logProcessing(`Fetching all todos of parentCategoryId: ${parentCategoryId || "All Categories"} ...`);

        const filter: { createdBy: string, parentCategoryId?: string } = { createdBy: userId };
        if (parentCategoryId) filter.parentCategoryId = parentCategoryId;

        const allTodo = await todoModel.find(filter).sort({ _id: -1 });

        logSuccess(`Total  ${allTodo.length} Todo`);

        return responseSuccess(`Total ${allTodo.length} Todos fetched Successfully`, allTodo);

    } catch (error) {
        logErrorSerious(error);
        return responseFailure("Internal Server Error");
    }
}

