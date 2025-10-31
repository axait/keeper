import connectToDB from "@/lib/connectToDB";
import { logData } from "@/lib/log";
import { responseFailure, responseSuccess } from "@/lib/response";
import { userModel } from "@/models/user.model";

export async function GET(req: Request) {
    try {
        await connectToDB();

        const url = new URL(req.url);
        const userId = url.searchParams.get("id");
        if (!userId) {
            return responseFailure("No UserId is given in the query string",)
        }

        const existingUser = await userModel.findOne({ userId });
        if (!existingUser) {
            return responseFailure("User does not exist");
        }

        const verifiedUser = await userModel.findOneAndUpdate(
            { userId },
            { status: "verified" },
            { new: true }
        )

        logData(verifiedUser)

        return responseSuccess(`Email verified successfully ${existingUser.userId} ${existingUser.email}`, verifiedUser)

    } catch (error) {
        console.log(`ERROR: ${error}`)
        return responseFailure(`Error occured. ${error}`)
    }
}
