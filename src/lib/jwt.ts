import { SignJWT, jwtVerify } from "jose";
import { logErrorSerious, logMe, logSuccess } from "./log";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        .setExpirationTime("1h") // expires in 1 hour
        .sign(JWT_SECRET)


    return token;

}


export async function myVerifyJwt(token: string): Promise<{ valid: boolean, payload: string[] | number[] | null }> {

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const payload: any = await jwtVerify(token, JWT_SECRET, {
            issuer: "keeper-wheat.vercel.com",
            audience: "keeper-frontend",
        })
        logSuccess("JWT Verified: ",payload)

        return { valid: true, payload: payload.payload };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        logErrorSerious("JWT verification Failed ")
        logErrorSerious("Error: ",error.message)

        return { valid: false, payload: null };
    }
}

