"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { speakers } from "@/data/events"
import { SpeakerProfile } from "@/components/speaker-profile"
import { SpeakerInfo } from "@/components/speaker-info"
import { SpeakerEvents } from "@/components/speaker-events"

export default function SpeakerDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const speakerId = resolvedParams.id

  // Check if the speaker exists
  const speaker = speakers.find(speaker => speaker.id === speakerId)

  if (!speaker) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Speaker not found</h1>
        <Link href="/" className="text-blue-500 hover:underline flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to speakers
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Link href="/" className="text-blue-500 hover:underline flex items-center gap-2 mb-8">
        <ArrowLeft size={16} />
        Back to speakers
      </Link>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Speaker profile */}
          <div className="md:col-span-1">
            <SpeakerProfile speaker={speaker} />
          </div>

          {/* Right column - Speaker information */}
          <div className="md:col-span-2">
            <SpeakerInfo speaker={speaker} />

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Personal Information</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-700 leading-relaxed">{speaker.bio}</p>
              </div>
            </div>

            <SpeakerEvents speakerId={speaker.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
