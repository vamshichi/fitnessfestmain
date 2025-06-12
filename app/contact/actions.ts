"use server"

import prisma from "@/lib/prisma"

export async function submitContactForm(formData: FormData) {
  try {
    // Extract basic form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = (formData.get("phone") as string) || null
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string
    const type = formData.get("type") as string

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.error("Missing required fields in contact form submission")
      return {
        success: false,
        error: "Missing required fields. Please fill out all required fields.",
      }
    }

    // Create base submission data
    const submissionData: any = {
      name,
      email,
      phone,
      subject,
      message,
      type,
    }

    // Add type-specific fields
    if (type === "competitor") {
      submissionData.fitnessLevel = (formData.get("fitnessLevel") as string) || null
      submissionData.competitionInterest = (formData.get("competitionInterest") as string) || null
      submissionData.experience = (formData.get("experience") as string) || null
    } else if (type === "sponsor") {
      submissionData.company = (formData.get("company") as string) || null
      submissionData.website = (formData.get("website") as string) || null
      submissionData.sponsorshipLevel = (formData.get("sponsorshipLevel") as string) || null
    }

    // Log the data being saved
    console.log("Saving contact submission:", submissionData)

    // Save to database
    const result = await prisma.contactSubmission.create({
      data: submissionData,
    })

    console.log("Contact submission saved successfully with ID:", result.id)
    return { success: true, id: result.id }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      error: "Failed to send message. Please try again later.",
    }
  }
}
