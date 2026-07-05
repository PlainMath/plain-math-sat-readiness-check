import type { Question } from "../lib/types";

export const questions: Question[] = [
  {
    id: "q01-foundation-linear",
    questionText: "If 3x + 7 = 28, what is the value of x?",
    choices: [
      { id: "A", text: "5" },
      { id: "B", text: "7" },
      { id: "C", text: "9" },
      { id: "D", text: "11" },
    ],
    correctAnswer: "B",
    domain: "Algebra",
    skill: "Solving one-variable linear equations",
    difficulty: "easy",
    estimatedTimeSec: 35,
    desmosOpportunity: false,
    trapType: "Arithmetic reversal",
    trapAnswer: "A",
    leakTags: ["foundation_gaps", "algebra_speed"],
    explanationStudent:
      "Subtract 7 from both sides to get 3x = 21. Then divide by 3, so x = 7.",
    explanationParent:
      "This checks whether the student can quickly solve a basic linear equation without losing time or making arithmetic slips.",
    fastRouteSummary: "Subtract 7, then divide by 3.",
    tutorNote:
      "If missed or slow, check basic equation fluency before moving to harder algebra.",
  },
  {
    id: "q02-algebra-speed",
    questionText:
      "The expression 5(2x - 3) is equal to 4x + 27. What is the value of x?",
    choices: [
      { id: "A", text: "6" },
      { id: "B", text: "7" },
      { id: "C", text: "8" },
      { id: "D", text: "9" },
    ],
    correctAnswer: "B",
    domain: "Algebra",
    skill: "Distributing and solving linear equations",
    difficulty: "easy",
    estimatedTimeSec: 50,
    desmosOpportunity: false,
    trapType: "Distribution error",
    trapAnswer: "D",
    leakTags: ["algebra_speed", "foundation_gaps"],
    explanationStudent:
      "Distribute first: 10x - 15 = 4x + 27. Subtract 4x to get 6x - 15 = 27. Add 15 to get 6x = 42, so x = 7.",
    explanationParent:
      "This checks whether the student can distribute correctly and solve without turning a simple algebra problem into a long process.",
    fastRouteSummary: "Distribute, combine x-terms, then solve.",
    tutorNote:
      "Slow work here may signal weak algebra routines, not lack of understanding.",
  },
  {
    id: "q03-desmos-intersection",
    questionText:
      "Which value of x satisfies both equations y = 2x + 1 and y = -x + 10?",
    choices: [
      { id: "A", text: "2" },
      { id: "B", text: "3" },
      { id: "C", text: "4" },
      { id: "D", text: "5" },
    ],
    correctAnswer: "B",
    domain: "Algebra",
    skill: "Solving systems of linear equations",
    difficulty: "medium",
    estimatedTimeSec: 60,
    desmosOpportunity: true,
    trapType: "Misread intersection or selected wrong coordinate",
    trapAnswer: "D",
    leakTags: ["desmos_strategy", "algebra_speed"],
    explanationStudent:
      "Set the equations equal: 2x + 1 = -x + 10. Then 3x = 9, so x = 3.",
    explanationParent:
      "This checks whether the student recognizes a system problem and can solve it efficiently. On the Digital SAT, graphing both lines can also reveal the intersection quickly.",
    fastRouteSummary:
      "Set the equations equal or graph both lines and read the x-coordinate of the intersection.",
    tutorNote:
      "Good question for checking whether the student knows when Desmos is faster than manual solving.",
  },
  {
    id: "q04-word-problem-setup",
    questionText:
      "A tutoring center charges a one-time registration fee of $40 plus $25 per session. If a family paid $215 total, how many sessions did they buy?",
    choices: [
      { id: "A", text: "6" },
      { id: "B", text: "7" },
      { id: "C", text: "8" },
      { id: "D", text: "9" },
    ],
    correctAnswer: "B",
    domain: "Algebra",
    skill: "Creating and solving linear equations from context",
    difficulty: "medium",
    estimatedTimeSec: 70,
    desmosOpportunity: false,
    trapType: "Forgetting fixed fee",
    trapAnswer: "D",
    leakTags: ["adaptive_traps", "foundation_gaps", "algebra_speed"],
    explanationStudent:
      "Subtract the $40 registration fee first: 215 - 40 = 175. Then divide by 25. The family bought 7 sessions.",
    explanationParent:
      "This checks whether the student sets up the equation correctly instead of rushing into division before accounting for the fixed fee.",
    fastRouteSummary:
      "Remove the fixed fee first, then divide by the session cost.",
    tutorNote:
      "If missed, review setup discipline: what is fixed, what changes, and what the question actually asks.",
  },
  {
    id: "q05-percent-change",
    questionText:
      "A student's score on a math drill increased from 48 points to 60 points. By what percent did the score increase?",
    choices: [
      { id: "A", text: "12%" },
      { id: "B", text: "20%" },
      { id: "C", text: "25%" },
      { id: "D", text: "80%" },
    ],
    correctAnswer: "C",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percent increase",
    difficulty: "medium",
    estimatedTimeSec: 65,
    desmosOpportunity: false,
    trapType: "Using new value as denominator",
    trapAnswer: "B",
    leakTags: ["data_analysis_gap", "adaptive_traps", "foundation_gaps"],
    explanationStudent:
      "The increase is 60 - 48 = 12. Percent increase is 12 divided by the original value, 48. Since 12/48 = 0.25, the increase is 25%.",
    explanationParent:
      "This checks whether the student uses the original value as the base for percent increase, which is a common SAT Math trap.",
    fastRouteSummary: "Find the change, then divide by the original value.",
    tutorNote:
      "Useful for diagnosing percent-change confusion and denominator selection errors.",
  },
  {
    id: "q06-quadratic-factor",
    questionText:
      "If x² - 9x + 20 = 0, which of the following could be the value of x?",
    choices: [
      { id: "A", text: "2" },
      { id: "B", text: "4" },
      { id: "C", text: "6" },
      { id: "D", text: "9" },
    ],
    correctAnswer: "B",
    domain: "Advanced Math",
    skill: "Factoring quadratics",
    difficulty: "medium",
    estimatedTimeSec: 70,
    desmosOpportunity: true,
    trapType: "Incorrect factor pair",
    trapAnswer: "C",
    leakTags: ["hard_module_readiness", "desmos_strategy", "foundation_gaps"],
    explanationStudent:
      "Factor the equation: x² - 9x + 20 = (x - 4)(x - 5). So x = 4 or x = 5. Among the choices, 4 is correct.",
    explanationParent:
      "This checks whether the student can recognize a common quadratic pattern. Desmos can also help by graphing the expression and checking the x-intercepts.",
    fastRouteSummary:
      "Factor into (x - 4)(x - 5), or graph y = x² - 9x + 20 and check the zeros.",
    tutorNote:
      "If missed, check factoring fluency and whether the student knows when to use graphing strategically.",
  },
  {
    id: "q07-function-shift",
    questionText:
      "The function f is defined by f(x) = x² - 6x + 11. What is the minimum value of f(x)?",
    choices: [
      { id: "A", text: "2" },
      { id: "B", text: "3" },
      { id: "C", text: "6" },
      { id: "D", text: "11" },
    ],
    correctAnswer: "A",
    domain: "Advanced Math",
    skill: "Quadratic minimum and vertex form",
    difficulty: "medium",
    estimatedTimeSec: 75,
    desmosOpportunity: true,
    trapType: "Choosing the x-coordinate or constant term instead of the minimum value",
    trapAnswer: "B",
    leakTags: ["desmos_strategy", "hard_module_readiness", "adaptive_traps"],
    explanationStudent:
      "Rewrite x² - 6x + 11 as (x - 3)² + 2. The minimum value is 2.",
    explanationParent:
      "This checks whether the student understands what the minimum value means, not just how to plug numbers into a function.",
    fastRouteSummary:
      "Complete the square or graph the function in Desmos and read the minimum y-value.",
    tutorNote:
      "Good diagnostic for quadratic structure, Desmos use, and confusing x-value with y-value.",
  },
  {
    id: "q08-geometry-area-trap",
    questionText:
      "A rectangle has a length that is 3 more than twice its width. If the width is 5, what is the area of the rectangle?",
    choices: [
      { id: "A", text: "25" },
      { id: "B", text: "40" },
      { id: "C", text: "65" },
      { id: "D", text: "80" },
    ],
    correctAnswer: "C",
    domain: "Geometry and Trigonometry",
    skill: "Area with algebraic expression setup",
    difficulty: "medium",
    estimatedTimeSec: 65,
    desmosOpportunity: false,
    trapType: "Using perimeter-style thinking or forgetting to compute length first",
    trapAnswer: "B",
    leakTags: ["geometry_gap", "adaptive_traps", "foundation_gaps"],
    explanationStudent:
      "The width is 5. The length is 2(5) + 3 = 13. The area is 13 × 5 = 65.",
    explanationParent:
      "This checks whether the student can translate a geometry description into the right quantity before calculating.",
    fastRouteSummary:
      "Find the length first, then multiply length by width.",
    tutorNote:
      "Better than a memorized 6-8-10 triangle because it checks setup, not just formula recall.",
  },
  {
    id: "q09-trap-remaining",
    questionText:
      "A student answered 30 questions on a practice set. She answered 70% of them correctly. How many questions did she answer incorrectly?",
    choices: [
      { id: "A", text: "7" },
      { id: "B", text: "9" },
      { id: "C", text: "21" },
      { id: "D", text: "23" },
    ],
    correctAnswer: "B",
    domain: "Problem-Solving and Data Analysis",
    skill: "Percent of a quantity with careful wording",
    difficulty: "medium",
    estimatedTimeSec: 60,
    desmosOpportunity: false,
    trapType: "Answering correct instead of incorrect",
    trapAnswer: "C",
    leakTags: ["adaptive_traps", "data_analysis_gap"],
    explanationStudent:
      "If 70% were correct, then 30% were incorrect. 30% of 30 is 9.",
    explanationParent:
      "This checks whether the student answers the actual question. The trap is calculating the number correct instead of the number incorrect.",
    fastRouteSummary:
      "Incorrect percentage is 100% - 70% = 30%, then find 30% of 30.",
    tutorNote:
      "Strong trap-recognition diagnostic. If missed, review final-question reading habits.",
  },
  {
    id: "q10-speed-equation",
    questionText: "If 4x - 5 = 2x + 13, what is the value of 3x?",
    choices: [
      { id: "A", text: "9" },
      { id: "B", text: "18" },
      { id: "C", text: "27" },
      { id: "D", text: "54" },
    ],
    correctAnswer: "C",
    domain: "Algebra",
    skill: "Solving for an expression",
    difficulty: "medium",
    estimatedTimeSec: 50,
    desmosOpportunity: false,
    trapType: "Solving for x but not answering 3x",
    trapAnswer: "A",
    leakTags: ["algebra_speed", "adaptive_traps", "timing_control"],
    explanationStudent:
      "Solve first: 4x - 5 = 2x + 13. Then 2x = 18, so x = 9. The question asks for 3x, so 3x = 27.",
    explanationParent:
      "This checks whether the student notices that the question asks for 3x, not x. It is a classic SAT-style efficiency and attention trap.",
    fastRouteSummary: "Solve for x, then multiply by 3. Do not stop at x.",
    tutorNote:
      "If the student chose 9, the issue is likely not algebra knowledge but question-target discipline.",
  },
  {
    id: "q11-hard-module-system-parameter",
    questionText:
      "For what value of k does the system of equations have no solution? 2x + 3y = 12 and 4x + ky = 20",
    choices: [
      { id: "A", text: "3" },
      { id: "B", text: "4" },
      { id: "C", text: "6" },
      { id: "D", text: "8" },
    ],
    correctAnswer: "C",
    domain: "Advanced Math",
    skill: "Systems of equations with parameters",
    difficulty: "hard",
    estimatedTimeSec: 95,
    desmosOpportunity: true,
    trapType: "Making the constants proportional instead of the coefficients",
    trapAnswer: "D",
    leakTags: ["hard_module_readiness", "desmos_strategy", "adaptive_traps", "algebra_speed"],
    explanationStudent:
      "For no solution, the lines must be parallel but different. Multiplying the first equation by 2 gives 4x + 6y = 24. To match the left side of the second equation, k must be 6. Since 24 is not 20, the system has no solution.",
    explanationParent:
      "This checks whether the student understands parallel-line systems, a common harder-module SAT Math pattern.",
    fastRouteSummary:
      "Compare coefficients. The second equation needs the same x- and y-coefficients as twice the first equation, but a different constant.",
    tutorNote:
      "Strong hard-module diagnostic. If missed, review proportional coefficients, no-solution systems, and parameter handling.",
  },
  {
    id: "q12-mixed-strategy",
    questionText:
      "The function g is defined by g(x) = (x - 2)(x + 6). What is the x-coordinate of the vertex of the graph y = g(x)?",
    choices: [
      { id: "A", text: "-6" },
      { id: "B", text: "-2" },
      { id: "C", text: "2" },
      { id: "D", text: "4" },
    ],
    correctAnswer: "B",
    domain: "Advanced Math",
    skill: "Quadratic structure and vertex",
    difficulty: "hard",
    estimatedTimeSec: 90,
    desmosOpportunity: true,
    trapType: "Choosing an x-intercept instead of the midpoint",
    trapAnswer: "C",
    leakTags: ["hard_module_readiness", "desmos_strategy", "adaptive_traps"],
    explanationStudent:
      "The x-intercepts are 2 and -6. The vertex lies halfway between them. The midpoint is (2 + -6) / 2 = -2.",
    explanationParent:
      "This checks whether the student recognizes structure in a quadratic. A slower route is expanding and using a formula; a faster route is using the midpoint of the roots or graphing.",
    fastRouteSummary:
      "Find the midpoint of the two x-intercepts: 2 and -6. The midpoint is -2.",
    tutorNote:
      "Strong route-selection diagnostic. If slow, the student may know the math but miss the fastest SAT path.",
  },
];
