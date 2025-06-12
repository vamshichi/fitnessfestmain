import Image from "next/image"
import Link from "next/link"
import { sponsors } from "@/data/events"
import { Badge } from "@/components/ui/badge"

interface EventSponsorsSectionProps {
  event: {
    sponsorIds?: string[]
  }
}

export function EventSponsorsSection({ event }: EventSponsorsSectionProps) {
  if (!event.sponsorIds || event.sponsorIds.length === 0) {
    return null
  }

  // Get the sponsors for this event
  const eventSponsors = sponsors.filter((sponsor) => event.sponsorIds?.includes(sponsor.id))

  if (eventSponsors.length === 0) {
    return null
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Event Sponsors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {eventSponsors.map((sponsor) => (
          <Link href={`/sponsor/${sponsor.id}`} key={sponsor.id}>
            <div
              className={`bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 ${sponsor.color}`}
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image src={sponsor.logo || "/placeholder.svg"} alt={sponsor.name} fill className="object-contain" />
                </div>
                <div>
                  <h3 className="font-bold">{sponsor.name}</h3>
                  <Badge
                    className={
                      sponsor.tier === "Gold"
                        ? "bg-yellow-100 text-yellow-800"
                        : sponsor.tier === "Silver"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-orange-100 text-orange-800"
                    }
                  >
                    {sponsor.tier} Sponsor
                  </Badge>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
