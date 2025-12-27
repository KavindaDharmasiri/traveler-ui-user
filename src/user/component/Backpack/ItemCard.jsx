import React from 'react'

export default function ItemCard({ item, imageMapper, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getImageUrl = () => {
    if (item.item?.images && item.item.images.length > 0) {
      const imageUuid = item.item.images[0];
      return imageMapper[imageUuid] || 'https://via.placeholder.com/300';
    }
    return 'https://via.placeholder.com/300';
  };

  const handleDelete = () => {
    onDelete(item.id);
  };

  return (
    <div className="group relative flex flex-col sm:flex-row items-stretch gap-6 rounded-xl bg-white dark:bg-white/5 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all border border-transparent hover:border-[#217964]/20">
        <div 
          className="w-full sm:w-48 md:w-56 bg-center bg-no-repeat aspect-[4/3] sm:aspect-square bg-cover rounded-lg sm:rounded-xl shrink-0" 
          style={{ backgroundImage: `url(${getImageUrl()})` }}
        ></div>
        <div className="flex flex-col flex-1 justify-between gap-4">
            <div className="flex justify-between items-start gap-4">
                <div>
                    <h3 className="text-[#0F172A] dark:text-white text-lg font-bold leading-tight mb-1">
                      {item.item?.name || 'Item Name'}
                    </h3>
                    <p className="text-[#64748b] dark:text-gray-400 text-sm leading-normal line-clamp-2">
                      {item.item?.description || 'No description available'}
                    </p>
                </div>
                <button 
                    onClick={handleDelete}
                    aria-label="Remove item" 
                    className="text-[#64748b] hover:text-red-500 transition-colors p-2 -mr-2 -mt-2 rounded-full hover:bg-red-50"
                >
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mt-2">
                <div className="flex flex-col">
                    <span className="text-xs text-[#64748b] dark:text-gray-500 uppercase font-semibold tracking-wider">Dates</span>
                    <span className="font-medium">
                      {formatDate(item.pickupDate)} - {formatDate(item.returnDate)}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-[#64748b] dark:text-gray-500 uppercase font-semibold tracking-wider">Duration</span>
                    <span className="font-medium">{item.rentalDays} Days</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/10 mt-auto">
                <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-cover bg-center bg-gray-300"></div>
                    <span className="text-xs font-medium text-[#64748b] dark:text-gray-400">
                      Provider: {item.providerTenant}
                    </span>
                </div>
                <span className="text-lg font-bold text-[#217964]">
                  LKR {item.totalPrice}
                </span>
            </div>
         </div>
    </div>
  )
}
