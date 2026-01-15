import React from 'react'

export default function TopPickCard({ imgAlt, imgSrc, rating, title, price, location }) {
  return (
    <div className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
      <div className="relative h-64 overflow-hidden">
        <img
          alt={imgAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={imgSrc}
        />
        <button className="absolute top-3 right-3 bg-white/30 backdrop-blur-md p-2 rounded-full hover:bg-white transition-colors">
          <span className="material-icons-round text-white hover:text-red-500 text-lg">favorite_border</span>
        </button>
        <div className="absolute bottom-3 left-3 bg-white dark:bg-gray-800 px-2 py-1 rounded-md flex items-center gap-1 text-xs font-bold shadow-md">
          <span className="material-icons-round text-yellow-400 text-xs">star</span>
          {rating}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate pr-2">{title}</h3>
          <span className="text-primary font-bold">{price}</span>
        </div>
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
          <span className="material-icons-round text-sm mr-1">location_on</span>
          {location}
        </div>
      </div>
    </div>
  )
}
