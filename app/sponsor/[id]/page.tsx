"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { sponsors } from "@/data/events"
import { SponsorProfile } from "@/components/sponsor-profile"
import { SponsorInfo } from "@/components/sponsor-info"
import { SponsorEvents } from "@/components/sponsor-events"

export default function SponsorDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const sponsorId = resolvedParams.id

  // Check if the sponsor exists
  const sponsor = sponsors.find((sponsor) => sponsor.id === sponsorId)

  if (!sponsor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Sponsor not found</h1>
        <Link href="/sponsors" className="text-purple-500 hover:underline flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to sponsors
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Link href="/sponsors" className="text-purple-500 hover:underline flex items-center gap-2 mb-8">
        <ArrowLeft size={16} />
        Back to sponsors
      </Link>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Sponsor profile */}
          <div className="md:col-span-1">
            <SponsorProfile sponsor={sponsor} />
          </div>

          {/* Right column - Sponsor information */}
          <div className="md:col-span-2">
            <SponsorInfo sponsor={sponsor} />

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-purple-900 mb-4">About {sponsor.name}</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-700 leading-relaxed">{sponsor.description}</p>
              </div>
            </div>

            <SponsorEvents sponsorId={sponsor.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
