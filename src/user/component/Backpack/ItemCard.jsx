import React from 'react'

export default function ItemCard({ item, imageMapper, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getImageUrl = () => {
    if (item.item?.images && item.item.images.length > 0) {
      const imageUuid = item.item.images[0];
      return imageMapper[imageUuid] || 'https://via.placeholder.com/300';
    }
    return 'https://via.placeholder.com/300';
  };

  const handleDelete = () => {
    onDelete(item.id);
  };

  return (
    <div className="group relative flex flex-col sm:flex-row items-stretch gap-6 rounded-xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all border border-transparent hover:border-[#217964]/20">
        <div 
          className="w-full sm:w-48 md:w-56 bg-center bg-no-repeat aspect-[4/3] sm:aspect-square bg-cover rounded-lg sm:rounded-xl shrink-0" 
          style={{ backgroundImage: `url(${getImageUrl()})` }}
        ></div>
        <div className="flex flex-col flex-1 justify-between gap-4">
            <div className="flex justify-between items-start gap-4">
                <div>
                    <h3 className="text-[#0F172A] text-lg font-bold leading-tight mb-1">
                      {item.item?.name || 'Item Name'}
                    </h3>
                    <p className="text-[#64748b] text-sm leading-normal line-clamp-2">
                      {item.item?.description || 'No description available'}
                    </p>
                </div>
                <button 
                    onClick={handleDelete}
                    aria-label="Remove item" 
                    className="text-[#64748b] hover:text-red-500 transition-colors p-2 -mr-2 -mt-2 rounded-full hover:bg-red-50"
                >
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mt-2">
                <div className="flex flex-col">
                    <span className="text-xs text-[#64748b] uppercase font-semibold tracking-wider">Dates</span>
                    <span className="font-medium">
                      {formatDate(item.pickupDate)} - {formatDate(item.returnDate)}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-[#64748b] uppercase font-semibold tracking-wider">Duration</span>
                    <span className="font-medium">{item.rentalDays} Days</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-[#64748b] uppercase font-semibold tracking-wider">Quantity</span>
                    <span className="font-medium">{item.qty}</span>
                </div>
            </div>

            {/* Hotel Details Section */}
            {item.item?.category === "HOTELS" && item.item?.hotelDetails && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs font-semibold text-blue-800 mb-2 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        Hotel Details
                    </p>
                    <div className="space-y-2 text-xs">
                        <div>
                            <span className="text-gray-600">Address:</span>
                            <p className="font-semibold text-gray-800">{item.item.hotelDetails.address}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <span className="text-gray-600">Max Guests:</span>
                                <p className="font-semibold text-gray-800">{item.item.hotelDetails.maxGuests}</p>
                            </div>
                            {item.item.hotelDetails.roomNumber && (
                                <div>
                                    <span className="text-gray-600">Room:</span>
                                    <p className="font-semibold text-gray-800">{item.item.hotelDetails.roomNumber}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Vehicle Details Section */}
            {item.item?.category === "VEHICLES" && item.item?.vehicleDetails && (
                <div className="mt-3 p-3 bg-teal-50 rounded-lg border border-teal-200">
                    <p className="text-xs font-semibold text-teal-800 mb-2 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                        Vehicle Details
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                            <span className="text-gray-600">Vehicle:</span>
                            <p className="font-semibold text-gray-800">{item.item.vehicleDetails.vehicleNumber}</p>
                        </div>
                        <div>
                            <span className="text-gray-600">Passengers:</span>
                            <p className="font-semibold text-gray-800">{item.item.vehicleDetails.passengerCount}</p>
                        </div>
                        <div>
                            <span className="text-gray-600">Condition:</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                item.item.vehicleDetails.condition === 'AC' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                                {item.item.vehicleDetails.condition}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-600">Driver:</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                item.item.vehicleDetails.driverStatus === 'WITH_DRIVER' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                            }`}>
                                {item.item.vehicleDetails.driverStatus === 'WITH_DRIVER' ? 'With Driver' : 'Self Drive'}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-cover bg-center bg-gray-300"></div>
                    <span className="text-xs font-medium text-[#64748b]">
                      Provider: {item.providerTenant}
                    </span>
                </div>
                <span className="text-lg font-bold text-[#217964]">
                  LKR {item.totalPrice}
                </span>
            </div>
         </div>
    </div>
  )
}
