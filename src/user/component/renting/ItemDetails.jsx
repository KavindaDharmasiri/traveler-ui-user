import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import ProductDescription from './ProductDescription'
import axios from '../../api/axios'
import { API_CONFIG } from '../../../config/environment'

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

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 hover:text-gray-700 cursor-pointer"
        type="button"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
        <span className="underline-offset-2 hover:underline">
          Back to all items
        </span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* LEFT: Image + Details + Tabs */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image gallery */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full max-w-3xl">
              <img
                src={activeImage && imageMapper[activeImage] ? imageMapper[activeImage] : fallbackThumbnails[0]}
                alt={item.name || 'Item image'}
                className="w-full rounded-lg object-cover"
              />
            </div>

            <div className="grid grid-cols-4 max-w-3xl gap-4">
              {item.images && item.images.length > 0 ? (
                item.images.map((uuid, index) => (
                  <button
                    key={uuid}
                    type="button"
                    onClick={() => setActiveImage(uuid)}
                    className={`rounded-lg overflow-hidden border ${
                      activeImage === uuid
                        ? 'border-blue-500'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={imageMapper[uuid] || fallbackThumbnails[0]}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full md:h-24 h-14 object-cover cursor-pointer hover:opacity-80"
                    />
                  </button>
                ))
              ) : (
                fallbackThumbnails.slice(0, 4).map((src, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImage(src)}
                    className={`rounded-lg overflow-hidden border ${
                      activeImage === src
                        ? 'border-blue-500'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={src}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full md:h-24 h-14 object-cover cursor-pointer hover:opacity-80"
                    />
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Top text details */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">
                {item.name}
              </h1>
              <p className="text-gray-500 text-lg">
                {item.category.replace('_', ' ')}
              </p>
              <p className="mt-2 text-sm">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'ACTIVE'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {item.status === 'ACTIVE' ? 'Available' : item.status}
                </span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Contact: {item.contact}
              </p>
            </div>

            <hr className="border-borderColor my-4" />

            {/* ⬇️ Full tabbed description + reviews + vendor */}
            <ProductDescription product={item} />
          </div>
        </div>

        {/* RIGHT: Booking / Actions panel */}
        <form className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500">
          <div className="space-y-1">
            <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
              {item.currency} {displayPrice}
              <span className="text-base text-gray-400 font-normal">
                per day
              </span>
            </p>
          </div>

          <hr className="border-borderColor my-6" />

          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Pickup date</label>
            <input
              type="date"
              className="border border-gray-300 px-3 py-2 rounded-lg"
              required
              id="pickup-date"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return date</label>
            <input
              type="date"
              className="border border-gray-300 px-3 py-2 rounded-lg"
              required
              id="return-date"
            />
          </div>

          <button
            type="submit"
            disabled={item.status !== 'ACTIVE'}
            className={`w-full transition-all py-3 font-medium text-white rounded-xl cursor-pointer ${
              item.status === 'ACTIVE'
                ? 'bg-[#217964] hover:bg-[#399e8a]'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {item.status === 'ACTIVE' ? 'Book Now' : 'Currently Unavailable'}
          </button>

          <p className="text-center text-sm">
            No credit card required to reserve
          </p>
        </form>
      </div>
    </div>
  )
}
