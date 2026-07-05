type AuditCTAProps = {
  auditUrl: string;
  onAuditClick: () => void;
};

export function AuditCTA({ auditUrl, onAuditClick }: AuditCTAProps) {
  return (
    <section className="rounded-[2rem] border border-[#c5a15b]/25 bg-[#c5a15b]/10 p-6 shadow-2xl md:p-8">
      <h2 className="max-w-3xl text-3xl font-semibold tracking-tight">
        This check shows where points may be leaking. The Strategy Audit shows
        how to stop the leaks.
      </h2>

      <p className="mt-5 max-w-3xl leading-7 text-slate-300">
        This free Plain Math SAT check is a quick signal, not a full diagnosis.
        In the $125 Strategy Audit, we review your child’s missed and slow
        questions, identify the exact reason behind the leaks, and build a clear
        SAT Math roadmap for the next score jump.
      </p>

      <div className="mt-6">
        <div className="font-semibold text-white">In the audit, we will:</div>

        <ul className="mt-4 grid gap-3 text-slate-300 md:grid-cols-2">
          {[
            "Review this readiness check result",
            "Identify the highest-priority score leaks",
            "Separate knowledge gaps from strategy gaps",
            "Check Desmos usage and timing strategy",
            "Build a personalized SAT Math roadmap",
            "Recommend the right next step if continued coaching makes sense",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-[#c5a15b]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <a
          href={auditUrl}
          onClick={onAuditClick}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-full bg-[#c5a15b] px-6 py-3 font-semibold text-slate-950 transition hover:bg-[#e0bd72]"
        >
          Book the $125 Strategy Audit
        </a>

        <p className="mt-3 text-sm font-medium text-[#e7c982]">
          The $125 audit fee is credited toward any lesson package if you continue.
        </p>

        <p className="mt-3 text-sm text-slate-400">
          No guesswork. No random practice. A clear SAT Math plan.
        </p>
      </div>
    </section>
  );
}
