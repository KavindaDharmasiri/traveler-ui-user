import React from 'react'
import ItemCard from '../component/Backpack/ItemCard'
import Summary from '../component/Backpack/Summary';

export default function Backpack() {
  return (
    
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-2 mb-4">
              <h1 className="text-text-main dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                Your Backpack
              </h1>
              <p className="text-text-secondary dark:text-gray-400 text-base font-normal">
                3 items ready for your next adventure.
              </p>
            </div>
            
            {/* item={item} prop give to this component */}
            <ItemCard /> 
          

            <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0">
              <Summary />  
            </div>


            
          </div>
        </div>
      </main>
    
  );
}
