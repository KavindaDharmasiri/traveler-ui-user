import React from 'react'

export default function PastRentalCard({ imageUrl, imageAlt, title, storeLine, price, status }) {
   const statusBadge =
    status === "completed" ? (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
        <span className="material-symbols-outlined text-[14px]">check_circle</span>
        Completed
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
        <span className="material-symbols-outlined text-[14px]">cancel</span>
        Cancelled
      </span>
    );

  const titleClass =
    status === "cancelled"
      ? "text-lg font-bold text-[#181811] dark:text-white opacity-60 line-through decoration-red-500/50"
      : "text-lg font-bold text-[#181811] dark:text-white opacity-80";

  const priceClass =
    status === "cancelled"
      ? "text-sm font-bold text-[#8c8b5f] line-through"
      : "text-sm font-bold text-[#181811] dark:text-white";

  return (
    <div className="group flex flex-col md:flex-row bg-white/50 dark:bg-[#23220f]/50 border border-[#e6e6db] dark:border-[#38382f] rounded-xl overflow-hidden hover:bg-white dark:hover:bg-[#23220f] transition-colors">
      <div className="w-full md:w-40 h-32 md:h-auto bg-[#f0f0f0] dark:bg-[#2C2C20] relative flex-shrink-0 grayscale group-hover:grayscale-0 transition-all">
        <div
          className="absolute inset-0 bg-cover bg-center"
          data-alt={imageAlt}
          style={{ backgroundImage: `url("${imageUrl}")` }}
        />
      </div>

      <div className="flex-1 p-5 flex flex-col justify-center">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h3 className={titleClass}>{title}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-[#8c8b5f]">
              <span className="material-symbols-outlined text-[16px]">store</span>
              {storeLine}
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <span className={priceClass}>{price}</span>
            {statusBadge}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {status === "completed" ? (
            <>
              <button className="text-[#8c8b5f] hover:text-primary text-sm font-medium flex items-center gap-1 transition-colors">
                <span className="material-symbols-outlined text-[18px]">receipt</span>
                View Receipt
              </button>
              <button className="text-[#8c8b5f] hover:text-primary text-sm font-medium flex items-center gap-1 transition-colors">
                <span className="material-symbols-outlined text-[18px]">refresh</span>
                Rent Again
              </button>
            </>
          ) : (
            <button className="text-[#8c8b5f] hover:text-primary text-sm font-medium flex items-center gap-1 transition-colors">
              <span className="material-symbols-outlined text-[18px]">help</span>
              Help
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
