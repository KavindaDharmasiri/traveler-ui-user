import React from 'react'

export default function HowItWorks() {
  return (
     <section className="py-20 px-6 max-w-7xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How it Works</h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-16">
        Rent everything you need for your trip in just a few simple steps.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-blue-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-6">
            <span className="material-icons-round text-primary text-4xl">search</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Browse</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
            Search through thousands of high-quality gear, vehicles, and unique stays near your destination.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-blue-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-6">
            <span className="material-icons-round text-primary text-4xl">calendar_today</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Book</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
            Select your dates and book instantly with our secure payment system and verified owners.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-blue-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-6">
            <span className="material-icons-round text-primary text-4xl">celebration</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Enjoy</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
            Pick up your rental or have it delivered, and start your adventure stress-free.
          </p>
        </div>
      </div>
    </section>
  )
}
