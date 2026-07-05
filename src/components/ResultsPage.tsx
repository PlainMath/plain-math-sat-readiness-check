import { AUDIT_BOOKING_URL } from "../lib/constants";
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

const skillCopy = {
  algebraSpeed: {
    title: "Algebra Speed",
    whatWeSaw: "Your child’s algebra work may be taking longer than the test allows.",
    whatItMeans: "The issue may be algebra fluency, not effort.",
    whyItMatters: "Slow algebra reduces time available for harder questions.",
  },
  desmosStrategy: {
    title: "Desmos Strategy",
    whatWeSaw: "Some calculator-friendly questions were missed or took too long.",
    whatItMeans: "Your child may not be using the fastest Digital SAT route.",
    whyItMatters: "Desmos can turn some long algebra problems into short verification problems.",
  },
  timingControl: {
    title: "Timing Control",
    whatWeSaw: "Several questions crossed the expected time limit.",
    whatItMeans: "Pacing may be making the score less consistent.",
    whyItMatters: "A student can lose points from slow routes even when the math is familiar.",
  },
  trapRecognition: {
    title: "Trap Recognition",
    whatWeSaw: "Some selected answers matched common SAT-style trap patterns.",
    whatItMeans: "Your child may be solving correctly but answering the wrong target.",
    whyItMatters: "Trap points are expensive because they often come from questions the student could have solved.",
  },
  foundationStrength: {
    title: "Foundation Strength",
    whatWeSaw: "Some baseline skills may need repair.",
    whatItMeans: "Harder practice may not help until the core routine is stable.",
    whyItMatters: "A 700-level score depends on fast, reliable foundations.",
  },
  hardModuleReadiness: {
    title: "Hard Module Readiness",
    whatWeSaw: "Harder questions were less consistent.",
    whatItMeans: "Your child may need more targeted work before harder adaptive questions become reliable.",
    whyItMatters: "The jump from the 600s to 700 often depends on handling harder-module patterns with less hesitation.",
  },
};

export function ResultsPage({
  packet,
  saveStatus,
  saveError,
  onRetrySave,
}: ResultsPageProps) {
  const result = packet.result;
  const primaryTemplate = resultTemplates[result.primaryLeak];

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
              Main score leak detected
            </div>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              {result.primaryLeakDisplayName}
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              {primaryTemplate.mainCopy}
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-slate-500">Secondary leak</div>
              <div className="mt-1 text-lg font-semibold text-white">
                {result.secondaryLeakDisplayName}
              </div>
            </div>
          </section>
        </div>

        <section className="mt-10">
          <h2 className="text-3xl font-semibold tracking-tight">
            Skill Breakdown
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <BreakdownCard
              {...skillCopy.algebraSpeed}
              score={result.skillScores.algebraSpeed}
            />
            <BreakdownCard
              {...skillCopy.desmosStrategy}
              score={result.skillScores.desmosStrategy}
            />
            <BreakdownCard
              {...skillCopy.timingControl}
              score={result.skillScores.timingControl}
            />
            <BreakdownCard
              {...skillCopy.trapRecognition}
              score={result.skillScores.trapRecognition}
            />
            <BreakdownCard
              {...skillCopy.foundationStrength}
              score={result.skillScores.foundationStrength}
            />
            <BreakdownCard
              {...skillCopy.hardModuleReadiness}
              score={result.skillScores.hardModuleReadiness}
            />
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
