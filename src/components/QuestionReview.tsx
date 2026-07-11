import type { FinalFlaggedQuestion } from "../lib/types";

type QuestionReviewProps = {
  flaggedQuestions: FinalFlaggedQuestion[];
};

type ReviewSignal = {
  title: string;
  copy: string;
};

function isWrong(question: FinalFlaggedQuestion): boolean {
  return (
    question.selectedAnswer !== null &&
    question.selectedAnswer !== question.correctAnswer
  );
}

function isSlow(question: FinalFlaggedQuestion): boolean {
  return (
    question.status === "Slow" ||
    question.timeSpentSec > question.expectedTimeSec * 1.4
  );
}

function getReviewSignals(question: FinalFlaggedQuestion): ReviewSignal[] {
  const wrong = isWrong(question);
  const slow = isSlow(question);
  const desmosMissed =
    question.desmosOpportunity &&
    (wrong || slow || question.status === "Desmos Opportunity Missed");

  const signals: ReviewSignal[] = [];

  if (question.status === "Unanswered" || question.selectedAnswer === null) {
    signals.push({
      title: "Unanswered",
      copy:
        "This may reflect pacing pressure, low confidence, or difficulty deciding when to move on. The audit should determine which one caused the blank response.",
    });
  }

  if (question.selectedTrapAnswer) {
    signals.push({
      title: "Trap selected",
      copy:
        question.trapType
          ? `The selected answer matches this trap pattern: ${question.trapType}. This suggests the student may have stopped at an intermediate result or answered the wrong target.`
          : "The selected answer matches a predictable trap pattern. This suggests the student may have stopped at an intermediate result or answered the wrong target.",
    });
  }

  if (wrong && !question.selectedTrapAnswer) {
    signals.push({
      title: "Incorrect",
      copy:
        "The selected answer suggests a possible content, setup, or interpretation gap. The audit should separate a true knowledge gap from a preventable process mistake.",
    });
  }

  if (slow) {
    signals.push({
      title: "Correct but slow / slow route",
      copy:
        "The time spent was higher than expected. If the answer was correct, this is more likely an efficiency leak than a knowledge gap.",
    });
  }

  if (desmosMissed) {
    signals.push({
      title: "Desmos opportunity",
      copy:
        "This question had a calculator-friendly route. The result suggests route selection may not yet be automatic.",
    });
  }

  if (question.difficulty === "hard" && (wrong || slow)) {
    signals.push({
      title: "Hard-module signal",
      copy:
        "Because this was a harder question, the result is useful for judging whether advanced SAT patterns are reliable yet.",
    });
  }

  if (!signals.length) {
    signals.push({
      title: "Minor flag",
      copy:
        "This question was flagged for review, but the signal is not severe. It is most useful as a precision-check item.",
    });
  }

  return signals;
}

function getStatusSummary(question: FinalFlaggedQuestion): string {
  if (question.status === "Unanswered") {
    return "No answer was submitted, so this is treated as a pacing or confidence signal.";
  }

  if (question.selectedTrapAnswer) {
    return "The selected answer matched a known trap answer, so the review should focus on setup and final-answer discipline.";
  }

  if (question.status === "Desmos Opportunity Missed") {
    return "This question had a faster calculator route, but the result suggests the route was missed or not used efficiently.";
  }

  if (question.status === "Slow") {
    return "The student reached this question slowly relative to the expected timing range.";
  }

  return "The selected answer was incorrect, so this question should be reviewed for setup, concept, and route choice.";
}

export function QuestionReview({ flaggedQuestions }: QuestionReviewProps) {
  if (!flaggedQuestions.length) {
    return (
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
        <h2 className="text-2xl font-semibold tracking-tight">Question Review</h2>
        <p className="mt-3 leading-7 text-slate-400">
          No major missed, slow, unanswered, trap-selected, or Desmos-opportunity
          questions were flagged in this check. That is a strong signal. The next
          step is to confirm the same performance on a longer adaptive set.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
      <h2 className="text-2xl font-semibold tracking-tight">Question Review</h2>

      <p className="mt-3 max-w-3xl leading-7 text-slate-400">
        These are the questions most useful for understanding where points may be
        leaking. The notes below now change based on what actually happened:
        incorrect answer, trap answer, slow route, missed Desmos opportunity, or
        unanswered question.
      </p>

      <div className="mt-6 space-y-4">
        {flaggedQuestions.map((question, index) => {
          const signals = getReviewSignals(question);

          return (
            <article
              key={`${question.questionId}-${question.status}-${index}`}
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

              <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
                {getStatusSummary(question)}
              </p>

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

              <div className="mt-5">
                <div className="font-semibold text-white">Diagnostic signals</div>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {signals.map((signal) => (
                    <div
                      key={signal.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6"
                    >
                      <div className="font-semibold text-[#e7c982]">
                        {signal.title}
                      </div>
                      <p className="mt-1 text-slate-400">{signal.copy}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-4 text-sm leading-6">
                <div>
                  <div className="font-semibold text-white">Question-specific note</div>
                  <p className="mt-1 text-slate-400">{question.explanationParent}</p>
                </div>

                <div>
                  <div className="font-semibold text-white">Fast route</div>
                  <p className="mt-1 text-slate-400">{question.fastRouteSummary}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
