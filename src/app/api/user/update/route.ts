import connectToDB from "@/lib/connectToDB";
import { logError, logSuccess } from "@/lib/log";
import { responseFailure, responseSuccess } from "@/lib/response";
import { userModel } from "@/models/user.model";
// import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        await connectToDB();

        // name: name,
        // email: email,
        // password: password
        
        const userId = await req.headers.get("x-user-id");
        const { email, name, password:newPassword } = await req.json()


        if (!userId || !email || !name || !newPassword) {
            logError("InComplete Data is given",)
            return responseFailure("InComplete Data is given",)
        }

        const existingUser = await userModel.findOne({ userId }, "-password");
        if (!existingUser) {
            logError("User does not exist");
            return responseFailure("User does not exist");
        }

        existingUser.email = email
        existingUser.name = name
        existingUser.password = newPassword
        existingUser.save()

        // logMe(existingUser)

        logSuccess(`User Detail succesfully ${existingUser.userId} ${existingUser.email}`);
        const { password, ...userDetail } = existingUser.toObject();
        return responseSuccess(`User Detail succesfully ${userDetail.userId} ${userDetail.email}`, userDetail);


    } catch (error) {
        console.log(`ERROR: ${error}`)
        return responseFailure(`Error occured. ${error}`)
    }
}