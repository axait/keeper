import { sessionModel } from "../models/session.model";
import { logInfo, logMe, logSuccess, logWarning } from "./log";
import { v6 as uuidv6 } from "uuid";



/**
 * Generates a new session for the user if not already logged in.
 * Checks if there is already an existing session for the user.
 * If the user is already logged in, returns the existing session id.
 * If the user is not already logged in, generates a new session id, deletes any existing session for the user, creates a new session with the new session id, and returns the new session id.
 * @param {string} userId - The id of the user to generate a session for.
 * @returns {Promise<string>} - A promise that resolves with the session id of the user.
 */
export async function mySessionVerifierCreator(userId: string): Promise<string> {

    // TODO: check whther session expired or not also.

    let sessionId = null;
    // check whther user old session available or not.
    const checkPreviousSession = await sessionModel.findOne({ userId: userId })
    
    // checking ⁡⁣⁣⁢⁡⁢⁣⁣⁡⁢⁣⁣𝘸e𝘩𝘵𝘩𝘦𝘳 𝘶𝘴𝘦𝘳 𝘢𝘭𝘳𝘦𝘢𝘥𝘺 𝘩𝘢𝘴 𝘴𝘦𝘴𝘴𝘪𝘰𝘯⁡
    if (checkPreviousSession?.status === "loggedin") {
        logWarning(`USER: ALREADY logged in : ${checkPreviousSession.userId}`);
        sessionId = checkPreviousSession.sessionId;
        return sessionId;

    } 
    
    // if user ⁡⁢⁣⁣is not loggedin⁡

    await sessionModel.findOneAndDelete({ userId: userId })
    sessionId = uuidv6();

    const newSessionData = await sessionModel.create({
        sessionId: sessionId,
        userId: userId,
        status: "loggedin",
        createdAt: new Date(),
        updatedAt: new Date()
    })

    logSuccess("New Session Created: ")
    logInfo("\t"+newSessionData)

    return sessionId;
}