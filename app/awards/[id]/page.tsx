import { notFound } from "next/navigation"
import { Trophy, FileText, Award, CheckCircle, Star, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { getAwardBySlug, getAllAwardSlugs } from "@/data/awards"
import NominationForm from "./nomination-form"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllAwardSlugs()
  return slugs.map((slug) => ({
    id: slug,
  }))
}

export default async function AwardDetailPage({ params }: PageProps) {
  const { id } = await params
  const award = getAwardBySlug(id)

  if (!award) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
       <section className="min-h-[100vh] bg-cover bg-center py-20 flex items-center relative" style={{ backgroundImage: "url('/images/eventum-img1.jpg')" }}>
  <div
  className="absolute inset-0 bg-black opacity-80"></div>
        <div className="container mx-auto px-4 text-white">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="text-6xl mb-4 pt-20 opacity-90">{award.emoji}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 opacity-90">{award.title}</h1>
            <Badge variant="secondary" className="mb-6 text-lg px-4 py-2 opacity-90">
              {award.category}
            </Badge>
            <p className="text-xl leading-relaxed opacity-90">{award.description}</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Nomination Form */}
            <NominationForm awardTitle={award.title} awardId={award.id} />

            {/* Eligibility Section */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-2xl text-green-800">
                  <CheckCircle className="h-6 w-6" />
                  Nominee Eligibility
                </CardTitle>
                <CardDescription className="text-green-600">
                  To be considered, the nominee must meet the following criteria:
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {award.eligibility.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Judging Criteria */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-2xl text-blue-800">
                  <Star className="h-6 w-6" />
                  Judging Criteria
                </CardTitle>
                <CardDescription className="text-blue-600">
                  The award will be jury-nominated and judged with high standards of integrity and respect.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold text-gray-900">Criteria</th>
                        <th className="px-6 py-4 text-center font-semibold text-gray-900">Weightage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {award.judgingCriteria.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-gray-700">{item.criteria}</td>
                          <td className="px-6 py-4 text-center">
                            <Badge variant="outline" className="font-semibold">
                              {item.weightage}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
                      
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Award Benefits */}
            <Card className="shadow-lg border-0 sticky top-6">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl text-purple-800">
                  <Award className="h-5 w-5" />
                  Award Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {award.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Trophy className="h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button asChild variant="outline" className="w-full py-6 text-lg font-semibold border-2">
                <Link href="/awards">← Back to All Awards</Link>
              </Button>
            </div>

            {/* Important Dates */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-lg text-red-800">
                  <Calendar className="h-5 w-5" />
                  Important Dates
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nominations Open:</span>
                    <span className="font-semibold">Jan 15, 2025</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-600">Submission Deadline:</span>
                    <span className="font-semibold text-red-600">Mar 31, 2025</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-600">Awards Ceremony:</span>
                    <span className="font-semibold">May 15, 2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
