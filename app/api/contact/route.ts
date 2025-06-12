import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    // Parse the request body
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, subject, and message are required" },
        { status: 400 },
      )
    }

    // Process form submission (same logic as in the server action)
    const contact = await prisma.contactSubmission.create({
      data: {
        type: data.type || "general",
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
        company: data.company || null,
        website: data.website || null,
        fitnessLevel: data.fitnessLevel || null,
        competitionInterest: data.competitionInterest || null,
        experience: data.experience || null,
        sponsorshipLevel: data.sponsorshipLevel || null,
      },
    })

    return NextResponse.json({ success: true, id: contact.id })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to process contact form" }, { status: 500 })
  }
}
