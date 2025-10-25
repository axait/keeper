import connectToDB from "@/src/lib/connectToDB";
import { responseFailure, responseSuccess } from "@/src/lib/response";
import { userModel } from "@/src/models/user.model";
import { v4 as uuidv4 } from "uuid";
// import { NextResponse } from "next/server"

// export interface IUser extends Document {
//     userId: string;
//     name: string;
//     email: string;
//     password: string;
//     status: "verified" | "unverified" | "deleted" | "blocked";
//     createdAt: Date;
//     updatedAt: Date;
// }


export async function POST(req: Request) {
    try {
        await connectToDB();
        
        const { name, email, password } = await req.json()


        if (!name || !email || !password) {
            return responseFailure("InComplete Data",)
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return responseFailure("User already exists with this email.");
        }

        const instance = await new userModel({
            userId: uuidv4(),
            name: name,
            email: email,
            password: password
        })
        instance.save()

        return responseSuccess(`User create with email folloqing detail: ${name} ${email}`, {});


    } catch (error) {
        console.log(`ERROR: ${error}`)
        return responseFailure(`Error occured. ${error}`)
    }
}