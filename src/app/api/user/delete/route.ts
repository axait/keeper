import connectToDB from "@/lib/connectToDB";
import { logMe } from "@/lib/log";
import { responseFailure, responseSuccess } from "@/lib/response";
import { userModel } from "@/models/user.model";
// import { NextResponse } from "next/server"


export async function DELETE(req: Request) {
    try {
        await connectToDB();
        
        const userId = await req.headers.get("x-user-id");
        
        
        if (!userId) {
            return responseFailure("No UserId is given",)
        }
        
        const existingUser = await userModel.findOne({ userId }, "-password");
        if (!existingUser) {
            return responseFailure("User does not exist");
        }
        
        await userModel.deleteOne({ userId })
        logMe("User Deleted:")
        logMe(`\tUserId: ${existingUser.userId}`)
        logMe(`\tEmail: ${existingUser.email}`)


        return responseSuccess(`User deleted succesfully ${existingUser.userId} ${existingUser.email}`, {});


    } catch (error) {
        console.log(`ERROR: ${error}`)
        return responseFailure(`Error occured. ${error}`)
    }
}