import Image from "next/image"
import { ExternalLink, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Sponsor {
  id: string
  name: string
  logo: string
  tier: string
  location: string
  website: string
  industry: string[]
  description: string
}

export function SponsorProfile({ sponsor }: { sponsor: Sponsor }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48 mb-4">
          <Image src={sponsor.logo || "/placeholder.svg"} alt={sponsor.name} fill className="object-contain" />
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">{sponsor.name}</h1>

        <Badge className="mb-4 bg-purple-600">{sponsor.tier} Sponsor</Badge>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={16} className="mr-2" />
          <span>{sponsor.location}</span>
        </div>

        <Button className="w-full mb-4 bg-purple-600 hover:bg-purple-700">
          <ExternalLink size={16} className="mr-2" />
          <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
            Visit Website
          </a>
        </Button>

        <div className="w-full">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Industry</h3>
          <div className="flex flex-wrap gap-2">
            {sponsor.industry.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
