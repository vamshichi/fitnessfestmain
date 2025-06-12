"use server"

import prisma from "@/lib/prisma"

export async function submitRegistration(formData: FormData) {
  try {
    // Extract form data
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const dateOfBirth = formData.get("dateOfBirth") as string
    const competition = formData.get("competition") as string
    const experienceLevel = formData.get("experienceLevel") as string
    const emergencyContactName = formData.get("emergencyContactName") as string
    const emergencyContactPhone = formData.get("emergencyContactPhone") as string
    const termsAccepted = formData.get("termsAccepted") === "true"

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !competition || !experienceLevel) {
      console.error("Missing required fields in registration form")
      return {
        success: false,
        error: "Missing required fields. Please fill out all required fields.",
      }
    }

    // Log the data being saved
    console.log("Saving competition registration:", {
      firstName,
      lastName,
      email,
      competition,
      experienceLevel,
    })

    // Save to database
    const result = await prisma.competitionRegistration.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        competition,
        experienceLevel,
        emergencyContactName,
        emergencyContactPhone,
        termsAccepted,
      },
    })

    console.log("Competition registration saved successfully with ID:", result.id)
    return { success: true, id: result.id }
  } catch (error) {
    console.error("Error submitting registration:", error)
    return {
      success: false,
      error: "Failed to submit registration. Please try again later.",
    }
  }
}
