"use client"

import type React from "react"

import { useState } from "react"
import { Send, User, Building, Upload, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface NominationFormProps {
  awardTitle: string
  awardId: string
}

interface FormField {
  id: string
  label: string
  type: "text" | "email" | "tel" | "date" | "select" | "textarea" | "file" | "radio"
  required: boolean
  placeholder?: string
  options?: string[]
  accept?: string
  multiple?: boolean
}

interface CategoryFields {
  [key: string]: FormField[]
}

const commonFields: FormField[] = [
  { id: "fullName", label: "Full Name", type: "text", required: true },
  { id: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
  {
    id: "gender",
    label: "Gender",
    type: "select",
    required: true,
    options: ["Male", "Female", "Other", "Prefer not to say"],
  },
  { id: "contactNumber", label: "Contact Number", type: "tel", required: true },
  { id: "email", label: "Email Address", type: "email", required: true },
  { id: "cityArea", label: "City & Area", type: "text", required: true, placeholder: "e.g., Koramangala, Bengaluru" },
  { id: "organization", label: "Organization/Studio (if applicable)", type: "text", required: false },
  { id: "designation", label: "Designation", type: "text", required: true },
  { id: "profilePhoto", label: "Upload Profile Photo (Headshot)", type: "file", required: true, accept: "image/*" },
]

const categorySpecificFields: CategoryFields = {
  "fitness-trainer-of-the-year": [
    { id: "yearsExperience", label: "Years of Experience", type: "text", required: true },
    {
      id: "certificationsList",
      label: "List of Certifications",
      type: "textarea",
      required: true,
      placeholder: "List all your fitness certifications...",
    },
    {
      id: "certificationsUpload",
      label: "Upload Certifications",
      type: "file",
      required: true,
      accept: ".pdf,.jpg,.jpeg,.png",
      multiple: true,
    },
    {
      id: "transformationStories",
      label: "Describe your key transformation stories",
      type: "textarea",
      required: true,
      placeholder: "Share detailed stories of client transformations...",
    },
    {
      id: "beforeAfterResults",
      label: "Upload before/after results",
      type: "file",
      required: true,
      accept: "image/*",
      multiple: true,
    },
    {
      id: "communityInitiatives",
      label: "Community initiatives",
      type: "textarea",
      required: true,
      placeholder: "Describe your community involvement and initiatives...",
    },
    {
      id: "clientTestimonials",
      label: "Client Testimonials",
      type: "textarea",
      required: true,
      placeholder: "Share client testimonials and feedback...",
    },
  ],
  "nutritionist-dietitian-of-the-year": [
    {
      id: "educationalQualifications",
      label: "Educational Qualifications & Certifications",
      type: "textarea",
      required: true,
      placeholder: "List your educational background and certifications...",
    },
    { id: "yearsPractice", label: "Years of Practice", type: "text", required: true },
    {
      id: "nutritionPhilosophy",
      label: "Describe nutrition philosophy and methodology",
      type: "textarea",
      required: true,
      placeholder: "Explain your approach to nutrition and dietary counseling...",
    },
    {
      id: "mealPlansUpload",
      label: "Upload sample meal plans / case studies",
      type: "file",
      required: true,
      accept: ".pdf,.doc,.docx",
      multiple: true,
    },
    {
      id: "clientTestimonials",
      label: "Client Testimonials",
      type: "textarea",
      required: true,
      placeholder: "Share client success stories and testimonials...",
    },
    {
      id: "publicOutreach",
      label: "Public awareness/outreach contributions",
      type: "textarea",
      required: true,
      placeholder: "Describe your public education and outreach activities...",
    },
  ],
  "yoga-coach-of-the-year": [
    {
      id: "yogaLineage",
      label: "Yoga Lineage/Style(s)",
      type: "textarea",
      required: true,
      placeholder: "Describe your yoga lineage and styles you teach...",
    },
    { id: "yearsTeaching", label: "Years of Teaching", type: "text", required: true },
    {
      id: "yogaCertifications",
      label: "Yoga Certifications",
      type: "textarea",
      required: true,
      placeholder: "List all your yoga certifications and training...",
    },
    {
      id: "teachingLocations",
      label: "Teaching Locations (Studio/Online/Events)",
      type: "textarea",
      required: true,
      placeholder: "Describe where and how you teach yoga...",
    },
    {
      id: "classPhotos",
      label: "Upload Class/Workshop Photos",
      type: "file",
      required: true,
      accept: "image/*",
      multiple: true,
    },
    {
      id: "studentTestimonials",
      label: "Student Testimonials",
      type: "textarea",
      required: true,
      placeholder: "Share testimonials from your yoga students...",
    },
    {
      id: "therapeuticContributions",
      label: "Any outreach or therapeutic contributions",
      type: "textarea",
      required: true,
      placeholder: "Describe any therapeutic or community outreach work...",
    },
  ],
  "best-group-class-instructor": [
    {
      id: "classTypes",
      label: "Class Types Conducted (Zumba, HIIT, etc.)",
      type: "textarea",
      required: true,
      placeholder: "List all types of group classes you conduct...",
    },
    {
      id: "certifications",
      label: "Certification(s)",
      type: "textarea",
      required: true,
      placeholder: "List your group fitness certifications...",
    },
    { id: "yearsGroupExperience", label: "Years of Group Class Experience", type: "text", required: true },
    {
      id: "classStyle",
      label: "Describe your class style/energy",
      type: "textarea",
      required: true,
      placeholder: "Describe your teaching style and class atmosphere...",
    },
    {
      id: "classVideo",
      label: "Upload Class Video Clip (optional but encouraged)",
      type: "file",
      required: false,
      accept: "video/*",
    },
    {
      id: "testimonials",
      label: "Testimonials",
      type: "textarea",
      required: true,
      placeholder: "Share participant testimonials and feedback...",
    },
    {
      id: "eventParticipation",
      label: "Participation in events/community classes",
      type: "textarea",
      required: true,
      placeholder: "Describe your involvement in fitness events and community classes...",
    },
  ],
}

const socialMediaFields: FormField[] = [
  { id: "instagramHandle", label: "Instagram Handle", type: "text", required: false, placeholder: "@yourusername" },
  { id: "facebookPage", label: "Facebook Page", type: "text", required: false, placeholder: "Facebook page URL" },
  {
    id: "youtubeWebsite",
    label: "YouTube Channel / Website",
    type: "text",
    required: false,
    placeholder: "YouTube or website URL",
  },
  {
    id: "mediaMentions",
    label: "Press / Media Mentions (if any)",
    type: "textarea",
    required: false,
    placeholder: "List any press coverage or media mentions...",
  },
]

export default function NominationForm({ awardTitle, awardId }: NominationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})

  const categoryFields = categorySpecificFields[awardId] || []

  const handleInputChange = (field: string, value: string | boolean | File | FileList | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = new FormData()
    form.append("awardTitle", awardTitle)
    form.append("awardId", awardId)

    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof FileList) {
        Array.from(value).forEach((file) => form.append(key, file))
      } else if (value instanceof File) {
        form.append(key, value)
      } else {
        form.append(key, value)
      }
    })

    try {
      const res = await fetch("/api/nomination", {
        method: "POST",
        body: form,
      })

      const result = await res.json()

      if (result.success) {
        alert("Nomination submitted successfully! You will receive a confirmation email shortly.")
        setFormData({})
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (err) {
      alert("Server error occurred.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (field: FormField) => {
    const value = formData[field.id] || ""

    switch (field.type) {
      case "select":
        return (
          <Select onValueChange={(value) => handleInputChange(field.id, value)} required={field.required}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option.toLowerCase()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "textarea":
        return (
          <Textarea
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            required={field.required}
          />
        )

      case "file":
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <Input
              type="file"
              accept={field.accept}
              multiple={field.multiple}
              onChange={(e) =>
                handleInputChange(field.id, field.multiple ? e.target.files : e.target.files?.[0] || null)
              }
              className="hidden"
              id={field.id}
              required={field.required}
            />
            <Label htmlFor={field.id} className="cursor-pointer">
              <span className="text-sm text-gray-600">
                Click to upload {field.label.toLowerCase()}
                {field.multiple && " (multiple files allowed)"}
              </span>
            </Label>
            {formData[field.id] && (
              <p className="text-sm text-green-600 mt-2">
                {field.multiple
                  ? `${(formData[field.id] as FileList).length} file(s) selected`
                  : `File selected: ${(formData[field.id] as File).name}`}
              </p>
            )}
          </div>
        )

      case "radio":
        return (
          <RadioGroup onValueChange={(value) => handleInputChange(field.id, value)} required={field.required}>
            {field.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option.toLowerCase()} id={`${field.id}-${option}`} />
                <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )

      default:
        return (
          <Input
            type={field.type}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        )
    }
  }

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-[#fa0368] to-[#dc5044] text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Send className="h-6 w-6" />
          Submit Nomination for {awardTitle}
        </CardTitle>
        <CardDescription className="text-white/90">
          Fill out the form below to nominate a deserving candidate for this award.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Nominee Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 border-b pb-2">
              <User className="h-6 w-6" />
              Nominee Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {commonFields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id} className="flex items-center gap-1">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </Label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          {/* Step 2: Category-Specific Fields */}
          {categoryFields.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 border-b pb-2">
                <Award className="h-6 w-6" />
                Professional Details
              </h3>
              <div className="space-y-6">
                {categoryFields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id} className="flex items-center gap-1">
                      {field.label}
                      {field.required && <span className="text-red-500">*</span>}
                    </Label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator className="my-8" />

          {/* Step 3: Social Media & Visibility */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 border-b pb-2">
              <Building className="h-6 w-6" />
              Social Media & Visibility (Optional)
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {socialMediaFields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id} className="flex items-center gap-1">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </Label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          {/* Terms and Submit */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms || false}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                required
              />
              <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                I agree to the terms and conditions and confirm that all information provided is accurate. I understand
                that false information may disqualify the nomination. *
              </Label>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.agreeToTerms}
              className="w-full bg-gradient-to-r from-[#fa0368] to-[#dc5044] hover:from-[#dc5044] hover:to-[#fa0368] text-white py-4 text-lg font-semibold"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting Nomination...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Submit Nomination
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
