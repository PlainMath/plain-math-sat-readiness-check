type TimerProps = {
  secondsLeft: number;
  totalSeconds: number;
};

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function Timer({ secondsLeft, totalSeconds }: TimerProps) {
  const isLow = secondsLeft <= 120;
  const percentage = totalSeconds === 0 ? 0 : (secondsLeft / totalSeconds) * 100;

  return (
    <div className="min-w-[8rem] rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-right">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
        Time left
      </div>

      <div className={isLow ? "mt-1 text-2xl font-semibold text-red-300" : "mt-1 text-2xl font-semibold text-white"}>
        {formatTime(secondsLeft)}
      </div>

      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
        <div
          className={isLow ? "h-full bg-red-300" : "h-full bg-[#c5a15b]"}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
