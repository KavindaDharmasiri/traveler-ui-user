import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'

export default function RentalItemCard({product, imageMapper}) {
 const [count, setCount] = React.useState(0);
 const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
 const navigate = useNavigate()

 const discountPercentage = product.isDiscount 
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100) 
    : 0;

    return (
        <div
            onClick={() => {
                navigate(`/item-details/${product.id}/${product.tenant}`);
                scrollTo(0, 0)
            }}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer backdrop-blur-sm"
        >
            <div className="relative h-56 overflow-hidden rounded-t-2xl">
                {product.images && product.images.length > 0 ? (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                        <img
                            className="object-cover transition-all duration-700 group-hover:scale-110 w-full h-full"
                            src={imageMapper[product.images[currentImageIndex]]}
                            alt={product.name}
                        />
                        {product.images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setCurrentImageIndex(prev => (prev - 1 + product.images.length) % product.images.length)
                                    }}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm text-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl z-20 opacity-0 group-hover:opacity-100"
                                >
                                    <span className="text-sm font-bold">‹</span>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setCurrentImageIndex(prev => (prev + 1) % product.images.length)
                                    }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm text-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl z-20 opacity-0 group-hover:opacity-100"
                                >
                                    <span className="text-sm font-bold">›</span>
                                </button>
                                <div
                                    className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                                    {product.images.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                idx === currentImageIndex
                                                    ? 'bg-white scale-125 shadow-lg'
                                                    : 'bg-white/70 hover:bg-white/90'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <div
                        className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200">
                        <div className="text-gray-400 text-center">
                            <div
                                className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-3 mx-auto">
                                <FontAwesomeIcon icon={faBoxOpen} className="text-2xl"/>
                            </div>
                            <div className="text-sm font-medium">No image available</div>
                        </div>
                    </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-3 right-3 z-20">
                    <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg transition-all duration-300 ${
                            product.status === 'ACTIVE'
                                ? "bg-emerald-500/90 text-white border border-emerald-400/50"
                                : "bg-red-500/90 text-white border border-red-400/50"
                        }`}>
                        {product.status === 'ACTIVE' ? "Available" : product.status}
                    </span>
                </div>

                {/* Provider Badge */}
                <div className="absolute top-3 left-3 z-20">
                    <span
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-teal-600/90 text-white backdrop-blur-md shadow-lg">
                        {product.providerName}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <span
                            className="px-2 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-lg uppercase tracking-wide">
                            {product.category.replace('_', ' ')}
                        </span>
                        <div className="flex items-center space-x-1">
                            {Array(5).fill('').map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                                     fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            ))}
                            <span className="text-sm text-gray-500 ml-1">(4.0)</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors duration-300">
                        {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-4">
                        {product.description || 'Premium quality item available for rent'}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-baseline space-x-1">
                            <span className="text-2xl font-bold text-teal-600">
                                {product.currency} {product.pricePerDay}
                            </span>
                            <span className="text-sm text-gray-500 font-medium">/ day</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                            Contact: {product.contact}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        {count === 0 ? (
                            <button
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setCount(1)
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 14 14" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </svg>
                                Book Now
                            </button>
                        ) : (
                            <div
                                className="flex items-center justify-center bg-teal-50 border-2 border-teal-200 rounded-xl p-1">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setCount((prev) => Math.max(prev - 1, 0))
                                    }}
                                    className="w-8 h-8 flex items-center justify-center text-teal-600 hover:bg-teal-100 rounded-lg transition-colors font-bold"
                                >
                                    −
                                </button>
                                <span className="w-12 text-center font-bold text-teal-700">{count}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setCount((prev) => prev + 1)
                                    }}
                                    className="w-8 h-8 flex items-center justify-center text-teal-600 hover:bg-teal-100 rounded-lg transition-colors font-bold"
                                >
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
