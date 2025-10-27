import connectToDB from "@/src/lib/connectToDB";
import { logMe } from "@/src/lib/log";
import { responseFailure, responseSuccess } from "@/src/lib/response";
import { userModel } from "@/src/models/user.model";
import { sessionModel } from "@/src/models/session.model";
import { mySignJwt, myVerifyJwt } from "@/src/lib/jwt";
import { v6 as uuidv6 } from "uuid";
// import { NextResponse } from "next/server"


const jwtSecretKey = new TextEncoder().encode(process.env.JWT_SECRET);
const alg: string = "HS256";

if (!jwtSecretKey) {
    throw new Error("JWT_SECRET is not defined")
}


export async function POST(req: Request) {
    try {
        await connectToDB();

        const { email, password } = await req.json()

        // DebugMe
        logMe(email)
        logMe(password)


        if (!email || !password) {
            return responseFailure("InComplete User Credentials",)
        }

        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return responseFailure("User does not exist");
        }

        if (email !== existingUser.password) {
            return responseFailure("InValid Credentials")
        }

        logMe("User has been verified")
        
        logMe("Generating sessionId")
        const sessionId = uuidv6();
        // FIXME: save sessionId in database .

        // DebugMe
        logMe("User Logged In:")
        logMe(`\t${existingUser.email}`)
        logMe(`\t${existingUser.password}`)


        const now = Math.floor(Date.now() / 1000);
        

        const dataToSign = {
            userId: existingUser.userId,
            email: existingUser.email,
            sessionId: sessionId,
            iat: now,
            exp: now + 60  // 60seconds life
        }

        const token = await mySignJwt(dataToSign);
        logMe(token)

        // const verificationResult = await myVerifyJwt(token);
        // logMe(JSON.stringify(verificationResult, null, 2));

        return responseSuccess(`Logged In succesfully ${existingUser.email}`, { token });


    } catch (error) {
        console.log(`ERROR: ${error}`)
        return responseFailure(`Error occured. ${error}`)
    }
}

function uuid4() {
    throw new Error("Function not implemented.");
}
