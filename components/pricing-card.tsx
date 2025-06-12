import Link from "next/link"

interface PricingCardProps {
  title: string
  price: string
  features: string[]
  color?: "blue" | "pink" | "amber"
  highlighted?: boolean
}

export default function PricingCard({ title, price, features, color = "blue", highlighted = false }: PricingCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return {
          header: "bg-blue-500",
          button: "bg-blue-500 hover:bg-blue-600 text-white",
        }
      case "pink":
        return {
          header: "bg-pink-500",
          button: "bg-pink-500 hover:bg-pink-600 text-white",
        }
      case "amber":
        return {
          header: "bg-amber-500",
          button: "bg-amber-500 hover:bg-amber-600 text-white",
        }
      default:
        return {
          header: "bg-blue-500",
          button: "bg-blue-500 hover:bg-blue-600 text-white",
        }
    }
  }

  const colorClasses = getColorClasses()

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-lg transition-transform duration-300 flex flex-col ${highlighted ? "ring-2 ring-pink-500 transform scale-105" : "hover:-translate-y-2"}`}
    >
      <div className={`${colorClasses.header} p-6 text-white`}>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <div className="">
          {/* <sup className="text-xl"></sup> */}
          {price}
        </div>
      </div>
  
      <div className="p-6 flex flex-col justify-between flex-1">
        <ul className="space-y-3 mb-6 flex-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <svg
                className="w-5 h-5 mr-2 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
  
        <Link
          href="/tickets"
          className={`block w-full py-3 px-4 text-center rounded-lg font-medium transition-colors ${colorClasses.button}`}
        >
          Book a seat
        </Link>
      </div>
    </div>
  )
  
}
