import connectToDB from "@/src/lib/connectToDB";
import { SignJWT } from "jose";
import { logMe } from "@/src/lib/log";
import { responseFailure, responseSuccess } from "@/src/lib/response";
import { userModel } from "@/src/models/user.model";
import { sessionModel } from "@/src/models/session.model";
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

        // DebugMe
        logMe("User Logged In:")
        logMe(`\t${existingUser.email}`)
        logMe(`\t${existingUser.password}`)

        const now = Math.floor(Date.now() / 1000);
        
        const dataToSign = {
            userId: existingUser.userId,
            email: existingUser.email,
            iat: now ,
            exp: now + 60  // 60seconds life
        }
        const dataToSignJson = JSON.stringify(dataToSign);
        logMe(dataToSignJson);
        const token = jwt.sign(dataToSignJson, "jwtSecretKey", { exp: 60 * 60 })
        logMe(jwtSecretKey)
        logMe(token)

        logMe(jwt.verify(token, "jwtSecretKey"))


        // localStorage.setItem("token", token)

        FIXME: delete existingUser.password

        return responseSuccess(`Logged In succesfully ${existingUser.email}`, { userDetail: existingUser, token });


    } catch (error) {
        console.log(`ERROR: ${error}`)
        return responseFailure(`Error occured. ${error}`)
    }
}