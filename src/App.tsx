import { useState } from "react";
import { IntakeForm } from "./components/IntakeForm";
import { LandingPage } from "./components/LandingPage";
import { LoadingScreen } from "./components/LoadingScreen";
import { ResultsPage } from "./components/ResultsPage";
import { TestScreen } from "./components/TestScreen";
import { questions } from "./data/questions";
import { buildTutorAuditPacket, generateReportId } from "./lib/reportBuilder";
import { scoreDiagnostic } from "./lib/scoring";
import { submitAuditPacket } from "./lib/submitAuditPacket";
import { trackMetaCustomEvent } from "./lib/metaPixel";
import type {
  IntakeData,
  QuestionResponse,
  SaveStatus,
  TutorAuditPacket,
} from "./lib/types";
import { getUtmParams } from "./lib/utm";

type Step = "landing" | "intake" | "test" | "loading" | "results";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export default function App() {
  const [step, setStep] = useState<Step>("landing");
  const [intake, setIntake] = useState<IntakeData | null>(null);
  const [packet, setPacket] = useState<TutorAuditPacket | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveError, setSaveError] = useState("");

  async function savePacket(nextPacket: TutorAuditPacket) {
    setSaveStatus("saving");
    setSaveError("");

    const response = await submitAuditPacket(nextPacket);

    if (response.success) {
      setSaveStatus("success");
      setSaveError("");
      return;
    }

    setSaveStatus("error");
    setSaveError(response.error || "Unknown save error");
  }

  function handleIntakeSubmit(data: IntakeData) {
  setIntake(data);

  trackMetaCustomEvent("DiagnosticStart");
  window.fbq?.("track", "CompleteRegistration");

  setStep("test");
}

  async function handleTestComplete(responses: QuestionResponse[]) {
    if (!intake) {
      setStep("intake");
      return;
    }
    trackMetaCustomEvent("DiagnosticComplete", {
  question_count: responses.length,
});

    setStep("loading");

    const reportId = generateReportId();
    const submittedAt = new Date().toISOString();
    const scoredResult = scoreDiagnostic(questions, responses);

    const nextPacket = buildTutorAuditPacket({
      reportId,
      submittedAt,
      intake,
      scoredResult,
      utm: getUtmParams(),
    });

    setPacket(nextPacket);

    await Promise.all([
      savePacket(nextPacket),
      delay(3500),
    ]);

    setStep("results");
    trackMetaCustomEvent("ReportView");
  }

  async function handleRetrySave() {
    if (!packet) return;
    await savePacket(packet);
  }

  if (step === "landing") {
    return <LandingPage onStart={() => setStep("intake")} />;
  }

  if (step === "intake") {
    return (
      <IntakeForm
        onBack={() => setStep("landing")}
        onSubmit={handleIntakeSubmit}
      />
    );
  }

  if (step === "test") {
    return <TestScreen questions={questions} onComplete={handleTestComplete} />;
  }

  if (step === "loading" || !packet) {
    return <LoadingScreen />;
  }

  return (
    <ResultsPage
      packet={packet}
      saveStatus={saveStatus}
      saveError={saveError}
      onRetrySave={handleRetrySave}
    />
  );
}
