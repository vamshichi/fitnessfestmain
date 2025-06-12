"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { speakers } from "@/data/events"
import { useState } from "react"

// Speaker card component
function SpeakerCard({ speaker, index }: { speaker: typeof speakers[0]; index: number }) {
  return (
    <div className="max-w-6xl mx-auto px-4 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={speaker.image || "/placeholder.svg"}
          alt={speaker.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{speaker.name}</h3>
        <p className="text-purple-600 mb-2">{speaker.title}</p>
        <p className="text-gray-500 mb-4">{speaker.day} - {speaker.timing}</p>
        <p className="text-gray-700 mb-4 line-clamp-3">{speaker.bio}</p>
        <Link href={`/speakers/${index}`}>
          <Button variant="outline" className="w-full">
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  )
}

// Featured speaker card component
function FeaturedSpeakerCard({ speaker, index }: { speaker: typeof speakers[0]; index: number }) {
  return (
    <div className={`bg-gradient-to-br from-purple-900 to-purple-700 text-white rounded-xl overflow-hidden shadow-lg`}>
      <div className="md:flex">
        <div className="md:w-1/3 relative h-64 md:h-auto">
          <Image
            src={speaker.image || "/placeholder.svg"}
            alt={speaker.name}
            fill
            className="object-cover h-full w-full"
          />
        </div>
        <div className="md:w-2/3 p-6 md:p-8">
          <div className="uppercase tracking-wide text-xs font-semibold mb-1">Featured Speaker</div>
          <h3 className="text-2xl font-bold mb-2">{speaker.name}</h3>
          <p className="text-purple-200 mb-2">
            {speaker.title}
          </p>
          <p className="mb-4 opacity-90">{speaker.bio}</p>
          <Link href={`/speakers/${index}`}>
            <Button className="bg-white text-purple-700 hover:bg-gray-100">View Profile</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Define categories based on speaker titles
const getCategoryFromTitle = (title: string) => {
  if (title.includes("Lead")) return "leadership"
  if (title.includes("Founder")) return "entrepreneurship"
  if (title.includes("Developer")) return "development"
  if (title.includes("Trainer")) return "education"
  return "other"
}

export default function SpeakersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  
  // Get featured speakers (first 2 for this example)
  const featuredSpeakers = speakers.slice(0, 2)
  
  // Filter speakers based on search query
  const filteredSpeakers = speakers.filter(speaker => 
    speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    speaker.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    speaker.bio.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Get unique categories
  const categories = Array.from(
    new Set(speakers.map(speaker => getCategoryFromTitle(speaker.title)))
  )

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative text-white py-20">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gray-800"
          style={{ backgroundImage: "url('/placeholder.svg?height=600&width=1600')" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-purple-700 opacity-40" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Speakers</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Learn from industry leaders and experts who are shaping the future of technology
            </p>
          </div>
        </div>
      </section>

      {/* Featured Speakers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Speakers</h2>
          <div className="grid gap-8">
            {featuredSpeakers.map((speaker, index) => (
              <FeaturedSpeakerCard key={speaker.id} speaker={speaker} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* All Speakers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold mb-4 md:mb-0">All Speakers</h2>
            <div className="w-full md:w-64">
              <Input 
                placeholder="Search speakers..." 
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredSpeakers.map((speaker, index) => (
                  <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
                ))}
              </div>
            </TabsContent>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredSpeakers
                    .filter((speaker) => getCategoryFromTitle(speaker.title) === category)
                    .map((speaker, index) => (
                      <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Become a Speaker */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Want to Speak at DevCon?</h2>
            <p className="text-gray-600 mb-8">
              We're always looking for passionate and knowledgeable speakers to share their expertise with our audience.
              If you have insights, experiences, or knowledge that could benefit others, we'd love to hear from you.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Link href="/contact">Apply to Speak</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Don't Miss This Opportunity</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Secure your spot at DevCon 2024 and learn from these amazing speakers in person.
          </p>
          <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
            <Link href="/tickets">Get Your Ticket Now</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
