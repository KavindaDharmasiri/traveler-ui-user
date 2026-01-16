import React from 'react'
import { Link } from 'react-router-dom'

export default function OwnerBanner() {
  return (
    <div id="become-a-host" className="max-w-6xl mx-auto px-4 py-12 font-sans">
        <div className="rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row min-h-[450px] max-h-[500px] shadow-2xl">
            {/* Left Content Side */}
            <div className="bg-[#e9f5f0] flex-1 p-10 md:p-16 flex flex-col justify-center items-start">
            <span className="bg-white px-4 py-1 rounded-full text-[10px] font-bold tracking-widest text-teal-800 uppercase mb-6">
                For Owners
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Earn money with your gear
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-sm leading-relaxed">
                Turn your idle travel equipment into income. It's safe, easy, and fully insured. Join thousands of happy providers today.
            </p>
            <Link to="/signup">
            <button className="bg-[#247a6b] hover:bg-[#1b5e52] text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95">
                List Your Item
            </button>
            </Link>
            </div>

            {/* Right Image Side */}
            <div className="bg-[#2a5d56] flex-1 relative min-h-[300px] md:min-h-full">
            <img 
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1000" 
                alt="Happy traveler"
                className="w-full h-full object-cover mix-blend-luminosity opacity-90"
            />
            {/* Overlay to match the teal tint in your image */}
            <div className="absolute inset-0 bg-[#2a5d56] opacity-30"></div>
            </div>
        </div>
      </div>
  )
}
