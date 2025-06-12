import React from 'react';
import { Sparkles } from 'lucide-react'; // Optional icon

const WhyAttend = () => {
  const reasons = [
    'Discover new workouts and wellness trends',
    'Meet fitness experts, coaches & like-minded individuals',
    'Participate in challenges and win exciting rewards',
    'Get exclusive access to products and offers',
    'Reignite your fitness journey in a high-energy environment',
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-yellow-400 py-20 relative overflow-hidden">
      {/* Confetti-like sparkles (optional): */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none animate-pulse opacity-20">
        <div className="w-full h-full bg-[url('/confetti.svg')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-12 tracking-wide drop-shadow-lg">
          🎉 Why Attend? 🥳
        </h2>

        <ul className="space-y-6 text-lg md:text-xl text-white max-w-3xl mx-auto">
          {reasons.map((reason, index) => (
            <li
              key={index}
              className="flex items-start gap-4 bg-white/20 backdrop-blur-sm p-5 rounded-2xl shadow-xl hover:scale-[1.03] hover:bg-white/30 transition-transform duration-300"
            >
              <span className="text-2xl md:text-3xl text-yellow-200">✨</span>
              <p className="text-left font-medium">{reason}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyAttend;
