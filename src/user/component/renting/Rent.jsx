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

    useEffect(() => {
        fetchItems()
    }, [currentPage])

    useEffect(() => {
        filterItems()
    }, [input, selectedCategory, allItems])

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

    const fetchItems = async () => {
        try {
            const response = await axios.get(`${API_CONFIG.BASE_URL}core/api/v1/provider/item/getAllForTraveller?page=${currentPage}&size=36`)
            const data = response.data || {}
            
            setProviders(data.providers || [])
            setAllItems(data.items || [])
            setTotalPages(data.totalPages || 0)
            setTotalItems(data.totalItems || 0)
            
            // Collect all image UUIDs from current page items
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
            const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory
            return matchesSearch && matchesCategory
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
            {/* Hero Section */}
            <div className='relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-slate-800'>
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
                            <FontAwesomeIcon icon={faFilter} className='w-5 h-5 ml-4 text-teal-600 cursor-pointer hover:text-teal-700 transition-colors' />
                        </div>
                    </div>

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
                    
                    <div className="hidden md:flex items-center space-x-4 text-sm text-gray-500 animate-fade-in">
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-teal-500 rounded-full mr-2 animate-pulse"></div>
                            Live Results
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
