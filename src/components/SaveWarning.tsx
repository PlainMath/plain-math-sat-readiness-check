import type { SaveStatus } from "../lib/types";

type SaveWarningProps = {
  saveStatus: SaveStatus;
  saveError: string;
  onRetry: () => void;
};

export function SaveWarning({ saveStatus, saveError, onRetry }: SaveWarningProps) {
  if (saveStatus !== "error") {
    return null;
  }

  return (
    <div className="rounded-3xl border border-red-400/30 bg-red-400/10 p-5">
      <h3 className="font-semibold text-red-200">
        We had trouble saving your audit packet.
      </h3>

      <p className="mt-2 text-sm leading-6 text-red-100/80">
        Please screenshot your Report ID or try again.
      </p>

      {saveError ? (
        <p className="mt-2 text-xs text-red-100/60">{saveError}</p>
      ) : null}

      <button
        onClick={onRetry}
        className="mt-4 rounded-full border border-red-200/40 px-5 py-2 text-sm font-medium text-red-100 transition hover:bg-red-200/10"
      >
        Retry saving report
      </button>
    </div>
  );
}
