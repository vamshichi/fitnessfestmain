import PricingCard from "./pricing-card"

export default function Ticket() {
    return (
<section className="py-16 md:py-24 bg-[#70adb0] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h5 className=" font-semibold mb-4">Event Pricing</h5>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Book your seat now</h2>
            <p className="max-w-2xl mx-auto text-white/80">
              Choose the ticket that best suits your needs and secure your place at the conference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="General Pass"
              price="₹499 (1-Day) / ₹899 (2-Day)"
              color="blue"
              features={["Entry To All General Zones", "Participation Fitness Sessions & Workshops", "Digital Event Certificate", "Festival Kit (Wristband, Water Bottle, Event Guide)","INCLUDES: 1 Healthy Snack + Eenergy Drink Per Day"]}
            />
            <PricingCard
              title="All-Access Pass"
              price="₹1,399 (2-Day only)"
              color="pink"
              features={["Aaccess To Sessions & Front-Stage Spots", "Event Certificate", "Premium Festival Kit (Bag, T-shirt, Goodies)", "1-On-1 Expert Consult Slot (Nutrition or Fitness)", "INCLUDES: Daily Lunch (Healthy Veg/Non-veg combo) + 2 Snacks + Drinks"]}
              highlighted={true}
            />
            <PricingCard
              title="Group Pass(5+ People)"
              price="₹699/person (2-Day)"
              color="amber"
              features={[
                "All-Access level benefits",
                "Team Fitness Challenge Entry",
                "Group Photo + Wearable Band",
                "INCLUDES: Daily Lunch + Energy Booster + Snack Combo",
              ]}
            />
            <PricingCard
              title="Senior wellness Pass(Age 60+)"
              price="₹399 (1-Day) / ₹599 (2-Day)"
              color="pink"
              features={[
                "Entry to wellness-specific sessions (low impact)",
                "Free BP/sugar check, physiotherapy consultation",
                "Rest & relax zone access",
                "INCLUDES: Healthy sattvic lunch + 1 snack + green tea",
              ]}
            />
            <PricingCard
              title="Family Pass (2 Adults + 2 Kids under 12)"
              price="₹1,799 (2-Day)"
              color="blue"
              features={[
                "Back Row Seat",
                "Free Lunch & Snacks",
                "Event Certificate",
                "1 Workshop",
              ]}
            />
            <PricingCard
              title="Kids Under 6"
              price="FREE ENTRY"
              color="blue"
              features={[
                "Must be accompanied by a parent",
                "INCLUDES: Free fruit cup or healthy cookie",
                
              ]}
            />
          </div>
        </div>
      </section>
       )
}