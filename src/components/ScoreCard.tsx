import type { TutorAuditPacket } from "../lib/types";

type ScoreCardProps = {
  packet: TutorAuditPacket;
};

export function ScoreCard({ packet }: ScoreCardProps) {
  const result = packet.result;
  const totals = result.totals;

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl">
      <div className="text-sm uppercase tracking-[0.22em] text-[#d7bd7a]">
        Readiness Score
      </div>

      <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-6xl font-semibold tracking-tight text-white">
            {result.readinessScore}
            <span className="text-2xl text-slate-500">/100</span>
          </div>

          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            {result.scoreInterpretation}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm md:min-w-[18rem]">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-slate-500">Correct</div>
            <div className="mt-1 text-2xl font-semibold">{totals.correctAnswers}</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-slate-500">Flagged</div>
            <div className="mt-1 text-2xl font-semibold">{totals.flaggedQuestionsCount}</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-slate-500">Slow</div>
            <div className="mt-1 text-2xl font-semibold">{totals.slowQuestionsCount}</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-slate-500">Trap hits</div>
            <div className="mt-1 text-2xl font-semibold">{totals.trapAnswersSelectedCount}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
