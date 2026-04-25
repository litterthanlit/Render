"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  CircleAlert,
  Code2,
  Lightbulb,
  Play,
  RefreshCcw
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { CodeEditor } from "@/components/CodeEditor";
import { completeExercise, readProgress } from "@/lib/progress";
import { buildPreviewDocument } from "@/lib/runtime";
import { runValidationRules } from "@/lib/validation";
import { CodeFiles, Exercise, ValidationResult } from "@/lib/types";

type LessonLabProps = {
  lessonId?: string;
  exercise?: Exercise;
  standaloneTitle?: string;
  standalonePrompt?: string;
  initialFiles?: CodeFiles;
  trackSlug?: string;
  nextLessonSlug?: string;
  nextLessonTitle?: string;
};

const blankExercise = {
  id: "playground-exercise",
  title: "Freeform playground",
  prompt: "Experiment freely with HTML, CSS, and JS.",
  runtime: "html-css-js" as const,
  starterFiles: {
    html: `<main class="playground-card">\n  <p class="eyebrow">Render Lab</p>\n  <h1>Make this canvas yours.</h1>\n  <p>Prototype interactions, revise layouts, and explore ideas without checkpoints.</p>\n</main>`,
    css: `.playground-card {\n  width: min(560px, calc(100vw - 48px));\n  margin: 48px auto;\n  padding: 32px;\n  border-radius: 28px;\n  background: #ffffff;\n  border: 1px solid rgba(10, 10, 10, 0.08);\n  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.08);\n}\n.eyebrow {\n  color: #2563eb;\n  text-transform: uppercase;\n  letter-spacing: 0.24em;\n  font-size: 12px;\n}`,
    js: `document.body.dataset.mode = "playground";`
  },
  solutionFiles: {
    html: "",
    css: "",
    js: ""
  },
  hints: [],
  checks: [],
  xp: 0
};

