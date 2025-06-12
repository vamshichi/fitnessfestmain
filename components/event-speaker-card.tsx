import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import type { Speaker } from "@/data/events"

interface EventSpeakerCardProps {
  speaker: Speaker
  day: string
  time: string
  topic: string
}

export function EventSpeakerCard({ speaker, day, time, topic }: EventSpeakerCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="flex-shrink-0">
        <div className="relative w-[100px] h-[100px]">
          <div className={`absolute inset-0 rounded-full border-2 ${speaker.color} animate-spin-slow`}></div>
          <div className="absolute inset-0 m-1 rounded-full flex items-center justify-center z-10 overflow-hidden">
            <img src={speaker.image || "/placeholder.svg"} alt={speaker.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="flex-1">
        <Link
          href={`/speaker/${speaker.id}`}
          className="text-lg font-bold text-indigo-900 hover:text-orange-500 transition"
        >
          {speaker.name}
        </Link>
        <p className="text-gray-600 text-sm">{speaker.title}</p>

        <div className="mt-2 text-gray-700 text-sm">{topic}</div>

        <div className="flex flex-wrap gap-3 mt-3">
          <div className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full">
            <Calendar size={14} className="text-gray-500" />
            <span>{day}</span>
          </div>
          <div className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full">
            <Clock size={14} className="text-gray-500" />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
