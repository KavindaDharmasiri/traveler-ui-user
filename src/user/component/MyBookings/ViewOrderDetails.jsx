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
        if (order?.itemObj?.images && order.itemObj.images.length > 0) {
            fetchImages(order.itemObj.images);
        }
    }, [order]);

    // Convert single itemObj to items array format for grouping
    const items = order?.itemObj ? [{
        id: order.itemObj.id,
        itemName: order.itemObj.name,
        vendorName: order.groupName || 'Unknown Vendor',
        itemPrice: order.totalPrice,
        status: order.status,
        vendorContact: order.itemObj.contact,
        category: order.itemObj.category,
        description: order.itemObj.description,
        pricePerDay: order.itemObj.pricePerDay,
        rentalDays: order.rentalDays,
        images: order.itemObj.images,
        pickupDate: order.pickupDate,
        returnDate: order.returnDate
    }] : [];
    
    const groupedItems = groupBookingsByVendor(items);
    const vendorNames = Object.keys(groupedItems);

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
                        Total: ${Number(order?.totalPrice || 0).toFixed(2)}
                    </p>
                </header>

                <h2 className="text-xl font-semibold mb-4 text-gray-700">Items Grouped by Vendor</h2>

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
                                        {/* Contact Number */}
                                        {vendorDetails.vendorContact && (
                                            <a 
                                                href={`tel:${String(vendorDetails.vendorContact).replace(/\D/g,'')}`} 
                                                className="text-gray-700 hover:text-gray-900 font-semibold flex items-center"
                                            >
                                                <FontAwesomeIcon icon={faPhone} className="text-[#217964] mr-1" size="sm" />
                                                {vendorDetails.vendorContact}
                                            </a>
                                        )}
                                        {/* Map Link */}
                                        {vendorDetails.mapUrl && (
                                            <a 
                                                href={vendorDetails.mapUrl} 
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
                                    {groupedItems[vendorName].map((item) => (
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
                                                    {item.rentalDays} days • ${item.pricePerDay}/day
                                                </p>
                                                <p className="text-xs text-gray-600 mt-1">
                                                    <strong>Booked on:</strong> {item.category}
                                                </p>
                                            </div>

                                            {/* Price and Status (Col 4) */}
                                            <div className="flex flex-col items-start md:items-end">
                                                {/* ✅ Prevent crash if itemPrice undefined */}
                                                <span className="text-xl font-bold text-green-700">
                                                    ${Number(item.itemPrice || 0).toFixed(2)}
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
