
// ⁡⁢⁣⁣​‌‍‌𝘵𝘩𝘪𝘴 𝘸𝘢𝘴 𝘸𝘳𝘪𝘵𝘵𝘯𝘦𝘯 𝘣𝘺 𝘢𝘪 𝘴𝘰 𝘷𝘦𝘳𝘪𝘧𝘺 𝘢𝘯𝘥 𝘦𝘥𝘪𝘵 𝘪𝘵.​⁡




import connectToDB from "@/src/lib/connectToDB";
import { myVerifyJwt } from "@/src/lib/jwt";
import { logError, logInfo, logMe } from "@/src/lib/log";
import { responseFailure, responseSuccess } from "@/src/lib/response";
import { sessionModel } from "@/src/models/session.model";

export async function POST(req: Request) {
    try {
        await connectToDB();

        const { token } = await req.json()
        
        const data = await myVerifyJwt(token)
        
        if (!data.valid) {
            logError("Invalid Token")
            return responseFailure("InValid token.",)
        }
        
        // FIXME: fix the type of returning of myVerifyJwt like error occured below.
        if (!data.payload?.sessionId) {
            logError("No SessionId is given",)
            return responseFailure("No SessionId is given",)
        }
        
        const existingSession = await sessionModel.findOneAndDelete({ data.payload.sessionId });
        if (!existingSession) {
            logError("Session does not exist.");
            return responseFailure("Session does not exist.");
        }

        logInfo("Session Deleted:")
        logInfo(`\tSessionId: ${existingSession.sessionId}`)
        logInfo(`\tUserId: ${existingSession.userId}`)


        return responseSuccess(`Session deleted succesfully ${existingSession.sessionId} : ${existingSession.userId}`, {});


    } catch (error) {
        console.log(`ERROR: ${error}`)
        return responseFailure(`Error occured. `)
    }
}
