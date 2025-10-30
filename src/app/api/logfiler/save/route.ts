// logfiler/save/route.ts

import connectToDB from "@/lib/connectToDB";
import { logError, logInfo } from "@/lib/log";
import { responseFailure, responseSuccess } from "@/lib/response";
import { logsfilerModel } from "@/models/logsfiler.model";

interface logsQueueType {
    message: string;
    time: string;
    status: "info" | "success" | "error" | "warning" | "errorserious";
}

const SECRET_CODE = process.env.SECRET_CODE;

if (!SECRET_CODE) {
    throw new Error("SECRET_CODE is not defined");
}

export async function POST(req: Request) {
    // TODO: remove the queue feature for now bcz it is not being used and for now it is difficulkt for me. add this feature later.

    try {
        await connectToDB();

        const { secretCode: secretCodeFrontend, logsqueue: logsQueue } = await req.json();

        logInfo(`SecretCodeFrontend: ${secretCodeFrontend}`)
        if (!(secretCodeFrontend === SECRET_CODE)) {
            logError("SECRET_CODE does not match");
            return responseFailure("secretCode failure.");
        }

        logInfo(`Logs Queue: ${JSON.stringify(logsQueue)}`)


        // checking whther queue is given or not
        if (!logsQueue || logsQueue.length === 0) {
            return responseFailure("No logs to save",);
        }

        // Verify the logsQueue structure
        for (const log of logsQueue) {
            if (
                typeof log !== "object" ||
                typeof log.message !== "string" ||
                typeof log.time !== "string" ||
                !["info", "success", "error", "warning", "errorserious"].includes(log.status)
            ) {
                logError("Invalid logsQueue structure",);
                return responseFailure("Invalid logsQueue structure",);
            }
        }

        const logsToSave = logsQueue.map((log: logsQueueType) => ({
            message: log.message,
            time: log.time,
            status: log.status,
        }));

        await logsfilerModel.insertMany(logsToSave);

        logInfo(`${logsToSave.length} Logs saved successfully`);
        return responseSuccess(`${logsToSave.length} Logs saved successfully`, {});

    } catch (error) {
        console.log(`[!!] ERROR: ${error}`);
        return responseFailure(`Error occured. ${error}`);
    }
}


// [{ 'message': 'Server started successfully', 'time': '12:01:45 30/10/2025', 'status': 'success' }]