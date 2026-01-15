import React from 'react'

export default function Breadcrumbs() {
  return (
      <div className="flex flex-wrap gap-2 px-4 pb-4">
      <a className="text-[#8c8b5f] hover:text-primary text-sm font-medium leading-normal transition-colors" href="/home">
        Home
      </a>
      <span className="text-[#8c8b5f] text-sm font-medium leading-normal">/</span>
      <span className="text-[#181811]  text-sm font-medium leading-normal">Orders</span>
    </div>
  )
}
