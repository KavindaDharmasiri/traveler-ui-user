import React from 'react'
import CtaSection from '../component/about/CtaSection'
import HeroSection from '../component/about/HeroSection'
import StorySection from '../component/about/StorySection'
import TeamSection from '../component/about/TeamSection'
import ValuesSection from '../component/about/ValuesSection'
import Navbar from "../../shared/Navbar";
import Footer from "../../shared/Footer";

const AboutUs = () => {
  return (
    <div className="bg-background-light text-text-main font-display antialiased flex flex-col min-h-screen overflow-x-hidden">
      
      <Navbar />

      <main className="flex-grow">
        <HeroSection />
        <ValuesSection />
        <StorySection />
        <TeamSection />
        <CtaSection />
      </main>

      <Footer />
      
    </div>
  );
};

export default AboutUs;



