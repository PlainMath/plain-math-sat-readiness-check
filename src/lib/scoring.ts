import { getScoreInterpretation, leakDisplayNames, leakTiePriority } from "../data/resultTemplates";
import type {
  FlaggedQuestionDraft,
  LeakTag,
  Question,
  QuestionResponse,
  QuestionResult,
  QuestionStatus,
  ScoredResult,
  SkillScores,
} from "./types";

function roundScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function safePercent(numerator: number, denominator: number, fallback = 0): number {
  if (denominator === 0) return fallback;
  return (numerator / denominator) * 100;
}

function getResponseForQuestion(
  question: Question,
  responses: QuestionResponse[],
): QuestionResponse {
  return (
    responses.find((response) => response.questionId === question.id) || {
      questionId: question.id,
      selectedAnswer: null,
      timeSpentSec: 0,
    }
  );
}

function getQuestionStatus(params: {
  isCorrect: boolean;
  isUnanswered: boolean;
  isSlow: boolean;
  selectedTrapAnswer: boolean;
}): QuestionStatus {
  if (params.isUnanswered) return "Unanswered";
  if (params.selectedTrapAnswer && !params.isCorrect) return "Trap Selected";
  if (!params.isCorrect) return "Incorrect";
  if (params.isSlow) return "Slow";
  return "Correct";
}

function addLeakPoint(
  leakPoints: Record<LeakTag, number>,
  leakSignals: Set<LeakTag>,
  tag: LeakTag,
  points = 1,
) {
  leakPoints[tag] += points;
  leakSignals.add(tag);
}

function rankLeaks(leakPoints: Record<LeakTag, number>): [LeakTag, LeakTag] {
  const ranked = [...leakTiePriority].sort((a, b) => {
    const pointDiff = leakPoints[b] - leakPoints[a];

    if (pointDiff !== 0) {
      return pointDiff;
    }

    return leakTiePriority.indexOf(a) - leakTiePriority.indexOf(b);
  });

  return [ranked[0], ranked[1]];
}

function getSkillScores(
  questionResults: QuestionResult[],
): SkillScores {
  const withinTime = questionResults.filter(
    (result) => !result.isUnanswered && result.timeSpentSec <= result.estimatedTimeSec,
  ).length;

  const algebraQuestions = questionResults.filter(
    (result) =>
      result.domain === "Algebra" || result.leakTags.includes("algebra_speed"),
  );

  const algebraStrong = algebraQuestions.filter(
    (result) => result.isCorrect && !result.isSlow,
  ).length;

  const desmosQuestions = questionResults.filter(
    (result) => result.desmosOpportunity,
  );

  const desmosStrong = desmosQuestions.filter(
    (result) => result.isCorrect && !result.isSlow,
  ).length;

  const trapQuestions = questionResults.filter((result) => result.trapAnswer);

  const trapNotSelected = trapQuestions.filter(
    (result) => !result.selectedTrapAnswer,
  ).length;

  const trapCorrect = trapQuestions.filter((result) => result.isCorrect).length;

  const foundationQuestions = questionResults.filter(
    (result) =>
      result.difficulty === "easy" ||
      result.leakTags.includes("foundation_gaps"),
  );

  const foundationStrong = foundationQuestions.filter(
    (result) => result.isCorrect && !result.isSlow,
  ).length;

  const hardQuestions = questionResults.filter(
    (result) =>
      result.difficulty === "hard" || result.domain === "Advanced Math",
  );

  const hardStrong = hardQuestions.filter(
    (result) => result.isCorrect && !result.isSlow,
  ).length;

  return {
    algebraSpeed: roundScore(
      safePercent(algebraStrong, algebraQuestions.length, 50),
    ),
    desmosStrategy: roundScore(
      safePercent(desmosStrong, desmosQuestions.length, 50),
    ),
    timingControl: roundScore(
      safePercent(withinTime, questionResults.length, 50),
    ),
    trapRecognition: roundScore(
      trapQuestions.length === 0
        ? 75
        : safePercent(trapNotSelected, trapQuestions.length, 0) * 0.5 +
            safePercent(trapCorrect, trapQuestions.length, 0) * 0.5,
    ),
    foundationStrength: roundScore(
      safePercent(foundationStrong, foundationQuestions.length, 50),
    ),
    hardModuleReadiness: roundScore(
      safePercent(hardStrong, hardQuestions.length, 50),
    ),
  };
}

function getFlaggedStatus(result: QuestionResult): FlaggedQuestionDraft["status"] {
  if (result.isUnanswered) return "Unanswered";
  if (result.selectedTrapAnswer && !result.isCorrect) return "Trap Selected";
  if (!result.isCorrect) return "Incorrect";

  if (result.desmosOpportunity && result.isSlow) {
    return "Desmos Opportunity Missed";
  }

  return "Slow";
}

