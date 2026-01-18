import React from 'react'
import Icon from './Icon';

export default function Steps() {
 const steps = [
    {
      icon: "shopping_bag",
      title: "1. Book your gear",
      desc: "Select premium equipment from our curated collection for your dates.",
    },
    {
      icon: "storefront",
      title: "2. Pick up your gear",
      desc: "Visit our local hub to collect your booked items at your convenience.",
    },
    {
      icon: "landscape",
      title: "3. Adventure & Return",
      desc: "Enjoy the trip. When you're done, drop it off at a partner location.",
    },
  ];

  return (
    <section className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((s) => (
          <div
            key={s.title}
            className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="size-14 rounded-full bg-[#eef8f6] text-[#217864] flex items-center justify-center mb-2">
              <Icon name={s.icon} className="text-3xl" />
            </div>
            <h3 className="text-lg font-bold text-[#121716]">{s.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
