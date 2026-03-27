import React from 'react'

export default function StorySection() {
  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-[1080px] mx-auto grid grid-cols-2 gap-16 items-center">
        {/* Text Side */}
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#217864]/10 rounded-full blur-xl"></div>
          <h2 className="relative text-4xl font-bold text-[#121716] mb-6">
            It started with a missing backpack...
          </h2>
          <div className="space-y-6 text-lg text-[#68827c] leading-relaxed">
            <p>
              In 2018, our founder Sarah landed in Patagonia ready for a month-long trek, only to find her gear hadn't arrived. The local rental options were scarce, expensive, and unreliable.
            </p>
            <p>
              That frustration sparked an idea: what if you could rent high-quality gear directly from locals or verified hubs anywhere in the world?
            </p>
            <p>
              We built Travel Rental to connect explorers with the equipment they need. Today, we're a global community of thousands, sharing everything from tents in the Alps to surfboards in Bali.
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 flex gap-12">
            <div>
              <p className="text-3xl font-bold text-[#217864]">50k+</p>
              <p className="text-sm text-[#68827c] mt-1">Rentals Completed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#217864]">42</p>
              <p className="text-sm text-[#68827c] mt-1">Countries Active</p>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="relative">
          <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAxVp7BhzWAs0RZVZZE0dDPw4YYf1PG0TnCUDST-aA5y1bokbgYTCL7lvuVn8ElRmEahfBPXb7PS29leBQPzaEtM6meY8O1U_9HwtoHpy4yM8XUNelu-9Hapt4kzL01-0B-Su_GjpP93v-DnE30RNtZaNNgknRc_elxDrz2MLkddM8kLYtq3YJScyG1oOiTaBRZa8e08BAO6HQvTMpMlQqhLnxD_Kq9wJhc6etwJhGe-iL7KCd0tf7oEp_Js5k5QqMa-1ViYNn4Nsvg")' }}
            ></div>
          </div>
          {/* Overlapping image */}
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-xl overflow-hidden shadow-xl border-4 border-white block">
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA1pa4pZlbnUllp24JmYHx8ta-PZi1cvYa6WUTJ19ijzIXyk9iBuLMD3mBziZNN9WeiLdcXPL9yZcnW4WD7sWR-FV3ejr2Qgwhxalf084VDceiEJvjayBsJEOvswmizfnGbzpjjUDSYZPb059GxizEyzxW7ttc71_3xTpoIabJr48hcawdWZ9gS8t2_MyhAb_oX9Ee8Y0M2q4D8D-lBE-2d4_npEGkKMAewh6YAZWYhJjP0y-bW5H8nVgrN58wuJWgF5J0iO9IxXmS2")' }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  )
}
