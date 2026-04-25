"use client";

import Link from "next/link";
import { ArrowRight, Check, CircleAlert, Lightbulb, Play, RefreshCcw, Terminal } from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import { CodeEditor } from "@/components/CodeEditor";
import { ReactPreviewFrame, RenderedCheckResult } from "@/components/ReactPreviewFrame";
import { completeActivity, readProgress, saveComponentDocsEntry } from "@/lib/progress";
import {
  AuditNoteActivity,
  ComponentDocsActivity,
  ConceptCheckActivity,
  ExternalSubmissionActivity,
  LearningActivity,
  ReactComponentActivity,
  StateModelActivity,
  SimulatedTerminalActivity
} from "@/lib/types";

type LearningActivityLabProps = {
  lessonId: string;
  activity: LearningActivity;
  trackSlug: string;
  nextLessonSlug?: string;
  nextLessonTitle?: string;
};

function CompletionBanner({
  xp,
  nextHref,
  nextLessonTitle
}: {
  xp: number;
  nextHref: string | null;
  nextLessonTitle?: string;
}) {
  return (
    <div className="rounded-[20px] border border-[color:var(--success)]/16 bg-[color:var(--success-soft)] p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-white p-2">
          <Check className="h-4 w-4 text-[color:var(--success)]" />
        </div>
        <div>
          <p className="text-sm font-medium text-[color:var(--foreground)]">
            Complete. Progress has been saved.
          </p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
            You earned {xp} XP.
          </p>
          {nextHref ? (
            <Link
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[color:var(--foreground)] px-4 py-2 text-sm font-medium text-white"
              href={nextHref}
            >
              Continue to {nextLessonTitle ?? "next lesson"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function completeAndNotify(lessonId: string, activity: LearningActivity) {
  const updated = completeActivity(lessonId, activity.id, activity.xp);
  window.dispatchEvent(new Event("render-progress-changed"));
  return updated.completedActivityIds.includes(activity.id);
}

function ConceptCheck({
  lessonId,
  activity,
  nextHref,
  nextLessonTitle
}: {
  lessonId: string;
  activity: ConceptCheckActivity;
  nextHref: string | null;
  nextLessonTitle?: string;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [complete, setComplete] = useState(() =>
    readProgress().completedActivityIds.includes(activity.id)
  );
  const passed = activity.prompts.every((prompt) => answers[prompt.id] === prompt.answer);

  const check = () => {
    setChecked(true);
    if (passed) {
      setComplete(completeAndNotify(lessonId, activity));
    }
  };

  return (
    <div className="space-y-4">
      {activity.prompts.map((prompt) => {
        const selected = answers[prompt.id];
        const wrong = checked && selected && selected !== prompt.answer;
        return (
          <div key={prompt.id} className="rounded-[22px] border border-[color:var(--line)] bg-white p-4">
            <p className="text-sm font-medium text-[color:var(--foreground)]">{prompt.prompt}</p>
            <div className="mt-4 grid gap-2">
              {prompt.options.map((option) => (
                <button
                  key={option}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    selected === option
                      ? "border-[color:var(--foreground)] bg-[color:var(--surface-subtle)] text-[color:var(--foreground)]"
                      : "border-[color:var(--line)] bg-white text-[color:var(--muted)] hover:border-[color:var(--line-strong)]"
                  }`}
                  type="button"
                  onClick={() => setAnswers((current) => ({ ...current, [prompt.id]: option }))}
                >
                  {option}
                </button>
              ))}
            </div>
            {checked && selected === prompt.answer ? (
              <p className="mt-3 text-sm leading-6 text-[color:var(--success)]">
                {prompt.explanation}
              </p>
            ) : null}
            {wrong ? (
              <p className="mt-3 text-sm leading-6 text-[color:var(--danger)]">
                Try that one again. Think about how the concept maps to saving, sharing, or reviewing work.
              </p>
            ) : null}
          </div>
        );
      })}
      <button className="button-primary inline-flex items-center gap-2" type="button" onClick={check}>
        <Check className="h-4 w-4" />
        Check answers
      </button>
      {checked && !passed ? (
        <div className="rounded-[20px] border border-[color:var(--danger)]/16 bg-[color:var(--danger-soft)] p-4 text-sm text-[color:var(--foreground)]">
          A few labels are off. Revisit the analogies, then check again.
        </div>
      ) : null}
      {complete ? <CompletionBanner xp={activity.xp} nextHref={nextHref} nextLessonTitle={nextLessonTitle} /> : null}
    </div>
  );
}

function SimulatedTerminal({
  lessonId,
  activity,
  nextHref,
  nextLessonTitle
}: {
  lessonId: string;
  activity: SimulatedTerminalActivity;
  nextHref: string | null;
  nextLessonTitle?: string;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([
    `Render terminal opened at ${activity.initialPath}`
  ]);
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(() =>
    readProgress().completedActivityIds.includes(activity.id)
  );

  const currentStep = activity.steps[stepIndex];
  const path = useMemo(() => {
    const cdSteps = activity.steps
      .slice(0, stepIndex)
      .filter((step) => step.expectedCommand.startsWith("cd "));
    return cdSteps.length > 0
      ? `${activity.initialPath}/${cdSteps.at(-1)?.expectedCommand.replace("cd ", "")}`
      : activity.initialPath;
  }, [activity.initialPath, activity.steps, stepIndex]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!currentStep) {
      return;
    }

    const normalized = command.trim().replace(/\s+/g, " ");
    if (normalized !== currentStep.expectedCommand) {
      setError(`That command is not the expected move yet. Hint: ${currentStep.hint}`);
      return;
    }

    const nextHistory = [...history, `$ ${normalized}`, currentStep.output];
    const nextIndex = stepIndex + 1;
    setHistory(nextHistory);
    setCommand("");
    setError("");
    setStepIndex(nextIndex);

    if (nextIndex === activity.steps.length) {
      setHistory([...nextHistory, activity.completionMessage]);
      setComplete(completeAndNotify(lessonId, activity));
    }
  };

  const reset = () => {
    setStepIndex(0);
    setCommand("");
    setHistory([`Render terminal opened at ${activity.initialPath}`]);
    setError("");
  };

  return (
    <div className="space-y-4">
      <div className="rounded-[22px] border border-[color:var(--line)] bg-[#0b1020] p-4 font-mono text-sm text-white">
        <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-2">Simulated terminal</span>
        </div>
        <div className="min-h-80 space-y-2 whitespace-pre-wrap leading-6">
          {history.map((line, index) => (
            <p key={`${line}-${index}`}>{line}</p>
          ))}
        </div>
        {!complete && currentStep ? (
          <form className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4" onSubmit={submit}>
            <span className="text-white/50">{path} $</span>
            <input
              className="min-w-0 flex-1 bg-transparent text-white outline-none"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
          </form>
        ) : null}
      </div>

      {currentStep && !complete ? (
        <div className="rounded-[20px] border border-[color:var(--line)] bg-white p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Step {stepIndex + 1} of {activity.steps.length}
          </p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--foreground)]">
            {currentStep.instruction}
          </p>
        </div>
      ) : null}

      {error ? (
        <div className="flex gap-3 rounded-[20px] border border-[color:var(--danger)]/16 bg-[color:var(--danger-soft)] p-4 text-sm text-[color:var(--foreground)]">
          <CircleAlert className="mt-0.5 h-4 w-4 text-[color:var(--danger)]" />
          <p>{error}</p>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button className="button-muted inline-flex items-center gap-2" type="button" onClick={reset}>
          <RefreshCcw className="h-4 w-4" />
          Reset
        </button>
        {currentStep && !complete ? (
          <div className="button-muted inline-flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            {currentStep.hint}
          </div>
        ) : null}
      </div>

      {complete ? <CompletionBanner xp={activity.xp} nextHref={nextHref} nextLessonTitle={nextLessonTitle} /> : null}
    </div>
  );
}

function ExternalChecklist({
  lessonId,
  activity,
  nextHref,
  nextLessonTitle
}: {
  lessonId: string;
  activity: ExternalSubmissionActivity;
  nextHref: string | null;
  nextLessonTitle?: string;
}) {
  const [checked, setChecked] = useState<string[]>([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [pullRequestUrl, setPullRequestUrl] = useState("");
  const [complete, setComplete] = useState(() =>
    readProgress().completedActivityIds.includes(activity.id)
  );
  const allChecked = activity.checklist.every((item) => checked.includes(item));
  const hasRequiredUrls =
    (!activity.requiredFields.includes("githubUrl") || githubUrl.startsWith("https://")) &&
    (!activity.requiredFields.includes("pullRequestUrl") || pullRequestUrl.startsWith("https://"));

  const submit = () => {
    if (allChecked && hasRequiredUrls) {
      setComplete(completeAndNotify(lessonId, activity));
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-[22px] border border-[color:var(--line)] bg-white p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
          Guided external workflow
        </p>
        <div className="mt-4 grid gap-3">
          {activity.checklist.map((item) => (
            <label key={item} className="flex items-start gap-3 rounded-2xl bg-[color:var(--surface-subtle)] p-3 text-sm text-[color:var(--foreground)]">
              <input
                className="mt-1 h-4 w-4 accent-[color:var(--foreground)]"
                type="checkbox"
                checked={checked.includes(item)}
                onChange={(event) =>
                  setChecked((current) =>
                    event.target.checked
                      ? [...current, item]
                      : current.filter((value) => value !== item)
                  )
                }
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-[color:var(--foreground)]">
          GitHub repo URL
          <input
            className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-subtle)] px-4 py-3 text-sm font-normal outline-none"
            value={githubUrl}
            onChange={(event) => setGithubUrl(event.target.value)}
            placeholder="https://github.com/..."
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[color:var(--foreground)]">
          Pull request URL
          <input
            className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-subtle)] px-4 py-3 text-sm font-normal outline-none"
            value={pullRequestUrl}
            onChange={(event) => setPullRequestUrl(event.target.value)}
            placeholder="https://github.com/.../pull/1"
          />
        </label>
      </div>
      <button className="button-primary inline-flex items-center gap-2" type="button" onClick={submit}>
        <Check className="h-4 w-4" />
        Save workflow completion
      </button>
      {!complete && (!allChecked || !hasRequiredUrls) ? (
        <p className="text-sm leading-6 text-[color:var(--muted)]">
          Complete every checklist item and paste valid GitHub links to finish this lesson.
        </p>
      ) : null}
      {complete ? <CompletionBanner xp={activity.xp} nextHref={nextHref} nextLessonTitle={nextLessonTitle} /> : null}
    </div>
  );
}

function ReactComponentLab({
  lessonId,
  activity,
  nextHref,
  nextLessonTitle
}: {
  lessonId: string;
  activity: ReactComponentActivity;
  nextHref: string | null;
  nextLessonTitle?: string;
}) {
  const [code, setCode] = useState(activity.starterCode);
  const [checked, setChecked] = useState(false);
  const [hintIndex, setHintIndex] = useState(-1);
  const [resetKey, setResetKey] = useState(0);
  const [checkKey, setCheckKey] = useState(0);
  const [pendingCompletionCheck, setPendingCompletionCheck] = useState(false);
  const [previewResult, setPreviewResult] = useState<{
    status: "idle" | "rendered" | "error";
    error: string | null;
    renderedText: string;
    checkResults: RenderedCheckResult[];
  }>({
    status: "idle",
    error: null,
    renderedText: "",
    checkResults: []
  });
  const [complete, setComplete] = useState(() =>
    readProgress().completedActivityIds.includes(activity.id)
  );

  useEffect(() => {
    setCode(activity.starterCode);
    setChecked(false);
    setHintIndex(-1);
    setResetKey((current) => current + 1);
    setCheckKey(0);
    setPendingCompletionCheck(false);
    setComplete(readProgress().completedActivityIds.includes(activity.id));
  }, [activity.id, activity.starterCode]);

  const sourceResults = activity.checks.map((check) => ({
    check,
    passed: new RegExp(check.pattern, "s").test(code)
  }));
  const renderedPassed =
    previewResult.status === "rendered" &&
    activity.renderedChecks.length > 0 &&
    previewResult.checkResults.length === activity.renderedChecks.length &&
    previewResult.checkResults.every((result) => result.passed);
  const passed =
    sourceResults.every((result) => result.passed) &&
    renderedPassed &&
    !previewResult.error;

  const handlePreviewResult = useCallback((result: {
    status: "idle" | "rendered" | "error";
    error: string | null;
    renderedText: string;
    checkResults: RenderedCheckResult[];
  }) => {
    setPreviewResult(result);
  }, []);

  const runCheck = () => {
    setChecked(true);
    setPreviewResult({
      status: "idle",
      error: null,
      renderedText: "",
      checkResults: []
    });
    setPendingCompletionCheck(true);
    setCheckKey((current) => current + 1);
  };

  useEffect(() => {
    if (!pendingCompletionCheck || previewResult.status === "idle") {
      return;
    }

    if (passed) {
      setComplete(completeAndNotify(lessonId, activity));
    }

    setPendingCompletionCheck(false);
  }, [activity, lessonId, passed, pendingCompletionCheck, previewResult.status]);

  const reset = () => {
    setCode(activity.starterCode);
    setChecked(false);
    setHintIndex(-1);
    setResetKey((current) => current + 1);
    setCheckKey(0);
    setPendingCompletionCheck(false);
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
      <CodeEditor
        label={activity.type === "ts-react-component" ? "TSX" : "React"}
        language={activity.type === "ts-react-component" ? "tsx" : "jsx"}
        value={code}
        onChange={setCode}
      />

      <div className="space-y-4">
        <div className="overflow-hidden rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface-subtle)]">
          <div className="flex items-center gap-2 border-b border-[color:var(--line)] bg-white px-4 py-3 text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-2">React live preview</span>
          </div>
          <ReactPreviewFrame
            code={code}
            fakeFileName={activity.fakeFileName}
            previewComponentName={activity.previewComponentName}
            renderedChecks={activity.renderedChecks}
            resetKey={resetKey}
            checkKey={checkKey}
            onResult={handlePreviewResult}
          />
        </div>

        <div className="rounded-[20px] border border-[color:var(--line)] bg-white p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Preview expectation
          </p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--foreground)]">
            {activity.previewDescription}
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-[color:var(--muted)]">
            {activity.instructions.map((instruction) => (
              <li key={instruction} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--muted)]" />
                <span>{instruction}</span>
              </li>
            ))}
          </ul>
        </div>

        {previewResult.error ? (
          <div className="rounded-[20px] border border-[color:var(--danger)]/16 bg-[color:var(--danger-soft)] p-4">
            <p className="text-sm font-medium text-[color:var(--foreground)]">Runtime error</p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[color:var(--danger)]">
              {previewResult.error}
            </p>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button className="button-primary inline-flex items-center gap-2" type="button" onClick={runCheck}>
            <Play className="h-4 w-4" />
            Check
          </button>
          <button className="button-muted inline-flex items-center gap-2" type="button" onClick={reset}>
            <RefreshCcw className="h-4 w-4" />
            Reset
          </button>
          {activity.hints.length > 0 ? (
            <button
              className="button-muted inline-flex items-center gap-2"
              type="button"
              onClick={() => setHintIndex((current) => Math.min(current + 1, activity.hints.length - 1))}
            >
              <Lightbulb className="h-4 w-4" />
              Show hint
            </button>
          ) : null}
        </div>

        <div className="rounded-[24px] border border-[color:var(--line)] bg-white p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Validation
          </p>
          <div className="mt-4 grid gap-3">
            {sourceResults.map((result) => (
              <div
                key={result.check.id}
                className={`rounded-2xl border p-3 text-sm ${
                  checked && result.passed
                    ? "border-[color:var(--success)]/20 bg-[color:var(--success-soft)]"
                    : checked
                      ? "border-[color:var(--danger)]/20 bg-[color:var(--danger-soft)]"
                      : "border-[color:var(--line)] bg-[color:var(--surface-subtle)]"
                }`}
              >
                <p className="font-medium text-[color:var(--foreground)]">{result.check.label}</p>
                <p className="mt-1 leading-5 text-[color:var(--muted)]">
                  {checked && !result.passed ? result.check.message : "Ready to check."}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-[color:var(--line)] bg-white p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Rendered output checks
          </p>
          <div className="mt-4 grid gap-3">
            {activity.renderedChecks.map((check) => {
              const result = previewResult.checkResults.find((item) => item.id === check.id);
              return (
                <div
                  key={check.id}
                  className={`rounded-2xl border p-3 text-sm ${
                    checked && result?.passed
                      ? "border-[color:var(--success)]/20 bg-[color:var(--success-soft)]"
                      : checked
                        ? "border-[color:var(--danger)]/20 bg-[color:var(--danger-soft)]"
                        : "border-[color:var(--line)] bg-[color:var(--surface-subtle)]"
                  }`}
                >
                  <p className="font-medium text-[color:var(--foreground)]">{check.label}</p>
                  <p className="mt-1 leading-5 text-[color:var(--muted)]">
                    {checked && !result?.passed ? check.message : "Ready to check."}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {hintIndex >= 0 && activity.hints[hintIndex] ? (
          <div className="rounded-[20px] border border-[color:var(--warning)]/18 bg-[color:var(--warning-soft)] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--warning)]">
              Hint {hintIndex + 1}
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--foreground)]">
              {activity.hints[hintIndex]}
            </p>
          </div>
        ) : null}

        {complete ? <CompletionBanner xp={activity.xp} nextHref={nextHref} nextLessonTitle={nextLessonTitle} /> : null}
      </div>
    </div>
  );
}

function StructuredWritingActivity({
  lessonId,
  activity,
  nextHref,
  nextLessonTitle
}: {
  lessonId: string;
  activity: ComponentDocsActivity | AuditNoteActivity | StateModelActivity;
  nextHref: string | null;
  nextLessonTitle?: string;
}) {
  const existingEntry = readProgress().componentDocsEntries.find(
    (entry) => entry.activityId === activity.id
  );
  const [fields, setFields] = useState<Record<string, string>>(
    () => existingEntry?.fields ?? {}
  );
  const [checked, setChecked] = useState(false);
  const [complete, setComplete] = useState(() =>
    readProgress().completedActivityIds.includes(activity.id)
  );

  const fieldResults = activity.fields.map((field) => {
    const value = fields[field.id]?.trim() ?? "";
    return {
      field,
      passed: value.length >= field.minLength
    };
  });
  const passed = fieldResults.every((result) => result.passed);

  const save = () => {
    setChecked(true);
    if (!passed) {
      return;
    }

    const updated = saveComponentDocsEntry(lessonId, activity.id, fields, activity.xp);
    setComplete(updated.completedActivityIds.includes(activity.id));
    window.dispatchEvent(new Event("render-progress-changed"));
  };

  const reset = () => {
    setFields({});
    setChecked(false);
    setComplete(readProgress().completedActivityIds.includes(activity.id));
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-4">
        {activity.fields.map((field) => {
          const value = fields[field.id] ?? "";
          const result = fieldResults.find((item) => item.field.id === field.id);
          return (
            <label
              key={field.id}
              className="grid gap-2 rounded-[22px] border border-[color:var(--line)] bg-white p-4 text-sm font-medium text-[color:var(--foreground)]"
            >
              {field.label}
              <textarea
                className="min-h-28 resize-y rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-subtle)] px-4 py-3 text-sm font-normal leading-6 outline-none transition focus:border-[color:var(--line-strong)]"
                value={value}
                onChange={(event) =>
                  setFields((current) => ({ ...current, [field.id]: event.target.value }))
                }
                placeholder={field.placeholder}
              />
              {checked && !result?.passed ? (
                <span className="text-sm font-normal text-[color:var(--danger)]">
                  {activity.type === "audit-note"
                    ? "Add a little more detail so this audit note is useful before a PR."
                    : activity.type === "state-model"
                      ? "Add a little more detail so this state model can guide product and PR review."
                      : "Add a little more detail so this documentation is useful to a teammate."}
                </span>
              ) : null}
            </label>
          );
        })}

        <div className="flex flex-wrap gap-3">
          <button className="button-primary inline-flex items-center gap-2" type="button" onClick={save}>
            <Check className="h-4 w-4" />
            {activity.type === "audit-note"
              ? "Save audit note"
              : activity.type === "state-model"
                ? "Save state model"
                : "Save documentation"}
          </button>
          <button className="button-muted inline-flex items-center gap-2" type="button" onClick={reset}>
            <RefreshCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        {checked && !passed ? (
          <div className="rounded-[20px] border border-[color:var(--danger)]/16 bg-[color:var(--danger-soft)] p-4 text-sm text-[color:var(--foreground)]">
            Complete every documentation field before this activity counts as finished.
          </div>
        ) : null}
        {complete ? <CompletionBanner xp={activity.xp} nextHref={nextHref} nextLessonTitle={nextLessonTitle} /> : null}
      </div>

      <aside className="rounded-[24px] border border-[color:var(--line)] bg-white p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
          {activity.type === "audit-note"
            ? "Audit checklist"
            : activity.type === "state-model"
              ? "State model checklist"
              : "Documentation checklist"}
        </p>
        <div className="mt-4 grid gap-3">
          {activity.checklist.map((item) => (
            <div key={item} className="flex gap-3 text-sm leading-6 text-[color:var(--foreground)]">
              <Check className="mt-1 h-4 w-4 text-[color:var(--success)]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-6 text-[color:var(--muted)]">
          {activity.type === "audit-note"
            ? "This is a local MVP audit note, not a full review workflow. It proves the learner can describe issues, fixes, and remaining risks before shipping."
            : activity.type === "state-model"
              ? "This is a local MVP state model, not a full product requirements tool. It proves the learner can name the states a product surface must handle."
            : "This is a local MVP documentation entry, not a full CMS. It proves the learner can explain how a component should be used."}
        </p>
      </aside>
    </div>
  );
}

export function LearningActivityLab({
  lessonId,
  activity,
  trackSlug,
  nextLessonSlug,
  nextLessonTitle
}: LearningActivityLabProps) {
  const nextHref = trackSlug && nextLessonSlug ? `/tracks/${trackSlug}/${nextLessonSlug}` : null;

  return (
    <section className="space-y-6">
      <div className="rounded-[32px] border border-[color:var(--line)] bg-white p-5 shadow-[0_1px_0_rgba(16,24,40,0.04)]">
        <div className="border-b border-[color:var(--line)] pb-5">
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
            <Terminal className="h-4 w-4" />
            {activity.type.replace("-", " ")}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
            {activity.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[color:var(--muted)]">
            {activity.prompt}
          </p>
        </div>

        <div className="mt-6">
          {activity.type === "concept-check" ? (
            <ConceptCheck
              lessonId={lessonId}
              activity={activity}
              nextHref={nextHref}
              nextLessonTitle={nextLessonTitle}
            />
          ) : null}
          {activity.type === "simulated-terminal" ? (
            <SimulatedTerminal
              lessonId={lessonId}
              activity={activity}
              nextHref={nextHref}
              nextLessonTitle={nextLessonTitle}
            />
          ) : null}
          {activity.type === "external-submission" ? (
            <ExternalChecklist
              lessonId={lessonId}
              activity={activity}
              nextHref={nextHref}
              nextLessonTitle={nextLessonTitle}
            />
          ) : null}
          {activity.type === "react-component" || activity.type === "ts-react-component" ? (
            <ReactComponentLab
              lessonId={lessonId}
              activity={activity}
              nextHref={nextHref}
              nextLessonTitle={nextLessonTitle}
            />
          ) : null}
          {activity.type === "component-docs" || activity.type === "audit-note" || activity.type === "state-model" ? (
            <StructuredWritingActivity
              lessonId={lessonId}
              activity={activity}
              nextHref={nextHref}
              nextLessonTitle={nextLessonTitle}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
