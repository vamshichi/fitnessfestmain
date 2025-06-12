"use client"

// import { useState } from "react"
// import Link from "next/link"
// import { CalendarClock, MapPin } from "lucide-react"
// import { events } from "@/data/events"
import Schedule from "@/components/events"

export default function EventPage() {
//   const eventDates = ["12 October 2025", "13 October 2025"]
//   const [selectedDate, setSelectedDate] = useState(eventDates[0])

//   const dateEvents = events.filter((event) => event.date === selectedDate)

  return (
    <>
      <section className="min-h-[80vh] bg-cover bg-center py-20 flex items-center relative" style={{ backgroundImage: "url('/images/eventum-img1.jpg')" }}>
  <div
  className="absolute inset-0 bg-black opacity-80"></div>

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-3xl mx-auto text-center">
   <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-white">
  Events
</h1>
    </div>
  </div>
</section>
    <Schedule />
    </>

  )
}
