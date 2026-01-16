import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import the navigate hook
import Icon from './Icon'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the item name
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Redirects to /rentItems?search=your_input
      navigate(`/rentItems?search=${encodeURIComponent(searchTerm)}`);
    } else {
      // If empty, just go to rentItems page
      navigate('/rentItems');
    }
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-xl shadow-black/10 w-full max-w-2xl flex flex-col md:flex-row items-stretch gap-2">
      {/* ITEMS INPUT (Replaced "Where") */}
      <div className="flex-1 flex items-center px-4 h-14 bg-[#f6f8f7] rounded-xl border border-transparent focus-within:border-[rgba(33,120,100,0.30)] focus-within:bg-white transition-all">
        <Icon name="search" className="text-gray-400 mr-3" /> {/* Changed icon to search */}
        <div className="flex flex-col items-start w-full">
          <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wide" htmlFor="items">
            Items
          </label>
          <input
            className="w-full bg-transparent border-none p-0 text-sm font-semibold text-[#121716] placeholder-gray-400 focus:ring-0"
            id="items"
            placeholder="Search items (e.g. Tents, Cars)..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // Allow searching by pressing "Enter"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
      </div>

      {/* DATE INPUT */}
      {/* <div className="flex-1 flex items-center px-4 h-14 bg-[#f6f8f7] rounded-xl border border-transparent focus-within:border-[rgba(33,120,100,0.30)] focus-within:bg-white transition-all">
        <Icon name="calendar_today" className="text-gray-400 mr-3" />
        <div className="flex flex-col items-start w-full">
          <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wide" htmlFor="dates">
            When
          </label>
          <input
            className="w-full bg-transparent border-none p-0 text-sm font-semibold text-[#121716] placeholder-gray-400 focus:ring-0"
            id="dates"
            placeholder="Add dates"
            type="text"
          />
        </div>
      </div> */}

      {/* SEARCH BUTTON */}
      <button 
        onClick={handleSearch}
        className="bg-[#217864] hover:bg-[#1a6050] text-white rounded-xl px-8 h-14 md:h-auto font-bold text-base transition-colors shadow-lg shadow-[rgba(33,120,100,0.20)] flex items-center justify-center gap-2"
      >
        <Icon name="search" />
        <span>Search</span>
      </button>
    </div>
  )
}