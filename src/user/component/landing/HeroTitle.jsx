import React from 'react'

export default function HeroTitle() {
  return (
     <div className="glass-word relative inline-block select-none">
      <h1 className="glass-base text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight">
        Find your next
        <br />
        adventure
      </h1>

      <h1
        aria-hidden="true"
        className="glass-blur text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight"
      >
        Find your next
        <br />
        adventure
      </h1>

      <h1
        aria-hidden="true"
        className="glass-highlight text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight"
      >
        Find your next
        <br />
        adventure
      </h1>
    </div>
  )
}
