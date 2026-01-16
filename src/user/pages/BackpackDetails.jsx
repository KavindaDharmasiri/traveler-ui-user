import React, { useState, useEffect } from 'react';
import { Mail, ChevronRight } from 'lucide-react';
import { RequestItemCard } from '../component/PendingBackpacks/RequestItemCard';
import { useParams } from 'react-router-dom';
import axios from "../api/axios";
import { API_CONFIG } from "../../config/environment";

export default function BackpackDetails() {
  const { id } = useParams();
  const [backpackData, setBackpackData] = useState(null);
  const [items, setItems] = useState([]);
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

  useEffect(() => {
    const fetchBackpackDetails = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}core/api/v1/order`);
        const allOrders = response.data;
        
        // Find orders matching the orderCode
        const matchingOrders = Object.values(allOrders)
          .flat()
          .filter(order => order.orderCode === id);

        if (matchingOrders.length > 0) {
          setBackpackData(matchingOrders[0]);
          
          // Collect all image UUIDs
          const allImageUuids = [];
          matchingOrders.forEach(order => {
            if (order.itemObj?.images) {
              allImageUuids.push(...order.itemObj.images);
            }
          });
          
          // Fetch all images
          if (allImageUuids.length > 0) {
            const mapper = await fetchImages([...new Set(allImageUuids)]);
            setImageMapper(mapper);
          }
          
          // Transform orders to items format
          const transformedItems = matchingOrders.map(order => {
            const updateDate = new Date(order.updateDate);
            const updateHour = updateDate.getHours();
            const isNightTime = updateHour >= 18 || updateHour < 6;
            const hoursLimit = isNightTime ? 3 : 1;
            const expiryTime = new Date(updateDate.getTime() + hoursLimit * 60 * 60 * 1000);
            const remainingMs = expiryTime - currentTime;
            
            let h = 0, m = 0, s = 0;
            if (remainingMs > 0) {
              h = Math.floor(remainingMs / (1000 * 60 * 60));
              m = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
              s = Math.floor((remainingMs % (1000 * 60)) / 1000);
            }
            
            return {
              id: order.id,
              name: order.itemObj.name,
              tenant: order.groupName,
              price: order.itemObj.pricePerDay,
              state: order.status.toLowerCase(),
              image: order.itemObj.images?.[0],
              h, m, s
            };
          });
          setItems(transformedItems);
        }
      } catch (error) {
        console.error("Error fetching backpack details:", error);
      }
    };
    fetchBackpackDetails();
  }, [id, currentTime]);

  // Update timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
        <span>Home</span> <ChevronRight size={12} />
        <span>Requests</span> <ChevronRight size={12} />
        <span className="text-slate-900 font-bold">Backpack #{id}</span>
      </nav>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{id}</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Request ID: #{id} • {items.length} Items • {backpackData?.pickupDate} - {backpackData?.returnDate}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {items.map(item => <RequestItemCard key={item.id} item={item} imageMapper={imageMapper} />)}
      </div>
    </div>
  );
}