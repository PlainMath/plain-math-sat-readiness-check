export type ChoiceId = "A" | "B" | "C" | "D";

export type Domain =
  | "Algebra"
  | "Advanced Math"
  | "Problem-Solving and Data Analysis"
  | "Geometry and Trigonometry";

export type Difficulty = "easy" | "medium" | "hard";

export type LeakTag =
  | "algebra_speed"
  | "desmos_strategy"
  | "timing_control"
  | "adaptive_traps"
  | "foundation_gaps"
  | "hard_module_readiness"
  | "geometry_gap"
  | "data_analysis_gap";

export type Question = {
  id: string;
  questionText: string;
  choices: {
    id: ChoiceId;
    text: string;
  }[];
  correctAnswer: ChoiceId;
  domain: Domain;
  skill: string;
  difficulty: Difficulty;
  estimatedTimeSec: number;
  desmosOpportunity: boolean;
  trapType?: string;
  trapAnswer?: ChoiceId;
  leakTags: LeakTag[];
  explanationStudent: string;
  explanationParent: string;
  fastRouteSummary: string;
  tutorNote: string;
};

export type IntakeData = {
  parentFirstName: string;
  parentEmail: string;
  parentPhone?: string;
  studentFirstName: string;
  grade: "9th" | "10th" | "11th" | "12th" | "Other";
  currentScoreRange:
    | "Below 500"
    | "500–550"
    | "550–600"
    | "600–650"
    | "650+"
    | "Not sure";
  targetScore: "650" | "700" | "750+" | "Not sure";
  upcomingSatDate:
    | "August SAT"
    | "October SAT"
    | "November SAT"
    | "December SAT"
    | "Not sure";
  biggestConcern:
    | "Score is stuck"
    | "Timing problems"
    | "Algebra mistakes"
    | "Weak Desmos strategy"
    | "Hard module questions"
    | "Not sure";
  currentPrepMethod:
    | "Self-study"
    | "School prep"
    | "Private tutor"
    | "Online course"
    | "Practice tests only"
    | "Not much yet";
  weeklyStudyHours: "Less than 2" | "2–4" | "5–7" | "8+";
  desmosConfidence:
    | "Not confident"
    | "Somewhat confident"
    | "Confident"
    | "Not sure";
  parentConsent: boolean;
};

export type QuestionResponse = {
  questionId: string;
  selectedAnswer: ChoiceId | null;
  timeSpentSec: number;
};

export type QuestionStatus =
  | "Correct"
  | "Incorrect"
  | "Unanswered"
  | "Slow"
  | "Trap Selected";

export type QuestionResult = {
  reportId?: string;
  questionNumber: number;
  questionId: string;
  domain: Domain;
  skill: string;
  difficulty: Difficulty;
  estimatedTimeSec: number;
  timeSpentSec: number;
  selectedAnswer: ChoiceId | null;
  correctAnswer: ChoiceId;
  isCorrect: boolean;
  isUnanswered: boolean;
  isSlow: boolean;
  status: QuestionStatus;
  desmosOpportunity: boolean;
  trapType?: string;
  trapAnswer?: ChoiceId;
  selectedTrapAnswer: boolean;
  leakTags: LeakTag[];
  leakSignalsGenerated: LeakTag[];
  explanationParent: string;
  fastRouteSummary: string;
  tutorNote: string;
};

export type FlaggedQuestionDraft = {
  questionNumber: number;
  questionId: string;
  domain: Domain;
  skill: string;
  difficulty: Difficulty;
  status:
    | "Incorrect"
    | "Unanswered"
    | "Slow"
    | "Trap Selected"
    | "Desmos Opportunity Missed";
  leakDetected: string;
  timeSpentSec: number;
  expectedTimeSec: number;
  selectedAnswer: ChoiceId | null;
  correctAnswer: ChoiceId;
  desmosOpportunity: boolean;
  trapType?: string;
  selectedTrapAnswer: boolean;
  tutorNote: string;
  auditPriority: "High" | "Medium" | "Low";
  explanationParent: string;
  fastRouteSummary: string;
};

export type SkillScores = {
  algebraSpeed: number;
  desmosStrategy: number;
  timingControl: number;
  trapRecognition: number;
  foundationStrength: number;
  hardModuleReadiness: number;
};

export type ResultTotals = {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  slowQuestionsCount: number;
  trapAnswersSelectedCount: number;
  desmosOpportunityMissedCount: number;
  flaggedQuestionsCount: number;
};

export type ScoredResult = {
  readinessScore: number;
  scoreInterpretation: string;
  primaryLeak: LeakTag;
  primaryLeakDisplayName: string;
  secondaryLeak: LeakTag;
  secondaryLeakDisplayName: string;
  skillScores: SkillScores;
  totals: ResultTotals;
  questionResults: QuestionResult[];
  flaggedQuestions: FlaggedQuestionDraft[];
  tutorAuditFocus: string;
  recommendedNextStep: string;
};

export type FinalFlaggedQuestion = FlaggedQuestionDraft & {
  reportId: string;
  submittedAt: string;
  parentEmail: string;
  studentFirstName: string;
};

export type TutorAuditPacket = {
  reportId: string;
  submittedAt: string;
  source: "plain_math_sat_readiness_check";
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  intake: IntakeData;
  result: {
    readinessScore: number;
    scoreInterpretation: string;
    primaryLeak: LeakTag;
    primaryLeakDisplayName: string;
    secondaryLeak: LeakTag;
    secondaryLeakDisplayName: string;
    skillScores: SkillScores;
    totals: ResultTotals;
    tutorAuditFocus: string;
    recommendedNextStep: string;
  };
  questionResults: QuestionResult[];
  flaggedQuestions: FinalFlaggedQuestion[];
  auditTracking: {
    auditBookingClicked: boolean;
    auditBookingClickedAt?: string;
  };
  fullReportJson: string;
};

export type SaveStatus = "idle" | "saving" | "success" | "error";
