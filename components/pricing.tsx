import { Button } from "@/components/ui/button"

export default function Pricing() {
  const pricingPlans = [
    {
      name: "EARLY BIRD",
      price: "$25",
      description: "Consectetur wisi voluptatem nostra, magnis occaecat dictum, aenean quo.",
      progress: 65,
      available: "325 / 500",
      note: "All prices exclude 25% VAT!",
    },
    {
      name: "GOLD",
      price: "$75",
      description: "Consectetur wisi voluptatem nostra, magnis occaecat dictum, aenean quo.",
      progress: 80,
      available: "200 / 250",
      note: "All prices exclude 25% VAT!",
      featured: true,
    },
    {
      name: "PLATINUM",
      price: "$54",
      description: "Consectetur wisi voluptatem nostra, magnis occaecat dictum, aenean quo.",
      progress: 88,
      available: "352 / 400",
      note: "All prices exclude 25% VAT!",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h6 className="text-pink-600 text-sm font-semibold mb-2">PRICING TABLE</h6>
          <h3 className="text-3xl font-bold mb-4">GET YOUR TICKET !!</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Quam amet tristique adipisicing incididunt arcu, excepturi molestie turpis deserunt ducimus malesuada minus
            mauris veniam.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto pt-8">
          {pricingPlans.map((plan, index) => (
            <div key={index} className={`relative ${plan.featured ? "transform scale-105" : ""}`}>
              <div
                className={`bg-white text-gray-900 rounded-lg p-8 text-center relative ${plan.featured ? "border-1 border-b-black" : ""}`}
              >
                {plan.featured && (
                  <div className="absolute w-full top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pink-600 text-white py-1 text-sm font-semibold rounded-sm shadow-lg z-10">
                    EXCLUSIVE OFFER!
                  </div>
                )}

                <h6 className="text-pink-600 text-sm font-semibold mb-2">{plan.name}</h6>
                <h2 className="text-4xl font-bold mb-4">{plan.price}</h2>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <p className="text-sm text-gray-500 mb-4">{plan.note}</p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Seat booked</span>
                    <span>{plan.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-pink-600 h-2 rounded-full"
                      style={{ width: `${plan.progress}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-6">( {plan.available} ) Available seat</p>

                <Button className="w-full bg-pink-600 hover:bg-orange-600 text-white py-3 rounded-md">
                  BUY TICKET
                </Button>
              </div>

              {/* Bottom Wave Decoration */}
              <div className="absolute bottom-0 left-5 w-full">
                <svg className="w-full h-6" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path
                    d="M0 20 Q5 0 10 20 T20 20 T30 20 T40 20 T50 20 T60 20 T70 20 T80 20 T90 20 T100 20 V20 H0 Z"
                    fill="#111827" // Tailwind's bg-gray-900
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
