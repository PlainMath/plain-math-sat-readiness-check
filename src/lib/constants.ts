export const SOURCE = "plain_math_sat_readiness_check" as const;

export const AUDIT_BOOKING_URL =
  import.meta.env.VITE_AUDIT_BOOKING_URL ||
  "https://nas.com/classic-math-for-parents/sessions/sat-math-diagnostic--strategy-audit---60-min";

export const GOOGLE_APPS_SCRIPT_ENDPOINT =
  import.meta.env.VITE_GOOGLE_APPS_SCRIPT_ENDPOINT || "";

export const SHEET_SUBMISSION_TOKEN =
  import.meta.env.VITE_SHEET_SUBMISSION_TOKEN || "";

export const DESMOS_URL = "https://www.desmos.com/calculator";

export const TEST_DURATION_SECONDS = 15 * 60;

export const BRAND_NAME = "Plain Math SAT";

export const BRAND_LINE = "SAT Math, engineered.";
