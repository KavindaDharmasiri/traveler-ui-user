import React from 'react'
import Pill from './Pill'
import SearchBar from './SearchBar';

export default function Hero() {
    const heroBg =
    'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCOmpvvLppN1CZr9RzHN9cD0wgSKO14NQO6mAEed-Od5CQkVRoe20dMSb3Mtd2J98ps6l4hAULp5smzAwIVMv8WoTq8Jcqh7gQyQyIwxFy3MWm2ZNBbfdzWMRajA6ZHI6HXr3S7Ar5Fu3EqHStHNPqHDzwbUaC9O3o4vO8ziN3Me-g44PCeeRNJR1Vp57phKXJ8WkljWiP1_QjP4wZV6d_hYGKZgWLUJr4MYXffmr9FGpvs7XnACkqmNA-y-R2OtZTAAKrYe9GB5Ml5")';
  return (
    <section className="w-full">
      <div
        className="relative w-full rounded-[2rem] overflow-hidden min-h-[560px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: heroBg }}
        aria-label="Hiker looking at mountain landscape"
      >
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
