import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    console.log("=== PUBLIC VOTE SUBMISSION API ===")

    const body = await request.json()
    console.log("Received vote data:", body)

    const { voterInfo, nomineeName, categoryName } = body

    // Validate required fields
    if (!voterInfo || !nomineeName || !categoryName) {
      console.error("Missing required data")
      return NextResponse.json(
        {
          success: false,
          error: "Missing required data",
        },
        { status: 400 },
      )
    }

    const requiredFields = ["name", "email", "phone", "nomineeId", "categoryId"]
    const missingFields = requiredFields.filter((field) => !voterInfo[field])

    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields)
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 },
      )
    }

    // Check if this voter has already voted for this category
    console.log("Checking for existing vote...")
    const existingVote = await prisma.awardVote.findFirst({
      where: {
        voterEmail: voterInfo.email.toLowerCase().trim(),
        categoryId: voterInfo.categoryId,
      },
    })

    if (existingVote) {
      console.log("Voter has already voted for this category")
      return NextResponse.json(
        {
          success: false,
          error: "You have already voted for this category",
        },
        { status: 400 },
      )
    }

    console.log("Creating vote record...")

    // Save vote to database
    const result = await prisma.awardVote.create({
      data: {
        voterName: voterInfo.name.trim(),
        voterEmail: voterInfo.email.toLowerCase().trim(),
        voterPhone: voterInfo.phone.trim(),
        nomineeId: voterInfo.nomineeId,
        nomineeName: nomineeName.trim(),
        categoryId: voterInfo.categoryId,
        categoryName: categoryName.trim(),
      },
    })

    console.log("Vote saved successfully with ID:", result.id)

    return NextResponse.json({
      success: true,
      id: result.id,
      message: "Your vote has been recorded successfully!",
    })
  } catch (error) {
    console.error("=== VOTE SUBMISSION ERROR ===")
    console.error("Error details:", error)
    console.error("Error message:", error instanceof Error ? error.message : "Unknown error")

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to record vote. Please try again later.",
      },
      { status: 500 },
    )
  }
}
