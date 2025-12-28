import React from 'react'

export default function PageTitle() {
  return (
    <div className="flex flex-wrap justify-between gap-3 px-4 pb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-[#181811] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
          Your Orders
        </h1>
        <p className="text-[#8c8b5f] text-base font-normal leading-normal">
          Track your current rentals and review past history.
        </p>
      </div>
      <div className="flex items-center">
        <button className="flex items-center gap-2 bg-white dark:bg-[#2C2C20] border border-[#e6e6db] dark:border-gray-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Export History
        </button>
      </div>
    </div>
  )
}
