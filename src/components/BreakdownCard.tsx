import { ProgressBar } from "./ProgressBar";

type BreakdownCardProps = {
  title: string;
  score: number;
  whatWeSaw: string;
  whatItMeans: string;
  whyItMatters: string;
};

export function BreakdownCard({
  title,
  score,
  whatWeSaw,
  whatItMeans,
  whyItMatters,
}: BreakdownCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-[#e7c982]">{title}</h3>

        <div className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300">
          {score}/100
        </div>
      </div>

      <div className="mt-4">
        <ProgressBar value={score} max={100} />
      </div>

      <div className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
        <div>
          <div className="font-semibold text-white">What we saw</div>
          <p className="mt-1 text-slate-400">{whatWeSaw}</p>
        </div>

        <div>
          <div className="font-semibold text-white">What it means</div>
          <p className="mt-1 text-slate-400">{whatItMeans}</p>
        </div>

        <div>
          <div className="font-semibold text-white">Why it matters</div>
          <p className="mt-1 text-slate-400">{whyItMatters}</p>
        </div>
      </div>
    </div>
  );
}
