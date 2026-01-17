import React from 'react'
import { Link } from 'react-router-dom'

export default function SearchCardForm() {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <div className="flex-1 w-full relative">
        <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          search
        </span>
        <input
          className="w-full pl-12 pr-4 py-3 bg-gray-50  rounded-xl border-none focus:ring-2 focus:ring-primary  placeholder-gray-400 text-sm font-medium"
          placeholder="What are you looking for?"
          type="text"
        />
      </div>

      <div className="w-px h-10 bg-gray-200  hidden md:block"></div>

      <div className="flex-1 w-full relative">
        <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          location_on
        </span>
        <input
          className="w-full pl-12 pr-4 py-3 bg-gray-50  rounded-xl border-none focus:ring-2 focus:ring-primary  placeholder-gray-400 text-sm font-medium"
          placeholder="Location"
          type="text"
        />
      </div>
      <Link to="/login">
      <button className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
        Search
        <span className="material-icons-round text-sm">arrow_forward</span>
      </button>
      </Link>
    </div>
  )
}
