import React from 'react'

export default function ShopCTA() {
 
    const img =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCGiUiY-dASWG2rAepsYi6s3IZbpgjN5810jWq9zekULCwgtkopByfZME3oS-iLbPzFWDJrg3zpyHr4aRRigjNmDVcJmM1hMQmcYbYRgMziCWg3e9IwwVLvJKgEm9DSc1fxaVrIKO0gMA2nu_7iHOY21D8b2MrHUQhrqbpEf34kalZ4_8dTTyDnb_AJ6n2bORppxIyu_hCgCD_h332MSwokMqosjUbiuq5QSeTFA35z-6eaafJCAjQ6lGHuj5zbomNH_VPliVgb-xPl";

  return (
    <section className="w-full">
      <div className="relative w-full rounded-[2rem] overflow-hidden bg-[#217864] shadow-lg shadow-[rgba(33,120,100,0.10)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#217864] via-[#217864] to-[#1a6050] opacity-100 z-0" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-stretch h-full">
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                Do you own a <br className="hidden lg:block" />
                Rental Shop?
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-md">
                Monetize your Shop effortlessly by listing it on RoamRental. We take care of booking so you can earn passive income,
                stress-free.
              </p>
            </div>

            <div className="pt-2">
              <button className="bg-[#d500f9] hover:bg-[#c000e0] text-white px-8 py-3.5 rounded-lg font-bold text-sm md:text-base shadow-lg shadow-[rgba(88,28,135,0.20)] hover:shadow-[rgba(88,28,135,0.40)] transition-all duration-300 transform hover:-translate-y-0.5">
                List your Shop
              </button>
            </div>
          </div>

          <div className="h-64 md:h-auto w-full relative overflow-hidden">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url("${img}")`,
                clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)",
              }}
              aria-label="Scenic boat travel view"
            />
            <div
              className="md:hidden absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url("${img}")` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
