// logfiler/get/route.ts

import connectToDB from "@/lib/connectToDB";
import { logError, logSuccess } from "@/lib/log";
import { responseFailure, responseSuccess } from "@/lib/response";
import { logsfilerModel } from "@/models/logsfiler.model";


const SECRET_LOGS_CODE = process.env.SECRET_LOGS_CODE;

if (!SECRET_LOGS_CODE) {
    throw new Error("SECRET_CODE is not defined");
}


export async function POST(req: Request) {
    const { continuationId, secretCodeForLogs } = await req.json();
    const userLevel = await req.headers.get("x-user-level");

    if (!secretCodeForLogs || secretCodeForLogs !== SECRET_LOGS_CODE) {
        logError("Invalid secret code for logs");
        return responseFailure("w**!");
    }

    if (!userLevel || userLevel !== "admin") {
        logError("User is not Admin");
        return responseFailure("Hello Normal User");
    }

    try {
        await connectToDB();

        let logs;
        if (continuationId) {
            logs = await logsfilerModel.find({ _id: { $gt: continuationId } }).limit(100);
        } else {
            logs = await logsfilerModel.find({}).sort({ _id: -1 }).limit(100);
        }

        logSuccess("Logs retrieved successfully");
        return responseSuccess("Logs retrieved successfully", logs);

    } catch (error) {
        console.log(`ERROR: ${error}`);
        return responseFailure(`Error occured. ${error}`);
    }
}
