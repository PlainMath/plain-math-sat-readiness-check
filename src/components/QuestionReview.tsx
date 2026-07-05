import type { FinalFlaggedQuestion } from "../lib/types";

type QuestionReviewProps = {
  flaggedQuestions: FinalFlaggedQuestion[];
};

export function QuestionReview({ flaggedQuestions }: QuestionReviewProps) {
  if (!flaggedQuestions.length) {
    return (
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
        <h2 className="text-2xl font-semibold tracking-tight">Question Review</h2>
        <p className="mt-3 leading-7 text-slate-400">
          No major missed, slow, unanswered, trap-selected, or Desmos-opportunity
          questions were flagged in this check.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
      <h2 className="text-2xl font-semibold tracking-tight">Question Review</h2>

      <p className="mt-3 max-w-3xl leading-7 text-slate-400">
        These are the questions most useful for understanding where points may be
        leaking. This review is intentionally brief. The full Strategy Audit
        looks at why these leaks happened and what should be fixed first.
      </p>

      <div className="mt-6 space-y-4">
        {flaggedQuestions.map((question) => (
          <article
            key={`${question.questionId}-${question.status}`}
            className="rounded-3xl border border-white/10 bg-black/20 p-5"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-[#d7bd7a]">
                  Question {question.questionNumber}
                </div>

                <h3 className="mt-2 text-lg font-semibold text-white">
                  {question.domain}
                </h3>

                <p className="mt-1 text-sm text-slate-500">{question.skill}</p>
              </div>

              <div className="rounded-full border border-[#c5a15b]/30 bg-[#c5a15b]/10 px-4 py-2 text-sm text-[#e7c982]">
                {question.status}
              </div>
            </div>

            <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-slate-500">Leak detected</div>
                <div className="mt-1 font-medium text-white">
                  {question.leakDetected}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-slate-500">Time</div>
                <div className="mt-1 font-medium text-white">
                  {question.timeSpentSec}s spent / {question.expectedTimeSec}s expected
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-slate-500">Selected answer</div>
                <div className="mt-1 font-medium text-white">
                  {question.selectedAnswer || "Unanswered"}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-slate-500">Correct answer</div>
                <div className="mt-1 font-medium text-white">
                  {question.correctAnswer}
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-4 text-sm leading-6">
              <div>
                <div className="font-semibold text-white">What this suggests</div>
                <p className="mt-1 text-slate-400">{question.explanationParent}</p>
              </div>

              <div>
                <div className="font-semibold text-white">Fast route</div>
                <p className="mt-1 text-slate-400">{question.fastRouteSummary}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
