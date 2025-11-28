import React from 'react'

export default function Banner() {
  return (
    <div className='flex flex-col mt-12 md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-[#217964] to-[#E0F5F2] max-w-7xl mx-2 md:mx-auto rounded-2xl overflow-hidden'>

        <div className='text-white'>
            <h className='text-3xl font-medium'>Do you own Rental Shop</h>
            <p className='mt-2'>Monetize your Shop effortlessly by listing it on Traveler</p>
            <p className='max-w-130'>We take care of Booking so you can earn passive income,stress-free.</p>

            <button className='px-6 py-2 bg-[#A500FF] hover:bg-[#4B0082] transition-all text-white rounded-lg text-sm mt-4 cursor-pointer'>List your Shop</button>
        </div>

        <img src="https://media.istockphoto.com/id/1500563478/photo/traveler-asian-woman-relax-and-travel-on-thai-longtail-boat-in-ratchaprapha-dam-at-khao-sok.jpg?b=1&s=612x612&w=0&k=20&c=lctMEC3mxw_T1N1rk1eAx5c9NRddxUj8ncaMxtBpIDU=" alt="womenTravelingbag" className='max-h-45 mb-8 mt-2'/>

    </div>
  )
}
