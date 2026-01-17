import React from 'react'

export default function CtaSection() {
  return (
    <section className="py-20 px-8">
      <div className="max-w-[1280px] mx-auto rounded-3xl overflow-hidden bg-primary relative">
        {/* Abstract pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-black via-transparent to-transparent"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center py-24 px-6">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to start your journey?</h2>
          <p className="text-primary-100 text-xl max-w-2xl mb-10">
            Join our community of mindful explorers today. Rent the gear you need, or lend yours to fund your next adventure.
          </p>
          <div className="flex flex-row gap-4 w-auto">
            <button className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-xl transition shadow-lg w-auto">
              Browse Rentals
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-xl transition w-auto">
              Become a Host
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
