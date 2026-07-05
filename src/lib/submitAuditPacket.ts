import {
  GOOGLE_APPS_SCRIPT_ENDPOINT,
  SHEET_SUBMISSION_TOKEN,
} from "./constants";
import type { TutorAuditPacket } from "./types";

export type SubmitAuditPacketResponse = {
  success: boolean;
  error?: string;
};

export async function submitAuditPacket(
  packet: TutorAuditPacket,
): Promise<SubmitAuditPacketResponse> {
  if (!GOOGLE_APPS_SCRIPT_ENDPOINT) {
    console.log("Google Apps Script endpoint missing. Audit packet:", packet);

    return {
      success: true,
    };
  }

  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        token: SHEET_SUBMISSION_TOKEN,
        packet,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      return {
        success: false,
        error: data.error || "Unknown submission error",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Audit packet submission failed:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}

export async function submitAuditClick(params: {
  reportId: string;
  clickedAt: string;
}): Promise<void> {
  if (!GOOGLE_APPS_SCRIPT_ENDPOINT) {
    return;
  }

  try {
    const body = JSON.stringify({
      token: SHEET_SUBMISSION_TOKEN,
      eventType: "audit_click",
      reportId: params.reportId,
      clickedAt: params.clickedAt,
    });

    if ("sendBeacon" in navigator) {
      const blob = new Blob([body], {
        type: "text/plain;charset=utf-8",
      });

      navigator.sendBeacon(GOOGLE_APPS_SCRIPT_ENDPOINT, blob);
      return;
    }

    await fetch(GOOGLE_APPS_SCRIPT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body,
      keepalive: true,
    });
  } catch (error) {
    console.warn("Audit click tracking failed:", error);
  }
}
