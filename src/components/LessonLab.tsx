"use client";

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
};

const blankExercise = {
  id: "playground-exercise",
  title: "Freeform playground",
  prompt: "Experiment freely with HTML, CSS, and JS.",
  runtime: "html-css-js" as const,
  starterFiles: {
    html: `<main class="playground-card">\n  <p class="eyebrow">Render Lab</p>\n  <h1>Make this canvas yours.</h1>\n  <p>Prototype interactions, revise layouts, and explore ideas without checkpoints.</p>\n</main>`,
    css: `.playground-card {\n  width: min(560px, calc(100vw - 48px));\n  margin: 48px auto;\n  padding: 32px;\n  border-radius: 28px;\n  background: rgba(16, 20, 23, 0.96);\n  border: 1px solid rgba(106, 227, 255, 0.18);\n}\n.eyebrow {\n  color: #f3a562;\n  text-transform: uppercase;\n  letter-spacing: 0.24em;\n  font-size: 12px;\n}`,
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
  initialFiles
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
      <div className="rounded-[28px] border border-[color:var(--line-strong)] bg-[rgba(8,10,12,0.95)] p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--warm)]">
              Interactive lab
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[color:var(--paper)]">
              {standaloneTitle ?? activeExercise.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[color:var(--muted)]">
              {standalonePrompt ?? activeExercise.prompt}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="button-muted" onClick={runPreview} type="button">
              Run
            </button>
            {activeExercise.checks.length > 0 ? (
              <button className="button-primary" onClick={checkExercise} type="button">
                Check
              </button>
            ) : null}
            <button className="button-muted" onClick={resetFiles} type="button">
              Reset
            </button>
            {activeExercise.hints.length > 0 ? (
              <button
                className="button-muted"
                onClick={() =>
                  setHintIndex((current) =>
                    Math.min(current + 1, activeExercise.hints.length - 1)
                  )
                }
                type="button"
              >
                Show hint
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
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
            <div className="overflow-hidden rounded-[24px] border border-white/8 bg-[rgba(6,9,10,0.96)]">
              <div className="border-b border-white/8 px-4 py-3 text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                Live preview
              </div>
              <iframe
                ref={iframeRef}
                className="h-[720px] w-full border-0 bg-[#101214]"
                sandbox="allow-scripts allow-same-origin"
                srcDoc={previewDoc}
                title="Lesson preview"
              />
            </div>

            <div className="rounded-[24px] border border-white/8 bg-white/3 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                  Review state
                </p>
                {xpState ? (
                  <span className="rounded-full bg-[color:var(--accent)]/12 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent)]">
                    XP locked in
                  </span>
                ) : null}
              </div>

              {status === "idle" ? (
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  Run the preview, then check the exercise when you are ready.
                </p>
              ) : null}

              {status === "pass" ? (
                <div className="mt-3 rounded-[20px] border border-[color:var(--accent)]/25 bg-[color:var(--accent)]/8 p-4">
                  <p className="text-sm font-medium text-[color:var(--paper)]">
                    Passed. The lesson has been marked complete.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    You earned {activeExercise.xp} XP and unlocked the next step in the track.
                  </p>
                </div>
              ) : null}

              {status === "fail" ? (
                <div className="mt-3 space-y-3 rounded-[20px] border border-[#a24934]/35 bg-[#a24934]/8 p-4">
                  <p className="text-sm font-medium text-[color:var(--paper)]">
                    Close. A few checks still need attention.
                  </p>
                  {failedResults.map((result) => (
                    <div key={result.rule.message} className="rounded-2xl border border-white/8 p-3">
                      <p className="text-sm font-medium text-[color:var(--paper)]">
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
                <div className="mt-4 rounded-[20px] border border-[color:var(--warm)]/28 bg-[color:var(--warm)]/8 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--warm)]">
                    Hint {hintIndex + 1}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--paper)]">
                    {activeExercise.hints[hintIndex]}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
