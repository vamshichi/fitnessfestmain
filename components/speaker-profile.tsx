"use client"

import { Facebook, Twitter } from "lucide-react"
import type { Speaker } from "@/data/events"
import Link from "next/link"

interface SpeakerProfileProps {
  speaker: Speaker
}

export function SpeakerProfile({ speaker }: SpeakerProfileProps) {
  return (
    <div className=" flex flex-col bg-gray-200 p-18 item-center md:flex-row gap-8">
      <div className="flex flex-col items-center">
        {/* Speaker image with rotating border */}
        <div className="relative w-[220px] h-[220px] group">
  <div className={`absolute inset-0 rounded-full border-2 ${speaker.color} border-solid transition-all duration-300 group-hover:border-dashed animate-spin`} />
  
  <div className="absolute inset-0 m-2 bg-gray-300 rounded-full flex items-center justify-center text-black text-xl z-10 overflow-hidden">
    <img src={speaker.image || "/placeholder.svg"} alt={speaker.name} className="w-full h-full object-cover" />
  </div>
</div>

        {/* Speaker name and title with decorative background */}
        <div className="mt-6 text-center relative">
          <div className="absolute -z-10 -left-8 -top-4">
            <div className="w-16 h-16 bg-purple-200 rounded-tl-3xl"></div>
          </div>
          <div className="absolute -z-10 -right-8 -bottom-4">
            <div className="w-16 h-16 bg-blue-200 rounded-br-3xl"></div>
          </div>
          <h1 className="text-xl font-bold text-purple-900">{speaker.name}</h1>
          <p className="text-gray-700">{speaker.title}</p>
        </div>

        {/* Social media links */}
        <div className="flex gap-2 mt-4">
          <Link
            href={speaker.socialLinks?.facebook || "#"}
            className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white"
          >
            <Facebook size={18} />
          </Link>
          <Link
            href={speaker.socialLinks?.twitter || "#"}
            className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white"
          >
            <Twitter size={18} />
          </Link>
          <Link
            href={speaker.socialLinks?.pinterest || "#"}
            className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
