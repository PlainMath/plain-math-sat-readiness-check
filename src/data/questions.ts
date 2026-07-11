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
    id: "q07-quadratic-minimum",
    questionText:
      "The function f is defined by f(x) = x² - 8x + 19. What is the minimum value of f(x)?",
    choices: [
      { id: "A", text: "3" },
      { id: "B", text: "4" },
      { id: "C", text: "8" },
      { id: "D", text: "19" },
    ],
    correctAnswer: "A",
    domain: "Advanced Math",
    skill: "Quadratic minimum and vertex form",
    difficulty: "medium",
    estimatedTimeSec: 85,
    desmosOpportunity: true,
    trapType: "Choosing the x-coordinate of the vertex instead of the minimum value",
    trapAnswer: "B",
    leakTags: ["desmos_strategy", "hard_module_readiness", "adaptive_traps"],
    explanationStudent:
      "Rewrite x² - 8x + 19 as (x - 4)² + 3. The minimum value is 3.",
    explanationParent:
      "This checks whether the student understands the difference between the x-coordinate of the vertex and the minimum y-value.",
    fastRouteSummary:
      "Complete the square or graph in Desmos and read the minimum y-value.",
    tutorNote:
      "Strong Desmos and quadratic-structure diagnostic. Choosing 4 suggests the student found the vertex x-value but answered the wrong quantity.",
  },
  {
    id: "q08-similar-triangles-area-scale",
    questionText:
      "Triangle A is similar to Triangle B. A side of Triangle A has length 6, and the corresponding side of Triangle B has length 15. If the area of Triangle A is 20, what is the area of Triangle B?",
    choices: [
      { id: "A", text: "50" },
      { id: "B", text: "80" },
      { id: "C", text: "125" },
      { id: "D", text: "250" },
    ],
    correctAnswer: "C",
    domain: "Geometry and Trigonometry",
    skill: "Area scale factor in similar figures",
    difficulty: "hard",
    estimatedTimeSec: 95,
    desmosOpportunity: false,
    trapType: "Using linear scale factor instead of area scale factor",
    trapAnswer: "A",
    leakTags: ["geometry_gap", "adaptive_traps", "hard_module_readiness"],
    explanationStudent:
      "The side length scale factor from Triangle A to Triangle B is 15/6 = 2.5. Areas scale by the square of the side factor, so the area scale factor is 2.5² = 6.25. The area of Triangle B is 20 × 6.25 = 125.",
    explanationParent:
      "This checks a common harder geometry trap: areas do not scale the same way side lengths do.",
    fastRouteSummary:
      "Find the side scale factor, square it, then multiply the original area.",
    tutorNote:
      "Good hard geometry diagnostic. If missed, review similarity, scale factors, and area scaling.",
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
    id: "q10-contextual-linear-model-delivery",
    questionText:
      "A delivery company charges a fixed booking fee plus a constant amount per mile. A 14-mile delivery costs $51, and a 38-mile delivery costs $99. At the same rates, how many miles is a delivery that costs $137?",
    choices: [
      { id: "A", text: "45" },
      { id: "B", text: "52" },
      { id: "C", text: "57" },
      { id: "D", text: "68" },
    ],
    correctAnswer: "C",
    domain: "Problem-Solving and Data Analysis",
    skill: "Building and using a contextual linear model",
    difficulty: "hard",
    estimatedTimeSec: 110,
    desmosOpportunity: true,
    trapType: "Ignoring the fixed fee or using the total cost as the per-mile rate",
    trapAnswer: "D",
    leakTags: ["data_analysis_gap", "desmos_strategy", "adaptive_traps", "algebra_speed"],
    explanationStudent:
      "The cost increases from $51 to $99 when the distance increases from 14 to 38 miles. That is $48 over 24 miles, so the rate is $2 per mile. The fixed fee is 51 - 2(14) = 23. For a $137 delivery, solve 137 = 23 + 2m, so 2m = 114 and m = 57.",
    explanationParent:
      "This checks whether the student can translate a longer word problem into a linear model with a fixed fee and a per-mile rate.",
    fastRouteSummary:
      "Find the slope from the two deliveries, find the fixed fee, then solve the model backward for miles.",
    tutorNote:
      "This is a better SAT-style applied word problem. It tests setup, units, rate interpretation, and reverse use of a model.",
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
