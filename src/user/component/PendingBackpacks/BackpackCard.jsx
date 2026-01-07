import React from 'react'
import { ProgressBar } from './ProgressBar'
import { StatusBadge } from './StatusBadge'
import { Timer, MoreVertical,  CreditCard, Eye, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BackpackCard({request}) {

    const isFinished = request.timeLeft === "Ready";
    

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group">
    <div className="relative h-40">
      <img src={request.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="" />
    </div>
    <div className="p-5 flex flex-col gap-4">
      <div className="flex justify-between">
        <h3 className="font-bold text-slate-900">{request.title}</h3>
        <StatusBadge label={request.status} variant={request.variant} />
      </div>
      
      
      <div className="flex items-center gap-2 text-[#1565C0] bg-blue-50 p-2 rounded-lg text-sm font-bold">
        {isFinished ? (
            /* Show this if the item is accepted/ready */
            <span className="text-[#217964]">Ready to Pay</span> 
        ) : (
            /* Show this if still waiting for the tenant */
            <>
            <Timer size={16} /> 
            <span>{request.timeLeft} remaining</span>
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
