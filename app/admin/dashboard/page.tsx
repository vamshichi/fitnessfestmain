import { unstable_noStore as noStore } from "next/cache"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { prisma } from "@/lib/prisma"

// Define types for our data
type NominationStatus = "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "SHORTLISTED"

type NominationData = {
  id: string
  fullName: string
  email: string
  awardTitle: string
  status: NominationStatus
  createdAt: Date
}

type ContactData = {
  id: string
  name: string
  email: string
  createdAt: Date
}

type RegistrationData = {
  id: string
  firstName: string
  lastName: string
  email: string
  competition: string
  createdAt: Date
}

type VoteData = {
  id: string
  voterName: string
  voterEmail: string
  nomineeName: string
  createdAt: Date
}

export default async function DashboardPage() {
  // Prevent caching
  noStore()

  try {
    // Get counts for existing models
    const nominationCount = await prisma.nomination.count()
    const userCount = await prisma.user.count()

    // Try to get counts for other models (they might not exist yet)
    let contactCount = 0
    let registrationCount = 0
    let voteCount = 0

    try {
      contactCount = await prisma.contactSubmission.count()
    } catch (error) {
      console.log("ContactSubmission model not available yet")
    }

    try {
      registrationCount = await prisma.competitionRegistration.count()
    } catch (error) {
      console.log("CompetitionRegistration model not available yet")
    }

    try {
      voteCount = await prisma.awardVote.count()
    } catch (error) {
      console.log("AwardVote model not available yet")
    }

    // Get recent nominations
    const recentNominations = await prisma.nomination.findMany({
      take: 5,
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
      },
    })

    // Get recent contacts (if available)
    let recentContacts: ContactData[] = []

    try {
      recentContacts = await prisma.contactSubmission.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      })
    } catch (error) {
      console.log("ContactSubmission model not available yet")
    }

    // Get recent registrations (if available)
    let recentRegistrations: RegistrationData[] = []

    try {
      recentRegistrations = await prisma.competitionRegistration.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          competition: true,
          createdAt: true,
        },
      })
    } catch (error) {
      console.log("CompetitionRegistration model not available yet")
    }

    // Get recent votes (if available)
    let recentVotes: VoteData[] = []

    try {
      recentVotes = await prisma.awardVote.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          voterName: true,
          voterEmail: true,
          nomineeName: true,
          createdAt: true,
        },
      })
    } catch (error) {
      console.log("AwardVote model not available yet")
    }

    return (
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Nominations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{nominationCount}</div>
                  <p className="text-xs text-muted-foreground">
                    <Link href="/admin/nominations" className="text-blue-500 hover:underline">
                      View all nominations
                    </Link>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userCount}</div>
                  <p className="text-xs text-muted-foreground">
                    <Link href="/admin/users" className="text-blue-500 hover:underline">
                      View all users
                    </Link>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contactCount}</div>
                  <p className="text-xs text-muted-foreground">
                    <Link href="/admin/contacts" className="text-blue-500 hover:underline">
                      View all contacts
                    </Link>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Award Votes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{voteCount}</div>
                  <p className="text-xs text-muted-foreground">
                    <Link href="/admin/votes" className="text-blue-500 hover:underline">
                      View all votes
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent Nominations</CardTitle>
                  <CardDescription>Showing the {recentNominations.length} most recent nominations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentNominations.length === 0 ? (
                      <p className="text-sm text-gray-500">No nominations yet</p>
                    ) : (
                      recentNominations.map((nomination: NominationData) => (
                        <div key={nomination.id} className="flex items-center">
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{nomination.fullName}</p>
                            <p className="text-sm text-muted-foreground">{nomination.email}</p>
                            <p className="text-xs text-gray-500">{nomination.awardTitle}</p>
                            <p className="text-xs text-gray-500">
                              Status: {nomination.status} • {new Date(nomination.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent Contacts</CardTitle>
                  <CardDescription>Showing the {recentContacts.length} most recent contact submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentContacts.length === 0 ? (
                      <p className="text-sm text-gray-500">No contacts yet</p>
                    ) : (
                      recentContacts.map((contact: ContactData) => (
                        <div key={contact.id} className="flex items-center">
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{contact.name}</p>
                            <p className="text-sm text-muted-foreground">{contact.email}</p>
                            <p className="text-xs text-gray-500">{new Date(contact.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent Votes</CardTitle>
                  <CardDescription>Showing the {recentVotes.length} most recent award votes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentVotes.length === 0 ? (
                      <p className="text-sm text-gray-500">No votes yet</p>
                    ) : (
                      recentVotes.map((vote: VoteData) => (
                        <div key={vote.id} className="flex items-center">
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{vote.voterName}</p>
                            <p className="text-sm text-muted-foreground">{vote.voterEmail}</p>
                            <p className="text-xs text-gray-500">Voted for: {vote.nomineeName}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="bg-red-50 p-6 rounded-lg shadow border border-red-200">
          <h2 className="text-red-600 font-semibold mb-2">Error loading dashboard</h2>
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
