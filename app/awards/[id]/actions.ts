"use server"

import { z } from "zod"

// Define validation schema
const nominationSchema = z.object({
  nomineeName: z.string().min(2, { message: "Nominee name is required" }),
  nomineeEmail: z.string().email({ message: "Valid email is required" }),
  nomineePhone: z.string().optional(),
  nomineeOrganization: z.string().min(2, { message: "Organization is required" }),
  nominatorName: z.string().min(2, { message: "Your name is required" }),
  nominatorEmail: z.string().email({ message: "Valid email is required" }),
  nominatorPhone: z.string().optional(),
  nominatorOrganization: z.string().optional(),
  relationship: z.string().min(1, { message: "Please select your relationship" }),
  nominationReason: z.string().min(50, { message: "Please provide a detailed reason (min 50 characters)" }),
  achievements: z.string().min(50, { message: "Please provide detailed achievements (min 50 characters)" }),
  agreeToTerms: z.boolean().refine((val) => val === true, { message: "You must agree to the terms" }),
})

export type NominationFormState = {
  errors?: {
    nomineeName?: string[]
    nomineeEmail?: string[]
    nomineeOrganization?: string[]
    nominatorName?: string[]
    nominatorEmail?: string[]
    relationship?: string[]
    nominationReason?: string[]
    achievements?: string[]
    agreeToTerms?: string[]
    _form?: string[]
  }
  message?: string
  success?: boolean
}

export async function submitNomination(
  prevState: NominationFormState,
  formData: FormData,
): Promise<NominationFormState> {
  // Extract form data
  const rawFormData = {
    nomineeName: formData.get("nomineeName") as string,
    nomineeEmail: formData.get("nomineeEmail") as string,
    nomineePhone: formData.get("nomineePhone") as string,
    nomineeOrganization: formData.get("nomineeOrganization") as string,
    nominatorName: formData.get("nominatorName") as string,
    nominatorEmail: formData.get("nominatorEmail") as string,
    nominatorPhone: formData.get("nominatorPhone") as string,
    nominatorOrganization: formData.get("nominatorOrganization") as string,
    relationship: formData.get("relationship") as string,
    nominationReason: formData.get("nominationReason") as string,
    achievements: formData.get("achievements") as string,
    agreeToTerms: formData.get("agreeToTerms") === "on",
  }

  // Validate form data
  const validatedFields = nominationSchema.safeParse(rawFormData)

  // Return errors if validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors in the form.",
    }
  }

  // Process file upload if needed
  // const file = formData.get("supportingDocuments") as File;
  // Handle file upload here if needed

  try {
    // Simulate API call or database operation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return success state
    return {
      success: true,
      message: "Nomination submitted successfully! You will receive a confirmation email shortly.",
    }
  } catch (error) {
    // Return error state
    return {
      errors: {
        _form: ["An error occurred while submitting the form. Please try again."],
      },
    }
  }
}
