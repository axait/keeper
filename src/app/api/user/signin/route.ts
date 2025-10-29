import connectToDB from "@/src/lib/connectToDB";
import { logData, logError, logInfo, logMe, logProcessing, logSuccess } from "@/src/lib/log";
import { responseFailure, responseSuccess } from "@/src/lib/response";
import { userModel } from "@/src/models/user.model";
import { mySignJwt } from "@/src/lib/jwt";
import { mySessionVerifierCreator } from "@/src/lib/sessionVerifierCreator";


const jwtSecretKey = new TextEncoder().encode(process.env.JWT_SECRET);

if (!jwtSecretKey) {
    throw new Error("JWT_SECRET is not defined")
}


export async function POST(req: Request) {
    try {
        await connectToDB();

        const { email, password } = await req.json()

        // DebugMe
        logInfo("User in req to Sign In:")
        logMe(email)
        logMe(password)

        // verifying whther user exist or not
        if (!email || !password) {
            logError("InComplete User Credentials",);
            return responseFailure("InComplete User Credentials",)
        }

        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            logError("User does not exist");;
            return responseFailure("User does not exist");
        }

        if (password !== existingUser.password) {
            logError("InValid Credentials");
            return responseFailure("InValid Credentials")
        }

        logSuccess("User has been VERIFIED")
        // ----------------------------------------------------------------------------------

        logProcessing("Generating sessionId...")

        // Creating user session if user already does not have any sessionId. it
        const sessionId = await mySessionVerifierCreator(existingUser.userId);




        // DebugMe
        logInfo("User Logged In:")
        logInfo(`\t${existingUser.email}`)
        logInfo(`\t${existingUser.password}`)


        const now = Math.floor(Date.now() / 1000);


        logData("session: " + sessionId)

        const token = await mySignJwt({
            userId: existingUser.userId,
            email: existingUser.email,
            sessionId: sessionId,
            iat: now,
            exp: now + 60  // 60seconds life
        });
        logData("TOKEN: " + token)

        // const verificationResult = await myVerifyJwt(token);
        // logMe(JSON.stringify(verificationResult, null, 2));

        return responseSuccess(`Logged In succesfully`, { token });


    } catch (error) {
        console.log(`ERROR: ${error}`)
        logError(`ERROR: ${error}`)
        return responseFailure(`Error occured.`)
    }
}


// async function checkCreateSession(userId) {
//     console.log(userId)
// }
