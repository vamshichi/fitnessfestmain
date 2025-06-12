"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

const scheduleData = {
  day1: [
    {
      id: 1,
      time: "09:00 - 11:00 AM",
      date: "August 12",
      title: "Registration for opening workshop",
      location: "Monthon city hall, New York",
      description:
        "We're inviting the top creatives in the tech industry from all over the world to come learn, grow, scrape their knees, try new things, to be vulnerable.",
    },
    {
      id: 2,
      time: "12:30 - 02:00 PM",
      date: "August 12",
      title: "Meeting with world class investors",
      location: "Monthon city hall, New York",
      description:
        "We're inviting the top creatives in the tech industry from all over the world to come learn, grow, scrape their knees, try new things, to be vulnerable.",
    },
    {
      id: 3,
      time: "02:30 - 05:30 PM",
      date: "August 12",
      title: "Discussion about benefits of online meetings",
      location: "Monthon city hall, New York",
      description:
        "We're inviting the top creatives in the tech industry from all over the world to come learn, grow, scrape their knees, try new things, to be vulnerable.",
    },
  ],
  day2: [
    {
      id: 4,
      time: "09:00 - 11:00 AM",
      date: "August 13",
      title: "Discussion about the benefit of group work",
      location: "Monthon city hall, New York",
      description:
        "We're inviting the top creatives in the tech industry from all over the world to come learn, grow, scrape their knees, try new things, to be vulnerable.",
    },
    {
      id: 5,
      time: "12:30 - 02:00 PM",
      date: "August 13",
      title: "Meeting With worldclass creators",
      location: "Monthon city hall, New York",
      description:
        "We're inviting the top creatives in the tech industry from all over the world to come learn, grow, scrape their knees, try new things, to be vulnerable.",
    },
    {
      id: 6,
      time: "02:30 - 05:30 PM",
      date: "August 13",
      title: "A documentary film about success",
      location: "Monthon city hall, New York",
      description:
        "We're inviting the top creatives in the tech industry from all over the world to come learn, grow, scrape their knees, try new things, to be vulnerable.",
    },
  ],
}

export default function ScheduleTab() {
  const [activeTab, setActiveTab] = useState("day1")
  const [expandedItems, setExpandedItems] = useState<number[]>([1])

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="rounded-xl shadow-lg bg-gray-100 flex flex-col md:flex-row overflow-hidden">
      {/* Vertical Tabs */}
      <div className="flex md:flex-col items-center md:items-start gap-2 px-4 py-4 md:py-6 overflow-x-auto md:overflow-visible bg-white shrink-0">
        {["day1", "day2"].map((day, idx) => {
          const isActive = activeTab === day
          const colors = [
            { base: "bg-pink-300", active: "bg-pink-600", triangle: "border-l-pink-600" },
            { base: "bg-yellow-300", active: "bg-yellow-500", triangle: "border-l-yellow-500" },
          ][idx]

          return (
            <button
              key={day}
              className={`relative w-28 md:w-24 h-16 md:h-40 flex items-center justify-center text-white font-bold transition-all duration-300 rounded-md md:rounded-none ${
                isActive ? colors.active : colors.base
              }`}
              onClick={() => setActiveTab(day)}
            >
              <span className="transform md:-rotate-90 whitespace-nowrap text-sm">
                {`${idx + 1} Day`}
              </span>
              {isActive && (
                <div
                  className={`hidden md:block absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[15px] ${colors.triangle}`}
                ></div>
              )}
            </button>
          )
        })}
      </div>

      {/* Schedule Content */}
      <div className="p-4 sm:p-6 flex-1">
        {scheduleData[activeTab as keyof typeof scheduleData].map((item) => (
          <div key={item.id} className="mb-6 last:mb-0 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row gap-6 p-4 sm:p-6">
              <div className="md:w-1/4 flex items-start gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{item.date.split(" ")[1]}</div>
                  <div className="text-gray-600">{item.date.split(" ")[0]}</div>
                  <div className="text-sm text-gray-500 mt-2">{item.time}</div>
                </div>
              </div>
              <div className="md:w-3/4">
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                  <MapPin size={16} />
                  <span>{item.location}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
                {expandedItems.includes(item.id) && (
                  <p className="text-gray-700 mt-2">
                    Epic adventures Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic
                    fingerstache fanny pack nostrud...
                  </p>
                )}
                <button
                  className="mt-4 flex items-center text-purple-600 hover:text-purple-800 text-sm"
                  onClick={() => toggleExpand(item.id)}
                >
                  {expandedItems.includes(item.id) ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
