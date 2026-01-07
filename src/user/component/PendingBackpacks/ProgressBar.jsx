export const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;
  const isComplete = current === total;
  
  return (
    <div className="w-full">
        
      <div className="flex justify-between text-xs font-semibold mb-1">
        {isComplete ? <span className="text-slate-500">All items confirmed</span> : <span className="text-slate-500">Request Progress</span>}
        <span className={isComplete ? "text-[#217964]" : "text-[#1565C0]"}>
          {current}/{total} Accepted
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
        <div 
          className={`h-full transition-all duration-700 ${isComplete ? 'bg-[#217964]' : 'bg-[#1565C0]'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};