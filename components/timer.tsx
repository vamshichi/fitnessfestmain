"use client"
import { useState, useEffect } from "react"

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 217,
    hours: 22,
    minutes: 30,
    seconds: 28,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="
  absolute 
  bottom-[-4rem] 
  left-1/2 
  -translate-x-1/2 
  lg:left-auto 
  lg:right-45 
  lg:translate-x-0 
  z-10 
  w-[90%] 
  max-w-xl
">

      <div className="bg-white rounded-[40px] shadow-2xl px-6 py-10">
        <div className="grid grid-cols-4 gap-4 sm:gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-5xl font-extrabold text-[#fa0368]">
              {String(timeLeft.days).padStart(2, "0")}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-semibold mt-1">Days</div>
          </div>
          <div>
            <div className="text-2xl sm:text-5xl font-extrabold text-[#fa0368]">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-semibold mt-1">Hours</div>
          </div>
          <div>
            <div className="text-2xl sm:text-5xl font-extrabold text-[#fa0368]">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-semibold mt-1">Minutes</div>
          </div>
          <div>
            <div className="text-2xl sm:text-5xl font-extrabold text-[#fa0368]">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-semibold mt-1">Seconds</div>
          </div>
        </div>
      </div>
    </div>
  )
}
