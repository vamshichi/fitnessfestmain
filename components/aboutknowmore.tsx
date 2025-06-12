import Image from "next/image";

export default function KnowMoreSection() {
  return (
    <section className=" py-20 bg-white">
   <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
    {/* Left Content */}
    <div className="space-y-5">
      <p className="text-pink-600 font-semibold uppercase tracking-wider">
        Introduction
      </p>
      <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-snug">
        <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
          Discover the Energy of
        </span>{" "}
        Bengaluru Fitness Festival 2025
      </h2>
    </div>

    {/* Right Content */}
    <div className="space-y-4">
      <p className="text-gray-700 text-lg leading-relaxed text-justify text-left">
        Get ready to experience Bengaluru’s most dynamic celebration of health,
        fitness, and holistic well-being. The Bengaluru Fitness Festival 2025,
        happening on <strong>22–23 November</strong> at{" "}
        <strong>KTPO Convention Centre</strong>, brings together fitness
        enthusiasts, industry experts, and wellness brands for an electrifying
        two-day event.
      </p>
      <p className="text-gray-700 text-lg leading-relaxed text-justify text-left">
        From high-intensity workouts and inspirational speaker sessions to
        wellness workshops, fitness competitions, and a vibrant healthy living
        expo — this festival is designed to energize, educate, and empower.
        Whether you're a seasoned athlete, a weekend warrior, or just beginning
        your wellness journey, there’s something here for everyone. Join us in
        redefining fitness — not just as a routine, but as a lifestyle.
      </p>
    </div>
  </div>
</div>


      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
  {/* Left Side Image with overlay */}
  <div className="relative w-full">
    {/* Main Background Image */}
    <div className="overflow-hidden rounded-3xl shadow-lg">
      <Image
        src="/fitness-trainer-man.png"
        alt="Main Event"
        width={700}
        height={500}
        className="w-full h-auto object-cover"
      />
    </div>

    {/* Overlay Small Image - Center Right */}
    <div className="absolute top-1/2 right-0 translate-y-[-50%] translate-x-[92%] w-100 rounded-2xl shadow-lg overflow-hidden border-4 border-white bg-white hidden lg:block">
      <Image
        src="/adaptive-fitness-trainer.png"
        alt="Overlay Event"
        width={400}
        height={400}
        className="w-full "
      />
    </div>
  </div>



        {/* Right Content */}
        
      </div>
    
    </section>
  );
}
