type MetaPixelParameter =
  | string
  | number
  | boolean;

type MetaPixelParameters = Record<
  string,
  MetaPixelParameter
>;

declare global {
  interface Window {
    fbq?: (
      command: "track" | "trackCustom",
      eventName: string,
      parameters?: MetaPixelParameters,
    ) => void;
  }
}

function isMetaPixelAvailable(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.fbq === "function"
  );
}

export function trackMetaCustomEvent(
  eventName: string,
  parameters?: MetaPixelParameters,
): void {
  if (!isMetaPixelAvailable()) {
    return;
  }

  if (parameters) {
    window.fbq?.(
      "trackCustom",
      eventName,
      parameters,
    );
    return;
  }

  window.fbq?.(
    "trackCustom",
    eventName,
  );
}
