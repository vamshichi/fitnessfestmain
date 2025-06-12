import { Button } from "@/components/ui/button";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Image from "next/image";

export default function Speakers() {
  const speakers = [
    { name: "WILLIAM HOBB", role: "Chief Executive Officer", image: "/fitness-trainer-woman.png" },
    { name: "ALISON WHITE", role: "Managing Director", image: "/fitness-trainer-woman.png" },
    { name: "GEORGE SMITH", role: "Marketing Officer", image: "/fitness-trainer-woman.png" },
    { name: "JENNY WATT", role: "Executive Officer", image: "/fitness-trainer-woman.png" },
    { name: "MANNY HERDS", role: "Business Supervisor", image: "/fitness-trainer-woman.png" },
    { name: "GARY WILSON", role: "Market Supervisor", image: "/fitness-trainer-woman.png" },
    { name: "SALLY WART", role: "Event Supervisor", image: "/fitness-trainer-woman.png" },
    { name: "JIMMY SCOTT", role: "Event Speaker", image: "/fitness-trainer-woman.png" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h6 className="text-[#fa0368] text-sm font-semibold mb-2 uppercase tracking-wide">BENGALURU FITNESS FEST 2025</h6>
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">OUR EVENT SPEAKERS</h3>
          <p className="text-gray-600 max-w-5xl mx-auto text-base lg:text-lg">
            Meet the inspiring voices behind the movement. From fitness icons and wellness coaches to medical experts and motivational speakers, our line-up brings together thought leaders who are passionate about health, performance, and personal growth.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {speakers.map((speaker, index) => (
            <div key={index} className="relative w-[250px] mx-auto">
              {/* Image Box */}
              <div className="rounded-[30px] overflow-hidden shadow-lg">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  width={250}
                  height={400}
                  className="object-cover h-94"
                />
              </div>

              {/* Card Overlay */}
              <div className="absolute bottom-[30px] left-1/2 transform -translate-x-1/2 w-[210px] bg-white rounded-2xl px-4 py-4 shadow-lg text-center z-10">
                <h2 className="text-lg font-bold text-gray-900">{speaker.name}</h2>
                <p className="text-sm text-gray-600 mb-3">{speaker.role}</p>
                <div className="absolute flex gap-1 bottom-[-15px] left-[35px] justify-center">
  <a href="#" className="bg-[#fa0368] p-2 rounded-full text-white hover:scale-110 transition">
    <FaFacebookF />
  </a>
  <a href="#" className="bg-[#fa0368] p-2 rounded-full text-white hover:scale-110 transition">
    <FaTwitter />
  </a>
  <a href="#" className="bg-[#fa0368] p-2 rounded-full text-white hover:scale-110 transition">
    <FaYoutube />
  </a>
  <a href="#" className="bg-[#fa0368] p-2 rounded-full text-white hover:scale-110 transition">
    <FaInstagram />
  </a>
</div>

              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-20">
          <Button className="bg-[#fa0368] hover:bg-pink-600 text-white px-8 py-5 rounded-full font-medium text-base lg:text-lg transition">
            VIEW ALL SPEAKERS
          </Button>
        </div>
      </div>
    </section>
  );
}
