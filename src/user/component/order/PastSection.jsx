import React, { useState, useEffect } from 'react'
import PastRentalCard from './PastRentalCard';
import OrderDetailsModal from './OrderDetailsModal';
import axios from '../../api/axios';

export default function PastSection() {
  const [pastOrders, setPastOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageMapper, setImageMapper] = useState({});

  useEffect(() => {
    fetchPastOrders();
  }, []);

  const fetchImages = async (imageUuids) => {
    const mapper = {}
    for (const uuid of imageUuids) {
      try {
        const response = await axios.get(`storage/files/download/${uuid}`, {
          responseType: 'blob'
        })
        mapper[uuid] = URL.createObjectURL(response.data)
      } catch (error) {
        console.error(`Error fetching image ${uuid}:`, error)
      }
    }
    setImageMapper(mapper)
  }

  const fetchPastOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('core/api/v1/order/past');
      const orders = response.data || [];
      const pastOrders = orders.filter(order => 
        order.status !== 'PAYED'
      );
      setPastOrders(pastOrders);
    } catch (error) {
      console.error('Error fetching past orders:', error);
      setPastOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderClick = async (order) => {
    setSelectedOrder(order);
    setShowModal(true);
    
    // Fetch images when popup opens
    const allImageUuids = order.items?.flatMap(item => item.itemObj?.images || []) || [];
    if (allImageUuids.length > 0) {
      await fetchImages(allImageUuids);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="pb-12" id="past">
      <h2 className="text-[#181811] dark:text-white tracking-tight text-2xl font-bold leading-tight px-4 pb-6 pt-6 border-t border-[#e6e6db] dark:border-[#38382f]">
        Past Rentals
      </h2>

      <div className="flex flex-col gap-4 px-4">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : pastOrders.length > 0 ? (
          pastOrders.map((order) => (
            <PastRentalCard key={order.id} order={order} onClick={() => handleOrderClick(order)} />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No past rentals found</p>
          </div>
        )}
      </div>
      
      <OrderDetailsModal 
        order={selectedOrder}
        isOpen={showModal}
        onClose={closeModal}
        imageMapper={imageMapper}
      />
    </div>
  );
}
