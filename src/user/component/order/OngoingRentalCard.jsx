import React from 'react'
import RentalMetaGrid from './RentalMetaGrid';

export default function OngoingRentalCard({imageUrl,
  imageAlt,
  tagText,
  brandIcon,
  brandName,
  title,
  orderInfo,
  statusType, // "picked" | "confirmed"
  metaItems,}) {

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
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#e6e6db] dark:bg-[#38382f] text-[#181811] dark:text-white">
        Confirmed
      </span>
    );

  return (
    <div className="group flex flex-col md:flex-row bg-white dark:bg-[#23220f] border border-[#e6e6db] dark:border-[#38382f] rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="w-full md:w-48 h-48 md:h-auto bg-[#f0f0f0] dark:bg-[#2C2C20] relative flex-shrink-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          data-alt={imageAlt}
          style={{ backgroundImage: `url("${imageUrl}")` }}
        />
        {tagText ? (
          <div className="absolute top-3 left-3 bg-white dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold shadow-sm">
            {tagText}
          </div>
        ) : null}
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[#8c8b5f] text-[16px]">
                {brandIcon}
              </span>
              <span className="text-xs font-bold text-[#8c8b5f] uppercase tracking-wider">
                {brandName}
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#181811] dark:text-white mb-1">
              {title}
            </h3>
            <p className="text-sm text-[#8c8b5f]">{orderInfo}</p>
          </div>

          {status}
        </div>

        <RentalMetaGrid items={metaItems} />

        <div className="flex flex-wrap justify-end gap-3 mt-2">
          {statusType === "picked" ? (
            <>
              <button className="flex-1 md:flex-none justify-center bg-[#f5f5f0] dark:bg-[#38382f] hover:bg-[#e6e6db] dark:hover:bg-[#48483f] text-[#181811] dark:text-white text-sm font-bold py-2.5 px-5 rounded-full transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  support_agent
                </span>
                Contact Support
              </button>
              <button className="flex-1 md:flex-none justify-center bg-[#181811] dark:bg-white hover:bg-[#181811]/80 dark:hover:bg-gray-200 text-white dark:text-black text-sm font-bold py-2.5 px-6 rounded-full transition-colors flex items-center gap-2 shadow-lg shadow-primary/10">
                Extend Rental
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>
            </>
          ) : (
            <button className="flex-1 md:flex-none justify-center bg-[#217964] hover:bg-[#1a5f4e] text-white text-sm font-bold py-2.5 px-6 rounded-full transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
              Track Order
              <span className="material-symbols-outlined text-[18px]">
                local_shipping
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
