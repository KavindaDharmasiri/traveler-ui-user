import React, { useState, useEffect } from 'react'
import Title from './Title'
import RentalItemCard from './RentalItemCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from '../../api/axios'
import { API_CONFIG } from '../../../config/environment'

export default function Rent() {
    const [input, setInput] = useState('')
    const [providers, setProviders] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [allItems, setAllItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('ALL')
    const [imageMapper, setImageMapper] = useState({})
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [pageSize, setPageSize] = useState(8)
    const [userVerification, setUserVerification] = useState({ isEmailVerified: true, isNumberVerified: true })
    const [filters, setFilters] = useState({
        category: '',
        provider: '',
        minPrice: '',
        maxPrice: '',
        minRating: ''
    })
    const [availableFilters, setAvailableFilters] = useState({
        categories: [],
        providers: []
    })
    const [showFilters, setShowFilters] = useState(false)

    useEffect(() => {
        checkVerificationStatus()
        fetchFilters()
        fetchItems()
    }, [])

    const checkVerificationStatus = async () => {
        try {
            const response = await axios.get('auth/me')
            setUserVerification({
                isEmailVerified: response.data.isEmailVerified === true,
                isNumberVerified: response.data.isNumberVerified === true
            })
        } catch (error) {
            console.error('Error checking verification status:', error)
        }
    }
    
    useEffect(() => {
        setCurrentPage(0)
        fetchItems()
    }, [filters, selectedCategory, pageSize])

    useEffect(() => {
        filterItems()
    }, [input, allItems])

    const fetchImages = async (imageUuids) => {
        const mapper = {}
        for (const uuid of imageUuids) {
            try {
                const response = await axios.get(`storage/files/download/${uuid}`, {
                    responseType: 'blob'
                })
                mapper[uuid] = URL.createObjectURL(response.data)
            } catch (error) {
                console.error(`Error fetching image ${uuid}:`, error)
            }
        }
        setImageMapper(mapper)
    }

    const fetchFilters = async () => {
        try {
            const [filtersResponse, providersResponse] = await Promise.all([
                axios.get(`${API_CONFIG.BASE_URL}core/api/v1/provider/item/filters`),
                axios.get(`${API_CONFIG.BASE_URL}auth/providers`)
            ])
            
            setAvailableFilters({
                categories: filtersResponse.data?.categories || [],
                providers: providersResponse.data || []
            })
        } catch (error) {
            console.error('Error fetching filters:', error)
        }
    }

    const fetchItems = async () => {
        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                size: pageSize.toString()
            })
            
            if (selectedCategory !== 'ALL') params.append('category', selectedCategory)
            if (filters.provider) params.append('provider', filters.provider)
            if (filters.minPrice) params.append('minPrice', filters.minPrice)
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
            if (filters.minRating) params.append('minRating', filters.minRating)
            
            const response = await axios.get(`${API_CONFIG.BASE_URL}core/api/v1/provider/item/getAllForTraveller?${params}`)
            const data = response.data || {}
            
            setProviders(data.providers || [])
            setAllItems(data.items || [])
            setTotalPages(data.totalPages || 0)
            setTotalItems(data.totalItems || 0)
            
            const allImageUuids = (data.items || []).flatMap(item => item.images || [])
            if (allImageUuids.length > 0) {
                await fetchImages(allImageUuids)
            }
            
            setLoading(false)
        } catch (error) {
            console.error('Error fetching items:', error)
            setProviders([])
            setAllItems([])
            setLoading(false)
        }
    }

    const filterItems = () => {
        if (!Array.isArray(allItems)) return
        
        let filtered = allItems.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(input.toLowerCase()) ||
                                item.providerName.toLowerCase().includes(input.toLowerCase()) ||
                                item.category.toLowerCase().includes(input.toLowerCase())
            return matchesSearch
        })

        setFilteredItems(filtered)
    }

    const categories = ['ALL', 'ELECTRONICS', 'VEHICLES', 'CAMPING', 'HOTELS', 'OUTDO0OR', 'WATERSPORTS', 'LUGGAGE']

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
            </div>
        )
    }

    const isVerified = userVerification.isEmailVerified && userVerification.isNumberVerified

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 relative">
            {/* Verification Overlay */}
            {!isVerified && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl text-center">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FontAwesomeIcon icon={faSearch} className="text-3xl text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Verification Required</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Please verify your email and phone number to browse and rent items.
                        </p>
                        <div className="space-y-3 mb-6">
                            <div className={`flex items-center justify-between p-3 rounded-lg ${
                                userVerification.isEmailVerified ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                            }`}>
                                <span className="text-sm font-medium">Email Verification</span>
                                <span className="text-xs">
                                    {userVerification.isEmailVerified ? '✓ Verified' : '✗ Not Verified'}
                                </span>
                            </div>
                            <div className={`flex items-center justify-between p-3 rounded-lg ${
                                userVerification.isNumberVerified ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                            }`}>
                                <span className="text-sm font-medium">Phone Verification</span>
                                <span className="text-xs">
                                    {userVerification.isNumberVerified ? '✓ Verified' : '✗ Not Verified'}
                                </span>
                            </div>
                        </div>
                        <a
                            href="/profile"
                            className="block w-full py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors text-center"
                        >
                            Go to Profile to Verify
                        </a>
                    </div>
                </div>
            )}
            {/* Hero Section */}
            <div className={`relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-slate-800 ${!isVerified ? 'pointer-events-none' : ''}`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-transparent"></div>
                
                <div className='relative flex flex-col items-center py-24 px-4 max-w-7xl mx-auto'>
                    <div className="text-center mb-12 animate-fade-in">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Discover Amazing
                            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                Travel Items
                            </span>
                        </h1>
                        <p className="text-xl text-teal-100 max-w-2xl mx-auto leading-relaxed">
                            Browse our curated selection of premium items from trusted providers worldwide
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className='relative max-w-2xl w-full mb-8 animate-slide-up'>
                        <div className='flex items-center bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-2xl border border-white/20'>
                            <FontAwesomeIcon icon={faSearch} className='w-5 h-5 mr-4 text-teal-600' />
                            <input 
                                onChange={(e) => setInput(e.target.value)} 
                                value={input} 
                                type='text' 
                                placeholder='Search by name, provider, or category...' 
                                className='w-full outline-none text-gray-700 placeholder-gray-500 text-lg bg-transparent'
                            />
                            <FontAwesomeIcon 
                                icon={faFilter} 
                                className={`w-5 h-5 ml-4 cursor-pointer transition-all duration-300 transform hover:scale-110 ${
                                    showFilters ? 'text-teal-700 rotate-180' : 'text-teal-600 hover:text-teal-700'
                                }`}
                                onClick={() => setShowFilters(!showFilters)}
                            />
                        </div>
                    </div>

                    {/* Advanced Filters Panel */}
                    {showFilters && (
                        <div className='w-full max-w-6xl bg-gradient-to-br from-white via-white to-teal-50/30 backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-2xl border border-teal-100/50'>
                            <div className='flex items-center justify-between mb-6'>
                                <div className='flex items-center space-x-3'>
                                    <div className='w-2 h-8 bg-gradient-to-b from-teal-500 to-teal-600 rounded-full'></div>
                                    <h3 className='text-2xl font-bold bg-gradient-to-r from-teal-700 to-slate-700 bg-clip-text text-transparent'>Advanced Filters</h3>
                                </div>
                                <button 
                                    onClick={() => setFilters({...filters, provider: '', minPrice: '', maxPrice: '', minRating: ''})}
                                    className='px-6 py-2.5 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-xl hover:from-slate-600 hover:to-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium'
                                >
                                    Clear All
                                </button>
                            </div>
                            
                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                                {/* Provider Filter */}
                                <div className='space-y-3'>
                                    <label className='flex items-center space-x-2 text-sm font-semibold text-slate-700'>
                                        <div className='w-1.5 h-1.5 bg-teal-500 rounded-full'></div>
                                        <span>Provider</span>
                                    </label>
                                    <div className='relative'>
                                        <select 
                                            value={filters.provider} 
                                            onChange={(e) => setFilters({...filters, provider: e.target.value})}
                                            className='w-full p-4 bg-white border-2 border-teal-100 rounded-2xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-300 text-slate-700 font-medium shadow-sm hover:shadow-md appearance-none cursor-pointer'
                                        >
                                            <option value=''>All Providers</option>
                                            {availableFilters.providers.map(provider => (
                                                <option key={provider} value={provider}>{provider}</option>
                                            ))}
                                        </select>
                                        <div className='absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none'>
                                            <svg className='w-5 h-5 text-teal-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Price Range */}
                                <div className='space-y-3'>
                                    <label className='flex items-center space-x-2 text-sm font-semibold text-slate-700'>
                                        <div className='w-1.5 h-1.5 bg-teal-500 rounded-full'></div>
                                        <span>Price Range</span>
                                    </label>
                                    <div className='flex space-x-3'>
                                        <div className='relative flex-1'>
                                            <input 
                                                type='number' 
                                                placeholder='Min Price' 
                                                value={filters.minPrice} 
                                                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                                                className='w-full p-4 bg-white border-2 border-teal-100 rounded-2xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-300 text-slate-700 font-medium shadow-sm hover:shadow-md placeholder-slate-400'
                                            />
                                        </div>
                                        <div className='flex items-center'>
                                            <div className='w-3 h-0.5 bg-teal-300 rounded-full'></div>
                                        </div>
                                        <div className='relative flex-1'>
                                            <input 
                                                type='number' 
                                                placeholder='Max Price' 
                                                value={filters.maxPrice} 
                                                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                                                className='w-full p-4 bg-white border-2 border-teal-100 rounded-2xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-300 text-slate-700 font-medium shadow-sm hover:shadow-md placeholder-slate-400'
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Rating Filter */}
                                <div className='space-y-3'>
                                    <label className='flex items-center space-x-2 text-sm font-semibold text-slate-700'>
                                        <div className='w-1.5 h-1.5 bg-teal-500 rounded-full'></div>
                                        <span>Minimum Rating</span>
                                    </label>
                                    <div className='bg-white border-2 border-teal-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300'>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center space-x-2'>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type='button'
                                                        onClick={() => setFilters({...filters, minRating: star.toString()})}
                                                        className={`w-9 h-9 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                                                            star <= (parseInt(filters.minRating) || 0)
                                                                ? 'text-yellow-400 bg-yellow-50 shadow-md'
                                                                : 'text-slate-300 hover:text-yellow-300 hover:bg-yellow-50/50'
                                                        }`}
                                                    >
                                                        <svg fill='currentColor' viewBox='0 0 20 20' className='w-full h-full p-1'>
                                                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                                                        </svg>
                                                    </button>
                                                ))}
                                            </div>
                                            {filters.minRating && (
                                                <button
                                                    type='button'
                                                    onClick={() => setFilters({...filters, minRating: ''})}
                                                    className='px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors'
                                                >
                                                    Clear
                                                </button>
                                            )}
                                        </div>
                                        {filters.minRating && (
                                            <div className='mt-3 pt-3 border-t border-teal-100'>
                                                <p className='text-sm font-medium text-teal-600 flex items-center space-x-2'>
                                                    <span className='w-2 h-2 bg-teal-500 rounded-full'></span>
                                                    <span>{filters.minRating}+ stars minimum</span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Category Filter */}
                    <div className='flex gap-3 flex-wrap justify-center animate-slide-up' style={{animationDelay: '0.2s'}}>
                        {categories.map((category, index) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                                    selectedCategory === category
                                        ? 'bg-white text-teal-700 shadow-lg scale-105'
                                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                                }`}
                                style={{animationDelay: `${index * 0.1}s`}}
                            >
                                {category.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-16'>
                <div className="flex items-center justify-between mb-12">
                    <div className="animate-fade-in">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Items</h2>
                        <p className="text-gray-600">Showing {filteredItems.length} items from {providers.length} providers</p>
                        <p className="text-sm text-gray-500">Page {currentPage + 1} of {totalPages} ({totalItems} total items)</p>
                    </div>
                    
                    <div className="flex items-center space-x-6 animate-fade-in">
                        <div className="flex items-center space-x-3">
                            <label className="text-sm font-medium text-gray-700">Items per page:</label>
                            <select 
                                value={pageSize} 
                                onChange={(e) => setPageSize(parseInt(e.target.value))}
                                className="px-3 py-2 bg-white border-2 border-teal-100 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 text-sm font-medium text-gray-700 cursor-pointer"
                            >
                                <option value={8}>8</option>
                                <option value={16}>16</option>
                                <option value={24}>24</option>
                                <option value={36}>36</option>
                            </select>
                        </div>
                        <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                            <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
                            <span>Live Results</span>
                        </div>
                    </div>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mb-8">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                            disabled={currentPage === 0}
                            className="px-4 py-2 bg-teal-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors"
                        >
                            Previous
                        </button>
                        
                        <div className="flex space-x-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i;
                                } else if (currentPage < 3) {
                                    pageNum = i;
                                } else if (currentPage >= totalPages - 3) {
                                    pageNum = totalPages - 5 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }
                                
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`px-3 py-2 rounded-lg transition-colors ${
                                            currentPage === pageNum
                                                ? 'bg-teal-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        {pageNum + 1}
                                    </button>
                                );
                            })}
                        </div>
                        
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                            disabled={currentPage === totalPages - 1}
                            className="px-4 py-2 bg-teal-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                )}

                {allItems.length === 0 ? (
                    <div className="text-center py-32 animate-fade-in">
                        <div className="max-w-md mx-auto">
                            <div className="w-32 h-32 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-8">
                                <FontAwesomeIcon icon={faSearch} className="text-5xl text-teal-600" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">No items found</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                We couldn't find any items matching your criteria. Try adjusting your search or category filter.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-full mx-auto'>
                        {filteredItems.map((item, index) => (
                            <div 
                                key={`${item.id}-${index}`} 
                                className="animate-fade-in-up"
                                style={{animationDelay: `${index * 0.1}s`}}
                            >
                                <RentalItemCard product={item} imageMapper={imageMapper} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
