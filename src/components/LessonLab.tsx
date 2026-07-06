"use client";

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
import { Button, WorkbenchShell } from "@/components/render-ui";
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
    <section className="space-y-5 xl:sticky xl:top-24 xl:self-start">
      <div className="rounded-lg border border-[color:var(--line)] bg-white p-5 shadow-[0_8px_24px_rgba(17,17,17,0.045)] md:p-6">
        <div className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_auto] 2xl:items-start">
          <div>
            <p className="text-sm font-medium text-[color:var(--muted)]">Interactive lab</p>
            <h2 className="mt-3 max-w-3xl text-2xl font-semibold text-[color:var(--foreground)] md:text-3xl">
              {standaloneTitle ?? activeExercise.title}
            </h2>
            <p className="mt-3 max-w-3xl text-pretty text-sm leading-7 text-[color:var(--muted)]">
              {standalonePrompt ?? activeExercise.prompt}
            </p>
          </div>
        </div>
      </div>

      <WorkbenchShell
        toolbar={
          <>
            {activeExercise.hints.length > 0 ? (
              <Button
                onClick={() =>
                  setHintIndex((current) =>
                    Math.min(current + 1, activeExercise.hints.length - 1)
                  )
                }
                variant="secondary"
              >
                <Lightbulb className="size-4" />
                Hint
              </Button>
            ) : null}
            <Button onClick={resetFiles} variant="secondary">
              <RefreshCcw className="size-4" />
              Reset
            </Button>
            {activeExercise.checks.length > 0 ? (
              <Button onClick={checkExercise} variant="secondary">
                <Check className="size-4" />
                Check
              </Button>
            ) : null}
            <Button onClick={runPreview}>
              <Play className="size-4 fill-current" />
              Run
            </Button>
          </>
        }
      >
      <div className="grid gap-5 p-4 2xl:grid-cols-[minmax(0,1fr)_minmax(440px,0.95fr)]">
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

        <div className="space-y-5">
            <div className="overflow-hidden rounded-lg border border-[color:var(--line)] bg-white shadow-[0_8px_24px_rgba(17,17,17,0.04)]">
              <div className="flex items-center gap-2 border-b border-[color:var(--line)] bg-white px-4 py-3 text-xs font-medium text-[color:var(--muted)]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2">Live preview</span>
              </div>
              <iframe
                ref={iframeRef}
                className="h-[620px] w-full border-0 bg-white"
                sandbox="allow-scripts allow-same-origin"
                srcDoc={previewDoc}
                title="Lesson preview"
              />
            </div>

            <div className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface-subtle)]/80 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-[color:var(--muted)]">
                  Review state
                </p>
                {xpState ? (
                  <span className="rounded-md bg-[color:var(--success-soft)] px-2.5 py-1 text-xs font-medium text-[color:var(--success)]">
                    XP saved
                  </span>
                ) : null}
              </div>

              {status === "idle" ? (
                <div className="mt-4 rounded-lg border border-[color:var(--line)] bg-white p-4">
                  <p className="text-sm leading-6 text-[color:var(--muted)]">
                    Run the preview, then check the exercise when you are ready.
                  </p>
                </div>
              ) : null}

              {status === "pass" ? (
                <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-white p-2">
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
                        <Button className="mt-4" href={nextLessonHref}>
                          Continue to {nextLessonTitle ?? "next lesson"}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}

              {status === "fail" ? (
                <div className="mt-4 space-y-4 rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-white p-2">
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
                    <div key={result.rule.message} className="rounded-lg border border-[color:var(--line)] bg-white p-3">
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
                <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-white p-2">
                      <Lightbulb className="h-4 w-4 text-[color:var(--warning)]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[color:var(--warning)]">
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

            <div className="rounded-lg border border-[color:var(--line)] bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-[color:var(--surface-subtle)] p-3">
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
      </WorkbenchShell>
    </section>
  );
}
