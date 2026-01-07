import React from 'react';
import { Mail, ChevronRight } from 'lucide-react';
import { RequestItemCard } from '../component/PendingBackpacks/RequestItemCard';
import { useParams } from 'react-router-dom';

const mockItems = [
  { id: 1, name: "Hiking Boots", tenant: "Outdoor Gear", price: 15, state: "pending", h: "01", m: "45", s: "00", image: "https://images.unsplash.com/photo-1520639889313-7272161b2089?w=400" },
  { id: 2, name: "Dome Tent", tenant: "Alex's Rentals", price: 25, state: "urgent", h: "00", m: "15", s: "32", image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=400" },
  { id: 3, name: "Camping Stove", tenant: "Camping World", price: 8, state: "accepted", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400" },
  { id: 4, name: "Sleeping Bag", tenant: "Mountain Gear", price: 12, state: "timeout", image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=400" }
];

export default function BackpackDetails() {
  const { id } = useParams(); // This will be "8821"
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
        <span>Home</span> <ChevronRight size={12} />
        <span>Requests</span> <ChevronRight size={12} />
        <span className="text-slate-900 font-bold">Backpack #8821</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Weekend Camping Trip</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Request ID: #8821 • 5 Items • Oct 12 - Oct 15</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-all active:scale-95">
          <Mail size={18} /> Message All Tenants
        </button>
      </div>

      {/* Items List */}
      <div className="flex flex-col gap-6">
        {mockItems.map(item => <RequestItemCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}