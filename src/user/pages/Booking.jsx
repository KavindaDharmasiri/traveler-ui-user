import React, { useState, useMemo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";

import { OrderCard } from "../component/MyBookings/OrderCard";
import { ViewOrderDetails } from "../component/MyBookings/ViewOrderDetails";

import axios from "../api/axios";
import { API_CONFIG } from "../../config/environment";

export default function Booking() {
  const [bookingData, setBookingData] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  const [filterStatus, setFilterStatus] = useState(null);

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // 1) Load all bookings
  useEffect(() => {
    const fetchBookingData = async () => {
      setLoadingList(true);
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(`${API_CONFIG.BASE_URL}core/api/v1/order`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        // Flatten list response
        let orderdata = [];
        const responseData = response.data || {};

        Object.values(responseData).forEach((tenantGroups) => {
          if (tenantGroups && typeof tenantGroups === "object") {
            Object.values(tenantGroups).forEach((groupOrders) => {
              if (Array.isArray(groupOrders)) {
                orderdata = orderdata.concat(groupOrders);
              }
            });
          }
        });

        setBookingData(orderdata);
      } catch (error) {
        console.error("Error fetching booking data:", error);
        setBookingData([]);
      } finally {
        setLoadingList(false);
      }
    };

    fetchBookingData();
  }, []);

  // 2) Filter list locally
  const filteredOrders = useMemo(() => {
    if (!filterStatus) return bookingData;
    return bookingData.filter(
      (order) => (order.status || "").toLowerCase() === filterStatus.toLowerCase()
    );
  }, [filterStatus, bookingData]);

  const statuses = ["Pending", "Completed", "Cancelled"];

  // 3) Fetch details when user selects an orderId
  useEffect(() => {
    const fetchDetails = async () => {
      if (selectedOrderId === null || selectedOrderId === undefined) return;

      setLoadingDetails(true);
      setSelectedOrderDetails(null);

      try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.get(
          `${API_CONFIG.BASE_URL}core/api/v1/order/${selectedOrderId}`,
          { headers: token ? { Authorization: `Bearer ${token}` } : undefined }
        );

        
        setSelectedOrderDetails(res.data);
        console.log("Selected Order Details:", res.data);
      } catch (err) {
        console.error("Error fetching selected order details:", err);
        setSelectedOrderDetails(null);
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchDetails();
  }, [selectedOrderId]);

  // 4) Render details view
  if (selectedOrderId !== null) {
    if (loadingDetails) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow">Loading order details...</div>
        </div>
      );
    }

    if (selectedOrderDetails) {
      return (
        <ViewOrderDetails
          order={selectedOrderDetails}
          onBack={() => {
            setSelectedOrderId(null);
            setSelectedOrderDetails(null);
          }}
        />
      );
    }
  }

  // 5) Render list view
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <header className="max-w-4xl mx-auto mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
          <FontAwesomeIcon icon={faClipboardList} className="text-[#217964]" />
          My Rental Trips (Orders)
        </h1>
        <p className="mt-2 text-lg text-gray-500">A consolidated view of all your rental trips.</p>
      </header>

      <div className="max-w-4xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center gap-3">
        <div className="flex items-center text-gray-600 font-semibold text-lg">
          <FontAwesomeIcon icon={faFilter} className="mr-2 text-blue-500" />
          Filter by Status:
        </div>

        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 
                ${
                  filterStatus === status
                    ? "bg-[#217964] text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {status}
            </button>
          ))}

          {filterStatus && (
            <button
              onClick={() => setFilterStatus(null)}
              className="px-3 py-2 text-sm font-medium rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center"
            >
              <FontAwesomeIcon icon={faTimes} className="mr-1" size="sm" />
              Clear Filter
            </button>
          )}
        </div>
      </div>

      <main className="max-w-4xl mx-auto space-y-6">
        {loadingList ? (
          <div className="text-center p-12 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700">Loading your orders...</h2>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700">
              No {filterStatus} Orders Found
            </h2>
            <p className="mt-2 text-gray-500">Try clearing the filter to see all trips.</p>
          </div>
        ) : (
          filteredOrders.map((order, idx) => (
            <OrderCard
              key={order.orderId || order.id || `order-${idx}`}
              order={order}
              onViewDetails={(id) => setSelectedOrderId(id)}
            />
          ))
        )}
      </main>
    </div>
  );
}
