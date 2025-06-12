import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"

interface FeatureCardProps {
  icon: IconDefinition
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl text-center transition-transform hover:-translate-y-1 shadow-md">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-[#70adb0] text-2xl mx-auto mb-6">
        <FontAwesomeIcon icon={icon} />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
