import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { signJwt } from "@/lib/jwt"
import { cookies } from "next/headers"
import { compare } from "bcrypt"

export async function POST(request: NextRequest) {
  try {
    console.log("=== LOGIN ATTEMPT ===")

    const body = await request.json()
    const { email, password } = body

    console.log("Login attempt for email:", email)
    console.log("Password provided:", !!password)

    // Basic validation
    if (!email || !password) {
      console.log("Missing email or password")
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find the user in the database
    console.log("Looking up user in database...")
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }, // Normalize email
    })

    console.log("User lookup result:", user ? "FOUND" : "NOT FOUND")

    if (!user) {
      console.log("User not found for email:", email)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    console.log("User found:")
    console.log("- Email:", user.email)
    console.log("- Role:", user.role)
    console.log("- Has password:", !!user.password)
    console.log("- Password length:", user.password ? user.password.length : 0)

    // Check if user has a password
    if (!user.password) {
      console.log("User has no password set")
      return NextResponse.json({ error: "Account not properly configured" }, { status: 401 })
    }

    // Use bcrypt to compare passwords
    console.log("Comparing passwords...")
    console.log("Provided password:", password)
    console.log("Stored hash starts with:", user.password.substring(0, 10))

    const passwordMatch = await compare(password, user.password)
    console.log("Password comparison result:", passwordMatch ? "MATCH" : "NO MATCH")

    if (!passwordMatch) {
      console.log("Password mismatch")
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    console.log("Password match successful")

    // Create a JWT token
    console.log("Creating JWT token...")
    const token = await signJwt({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })

    console.log("JWT token created successfully")

    // Set the token in a cookie
    const cookieStore = await cookies()
    cookieStore.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    console.log("Cookie set successfully")
    console.log("=== LOGIN SUCCESSFUL ===")

    // Return user info (without password)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("=== LOGIN ERROR ===")
    console.error("Error details:", error)
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack")
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
  }
}
