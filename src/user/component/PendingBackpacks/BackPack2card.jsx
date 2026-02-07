import React, { useState,useEffect } from 'react'
import { ProgressBar } from './ProgressBar'
import { StatusBadge } from './StatusBadge'
import { Timer, MoreVertical,  CreditCard, Eye, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Backpack2card({request}) {

  

    const[isFinished,setIsFinished]=useState(false);
    
  const [timeLeft, setTimeLeft] = useState("");

useEffect(() => {
  function startTimer(updateDate) {
    const start = new Date(updateDate.replace(" ", "T"));
    const hour = start.getHours();

    const hoursToAdd = hour >= 22 ? 9 : 3;
    const end = new Date(start.getTime() + hoursToAdd * 60 * 60 * 1000);

    const interval = setInterval(() => {
      const diff = Math.max(0, end - new Date());

      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      setTimeLeft(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      );

      if (diff === 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }

  return startTimer(request.updateDate);
}, [request.updateDate]);


  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group">
    <div className="relative h-40">
      {/* <img src={request.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="" /> */}
    </div>
    <div className="p-5 flex flex-col gap-4">
      <div className="flex justify-between">
        <h3 className="font-bold text-slate-900">{request.orderCode}</h3>
        <StatusBadge label={request.status} variant={request.status} />
      </div>
      
      
      <div className="flex items-center gap-2 text-[#1565C0] bg-blue-50 p-2 rounded-lg text-sm font-bold">
        {isFinished ? (
            /* Show this if the item is accepted/ready */
            <span className="text-[#217964]">Ready to Pay</span> 
        ) : (
            /* Show this if still waiting for the tenant */
            <>
            <Timer size={16} /> 
            <span>{timeLeft} remaining</span>

            </>
        )}
        </div>

        
      <ProgressBar current={request.progressCurrent} total={request.progressTotal} />

      <div className="flex flex-col gap-2 pt-2">
        {request.progressCurrent > 0 && (
          <button className="w-full bg-[#217964] text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#1a5f4e]">
            <CreditCard size={16} /> Pay for Accepted
          </button>
        )}
        <Link
        to={`/backpack/${request.id}`} 
        className="w-full border border-slate-200 text-slate-700 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
      >
        <Eye size={16} /> View Details
      </Link>
      </div>
    </div>
  </div>
  )
}
