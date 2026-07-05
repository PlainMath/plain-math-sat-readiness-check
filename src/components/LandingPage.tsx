type LandingPageProps = {
  onStart: () => void;
};

const diagnosticCards = [
  {
    title: "Algebra Speed",
    copy: "Is your child losing time on manual solving?",
  },
  {
    title: "Desmos Strategy",
    copy: "Are faster Digital SAT routes being missed?",
  },
  {
    title: "Timing Control",
    copy: "Is pacing making a higher score harder?",
  },
  {
    title: "Trap Recognition",
    copy: "Are wording traps and setup traps costing points?",
  },
  {
    title: "Foundation Gaps",
    copy: "Are core skills blocking the next score jump?",
  },
  {
    title: "Hard Module Readiness",
    copy: "Is your child ready for harder adaptive questions?",
  },
];

const reportBullets = [
  "A 600 → 700 Readiness Score",
  "Your child’s likely primary score leak",
  "A skill-by-skill breakdown",
  "Timing and strategy signals",
  "A question review for missed or slow questions",
  "A clear next-step recommendation",
];

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <main className="min-h-screen px-5 py-6 text-white md:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold tracking-tight">Plain Math SAT</div>
            <div className="text-sm text-[#d7bd7a]">SAT Math, engineered.</div>
          </div>

          <button
            onClick={onStart}
            className="hidden rounded-full border border-[#c5a15b]/40 px-5 py-2 text-sm font-medium text-[#e7c982] transition hover:bg-[#c5a15b]/10 md:block"
          >
            Start check
          </button>
        </header>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl md:p-10">
          <div className="mb-6 inline-flex rounded-full border border-[#c5a15b]/30 bg-[#c5a15b]/10 px-4 py-2 text-sm text-[#e7c982]">
            Stuck in the 500s or low 600s on SAT Math?
          </div>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            Free SAT Math 600 → 700 Readiness Check
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
            In 15 minutes, see what may be keeping your child stuck in the 500s
            or low 600s on SAT Math.
          </p>

          <p className="mt-5 max-w-3xl leading-7 text-slate-400">
            This Plain Math SAT check is a quick SAT-style diagnostic designed
            to identify likely score leaks: algebra speed, Desmos strategy,
            timing control, adaptive traps, and foundation gaps.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={onStart}
              className="rounded-full bg-[#c5a15b] px-6 py-3 font-semibold text-slate-950 transition hover:bg-[#e0bd72]"
            >
              Start the 15-minute check
            </button>

            <p className="text-sm text-slate-500">
              No official SAT score prediction. No generic practice test.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">
            Some questions are calculator-friendly. Your child may use Desmos
            or a calculator, just like they would on the real Digital SAT.
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            What this check finds
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {diagnosticCards.map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-5"
              >
                <h3 className="text-lg font-semibold text-[#e7c982]">
                  {card.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-400">{card.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              What you’ll get after 15 minutes
            </h2>

            <ul className="mt-5 space-y-3 text-slate-300">
              {reportBullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-[#c5a15b]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-[#c5a15b]/20 bg-[#c5a15b]/10 p-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Why this matters before the August SAT
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              When time is limited, more random practice can waste weeks. The
              right move is to identify the highest-priority leaks first.
            </p>

            <button
              onClick={onStart}
              className="mt-6 rounded-full bg-[#c5a15b] px-6 py-3 font-semibold text-slate-950 transition hover:bg-[#e0bd72]"
            >
              Start the 15-minute check
            </button>
          </div>
        </section>

        <footer className="mt-10 border-t border-white/10 pt-6 text-sm leading-6 text-slate-500">
          This is an independent SAT-style readiness check. It is not an
          official SAT, not affiliated with College Board, and not a guaranteed
          score prediction.
        </footer>
      </div>
    </main>
  );
}
