"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, MapPin, Send, Award, Dumbbell } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { submitContactForm } from "./actions"
// import Link from "next/link"
import Image from "next/image"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.target as HTMLFormElement)
      formData.append("type", activeTab)

      // Call the server action
      const result = await submitContactForm(formData)

      if (result.success) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
          variant: "default",
        })

        // Reset the form
        const form = event.target as HTMLFormElement
        form.reset()

        console.log("Contact form submitted successfully with ID:", result.id)
      } else {
        throw new Error(result.error || "Something went wrong")
      }
    } catch (error: any) {
      console.error("Contact form submission error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to send your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* Hero Section */}
     <section className="min-h-[80vh] bg-cover bg-center py-20 flex items-center relative" style={{ backgroundImage: "url('/images/eventum-img1.jpg')" }}>
  <div
  className="absolute inset-0 bg-black opacity-80"></div>

  {/* Background Image */}
  

  <div className="container mx-auto px-4 text-center relative z-10 h-full flex flex-col justify-center">
    <h1 className="text-white text-5xl font-bold mb-4">Contact Us</h1>
  </div>
</section>


      {/* Contact Section */}
      <section className="py-16">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Contact Info Header */}
            <div className="text-center mb-12">
              <p className="text-pink-600 font-semibold mb-2">GET IN TOUCH</p>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                CONTACT US FOR
                <br />
                FURTHER INFORMATION!
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Maecenas cursus nulla commodo, cursus purus vitae, tempus lorem. Nunc gravida suscipit dignissim. Duis
                vitae, rhoncus. Duis faucibus, dignissim mollis, ut bibendum ligula bibendum quis, molestie.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">CONFERENCE HALL</h3>
                <p className="text-gray-600 text-sm">
                  Riverside Building, County Hall,
                  <br />
                  London Eye, London, UK
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">TICKET BOOKING</h3>
                <p className="text-gray-600 text-sm">
                  Phone No: 020 7946 0970
                  <br />
                  Email: booking@eventum.com
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">EVENT SCHEDULES</h3>
                <p className="text-gray-600 text-sm">
                  Date: Sept 22 - 24 Sept 2023
                  <br />
                  Time: 09:00am to 18:00pm
                </p>
              </div>
            </div>

            {/* Contact Form with Tabs */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <Tabs defaultValue="general" className="mb-6" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-6 bg-gray-100">
                  <TabsTrigger
                    value="general"
                    className="flex items-center gap-2 data-[state=active]:bg-pink-600 data-[state=active]:text-white"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="hidden sm:inline">General</span>
                    <span className="sm:hidden">Inquiry</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="competitor"
                    className="flex items-center gap-2 data-[state=active]:bg-pink-600 data-[state=active]:text-white"
                  >
                    <Dumbbell className="w-4 h-4" />
                    <span className="hidden sm:inline">Exhibitors</span>
                    <span className="sm:hidden">Exhibitors</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="sponsor"
                    className="flex items-center gap-2 data-[state=active]:bg-pink-600 data-[state=active]:text-white"
                  >
                    <Award className="w-4 h-4" />
                    <span className="hidden sm:inline">Sponsor</span>
                    <span className="sm:hidden">Sponsor</span>
                  </TabsTrigger>
                </TabsList>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <TabsContent value="general">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Have a question about our event? Our team is ready to help you with any general inquiries.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="competitor">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Interested in competing at our event? Tell us about your experience and which competitions
                        you're interested in.
                      </p>
                      <div>
                        <label htmlFor="fitness-level" className="block text-sm font-medium text-gray-700 mb-1">
                          Fitness Level
                        </label>
                        <Select name="fitnessLevel">
                          <SelectTrigger className="border-gray-300 focus:border-pink-500 focus:ring-pink-500">
                            <SelectValue placeholder="Select your fitness level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="elite">Elite/Professional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label htmlFor="competition-interest" className="block text-sm font-medium text-gray-700 mb-1">
                          Competition Interest
                        </label>
                        <Select name="competitionInterest">
                          <SelectTrigger className="border-gray-300 focus:border-pink-500 focus:ring-pink-500">
                            <SelectValue placeholder="Select competition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="powerlifting">Powerlifting Challenge</SelectItem>
                            <SelectItem value="crossfit">CrossFit Championship</SelectItem>
                            <SelectItem value="marathon">Fitness Marathon</SelectItem>
                            <SelectItem value="obstacle">Obstacle Course</SelectItem>
                            <SelectItem value="yoga">Yoga & Flexibility</SelectItem>
                            <SelectItem value="team">Team Challenge</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                          Previous Competition Experience
                        </label>
                        <Textarea
                          id="experience"
                          name="experience"
                          placeholder="Tell us about your previous competition experience"
                          rows={3}
                          className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="sponsor">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Interested in sponsoring our event? Let us know about your company and sponsorship interests.
                      </p>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name
                        </label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Your company name"
                          className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                          Company Website
                        </label>
                        <Input
                          id="website"
                          name="website"
                          placeholder="https://yourcompany.com"
                          className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="sponsorship-level" className="block text-sm font-medium text-gray-700 mb-1">
                          Sponsorship Level Interest
                        </label>
                        <Select name="sponsorshipLevel">
                          <SelectTrigger className="border-gray-300 focus:border-pink-500 focus:ring-pink-500">
                            <SelectValue placeholder="Select sponsorship level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="platinum">Platinum Sponsor</SelectItem>
                            <SelectItem value="gold">Gold Sponsor</SelectItem>
                            <SelectItem value="silver">Silver Sponsor</SelectItem>
                            <SelectItem value="bronze">Bronze Sponsor</SelectItem>
                            <SelectItem value="custom">Custom Package</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Common fields for all tabs */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                        className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        required
                        className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Message subject"
                      required
                      className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message"
                      rows={5}
                      required
                      className="border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                    />
                  </div>

                  <div className="text-center">
                    <Button
                      type="submit"
                      className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          SUBMIT MESSAGE
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
