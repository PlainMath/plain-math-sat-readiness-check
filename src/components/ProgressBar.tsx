type ProgressBarProps = {
  value: number;
  max: number;
  label?: string;
};

export function ProgressBar({ value, max, label }: ProgressBarProps) {
  const percentage = max === 0 ? 0 : Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full">
      {label ? (
        <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      ) : null}

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#c5a15b] transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
