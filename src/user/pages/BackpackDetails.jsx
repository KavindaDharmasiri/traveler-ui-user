import React from 'react';
import { Mail, ChevronRight } from 'lucide-react';
import { RequestItemCard } from '../component/PendingBackpacks/RequestItemCard';
import { useParams } from 'react-router-dom';

const mockItems = [];

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