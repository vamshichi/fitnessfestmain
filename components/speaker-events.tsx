import Link from "next/link"
import { events } from "@/data/events"

export function SpeakerEvents({ speakerId }: { speakerId: string }) {
  const speakerEvents = events.filter(event => event.speakerIds.includes(speakerId))

  if (speakerEvents.length === 0) {
    return <p className="mt-4 text-gray-500">No events available.</p>
  }

  return (
    <div className="mt-8">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Events</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {speakerEvents.map(event => (
      <div
        key={event.id}
        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <Link href={`/event/${event.id}`} className="block p-6">
          <h3 className="text-xl font-semibold text-purple-900 mb-2">{event.title}</h3>
          <p className="text-sm text-gray-600 mb-1">
            📅 {event.date} | 🕒 {event.timeRange}
          </p>
          <p className="text-sm text-gray-600">📍 {event.location}</p>
        </Link>
      </div>
    ))}
  </div>
</div>

  )
}
