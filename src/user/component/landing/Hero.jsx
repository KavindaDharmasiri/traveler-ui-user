import React from 'react'
import SearchCard from './SearchCard'
import HeroTitle from './HeroTitle'

export default function Hero() {
  return (
    <header className="hero-bg h-[600px] md:h-[700px] flex flex-col items-center justify-center text-center px-4 relative">
      <div className="max-w-4xl mx-auto z-10 pt-20">
        <HeroTitle />
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 font-medium">
          Rent top-rated gear, rugged vehicles, and <br className="hidden md:inline" /> unique stays for your
          journey into the wild.
        </p>
      </div>

      <SearchCard />
      {/* how it works here */}
    </header>
  )
}
