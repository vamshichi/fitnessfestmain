"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Calendar, Clock, MapPin, Star } from "lucide-react"

// Ticket data with pink color scheme
const tickets = [
  {
    id: "basic",
    name: "Basic Pass",
    price: 43,
    color: "pink-300",
    features: [
      "Back Row Seat",
      "Free Lunch & Snacks",
      "Event Certificate",
      "1 Workshop",
      "Access to Keynote Sessions",
      "Conference Materials",
    ],
  },
  {
    id: "premium",
    name: "Premium Pass",
    price: 143,
    color: "pink-500",
    features: [
      "Middle Row Seat",
      "Free Lunch & Snacks",
      "Event Certificate",
      "3 Workshops",
      "Access to All Sessions",
      "Conference Materials",
      "Networking Reception",
      "Digital Content Access",
    ],
    recommended: true,
  },
  {
    id: "platinum",
    name: "Platinum Pass",
    price: 243,
    color: "pink-600",
    features: [
      "Front Row Seat",
      "Free Lunch & Snacks",
      "Event Certificate",
      "All Workshops",
      "Access to All Sessions",
      "Conference Materials",
      "Networking Reception",
      "Digital Content Access",
      "VIP Dinner",
      "Exclusive Q&A with Speakers",
      "1-Year Membership to DevCon Community",
    ],
  },
]

// Ticket card component
function TicketCard({
  ticket,
  selected,
  onSelect,
}: {
  ticket: (typeof tickets)[0]
  selected: boolean
  onSelect: () => void
}) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "pink-400":
        return {
          header: "bg-pink-300",
          border: selected ? "ring-2 ring-pink-300 shadow-lg shadow-pink-200" : "",
          button: selected
            ? "bg-pink-300 hover:bg-pink-400 text-white"
            : "border-pink-300 text-pink-600 hover:bg-pink-50",
        }
      case "pink-400":
        return {
          header: "bg-pink-500",
          border: selected ? "ring-2 ring-pink-500 shadow-lg shadow-pink-300" : "",
          button: selected
            ? "bg-pink-500 hover:bg-pink-600 text-white"
            : "border-pink-500 text-pink-600 hover:bg-pink-50",
        }
      case "pink-400":
        return {
          header: "bg-pink-600",
          border: selected ? "ring-2 ring-pink-600 shadow-lg shadow-pink-400" : "",
          button: selected
            ? "bg-pink-600 hover:bg-pink-700 text-white"
            : "border-pink-600 text-pink-600 hover:bg-pink-50",
        }
      default:
        return {
          header: "bg-pink-500",
          border: selected ? "ring-2 ring-pink-500" : "",
          button: selected
            ? "bg-pink-500 hover:bg-pink-600 text-white"
            : "border-pink-500 text-pink-600 hover:bg-pink-50",
        }
    }
  }

  const colorClasses = getColorClasses(ticket.color)

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${colorClasses.border} ${ticket.recommended ? "transform scale-105 border-2 border-pink-400" : "hover:-translate-y-2"}`}
    >
      {ticket.recommended && (
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white text-center py-2 text-sm font-medium flex items-center justify-center gap-1">
          <Star className="w-4 h-4 fill-current" />
          Most Popular
        </div>
      )}

      <div className={`${colorClasses.header} p-6 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">{ticket.name}</h3>
          <div className="text-4xl font-bold">
            <sup className="text-xl">₹</sup>
            {ticket.price}
            <span className="text-lg font-normal opacity-80 ml-1">INR</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <ul className="space-y-3 mb-8">
          {ticket.features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                <Check className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={onSelect}
          className={`w-full py-3 px-4 text-center rounded-lg font-semibold transition-all duration-200 border-2 ${
            selected ? colorClasses.button : `${colorClasses.button} bg-white hover:shadow-md`
          }`}
        >
          {selected ? "Select Ticket" : "Select Ticket"}
        </Button>
      </div>
    </div>
  )
}

export default function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>("premium")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="min-h-[60vh] bg-cover bg-center py-20 flex items-center relative" style={{ backgroundImage: "url('/images/eventum-img1.jpg')" }}>
  <div
  className="absolute inset-0 bg-black opacity-80"
></div>

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-3xl mx-auto text-center">
   <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-white">
Get Your Tickets
</h1>
    </div>
  </div>
</section>

        {/* Event Details */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl shadow-lg border border-pink-100">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Event Details</h2>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="w-10 h-10 bg-pink-200 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <Calendar className="w-5 h-5 text-pink-600" />
                        </div>
                        <div>
                          <span className="font-semibold block text-gray-800">Date</span>
                          <span className="text-gray-600">July 17-19, 2024</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <Clock className="w-5 h-5 text-pink-600" />
                        </div>
                        <div>
                          <span className="font-semibold block text-gray-800">Time</span>
                          <span className="text-gray-600">9:00 AM - 6:00 PM</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <MapPin className="w-5 h-5 text-pink-600" />
                        </div>
                        <div>
                          <span className="font-semibold block text-gray-800">Location</span>
                          <span className="text-gray-600">Tech Convention Center</span>
                          <span className="text-gray-600 block">Boston, Canada</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">What to Expect</h2>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">50+ Inspiring Sessions</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">20+ Hands-on Workshops</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Networking Opportunities</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Industry-Leading Speakers</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Product Exhibitions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tickets Section */}
        <section className="py-20 bg-gradient-to-br from-pink-50 via-white to-pink-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
                  Choose Your Pass
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Select the perfect ticket for your DevCon 2024 experience. All passes include access to our main
                  conference sessions.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {tickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    selected={selectedTicket === ticket.id}
                    onSelect={() => setSelectedTicket(ticket.id)}
                  />
                ))}
              </div>

             
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Join DevCon 2024?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Don't miss out on the biggest tech conference of the year. Limited seats available!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 font-semibold rounded-full">
                View Schedule
              </Button>
              <Button className="border-2 border-white bg-transprant text-white hover:bg-white hover:text-pink-600 px-8 py-3 font-semibold rounded-full">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