function getAuditPriority(result: QuestionResult): "High" | "Medium" | "Low" {
  if (result.isUnanswered) return "High";
  if (result.selectedTrapAnswer) return "High";
  if (!result.isCorrect && result.difficulty === "hard") return "High";
  if (!result.isCorrect) return "Medium";
  if (result.isSlow) return "Medium";
  return "Low";
}

function getPrimaryLeakFromSignals(signals: LeakTag[]): string {
  if (!signals.length) return "Timing Control";

  const ranked = [...leakTiePriority].find((tag) => signals.includes(tag));

  return ranked ? leakDisplayNames[ranked] : leakDisplayNames[signals[0]];
}

function getFlaggedLeakDetected(result: QuestionResult): string {
  if (result.isUnanswered) return "Timing Control";

  if (result.selectedTrapAnswer && !result.isCorrect) {
    return "Trap Recognition";
  }

  if (!result.isCorrect && result.difficulty === "hard") {
    return "Hard Module Readiness";
  }

  if (!result.isCorrect && result.domain === "Geometry and Trigonometry") {
    return "Geometry Gap";
  }

  if (!result.isCorrect && result.domain === "Problem-Solving and Data Analysis") {
    return "Data Analysis Gap";
  }

  if (result.desmosOpportunity && result.isSlow) {
    return "Desmos Strategy";
  }

  if (result.isSlow) {
    return "Timing Control";
  }

  return getPrimaryLeakFromSignals(result.leakSignalsGenerated);
}

function buildTutorAuditFocus(primaryLeak: LeakTag, secondaryLeak: LeakTag): string {
  return `Focus on ${leakDisplayNames[primaryLeak]} first, with a secondary check on ${leakDisplayNames[secondaryLeak]}. Use the flagged questions to separate knowledge gaps from strategy gaps, timing leaks, and avoidable trap patterns.`;
}

function buildRecommendedNextStep(readinessScore: number): string {
  if (readinessScore <= 39) {
    return "Book the $125 SAT Math Strategy Audit to identify which core leaks need to be repaired first before more practice tests.";
  }

  if (readinessScore <= 59) {
    return "Book the $125 SAT Math Strategy Audit to identify the highest-priority leaks blocking consistency.";
  }

  if (readinessScore <= 79) {
    return "Book the $125 SAT Math Strategy Audit to tighten timing, Desmos route selection, and harder-module strategy.";
  }

  return "Book the $125 SAT Math Strategy Audit to turn this strong readiness signal into a precise 700+ execution plan.";
}

