import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyItemData } from '../../../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import ProductDescription from './ProductDescription' // 👈 adjust path if needed

// Fallback thumbnails if no extra images are provided
const fallbackThumbnails = [
  'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide1.png',
  'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide2.png',
  'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide3.png',
  'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide4.png'
]

export default function ItemDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [activeImage, setActiveImage] = useState(null)

  // Load item based on URL param
  useEffect(() => {
    const foundItem = dummyItemData.find(
      (it) => String(it.id) === String(id)
    )

    setItem(foundItem || null)

    if (foundItem) {
      if (foundItem.image) {
        setActiveImage(foundItem.image)
      } else {
        setActiveImage(fallbackThumbnails[0])
      }
    }
  }, [id])

  // Guard: while item is loading or not found
  if (!item) {
    return (
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
        <p>Loading item details...</p>
      </div>
    )
  }

  const thumbnails = [item.image, ...fallbackThumbnails.slice(0, 3)]

  const displayPrice =
    item.offerPrice && item.offerPrice > 0 ? item.offerPrice : item.price

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
                src={activeImage}
                alt={item.Brand || item.name || 'Item image'}
                className="w-full rounded-lg object-cover"
              />
            </div>

            <div className="grid grid-cols-4 max-w-3xl gap-4">
              {thumbnails.map((src, index) => (
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
              ))}
            </div>
          </div>

          {/* Top text details */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">
                {item.Brand || item.name}
              </h1>
              <p className="text-gray-500 text-lg">
                {item.category}
              </p>
              <p className="mt-2 text-sm">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    item.isAvailable
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {item.isAvailable ? 'Available' : 'Not Available'}
                </span>
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
              Rs {displayPrice}
              <span className="text-base text-gray-400 font-normal">
                per day
              </span>
            </p>

            {item.isDiscount && item.offerPrice > 0 && (
              <p className="text-sm text-gray-500">
                <span className="line-through mr-2">Rs {item.price}</span>
                <span className="text-green-600 font-medium">
                  Save Rs {item.price - item.offerPrice}
                </span>
              </p>
            )}
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
            disabled={!item.isAvailable}
            className={`w-full transition-all py-3 font-medium text-white rounded-xl cursor-pointer ${
              item.isAvailable
                ? 'bg-[#217964] hover:bg-[#399e8a]'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {item.isAvailable ? 'Book Now' : 'Currently Unavailable'}
          </button>

          <p className="text-center text-sm">
            No credit card required to reserve
          </p>
        </form>
      </div>
    </div>
  )
}
