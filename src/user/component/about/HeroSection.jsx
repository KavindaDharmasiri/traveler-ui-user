import React from 'react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative w-full">
      <div className="relative h-[600px] w-full overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkYzQF5J5urK1O-lRizHWPXPBnSJcCjAO9x1M_0lkphcamO6T5iri315JMk-HNznYEh1xMLF1DUwGmeFf8n1Jk8mX9rcKwhJD4cHF4tY28oysfbr0RifzSd1P7WytXP6rRP0dbe4t4LGVMr7y3_ooG0HitxVZtyBbrRpCyjR5AclLj-uaIWG0RENvc9MCXXILL-lk4KgzrulXByxwCLdi23YtKyBUAtTpIk2LBwictgaiHUXFQxdYPMb3YU4lg802ilT-WlQYEwDlx")' }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Content */}
        <div className="relative h-full max-w-[1280px] mx-auto px-8 flex items-center justify-start">
          <div className="max-w-xl w-full p-12 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl">
            <div className="flex flex-col gap-4">
              <span className="uppercase tracking-widest text-[#217864] text-xs font-bold">Our Mission</span>
              <h1 className="text-5xl font-black leading-tight text-[#121716]">
                Making Adventure Accessible.
              </h1>
              <p className="text-[#68827c] text-lg leading-relaxed">
                We believe the cost of gear shouldn't be a barrier to experiencing the world. By connecting travelers with local equipment, we empower you to explore freely and sustainably.
              </p>
              <div className="pt-4">
                <Link to="/rentItems">
                <button className="h-12 px-6 rounded-xl bg-[#217864] hover:bg-[#1a5e4e] text-white text-base font-bold transition-all shadow-lg shadow-[#217864]/30 flex items-center gap-2 w-fit">
                  Explore Rentals
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
