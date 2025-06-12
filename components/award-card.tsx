'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrophy } from "@fortawesome/free-solid-svg-icons"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"

interface AwardCardProps {
  icon: IconDefinition
  title: string
  winner?: string
  description: string
  tags: string[]
  color: string // Changed from "red" | "teal" | "yellow" to string
}

export default function AwardCard({ icon, title, winner, description, tags, color }: AwardCardProps) {
  const getHeaderColor = () => {
    switch (color) {
      case "red":
        return "bg-[#dc5044] text-white"
      case "teal":
        return "bg-[#70adb0] text-white"
      case "yellow":
        return "bg-[#f3c532] text-black"
      default:
        return `bg-[${color}] text-white` // Fallback for custom colors
    }
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative z-10 group">
      <div className={`p-6 relative ${getHeaderColor()}`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2720%27%20height%3D%2720%27%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.1%27%20fill-rule%3D%27evenodd%27%3E%3Ccircle%20cx%3D%273%27%20cy%3D%273%27%20r%3D%273%27%2F%3E%3Ccircle%20cx%3D%2713%27%20cy%3D%2713%27%20r%3D%273%27%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
        <div className="text-4xl mb-4 relative z-10">
          <FontAwesomeIcon icon={icon} />
        </div>
        <h3 className="text-xl font-bold relative z-10">{title}</h3>
      </div>

      <div className="p-6">
        {winner && (
          <p className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-3">
            <FontAwesomeIcon icon={faTrophy} className="text-[#f3c532]" />
            {winner}
          </p>
        )}

        <p className="text-gray-600 mb-6">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold text-gray-600">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
