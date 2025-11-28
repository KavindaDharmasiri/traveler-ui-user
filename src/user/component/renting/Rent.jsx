import React, { useState } from 'react'
import Title from './Title'
import { dummyItemData } from '../../../assets/assets'
import RentalItemCard from './RentalItemCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter,faSearch } from '@fortawesome/free-solid-svg-icons'


export default function Rent() {
    
    const[input,setInput]=useState('')
    
    
    return (
    <div>

        <div className='flex flex-col items-center py-20 bg-[#F0FAF8] max-md:px-4'>
            <Title title='Available Items' subTitle='Browse our selection of premium items available for your next adventure' />

            <div className='flex items-center bg-white px-4 mt-6 max-w-96 w-full h-12 rounded-full shadow'>
                <FontAwesomeIcon icon={faSearch} className='w-4.5 h-4.5 mr-2' />

                <input onClick={(e)=>setInput(e.target.value)} value={input} type='text'placeholder='Search by name,shop, or cateogary'className='w-full h-full outline-none text-gray-500'/>

                <FontAwesomeIcon icon={faFilter} className='w-4.5 h-4.5 ml-2' />
            </div>
        </div>

        <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
            <p>Showing {dummyItemData.length} Items</p>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-4 xl:px-20 max-w-full mx-auto'>
                {dummyItemData.map((product,index)=>(
                    <div key={index}>
                        <RentalItemCard product={product}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
