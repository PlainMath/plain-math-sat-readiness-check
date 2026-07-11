import type { Question } from "../lib/types";

export const questions: Question[] = [
  {
    id: "q01-linear-expression-target",
    questionText:
      "If 5x - 7 = 3x + 17, what is the value of 2x - 1?",
    choices: [
      { id: "A", text: "11" },
      { id: "B", text: "21" },
      { id: "C", text: "23" },
      { id: "D", text: "47" },
    ],
    correctAnswer: "C",
    domain: "Algebra",
    skill: "Solving a linear equation and answering the requested expression",
    difficulty: "easy",
    estimatedTimeSec: 55,
    desmosOpportunity: false,
    trapType: "Solving for x but not answering the expression",
    trapAnswer: "A",
    leakTags: ["algebra_speed", "adaptive_traps", "foundation_gaps"],
    explanationStudent:
      "Solve 5x - 7 = 3x + 17 to get 2x = 24, so x = 12. The question asks for 2x - 1, which is 24 - 1 = 23.",
    explanationParent:
      "This checks whether the student solves the equation and then answers the actual target, not just x.",
    fastRouteSummary:
      "Solve for 2x directly: 2x = 24, so 2x - 1 = 23.",
    tutorNote:
      "If the student chose 11, they solved for x but missed the requested expression. This is a common avoidable SAT leak.",
  },
  {
    id: "q02-linear-system-elimination",
    questionText:
      "The system of equations 2x + 3y = 24 and 2x - y = 8 has solution (x, y). What is the value of x + y?",
    choices: [
      { id: "A", text: "6" },
      { id: "B", text: "8" },
      { id: "C", text: "10" },
      { id: "D", text: "12" },
    ],
    correctAnswer: "C",
    domain: "Algebra",
    skill: "Solving systems efficiently",
    difficulty: "medium",
    estimatedTimeSec: 75,
    desmosOpportunity: true,
    trapType: "Finding one variable but not the requested sum",
    trapAnswer: "A",
    leakTags: ["algebra_speed", "desmos_strategy", "adaptive_traps"],
    explanationStudent:
      "Subtract the second equation from the first: 4y = 16, so y = 4. Then 2x - 4 = 8, so 2x = 12 and x = 6. Therefore x + y = 10.",
    explanationParent:
      "This checks whether the student can solve a system efficiently and answer the requested expression.",
    fastRouteSummary:
      "Eliminate x, solve for y, substitute, then add x + y.",
    tutorNote:
      "Good diagnostic for algebra speed and answer-target discipline. If the student selects 6, they found x but did not answer x + y.",
  },
  {
    id: "q03-linear-equation-from-points",
    questionText:
      "A line passes through the points (2, 9) and (6, 21). Which equation represents the line?",
    choices: [
      { id: "A", text: "y = 2x + 5" },
      { id: "B", text: "y = 3x + 3" },
      { id: "C", text: "y = 4x + 1" },
      { id: "D", text: "y = 6x - 3" },
    ],
    correctAnswer: "B",
    domain: "Algebra",
    skill: "Finding a linear equation from two points",
    difficulty: "medium",
    estimatedTimeSec: 70,
    desmosOpportunity: true,
    trapType: "Using rise as slope without dividing by run",
    trapAnswer: "D",
    leakTags: ["algebra_speed", "desmos_strategy", "foundation_gaps"],
    explanationStudent:
      "The slope is (21 - 9) / (6 - 2) = 12/4 = 3. Using y = 3x + b and point (2, 9), we get 9 = 6 + b, so b = 3. The equation is y = 3x + 3.",
    explanationParent:
      "This checks slope, intercept, and whether the student can avoid a common slope trap.",
    fastRouteSummary:
      "Find slope first, then plug one point into y = mx + b. Desmos can also verify which choice passes through both points.",
    tutorNote:
      "Good diagnostic for slope fluency and checking answer choices with Desmos.",
  },
  {
    id: "q04-percent-compound-trap",
    questionText:
      "A price is increased by 20% and then the new price is decreased by 20%. The final price is what percent of the original price?",
    choices: [
      { id: "A", text: "80%" },
      { id: "B", text: "96%" },
      { id: "C", text: "100%" },
      { id: "D", text: "104%" },
    ],
    correctAnswer: "B",
    domain: "Problem-Solving and Data Analysis",
    skill: "Successive percent change",
    difficulty: "medium",
    estimatedTimeSec: 70,
    desmosOpportunity: false,
    trapType: "Assuming equal percent increase and decrease cancel",
    trapAnswer: "C",
    leakTags: ["data_analysis_gap", "adaptive_traps", "foundation_gaps"],
    explanationStudent:
      "Let the original price be 100. After a 20% increase, it becomes 120. After a 20% decrease, it becomes 96. The final price is 96% of the original.",
    explanationParent:
      "This checks whether the student understands that percent changes are based on different starting amounts.",
    fastRouteSummary:
      "Use 100 as the starting value, then apply each percent change in order.",
    tutorNote:
      "Strong trap question. Students who choose 100% are often reasoning verbally instead of tracking the base value.",
  },
  {
    id: "q05-function-composition",
    questionText:
      "If f(x) = 2x - 5 and g(x) = x² + 1, what is the value of g(f(4))?",
    choices: [
      { id: "A", text: "10" },
      { id: "B", text: "14" },
      { id: "C", text: "16" },
      { id: "D", text: "50" },
    ],
    correctAnswer: "A",
    domain: "Advanced Math",
    skill: "Function notation and composition",
    difficulty: "medium",
    estimatedTimeSec: 75,
    desmosOpportunity: true,
    trapType: "Evaluating f(g(4)) instead of g(f(4))",
    trapAnswer: "D",
    leakTags: ["foundation_gaps", "adaptive_traps", "hard_module_readiness", "desmos_strategy"],
    explanationStudent:
      "First find f(4): 2(4) - 5 = 3. Then find g(3): 3² + 1 = 10.",
    explanationParent:
      "This checks whether the student can follow function notation in the correct order.",
    fastRouteSummary:
      "Work from the inside out: f(4) first, then plug that result into g.",
    tutorNote:
      "Good diagnostic for function-order traps, common in higher-scoring ranges.",
  },
  {
    id: "q06-quadratic-minimum-parameter",
    questionText:
      "For some constant k, the function f(x) = x² - 6x + k has a minimum value of -5. What is the value of k?",
    choices: [
      { id: "A", text: "-14" },
      { id: "B", text: "-5" },
      { id: "C", text: "4" },
      { id: "D", text: "14" },
    ],
    correctAnswer: "C",
    domain: "Advanced Math",
    skill: "Quadratic vertex form with a parameter",
    difficulty: "hard",
    estimatedTimeSec: 90,
    desmosOpportunity: true,
    trapType: "Confusing the minimum value with the parameter value",
    trapAnswer: "B",
    leakTags: ["hard_module_readiness", "desmos_strategy", "adaptive_traps"],
    explanationStudent:
      "Rewrite x² - 6x + k as (x - 3)² + k - 9. The minimum value is k - 9. Since the minimum is -5, k - 9 = -5, so k = 4.",
    explanationParent:
      "This checks whether the student can connect vertex form, minimum value, and an unknown parameter.",
    fastRouteSummary:
      "Complete the square: x² - 6x + k = (x - 3)² + k - 9. Set k - 9 equal to -5.",
    tutorNote:
      "Good hard-module diagnostic. Choosing -5 suggests the student copied the minimum value instead of solving for the parameter.",
  },
  {
    id: "q07-quadratic-roots-minimum-gap",
    questionText:
      "The quadratic function f is defined by f(x) = (x - r)(x - s), where r and s are real constants. The minimum value of f is -25. What is |r - s|?",
    choices: [
      { id: "A", text: "5" },
      { id: "B", text: "20" },
      { id: "C", text: "25" },
      { id: "D", text: "10" },
    ],
    correctAnswer: "D",
    domain: "Advanced Math",
    skill: "Connecting roots, vertex, and minimum value",
    difficulty: "hard",
    estimatedTimeSec: 95,
    desmosOpportunity: true,
    trapType:
      "Using the magnitude of the minimum value as the distance between the roots",
    trapAnswer: "C",
    leakTags: [
      "hard_module_readiness",
      "desmos_strategy",
      "adaptive_traps",
      "algebra_speed",
    ],
    explanationStudent:
      "The vertex is halfway between the roots. At x = (r + s)/2, the two factors are opposites, each with magnitude |r - s|/2. Therefore, the minimum value is -(r - s)^2/4. Since -(r - s)^2/4 = -25, (r - s)^2 = 100, so |r - s| = 10.",
    explanationParent:
      "This checks whether the student can connect the roots of a quadratic to its vertex and minimum value instead of relying on a memorized completing-the-square routine.",
    fastRouteSummary:
      "For a monic quadratic written from its roots, minimum value = -(distance between roots)^2/4.",
    tutorNote:
      "A strong harder-module question because the required relationship is not stated directly. Choosing 25 suggests the student confused the minimum value with the distance between the roots.",
  },
  {
    id: "q08-circle-tangent-diagonal-point",
    questionText:
      "In the xy-plane, a circle has center (4, -2) and is tangent to the line x = 10. The point (4 + a, -2 + a) lies on the circle, where a > 0. What is the value of a?",
    choices: [
      { id: "A", text: "3√2" },
      { id: "B", text: "3" },
      { id: "C", text: "6" },
      { id: "D", text: "6√2" },
    ],
    correctAnswer: "A",
    domain: "Geometry and Trigonometry",
    skill: "Circle radius and coordinate distance",
    difficulty: "hard",
    estimatedTimeSec: 90,
    desmosOpportunity: true,
    trapType:
      "Treating the two equal coordinate changes as one horizontal distance",
    trapAnswer: "B",
    leakTags: [
      "geometry_gap",
      "adaptive_traps",
      "hard_module_readiness",
      "desmos_strategy",
    ],
    explanationStudent:
      "Because the circle is tangent to x = 10 and its center has x-coordinate 4, the radius is 10 - 4 = 6. From the center to the point (4 + a, -2 + a), both the horizontal and vertical changes are a. Therefore, a^2 + a^2 = 6^2. Thus 2a^2 = 36, a^2 = 18, and since a > 0, a = 3√2.",
    explanationParent:
      "This checks whether the student can combine a tangent-line radius with the distance formula in a coordinate geometry setting.",
    fastRouteSummary:
      "Find the radius from the tangent line, then use a^2 + a^2 = r^2.",
    tutorNote:
      "This is harder than a direct circle-equation question because the radius and the point relationship must both be inferred.",
  },
  {
    id: "q09-mean-median-trap",
    questionText:
      "The numbers 8, 10, 14, 18, and x have a mean of 14. What is the median of the five numbers?",
    choices: [
      { id: "A", text: "10" },
      { id: "B", text: "14" },
      { id: "C", text: "18" },
      { id: "D", text: "20" },
    ],
    correctAnswer: "B",
    domain: "Problem-Solving and Data Analysis",
    skill: "Mean and median with an unknown value",
    difficulty: "medium",
    estimatedTimeSec: 80,
    desmosOpportunity: false,
    trapType: "Stopping after finding x instead of finding the median",
    trapAnswer: "D",
    leakTags: ["data_analysis_gap", "adaptive_traps", "algebra_speed"],
    explanationStudent:
      "If the mean is 14 for five numbers, their total is 70. The known numbers add to 50, so x = 20. The ordered list is 8, 10, 14, 18, 20. The median is 14.",
    explanationParent:
      "This checks whether the student answers the final question after solving for the missing value.",
    fastRouteSummary:
      "Find the total from the mean, solve for x, then order the list and find the middle value.",
    tutorNote:
      "A student who chooses 20 is solving but not answering. That is a classic SAT trap pattern.",
  },
  {
    id: "q10-contextual-linear-model-membership",
    questionText:
      "A community center charges a one-time registration fee and a constant monthly membership fee. One family paid a total of $286 for 4 months, and another family paid a total of $442 for 7 months. Families that prepay for 12 months receive a 10% discount on the entire cost after the registration fee and monthly charges are combined. How much would a 12-month prepayment cost after the discount?",
    choices: [
      { id: "A", text: "$561.60" },
      { id: "B", text: "$639.60" },
      { id: "C", text: "$702.00" },
      { id: "D", text: "$631.80" },
    ],
    correctAnswer: "D",
    domain: "Problem-Solving and Data Analysis",
    skill: "Building and applying a contextual linear model",
    difficulty: "hard",
    estimatedTimeSec: 110,
    desmosOpportunity: true,
    trapType:
      "Applying the discount only to the monthly charges instead of the entire cost",
    trapAnswer: "B",
    leakTags: [
      "data_analysis_gap",
      "desmos_strategy",
      "adaptive_traps",
      "algebra_speed",
      "hard_module_readiness",
    ],
    explanationStudent:
      "The cost increases by $442 - $286 = $156 over 7 - 4 = 3 additional months, so the monthly fee is $52. The registration fee is $286 - 4($52) = $78. The full 12-month cost is $78 + 12($52) = $702. Applying the 10% discount gives 0.90($702) = $631.80.",
    explanationParent:
      "This checks whether the student can extract a rate and fixed fee from two real-world data points, extend the model, and then correctly apply a percent adjustment.",
    fastRouteSummary:
      "Find the monthly rate from the change in cost, recover the fixed fee, calculate 12 months, then multiply the entire total by 0.90.",
    tutorNote:
      "This is a longer applied SAT-style problem. It tests model construction, units, fixed-versus-variable cost, and correct interpretation of the discount.",
  },
  {
    id: "q11-system-parameter-no-solution",
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
    estimatedTimeSec: 105,
    desmosOpportunity: true,
    trapType: "Making constants proportional instead of coefficients",
    trapAnswer: "D",
    leakTags: ["hard_module_readiness", "desmos_strategy", "adaptive_traps", "algebra_speed"],
    explanationStudent:
      "For no solution, the equations must represent parallel lines with different constants. Multiplying the first equation by 2 gives 4x + 6y = 24. The second equation is 4x + ky = 20, so k must be 6. The constants are different, so the lines are parallel and do not intersect.",
    explanationParent:
      "This checks whether the student understands parameter systems, a common harder-module pattern.",
    fastRouteSummary:
      "Match the x- and y-coefficients to make the lines parallel, but keep the constants different.",
    tutorNote:
      "Strong hard-module readiness question. If missed, review no-solution systems and coefficient proportionality.",
  },
  {
    id: "q12-quadratic-scaled-factored-form",
    questionText:
      "The quadratic function h is defined by h(x) = a(x + 2)(x - 8), where a is a constant. If h(0) = -32, what is h(5)?",
    choices: [
      { id: "A", text: "-48" },
      { id: "B", text: "-42" },
      { id: "C", text: "30" },
      { id: "D", text: "42" },
    ],
    correctAnswer: "B",
    domain: "Advanced Math",
    skill: "Using factored form with a scale factor",
    difficulty: "hard",
    estimatedTimeSec: 105,
    desmosOpportunity: true,
    trapType: "Losing the negative sign when evaluating the factored expression",
    trapAnswer: "D",
    leakTags: ["hard_module_readiness", "desmos_strategy", "adaptive_traps"],
    explanationStudent:
      "Use h(0) = -32. Since h(0) = a(0 + 2)(0 - 8) = -16a, we get -16a = -32, so a = 2. Then h(5) = 2(5 + 2)(5 - 8) = 2(7)(-3) = -42.",
    explanationParent:
      "This checks whether the student can use factored form, solve for a scale factor, and evaluate the function without losing the sign.",
    fastRouteSummary:
      "Plug in x = 0 to solve for a, then plug in x = 5. Desmos can also evaluate the function quickly after a is found.",
    tutorNote:
      "Good hard-module question because it requires two linked steps and careful sign control.",
  },
];
