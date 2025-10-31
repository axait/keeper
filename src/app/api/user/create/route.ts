import connectToDB from "@/lib/connectToDB";
import { logMe } from "@/lib/log";
import { responseFailure, responseSuccess } from "@/lib/response";
import { userModel } from "@/models/user.model";
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
            return responseFailure("User already exists.");
        }

        const instance = await new userModel({
            userId: uuidv4(),
            name: name,
            email: email,
            level: "normal",
            password: password
        })
        instance.save()

        logMe(`User Created:`)
        logMe(`\t ${instance.email}`)
        logMe(`\t ${instance.password}`)

        return responseSuccess(`Account created successfully Email: ${email}`, {});


    } catch (error) {
        console.log(`ERROR: ${error}`)
        return responseFailure(`Error occured. ${error}`)
    }
}