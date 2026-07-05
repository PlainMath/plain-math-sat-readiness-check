import type { LeakTag } from "../lib/types";

export const leakDisplayNames: Record<LeakTag, string> = {
  algebra_speed: "Algebra Speed",
  desmos_strategy: "Desmos Strategy",
  timing_control: "Timing Control",
  adaptive_traps: "Trap Recognition",
  foundation_gaps: "Foundation Gaps",
  hard_module_readiness: "Hard Module Readiness",
  geometry_gap: "Geometry Gap",
  data_analysis_gap: "Data Analysis Gap",
};

export const leakTiePriority: LeakTag[] = [
  "timing_control",
  "desmos_strategy",
  "algebra_speed",
  "foundation_gaps",
  "adaptive_traps",
  "hard_module_readiness",
  "geometry_gap",
  "data_analysis_gap",
];

export type ResultTemplate = {
  resultType: string;
  displayName: string;
  mainCopy: string;
  whatWeSaw: string;
  whatItMeans: string;
  whyItMatters: string;
  auditBridge: string;
};

export const resultTemplates: Record<LeakTag, ResultTemplate> = {
  algebra_speed: {
    resultType: "The Algebra Drag",
    displayName: "Algebra Speed",
    mainCopy:
      "Your child may understand the concepts, but too much time is being lost on manual solving.",
    whatWeSaw:
      "Algebra questions were either missed, slow, or solved with more effort than the problem required.",
    whatItMeans:
      "The issue may not be “not knowing math.” It may be weak algebra routines under time pressure.",
    whyItMatters:
      "On the Digital SAT, slow algebra can quietly damage the whole module. The student spends too long on solvable questions and has less time for harder ones.",
    auditBridge:
      "In the audit, we identify which algebra routines need to be rebuilt for speed and which problems should be solved with a faster route.",
  },

  desmos_strategy: {
    resultType: "The Desmos Gap",
    displayName: "Desmos Strategy",
    mainCopy:
      "Your child may be missing faster routes that the Digital SAT rewards.",
    whatWeSaw:
      "Some calculator-friendly questions were missed or took longer than expected.",
    whatItMeans:
      "Your child may be solving Digital SAT Math like a paper test.",
    whyItMatters:
      "On the Digital SAT, Desmos is not a bonus tool. For some questions, it is the fastest route.",
    auditBridge:
      "In the audit, we show where Desmos should replace slow manual algebra and how to choose the fastest solving path.",
  },

  timing_control: {
    resultType: "The Timing Leak",
    displayName: "Timing Control",
    mainCopy:
      "Your child may know how to solve problems, but not fast enough under test conditions.",
    whatWeSaw:
      "Several questions took longer than expected, even when the skill itself may have been familiar.",
    whatItMeans:
      "The score may be capped by pacing, not just content knowledge.",
    whyItMatters:
      "A student can “know how to do it” and still lose the point if the route is too slow.",
    auditBridge:
      "In the audit, we identify which question types are consuming too much time and build a pacing plan.",
  },

  adaptive_traps: {
    resultType: "The Adaptive Trap Pattern",
    displayName: "Trap Recognition",
    mainCopy:
      "Your child may be losing points because of wording, setup traps, or misleading answer choices.",
    whatWeSaw:
      "The selected answers suggest possible trap patterns: answering the wrong quantity, skipping a condition, or choosing a tempting intermediate result.",
    whatItMeans:
      "The student may be doing real math but losing points at the setup or final-answer stage.",
    whyItMatters:
      "Higher SAT Math scores often depend less on doing more problems and more on not giving away points on traps.",
    auditBridge:
      "In the audit, we review the exact traps and teach the checking habits needed for Digital SAT Math.",
  },

  foundation_gaps: {
    resultType: "The Foundation Gap",
    displayName: "Foundation Gaps",
    mainCopy:
      "Some core topics may need targeted repair before the score can move consistently.",
    whatWeSaw:
      "The diagnostic suggests possible weakness in baseline skills that higher-level SAT questions depend on.",
    whatItMeans:
      "Random practice may not fix the issue if the underlying skill is still unstable.",
    whyItMatters:
      "When foundations are shaky, harder questions become inconsistent even after many practice tests.",
    auditBridge:
      "In the audit, we identify which foundational topics should be repaired first so preparation does not stay random.",
  },

  hard_module_readiness: {
    resultType: "Hard Module Readiness",
    displayName: "Hard Module Readiness",
    mainCopy:
      "Your child may be close to harder-module performance, but the current result suggests some advanced questions are still unstable.",
    whatWeSaw:
      "Harder algebra, function, or quadratic-structure questions were missed or took too long.",
    whatItMeans:
      "The student may need more work on the question types that separate a mid-600s score from a 700+ score.",
    whyItMatters:
      "A 700-level score requires more than avoiding easy mistakes. The student needs a reliable plan for harder adaptive questions.",
    auditBridge:
      "In the audit, we identify which harder-module patterns are worth training first and which ones can wait.",
  },

  geometry_gap: {
    resultType: "Geometry Gap",
    displayName: "Geometry Gap",
    mainCopy:
      "Geometry may be costing points because formulas, diagrams, or setup patterns are not automatic yet.",
    whatWeSaw:
      "The diagnostic suggests possible weakness on geometry-based questions.",
    whatItMeans:
      "The student may need a tighter formula and recognition system, not more random geometry review.",
    whyItMatters:
      "Geometry questions can be quick points when the setup is automatic. Without that, they become time drains.",
    auditBridge:
      "In the audit, we identify which geometry patterns are leaking points and whether they are content gaps or setup gaps.",
  },

  data_analysis_gap: {
    resultType: "Data Analysis Gap",
    displayName: "Data Analysis Gap",
    mainCopy:
      "Percent, ratio, and data questions may be less stable than they need to be.",
    whatWeSaw:
      "The diagnostic suggests possible mistakes with percent change, quantities, or interpreting what the question is asking.",
    whatItMeans:
      "The student may be making denominator errors, rushing through wording, or setting up the wrong quantity.",
    whyItMatters:
      "Problem-Solving and Data Analysis questions are often very fixable, but only if the exact pattern is identified.",
    auditBridge:
      "In the audit, we isolate the data-analysis patterns causing mistakes and build a cleaner process for them.",
  },
};

export function getScoreInterpretation(score: number): string {
  if (score <= 39) {
    return "Not ready yet. The next jump likely requires fixing core leaks first.";
  }

  if (score <= 59) {
    return "Some readiness is there, but key leaks are likely blocking consistency.";
  }

  if (score <= 79) {
    return "Close, but strategy and timing may be limiting the score.";
  }

  return "Strong readiness signal. The next step is precision work.";
}
