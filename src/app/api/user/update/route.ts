import connectToDB from "@/lib/connectToDB";
import { logMe } from "@/lib/log";
import { responseFailure, responseSuccess } from "@/lib/response";
import { userModel } from "@/models/user.model";
// import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        await connectToDB();

        // name: name,
        // email: email,
        // password: password
        const { userId, email, name, password } = await req.json()


        if (!userId || !email || !name || !password) {
            return responseFailure("InComplete Data is given",)
        }

        const existingUser = await userModel.findOne({ userId }, "-password");
        if (!existingUser) {
            return responseFailure("User does not exist");
        }

        existingUser.email = email
        existingUser.name = name
        existingUser.password = password
        existingUser.save()

        logMe(existingUser)

        return responseSuccess(`User Detail succesfully ${existingUser.userId} ${existingUser.email}`, existingUser);


    } catch (error) {
        console.log(`ERROR: ${error}`)
        return responseFailure(`Error occured. ${error}`)
    }
}