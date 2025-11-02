/* eslint-disable @typescript-eslint/no-explicit-any */
import { debugMode } from "@/debugMode";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const logProxier = (...msg:any) => {
  const debugVar = debugMode;
  if (debugVar) {
	console.log(...msg)
  }
}

export async function mySignJwt(payload: any): Promise<string> {
    const now = Math.floor(Date.now() / 1000)

    const token = await new SignJWT({
        ...payload,
        iat: now,
        iss: "keeper-wheat.vercel.com",
        aud: "keeper-frontend",
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("5s") // expires in 7 days
        .sign(JWT_SECRET)


    return token;

}


interface tokenPayloadType {
    userId: string,
    email: string,
    sessionId: string,
    level: string,
    iat: number,
    exp: number,
    iss: string,
    aud: string,
}


export async function myVerifyJwt(token: string): Promise<{ valid: boolean, payload: tokenPayloadType | null }> {

    try {
        const payload: any = await jwtVerify(token, JWT_SECRET, {
            issuer: "keeper-wheat.vercel.com",
            audience: "keeper-frontend",
        })
        // logSuccess("JWT Verified: ",payload)
        logProxier(`[*] JWT Verified: `, payload.userId)

        return { valid: true, payload: payload.payload };

    } catch (error: any) {
        if (error.message.includes('"exp" claim timestamp check failed')) {
            logProxier(`[!!] Error:  JWT expired`)
        } else {
            logProxier(`[!]  JWT verification Failed `)
            logProxier(`[!!] Error: `, error.message)
        }

        return { valid: false, payload: null };
    }
}


