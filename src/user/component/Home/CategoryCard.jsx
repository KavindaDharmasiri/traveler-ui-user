import React from 'react'

export default function CategoryCard({ title, image, className = "", subtitle, gradient = "from-black/70 via-black/20 to-transparent" }) {
  return (
     <div className={`relative group overflow-hidden rounded-2xl cursor-pointer ${className}`}>
      <div
        className="absolute inset-0 bg-gray-200 transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url("${image}")`, backgroundSize: "cover", backgroundPosition: "center" }}
        aria-label={title}
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${gradient}`} />
      <div className="absolute bottom-0 left-0 p-4 md:p-8">
        {subtitle ? <p className="text-white/80 text-sm font-medium mb-1">{subtitle}</p> : null}
        <h3 className="text-white text-lg md:text-4xl font-bold">{title}</h3>
        {subtitle ? (
          <div className="h-0 group-hover:h-8 overflow-hidden transition-all duration-300">
            <p className="text-white/90 text-sm mt-2 font-medium">Tents, sleeping bags & cooking sets</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
