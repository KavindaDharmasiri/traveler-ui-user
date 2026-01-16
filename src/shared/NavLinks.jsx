import React from 'react'

export default function NavLinks() {
  return (
     <div className="hidden md:flex gap-3 text-white font-medium text-sm items-center nav">
      <a className="nav-link" href="#how-it-works">How it Works</a>
      <a className="nav-link" href="#become-a-host">Become a Host</a>
      <a className="nav-link" href="#categories">Categories</a>
      <a className="nav-link" href="#top-picks">Top Picks</a>
    </div>

  )
}
