import React, { useState, useMemo,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faFilter, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// Import OrderCard and ViewOrderDetails (or define them below MyOrders)
import { OrderCard } from '../component/MyBookings/OrderCard'; // Assuming separate files
import { ViewOrderDetails } from '../component/MyBookings/ViewOrderDetails'; // Assuming separate files
import { mockOrdersList,findOrderDetails } from '../../assets/assets';
import axios from '../api/axios';
import { API_CONFIG } from '../../config/environment';

export default function Booking() {
    const [selectedOrderId, setSelectedOrderId] = useState(null);
     const[bookingData, setBookingData]= useState([]);
    const [loading, setLoading] = useState(true);
    // State to hold the active filter status (e.g., 'Upcoming', 'Completed', or null for all)
    const [filterStatus, setFilterStatus] = useState(null); 
    useEffect(() => {
        const fetchBookingData = async () => {
            setLoading(true);
            try{
                const token= localStorage.getItem('accessToken');
                const response = await axios.get(`${API_CONFIG.BASE_URL}core/api/v1/order`, {
               
            })
                
                let orderdata = [];
                
                // API returns: { [tenantId]: { [groupName]: [...orders] } }
                // We need to flatten all orders from all groups
                const responseData = response.data || {};
                
                // Iterate through each tenant
                Object.values(responseData).forEach(tenantGroups => {
                    if (tenantGroups && typeof tenantGroups === 'object') {
                        // Iterate through each group in that tenant
                        Object.values(tenantGroups).forEach(groupOrders => {
                            if (Array.isArray(groupOrders)) {
                                orderdata = orderdata.concat(groupOrders);
                            }
                        });
                    }
                });
                
                console.log("Flattened Orders:", response.data);
                
                setBookingData(orderdata);

            }catch (error){
                console.error("Error fetching booking data:", error);
                setBookingData([]);
            } finally {
                setLoading(false);
            }
        }
        fetchBookingData();
    }, [filterStatus]);
    
    // --- FILTER LOGIC ---
    const filteredOrders = useMemo(() => {
        if (!filterStatus) {
            return bookingData; // Show all if no filter is set
        }
        return bookingData.filter(order => order.status.toLowerCase() === filterStatus.toLowerCase());
    }, [filterStatus, bookingData]); // Recalculate only when filterStatus or bookingData changes

    // List of available statuses for the filter buttons
    const statuses = ['Pending', 'Completed', 'Cancelled'];
    const selectedOrderDetails = findOrderDetails(selectedOrderId);

    if (selectedOrderId && selectedOrderDetails) {
        return <ViewOrderDetails order={selectedOrderDetails} onBack={() => setSelectedOrderId(null)} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <header className="max-w-4xl mx-auto mb-6">
                <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
                    <FontAwesomeIcon icon={faClipboardList} className="text-[#217964]" />
                    My Rental Trips (Orders)
                </h1>
                <p className="mt-2 text-lg text-gray-500">
                    A consolidated view of all your rental trips.
                </p>
            </header>

            {/* --- FILTER BAR --- */}
            <div className="max-w-4xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center gap-3">
                <div className="flex items-center text-gray-600 font-semibold text-lg">
                    <FontAwesomeIcon icon={faFilter} className="mr-2 text-blue-500" />
                    Filter by Status:
                </div>
                
                <div className="flex flex-wrap gap-2">
                    {statuses.map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 
                                ${filterStatus === status 
                                    ? 'bg-[#217964] text-white shadow-lg' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                            }
                        >
                            {status}
                        </button>
                    ))}
                    
                    {filterStatus && (
                        <button
                            onClick={() => setFilterStatus(null)}
                            className="px-3 py-2 text-sm font-medium rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center"
                        >
                            <FontAwesomeIcon icon={faTimes} className="mr-1" size='sm' />Clear Filter
                        </button>
                    )}
                </div>
            </div>
            {/* -------------------- */}


            <main className="max-w-4xl mx-auto space-y-6">
                {loading ? (
                    <div className="text-center p-12 bg-white rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold text-gray-700">Loading your orders...</h2>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="text-center p-12 bg-white rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold text-gray-700">No {filterStatus} Orders Found</h2>
                        <p className="mt-2 text-gray-500">Try clearing the filter to see all trips.</p>
                        <p className="mt-2 text-gray-400 text-sm">Total orders loaded: {bookingData.length}</p>
                    </div>
                ) : (
                    filteredOrders.map((order, idx) => (
                        <OrderCard 
                            key={order.id || order.orderId || `order-${idx}`} 
                            order={order} 
                            onViewDetails={setSelectedOrderId} 
                        />
                    ))
                )}
            </main>
        </div>
    );
}