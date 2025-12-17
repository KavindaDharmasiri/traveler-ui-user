import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faDollarSign, faBox, faClock } from "@fortawesome/free-solid-svg-icons";
import { getOrderStatusStyles } from "../../../assets/assets";

export function OrderCard({ order, onViewDetails }) {
  const id = order?.orderId ?? order?.id;

  const handleClick = (e) => {
    e.stopPropagation();
    console.log("Clicked View Details, id =", id);
    onViewDetails(id);
  };

  return (
    <div
      className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-gray-200 hover:border-l-4 hover:border-[#217964] transition duration-300 grid grid-cols-1 md:grid-cols-5 gap-4 items-center cursor-pointer"
      onClick={() => onViewDetails(id)}
    >
      <div className="md:col-span-1">
        <p className="text-xs font-medium text-gray-500">Order ID</p>
        <h3 className="text-lg font-bold text-gray-900">{id}</h3>
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full mt-1 ${getOrderStatusStyles(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div className="md:col-span-2">
        <p className="text-xs font-medium text-gray-500">Trip Duration</p>
        <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
          <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" size="sm" />
          <span className="font-semibold">{order.startDate}</span> to{" "}
          <span className="font-semibold">{order.endDate}</span>
        </p>
        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
          <FontAwesomeIcon icon={faClock} className="text-gray-400" size="sm" />
          Booked on: {order.orderDate}
        </p>
      </div>

      <div className="md:col-span-1 text-center md:text-left">
        <p className="text-xs font-medium text-gray-500">Total Items</p>
        <p className="text-lg font-bold text-gray-800 flex items-center justify-center md:justify-start gap-1">
          <FontAwesomeIcon icon={faBox} className="text-orange-500" size="sm" />
          {order.item ?? order.totalItems ?? 0}
        </p>
        <span className="text-sm font-semibold text-[#217964] flex items-center justify-center md:justify-start gap-1">
          <FontAwesomeIcon icon={faDollarSign} size="sm" />
          {(order.totalPrice ?? order.totalTripPrice ?? 0).toFixed(2)}
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
  );
}
