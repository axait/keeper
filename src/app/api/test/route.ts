import connectToDB from "@/src/lib/connectToDB";
import { myVerifyJwt } from "@/src/lib/jwt";
import { logMe } from "@/src/lib/log";
import { responseFailure, responseSuccess } from "@/src/lib/response";

// ⁡⁢⁢⁢THIS CODE HAS BEEN PASSED AND WORKING⁡

export async function POST(req: Request) {
    try {
        await connectToDB();

        const { token } = await req.json();

        logMe("T: ",token)
        const result = await myVerifyJwt(`${token}`);

        // if (!valid) {
        //     return responseFailure("Invalid token");
        // }

        return responseSuccess(`${result.valid} ${result.payload}`, {result});

    } catch (error) {
        console.log(`ERROR: ${error}`);
        return responseFailure(`Error occured.`);
    }
}
