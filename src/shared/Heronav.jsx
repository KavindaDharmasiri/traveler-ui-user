import React from 'react'
import Travlerwhite from './Travlerwhite'
import NavLinks from './NavLinks'
import NavActions from './NavActions'

export default function Heronav() {
  return (
   <nav className="absolute top-0 w-full z-50 py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Travlerwhite />
        <NavLinks />
        <NavActions />
      </div>
    </nav>
    
  )
}
