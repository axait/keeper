import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const algo = "HS256";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function signJwt(payload: any) {
    const now = Math.floor( Date.now() / 1000 )
    
    console.log("sign token utility")

    const token = await new SignJWT()
                        .setExpirationTime("1m")
                        .setSubject(payload)
                        .setIssuedAt(now)

    return token;

}


export async function verifyJwt(token: string) {
    console.log("verify token utility")
}

