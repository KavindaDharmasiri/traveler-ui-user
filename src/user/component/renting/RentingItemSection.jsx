import React from 'react'
import Title from './Title'
import { dummyItemData } from '../../../assets/assets'
import RentalItemCard from './RentalItemCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

export default function RentingItemSection() {

    const navigate=useNavigate()

  return (
    <div className='flex flex-col items-center pt-10 px-4 md:px-6 lg:px-10 xl:px-16'>

        <div>
            <Title title='Fetured Items' subTitle='Explore our selection of premium items available for your next advenure'/>
        </div>


        <div className='flex flex-wrap flex-col items-center sm:flex-row sm:items-start mt-8 pl-20'>
        {dummyItemData.slice(0, 6).map((product) => (
            <div className='m-6' key={product.id}>   
            <RentalItemCard product={product} />
            </div>
        ))}
        </div>

        <button onClick={()=>{
            navigate('/rentItems');scrollTo(0,0)
        }}
        className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor text-gray-700 hover:text-white hover:bg-[#3333cc]  rounded-md mt-16 cursor-pointer'>
            Explore all Items<FontAwesomeIcon icon={faAngleRight} />
        </button>


    </div>
  )
}
