import connectToDB from "@/lib/connectToDB";
import { logMe } from "@/lib/log";
import { responseFailure, responseSuccess } from "@/lib/response";
import { userModel } from "@/models/user.model";
// import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        await connectToDB();
        
        const { userId  } = await req.json()
        
        
        if (!userId) {
            return responseFailure("No UserId is given",)
        }
        
        const existingUser = await userModel.findOne({ userId }, "-password");
        if (!existingUser) {
            return responseFailure("User does not exist");
        }

        logMe(existingUser)

        return responseSuccess(`User Detail succesfully ${existingUser.userId} ${existingUser.email}`, existingUser);


    } catch (error) {
        console.log(`ERROR: ${error}`)
        return responseFailure(`Error occured. ${error}`)
    }
}