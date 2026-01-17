import {  Plus } from 'lucide-react';
import BackpackCard from "../component/PendingBackpacks/BackpackCard";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from "../api/axios";
import { API_CONFIG } from "../../config/environment";

export default function PendingRequests() {

  const navigate = useNavigate();
  const [backpacks, setBackpacks] = useState({});
  const [isloading, setLoading] = useState(true);
  const [imageMapper, setImageMapper] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());

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
    return mapper;
  };

  //get the data from the backend
  useEffect(() => {
    //fetch data from backend
    const fetchBackpacks = async () => {
      try{
        const backpacksResponse=await axios.get('core/api/v1/order');
        setBackpacks(backpacksResponse.data);
        
        // Collect all image UUIDs
        const allImageUuids = [];
        Object.values(backpacksResponse.data).forEach(orders => {
          orders.forEach(order => {
            if (order.itemObj?.images) {
              allImageUuids.push(...order.itemObj.images);
            }
          });
        });
        
        // Fetch all images
        if (allImageUuids.length > 0) {
          const mapper = await fetchImages([...new Set(allImageUuids)]);
          setImageMapper(mapper);
        }
        
      }catch(error){
        console.error("Error fetching pending backpacks:", error);
        setLoading(false);
      }
    }
    fetchBackpacks();
  },[]);

  // Update timer every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const groupedOrders = Object.entries(backpacks).map(([orderCode, orders]) => {
    const acceptedCount = orders.filter(o => o.status === 'ACCEPTED').length;
    const totalCount = orders.length;
    const allAccepted = acceptedCount === totalCount;
    
    // Calculate time left based on updateDate
    const updateDate = new Date(orders[0]?.updateDate);
    const updateHour = updateDate.getHours();
    const isNightTime = updateHour >= 18 || updateHour < 6; // 6 PM to 6 AM
    const hoursLimit = isNightTime ? 3 : 1;
    const expiryTime = new Date(updateDate.getTime() + hoursLimit * 60 * 60 * 1000);
    const now = new Date();
    const remainingMs = expiryTime - now;
    
    let timeLeft = "Expired";
    if (remainingMs > 0) {
      const hours = Math.floor(remainingMs / (1000 * 60 * 60));
      const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
      timeLeft = `${hours}h ${minutes}m`;
    }
    
    return {
      id: orderCode,
      title: orderCode,
      status: allAccepted ? 'Accepted' : 'Pending',
      variant: allAccepted ? 'accepted' : 'pending',
      progressCurrent: acceptedCount,
      progressTotal: totalCount,
      image: orders[0]?.itemObj?.images?.[0],
      timeLeft,
      updateDate: orders[0]?.updateDate,
      orders
    };
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Pending Backpacks</h1>
          <p className="text-slate-500">Waiting for tenant responses</p>
        </div>
        <button onClick={() => navigate('/rentItems')} className="bg-[#217964] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <Plus size={18} /> New Backpack
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groupedOrders.map((item, i) => <BackpackCard key={i} request={item} imageMapper={imageMapper} />)}
      </div>
    </div>
  );
}