import React from 'react'

export default function Summary() {
  return (
    <div className="sticky top-28 flex flex-col gap-6 rounded-xl bg-white dark:bg-white/5 p-6 shadow-lg border border-slate-200 dark:border-white/10">
        <h3 className="text-xl font-bold text-text-main dark:text-white">Rental Summary</h3>
        <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm">
                <span className="text-[#64748b] dark:text-gray-400">Subtotal (3 items)</span>
                <span className="font-medium">$145.00</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-[#64748b] dark:text-gray-400">Service Fee</span>
                <span className="font-medium">$12.50</span>
            </div>
            <div className="flex justify-between text-sm text-[#7E57C2]">
                <span>Bundle Savings</span>
                <span>-$15.00</span>
            </div>
        </div>
        <div className="h-px bg-gray-100 dark:bg-white/10 w-full"></div>
        <div className="flex justify-between items-end">
            <span className="text-[#64748b] dark:text-gray-400 text-sm font-medium">Total Estimate</span>
            <div className="flex flex-col items-end">
                <span className="text-3xl font-black text-[#0F172] dark:text-white">$142.50</span>
                <span className="text-xs text-[#64748b] dark:text-gray-500">Includes taxes</span>
            </div>
        </div>
        <button className="flex w-full cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-[#217964] text-white text-lg font-bold shadow-md hover:shadow-lg hover:bg-[#217964]/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-2">
                        Request All Items
        </button>
        <div className="flex items-center justify-center gap-2 text-xs text-[#64748b] dark:text-gray-500">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span>Secure request. No payment yet.</span>
        </div>
    </div>
  )
}
