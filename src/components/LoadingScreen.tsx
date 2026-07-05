import { useEffect, useState } from "react";

const messages = [
  "Analyzing score leaks…",
  "Checking algebra speed…",
  "Reviewing timing patterns…",
  "Detecting Desmos opportunities…",
  "Preparing your tutor audit packet…",
  "Building your readiness report…",
];

export function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % messages.length);
    }, 750);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center px-5 text-white">
      <section className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-center shadow-2xl">
        <div className="text-sm uppercase tracking-[0.24em] text-[#d7bd7a]">
          Plain Math SAT
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Building your readiness report
        </h1>

        <p className="mt-4 min-h-8 text-slate-300">{messages[messageIndex]}</p>

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-2/3 animate-pulse rounded-full bg-[#c5a15b]" />
        </div>
      </section>
    </main>
  );
}
