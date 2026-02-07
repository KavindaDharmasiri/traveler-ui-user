import React from 'react'

export default function Categories() {
  return (
     <section id="categories" className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 ">Explore Categories</h2>
        <a className="text-primary font-semibold text-sm flex items-center hover:underline" href="#">
          View all <span className="material-icons-round text-sm ml-1">arrow_forward</span>
        </a>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-y-8 gap-x-4">
        <div className="flex flex-col items-center gap-3 cursor-pointer group">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-50  flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
            <span className="material-icons-round text-3xl">deck</span>
          </div>
          <span className="text-sm font-medium text-gray-600 ">Camping</span>
        </div>

        <div className="flex flex-col items-center gap-3 cursor-pointer group">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-50  flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
            <span className="material-icons-round text-3xl">surfing</span>
          </div>
          <span className="text-sm font-medium text-gray-600 ">Surf</span>
        </div>

        <div className="flex flex-col items-center gap-3 cursor-pointer group">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-50  flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
            <span className="material-icons-round text-3xl">airport_shuttle</span>
          </div>
          <span className="text-sm font-medium text-gray-600 ">RV</span>
        </div>

        <div className="flex flex-col items-center gap-3 cursor-pointer group">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-50  flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
            <span className="material-icons-round text-3xl">cabin</span>
          </div>
          <span className="text-sm font-medium text-gray-600 ">Cabins</span>
        </div>

        <div className="flex flex-col items-center gap-3 cursor-pointer group">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-50  flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
            <span className="material-icons-round text-3xl">kayaking</span>
          </div>
          <span className="text-sm font-medium text-gray-600 ">Kayaking</span>
        </div>

        <div className="flex flex-col items-center gap-3 cursor-pointer group">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-50  flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
            <span className="material-icons-round text-3xl">hiking</span>
          </div>
          <span className="text-sm font-medium text-gray-600 ">Gear</span>
        </div>
      </div>
    </section>
  )
}
