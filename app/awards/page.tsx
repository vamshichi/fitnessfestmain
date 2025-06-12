"use client"

import { useState } from "react"
import { Users, Mic, Camera, Vote, Award } from "lucide-react"
import VotingCard from "@/components/voting-card"
import { submitVote } from "./actions"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { awardCategories } from "@/data/awards"

interface VoterInfo {
  name: string
  email: string
  phone: string
  categoryId: string
  nomineeId: string
}

export default function AwardsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("participate")
  const [hasVoted, setHasVoted] = useState<Record<string, boolean>>({})
  const [showVoteSuccess, setShowVoteSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const features = [
    {
      icon: Users,
      title: "VIP Reception",
      description: "Exclusive networking with industry leaders and award winners.",
    },
    {
      icon: Mic,
      title: "Inspiring Speakers",
      description: "Hear from the top minds in fitness and wellness.",
    },
    {
      icon: Camera,
      title: "Red Carpet",
      description: "Professional photography and media coverage.",
    },
  ]

  const handleVote = async (voterInfo: VoterInfo) => {
    const { categoryId } = voterInfo

    if (hasVoted[categoryId]) {
      toast({
        title: "Already Voted",
        description: "You have already voted in this category. You can only vote once per category.",
        variant: "destructive",
      })
      return { success: false, error: "Already voted in this category" }
    }

    const category = awardCategories.find((cat) => cat.id === categoryId)
    const nominee = category?.nominees.find((nom) => nom.id === voterInfo.nomineeId)

    if (!category || !nominee) {
      toast({
        title: "Error",
        description: "Could not find the selected category or nominee.",
        variant: "destructive",
      })
      return { success: false, error: "Category or nominee not found" }
    }

    setIsSubmitting(true)

    try {
      // Call the real server action to submit vote to database
      const result = await submitVote(voterInfo, nominee.name, category.title)

      if (!result.success) {
        throw new Error(result.error || "Failed to submit vote")
      }

      setHasVoted((prev) => ({
        ...prev,
        [categoryId]: true,
      }))

      toast({
        title: "Vote Submitted!",
        description: `Thank you ${voterInfo.name} for voting. Your vote has been recorded.`,
      })

      setShowVoteSuccess(true)
      setTimeout(() => setShowVoteSuccess(false), 5000)

      return { success: true, id: result.id }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit your vote. Please try again.",
        variant: "destructive",
      })
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <section
        className="min-h-[80vh] bg-cover bg-center py-40 flex items-center relative"
        style={{ backgroundImage: "url('/images/eventum-img1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center pt-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
              🏆 Bengaluru Fitness & Wellness Awards 2025
            </h1>
          </div>
        </div>
      </section>

      <div className="container max-w-5xl mx-auto px-4 py-16">
        {/* Tab Navigation */}
        <div className="flex w-full max-w-lg mx-auto mb-16 bg-white rounded-2xl p-2 shadow-xl border-4 border-gray-100">
          <Button
            onClick={() => setActiveTab("participate")}
            variant="ghost"
            className={`flex-1 rounded-xl py-4 font-bold text-lg transition-all duration-300 ${
              activeTab === "participate"
                ? "bg-gradient-to-r from-[#fa0368] to-[#fa0368] text-white shadow-lg"
                : "text-gray-600 hover:text-[#dc5044] hover:bg-gray-50"
            }`}
          >
            <Award className="mr-2 h-5 w-5" />
            Participate
          </Button>
          <Button
            onClick={() => setActiveTab("vote")}
            variant="ghost"
            className={`flex-1 rounded-xl py-4 font-bold text-lg transition-all duration-300 ${
              activeTab === "vote"
                ? "bg-gradient-to-r from-[#fa0368] to-[#fa0368] text-white shadow-lg"
                : "text-gray-600 hover:text-[#dc5044] hover:bg-gray-50"
            }`}
          >
            <Vote className="mr-2 h-5 w-5" />
            Vote
          </Button>
        </div>

        {/* Participate Tab */}
        {activeTab === "participate" && (
          <div className="space-y-20">
            <div className="text-center">
              <div className="relative inline-block">
                <h2 className="text-5xl md:text-6xl font-black uppercase text-black mb-4 relative z-10">
                  Join Our Awards
                </h2>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-8 bg-[#fa0368] -skew-x-12 z-0"></div>
              </div>
              <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Be part of celebrating excellence in the fitness community. Submit your Nomination to participate in our
                prestigious awards ceremony.
              </p>
            </div>

            {/* Awards Categories Overview */}
            <div className="space-y-12">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-[#fa0368] mb-4">Award Categories</h3>
                <div className="w-24 h-1 bg-[#dc5044] mx-auto"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {awardCategories.map((category, index) => {
                  const IconComponent = category.icon
                  const colors = {
                    red: "border-[#fa0368] bg-gradient-to-br from-[#dc5044]/5 to-[#fa0368]/10",
                    teal: "border-[#70adb0] bg-gradient-to-br from-[#70adb0]/5 to-[#fa0368]/10",
                    yellow: "border-[#f3c532] bg-gradient-to-br from-[#f3c532]/5 to-[#fa0368]/10",
                    blue: "border-[#3b82f6] bg-gradient-to-br from-[#3b82f6]/5 to-[#fa0368]/10",
                    green: "border-[#10b981] bg-gradient-to-br from-[#10b981]/5 to-[#fa0368]/10",
                    purple: "border-[#8b5cf6] bg-gradient-to-br from-[#8b5cf6]/5 to-[#fa0368]/10",
                  }

                  return (
                    <div
                      key={category.id}
                      className={`relative overflow-hidden rounded-2xl p-8 shadow-xl border-4 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${colors[category.color]}`}
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-bl-full"></div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-white rounded-xl shadow-lg">
                          <IconComponent className="h-8 w-8 text-[#dc5044]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-800">{category.title}</h4>
                          <span className="text-sm text-gray-500">{category.category}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">{category.shortDescription}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-gray-500">Current nominees:</span>
                        <span className="bg-[#fa0368] text-white px-3 py-1 rounded-full font-bold text-sm">
                          {category.nominees.length}
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <Link href={`/awards/${category.slug}`} className="flex-1">
                          <Button
                            variant="outline"
                            className="w-full border-2 border-[#fa0368] text-[#fa0368] hover:bg-[#fa0368] hover:text-white transition-all duration-300"
                          >
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Vote Tab */}
        {activeTab === "vote" && (
          <div className="space-y-20">
            <div className="text-center">
              <div className="relative inline-block">
                <h2 className="text-5xl md:text-6xl font-black uppercase text-black mb-4 relative z-10">
                  Vote for Excellence
                </h2>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-8 bg-[#fa0368] -skew-x-12 z-0"></div>
              </div>
              <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Help us recognize excellence in the fitness community by voting for your favorite nominees in each
                category. Voting closes on May 31, 2025.
              </p>
            </div>

            {showVoteSuccess && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-800 px-6 py-4 rounded-2xl max-w-4xl mx-auto shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <strong className="font-bold">Thank you for your vote!</strong>
                    <span className="block sm:inline">
                      {" "}
                      Your vote has been recorded. You can continue voting in other categories.
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-20">
              {awardCategories.map((category, index) => {
                const IconComponent = category.icon
                return (
                  <div key={category.id} className="space-y-8">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="p-4 bg-gradient-to-br from-[#dc5044] to-[#70adb0] rounded-2xl shadow-lg">
                          <IconComponent className="h-10 w-10 text-white" />
                        </div>
                        <div className="text-center">
                          <h3 className="text-3xl font-bold text-gray-800">{category.title}</h3>
                          <Link
                            href={`/awards/${category.slug}`}
                            className="text-[#fa0368] hover:text-[#dc5044] transition-colors text-sm"
                          >
                            View Award Details →
                          </Link>
                        </div>
                      </div>
                      <div className="w-24 h-1 bg-[#f3c532] mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {category.nominees.map((nominee) => (
                        <VotingCard
                          key={nominee.id}
                          nominee={nominee}
                          categoryId={category.id}
                          color={category.color}
                          onVote={handleVote}
                          hasVoted={hasVoted[category.id] || false}
                          isSubmitting={isSubmitting}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
