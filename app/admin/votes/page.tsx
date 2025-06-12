import { unstable_noStore as noStore } from "next/cache"
import { prisma } from "@/lib/prisma"
import { columns } from "./columns"
import { DataTable } from "@/components/admin/data-table"

// Define the vote type to match your schema
type VoteData = {
  id: string
  voterName: string
  voterEmail: string
  voterPhone: string
  nomineeId: string
  nomineeName: string
  categoryId: string
  categoryName: string
  createdAt: Date
}

export default async function VotesPage() {
  // Prevent caching
  noStore()

  try {
    const votes = await prisma.awardVote.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        voterName: true,
        voterEmail: true,
        voterPhone: true,
        nomineeId: true,
        nomineeName: true,
        categoryId: true,
        categoryName: true,
        createdAt: true,
      },
    })

    // Get unique category names for filters
    const categoryNames: string[] = Array.from(new Set(votes.map((vote: VoteData) => vote.categoryName)))

    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Award Votes</h1>
        </div>

        {votes.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500">No votes found.</p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={votes}
            filterColumn="voterName"
            filterOptions={{
              key: "categoryName",
              label: "category",
              values: categoryNames,
            }}
            exportFileName="votes_export"
          />
        )}
      </div>
    )
  } catch (error) {
    console.error("Error fetching votes:", error)
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Award Votes</h1>
        <div className="bg-red-50 p-6 rounded-lg shadow border border-red-200">
          <h2 className="text-red-600 font-semibold mb-2">Error loading votes</h2>
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
