import { Timer, CheckCircle2, XCircle, Clock, Info } from 'lucide-react';

export const CountdownDisplay = ({ hours, minutes, seconds, variant = 'info' }) => {
  const isUrgent = variant === 'urgent';
  const colorClass = isUrgent ? "text-[#C3383E]" : "text-[#1565C0]";
  const bgClass = isUrgent ? "bg-red-50" : "bg-blue-50";

  const Unit = ({ val, label }) => (
    <div className="flex flex-col items-center">
      <div className={`${bgClass} ${colorClass} px-2 py-1 rounded font-mono font-bold text-lg leading-none`}>
        {val}
      </div>
      <span className="text-[10px] uppercase text-slate-400 mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-2">
      <Unit val={hours} label="Hrs" />
      <span className={`${colorClass} font-bold mb-4`}>:</span>
      <Unit val={minutes} label="Min" />
      <span className={`${colorClass} font-bold mb-4`}>:</span>
      <Unit val={seconds} label="Sec" />
    </div>
  );
};