import { Calendar, Users, DollarSign, Award } from "lucide-react"

interface Sponsor {
  id: string
  name: string
  logo: string
  tier: string
  location: string
  website: string
  industry: string[]
  description: string
  yearsFunding?: number
  employeeCount?: number
  sponsorshipAmount?: string
  benefits?: string[]
}

export function SponsorInfo({ sponsor }: { sponsor: Sponsor }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {sponsor.yearsFunding && (
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
          <Calendar className="text-purple-600 mr-4" size={24} />
          <div>
            <h3 className="font-medium text-gray-900">Years Supporting</h3>
            <p className="text-gray-600">{sponsor.yearsFunding} years</p>
          </div>
        </div>
      )}

      {sponsor.employeeCount && (
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
          <Users className="text-purple-600 mr-4" size={24} />
          <div>
            <h3 className="font-medium text-gray-900">Company Size</h3>
            <p className="text-gray-600">{sponsor.employeeCount} employees</p>
          </div>
        </div>
      )}

      {sponsor.sponsorshipAmount && (
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
          <DollarSign className="text-purple-600 mr-4" size={24} />
          <div>
            <h3 className="font-medium text-gray-900">Sponsorship Level</h3>
            <p className="text-gray-600">{sponsor.sponsorshipAmount}</p>
          </div>
        </div>
      )}

      {sponsor.benefits && sponsor.benefits.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
          <Award className="text-purple-600 mr-4" size={24} />
          <div>
            <h3 className="font-medium text-gray-900">Sponsor Benefits</h3>
            <ul className="text-gray-600 list-disc list-inside">
              {sponsor.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
