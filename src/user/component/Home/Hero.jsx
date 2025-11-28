import React, { useState, useEffect } from 'react'
import { assets, cityList } from '../../../assets/assets'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Hero() {

  const [pickupLocation, setpickupLocation] = useState('')
  const [pickupDate, setPickupDate] = useState('');
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Set initial pickup date to today
  useEffect(() => {
    if (!pickupDate) {
      setPickupDate(today);
    }
  }, [pickupDate, today]);


  
  
  return (
    // 1. Full-screen container with the background image
    <div 
      className='relative h-screen flex flex-col items-center justify-center text-center text-white 
                 bg-cover bg-center md:bg-fixed'>
      <video 
  autoPlay 
  loop 
  muted 
  playsInline 
  className='absolute inset-0 w-full h-full object-cover z-0' // <-- This line makes it the background
  src={assets.hero_mp4}
/>
      {/* 2. Dark Overlay for Contrast: Makes text and form readable */}
      <div className='absolute inset-0 bg-black opacity-40 z-0'></div> 

      {/* Title - positioned above the overlay (z-10) */}
      <h1 className='text-4xl md:text-5xl font-semibold mb-8 z-10'>Rent Everything You Need for Your Next Adventure</h1>

      {/* Form - also positioned above the overlay (z-10) */}
      <form className='relative flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-lg lg:max-w-4xl xl:max-w-5xl bg-white shadow-xl z-10'>
          
        <div className='flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-10 md:ml-4'>
            
          {/* Pickup Location Select (Added basic padding/border for better visibility in white form) */}
          <div className='flex flex-col items-start gap-2'>
            <select 
              required 
              value={pickupLocation} 
              onChange={(e) => setpickupLocation(e.target.value)}
              className="py-1 px-2 text-base text-gray-700 border-b border-gray-300 focus:outline-none focus:border-[#217964]"
            >
              <option value="">Pickup Location</option>
              {cityList.map((city) =>
                <option key={city} value={city}>{city}</option>
              )}
            </select>
            <p className='px-1 text-sm text-gray-500'>
              {pickupLocation ? pickupLocation : 'Please select Location'}
            </p>
          </div>
            
          {/* Pick-up Date (Added padding/border) */}
          <div className='flex flex-col items-start gap-2'>
            <label htmlFor='pickup-date' className='text-sm font-medium text-gray-700'>Pick-up Date</label>
            <input 
              type="date" 
              id="pickup-date" 
              min={today} 
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className='py-1 px-2 text-sm text-gray-500 border-b border-gray-300 focus:outline-none focus:border-[#217964]' 
              required
            />
          </div>
            
          {/* Return Date (Added padding/border and dynamic min date) */}
          <div className='flex flex-col items-start gap-2'>
            <label htmlFor='return-date' className='text-sm font-medium text-gray-700'>Return Date</label>
            <input 
              type="date" 
              id="return-date" 
              min={pickupDate} // Dynamically sets minimum return date
              className='py-1 px-2 text-sm text-gray-500 border-b border-gray-300 focus:outline-none focus:border-[#217964]' 
              required
            />
          </div>
        </div>
        
        {/* Search Button (Fixed hover color to be slightly lighter) */}
        <button className='flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-[#217964] hover:bg-[#399e8a] text-white rounded-full cursor-pointer transition-colors duration-300'>
            <FontAwesomeIcon icon={faSearch} size="lg"/>Search
        </button>
      </form>
    </div>
  )
}