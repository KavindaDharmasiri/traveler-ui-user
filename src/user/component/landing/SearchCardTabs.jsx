import React from 'react'

export default function SearchCardTabs() {
  return (
     <div className="flex gap-8 border-b border-gray-100 dark:border-gray-700 pb-4 mb-4 px-2">
      <button className="text-primary font-semibold border-b-2 border-primary pb-4 -mb-4.5 px-2">
        Gear
      </button>
      <button className="text-gray-500 dark:text-gray-400 font-medium hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
        Vehicles
      </button>
      <button className="text-gray-500 dark:text-gray-400 font-medium hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
        Stays
      </button>
    </div>
  )
}
