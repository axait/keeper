import connectToDB from "@/src/lib/connectToDB";
import { myVerifyJwt } from "@/src/lib/jwt";
import { logError, logErrorSerious, logInfo } from "@/src/lib/log";
import { responseFailure, responseSuccess } from "@/src/lib/response";
import { sessionModel } from "@/src/models/session.model";


/**
 * @route   POST /api/user/signout
 * @summary Logs out a user by verifying their JWT and deleting their active session.
 *
 * @description
 * This endpoint:
 * 1. Connects to MongoDB.
 * 2. Extracts and verifies the JWT token provided in the request body.
 * 3. Ensures a valid `sessionId` exists in the decoded token.
 * 4. Deletes the user's session record from the database.
 * 5. Returns a success or failure response based on the outcome.
 *
 * @param {Request} req - The incoming HTTP request object.
 * @returns {Promise<Response>} - A promise that resolves to a JSON response.
 *
 * @example
 *  Example Request Body:
 * {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 *
 * @example
 *  Example Success Response:
 * {
 *   "success": true,
 *   "message": "Session deleted successfully 12345 : 67890",
 *   "data": {}
 * }
 *
 * @example
 *  Example Failure Response:
 * {
 *   "success": false,
 *   "message": "Invalid token."
 * }
 *
 * @throws {Error} When the database connection fails or unexpected errors occur.
 */
export async function POST(req: Request) {
    try {
        await connectToDB();

        const { token } = await req.json()

        // Check if token exists
        if (!token) {
            logError("No Token is given",);
        }

        const { valid, payload } = await myVerifyJwt(token)


        // Verifiny JWT
        if (!valid) {
            logError("Invalid Token")
            return responseFailure("InValid token.",)
        }

        // Ensuring sessionId is present in token payload
        if (!payload?.sessionId) {
            logError("No SessionId is given",)
            return responseFailure("No SessionId is given",)
        }

        // Deleting session from DB
        const existingSession = await sessionModel.findOneAndDelete({ sessionId: payload.sessionId });
        if (!existingSession) {
            logError("Session does not exist.");
            return responseFailure("Session does not exist.");
        }

        // Log and respond
        logInfo("Session Deleted:")
        logInfo(`\tSessionId: ${existingSession.sessionId}`)
        logInfo(`\tUserId: ${existingSession.userId}`)

        return responseSuccess(`Session deleted succesfully ${existingSession.sessionId} : ${existingSession.userId}`, {});


    } catch (error) {
        logErrorSerious(`ERROR: ${error}`)
        return responseFailure(`Error occured. `)
    }
}
