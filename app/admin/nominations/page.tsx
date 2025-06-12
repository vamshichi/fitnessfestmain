import { unstable_noStore as noStore } from "next/cache"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Define the nomination type
type NominationStatus = "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "SHORTLISTED"

type NominationData = {
  id: string
  fullName: string
  email: string
  awardTitle: string
  status: NominationStatus
  createdAt: Date
  cityArea: string
  organization: string | null
}

export default async function NominationsPage() {
  // Prevent caching
  noStore()

  try {
    // Get all nominations
    const nominations = await prisma.nomination.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        awardTitle: true,
        status: true,
        createdAt: true,
        cityArea: true,
        organization: true,
      },
    })

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Nominations</h1>
          <Button>Export CSV</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Nominations</CardTitle>
            <CardDescription>Showing {nominations.length} nominations in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Award</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nominations.map((nomination: NominationData) => (
                  <TableRow key={nomination.id}>
                    <TableCell className="font-medium">{nomination.fullName}</TableCell>
                    <TableCell>{nomination.email}</TableCell>
                    <TableCell>{nomination.awardTitle}</TableCell>
                    <TableCell>{nomination.cityArea}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          nomination.status === "APPROVED"
                            ? "bg-green-100 text-green-800"
                            : nomination.status === "REJECTED"
                              ? "bg-red-100 text-red-800"
                              : nomination.status === "UNDER_REVIEW"
                                ? "bg-yellow-100 text-yellow-800"
                                : nomination.status === "SHORTLISTED"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {nomination.status}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(nomination.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Link href={`/admin/nominations/${nomination.id}`} className="text-blue-600 hover:underline">
                        View Details
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
                {nominations.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No nominations found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  } catch (error) {
    console.error("Error fetching nominations:", error)
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Nominations</h1>
        <div className="bg-red-50 p-6 rounded-lg shadow border border-red-200">
          <h2 className="text-red-600 font-semibold mb-2">Error loading nominations</h2>
          <p className="text-gray-700 mb-4">
            There was a problem connecting to the database. Please try again later or contact support.
          </p>
          <details className="text-sm text-gray-500">
            <summary>Technical details</summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded overflow-x-auto">
              {error instanceof Error ? error.message : "Unknown error"}
            </pre>
          </details>
        </div>
      </div>
    )
  }
}
