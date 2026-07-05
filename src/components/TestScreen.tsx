import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DESMOS_URL, TEST_DURATION_SECONDS } from "../lib/constants";
import type { ChoiceId, Question, QuestionResponse } from "../lib/types";
import { ProgressBar } from "./ProgressBar";
import { Timer } from "./Timer";

type TestScreenProps = {
  questions: Question[];
  onComplete: (responses: QuestionResponse[]) => void;
};

export function TestScreen({ questions, onComplete }: TestScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(TEST_DURATION_SECONDS);
  const [answers, setAnswers] = useState<Record<string, ChoiceId | null>>({});
  const [notSure, setNotSure] = useState<Record<string, boolean>>({});
  const [timeByQuestion, setTimeByQuestion] = useState<Record<string, number>>({});

  const enteredAtRef = useRef(Date.now());
  const submittedRef = useRef(false);

  const currentQuestion = questions[currentIndex];

  const progressLabel = useMemo(
    () => `Question ${currentIndex + 1} of ${questions.length}`,
    [currentIndex, questions.length],
  );

  const buildCurrentTimeMap = useCallback(() => {
    const elapsed = Math.max(
      0,
      Math.floor((Date.now() - enteredAtRef.current) / 1000),
    );

    return {
      ...timeByQuestion,
      [currentQuestion.id]: (timeByQuestion[currentQuestion.id] || 0) + elapsed,
    };
  }, [currentQuestion.id, timeByQuestion]);

  const submitTest = useCallback(() => {
    if (submittedRef.current) return;

    submittedRef.current = true;

    const finalTimeMap = buildCurrentTimeMap();

    const responses = questions.map((question) => ({
      questionId: question.id,
      selectedAnswer: notSure[question.id] ? null : answers[question.id] ?? null,
      timeSpentSec: finalTimeMap[question.id] || 0,
    }));

    onComplete(responses);
  }, [answers, buildCurrentTimeMap, notSure, onComplete, questions]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(intervalId);
          submitTest();
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [submitTest]);

  function persistCurrentQuestionTime() {
    const updatedTimeMap = buildCurrentTimeMap();
    setTimeByQuestion(updatedTimeMap);
    enteredAtRef.current = Date.now();
  }

  function goToQuestion(nextIndex: number) {
    persistCurrentQuestionTime();
    setCurrentIndex(nextIndex);
  }

  function handleSelectAnswer(choice: ChoiceId) {
    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: choice,
    }));

    setNotSure((current) => ({
      ...current,
      [currentQuestion.id]: false,
    }));
  }

  function handleNotSure() {
    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: null,
    }));

    setNotSure((current) => ({
      ...current,
      [currentQuestion.id]: true,
    }));
  }

  const selectedAnswer = answers[currentQuestion.id];
  const isNotSure = notSure[currentQuestion.id] === true;
  const canGoNext = Boolean(selectedAnswer || isNotSure);

  return (
    <main className="min-h-screen px-5 py-5 text-white md:py-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold tracking-tight">Plain Math SAT</div>
            <div className="text-sm text-[#d7bd7a]">SAT Math, engineered.</div>
          </div>

          <Timer secondsLeft={secondsLeft} totalSeconds={TEST_DURATION_SECONDS} />
        </header>

        <div className="mb-5">
          <ProgressBar
            value={currentIndex + 1}
            max={questions.length}
            label={progressLabel}
          />
        </div>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl md:p-8">
          <div className="mb-5 flex flex-col gap-3 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.22em] text-[#d7bd7a]">
                {currentQuestion.domain}
              </div>

              <div className="mt-2 text-sm text-slate-500">
                {currentQuestion.difficulty.toUpperCase()} · Calculator / Desmos allowed
              </div>
            </div>

            <a
              href={DESMOS_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#c5a15b]/40 px-4 py-2 text-sm text-[#e7c982] transition hover:bg-[#c5a15b]/10"
            >
              Open Desmos
            </a>
          </div>

          <p className="text-xl leading-9 text-white md:text-2xl">
            {currentQuestion.questionText}
          </p>

          <div className="mt-8 space-y-3">
            {currentQuestion.choices.map((choice) => {
              const isSelected = selectedAnswer === choice.id;

              return (
                <button
                  key={choice.id}
                  onClick={() => handleSelectAnswer(choice.id)}
                  className={
                    isSelected
                      ? "w-full rounded-2xl border border-[#c5a15b] bg-[#c5a15b]/15 p-4 text-left text-white"
                      : "w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-left text-slate-300 transition hover:border-[#c5a15b]/50 hover:bg-[#c5a15b]/10"
                  }
                >
                  <span className="mr-3 font-semibold text-[#e7c982]">
                    {choice.id}.
                  </span>
                  {choice.text}
                </button>
              );
            })}

            <button
              onClick={handleNotSure}
              className={
                isNotSure
                  ? "w-full rounded-2xl border border-slate-300 bg-white/10 p-4 text-left text-white"
                  : "w-full rounded-2xl border border-white/10 bg-transparent p-4 text-left text-slate-400 transition hover:bg-white/5"
              }
            >
              I’m not sure
            </button>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={() => goToQuestion(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="rounded-full border border-white/10 px-5 py-3 text-sm text-slate-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>

            {currentIndex === questions.length - 1 ? (
              <button
                onClick={submitTest}
                disabled={!canGoNext}
                className="rounded-full bg-[#c5a15b] px-6 py-3 font-semibold text-slate-950 transition hover:bg-[#e0bd72] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Submit check
              </button>
            ) : (
              <button
                onClick={() => goToQuestion(currentIndex + 1)}
                disabled={!canGoNext}
                className="rounded-full bg-[#c5a15b] px-6 py-3 font-semibold text-slate-950 transition hover:bg-[#e0bd72] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            )}
          </div>
        </section>

        <p className="mt-5 text-sm leading-6 text-slate-500">
          Use Desmos when it gives you a faster route. Some questions are meant
          to test whether you notice that.
        </p>
      </div>
    </main>
  );
}
