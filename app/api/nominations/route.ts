import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { put } from "@vercel/blob"

// Validation schema
const nominationSchema = z.object({
  awardTitle: z.string().min(1),
  awardId: z.string().min(1),
  fullName: z.string().min(1),
  dateOfBirth: z.string().min(1),
  gender: z.string().min(1),
  contactNumber: z.string().min(1),
  email: z.string().email(),
  cityArea: z.string().min(1),
  organization: z.string().optional(),
  designation: z.string().min(1),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
})

// Helper function to generate unique filename
function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const extension = originalName.split(".").pop()
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "")
  return `${timestamp}-${randomString}-${nameWithoutExt}.${extension}`
}

export async function POST(request: NextRequest) {
  console.log("=== NOMINATION SUBMISSION STARTED ===")
  console.log("Request URL:", request.url)
  console.log("Request method:", request.method)

  try {
    // Check if BLOB token exists
    console.log("BLOB_READ_WRITE_TOKEN exists:", !!process.env.BLOB_READ_WRITE_TOKEN)

    const formData = await request.formData()
    console.log("Form data received, entries count:", Array.from(formData.entries()).length)

    // Extract basic form data
    const data: Record<string, any> = {}
    const files: Record<string, File[]> = {}

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`File found: ${key} = ${value.name} (${value.size} bytes)`)
        if (!files[key]) files[key] = []
        files[key].push(value)
      } else {
        console.log(`Data field: ${key} = ${value}`)
        // Handle boolean conversion for checkboxes
        if (key === "agreeToTerms") {
          data[key] = value === "true" || value === "on"
        } else {
          data[key] = value
        }
      }
    }

    console.log("Extracted data keys:", Object.keys(data))
    console.log("Extracted file keys:", Object.keys(files))

    // Validate required fields
    console.log("Validating data...")
    const validatedData = nominationSchema.parse(data)
    console.log("Validation successful")

    // Create nomination ID for file organization
    const nominationTimestamp = Date.now()
    const nominationFolder = `nomination-${nominationTimestamp}`
    console.log("Nomination folder:", nominationFolder)

    // Upload files to Vercel Blob
    const uploadedFiles: Record<string, string[]> = {}

    for (const [fieldName, fileList] of Object.entries(files)) {
      console.log(`Processing ${fileList.length} files for field: ${fieldName}`)
      uploadedFiles[fieldName] = []

      for (const file of fileList) {
        try {
          console.log(`Uploading file: ${file.name} (${file.size} bytes)`)

          // Check if file is too large (5MB limit)
          if (file.size > 5 * 1024 * 1024) {
            throw new Error(`File ${file.name} is too large. Maximum size is 5MB.`)
          }

          // Always use Vercel Blob for file uploads
          const filename = generateUniqueFilename(file.name)
          const filepath = `${nominationFolder}/${filename}`

          console.log(`Uploading to Vercel Blob: ${filepath}`)

          const blob = await put(filepath, file, {
            access: "public",
            token: process.env.BLOB_READ_WRITE_TOKEN,
          })

          console.log(`File uploaded successfully: ${blob.url}`)
          uploadedFiles[fieldName].push(blob.url)
        } catch (error) {
          console.error(`Error uploading file ${file.name}:`, error)
          throw new Error(
            `Failed to upload file: ${file.name} - ${error instanceof Error ? error.message : "Unknown error"}`,
          )
        }
      }
    }

    console.log("All files uploaded successfully")
    console.log("Saving to database...")

    // Save to database
    const nomination = await prisma.nomination.create({
      data: {
        awardTitle: validatedData.awardTitle,
        awardId: validatedData.awardId,
        fullName: validatedData.fullName,
        dateOfBirth: new Date(validatedData.dateOfBirth),
        gender: validatedData.gender,
        contactNumber: validatedData.contactNumber,
        email: validatedData.email,
        cityArea: validatedData.cityArea,
        organization: data.organization || null,
        designation: validatedData.designation,

        // Category-specific fields (stored as JSON)
        professionalData: {
          yearsExperience: data.yearsExperience,
          certificationsList: data.certificationsList,
          transformationStories: data.transformationStories,
          communityInitiatives: data.communityInitiatives,
          clientTestimonials: data.clientTestimonials,
          educationalQualifications: data.educationalQualifications,
          yearsPractice: data.yearsPractice,
          nutritionPhilosophy: data.nutritionPhilosophy,
          publicOutreach: data.publicOutreach,
          yogaLineage: data.yogaLineage,
          yearsTeaching: data.yearsTeaching,
          yogaCertifications: data.yogaCertifications,
          teachingLocations: data.teachingLocations,
          studentTestimonials: data.studentTestimonials,
          therapeuticContributions: data.therapeuticContributions,
          classTypes: data.classTypes,
          certifications: data.certifications,
          yearsGroupExperience: data.yearsGroupExperience,
          classStyle: data.classStyle,
          testimonials: data.testimonials,
          eventParticipation: data.eventParticipation,
        },

        // Social media fields
        socialMediaData: {
          instagramHandle: data.instagramHandle,
          facebookPage: data.facebookPage,
          youtubeWebsite: data.youtubeWebsite,
          mediaMentions: data.mediaMentions,
        },

        // File URLs
        uploadedFiles: uploadedFiles,

        status: "PENDING",
      },
    })

    console.log("Nomination saved successfully:", nomination.id)
    console.log("=== NOMINATION SUBMISSION COMPLETED ===")

    return NextResponse.json({
      success: true,
      message: "Nomination submitted successfully",
      nominationId: nomination.id,
    })
  } catch (error) {
    console.error("=== NOMINATION SUBMISSION ERROR ===")
    console.error("Error details:", error)
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace")

    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error.errors)
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    )
  }
}

// GET endpoint to retrieve nominations (admin use)
export async function GET(request: NextRequest) {
  console.log("=== GET NOMINATIONS REQUEST ===")

  try {
    const { searchParams } = new URL(request.url)
    const awardId = searchParams.get("awardId")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    console.log("Query params:", { awardId, status, page, limit })

    const where: any = {}
    if (awardId) where.awardId = awardId
    if (status) where.status = status

    const nominations = await prisma.nomination.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        fullName: true,
        email: true,
        awardTitle: true,
        awardId: true,
        status: true,
        createdAt: true,
        cityArea: true,
        organization: true,
        uploadedFiles: true,
      },
    })

    const total = await prisma.nomination.count({ where })

    console.log(`Found ${nominations.length} nominations out of ${total} total`)

    return NextResponse.json({
      success: true,
      data: nominations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching nominations:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch nominations",
      },
      { status: 500 },
    )
  }
}
