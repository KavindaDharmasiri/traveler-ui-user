import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faClipboardList, faStore, faMapMarkerAlt, faDollarSign, faArrowLeft, faPhone, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { getDetailStatusStyles, groupBookingsByVendor } from '../../../assets/assets';
import axios from '../../api/axios';

export function ViewOrderDetails({ order, onBack }) { 
    const [imageMapper, setImageMapper] = useState({});

    const fetchImages = async (imageUuids) => {
        const mapper = {};
        for (const uuid of imageUuids) {
            try {
                const response = await axios.get(`storage/files/download/${uuid}`, {
                    responseType: 'blob'
                });
                mapper[uuid] = URL.createObjectURL(response.data);
            } catch (error) {
                console.error(`Error fetching image ${uuid}:`, error);
            }
        }
        setImageMapper(mapper);
    };

    useEffect(() => {
        // Fetch images for all items
        const allImageUuids = [];
        if (order?.items) {
            order.items.forEach(item => {
                if (item.itemObj?.images) {
                    allImageUuids.push(...item.itemObj.images);
                }
            });
        }
        if (allImageUuids.length > 0) {
            fetchImages([...new Set(allImageUuids)]);
        }
    }, [order]);

    // Convert items array to grouped format
    const items = order?.items ? order.items.map(item => ({
        id: item.id,
        itemName: item.itemObj?.name || `Item ${item.item}`,
        vendorName: item.providerName || item.providerTenant || 'Unknown Vendor',
        itemPrice: item.totalPrice,
        status: item.status,
        vendorContact: item.itemObj?.contact,
        category: item.itemObj?.category,
        description: item.itemObj?.description,
        pricePerDay: item.itemObj?.pricePerDay,
        rentalDays: item.rentalDays,
        quantity: item.qty,
        images: item.itemObj?.images,
        pickupDate: item.pickupDate,
        returnDate: item.returnDate,
        mapUrl: item.map
    })) : [];
    
    const groupedItems = groupBookingsByVendor(items);
    const vendorNames = Object.keys(groupedItems);
    const totalPrice = items.reduce((sum, item) => sum + (item.itemPrice || 0), 0);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg">
                
                {/* Back Button and Header */}
                <button 
                    onClick={onBack} 
                    className="mb-6 flex items-center text-[#217964] hover:text-[#399e8a] font-medium"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Back to Orders List
                </button>

                <header className="border-b pb-4 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Order Details: {order?.orderCode || order?.orderId}
                    </h1>

                    <p className="text-2xl font-extrabold text-[#217964]">
                        Total: Rs. {totalPrice.toFixed(2)}
                    </p>
                </header>

                <h2 className="text-xl font-semibold mb-4 text-gray-700">Items You Listed</h2>

                {/* Show order summary when items are not available */}
                {vendorNames.length === 0 && (
                    <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-800 mb-4">Order Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Customer Name</p>
                                <p className="text-lg font-semibold text-gray-900">{order?.customerName || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Order Code</p>
                                <p className="text-lg font-semibold text-gray-900">{order?.orderCode || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Number of Items</p>
                                <p className="text-lg font-semibold text-gray-900">{order?.item || 0}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Rental Days</p>
                                <p className="text-lg font-semibold text-gray-900">{order?.rentalDays || 0} days</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Status</p>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getDetailStatusStyles(order?.status)}`}>
                                    {order?.status || 'Unknown'}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded">
                            <p className="text-sm text-yellow-800">
                                <strong>Note:</strong> Detailed item information is not available from the API. 
                                Contact support for specific item details.
                            </p>
                        </div>
                    </div>
                )}

                <div className="space-y-8">
                    {vendorNames.map((vendorName) => {
                        // ✅ Prevent crash if group is empty
                        const vendorDetails = (groupedItems[vendorName] && groupedItems[vendorName][0]) ? groupedItems[vendorName][0] : {};

                        return (
                            <div key={vendorName} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                                
                                {/* --- VENDOR HEADER (Includes Shop Details) --- */}
                                <div className="border-b pb-3 mb-4 flex flex-col sm:flex-row sm:items-center justify-between">
                                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2 sm:mb-0">
                                        <FontAwesomeIcon icon={faStore} className="text-blue-500" />
                                        {vendorName}
                                    </h3>

                                    <div className="flex flex-wrap gap-4 text-sm">
                                        {/* Map Link */}
                                        {vendorDetails.mapUrl && (
                                            <a 
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(vendorDetails.mapUrl)}`}
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
                                            >
                                                <FontAwesomeIcon icon={faMapPin} className="mr-1" size="sm" />
                                                View Location
                                            </a>
                                        )}
                                    </div>
                                </div>
                                {/* --------------------------------------------- */}

                                <div className="space-y-4">
                                    {groupedItems[vendorName].map(( item) => (
                                        <div key={item.id} className="p-4 bg-white rounded shadow-sm border-l-4 border-gray-300">
                                            {/* Images Section */}
                                            {item.images && item.images.length > 0 && (
                                                <div className="mb-4">
                                                    <p className="text-sm font-medium text-gray-500 mb-2">Item Images</p>
                                                    <div className="flex gap-2 overflow-x-auto">
                                                        {item.images.map((uuid, index) => (
                                                            <img
                                                                key={uuid}
                                                                src={imageMapper[uuid] || 'https://via.placeholder.com/100'}
                                                                alt={`${item.itemName} ${index + 1}`}
                                                                className="w-20 h-20 object-cover rounded border border-gray-200 flex-shrink-0"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Hotel Details Section */}
                                            {item.category === "HOTELS" && order.items.find(orderItem => orderItem.id === item.id)?.itemObj?.hotelDetails && (
                                                <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                                    <p className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                        Hotel Details
                                                    </p>
                                                    {(() => {
                                                        const hotelDetails = order.items.find(orderItem => orderItem.id === item.id)?.itemObj?.hotelDetails;
                                                        return (
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                                                <div className="md:col-span-2">
                                                                    <span className="text-gray-600">Address:</span>
                                                                    <p className="font-semibold text-gray-800">{hotelDetails.address}</p>
                                                                </div>
                                                                <div>
                                                                    <span className="text-gray-600">Max Guests:</span>
                                                                    <p className="font-semibold text-gray-800">{hotelDetails.maxGuests} guests</p>
                                                                </div>
                                                                {hotelDetails.roomNumber && (
                                                                    <div>
                                                                        <span className="text-gray-600">Room Number:</span>
                                                                        <p className="font-semibold text-gray-800">{hotelDetails.roomNumber}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })()
                                                    }
                                                </div>
                                            )}

                                            {/* Vehicle Details Section */}
                                            {item.category === "VEHICLES" && order.items.find(orderItem => orderItem.id === item.id)?.itemObj?.vehicleDetails && (
                                                <div className="mb-4 p-4 bg-teal-50 rounded-lg border border-teal-200">
                                                    <p className="text-sm font-semibold text-teal-800 mb-3 flex items-center gap-2">
                                                        <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                                                        Vehicle Details
                                                    </p>
                                                    {(() => {
                                                        const vehicleDetails = order.items.find(orderItem => orderItem.id === item.id)?.itemObj?.vehicleDetails;
                                                        const currency = order.items.find(orderItem => orderItem.id === item.id)?.itemObj?.currency || 'USD';
                                                        return (
                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                                                                <div>
                                                                    <span className="text-gray-600">Vehicle No:</span>
                                                                    <p className="font-semibold text-gray-800">{vehicleDetails.vehicleNumber}</p>
                                                                </div>
                                                                <div>
                                                                    <span className="text-gray-600">Passengers:</span>
                                                                    <p className="font-semibold text-gray-800">{vehicleDetails.passengerCount}</p>
                                                                </div>
                                                                <div>
                                                                    <span className="text-gray-600">Condition:</span>
                                                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                                                        vehicleDetails.condition === 'AC' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                                                    }`}>
                                                                        {vehicleDetails.condition}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <span className="text-gray-600">Driver:</span>
                                                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                                                        vehicleDetails.driverStatus === 'WITH_DRIVER' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                                                    }`}>
                                                                        {vehicleDetails.driverStatus === 'WITH_DRIVER' ? 'With Driver' : 'Self Drive'}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <span className="text-gray-600">KM/Day:</span>
                                                                    <p className="font-semibold text-gray-800">{vehicleDetails.kmPerDay} km</p>
                                                                </div>
                                                                <div>
                                                                    <span className="text-gray-600">Extra KM:</span>
                                                                    <p className="font-semibold text-gray-800">{currency} {vehicleDetails.pricePerExtraKm}/km</p>
                                                                </div>
                                                                <div>
                                                                    <span className="text-gray-600">Waiting:</span>
                                                                    <p className="font-semibold text-gray-800">{currency} {vehicleDetails.waitingChargePerNight}/night</p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })()
                                                    }
                                                </div>
                                            )}

                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                {/* Item Name (Col 1) */}
                                                <div className="md:col-span-1">
                                                    <p className="text-sm font-medium text-gray-500">Item Name</p>
                                                    <p className="text-lg font-semibold text-gray-900 flex items-center gap-1">
                                                        <FontAwesomeIcon icon={faTag} size="xs" />
                                                        {item.itemName}
                                                    </p>
                                                </div>
                                            
                                            {/* Trip Duration & Booking Details (Col 2 & 3) */}
                                            <div className="md:col-span-2">
                                                <p className="text-sm font-medium text-gray-500">Trip Duration</p>
                                                <p className="text-base font-medium text-gray-700">
                                                    {item.pickupDate || 'N/A'} to {item.returnDate || 'N/A'}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {item.rentalDays} days • ${item.pricePerDay}/day • Qty: {item.quantity}
                                                </p>
                                                <p className="text-xs text-gray-600 mt-1">
                                                    <strong>Booked on:</strong> {item.category}
                                                </p>
                                            </div>

                                            {/* Price and Status (Col 4) */}
                                            <div className="flex flex-col items-start md:items-end">
                                                {/* ✅ Prevent crash if itemPrice undefined */}
                                                <span className="text-xl font-bold text-green-700">
                                                    Rs. {Number(item.itemPrice || 0).toFixed(2)}
                                                </span>
                                                <span className={`px-3 py-1 text-xs font-semibold rounded-full mt-1 ${getDetailStatusStyles(item.status)}`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
