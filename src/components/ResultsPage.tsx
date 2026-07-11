import { AUDIT_BOOKING_URL } from "../lib/constants";
import { getSkillNarrative } from "../data/skillNarratives";
import { resultTemplates } from "../data/resultTemplates";
import { submitAuditClick } from "../lib/submitAuditPacket";
import type { SaveStatus, TutorAuditPacket } from "../lib/types";
import { AuditCTA } from "./AuditCTA";
import { BreakdownCard } from "./BreakdownCard";
import { QuestionReview } from "./QuestionReview";
import { SaveWarning } from "./SaveWarning";
import { ScoreCard } from "./ScoreCard";

type ResultsPageProps = {
  packet: TutorAuditPacket;
  saveStatus: SaveStatus;
  saveError: string;
  onRetrySave: () => void;
};

export function ResultsPage({
  packet,
  saveStatus,
  saveError,
  onRetrySave,
}: ResultsPageProps) {
  const result = packet.result;
  const primaryTemplate = resultTemplates[result.primaryLeak];

  const isCleanStrongResult =
    result.readinessScore >= 90 &&
    result.totals.correctAnswers === result.totals.totalQuestions &&
    result.totals.flaggedQuestionsCount === 0 &&
    result.totals.slowQuestionsCount === 0 &&
    result.totals.trapAnswersSelectedCount === 0 &&
    result.totals.incorrectAnswers === 0 &&
    result.totals.unansweredQuestions === 0;

  const mainSignalLabel = isCleanStrongResult
    ? "Readiness signal"
    : "Main score leak detected";

  const mainSignalTitle = isCleanStrongResult
    ? "No major leak detected"
    : result.primaryLeakDisplayName;

  const mainSignalCopy = isCleanStrongResult
    ? "This 15-minute check did not detect a meaningful score leak. Accuracy, pacing, Desmos strategy, trap recognition, foundations, and harder-module execution all showed a strong signal in this sample."
    : primaryTemplate.mainCopy;

  const hasDistinctSecondaryLeak =
    result.secondaryLeak !== result.primaryLeak;

  const secondarySignalLabel = isCleanStrongResult
    ? "Recommended next focus"
    : hasDistinctSecondaryLeak
      ? "Secondary leak"
      : "Secondary signal";

  const secondarySignalTitle = isCleanStrongResult
    ? "Precision work and full-length confirmation"
    : hasDistinctSecondaryLeak
      ? result.secondaryLeakDisplayName
      : "No separate secondary leak detected";

  const skillBreakdowns = [
    { key: "algebraSpeed", score: result.skillScores.algebraSpeed },
    { key: "desmosStrategy", score: result.skillScores.desmosStrategy },
    { key: "timingControl", score: result.skillScores.timingControl },
    { key: "trapRecognition", score: result.skillScores.trapRecognition },
    { key: "foundationStrength", score: result.skillScores.foundationStrength },
    { key: "hardModuleReadiness", score: result.skillScores.hardModuleReadiness },
  ] as const;

  function handleAuditClick() {
    void submitAuditClick({
      reportId: packet.reportId,
      clickedAt: new Date().toISOString(),
    });
  }

  return (
    <main className="min-h-screen px-5 py-6 text-white md:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <div className="text-lg font-semibold tracking-tight">Plain Math SAT</div>
          <div className="text-sm text-[#d7bd7a]">SAT Math, engineered.</div>
        </header>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl md:p-8">
          <div className="text-sm uppercase tracking-[0.24em] text-[#d7bd7a]">
            Readiness Report
          </div>

          <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            Your Plain Math SAT 600 → 700 Readiness Report
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Based on this 15-minute check, here are the likely score leaks
            holding back the next jump.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm text-slate-500">Report ID</div>
            <div className="mt-1 font-mono text-lg text-[#e7c982]">
              {packet.reportId}
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Use the same parent email when booking your audit so we can match
              this report to your session.
            </p>
          </div>
        </section>

        <div className="mt-6">
          <SaveWarning
            saveStatus={saveStatus}
            saveError={saveError}
            onRetry={onRetrySave}
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <ScoreCard packet={packet} />

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl">
            <div className="text-sm uppercase tracking-[0.22em] text-[#d7bd7a]">
              {mainSignalLabel}
            </div>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              {mainSignalTitle}
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              {mainSignalCopy}
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-slate-500">{secondarySignalLabel}</div>
              <div className="mt-1 text-lg font-semibold text-white">
                {secondarySignalTitle}
              </div>
            </div>
          </section>
        </div>

        <section className="mt-10">
          <h2 className="text-3xl font-semibold tracking-tight">
            Skill Breakdown
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {skillBreakdowns.map((item) => (
              <BreakdownCard
                key={item.key}
                {...getSkillNarrative(item.key, item.score)}
                score={item.score}
              />
            ))}
          </div>
        </section>

        <div className="mt-10">
          <QuestionReview flaggedQuestions={packet.flaggedQuestions} />
        </div>

        <div className="mt-10">
          <AuditCTA auditUrl={AUDIT_BOOKING_URL} onAuditClick={handleAuditClick} />
        </div>

        <footer className="mt-10 border-t border-white/10 pt-6 text-sm leading-6 text-slate-500">
          <div className="font-semibold text-slate-300">Plain Math SAT</div>
          <div>SAT Math, engineered.</div>
          <p className="mt-4">
            This is an independent SAT-style readiness check. It is not an
            official SAT, not affiliated with College Board, and not a
            guaranteed score prediction.
          </p>
        </footer>
      </div>
    </main>
  );
}
