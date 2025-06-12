import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { hash } from "bcrypt"

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email and password are required",
        },
        { status: 400 },
      )
    }

    // Hash the password
    const hashedPassword = await hash(password, 10)

    // Create the new admin user
    const user = await prisma.user.create({
      data: {
        name: name || "Admin User",
        email,
        password: hashedPassword,
        role: "admin",
      },
    })

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Error creating admin user:", error)

    // Check for duplicate email error
     if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as any).code === "P2002"
  ) {
    return NextResponse.json(
      {
        error: "Email already exists. Please use a different email.",
      },
      { status: 400 },
    )
  }

    return NextResponse.json(
      {
        error: "Failed to create admin user",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
