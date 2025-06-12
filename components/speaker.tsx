'use client'

import Image from "next/image"
import Link from "next/link"
import { speakers } from "@/data/events"

export default function SpeakerSection() {
  return (
    <div className="py-12 px-4 text-center">
      <p className="font-semibold uppercase mb-2">Speakers</p>
      <h2 className="text-3xl font-extrabold mb-8">Leading Fitness Speakers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 justify-items-center">
        {speakers.map((speaker) => (
          <Link
            href={`/speakers/${speaker.id}`} // Use speaker.id here instead of array index
            key={speaker.id} // Use speaker.id for the key as well
            className="group relative flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
          >
            {/* Wrapper to align the rotating border and image */}
            <div className="relative w-[220px] h-[220px]">
              {/* Rotating dotted border */}
              <div className={`absolute inset-0 rounded-full border-2 ${speaker.color} border-solid transition-all duration-300 group-hover:border-dashed animate-spin`} />
  
              {/* Speaker image */}
              <div className="absolute inset-0 m-2 bg-gray-300 rounded-full flex items-center justify-center text-black text-xl z-10 overflow-hidden">
                <img
                  src={speaker.image || "/placeholder.svg"}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Speaker Info */}
            <div
              className="mt-4 text-center bg-no-repeat bg-center bg-cover"
              style={{ backgroundImage: "url('/images/png.png')" }}
            >
              <h3 className="mt-4 text-lg font-extrabold text-slate-900">{speaker.name}</h3>
              <p className="text-sm text-gray-600">{speaker.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
