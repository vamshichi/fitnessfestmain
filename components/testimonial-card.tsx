import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

interface TestimonialCardProps {
  text: string
  name: string
  role: string
}

export default function TestimonialCard({ text, name, role }: TestimonialCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg relative">
      <div className="absolute top-4 right-4 text-6xl text-[#f3c532] opacity-20 font-serif">"</div>

      <p className="italic text-gray-600 mb-6 relative z-10">{text}</p>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
          <FontAwesomeIcon icon={faUser} />
        </div>

        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  )
}
