import React from 'react'

export default function OngoingBadge({ count = 0 }) {
  return (
     <span className="bg-[#217964]/20 text-[#217964] dark:text-[#217964] text-xs px-2 py-1 rounded-full font-bold">
      {count} Active
    </span>
  )
}
