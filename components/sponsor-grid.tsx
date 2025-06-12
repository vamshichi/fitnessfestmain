"use client"

import Image from "next/image";

export default function SponsorGrid() {
  const sponsors = [
    { id: 1, name: "Sponsor 1", image: "/placeholder.svg?height=100&width=200" },
    { id: 2, name: "Sponsor 2", image: "/placeholder.svg?height=100&width=200" },
    { id: 3, name: "Sponsor 3", image: "/placeholder.svg?height=100&width=200" },
    { id: 4, name: "Sponsor 4", image: "/placeholder.svg?height=100&width=200" },
    { id: 5, name: "Sponsor 5", image: "/placeholder.svg?height=100&width=200" },
    { id: 6, name: "Sponsor 6", image: "/placeholder.svg?height=100&width=200" },
    { id: 7, name: "Sponsor 7", image: "/placeholder.svg?height=100&width=200" },
    { id: 8, name: "Sponsor 8", image: "/placeholder.svg?height=100&width=200" },
  ];

  // Duplicate the list for infinite scroll effect
  const loopedSponsors = [...sponsors, ...sponsors];

  return (
    <div className="overflow-hidden w-full bg-gray-100 py-4">
      <div className="scroll-wrapper">
        <div className="scroll-content flex gap-8 whitespace-nowrap">
          {loopedSponsors.map((sponsor, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center w-[220px] h-[120px] bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={sponsor.image}
                alt={sponsor.name}
                width={200}
                height={100}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scroll-wrapper {
          width: 100%;
          overflow: hidden;
        }
        .scroll-content {
          display: inline-flex;
          animation: scroll-left 20s linear infinite;
        }
        @keyframes scroll-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
