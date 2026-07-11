export type SkillNarrativeKey =
  | "algebraSpeed"
  | "desmosStrategy"
  | "timingControl"
  | "trapRecognition"
  | "foundationStrength"
  | "hardModuleReadiness";

type SkillBand =
  | "critical"
  | "unstable"
  | "developing"
  | "strong"
  | "excellent";

export type SkillNarrative = {
  title: string;
  whatWeSaw: string;
  whatItMeans: string;
  whyItMatters: string;
};

function getScoreBand(score: number): SkillBand {
  if (score <= 39) return "critical";
  if (score <= 59) return "unstable";
  if (score <= 74) return "developing";
  if (score <= 89) return "strong";
  return "excellent";
}

const skillNarratives: Record<SkillNarrativeKey, Record<SkillBand, SkillNarrative>> = {
  algebraSpeed: {
    critical: {
      title: "Algebra Speed",
      whatWeSaw: "Algebra questions were missed or took substantially longer than expected.",
      whatItMeans: "Algebra fluency is likely a primary score leak right now.",
      whyItMatters: "Slow or unstable algebra can cap the whole module, even when the student understands the topic.",
    },
    unstable: {
      title: "Algebra Speed",
      whatWeSaw: "Some algebra work was accurate, but speed and consistency were uneven.",
      whatItMeans: "The student may know the procedures but does not yet execute them automatically under time pressure.",
      whyItMatters: "A 600 → 700 jump usually requires algebra routines to become faster and more reliable.",
    },
    developing: {
      title: "Algebra Speed",
      whatWeSaw: "Algebra performance was workable, but not yet fully automatic.",
      whatItMeans: "The foundation is present, but some routes may still be too manual or too slow.",
      whyItMatters: "At higher score levels, algebra speed protects time for harder module questions.",
    },
    strong: {
      title: "Algebra Speed",
      whatWeSaw: "Algebra was mostly accurate and reasonably efficient.",
      whatItMeans: "This does not look like the main score leak, though a few routines may still need tightening.",
      whyItMatters: "Small algebra inefficiencies can still matter when the target is 700+.",
    },
    excellent: {
      title: "Algebra Speed",
      whatWeSaw: "Algebra questions were handled accurately and efficiently in this check.",
      whatItMeans: "This check did not detect a meaningful algebra-speed leak.",
      whyItMatters: "That is a strong signal. The next gains are more likely to come from harder problems, traps, or precision work.",
    },
  },

  desmosStrategy: {
    critical: {
      title: "Desmos Strategy",
      whatWeSaw: "Several calculator-friendly questions were missed or took too long.",
      whatItMeans: "The student may still be treating Digital SAT Math like a paper-and-pencil test.",
      whyItMatters: "Desmos can turn some long algebra problems into short verification problems. Missing those routes costs time and points.",
    },
    unstable: {
      title: "Desmos Strategy",
      whatWeSaw: "Some Desmos-friendly routes were used well, but usage was inconsistent.",
      whatItMeans: "The student may know Desmos features but not yet recognize when to use them.",
      whyItMatters: "The Digital SAT rewards route selection. Knowing math is not enough if the chosen route is too slow.",
    },
    developing: {
      title: "Desmos Strategy",
      whatWeSaw: "Desmos strategy showed some strength, but missed opportunities still appeared.",
      whatItMeans: "The student is developing calculator judgment but may need clearer decision rules.",
      whyItMatters: "Consistent Desmos use can reduce algebra load and improve pacing.",
    },
    strong: {
      title: "Desmos Strategy",
      whatWeSaw: "Most calculator-friendly questions were handled well.",
      whatItMeans: "Desmos does not appear to be a major leak, though there may still be a few faster routes to train.",
      whyItMatters: "At 700-level, the difference is often not whether the student can solve, but whether they choose the fastest reliable route.",
    },
    excellent: {
      title: "Desmos Strategy",
      whatWeSaw: "Desmos-opportunity questions were answered correctly and efficiently.",
      whatItMeans: "This check did not detect a meaningful Desmos strategy leak.",
      whyItMatters: "That is a strong Digital SAT signal. The next work should focus on precision, traps, and harder-module execution.",
    },
  },

  timingControl: {
    critical: {
      title: "Timing Control",
      whatWeSaw: "Multiple questions crossed the expected time range or were left unanswered.",
      whatItMeans: "Pacing is likely a primary score leak.",
      whyItMatters: "A student can know the math and still lose points if the route takes too long.",
    },
    unstable: {
      title: "Timing Control",
      whatWeSaw: "Timing was uneven across the check.",
      whatItMeans: "The student may be spending too long on certain question types instead of making faster decisions.",
      whyItMatters: "Inconsistent pacing makes the final score less predictable.",
    },
    developing: {
      title: "Timing Control",
      whatWeSaw: "Most questions were completed in a workable range, but pacing was not fully controlled.",
      whatItMeans: "The student is close, but a few slow routes may still create pressure later in the module.",
      whyItMatters: "The 600s to 700 jump often depends on removing these small time drains.",
    },
    strong: {
      title: "Timing Control",
      whatWeSaw: "Timing was mostly controlled, with only limited slowdown.",
      whatItMeans: "Pacing does not appear to be the main issue, though a few question types may still need speed work.",
      whyItMatters: "Strong timing creates room for checking and harder questions.",
    },
    excellent: {
      title: "Timing Control",
      whatWeSaw: "Questions were completed within the expected timing range.",
      whatItMeans: "This check did not detect a meaningful pacing leak.",
      whyItMatters: "That is a strong readiness signal. The next step is maintaining speed while increasing difficulty.",
    },
  },

  trapRecognition: {
    critical: {
      title: "Trap Recognition",
      whatWeSaw: "Several selected answers matched predictable SAT-style trap patterns.",
      whatItMeans: "The student may be doing real math but losing points at the setup or final-answer stage.",
      whyItMatters: "Trap mistakes are expensive because they often happen on questions the student could have solved.",
    },
    unstable: {
      title: "Trap Recognition",
      whatWeSaw: "Some trap answers were avoided, but trap recognition was not consistent.",
      whatItMeans: "The student may need a more deliberate final-check habit.",
      whyItMatters: "At higher scores, avoiding preventable traps matters as much as learning new content.",
    },
    developing: {
      title: "Trap Recognition",
      whatWeSaw: "Trap handling was mixed but improving.",
      whatItMeans: "The student is not blindly falling for every trap, but some wording or target-answer mistakes remain.",
      whyItMatters: "This is one of the most fixable score leaks when the exact pattern is identified.",
    },
    strong: {
      title: "Trap Recognition",
      whatWeSaw: "Most trap patterns were handled well.",
      whatItMeans: "Trap recognition is not the main leak, though precision checks may still help.",
      whyItMatters: "Strong trap control protects points on questions the student already knows how to solve.",
    },
    excellent: {
      title: "Trap Recognition",
      whatWeSaw: "The check did not detect meaningful trap-answer selection.",
      whatItMeans: "The student showed strong answer-target discipline in this sample.",
      whyItMatters: "That is a strong signal for 700-level execution, where preventable misses become very costly.",
    },
  },

  foundationStrength: {
    critical: {
      title: "Foundation Strength",
      whatWeSaw: "Baseline skills appeared unstable on this check.",
      whatItMeans: "Harder practice may not help much until the core routines are repaired.",
      whyItMatters: "A 700-level score depends on fast, reliable foundations.",
    },
    unstable: {
      title: "Foundation Strength",
      whatWeSaw: "Some foundational skills were present, but reliability was inconsistent.",
      whatItMeans: "The student may have topic familiarity without automatic execution.",
      whyItMatters: "Unstable foundations make harder module questions much less predictable.",
    },
    developing: {
      title: "Foundation Strength",
      whatWeSaw: "Foundational performance was generally workable, with some weak spots.",
      whatItMeans: "The student likely needs targeted repair, not broad review of everything.",
      whyItMatters: "Fixing the right foundation gaps can quickly improve consistency.",
    },
    strong: {
      title: "Foundation Strength",
      whatWeSaw: "Foundational skills looked mostly stable.",
      whatItMeans: "The main score leak is probably not basic content, though a few routines may still need tightening.",
      whyItMatters: "Stable foundations allow preparation to focus on harder and more strategic question types.",
    },
    excellent: {
      title: "Foundation Strength",
      whatWeSaw: "Baseline skills were handled accurately and efficiently.",
      whatItMeans: "This check did not detect a meaningful foundation gap.",
      whyItMatters: "That is a strong base for higher-level SAT Math work.",
    },
  },

  hardModuleReadiness: {
    critical: {
      title: "Hard Module Readiness",
      whatWeSaw: "Harder questions were missed or took too long.",
      whatItMeans: "The student may not yet be ready to handle harder adaptive-module patterns reliably.",
      whyItMatters: "The jump from the 600s to 700 often depends on these harder question types.",
    },
    unstable: {
      title: "Hard Module Readiness",
      whatWeSaw: "Some harder questions were within reach, but consistency was limited.",
      whatItMeans: "The student may understand parts of the content but needs more structured hard-question strategy.",
      whyItMatters: "Harder questions require both content knowledge and efficient setup choices.",
    },
    developing: {
      title: "Hard Module Readiness",
      whatWeSaw: "Hard-module performance showed promise, but not full reliability.",
      whatItMeans: "The student is approaching the right level but still needs targeted practice on advanced patterns.",
      whyItMatters: "This is where many students get stuck in the mid-600s.",
    },
    strong: {
      title: "Hard Module Readiness",
      whatWeSaw: "Harder questions were mostly handled well.",
      whatItMeans: "The student shows real 700-track potential, with some precision work still needed.",
      whyItMatters: "At this stage, the goal is not more random practice but sharper execution.",
    },
    excellent: {
      title: "Hard Module Readiness",
      whatWeSaw: "Harder questions were handled accurately and efficiently in this check.",
      whatItMeans: "This check shows a strong hard-module readiness signal.",
      whyItMatters: "The next step is maintaining that performance across full-length adaptive practice.",
    },
  },
};

export function getSkillNarrative(
  key: SkillNarrativeKey,
  score: number,
): SkillNarrative {
  return skillNarratives[key][getScoreBand(score)];
}
