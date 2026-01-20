import React from 'react'
import TrendingCard from './TrendingCard';
import Icon from './Icon';

export default function TrendingRentals() {
  const items = [
    {
      badge: "BEST SELLER",
      badgeClass: "bg-white/90 text-[#217864]",
      title: "Sony A7III Kit",
      rating: "4.9",
      desc: "Full-frame mirrorless camera with 28-70mm lens. Perfect for landscapes.",
      price: "$45",
      per: "/day",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuSd7YFRXBw81yI9MSd27hVvbCxVdccC1fDmrTYh-ry5EaYhx169UoD3io2LPrhBd-4AsLgk6f64uwGPkGCnnvORMOoLSR_jOPI0iQSs6ye9n-7bmPOtrEY3vzZ9FoyWslsqVrnOAIEuqR8kU4fnDmPCxhjpLlJx4yxXFdrpMB6Wq3g41jauxx4SW1QANcDKjaYWR8vRChXDlS0KLniYunS0AXPMCiIzizuKkanIpCm6NsJ9vUN85SM_fjsw7A6fhl5FqiZZ5xzd-8",
    },
    {
      title: "Osprey Atmos 65",
      rating: "4.8",
      desc: "Anti-gravity suspension system for maximum comfort on long trails.",
      price: "$12",
      per: "/day",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5-WJQKRum5jg5AMeA8cyRuT5S7Et7TdfqDMS15JImbdF2fbgU1pwLzY50RamUeFX1lmSL0n2rO6mPodnYJJiZJpZZCp1FcY4bi0pHW0R3enlpnuFBpOdp8VlNZcecZbdGKcWwuIA_Y9Wl87WbmHFrYgTSCLOty2rd9B_di8vKxI9f0GnPRdVH94LqhRlDv2QGsk-PTNDTvnNTvGSWGOzA3HXD0YCURaxI0hr-bmTbvsf66lC1TlFCWhjChTgpKA8ArGankzThSCVJ",
    },
    {
      badge: "NEW ARRIVAL",
      badgeClass: "bg-[#217864] text-white",
      title: "GoPro Hero 10",
      rating: "5.0",
      desc: "Waterproof action camera with HyperSmooth 4.0 stabilization.",
      price: "$15",
      per: "/day",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdQwe4Kd2N2_rJI2Y1E--UhKrtJrVVhWKrZU8Drjlb-ZKZx8ZESdWCT_KwhEATMFkpXH5Ddlt-mWULoKB18m6K50lbUAnLky8_QDE31w4nMrkQ_F9agzu5TIlvnrT11PSmC8_Pfi0G0xh5cFGvPs36pdCnzNy6alAQPjt_xtuealhIYwyVsHRDqLLue5CrR2x41iiyOx4EGmqjxS7IPUgqNKgUAsXPejcvP8ythmAxLRdjzvOjHjHfa_JEXpDQ6m-f3WjDEJCtRzte",
    },
    {
      title: "DJI Mini 3 Pro",
      rating: "4.7",
      desc: "Lightweight drone with 4K HDR video and obstacle sensing.",
      price: "$35",
      per: "/day",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGiUiY-dASWG2rAepsYi6s3IZbpgjN5810jWq9zekULCwgtkopByfZME3oS-iLbPzFWDJrg3zpyHr4aRRigjNmDVcJmM1hMQmcYbYRgMziCWg3e9IwwVLvJKgEm9DSc1fxaVrIKO0gMA2nu_7iHOY21D8b2MrHUQhrqbpEf34kalZ4_8dTTyDnb_AJ6n2bORppxIyu_hCgCD_h332MSwokMqosjUbiuq5QSeTFA35z-6eaafJCAjQ6lGHuj5zbomNH_VPliVgb-xPl",
    },
  ];

  return (
    <section className="pb-8">
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-2xl md:text-3xl font-bold text-[#121716]">Featured Items</h2>
        <div className="flex gap-2">
          <button className="size-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 hover:text-[#217864] transition-colors" aria-label="Previous">
            <Icon name="chevron_left" />
          </button>
          <button className="size-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 hover:text-[#217864] transition-colors" aria-label="Next">
            <Icon name="chevron_right" />
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {items.map((it) => (
          <TrendingCard key={it.title} item={it} />
        ))}
      </div>
    </section>
  )
}
