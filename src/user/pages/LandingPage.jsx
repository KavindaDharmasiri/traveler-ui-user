import React from 'react'
import Heronav from '../../shared/Heronav'
import Hero from '../component/landing/Hero'
import Spacer from '../component/landing/Spacer'
import Categories from '../component/landing/Categories'
import TopPicks from '../component/landing/TopPicks'
import HowItWorks from '../component/landing/HowItWorks'
import Homefooter from '../component/landing/Homefooter'
import ThemeStyles from '../../shared/ThemeStyles'

export default function LandingPage() {
  return (
     <>
      <ThemeStyles />
      <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-sans antialiased">
        <Heronav />
        <Hero />
        <Spacer />
        <Categories />
        <TopPicks />
        <HowItWorks />
        <Homefooter />
      </div>
    </>
  )
}
