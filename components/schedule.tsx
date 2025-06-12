"use client";

import { useState } from "react";
import { events } from "@/data/events"; // Assuming events.js is in the same directory or adjust path
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function Schedule() {
  // Change initial selectedDate to match the format in events.js
  const [selectedDate, setSelectedDate] = useState("November 22, 2025");

  const filteredEvents = events.filter((e) => e.date === selectedDate);

  const router = useRouter();

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 bg-gray-50">
      {/* Header */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h6 className="text-pink-600 text-sm font-semibold mb-2">
            SCHEDULE DETAILS
          </h6>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            INFORMATION OF EVENT SCHEDULE!
          </h3>
          <p className="text-gray-600">
            Stay on track with everything happening at the festival! From
            high-energy workout sessions and expert talks to fun challenges and
            wellness workshops — here’s your complete guide to what’s happening,
            when, and where.
          </p>
        </div>

        {/* Circles as Date Filters */}
        <div className="mt-10 flex justify-center items-center">
          <div className="relative flex md:inline-block">
            {/* Left Circle */}
            <div
              // Change onClick date format to match events.js
              onClick={() => setSelectedDate("November 22, 2025")}
              className={clsx(
                "cursor-pointer w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40 rounded-full flex flex-col items-center justify-center z-10 transition-all duration-300",
                selectedDate === "November 22, 2025"
                  ? "bg-pink-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-800"
              )}
            >
              <span className="text-sm sm:text-base md:text-lg font-bold">
                22ND NOV
              </span>
              <span
                className={clsx(
                  "text-xs sm:text-sm font-semibold",
                  selectedDate === "November 22, 2025"
                    ? "text-white"
                    : "text-pink-600"
                )}
              >
                SATURDAY
              </span>
            </div>

            {/* Right Circle */}
            <div
              // Change onClick date format to match events.js
              onClick={() => setSelectedDate("November 23, 2025")}
              className={clsx(
                `cursor-pointer w-24 h-24 sm:w-28 sm:h-28 md:w-44 md:h-44
                 rounded-full flex flex-col items-center justify-center shadow-lg z-20
                 -ml-1 sm:-ml-1 md:ml-0 md:absolute md:left-[80%] md:top-0 transition-all duration-300`,
                selectedDate === "November 23, 2025"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-gray-800"
              )}
            >
              <span className="text-sm sm:text-base md:text-lg font-bold">
                23RD NOV
              </span>
              <span
                className={clsx(
                  "text-xs sm:text-sm font-semibold",
                  selectedDate === "November 23, 2025"
                    ? "text-white"
                    : "text-pink-600"
                )}
              >
                SUNDAY
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Items */}
      <div className="space-y-8 max-w-6xl mx-auto px-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[30%_50%_20%] gap-0">
                <div className="bg-pink-600 text-white p-6 text-center">
                  <h6 className="text-sm mb-2">{item.timeRange}</h6>
                  <h6 className="text-lg font-semibold">{item.title}</h6>
                  <p className="mb-6">Location: {item.location}</p>
                </div>

                <div className="p-6">
                  <h5 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                    {item.description}
                  </h5>
                  
                  <Button
                    variant="outline"
                    className="border-pink-600 text-pink-600 hover:bg-orange-500 hover:text-white"
                    onClick={() => router.push(`/event/${item.id}`)}
                  >
                    LEARN MORE
                  </Button>
                </div>

                <div className="text-white text-center flex justify-center items-center p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-40 h-40 object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            No events found for this date.
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <Button className="bg-pink-600 hover:bg-orange-600 text-white px-6 py-5 md:px-8 md:py-5 rounded-3xl">
          VIEW MORE DETAILS
        </Button>
      </div>
    </section>
  );
}
