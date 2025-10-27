import { SignJWT, jwtVerify } from "jose";
import { logMe } from "./log";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function mySignJwt(payload: any): Promise<string> {
    const now = Math.floor(Date.now() / 1000)

    console.log("sign token utility")

    const token = await new SignJWT({
        ...payload,
        iat: now,
        iss: "keeper-wheat.vercel.com",
        aud: "keeper-frontend",
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1m") // expires in 1 minute
        .sign(JWT_SECRET)


    return token;

}


export async function myVerifyJwt(token: string): Promise<{ valid: boolean, data: null | object }> {
    console.log("verify token utility")

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const payload: any = await jwtVerify(token, JWT_SECRET, {
            issuer: "keeper-wheat.vercel.com",
            audience: "keeper-frontend",
        })
        logMe(payload)

        return { valid: true, data: payload };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        logMe(error.message)

        return { valid: false, data: null };
    }
}

