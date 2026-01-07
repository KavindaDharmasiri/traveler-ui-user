import {  Plus } from 'lucide-react';
import BackpackCard from "../component/PendingBackpacks/BackpackCard";
import { useState, useEffect } from 'react';

import axios from "../api/axios";
import { API_CONFIG } from "../../config/environment";

export default function PendingRequests() {

  const [backpacks, setBackpacks] = useState({});
  const [isloading, setLoading] = useState(true);
  //get the data from the backend
  useEffect(() => {
    //fetch data from backend
    const fetchBackpacks = async () => {
      try{
        const backpacksResponse=await axios.get(`${API_CONFIG.BASE_URL}core/api/v1/order`);
        setBackpacks(backpacksResponse.data);
        console.log("Fetched backpacks:", backpacksResponse.data);
        
      }catch(error){
        console.error("Error fetching pending backpacks:", error);
        setLoading(false);
      }
    }
    fetchBackpacks();
  },[]);

  const bags=Object.values(backpacks)
            .flatMap(tenantGroup =>Object.values(tenantGroup))
            .flat();

            console.log("Processed bags:", bags);  
            
            const mockData = [
    { title: "Hiking Adventure Set", timeLeft: "2h 15m", status: "Pending", variant: "pending", progressCurrent: 1, progressTotal: 3, image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=400" },
    { title: "Beach Chill Pack", timeLeft: "Ready", status: "Accepted", variant: "accepted", progressCurrent: 2, progressTotal: 2, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400" }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Pending Backpacks</h1>
          <p className="text-slate-500">Waiting for tenant responses</p>
        </div>
        <button className="bg-[#217964] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <Plus size={18} /> New Backpack
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData.map((item, i) => <BackpackCard key={i} request={item} />)}
      </div>
    </div>
  );
}