export function scoreDiagnostic(
  questions: Question[],
  responses: QuestionResponse[],
): ScoredResult {
  const leakPoints: Record<LeakTag, number> = {
    algebra_speed: 0,
    desmos_strategy: 0,
    timing_control: 0,
    adaptive_traps: 0,
    foundation_gaps: 0,
    hard_module_readiness: 0,
    geometry_gap: 0,
    data_analysis_gap: 0,
  };

  const questionResults = questions.map((question, index): QuestionResult => {
    const response = getResponseForQuestion(question, responses);

    const selectedAnswer = response.selectedAnswer;
    const isUnanswered = selectedAnswer === null;
    const isCorrect = !isUnanswered && selectedAnswer === question.correctAnswer;
    const isSlow =
      response.timeSpentSec > question.estimatedTimeSec * 1.4;
    const selectedTrapAnswer =
      !!question.trapAnswer && selectedAnswer === question.trapAnswer;

    const leakSignals = new Set<LeakTag>();

    if (!isCorrect) {
      question.leakTags.forEach((tag) =>
        addLeakPoint(leakPoints, leakSignals, tag),
      );
    }

    if (isUnanswered) {
      addLeakPoint(leakPoints, leakSignals, "timing_control");
      question.leakTags.forEach((tag) =>
        addLeakPoint(leakPoints, leakSignals, tag),
      );
    }

    if (isSlow) {
      addLeakPoint(leakPoints, leakSignals, "timing_control");

      if (question.desmosOpportunity) {
        addLeakPoint(leakPoints, leakSignals, "desmos_strategy");
      }
    }

    if (question.desmosOpportunity && (!isCorrect || isSlow)) {
      addLeakPoint(leakPoints, leakSignals, "desmos_strategy");
    }

    if (selectedTrapAnswer) {
      addLeakPoint(leakPoints, leakSignals, "adaptive_traps");
    }

    if (
      question.difficulty === "easy" &&
      question.leakTags.includes("foundation_gaps") &&
      !isCorrect
    ) {
      addLeakPoint(leakPoints, leakSignals, "foundation_gaps");
    }

    if (question.difficulty === "hard" && !isCorrect) {
      addLeakPoint(leakPoints, leakSignals, "hard_module_readiness");
    }

    return {
      questionNumber: index + 1,
      questionId: question.id,
      domain: question.domain,
      skill: question.skill,
      difficulty: question.difficulty,
      estimatedTimeSec: question.estimatedTimeSec,
      timeSpentSec: response.timeSpentSec,
      selectedAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect,
      isUnanswered,
      isSlow,
      status: getQuestionStatus({
        isCorrect,
        isUnanswered,
        isSlow,
        selectedTrapAnswer,
      }),
      desmosOpportunity: question.desmosOpportunity,
      trapType: question.trapType,
      trapAnswer: question.trapAnswer,
      selectedTrapAnswer,
      leakTags: question.leakTags,
      leakSignalsGenerated: [...leakSignals],
      explanationParent: question.explanationParent,
      fastRouteSummary: question.fastRouteSummary,
      tutorNote: question.tutorNote,
    };
  });

  const totalQuestions = questions.length;
  const correctAnswers = questionResults.filter((result) => result.isCorrect).length;
  const unansweredQuestions = questionResults.filter(
    (result) => result.isUnanswered,
  ).length;
  const incorrectAnswers = totalQuestions - correctAnswers - unansweredQuestions;

  const questionsWithinExpectedTime = questionResults.filter(
    (result) => !result.isUnanswered && result.timeSpentSec <= result.estimatedTimeSec,
  ).length;

  const desmosOpportunityQuestions = questionResults.filter(
    (result) => result.desmosOpportunity,
  );

  const desmosOpportunityQuestionsCorrectAndFast =
    desmosOpportunityQuestions.filter(
      (result) => result.isCorrect && !result.isSlow,
    ).length;

  const hardQuestions = questionResults.filter(
    (result) => result.difficulty === "hard",
  );

  const hardQuestionsCorrect = hardQuestions.filter(
    (result) => result.isCorrect,
  ).length;

  const accuracyScore = (correctAnswers / totalQuestions) * 60;
  const timingScore = (questionsWithinExpectedTime / totalQuestions) * 20;
  const strategyScore =
    desmosOpportunityQuestions.length === 0
      ? 5
      : (desmosOpportunityQuestionsCorrectAndFast /
          desmosOpportunityQuestions.length) *
        10;
  const hardReadinessScore =
    hardQuestions.length === 0
      ? 0
      : (hardQuestionsCorrect / hardQuestions.length) * 10;

  const readinessScore = Math.round(
    accuracyScore + timingScore + strategyScore + hardReadinessScore,
  );

  const [primaryLeak, secondaryLeak] = rankLeaks(leakPoints);

  const flaggedQuestions = questionResults
    .filter((result) => {
      const desmosMissed =
        result.desmosOpportunity && (!result.isCorrect || result.isSlow);

      return (
        !result.isCorrect ||
        result.isUnanswered ||
        result.isSlow ||
        result.selectedTrapAnswer ||
        desmosMissed
      );
    })
    .map((result): FlaggedQuestionDraft => {
      const leakDetected = getFlaggedLeakDetected(result);

      return {
        questionNumber: result.questionNumber,
        questionId: result.questionId,
        domain: result.domain,
        skill: result.skill,
        difficulty: result.difficulty,
        status: getFlaggedStatus(result),
        leakDetected,
        timeSpentSec: result.timeSpentSec,
        expectedTimeSec: result.estimatedTimeSec,
        selectedAnswer: result.selectedAnswer,
        correctAnswer: result.correctAnswer,
        desmosOpportunity: result.desmosOpportunity,
        trapType: result.trapType,
        selectedTrapAnswer: result.selectedTrapAnswer,
        tutorNote: result.tutorNote,
        auditPriority: getAuditPriority(result),
        explanationParent: result.explanationParent,
        fastRouteSummary: result.fastRouteSummary,
      };
    });

  const totals = {
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    unansweredQuestions,
    slowQuestionsCount: questionResults.filter((result) => result.isSlow).length,
    trapAnswersSelectedCount: questionResults.filter(
      (result) => result.selectedTrapAnswer,
    ).length,
    desmosOpportunityMissedCount: questionResults.filter(
      (result) => result.desmosOpportunity && (!result.isCorrect || result.isSlow),
    ).length,
    flaggedQuestionsCount: flaggedQuestions.length,
  };

  const skillScores = getSkillScores(questionResults);
  const scoreInterpretation = getScoreInterpretation(readinessScore);

  return {
    readinessScore,
    scoreInterpretation,
    primaryLeak,
    primaryLeakDisplayName: leakDisplayNames[primaryLeak],
    secondaryLeak,
    secondaryLeakDisplayName: leakDisplayNames[secondaryLeak],
    skillScores,
    totals,
    questionResults,
    flaggedQuestions,
    tutorAuditFocus: buildTutorAuditFocus(primaryLeak, secondaryLeak),
    recommendedNextStep: buildRecommendedNextStep(readinessScore),
  };
}
