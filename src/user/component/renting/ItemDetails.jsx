import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import ProductDescription from './ProductDescription'
import axios from '../../api/axios'
import { API_CONFIG } from '../../../config/environment'
import Swal from 'sweetalert2'

// Fallback thumbnails if no extra images are provided
const fallbackThumbnails = [
  'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide1.png',
  'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide2.png',
  'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide3.png',
  'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide4.png'
]

export default function ItemDetails() {
  const { id, tenant } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [activeImage, setActiveImage] = useState(null)
  const [imageMapper, setImageMapper] = useState({})
  const [loading, setLoading] = useState(true)
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [booking, setBooking] = useState(false)

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

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}core/api/v1/provider/item/${id}/${tenant}`, {
          headers: {
            'X-Tenant-Id': tenant
          }
        })
        
        const itemData = response.data
        setItem(itemData)
        
        if (itemData.images && itemData.images.length > 0) {
          await fetchImages(itemData.images)
          setActiveImage(itemData.images[0])
        } else {
          setActiveImage(fallbackThumbnails[0])
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching item:', error)
        setLoading(false)
      }
    }

    if (id && tenant) {
      fetchItem()
    }
  }, [id, tenant])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
        <p>Item not found</p>
      </div>
    )
  }

  const thumbnails = item.images && item.images.length > 0 
    ? item.images.map(uuid => imageMapper[uuid]).filter(Boolean)
    : fallbackThumbnails.slice(0, 4)

  const displayPrice = item.pricePerDay

  const calculateRentalDays = () => {
    if (!pickupDate || !returnDate) return 0
    const pickup = new Date(pickupDate)
    const returnD = new Date(returnDate)
    const diffTime = Math.abs(returnD - pickup)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const handleBooking = async (e) => {
    e.preventDefault()
    if (!pickupDate || !returnDate) return
    
    setBooking(true)
    try {
      const rentalDays = calculateRentalDays()
      const totalPrice = rentalDays * item.pricePerDay
      
      await axios.post(`${API_CONFIG.BASE_URL}core/api/v1/order/create`, {
        customerName: localStorage.getItem('name'),
        item: parseInt(id),
        totalPrice: totalPrice,
        rentalDays: rentalDays,
        clientTenant: localStorage.getItem('tenantId'),
        providerTenant: tenant,
        pickupDate: pickupDate,
        returnDate: returnDate
      })
      
      Swal.fire({
        icon: 'success',
        title: 'Booking successful!',
        confirmButtonColor: '#0f766e'
      }).then(() => {
        navigate(-1)
      })
    } catch (error) {
      console.error('Booking failed:', error)
      Swal.fire({
        icon: 'error',
        title: 'Booking failed',
        text: 'Please try again.',
        confirmButtonColor: '#0f766e'
      })
    } finally {
      setBooking(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Hero Section */}
      <div className='relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-slate-800 py-12'>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-transparent"></div>
        
        <div className="relative px-6 md:px-16 lg:px-24 xl:px-32">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-xl transition-all duration-300 transform hover:scale-105"
            type="button"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
            <span className="font-medium">
              Back to all items
            </span>
          </button>
          
          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Item Details
            </h1>
            <p className="text-xl text-teal-100">
              Explore premium rental options
            </p>
          </div>
        </div>
      </div>
      
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* LEFT: Image + Details + Tabs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image gallery */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-teal-100/50">
              <div className="flex flex-col items-center space-y-6">
                <div className="w-full max-w-3xl relative overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={activeImage && imageMapper[activeImage] ? imageMapper[activeImage] : fallbackThumbnails[0]}
                    alt={item.name || 'Item image'}
                    className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <div className="grid grid-cols-4 max-w-3xl gap-4">
                  {item.images && item.images.length > 0 ? (
                    item.images.map((uuid, index) => (
                      <button
                        key={uuid}
                        type="button"
                        onClick={() => setActiveImage(uuid)}
                        className={`rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
                          activeImage === uuid
                            ? 'border-teal-500 shadow-lg'
                            : 'border-teal-100 hover:border-teal-300'
                        }`}
                      >
                        <img
                          src={imageMapper[uuid] || fallbackThumbnails[0]}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full md:h-24 h-14 object-cover cursor-pointer"
                        />
                      </button>
                    ))
                  ) : (
                    fallbackThumbnails.slice(0, 4).map((src, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveImage(src)}
                        className={`rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
                          activeImage === src
                            ? 'border-teal-500 shadow-lg'
                            : 'border-teal-100 hover:border-teal-300'
                        }`}
                      >
                        <img
                          src={src}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full md:h-24 h-14 object-cover cursor-pointer"
                        />
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Top text details */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-teal-100/50">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-slate-700 bg-clip-text text-transparent mb-2">
                        {item.name}
                      </h2>
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="px-4 py-2 bg-teal-100 text-teal-700 text-sm font-semibold rounded-xl uppercase tracking-wide">
                          {item.category.replace('_', ' ')}
                        </span>
                        <span
                          className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                            item.status === 'ACTIVE'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {item.status === 'ACTIVE' ? 'Available' : item.status}
                        </span>
                      </div>
                    </div>
                    
                    {/* Rating Display */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {Array(5).fill('').map((_, i) => (
                          <svg key={i} className={`w-5 h-5 ${i < Math.floor(item.overallRating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                               fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        ))}
                        <span className="text-sm text-gray-600 ml-2">({(item.overallRating || 0).toFixed(1)})</span>
                      </div>
                    </div>
                  </div>
                  
                  {/*<div className="bg-gradient-to-r from-teal-50 to-slate-50 rounded-2xl p-4">*/}
                  {/*  <p className="text-slate-700 font-medium flex items-center space-x-2">*/}
                  {/*    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>*/}
                  {/*    <span>Contact: {item.contact}</span>*/}
                  {/*  </p>*/}
                  {/*</div>*/}
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent"></div>

                {/* ⬇️ Full tabbed description + reviews + vendor */}
                <ProductDescription product={item} />
              </div>
            </div>
          </div>

          {/* RIGHT: Booking / Actions panel */}
          <form onSubmit={handleBooking} className="bg-gradient-to-br from-white via-white to-teal-50/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-teal-100/50 h-max sticky top-24 space-y-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-8 bg-gradient-to-b from-teal-500 to-teal-600 rounded-full"></div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-slate-700 bg-clip-text text-transparent">Book Now</h3>
              </div>
              <p className="flex items-center justify-center text-3xl font-bold text-slate-800">
                <span className="text-lg text-teal-600 mr-1">{item.currency}</span>
                {displayPrice}
                <span className="text-base text-slate-500 font-normal ml-2">
                  / day
                </span>
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent"></div>

            <div className="space-y-4">
              <div className="space-y-3">
                <label htmlFor="pickup-date" className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                  <span>Pickup Date</span>
                </label>
                <input
                  type="date"
                  className="w-full p-4 bg-white border-2 border-teal-100 rounded-2xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-300 text-slate-700 font-medium shadow-sm hover:shadow-md"
                  required
                  id="pickup-date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="return-date" className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                  <span>Return Date</span>
                </label>
                <input
                  type="date"
                  className="w-full p-4 bg-white border-2 border-teal-100 rounded-2xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-300 text-slate-700 font-medium shadow-sm hover:shadow-md"
                  required
                  id="return-date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={pickupDate || new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {pickupDate && returnDate && (
              <div className="bg-teal-50 rounded-2xl p-4 border border-teal-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Rental Days:</span>
                  <span className="font-semibold text-teal-700">{calculateRentalDays()} days</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                  <span className="text-slate-600">Total Cost:</span>
                  <span className="font-bold text-teal-700">{item.currency} {(calculateRentalDays() * displayPrice).toFixed(2)}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={item.status !== 'ACTIVE' || booking}
              className={`w-full transition-all duration-300 py-4 font-semibold text-white rounded-2xl transform hover:scale-105 shadow-lg ${
                item.status === 'ACTIVE' && !booking
                  ? 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 hover:shadow-xl'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {booking ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : item.status === 'ACTIVE' ? 'Add To Bag' : 'Currently Unavailable'}
            </button>

            <div className="text-center space-y-2">
              <p className="text-sm text-slate-600 flex items-center justify-center space-x-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>No credit card required to reserve</span>
              </p>
              <p className="text-xs text-slate-500">Secure booking • Instant confirmation</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
