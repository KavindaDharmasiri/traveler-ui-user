import React, { useState, useEffect } from 'react'
import OngoingBadge from './OngoingBadge';
import OngoingRentalCard from './OngoingRentalCard';
import OrderDetailsModal from './OrderDetailsModal';
import axios from '../../api/axios';

export default function OngoingSection() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageMapper, setImageMapper] = useState({});

  useEffect(() => {
    fetchOngoingOrders();
  }, []);

  const fetchImages = async (imageUuids) => {
    console.log('fetchImages called with UUIDs:', imageUuids);
    const mapper = {}
    for (const uuid of imageUuids) {
      try {
        console.log('Fetching image for UUID:', uuid);
        const response = await axios.get(`storage/files/download/${uuid}`, {
          responseType: 'blob'
        })
        console.log('Image fetched successfully for UUID:', uuid);
        mapper[uuid] = URL.createObjectURL(response.data)
      } catch (error) {
        console.error(`Error fetching image ${uuid}:`, error)
      }
    }
    console.log('Final imageMapper:', mapper);
    setImageMapper(mapper)
  }

  const fetchOngoingOrders = async () => {
    setLoading(true);
    try {
      // Fetch cart data
      const cartResponse = await axios.get('core/api/v1/cart');
      const cartData = cartResponse.data || [];
      
      // Fetch past orders
      const response = await axios.get('core/api/v1/order/past');
      const orders = response.data || [];
      const ongoingOrders = orders.filter(order => 
        order.status === 'PAYED'
      );
      
      // Combine cart and ongoing orders
      const allOngoing = [...cartData, ...ongoingOrders];
      setRentals(allOngoing);
    } catch (error) {
      console.error('Error fetching ongoing orders:', error);
      setRentals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderClick = async (order) => {
    // Transform cart data if needed
    const transformedOrder = order.cartItems ? {
      id: order.id,
      orderCode: order.orderCode,
      customerName: 'You',
      status: 'CART',
      items: order.cartItems.map(ci => ({
        id: ci.id,
        itemObj: ci.itemObj,
        totalPrice: ci.totalPrice,
        rentalDays: ci.rentalDays,
        pickupDate: ci.pickupDate,
        returnDate: ci.returnDate,
        providerName: ci.providerName
      }))
    } : order;
    
    setSelectedOrder(transformedOrder);
    setShowModal(true);
    
    // Fetch images when popup opens
    const allImageUuids = transformedOrder.items?.flatMap(item => item.itemObj?.images || []) || [];
    if (allImageUuids.length > 0) {
      await fetchImages(allImageUuids);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="mb-12" id="ongoing">
      <h2 className="text-[#181811]  tracking-tight text-2xl font-bold leading-tight px-4 pb-6 pt-2 flex items-center gap-2 ">
        Ongoing Rentals <OngoingBadge count={rentals.length} />
      </h2>

      <div className="flex flex-col gap-4 px-4">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : rentals.length > 0 ? (
          rentals.map((order) => (
            <OngoingRentalCard key={order.id} order={order} onClick={() => handleOrderClick(order)} />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No ongoing rentals found</p>
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
