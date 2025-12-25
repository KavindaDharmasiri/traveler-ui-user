import React from 'react'

export default function ItemCard(props) {
  return (
    <div className="group relative flex flex-col sm:flex-row items-stretch gap-6 rounded-xl bg-white dark:bg-white/5 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all border border-transparent hover:border-[#217964]/20">
        <div className="w-full sm:w-48 md:w-56 bg-center bg-no-repeat aspect-[4/3] sm:aspect-square bg-cover rounded-lg sm:rounded-xl shrink-0" alt="GoPro action camera on a mount" src='https://2.img-dpreview.com/files/p/E~TS1180x0~articles/1047962867/gopro_hero_12_camera_on_a_log_with_blurred_background.jpeg'></div>
        <div className="flex flex-col flex-1 justify-between gap-4">
            <div className="flex justify-between items-start gap-4">
                <div>
                    <h3 className="text-[#0F172A] dark:text-white text-lg font-bold leading-tight mb-1">GoPro Hero 11 Black</h3>
                    <p className="text-[#64748b] dark:text-gray-400 text-sm leading-normal line-clamp-2">Waterproof action camera with 5.3K60 Ultra HD Video, 27MP photos, 1/1.9" Image Sensor.</p>
                </div>
                <button aria-label="Remove item" className="text-[#64748b] hover:text-remove transition-colors p-2 -mr-2 -mt-2 rounded-full hover:bg-remove/10">
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mt-2">
                <div className="flex flex-col">
                    <span className="text-xs text-[#64748b] dark:text-gray-500 uppercase font-semibold tracking-wider">Dates</span>
                    <span className="font-medium">Oct 12 - Oct 15</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-[#64748b] dark:text-gray-500 uppercase font-semibold tracking-wider">Duration</span>
                    <span className="font-medium">4 Days</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/10 mt-auto">
                <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-cover bg-center" alt="Portrait of Sarah J" src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200'></div>
                    <span className="text-xs font-medium text-[#64748b] dark:text-gray-400">Owner: Sarah J.</span>
                </div>
                <span className="inline-flex items-center rounded-full bg-[#7E57C2]/10 px-3 py-1 text-xs font-bold text-[#7E57C2] ring-1 ring-inset ring-[#7E57C2]/20">
                <span className="material-symbols-outlined text-[14px] mr-1">local_offer</span>
                                Bundle Deal
                            </span>
            </div>
         </div>
    </div>
  )
}
