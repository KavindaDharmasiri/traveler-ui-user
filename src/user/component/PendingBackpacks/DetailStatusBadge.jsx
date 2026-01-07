import { Timer, CheckCircle2, XCircle, Clock, Info } from 'lucide-react';

export const DetailStatusBadge = ({ variant }) => {
  const configs = {
    pending: { label: "Awaiting Response", class: "bg-gray-100 text-gray-600 border-gray-200" },
    urgent: { label: "Expiring Soon", class: "bg-red-50 text-[#C3383E] border-[#C3383E]/20" },
    accepted: { label: "Accepted", class: "bg-[#217964] text-white border-transparent" },
    timeout: { label: "Timed Out", class: "bg-slate-100 text-slate-500 border-slate-200" },
    rejected: { label: "Rejected", class: "bg-rose-100 text-rose-700 border-rose-200" }
  };

  const config = configs[variant] || configs.pending;

  return (
    <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${config.class}`}>
      {config.variant === 'accepted' && <CheckCircle2 size={10} className="inline mr-1" />}
      {config.label}
    </span>
  );
};