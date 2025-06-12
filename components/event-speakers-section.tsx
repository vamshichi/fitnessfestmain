"use client"

import Image from "next/image"
import Link from "next/link"
import { getSpeakerById } from "@/data/speakers" // Adjust the import if needed

type Props = {
  event: {
    id: string
    title: string
    description: string
    date: string
    timeRange: string
    location: string
    price: string | number
    image: string
    speakerIds?: string[] // Speaker IDs associated with this event
    startDate?: string
    endDate?: string
  }
}

export function EventSpeakersSection({ event }: Props) {
  // Early return if no speakers
  if (!event.speakerIds || event.speakerIds.length === 0) {
    return (
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">No Speakers Available</h2>
      </div>
    )
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Speakers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {event.speakerIds.map((id) => {
          // Fetch the speaker by ID
          const speaker = getSpeakerById(id)

          // If no speaker is found, skip this iteration
          if (!speaker) return null

          return (
            <Link href={`/speakers/${speaker.id}`} key={speaker.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={speaker.image || "/placeholder.svg"} // Placeholder if no image is available
                    alt={speaker.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-indigo-900">{speaker.name}</h3>
                  <p className="text-gray-600">{speaker.title}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
