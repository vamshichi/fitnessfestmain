"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: string
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = target - now

      const d = Math.floor(difference / (1000 * 60 * 60 * 24))
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((difference % (1000 * 60)) / 1000)

      setDays(d)
      setHours(h)
      setMinutes(m)
      setSeconds(s)

      if (difference <= 0) {
        clearInterval(interval)
        setDays(0)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
      <div className="bg-white p-4 sm:p-5 rounded-lg shadow w-full">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-600">{days}</div>
        <div className="text-gray-700 text-sm sm:text-base mt-2">Days</div>
      </div>
      <div className="bg-white p-4 sm:p-5 rounded-lg shadow w-full">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-500">{hours}</div>
        <div className="text-gray-700 text-sm sm:text-base mt-2">Hours</div>
      </div>
      <div className="bg-white p-4 sm:p-5 rounded-lg shadow w-full">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-500">{minutes}</div>
        <div className="text-gray-700 text-sm sm:text-base mt-2">Minutes</div>
      </div>
      <div className="bg-white p-4 sm:p-5 rounded-lg shadow w-full">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-500">{seconds}</div>
        <div className="text-gray-700 text-sm sm:text-base mt-2">Seconds</div>
      </div>
    </div>
  )
}
