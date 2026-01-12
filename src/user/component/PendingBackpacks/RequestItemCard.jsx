import React from 'react';
import { Store, CreditCard, Trash2, Eye, Mail, Info } from 'lucide-react';
import { DetailStatusBadge } from './DetailStatusBadge';
import { CountdownDisplay } from './CountdownDisplay';


export const RequestItemCard = ({ item }) => {
  const isAccepted = item.state === 'accepted';
  const isDisabled = item.state === 'timeout' || item.state === 'rejected';

  return (
    <div className={`flex flex-col md:flex-row rounded-xl shadow-sm border overflow-hidden transition-all ${
      isAccepted ? 'bg-[#f0fdf4] border-green-200' : 'bg-white border-slate-200'
    } ${isDisabled ? 'opacity-75 grayscale-[0.5]' : ''}`}>
      
      {/* Thumbnail */}
      <div className="w-full md:w-48 h-40 md:h-auto overflow-hidden shrink-0">
        <img src={item.image} className="w-full h-full object-cover" alt="" />
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col justify-between gap-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-1">
            <h3 className={`text-lg font-bold ${isDisabled ? 'line-through text-slate-400' : 'text-slate-900'}`}>
              {item.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Store size={14} />
              <span>Tenant: <span className="font-bold text-slate-700">{item.tenant}</span></span>
            </div>
            <p className="text-sm font-bold text-[#217964] mt-1">${item.price} / day</p>
          </div>
          <DetailStatusBadge variant={item.state} />
        </div>

        {/* Bottom Bar: Timer or Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-4 w-full">
            {item.state === 'pending' || item.state === 'urgent' ? (
              <div className="flex items-center gap-3">
                <CountdownDisplay 
                  hours={item.h} minutes={item.m} seconds={item.s} 
                  variant={item.state === 'urgent' ? 'urgent' : 'info'} 
                />
                <span className={`text-xs font-bold ${item.state === 'urgent' ? 'text-[#C3383E]' : 'text-slate-400'}`}>
                  {item.state === 'urgent' ? 'Expiring Soon' : 'Remaining'}
                </span>
              </div>
            ) : isAccepted ? (
              <div className="flex items-center gap-2 text-[#217964] text-xs font-bold">
                <Info size={16} />
                <span>Item reserved. Complete payment to secure.</span>
              </div>
            ) : (
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
                {item.state === 'timeout' ? 'Request Timed Out' : 'Tenant Declined'}
              </span>
            )}
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            {isAccepted ? (
              <button className="flex-1 sm:flex-none px-6 py-2 bg-[#137fec] hover:bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm flex items-center gap-2">
                <CreditCard size={16} /> Pay
              </button>
            ) : isDisabled ? (
              <button className="flex-1 sm:flex-none px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-sm font-bold flex items-center gap-2">
                <Trash2 size={16} /> Remove
              </button>
            ) : (
              <button className="flex-1 sm:flex-none px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold">
                Details
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};