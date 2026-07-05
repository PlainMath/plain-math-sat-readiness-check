import { useState } from "react";
import { DESMOS_URL } from "../lib/constants";
import type { IntakeData } from "../lib/types";

type IntakeFormProps = {
  onSubmit: (data: IntakeData) => void;
  onBack: () => void;
};

type FormState = {
  parentFirstName: string;
  parentEmail: string;
  parentPhone: string;
  studentFirstName: string;
  grade: string;
  currentScoreRange: string;
  targetScore: string;
  upcomingSatDate: string;
  biggestConcern: string;
  currentPrepMethod: string;
  weeklyStudyHours: string;
  desmosConfidence: string;
  parentConsent: boolean;
};

const initialForm: FormState = {
  parentFirstName: "",
  parentEmail: "",
  parentPhone: "",
  studentFirstName: "",
  grade: "",
  currentScoreRange: "",
  targetScore: "",
  upcomingSatDate: "",
  biggestConcern: "",
  currentPrepMethod: "",
  weeklyStudyHours: "",
  desmosConfidence: "",
  parentConsent: false,
};

const gradeOptions = ["9th", "10th", "11th", "12th", "Other"] as const;
const currentScoreOptions = ["Below 500", "500–550", "550–600", "600–650", "650+", "Not sure"] as const;
const targetScoreOptions = ["650", "700", "750+", "Not sure"] as const;
const satDateOptions = ["August SAT", "October SAT", "November SAT", "December SAT", "Not sure"] as const;
const concernOptions = ["Score is stuck", "Timing problems", "Algebra mistakes", "Weak Desmos strategy", "Hard module questions", "Not sure"] as const;
const prepOptions = ["Self-study", "School prep", "Private tutor", "Online course", "Practice tests only", "Not much yet"] as const;
const hoursOptions = ["Less than 2", "2–4", "5–7", "8+"] as const;
const desmosOptions = ["Not confident", "Somewhat confident", "Confident", "Not sure"] as const;

