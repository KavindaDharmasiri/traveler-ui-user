import React from 'react'

export default function ValuesSection() {
  const values = [
    {
      icon: "eco",
      title: "Sustainability",
      desc: "Extending the lifecycle of high-quality gear to reduce waste and protect the wild places we play."
    },
    {
      icon: "groups",
      title: "Community",
      desc: "Connecting travelers with locals and fellow explorers, fostering trust across borders."
    },
    {
      icon: "explore",
      title: "Adventure",
      desc: "Equipping you for the journey with reliable gear, wherever the path may lead you."
    }
  ];

  return (
    <section className="py-20 px-8 bg-background-light">
      <div className="max-w-[960px] mx-auto">
        <div className="flex flex-col gap-12">
          <div className="text-left">
            <h2 className="text-4xl font-bold text-text-main mb-4">Our Values</h2>
            <p className="text-lg text-text-secondary max-w-2xl">
              Core principles that guide our journey, protect our planet, and strengthen our global community.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {values.map((item, index) => (
              <div key={index} className="group p-8 rounded-2xl bg-white border border-[#f0f0f0] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-text-main mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
