import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faDollarSign, faBox, faClock } from "@fortawesome/free-solid-svg-icons";
import { getOrderStatusStyles } from "../../../assets/assets";

export function OrderCard({ order, onViewDetails }) {
  const id = order?.orderCode ?? order?.id;
  const totalPrice = order.items?.reduce((sum, item) => sum + (item.totalPrice || 0), 0) || 0;
  const itemCount = order.items?.length || 0;
  const firstItem = order.items?.[0];

  const handleClick = (e) => {
    e.stopPropagation();
    console.log("Clicked View Details, id =", id);
    onViewDetails(id);
  };

  return (
    <div
      className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-gray-200 hover:border-l-4 hover:border-[#217964] transition duration-300 cursor-pointer"
      onClick={() => onViewDetails(id)}
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        <div className="md:col-span-1">
          <p className="text-xs font-medium text-gray-500">Order Code</p>
          <h3 className="text-lg font-bold text-gray-900">{order.orderCode}</h3>
          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full mt-1 ${getOrderStatusStyles(order.status)}`}>
            {order.status}
          </span>
        </div>

        <div className="md:col-span-2">
          <p className="text-xs font-medium text-gray-500">Trip Duration</p>
          <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" size="sm" />
            <span className="font-semibold">{firstItem?.pickupDate} - {firstItem?.returnDate}</span>
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <FontAwesomeIcon icon={faClock} className="text-gray-400" size="sm" />
            Customer: {order.customerName}
          </p>
        </div>

        <div className="md:col-span-1 text-center md:text-left">
          <p className="text-xs font-medium text-gray-500">Total Items</p>
          <p className="text-lg font-bold text-gray-800 flex items-center justify-center md:justify-start gap-1">
            <FontAwesomeIcon icon={faBox} className="text-orange-500" size="sm" />
            {itemCount}
          </p>
          <span className="text-sm font-semibold text-[#217964] flex items-center justify-center md:justify-start gap-1">
            <FontAwesomeIcon icon={faDollarSign} size="sm" />
            Rs. {totalPrice.toFixed(2)}
          </span>
        </div>

        <div className="md:col-span-1 flex justify-start md:justify-end">
          <button
            onClick={handleClick}
            className="px-6 py-2 bg-[#217964] hover:bg-[#399e8a] text-white text-sm rounded-full transition-colors duration-200 shadow-md"
          >
            View Details
          </button>
        </div>
      </div>
      
      {/* Items Preview */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs font-medium text-gray-500 mb-2">Items in this order:</p>
        <div className="flex flex-wrap gap-2">
          {order.items?.slice(0, 3).map((item, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
              {item.itemObj?.name || `Item ${item.item}`}
            </span>
          ))}
          {itemCount > 3 && (
            <span className="px-2 py-1 bg-gray-200 text-xs rounded-full text-gray-600">
              +{itemCount - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
