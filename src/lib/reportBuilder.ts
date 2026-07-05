import { SOURCE } from "./constants";
import type {
  FinalFlaggedQuestion,
  IntakeData,
  ScoredResult,
  TutorAuditPacket,
} from "./types";
import type { UtmParams } from "./utm";

function randomChunk(): string {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export function generateReportId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `PM-${year}${month}${day}-${randomChunk()}`;
}

export function buildTutorAuditPacket(params: {
  reportId: string;
  submittedAt: string;
  intake: IntakeData;
  scoredResult: ScoredResult;
  utm: UtmParams;
}): TutorAuditPacket {
  const { reportId, submittedAt, intake, scoredResult, utm } = params;

  const questionResults = scoredResult.questionResults.map((result) => ({
    ...result,
    reportId,
  }));

  const flaggedQuestions: FinalFlaggedQuestion[] = scoredResult.flaggedQuestions.map(
    (question) => ({
      ...question,
      reportId,
      submittedAt,
      parentEmail: intake.parentEmail,
      studentFirstName: intake.studentFirstName,
    }),
  );

  const packetBase = {
    reportId,
    submittedAt,
    source: SOURCE,
    utmSource: utm.utmSource,
    utmMedium: utm.utmMedium,
    utmCampaign: utm.utmCampaign,
    intake,
    result: {
      readinessScore: scoredResult.readinessScore,
      scoreInterpretation: scoredResult.scoreInterpretation,
      primaryLeak: scoredResult.primaryLeak,
      primaryLeakDisplayName: scoredResult.primaryLeakDisplayName,
      secondaryLeak: scoredResult.secondaryLeak,
      secondaryLeakDisplayName: scoredResult.secondaryLeakDisplayName,
      skillScores: scoredResult.skillScores,
      totals: scoredResult.totals,
      tutorAuditFocus: scoredResult.tutorAuditFocus,
      recommendedNextStep: scoredResult.recommendedNextStep,
    },
    questionResults,
    flaggedQuestions,
    auditTracking: {
      auditBookingClicked: false,
      auditBookingClickedAt: "",
    },
  };

  return {
    ...packetBase,
    fullReportJson: JSON.stringify(packetBase),
  };
}
