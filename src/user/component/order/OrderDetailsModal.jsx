import React from 'react';

export default function OrderDetailsModal({ order, isOpen, onClose, imageMapper = {} }) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-gray-200 dark:border-gray-600">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Order Details - {order.orderCode}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Order Information</h3>
              <p><span className="font-medium">Customer:</span> {order.customerName}</p>
              <p><span className="font-medium">Status:</span> {order.status}</p>
              <p><span className="font-medium">Order Code:</span> {order.orderCode}</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Order Items ({order.items?.length || 0})</h3>
            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <div key={item.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  {item.itemObj?.images && item.itemObj.images.length > 0 && (
                    <div className="mb-4">
                      <div className="flex gap-2 overflow-x-auto">
                        {item.itemObj.images.map((uuid, imgIndex) => (
                          <img
                            key={uuid}
                            src={imageMapper[uuid]}
                            alt={`${item.itemObj.name} ${imgIndex + 1}`}
                            className="w-20 h-20 object-cover rounded border border-gray-200 flex-shrink-0"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold">{item.itemObj?.name || `Item ${item.item}`}</h4>
                      <p className="text-sm text-gray-600">{item.itemObj?.description}</p>
                      <p className="text-sm"><span className="font-medium">Category:</span> {item.itemObj?.category}</p>
                      
                      {/* Vendor Name */}
                      <p className="text-sm"><span className="font-medium">Vendor:</span> {item.providerName}</p>
                      
                      {/* Location with Google Maps link */}
                      {(item.map || item.itemObj?.location || item.itemObj?.address || item.itemObj?.hotelDetails?.address) && (
                        <div className="flex items-center gap-1 text-sm mt-1">
                          <span className="material-symbols-outlined text-[16px] text-blue-600">location_on</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const location = item.map || item.itemObj?.location || item.itemObj?.address || item.itemObj?.hotelDetails?.address;
                              window.open(`https://maps.google.com/?q=${encodeURIComponent(location)}`, '_blank');
                            }}
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            {item.map || item.itemObj?.location || item.itemObj?.address || item.itemObj?.hotelDetails?.address}
                          </button>
                        </div>
                      )}
                      
                      {/* Contact with WhatsApp link */}
                      {(item.contact || item.itemObj?.contact) && (
                        <div className="flex items-center gap-1 text-sm mt-1">
                          <span className="material-symbols-outlined text-[16px] text-green-600">phone</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const phone = item.contact || item.itemObj?.contact;
                              window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank');
                            }}
                            className="text-green-600 hover:text-green-800 underline"
                          >
                            {item.contact || item.itemObj?.contact}
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Status:</span> 
                        <span className={`ml-2 px-2 py-1 rounded text-xs ${
                          item.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status}
                        </span>
                      </p>
                      <p><span className="font-medium">Quantity:</span> {item.qty}</p>
                      <p><span className="font-medium">Rental Days:</span> {item.rentalDays}</p>
                      <p><span className="font-medium">Total Price:</span> Rs. {item.totalPrice}</p>
                      <p><span className="font-medium">Pickup:</span> {item.pickupDate}</p>
                      <p><span className="font-medium">Return:</span> {item.returnDate}</p>
                    </div>
                  </div>
                  
                  {/* Vehicle Details */}
                  {item.itemObj?.category === 'VEHICLES' && item.itemObj?.vehicleDetails && (
                    <div className="mt-4 p-3 bg-teal-50 rounded-lg">
                      <h5 className="font-semibold text-teal-800 mb-2">Vehicle Details</h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                        <div><span className="font-medium">Vehicle:</span> {item.itemObj.vehicleDetails.vehicleNumber}</div>
                        <div><span className="font-medium">Passengers:</span> {item.itemObj.vehicleDetails.passengerCount}</div>
                        <div><span className="font-medium">Condition:</span> {item.itemObj.vehicleDetails.condition}</div>
                        <div><span className="font-medium">Driver:</span> {item.itemObj.vehicleDetails.driverStatus}</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Hotel Details */}
                  {item.itemObj?.category === 'HOTELS' && item.itemObj?.hotelDetails && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <h5 className="font-semibold text-blue-800 mb-2">Hotel Details</h5>
                      <div className="text-xs space-y-1">
                        <div><span className="font-medium">Address:</span> {item.itemObj.hotelDetails.address}</div>
                        <div><span className="font-medium">Max Guests:</span> {item.itemObj.hotelDetails.maxGuests}</div>
                        {item.itemObj.hotelDetails.roomNumber && (
                          <div><span className="font-medium">Room:</span> {item.itemObj.hotelDetails.roomNumber}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
