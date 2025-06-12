import React from 'react';

const ticketData = [
  {
    title: '🟢 General Pass',
    price: '₹499 (1-Day) / ₹899 (2-Day)',
    perks: [
      'Entry to all general zones',
      'Participation in open fitness sessions & workshops',
      'Digital certificate of participation',
      'Festival kit (wristband, water bottle, event guide)',
      'INCLUDES: 1 healthy snack + smoothie / energy drink per day',
      '👉 Optional add-on: Lunch @ ₹200 per day',
    ],
  },
  {
    title: '💎 All-Access Pass',
    price: '₹1,399 (2-Day only)',
    perks: [
      'Everything in General Pass',
      'Early access to sessions & front-stage spots',
      'Premium festival kit (bag, t-shirt, goodies)',
      'Free group challenge registration',
      '1-on-1 expert consult slot (nutrition or fitness)',
      'INCLUDES: Daily lunch (healthy veg/non-veg combo) + 2 snacks + drinks',
    ],
  },
  {
    title: '👨‍👩‍👧 Family Pass (2 Adults + 2 Kids under 12)',
    price: '₹1,799 (2-Day)',
    perks: [
      'Entry to Family Fit Zone + General Zones',
      'Family workouts + kids’ fun obstacle track',
      'Kids’ mini kit (headband, energy bar, juice)',
      'INCLUDES: 2 Adult meals + 2 Kids’ meals (mild, kid-friendly menu) + healthy snacks for all',
    ],
  },
  {
    title: '👴 Senior Wellness Pass (Age 60+)',
    price: '₹399 (1-Day) / ₹599 (2-Day)',
    perks: [
      'Entry to wellness-specific sessions (low impact)',
      'Free BP/sugar check, physiotherapy consult',
      'Rest & relax zone access',
      'INCLUDES: Healthy sattvic lunch + 1 snack + green tea',
    ],
  },
  {
    title: '👥 Group Pass (5+ People)',
    price: '₹699/person (2-Day)',
    perks: [
      'All-Access level benefits',
      'Team fitness challenge entry',
      'Group photo + wearable band',
      'INCLUDES: Daily meal + energy booster + snack combo',
    ],
  },
  {
    title: '🧒 Kids Under 6',
    price: 'FREE ENTRY',
    perks: [
      'Must be accompanied by a parent',
      'INCLUDES: Free fruit cup or healthy cookie',
    ],
  },
];

const addOns = [
  'Healthy Lunch: ₹200',
  'Meal + Smoothie Combo: ₹275',
  'Vegan Box / Gluten-Free Box: ₹250',
];

const TicketsSection = () => {
  return (
    <section className="bg-white text-gray-800 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#f3c532] mb-12">
          🎟️ Bengaluru Fitness Fest 2025 – Ticket Categories & Perks
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {ticketData.map((ticket, idx) => (
            <div key={idx} className="border border-gray-300 p-6 rounded-xl shadow-lg bg-gray-50 hover:shadow-2xl transition duration-300">
              <h3 className="text-2xl font-semibold text-[#2c2c2c] mb-2">{ticket.title}</h3>
              <p className="text-lg font-medium text-green-600 mb-4">{ticket.price}</p>
              <ul className="list-disc list-inside space-y-2 text-base text-gray-700">
                {ticket.perks.map((perk, index) => (
                  <li key={index}>{perk}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-[#f3c532] mb-4">➕ Add-On Options (for General Pass holders)</h3>
          <ul className="inline-block text-left list-disc list-inside text-lg text-gray-800 space-y-2">
            {addOns.map((addOn, index) => (
              <li key={index}>{addOn}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TicketsSection;
