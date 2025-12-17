import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faClipboardList, faStore, faMapMarkerAlt, faDollarSign, faArrowLeft, faPhone, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { getDetailStatusStyles, groupBookingsByVendor } from '../../../assets/assets';

export function ViewOrderDetails({ order, onBack }) { 

    // ✅ Prevent crash if order/items is undefined
    const groupedItems = groupBookingsByVendor(order?.items || []);
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
                        Order Details: {order?.orderId}
                    </h1>

                    {/* ✅ Prevent crash if totalTripPrice is undefined */}
                    <p className="text-2xl font-extrabold text-[#217964]">
                        Total: ${Number(order?.totalPrice || 0).toFixed(2)}
                    </p>
                </header>

                <h2 className="text-xl font-semibold mb-4 text-gray-700">Items Grouped by Vendor</h2>

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
                                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded shadow-sm border-l-4 border-gray-300">
                                            
                                            {/* Item Name (Col 1) */}
                                            <div className="md:col-span-1">
                                                <p className="text-sm font-medium text-gray-500">Item Name</p>
                                                <p className="text-lg font-semibold text-gray-900 flex items-center gap-1">
                                                    <FontAwesomeIcon icon={faTag} size="xs" />
                                                    {item.itemName}
                                                </p>
                                            </div>
                                            
                                            {/* Dates & Pickup Location (Col 2 & 3) */}
                                            <div className="md:col-span-2">
                                                <p className="text-sm font-medium text-gray-500">Rental Period & Pickup</p>
                                                <p className="text-base font-medium text-gray-700">
                                                    **{item.pickupDate}** to **{item.returnDate}**
                                                </p>
                                                <p className="text-sm text-gray-500 flex items-center mt-1">
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-400 mr-1" size="xs" />
                                                    {item.pickupLocation}
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
