import React from 'react'
import Icon from './Icon'

export default function TrendingCard({ item }) {
  return (
     <div className="min-w-[280px] md:min-w-[320px] snap-center flex flex-col gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
      <div className="w-full aspect-square rounded-xl overflow-hidden relative">
        {item.badge ? (
          <div className={`absolute top-3 left-3 backdrop-blur rounded-md px-2 py-1 text-xs font-bold shadow-sm z-10 ${item.badgeClass}`}>
            {item.badge}
          </div>
        ) : null}

        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url("${item.img}")` }}
          aria-label={item.title}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h3 className="text-[#121716] text-lg font-bold leading-tight group-hover:text-[#217864] transition-colors">
            {item.title}
          </h3>
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <Icon name="star" className="text-sm fill-current" />
            <span className="text-gray-600 font-medium">{item.rating}</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2">{item.desc}</p>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-[#217864] text-xl font-bold">
            {item.price}
            <span className="text-gray-400 text-sm font-normal">{item.per}</span>
          </p>
          <button className="size-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#217864] hover:text-white transition-colors" aria-label={`Add ${item.title}`}>
            <Icon name="add" className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  )
}