function ActionButton({
  onClick,
  children,
  primary = false
}: {
  onClick: () => void;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <button
      className={primary ? "button-primary inline-flex items-center gap-2" : "button-muted inline-flex items-center gap-2"}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function LessonLab({
  lessonId,
  exercise,
  standaloneTitle,
  standalonePrompt,
  initialFiles,
  trackSlug,
  nextLessonSlug,
  nextLessonTitle
}: LessonLabProps) {
  const activeExercise = exercise ?? blankExercise;
  const starterFiles = initialFiles ?? activeExercise.starterFiles;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [files, setFiles] = useState<CodeFiles>(starterFiles);
  const [previewDoc, setPreviewDoc] = useState(buildPreviewDocument(starterFiles));
  const [results, setResults] = useState<ValidationResult[]>([]);
  const [status, setStatus] = useState<"idle" | "pass" | "fail">("idle");
  const [hintIndex, setHintIndex] = useState(0);
  const [xpState, setXpState] = useState(() =>
    readProgress().completedExerciseIds.includes(activeExercise.id)
  );

  const failedResults = useMemo(() => results.filter((result) => !result.passed), [results]);
  const nextLessonHref =
    trackSlug && nextLessonSlug ? `/tracks/${trackSlug}/${nextLessonSlug}` : null;

  useEffect(() => {
    setFiles(starterFiles);
    setPreviewDoc(buildPreviewDocument(starterFiles));
    setResults([]);
    setStatus("idle");
    setHintIndex(0);
    setXpState(readProgress().completedExerciseIds.includes(activeExercise.id));
  }, [activeExercise.id, starterFiles]);

  const runPreview = () => {
    setPreviewDoc(buildPreviewDocument(files));
    setStatus("idle");
  };

  const resetFiles = () => {
    setFiles(starterFiles);
    setPreviewDoc(buildPreviewDocument(starterFiles));
    setResults([]);
    setStatus("idle");
    setHintIndex(0);
  };

  const checkExercise = () => {
    const iframe = iframeRef.current;
    const documentRef = iframe?.contentDocument;
    const windowRef = iframe?.contentWindow;

    if (!documentRef || !windowRef) {
      return;
    }

    const nextResults = runValidationRules(documentRef, windowRef, activeExercise.checks);
    const passed = nextResults.every((result) => result.passed);

    setResults(nextResults);
    setStatus(passed ? "pass" : "fail");

    if (passed && lessonId) {
      const updated = completeExercise(lessonId, activeExercise.id, activeExercise.xp);
      setXpState(updated.completedExerciseIds.includes(activeExercise.id));
      window.dispatchEvent(new Event("render-progress-changed"));
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-[32px] border border-[color:var(--line)] bg-white p-5 shadow-[0_18px_60px_rgba(17,17,17,0.045)]">
        <div className="flex flex-col gap-5 border-b border-[color:var(--line)] pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
              Interactive lab
            </p>
            <h2 className="mt-3 text-3xl font-normal tracking-[-0.045em] text-[color:var(--foreground)]">
              {standaloneTitle ?? activeExercise.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[color:var(--muted)]">
              {standalonePrompt ?? activeExercise.prompt}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ActionButton onClick={runPreview}>
              <Play className="h-4 w-4" />
              Run
            </ActionButton>
            {activeExercise.checks.length > 0 ? (
              <ActionButton onClick={checkExercise} primary>
                <Check className="h-4 w-4" />
                Check
              </ActionButton>
            ) : null}
            <ActionButton onClick={resetFiles}>
              <RefreshCcw className="h-4 w-4" />
              Reset
            </ActionButton>
            {activeExercise.hints.length > 0 ? (
              <ActionButton
                onClick={() =>
                  setHintIndex((current) =>
                    Math.min(current + 1, activeExercise.hints.length - 1)
                  )
                }
              >
                <Lightbulb className="h-4 w-4" />
                Show hint
              </ActionButton>
            ) : null}
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.16fr)_minmax(360px,0.84fr)]">
          <div className="grid gap-4">
            <CodeEditor
              label="HTML"
              language="markup"
              value={files.html}
              onChange={(value) => setFiles((current) => ({ ...current, html: value }))}
            />
            <CodeEditor
              label="CSS"
              language="styles"
              value={files.css}
              onChange={(value) => setFiles((current) => ({ ...current, css: value }))}
            />
            <CodeEditor
              label="JavaScript"
              language="logic"
              value={files.js}
              onChange={(value) => setFiles((current) => ({ ...current, js: value }))}
            />
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] shadow-[0_10px_30px_rgba(17,17,17,0.035)]">
              <div className="flex items-center gap-2 border-b border-[color:var(--line)] bg-white px-4 py-3 text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2">Live preview</span>
              </div>
              <iframe
                ref={iframeRef}
                className="h-[720px] w-full border-0 bg-white"
                sandbox="allow-scripts allow-same-origin"
                srcDoc={previewDoc}
                title="Lesson preview"
              />
            </div>

            <div className="rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface-subtle)]/80 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                  Review state
                </p>
                {xpState ? (
                  <span className="rounded-full bg-[color:var(--success-soft)] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[color:var(--success)]">
                    XP saved
                  </span>
                ) : null}
              </div>

              {status === "idle" ? (
                <div className="mt-3 rounded-[20px] border border-[color:var(--line)] bg-white p-4">
                  <p className="text-sm leading-6 text-[color:var(--muted)]">
                    Run the preview, then check the exercise when you are ready.
                  </p>
                </div>
              ) : null}

              {status === "pass" ? (
                <div className="mt-3 rounded-[20px] border border-[color:var(--success)]/16 bg-[color:var(--success-soft)] p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-white p-2">
                      <Check className="h-4 w-4 text-[color:var(--success)]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[color:var(--foreground)]">
                        Passed. The lesson has been marked complete.
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                        You earned {activeExercise.xp} XP.
                      </p>
                      {nextLessonHref ? (
                        <Link
                          className="mt-4 inline-flex items-center gap-2 rounded-full bg-[color:var(--foreground)] px-4 py-2 text-sm font-medium text-white"
                          href={nextLessonHref}
                        >
                          Continue to {nextLessonTitle ?? "next lesson"}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}

              {status === "fail" ? (
                <div className="mt-3 space-y-3 rounded-[20px] border border-[color:var(--danger)]/16 bg-[color:var(--danger-soft)] p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-white p-2">
                      <CircleAlert className="h-4 w-4 text-[color:var(--danger)]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[color:var(--foreground)]">
                        A few checks still need attention.
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
                        The review below tells you exactly what still needs refinement.
                      </p>
                    </div>
                  </div>
                  {failedResults.map((result) => (
                    <div key={result.rule.message} className="rounded-2xl border border-[color:var(--line)] bg-white p-3">
                      <p className="text-sm font-medium text-[color:var(--foreground)]">
                        {result.rule.message}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[color:var(--muted)]">
                        {result.detail}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              {activeExercise.hints[hintIndex] ? (
                <div className="mt-4 rounded-[20px] border border-[color:var(--warning)]/18 bg-[color:var(--warning-soft)] p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-white p-2">
                      <Lightbulb className="h-4 w-4 text-[color:var(--warning)]" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--warning)]">
                        Hint {hintIndex + 1}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[color:var(--foreground)]">
                        {activeExercise.hints[hintIndex]}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="rounded-[24px] border border-[color:var(--line)] bg-white p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-[color:var(--surface-subtle)] p-3">
                  <Code2 className="h-5 w-5 text-[color:var(--foreground)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[color:var(--foreground)]">
                    Intent-based validation
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    Render checks structure, text, classes, styles, and JavaScript results
                    directly inside the preview so you get concrete feedback instead of vague
                    visual guesses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
