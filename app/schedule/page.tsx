import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Schedule data
const scheduleData = {
  day1: [
    {
      id: "d1s1",
      time: "09:00 - 10:00",
      title: "Registration and Welcome Coffee",
      description:
        "Pick up your badge and conference materials while enjoying coffee and networking with fellow attendees.",
      location: "Main Lobby",
      type: "break",
      speaker: null,
    },
    {
      id: "d1s2",
      time: "10:00 - 11:00",
      title: "Opening Keynote: The Future of Technology",
      description: "An inspiring talk about emerging trends and the future direction of technology in the next decade.",
      location: "Main Hall",
      type: "keynote",
      speaker: {
        name: "Mike Fermalin",
        role: "Career Expert",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "d1s3",
      time: "11:15 - 12:15",
      title: "Building Scalable Web Applications",
      description: "Learn best practices for creating web applications that can handle millions of users.",
      location: "Room A",
      type: "workshop",
      speaker: {
        name: "Michael Rooker",
        role: "Developer Expert",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "d1s4",
      time: "11:15 - 12:15",
      title: "AI in Business: Practical Applications",
      description: "Discover how businesses are leveraging AI to improve operations and customer experiences.",
      location: "Room B",
      type: "talk",
      speaker: {
        name: "Anna Blair",
        role: "Founder",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "d1s5",
      time: "12:30 - 13:30",
      title: "Lunch Break",
      description: "Enjoy a delicious lunch while networking with speakers and attendees.",
      location: "Dining Area",
      type: "break",
      speaker: null,
    },
    {
      id: "d1s6",
      time: "13:45 - 14:45",
      title: "Modern Frontend Development",
      description: "Explore the latest tools and techniques for building modern, responsive user interfaces.",
      location: "Room A",
      type: "workshop",
      speaker: {
        name: "Trevor J. Bell",
        role: "Lead Trainer",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "d1s7",
      time: "13:45 - 14:45",
      title: "Cybersecurity Best Practices",
      description: "Learn how to protect your applications and data from security threats.",
      location: "Room B",
      type: "talk",
      speaker: {
        name: "James Wilson",
        role: "Security Expert",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "d1s8",
      time: "15:00 - 16:00",
      title: "Panel Discussion: The Future of Work",
      description:
        "Industry leaders discuss how technology is changing the workplace and what skills will be in demand.",
      location: "Main Hall",
      type: "panel",
      speaker: {
        name: "Multiple Speakers",
        role: "Various Companies",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "d1s9",
      time: "16:15 - 17:15",
      title: "Networking Reception",
      description: "Mingle with speakers and fellow attendees over drinks and appetizers.",
      location: "Terrace",
      type: "break",
      speaker: null,
    },
  ],
  day2: [
    {
      id: "d2s1",
      time: "09:00 - 09:30",
      title: "Morning Coffee",
      description: "Start your day with coffee and networking.",
      location: "Main Lobby",
      type: "break",
      speaker: null,
    },
    {
      id: "d2s2",
      time: "09:30 - 10:30",
      title: "Keynote: Innovation in Tech",
      description: "A thought-provoking talk on fostering innovation in technology companies.",
      location: "Main Hall",
      type: "keynote",
      speaker: {
        name: "David B. Perez",
        role: "Founder",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "d2s3",
      time: "10:45 - 11:45",
      title: "Cloud Architecture Patterns",
      description: "Learn about effective cloud architecture patterns for modern applications.",
      location: "Room A",
      type: "workshop",
      speaker: {
        name: "Sarah Johnson",
        role: "CTO",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "d2s4",
      time: "10:45 - 11:45",
      title: "UX Design for Developers",
      description: "Understand the principles of user experience design and how to apply them in your projects.",
      location: "Room B",
      type: "talk",
      speaker: {
        name: "Priya Sharma",
        role: "UX Director",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "d2s5",
      time: "12:00 - 13:00",
      title: "Lunch Break",
      description: "Enjoy lunch and networking opportunities.",
      location: "Dining Area",
      type: "break",
      speaker: null,
    },
    {
      id: "d2s6",
      time: "13:15 - 14:15",
      title: "Advanced Machine Learning Techniques",
      description: "Dive deep into advanced ML algorithms and their practical applications.",
      location: "Room A",
      type: "workshop",
      speaker: {
        name: "Marcus Chen",
        role: "AI Researcher",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "d2s7",
      time: "13:15 - 14:15",
      title: "Building a Tech Startup",
      description:
        "Learn from experienced founders about the challenges and opportunities in launching a tech startup.",
      location: "Room B",
      type: "talk",
      speaker: {
        name: "Agustin Todaro",
        role: "Founder",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "d2s8",
      time: "14:30 - 15:30",
      title: "Hackathon Kickoff",
      description: "Form teams and start working on innovative solutions to real-world problems.",
      location: "Innovation Lab",
      type: "workshop",
      speaker: null,
    },
    {
      id: "d2s9",
      time: "15:45 - 17:00",
      title: "Networking Event",
      description: "Connect with industry professionals and potential collaborators.",
      location: "Garden Area",
      type: "break",
      speaker: null,
    },
  ],
  day3: [
    {
      id: "d3s1",
      time: "09:00 - 09:30",
      title: "Morning Coffee",
      description: "Start your day with coffee and networking.",
      location: "Main Lobby",
      type: "break",
      speaker: null,
    },
    {
      id: "d3s2",
      time: "09:30 - 10:30",
      title: "Keynote: Technology for Social Good",
      description: "Exploring how technology can be leveraged to address social challenges and create positive impact.",
      location: "Main Hall",
      type: "keynote",
      speaker: {
        name: "Trisha Fisher",
        role: "President",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "d3s3",
      time: "10:45 - 11:45",
      title: "Remote Work and Digital Nomadism",
      description: "Strategies for successful remote work and building a location-independent career in tech.",
      location: "Room A",
      type: "talk",
      speaker: {
        name: "Jon P. Monroe",
        role: "Traveller & Tech Nomad",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "d3s4",
      time: "10:45 - 11:45",
      title: "DevOps Best Practices",
      description: "Learn how to implement effective DevOps practices in your organization.",
      location: "Room B",
      type: "workshop",
      speaker: {
        name: "Michael Rooker",
        role: "Developer Expert",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "d3s5",
      time: "12:00 - 13:00",
      title: "Lunch Break",
      description: "Final networking lunch of the conference.",
      location: "Dining Area",
      type: "break",
      speaker: null,
    },
    {
      id: "d3s6",
      time: "13:15 - 14:15",
      title: "Hackathon Presentations",
      description: "Teams present their solutions developed during the hackathon.",
      location: "Main Hall",
      type: "presentation",
      speaker: null,
    },
    {
      id: "d3s7",
      time: "14:30 - 15:30",
      title: "Awards Ceremony",
      description: "Recognition of hackathon winners and outstanding contributions.",
      location: "Main Hall",
      type: "ceremony",
      speaker: null,
    },
    {
      id: "d3s8",
      time: "15:45 - 16:45",
      title: "Closing Keynote: Looking Ahead",
      description: "Reflections on the conference and insights into future tech trends.",
      location: "Main Hall",
      type: "keynote",
      speaker: {
        name: "Mike Fermalin",
        role: "Career Expert",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "d3s9",
      time: "17:00 - 19:00",
      title: "Farewell Reception",
      description: "Celebrate the end of a successful conference with drinks, food, and music.",
      location: "Terrace",
      type: "break",
      speaker: null,
    },
  ],
}

// Session card component
function SessionCard({ session }: { session: (typeof scheduleData.day1)[0] }) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "keynote":
        return "bg-purple-100 text-purple-800"
      case "workshop":
        return "bg-blue-100 text-blue-800"
      case "talk":
        return "bg-green-100 text-green-800"
      case "panel":
        return "bg-amber-100 text-amber-800"
      case "presentation":
        return "bg-indigo-100 text-indigo-800"
      case "ceremony":
        return "bg-rose-100 text-rose-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <div className="flex items-center mb-3 md:mb-0 md:mr-4">
          <Clock className="w-5 h-5 text-gray-500 mr-2" />
          <span className="text-gray-700 font-medium">{session.time}</span>
        </div>

        <div className="flex items-center mb-3 md:mb-0 md:mr-4">
          <MapPin className="w-5 h-5 text-gray-500 mr-2" />
          <span className="text-gray-700">{session.location}</span>
        </div>

        {session.type && (
          <Badge className={`${getTypeColor(session.type)} ml-0 md:ml-auto`}>
            {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
          </Badge>
        )}
      </div>

      <h3 className="text-xl font-bold mb-2">{session.title}</h3>
      <p className="text-gray-600 mb-4">{session.description}</p>

      {session.speaker && (
        <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image
              src={session.speaker.image || "/placeholder.svg"}
              alt={session.speaker.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{session.speaker.name}</p>
            <p className="text-gray-500 text-sm">{session.speaker.role}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SchedulePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Event Schedule</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Three days of inspiring talks, hands-on workshops, and networking opportunities
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>July 17-19, 2024</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Tech Convention Center, Boston</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold mb-4 md:mb-0">Conference Schedule</h2>
            <div className="w-full md:w-64">
              <Input placeholder="Search sessions..." className="w-full" />
            </div>
          </div>

          <Tabs defaultValue="day1" className="w-full">
            <TabsList className="mb-8 w-full justify-start">
              <TabsTrigger value="day1" className="flex-1 md:flex-none">
                <Calendar className="w-4 h-4 mr-2" />
                Day 1 (July 17)
              </TabsTrigger>
              <TabsTrigger value="day2" className="flex-1 md:flex-none">
                <Calendar className="w-4 h-4 mr-2" />
                Day 2 (July 18)
              </TabsTrigger>
              <TabsTrigger value="day3" className="flex-1 md:flex-none">
                <Calendar className="w-4 h-4 mr-2" />
                Day 3 (July 19)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="day1">
              <div>
                {scheduleData.day1.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="day2">
              <div>
                {scheduleData.day2.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="day3">
              <div>
                {scheduleData.day3.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Take the Schedule With You</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Download the complete schedule to your device or add it to your calendar to make sure you don't miss any
            sessions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Calendar className="w-5 h-5 mr-2" />
              Add to Calendar
            </Button>
            <Button variant="outline">Download PDF</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Secure your spot at DevCon 2024 and experience all these amazing sessions in person.
          </p>
          <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
            <Link href="/tickets">Get Your Ticket Now</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
