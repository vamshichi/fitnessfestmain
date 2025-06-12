import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret" // Fallback for safety
const encoder = new TextEncoder()

export async function signJwt(payload: any): Promise<string> {
  try {
    const secret = encoder.encode(JWT_SECRET)

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret)

    return token
  } catch (error) {
    console.error("JWT signing error:", error)
    throw new Error("Failed to sign JWT token")
  }
}

export async function verifyJwt(token: string): Promise<any> {
  try {
    const secret = encoder.encode(JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (error) {
    console.error("JWT verification error:", error)
    return null
  }
}
