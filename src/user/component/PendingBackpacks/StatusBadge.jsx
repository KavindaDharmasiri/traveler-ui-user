export const StatusBadge = ({ label, variant = 'pending' }) => {
  const styles = {
    pending: "bg-purple-50 text-[#7E57C2] border-[#7E57C2]/20",
    accepted: "bg-green-50 text-[#217964] border-[#217964]/20",
    rejected: "bg-red-50 text-[#C3383E] border-[#C3383E]/20",
    timedOut: "bg-slate-50 text-slate-500 border-slate-200"
  };
  
  return (
    <span className={`px-3 py-1 rounded-md text-xs font-bold border ${styles[variant]}`}>
      {label}
    </span>
  );
};