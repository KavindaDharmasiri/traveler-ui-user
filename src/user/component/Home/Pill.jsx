import React from 'react'

export default function Pill({ children }) {
  return (
     <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold uppercase tracking-wider">
      {children}
    </span>
  )
}
