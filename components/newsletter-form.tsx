"use client"

import type React from "react"

import { useState } from "react"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setMessage("Please enter your email address")
      return
    }

    setIsSubmitting(true)
    setMessage("")

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setMessage("Thank you for subscribing!")
      setEmail("")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-white text-purple-900 font-medium rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-70"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </div>

      {message && <p className="mt-2 text-sm text-white/80">{message}</p>}
    </form>
  )
}
