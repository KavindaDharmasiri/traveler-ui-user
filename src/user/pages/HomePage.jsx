import React from 'react'
import Hero from '../component/Home/Hero'
import RentingItemSection from '../component/renting/RentingItemSection'
import Banner from '../component/Home/Banner'
import Testamonials from '../component/Home/Testamonials'


export default function HomePage() {
  return (
    <div >
      <>
        <Hero/>
        <RentingItemSection/>
        <Banner />
        <Testamonials />
      </>
        
    </div>
  )
}
