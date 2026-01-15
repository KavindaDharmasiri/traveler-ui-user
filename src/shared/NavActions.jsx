import React from 'react'
import { Link } from 'react-router-dom'

export default function NavActions() {
  return (
     <div className="flex items-center gap-4">
      <Link to="/login">
      <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full font-semibold text-sm transition-colors shadow-lg shadow-primary/30">
        Sign Up
      </button>
     </Link> 

      <button className="text-white md:hidden">
        <span className="material-icons-round">menu</span>
      </button>
    </div>
  )
}
