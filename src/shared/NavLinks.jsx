import React from 'react'

export default function NavLinks() {
  return (
     <div className="hidden md:flex gap-3 text-white/90 font-medium text-sm items-center">
      <a className="nav-link active" href="#">
        Gear
      </a>
      <a className="nav-link" href="#">
        Vehicles
      </a>
      <a className="nav-link" href="#">
        Stays
      </a>
      <a className="nav-link" href="#">
        About
      </a>
    </div>
  )
}
