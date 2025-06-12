import React from 'react';

const WhoShouldJoin = () => {
  const participants = [
    { label: 'Fitness enthusiasts & beginners', emoji: '💪' },
    { label: 'Yoga & dance lovers', emoji: '🧘‍♀️' },
    { label: 'Runners, lifters, athletes', emoji: '🏃‍♂️' },
    { label: 'Nutrition & wellness followers', emoji: '🥗' },
    { label: 'Families & kids', emoji: '👨‍👩‍👧‍👦' },
    { label: 'Senior citizens looking to stay active', emoji: '🧓' },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-200 to-yellow-300 py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-orange-700 mb-12 tracking-wide drop-shadow-lg">
          🎪 Who Should Join?
        </h2>
        <ul className="space-y-6 text-lg md:text-xl text-gray-800 max-w-3xl mx-auto">
          {participants.map((participant, index) => (
            <li
              key={index}
              className="flex items-start gap-4 bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-lg hover:bg-yellow-200/80 transition-transform hover:scale-[1.03]"
            >
              <span className="text-2xl md:text-3xl">{participant.emoji}</span>
              <p className="text-left font-medium">{participant.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhoShouldJoin;
