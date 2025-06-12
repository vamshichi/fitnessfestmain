import { FiSettings, FiUsers, FiSend } from "react-icons/fi";

const CardSection = () => {
  const cards = [
    {
      title: "WHAT WE DO?",
      description:
        "We bring together the best of fitness, wellness, and community spirit — all under one roof. Our goal is to inspire healthier lifestyles through immersive experiences, expert-led sessions, high-energy group workouts, nutrition and wellness education, and interactive challenges.",
      icon: <FiSettings size={32} color="white" />,
    },
    {
      title: "WHAT WE ARE?",
      description:"We are a movement.Bengaluru Fitness Festival is more than an event — it’s a celebration of strength, balance, and well-being. We unite fitness enthusiasts, health experts, wellness brands, and everyday individuals on a shared mission to build a healthier and more active community.Rooted in the belief that fitness is for everyone, we create a space that’s inclusive, inspiring, and empowering.",
      icon: <FiUsers size={32} color="white" />,
    },
    {
      title: "OUR AIM & MISSION",
      description:
        "Our mission is to inspire a healthier Bengaluru — one step, one rep, and one mindful moment at a time.We aim to create a vibrant platform that promotes physical fitness, mental well-being, and sustainable lifestyle choices through engaging experiences, inclusive participation, and expert guidance.At Bengaluru Fitness Festival, we believe that wellness is not a trend — it's a way of life. Our goal is to make fitness accessible, enjoyable, and empowering for all.",
      icon: <FiSend size={32} color="white" />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-[#f9f9f9] p-8 rounded-3xl text-center shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-[#ff0066] rounded-full flex items-center justify-center">
            {card.icon}
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">{card.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CardSection;
