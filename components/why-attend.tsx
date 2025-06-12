import { MessageCircle, Lightbulb, Coffee, Brain, Award, Users } from "lucide-react"

export default function WhyAttend() {
  const features = [
    {
      icon: MessageCircle,
      number: "01.",
      title: "ExPLORE DIVERSE WORKOUTS & EXPERT-LED SESSIONS",
      description: "This Festival feature over 30 types of sessions—Zumba, Capoeira, CrossFit, Planking, aqua workouts, Barre Fit, mental‑fitness talks, kids' gymnastics, and more. Whether you prefer cardio, strength, flexibility, or mindfulness, there’s something for everyone",
    },
    {
      icon: Lightbulb,
      number: "02.",
      title: "LEARN FROM RENOWNED FITNESS PROS",
      description: "Attendees get to train under well-known fitness experts like Sucheta Pal (Zumba ambassador), Cindy Jourdain (bootcamp leader), Yana Lewis (Barre Fit specialist), and Kushy Kuttappa (mental fitness)",
    },
    {
      icon: Coffee,
      number: "03.",
      title: "HEALTHY MARKETPLACE & WELLNESS EXHIBITS",
      description: "This festival encourage active socializing—workout with like‑minded people, meet trainers, join a 5 K run, and even discover fitness communities for women‑only gyms",
    },
    {
      icon: Brain,
      number: "04.",
      title: "COMMUNITY, CONNECTION & SUPPORT",
      description: "This festival encourage active socializing—workout with like‑minded people, meet trainers, join a 5 K run, and even discover fitness communities for women‑only gyms",
    },
    {
      icon: Award,
      number: "05.",
      title: "LIVE MUSIC & UPLIFTING ATMOSPHERE",
      description: "With live performances, fitness raves set to electronic beats, dynamic lighting, live bands, and DJs, the environment is lively and motivational ",
    },
    {
      icon: Users,
      number: "06.",
      title: "TRY & ADOPT HEALTHY HABITS",
      description: "This event designed not just for a single workout but to educate and inspire: meditation, mindful eating, self-care, and expert-led talks help foster long-term health habits .",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h6 className="text-[#fa0368] text-sm font-semibold mb-2">JOIN FITNESS FEST</h6>
          <h3 className="text-3xl font-bold text-gray-970 mb-4">WHY ATTEND BENGALURU FITNESS FEST?</h3>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Step into South India's biggest fitness and wellness celebration! Whether you're a fitness enthusiast, industry professional, or just starting your wellness journey — this is the place to be.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-9 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-center py-4">
                <feature.icon className="w-15 h-15 text-[#fa0368]" />
                <span className="text-5xl font-bold  text-gray-300">{feature.number}</span>
              </div>
              <h5 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h5>
              <p className="text-gray-600 justify">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
