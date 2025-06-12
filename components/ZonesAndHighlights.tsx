import React from 'react';

const ZonesAndHighlights = () => {
  const zones = [
    {
      title: 'Main Stage',
      description: 'Live Fitness Sessions, Dance Workouts, and Celebrity Appearances',
    },
    {
      title: 'Wellness Zone',
      description: 'Nutrition Talks, Physiotherapy Demos, Health Check-ups',
    },
    {
      title: 'Strength Arena',
      description: 'CrossFit, Functional Training, and Fitness Challenges',
    },
    {
      title: 'Yoga Garden',
      description: 'Outdoor Yoga, Guided Meditation, Sound Healing',
    },
    {
      title: 'Family Fit Zone',
      description: 'Fun Games and Fitness Activities for Kids and Parents',
    },
    {
      title: 'Fit Marketplace',
      description: 'Healthy Snacks, Fitness Gear, Supplements & more',
    },
    {
      title: 'Exhibition Arena',
      description: "Exhibitors Display their Equipment’s / Services",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-100 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">What’s waiting for you at the Fest?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {zones.map((zone, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-[#f3c532] mb-4">{zone.title}</h3>
              <p className="text-lg text-gray-700">{zone.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ZonesAndHighlights;
