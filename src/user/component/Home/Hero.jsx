import React from 'react'
import Pill from './Pill'
import SearchBar from './SearchBar';

export default function Hero() {
    // const heroBg =
    // 'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjl_g7KpzGxA76iLBAoRYy-VNPQTgZHwUEnnKc0slyIuJfp72f52KThbo1f00qXDiDQYvOMuevQn6-UlkqLVmevJNZT2FhM3-lk6sg5OLBALJzbAaBI6EHk5UUElf5PQgCHUDGugj_wyOdh0ynA9AP0n-XCm-aIWvemQZG94xqWDvf7B5SvJN3HqLZ5yJXwAngaI2XgzTisBh27aAoW964ceXCodute1qxvd4t1g8ifJZaBnS9ubF5BvtbnzcbodFBibS3A7V1zuw")';
    
  return (
    <section className="w-full">
      <div
        className="relative w-full rounded-[2rem] overflow-hidden min-h-[560px] flex items-center justify-center bg-cover bg-center"
        aria-label="Hiker looking at mountain landscape"
      >
        {/* Added background layer here */}
        <div className="absolute inset-0 z-0">
          <img 
            alt="Traveler with backpack in a scenic outdoor setting with negative space" 
            class="w-full h-full object-cover object-center" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjl_g7KpzGxA76iLBAoRYy-VNPQTgZHwUEnnKc0slyIuJfp72f52KThbo1f00qXDiDQYvOMuevQn6-UlkqLVmevJNZT2FhM3-lk6sg5OLBALJzbAaBI6EHk5UUElf5PQgCHUDGugj_wyOdh0ynA9AP0n-XCm-aIWvemQZG94xqWDvf7B5SvJN3HqLZ5yJXwAngaI2XgzTisBh27aAoW964ceXCodute1qxvd4t1g8ifJZaBnS9ubF5BvtbnzcbodFBibS3A7V1zuw"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content layer - ensuring z-10 stays above the new background */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl">
          <div className="mb-4">
            <Pill>Global Rentals</Pill>
          </div>

          <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight mb-4 drop-shadow-sm">
            Travel Light.<br />
            Adventure Heavy.
          </h1>

          <p className="text-white/90 text-lg md:text-xl font-medium mb-10 max-w-lg mx-auto leading-relaxed">
            Premium gear rentals for wherever you go. Don't let baggage fees weigh you down.
          </p>

          <SearchBar />
        </div>
      </div>
    </section>
  )
}