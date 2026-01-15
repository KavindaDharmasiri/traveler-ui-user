import React from 'react'

export default function RentalMetaGrid({ items = [] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 py-4 border-t border-dashed border-[#e6e6db] ">
      {items.map((it) => (
        <div key={it.label}>
          <p className="text-[11px] uppercase tracking-wide text-[#8c8b5f] font-bold mb-1">
            {it.label}
          </p>
          <div className="flex items-center gap-1.5 text-[#181811] font-medium">
            <span className={`material-symbols-outlined text-[16px] ${it.iconColor}`}>
              {it.icon}
            </span>
            {it.value}
          </div>
        </div>
      ))}
    </div>
  )
}