function TextInput(props: {
  label: string;
  value: string;
  placeholder: string;
  type?: string;
  helper?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-300">{props.label}</span>
      <input
        type={props.type || "text"}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(event) => props.onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-[#c5a15b]/60"
      />
      {props.helper ? (
        <span className="mt-2 block text-xs leading-5 text-slate-500">
          {props.helper}
        </span>
      ) : null}
    </label>
  );
}

function SelectInput(props: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-300">{props.label}</span>
      <select
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-[#090d18] px-4 py-3 text-white outline-none transition focus:border-[#c5a15b]/60"
      >
        <option value="">Select one</option>
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function IntakeForm({ onSubmit, onBack }: IntakeFormProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState("");

  function updateField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const requiredTextFields: Array<keyof Omit<FormState, "parentConsent" | "parentPhone">> = [
      "parentFirstName",
      "parentEmail",
      "studentFirstName",
      "grade",
      "currentScoreRange",
      "targetScore",
      "upcomingSatDate",
      "biggestConcern",
      "currentPrepMethod",
      "weeklyStudyHours",
      "desmosConfidence",
    ];

    const hasMissing = requiredTextFields.some((field) => !String(form[field]).trim());

    if (hasMissing) {
      setError("Please complete all required fields before starting the check.");
      return;
    }

    if (!form.parentEmail.includes("@")) {
      setError("Please enter a valid parent email.");
      return;
    }

    if (!form.parentConsent) {
      setError("Parent/guardian consent is required to begin the check.");
      return;
    }

    setError("");

    onSubmit({
      parentFirstName: form.parentFirstName.trim(),
      parentEmail: form.parentEmail.trim(),
      parentPhone: form.parentPhone.trim(),
      studentFirstName: form.studentFirstName.trim(),
      grade: form.grade as IntakeData["grade"],
      currentScoreRange: form.currentScoreRange as IntakeData["currentScoreRange"],
      targetScore: form.targetScore as IntakeData["targetScore"],
      upcomingSatDate: form.upcomingSatDate as IntakeData["upcomingSatDate"],
      biggestConcern: form.biggestConcern as IntakeData["biggestConcern"],
      currentPrepMethod: form.currentPrepMethod as IntakeData["currentPrepMethod"],
      weeklyStudyHours: form.weeklyStudyHours as IntakeData["weeklyStudyHours"],
      desmosConfidence: form.desmosConfidence as IntakeData["desmosConfidence"],
      parentConsent: form.parentConsent,
    });
  }

  return (
    <main className="min-h-screen px-5 py-6 text-white md:py-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold tracking-tight">Plain Math SAT</div>
            <div className="text-sm text-[#d7bd7a]">SAT Math, engineered.</div>
          </div>

          <button
            onClick={onBack}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5"
          >
            Back
          </button>
        </header>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl md:p-8">
          <div className="text-sm uppercase tracking-[0.24em] text-[#d7bd7a]">
            Step 1 of 2
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Before the check
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-slate-400">
            This readiness check works best when we know the student’s current
            SAT Math situation. We’ll use this information to prepare the report
            and match it to your Strategy Audit if you book.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            <div className="grid gap-5 md:grid-cols-2">
              <TextInput
                label="Parent first name"
                value={form.parentFirstName}
                placeholder="Parent first name"
                onChange={(value) => updateField("parentFirstName", value)}
              />

              <TextInput
                label="Parent email"
                type="email"
                value={form.parentEmail}
                placeholder="Parent email"
                helper="We’ll use this email to match your readiness check to your Strategy Audit if you book."
                onChange={(value) => updateField("parentEmail", value)}
              />

              <TextInput
                label="Parent phone"
                value={form.parentPhone}
                placeholder="Parent phone, optional"
                onChange={(value) => updateField("parentPhone", value)}
              />

              <TextInput
                label="Student first name"
                value={form.studentFirstName}
                placeholder="Student first name"
                onChange={(value) => updateField("studentFirstName", value)}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <SelectInput
                label="Grade"
                value={form.grade}
                options={gradeOptions}
                onChange={(value) => updateField("grade", value)}
              />

              <SelectInput
                label="Current SAT Math score"
                value={form.currentScoreRange}
                options={currentScoreOptions}
                onChange={(value) => updateField("currentScoreRange", value)}
              />

              <SelectInput
                label="Target SAT Math score"
                value={form.targetScore}
                options={targetScoreOptions}
                onChange={(value) => updateField("targetScore", value)}
              />

              <SelectInput
                label="Upcoming SAT date"
                value={form.upcomingSatDate}
                options={satDateOptions}
                onChange={(value) => updateField("upcomingSatDate", value)}
              />

              <SelectInput
                label="Biggest current concern"
                value={form.biggestConcern}
                options={concernOptions}
                onChange={(value) => updateField("biggestConcern", value)}
              />

              <SelectInput
                label="Current prep method"
                value={form.currentPrepMethod}
                options={prepOptions}
                onChange={(value) => updateField("currentPrepMethod", value)}
              />

              <SelectInput
                label="Weekly study hours"
                value={form.weeklyStudyHours}
                options={hoursOptions}
                onChange={(value) => updateField("weeklyStudyHours", value)}
              />

              <SelectInput
                label="Desmos confidence"
                value={form.desmosConfidence}
                options={desmosOptions}
                onChange={(value) => updateField("desmosConfidence", value)}
              />
            </div>

            <label className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">
              <input
                type="checkbox"
                checked={form.parentConsent}
                onChange={(event) => updateField("parentConsent", event.target.checked)}
                className="mt-1 h-4 w-4"
              />
              <span>
                I am the parent/guardian and I agree that Plain Math may use
                this readiness check data to prepare for the Strategy Audit.
              </span>
            </label>

            <div className="rounded-3xl border border-[#c5a15b]/20 bg-[#c5a15b]/10 p-5">
              <p className="leading-7 text-slate-300">
                This Plain Math SAT check takes 15 minutes. The timer starts
                once you begin. Use a calculator or Desmos if you would on the
                real Digital SAT. Some questions are designed to reveal whether
                your child spots the faster route.
              </p>

              <a
                href={DESMOS_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-full border border-[#c5a15b]/40 px-5 py-2 text-sm font-medium text-[#e7c982] transition hover:bg-[#c5a15b]/10"
              >
                Open Desmos
              </a>
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-full bg-[#c5a15b] px-6 py-4 font-semibold text-slate-950 transition hover:bg-[#e0bd72]"
            >
              Begin check
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
