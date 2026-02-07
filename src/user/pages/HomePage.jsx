import React from 'react'
import Hero from '../component/Home/Hero'
import Steps from '../component/Home/Steps'
import BrowseByCategory from '../component/Home/BrowseByCategory'
import ShopCTA from '../component/Home/ShopCTA'
import TrendingRentals from '../component/Home/TrendingRentals'


export default function HomePage() {
  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "Manrope, sans-serif",
        backgroundColor: "#f8f6f1",
      }}
    >
      
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden text-[#121716] antialiased selection:bg-[#217864] selection:text-white">
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col gap-12">
          <Hero />
          <Steps />
          <BrowseByCategory />
          <ShopCTA />
          <TrendingRentals />
        </main>
        
      </div>
    </div>
  )
}
