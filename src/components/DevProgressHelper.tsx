"use client";

import { useMemo, useState } from "react";

import { curriculumPhases } from "@/content/curriculum";
import { getDefaultProgress, writeProgress } from "@/lib/progress";
import { CurriculumPhase, ProjectSubmission, UserProgress } from "@/lib/types";

type SeedTarget = {
  label: string;
  phaseOrder: number;
};

const seedTargets: SeedTarget[] = [
  { label: "Seed fresh user", phaseOrder: 0 },
  { label: "Seed up to Phase 5", phaseOrder: 5 },
  { label: "Seed up to Phase 8", phaseOrder: 8 },
  { label: "Seed up to Phase 12", phaseOrder: 12 },
  { label: "Seed up to Phase 13", phaseOrder: 13 },
  { label: "Seed full completion", phaseOrder: 14 }
];

function unique(values: string[]) {
  return Array.from(new Set(values));
}

function createDemoProjectSubmission(projectId: string, requiresDeploymentUrl?: boolean): ProjectSubmission {
  return {
    projectId,
    githubUrl: `https://github.com/render-demo/${projectId}`,
    deploymentUrl: requiresDeploymentUrl ? `https://${projectId}.vercel.app` : "",
    pullRequestUrl: `https://github.com/render-demo/${projectId}/pull/1`,
    reflection:
      "Demo seed reflection: this project shows the required workflow, tradeoffs, and review-ready decisions.",
    screenshotNote: "Demo seed screenshot placeholder.",
    status: "submitted"
  };
}

function buildSeedProgress(throughPhaseOrder: number): UserProgress {
  const now = new Date().toISOString();
  const includedPhases = curriculumPhases.filter((phase) => phase.order <= throughPhaseOrder);
  const lessonIds = includedPhases.flatMap((phase) => phase.lessons.map((lesson) => lesson.id));
  const exerciseIds = includedPhases.flatMap((phase) =>
    phase.lessons.flatMap((lesson) => (lesson.exercise ? [lesson.exercise.id] : []))
  );
  const activityIds = includedPhases.flatMap((phase) =>
    phase.lessons.flatMap((lesson) => (lesson.activity ? [lesson.activity.id] : []))
  );
  const projects = includedPhases.flatMap((phase) => phase.projects);

  return {
    ...getDefaultProgress(),
    completedLessonIds: unique(lessonIds),
    completedExerciseIds: unique(exerciseIds),
    completedActivityIds: unique(activityIds),
    submittedProjectIds: unique(projects.map((project) => project.id)),
    completedPhaseIds: unique(includedPhases.map((phase) => phase.id)),
    projectSubmissions: projects.map((project) =>
      createDemoProjectSubmission(project.id, project.requiresDeploymentUrl)
    ),
    componentDocsEntries: activityIds.map((activityId) => ({
      activityId,
      fields: {
        demo: "Demo seed entry with enough content to represent completed structured work.",
        summary:
          "Seeded for local QA/demo only. Real learners complete this field through the activity UI."
      },
      updatedAt: now
    })),
    xp: throughPhaseOrder * 250,
    streakCount: throughPhaseOrder > 0 ? 7 : 0,
    lastActiveDate: throughPhaseOrder > 0 ? now : null
  };
}

function announceProgressChange() {
  window.dispatchEvent(new Event("render-progress-changed"));
}

export function DevProgressHelper() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Ready");
  const phaseCount = useMemo(
    () => curriculumPhases.filter((phase: CurriculumPhase) => phase.order <= 14).length,
    []
  );

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  function resetProgress() {
    writeProgress(getDefaultProgress());
    announceProgressChange();
    setMessage("Progress reset");
  }

  function seedProgress(target: SeedTarget) {
    writeProgress(buildSeedProgress(target.phaseOrder));
    announceProgressChange();
    setMessage(target.label);
  }

  return (
    <div className="fixed bottom-4 right-4 z-[80] max-w-[calc(100vw-2rem)]">
      {open ? (
        <div className="w-72 rounded-3xl border border-[color:var(--line)] bg-white p-3 shadow-[0_24px_80px_rgba(17,17,17,0.14)]">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Dev only
              </p>
              <p className="mt-1 text-sm font-medium text-[color:var(--foreground)]">
                Progress helper
              </p>
              <p className="mt-1 text-xs leading-5 text-[color:var(--muted)]">
                Seeds localStorage for QA across {phaseCount} phases.
              </p>
            </div>
            <button
              className="rounded-full border border-[color:var(--line)] px-2 py-1 text-xs text-[color:var(--muted)]"
              onClick={() => setOpen(false)}
              type="button"
            >
              Close
            </button>
          </div>

          <div className="grid gap-2">
            <button className="button-secondary justify-center text-xs" onClick={resetProgress} type="button">
              Reset progress
            </button>
            {seedTargets.map((target) => (
              <button
                className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-subtle)] px-3 py-2 text-left text-xs font-medium text-[color:var(--foreground)] transition hover:border-[color:var(--foreground)]"
                key={target.label}
                onClick={() => seedProgress(target)}
                type="button"
              >
                {target.label}
              </button>
            ))}
          </div>

          <p className="mt-3 rounded-2xl bg-[color:var(--surface-subtle)] px-3 py-2 text-xs text-[color:var(--muted)]">
            {message}
          </p>
        </div>
      ) : (
        <button
          className="rounded-full border border-[color:var(--line)] bg-white px-4 py-2 text-xs font-medium text-[color:var(--foreground)] shadow-[0_16px_50px_rgba(17,17,17,0.12)]"
          onClick={() => setOpen(true)}
          type="button"
        >
          Dev progress
        </button>
      )}
    </div>
  );
}
