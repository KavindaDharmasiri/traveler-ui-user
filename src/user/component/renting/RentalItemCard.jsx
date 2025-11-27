import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function RentalItemCard({product}) {
 const [count, setCount] = React.useState(0);
 const navigate =useNavigate()

 const discountPercentage = product.isDiscount 
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100) 
    : 0;

    return (
        <div onClick={()=>{navigate(`/item-details/${product.id}`);scrollTo(0,0)}} className="group border border-gray-500/20 overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 rounded-xl md:px-2 px-3 py-2 bg-white min-w-60 max-w-60 w-full cursor-pointer">
            <div className="relative  h-48 overflow-hidden">
                <img className="object-cover transition-transform duration-500 group-hover:scale-105 transition w-full h-full" src={product.image} alt={product.name} />
                {product.isAvailable && <p className='absolute bottom-4 left-1 bg-[#3333cc] text-white text-xs px-2.5 py-1 rounded-full'>Available Now</p>}
                {product.isDiscount && <p className='absolute top-4 right-1 bg-red-600 text-white text-xs px-2.5 py-1 rounded-full'>- {discountPercentage}% OFF</p>}
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        product.rating > i ? (
                            <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" fill="#217964" />
                            </svg>
                        ) : (
                            <svg width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z" fill="#217964" fill-opacity="0.35" />
                            </svg>
                        )
                    ))}
                    <p>({product.rating})</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-[#dc2626]">
                       
                        ${product.offerPrice} 
                        
                        <span className="relative text-gray-500/60 md:text-sm text-xs ml-2"> 
                            <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-red-600"></span>
                            ${product.price}
                        </span>
                        
                       
                        <span className='text-sm text-black/20'>/ day</span>
                    </p>
                    <div className="text-indigo-500">
                        {count === 0 ? (
                            <button className="flex items-center justify-center gap-1 bg-emerald-50 border border-emerald-300 md:w-[80px] w-[64px] h-[34px] rounded text-[#217964] font-medium" onClick={() => setCount(1)} >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#217964" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Book
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-500/25 rounded select-none">
                                <button onClick={() => setCount((prev) => Math.max(prev - 1, 0))} className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{count}</span>
                                <button onClick={() => setCount((prev) => prev + 1)} className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
