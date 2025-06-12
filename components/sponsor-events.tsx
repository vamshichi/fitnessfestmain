"use client"

import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { events } from "@/data/events"

interface SponsorEventsProps {
  sponsorId: string
}

export function SponsorEvents({ sponsorId }: SponsorEventsProps) {
  // Filter events where this sponsor is participating
  const sponsoredEvents = events.filter((event) => event.sponsorIds && event.sponsorIds.includes(sponsorId))

  if (sponsoredEvents.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-purple-900 mb-4">Sponsored Events</h2>
        <p className="text-gray-500">This sponsor is not currently sponsoring any events.</p>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-purple-900 mb-4">Sponsored Events</h2>
      <div className="grid grid-cols-1 gap-4">
        {sponsoredEvents.map((event) => (
          <Link href={`/event/${event.id}`} key={event.id}>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg mb-2">{event.title}</h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">{event.timeRange}</Badge>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
