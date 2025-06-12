import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface RouteContext {
  params: Promise<{ id: string }>
}

// GET single nomination by ID
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params

    const nomination = await prisma.nomination.findUnique({
      where: { id },
    })

    if (!nomination) {
      return NextResponse.json({ success: false, message: "Nomination not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: nomination,
    })
  } catch (error) {
    console.error("Error fetching nomination:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch nomination" }, { status: 500 })
  }
}

// PATCH - Update nomination status
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const { status, adminNotes, reviewedBy } = body

    const nomination = await prisma.nomination.update({
      where: { id },
      data: {
        status,
        adminNotes,
        reviewedBy,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      data: nomination,
    })
  } catch (error) {
    console.error("Error updating nomination:", error)
    return NextResponse.json({ success: false, message: "Failed to update nomination" }, { status: 500 })
  }
}
