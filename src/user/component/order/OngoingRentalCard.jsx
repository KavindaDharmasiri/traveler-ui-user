import React from 'react'
import RentalMetaGrid from './RentalMetaGrid';

export default function OngoingRentalCard({ order, onClick }) {
  if (!order) return null;

  const handleCardClick = () => {
    if (onClick) onClick();
  };

  // Transform order data to component props
  const imageUrl = order.items?.[0]?.itemObj?.images?.[0] ? 
    `https://via.placeholder.com/300x200?text=${order.items[0].itemObj.name}` : 
    "https://via.placeholder.com/300x200?text=Order";
  const imageAlt = order.items?.[0]?.itemObj?.name || "Order item";
  const title = order.orderCode;
  const orderInfo = `Customer: ${order.customerName} • Status: ${order.status}`;
  const statusType = order.status === 'PAYED' ? 'picked' : 'confirmed';
  
  // Create meta items from order data
  const metaItems = [
    { label: "Order Code", icon: "receipt", iconColor: "text-primary", value: order.orderCode },
    { label: "Customer", icon: "person", iconColor: "text-primary", value: order.customerName },
    { label: "Status", icon: "info", iconColor: "text-primary", value: order.status },
    { label: "Items", icon: "inventory", iconColor: "text-primary", value: `${order.items?.length || 0} items` },
  ];

     const status =
    statusType === "picked" ? (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#217964] text-white border border-[#217964]/50 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        Picked Up
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#e6e6db]  text-[#181811] ">
        Confirmed
      </span>
    );

  return (
    <div 
      onClick={handleCardClick}
      className="group flex flex-col md:flex-row bg-white  border border-[#e6e6db]  rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
    >
      <div className="w-full md:w-48 h-48 md:h-auto bg-[#f0f0f0]  relative flex-shrink-0">
        {imageUrl.includes('placeholder') ? (
          <div className="absolute inset-0 bg-gradient-to-br from-[#217964] to-[#1a5f4e] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-white/70 text-[24px]">
                  luggage
                </span>
                <span className="material-symbols-outlined text-white text-[36px]">
                  flight
                </span>
                <span className="material-symbols-outlined text-white/70 text-[24px]">
                  map
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white/60 text-[18px]">
                  hotel
                </span>
                <span className="material-symbols-outlined text-white/60 text-[18px]">
                  directions_car
                </span>
              </div>
              <span className="text-white/70 text-sm font-medium">Travel Order</span>
            </div>
          </div>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            data-alt={imageAlt}
            style={{ backgroundImage: `url("${imageUrl}")` }}
          />
        )}
        {order.status === 'PAYED' && (
          <div className="absolute top-3 left-3 bg-emerald-500 text-white backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold shadow-sm">
            PAID
          </div>
        )}
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[#8c8b5f] text-[16px]">
                business
              </span>
              <span className="text-xs font-bold text-[#8c8b5f] uppercase tracking-wider">
                Traveler
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#181811]  mb-1">
              {title}
            </h3>
            <p className="text-sm text-[#8c8b5f]">{orderInfo}</p>
          </div>

          {status}
        </div>

        <RentalMetaGrid items={metaItems} />
      </div>
    </div>
  )
}
