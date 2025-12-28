import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

const ProductDescription = ({ product }) => {
  const [selectedTab, setSelectedTab] = useState("Description")
  
  // Determine available tabs based on product category
  const availableTabs = ["Description", "Reviews"]
  if (product.category === "VEHICLES" && product.vehicleDetails) {
    availableTabs.splice(1, 0, "Vehicle Details") // Insert after Description
  }
  if (product.category === "HOTELS" && product.hotelDetails) {
    availableTabs.splice(1, 0, "Hotel Details") // Insert after Description
  }

  return (
    <div className="mt-12 mb-18 text-sm text-slate-600">
      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 max-w-2xl">
        {availableTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setSelectedTab(tab)}
            className={`${
              tab === selectedTab
                ? "border-b-[1.5px] border-slate-900 font-semibold text-slate-900"
                : "text-slate-400"
            } px-3 py-2 font-medium`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Description */}
      {selectedTab === "Description" && (
        <div className="max-w-xl space-y-3">
          {/* Rating Row */}
          {typeof product.rating === "number" && (
            <div className="flex items-center gap-1 mb-2">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    className={`text-base ${
                      product.rating >= index + 1
                        ? "text-green-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}

              <span className="ml-2 text-xs text-slate-500">
                {product.rating.toFixed
                  ? product.rating.toFixed(1)
                  : product.rating}{" "}
                / 5
              </span>
            </div>
          )}

          <p>{product.description || "No description available."}</p>
        </div>
      )}

      {/* Hotel Details */}
      {selectedTab === "Hotel Details" && product.hotelDetails && (
        <div className="max-w-2xl space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Hotel Information</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start py-3 border-b border-blue-100">
                <span className="font-medium text-slate-600">Address:</span>
                <span className="font-semibold text-slate-800 text-right max-w-xs">{product.hotelDetails.address}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-blue-100">
                <span className="font-medium text-slate-600">Max Guests:</span>
                <span className="font-semibold text-slate-800">{product.hotelDetails.maxGuests} guests</span>
              </div>
              
              {product.hotelDetails.roomNumber && (
                <div className="flex justify-between items-center py-3 border-b border-blue-100">
                  <span className="font-medium text-slate-600">Room Number:</span>
                  <span className="font-semibold text-slate-800">{product.hotelDetails.roomNumber}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Vehicle Details */}
      {selectedTab === "Vehicle Details" && product.vehicleDetails && (
        <div className="max-w-2xl space-y-4">
          <div className="bg-gradient-to-r from-teal-50 to-slate-50 rounded-2xl p-6 border border-teal-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
              <span>Vehicle Specifications</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-teal-100">
                  <span className="font-medium text-slate-600">Vehicle Number:</span>
                  <span className="font-semibold text-slate-800">{product.vehicleDetails.vehicleNumber}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-teal-100">
                  <span className="font-medium text-slate-600">Passenger Count:</span>
                  <span className="font-semibold text-slate-800">{product.vehicleDetails.passengerCount} people</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-teal-100">
                  <span className="font-medium text-slate-600">Condition:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.vehicleDetails.condition === 'AC' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {product.vehicleDetails.condition}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-teal-100">
                  <span className="font-medium text-slate-600">Driver Status:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.vehicleDetails.driverStatus === 'WITH_DRIVER' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {product.vehicleDetails.driverStatus === 'WITH_DRIVER' ? 'With Driver' : 'Self Drive'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-teal-100">
                  <span className="font-medium text-slate-600">KM per Day:</span>
                  <span className="font-semibold text-slate-800">{product.vehicleDetails.kmPerDay} km</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-teal-100">
                  <span className="font-medium text-slate-600">Extra KM Rate:</span>
                  <span className="font-semibold text-slate-800">{product.currency} {product.vehicleDetails.pricePerExtraKm}/km</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-teal-100">
                  <span className="font-medium text-slate-600">Waiting Charge:</span>
                  <span className="font-semibold text-slate-800">{product.currency} {product.vehicleDetails.waitingChargePerNight}/night</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews */}
      {selectedTab === "Reviews" && (
        <div className="flex flex-col gap-3 mt-6">
          {Array.isArray(product.reviews) && product.reviews.length > 0 ? (
            product.reviews.map((item, index) => (
              <div key={index} className="flex gap-5 mb-10">
                <img
                  src={item.user?.image}
                  alt={item.user?.name || "User"}
                  className="size-10 rounded-full object-cover"
                />

                <div>
                  {/* Star rating per review */}
                  <div className="flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, idx) => (
                        <FontAwesomeIcon
                          key={idx}
                          icon={faStar}
                          className={`text-base ${
                            item.rating >= idx + 1
                              ? "text-green-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                  </div>

                  <p className="text-sm max-w-lg my-4">{item.review}</p>

                  <p className="font-medium text-slate-800">{item.user?.name}</p>

                  <p className="mt-3 font-light">
                    {item.createdAt
                      ? new Date(item.createdAt).toDateString()
                      : ""}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No reviews yet for this item.
            </p>
          )}
        </div>
      )}

      {/* Store Section */}
      {product.store && (
        <div className="flex gap-3 mt-14">
          <img
            src={product.store.logo}
            alt={product.store.name}
            className="size-11 rounded-full ring ring-slate-400 object-cover"
          />
          <div>
            <p className="font-medium text-slate-600">
              Product by {product.store.name}
            </p>
            <Link
              to={`/shop/${product.store.username}`}
              className="flex items-center gap-1.5 text-green-500"
            >
              view store
              <FontAwesomeIcon icon={faArrowRight} size="sm" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDescription
