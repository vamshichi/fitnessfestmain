import { unstable_noStore as noStore } from "next/cache"
import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, Eye, Mail, Phone, MapPin, Building, Calendar, User } from "lucide-react"

// Define the nomination type with all fields
type NominationDetails = {
  id: string
  awardTitle: string
  awardId: string
  fullName: string
  dateOfBirth: Date
  gender: string
  contactNumber: string
  email: string
  cityArea: string
  organization: string | null
  designation: string
  profilePhotoUrl: string | null
  professionalData: any
  socialMediaData: any
  uploadedFiles: any
  status: string
  createdAt: Date
  updatedAt: Date
  reviewedBy: string | null
  adminNotes: string | null
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function NominationDetailPage({ params }: PageProps) {
  // Prevent caching
  noStore()

  const { id } = await params

  try {
    const nomination = await prisma.nomination.findUnique({
      where: { id },
    })

    if (!nomination) {
      notFound()
    }

    const nominationData = nomination as NominationDetails

    // Helper function to format date
    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }

    // Helper function to get status color
    const getStatusColor = (status: string) => {
      switch (status) {
        case "APPROVED":
          return "bg-green-100 text-green-800"
        case "REJECTED":
          return "bg-red-100 text-red-800"
        case "UNDER_REVIEW":
          return "bg-yellow-100 text-yellow-800"
        case "SHORTLISTED":
          return "bg-blue-100 text-blue-800"
        default:
          return "bg-gray-100 text-gray-800"
      }
    }

    return (
      <div className="container mx-auto py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/nominations">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Nominations
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">{nominationData.fullName}</h1>
              <p className="text-gray-600">{nominationData.awardTitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(nominationData.status)}>{nominationData.status}</Badge>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-lg font-semibold">{nominationData.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Gender</label>
                    <p>{nominationData.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                    <p className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(nominationData.dateOfBirth)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Designation</label>
                    <p>{nominationData.designation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      <a href={`mailto:${nominationData.email}`} className="text-blue-600 hover:underline">
                        {nominationData.email}
                      </a>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <a href={`tel:${nominationData.contactNumber}`} className="text-blue-600 hover:underline">
                        {nominationData.contactNumber}
                      </a>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">City/Area</label>
                    <p className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {nominationData.cityArea}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Organization</label>
                    <p className="flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      {nominationData.organization || "Not specified"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Data */}
            {nominationData.professionalData && (
              <Card>
                <CardHeader>
                  <CardTitle>Professional Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(nominationData.professionalData as Record<string, any>).map(([key, value]) => {
                      if (!value) return null
                      return (
                        <div key={key}>
                          <label className="text-sm font-medium text-gray-500 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </label>
                          <p className="mt-1 text-gray-900">{String(value)}</p>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Social Media Data */}
            {nominationData.socialMediaData && (
              <Card>
                <CardHeader>
                  <CardTitle>Social Media & Online Presence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(nominationData.socialMediaData as Record<string, any>).map(([key, value]) => {
                      if (!value) return null
                      return (
                        <div key={key}>
                          <label className="text-sm font-medium text-gray-500 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </label>
                          <p className="mt-1">
                            {key.includes("Handle") || key.includes("Page") || key.includes("Website") ? (
                              <a
                                href={String(value)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {String(value)}
                              </a>
                            ) : (
                              String(value)
                            )}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Uploaded Files */}
            {nominationData.uploadedFiles &&
              Object.keys(nominationData.uploadedFiles as Record<string, any>).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Uploaded Files</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(nominationData.uploadedFiles as Record<string, string[]>).map(
                        ([fieldName, files]) => (
                          <div key={fieldName}>
                            <label className="text-sm font-medium text-gray-500 capitalize">
                              {fieldName.replace(/([A-Z])/g, " $1").trim()}
                            </label>
                            <div className="mt-2 space-y-2">
                              {files.map((fileUrl, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                  <div className="flex items-center space-x-3">
                                    <Eye className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm">{fileUrl.split("/").pop() || `File ${index + 1}`}</span>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button variant="outline" size="sm" asChild>
                                      <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                                        <Eye className="h-4 w-4 mr-1" />
                                        View
                                      </a>
                                    </Button>
                                    <Button variant="outline" size="sm" asChild>
                                      <a href={fileUrl} download>
                                        <Download className="h-4 w-4 mr-1" />
                                        Download
                                      </a>
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Photo */}
            {nominationData.profilePhotoUrl && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Photo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square relative overflow-hidden rounded-lg">
                    <img
                      src={nominationData.profilePhotoUrl || "/placeholder.svg"}
                      alt={`${nominationData.fullName} profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Status & Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Status & Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Current Status</label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(nominationData.status)}>{nominationData.status}</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button className="w-full" variant="default">
                    Approve Nomination
                  </Button>
                  <Button className="w-full" variant="outline">
                    Mark Under Review
                  </Button>
                  <Button className="w-full" variant="outline">
                    Shortlist
                  </Button>
                  <Button className="w-full" variant="destructive">
                    Reject Nomination
                  </Button>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium text-gray-500">Admin Notes</label>
                  <textarea
                    className="mt-1 w-full p-2 border rounded-md"
                    rows={3}
                    placeholder="Add notes about this nomination..."
                    defaultValue={nominationData.adminNotes || ""}
                  />
                  <Button size="sm" className="mt-2">
                    Save Notes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Submission Details */}
            <Card>
              <CardHeader>
                <CardTitle>Submission Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Submitted On</label>
                  <p>{formatDate(nominationData.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Updated</label>
                  <p>{formatDate(nominationData.updatedAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Award Category</label>
                  <p>{nominationData.awardTitle}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Award ID</label>
                  <p className="font-mono text-sm">{nominationData.awardId}</p>
                </div>
                {nominationData.reviewedBy && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Reviewed By</label>
                    <p>{nominationData.reviewedBy}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching nomination:", error)
    return (
      <div className="container mx-auto py-10">
        <div className="bg-red-50 p-6 rounded-lg shadow border border-red-200">
          <h2 className="text-red-600 font-semibold mb-2">Error loading nomination</h2>
          <p className="text-gray-700 mb-4">
            There was a problem loading this nomination. Please try again later or contact support.
          </p>
          <Link href="/admin/nominations">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Nominations
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}
