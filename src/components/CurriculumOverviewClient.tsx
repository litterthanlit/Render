"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Lock, Play, Route } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  getPhaseExerciseIds,
  getPhaseActivityIds,
  getPhaseLessonIds,
  getPhaseProjectIds
} from "@/content";
import { getPhaseAccessState, getPhaseCtaLabel } from "@/lib/curriculum-progress";
import { getDefaultProgress, progressForPhase, readProgress } from "@/lib/progress";
import { CurriculumPhase, UserProgress } from "@/lib/types";

type CurriculumOverviewClientProps = {
  phases: CurriculumPhase[];
};

function phaseTypeLabel(type: CurriculumPhase["type"]) {
  return {
    fundamentals: "Fundamentals",
    project: "Project",
    systems: "Systems",
    capstone: "Capstone",
    career: "Career"
  }[type];
}

function stateClass(state: ReturnType<typeof getPhaseAccessState>) {
  return {
    available: "border-[color:var(--accent-blue)]/20 bg-blue-50/60 text-blue-700",
    "in-progress": "border-[color:var(--accent)]/20 bg-[color:var(--accent-soft)] text-[color:var(--accent)]",
    completed: "border-[color:var(--success)]/20 bg-[color:var(--success-soft)] text-[color:var(--success)]",
    locked: "border-[color:var(--line)] bg-[color:var(--surface-subtle)] text-[color:var(--muted)]",
    "coming-soon": "border-[color:var(--line)] bg-[color:var(--surface-subtle)] text-[color:var(--muted)]"
  }[state];
}

export function CurriculumOverviewClient({ phases }: CurriculumOverviewClientProps) {
  const [progress, setProgress] = useState<UserProgress>(() => getDefaultProgress());

  useEffect(() => {
    const sync = () => setProgress(readProgress());

    sync();
    window.addEventListener("render-progress-changed", sync as EventListener);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("render-progress-changed", sync as EventListener);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const phaseSnapshots = phases.map((phase) =>
    progressForPhase(
      progress,
      getPhaseLessonIds(phase),
      getPhaseExerciseIds(phase),
      getPhaseActivityIds(phase),
      getPhaseProjectIds(phase),
      phase
    )
  );
  const phaseStates = phases.map((phase) => getPhaseAccessState(phase, phases, progress));
  const availablePhases = phaseStates.filter((state) => state !== "locked" && state !== "coming-soon").length;
  const totalPercent = Math.round(
    phaseSnapshots.reduce((sum, item) => sum + item.completionPercent, 0) / phases.length
  );
  const continuePhase =
    phases.find((phase, index) => phaseStates[index] !== "locked" && phaseStates[index] !== "coming-soon" && phaseSnapshots[index].completionPercent < 100) ??
    phases[0];
  const continueSnapshot = phaseSnapshots[phases.findIndex((phase) => phase.id === continuePhase.id)] ?? phaseSnapshots[0];

  return (
    <div className="space-y-10">
      <section className="render-card grid gap-8 rounded-[32px] p-6 md:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.85fr)] md:p-10">
        <div>
          <p className="text-sm text-[color:var(--muted)]">
            Curriculum dashboard
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-normal tracking-[-0.065em] text-[color:var(--foreground)] md:text-7xl">
            The full design engineering path.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
            Move from first code concepts to React, TypeScript, systems, deployment,
            capstone, and a review-ready portfolio package.
          </p>
          <Link
            className="button-primary mt-6 inline-flex items-center gap-2"
            href={`/tracks/${continuePhase.slug}`}
          >
            Continue learning
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 rounded-[26px] border border-[color:var(--line)] bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-[color:var(--surface-subtle)] p-3">
              <Route className="h-5 w-5 text-[color:var(--foreground)]" />
            </div>
            <div>
              <p className="text-3xl font-normal tracking-[-0.05em] text-[color:var(--foreground)]">
                {totalPercent}%
              </p>
              <p className="text-sm text-[color:var(--muted)]">Total curriculum progress</p>
            </div>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-[color:var(--foreground)] transition-all"
              style={{ width: `${totalPercent}%` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl border border-[color:var(--line)] bg-white p-4">
              <p className="text-2xl font-normal">{phases.length}</p>
              <p className="mt-1 text-[color:var(--muted)]">Phases</p>
            </div>
            <div className="rounded-2xl border border-[color:var(--line)] bg-white p-4">
              <p className="text-2xl font-normal">{availablePhases}</p>
              <p className="mt-1 text-[color:var(--muted)]">Open in MVP</p>
            </div>
          </div>
        </div>
      </section>

      <section className="render-card rounded-[28px] p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-[color:var(--surface-subtle)] p-3">
              <Play className="h-5 w-5 fill-[color:var(--foreground)] text-[color:var(--foreground)]" />
            </div>
            <div>
              <p className="text-sm text-[color:var(--muted)]">Continue where you left off</p>
              <h2 className="mt-1 text-2xl font-normal tracking-[-0.035em] text-[color:var(--foreground)]">
                {continuePhase.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
                {continuePhase.shortDescription}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 md:min-w-[220px]">
            <div className="flex justify-between text-sm text-[color:var(--muted)]">
              <span>{continueSnapshot.completionPercent}% complete</span>
              <span>{continuePhase.estimatedTime}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[color:var(--surface-subtle)]">
              <div className="h-full rounded-full bg-[color:var(--foreground)]" style={{ width: `${continueSnapshot.completionPercent}%` }} />
            </div>
            <Link className="button-muted inline-flex items-center justify-center gap-2" href={`/tracks/${continuePhase.slug}`}>
              Continue
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="grid gap-4">
        {phases.map((phase, index) => {
          const snapshot = phaseSnapshots[index];
          const state = phaseStates[index];
          const locked = state === "locked" || state === "coming-soon";
          return (
            <Link
              key={phase.id}
              href={`/tracks/${phase.slug}`}
              className="group grid gap-5 rounded-[26px] border border-[color:var(--line)] bg-white p-5 shadow-[0_1px_0_rgba(17,17,17,0.03)] transition hover:border-[color:var(--line-strong)] hover:shadow-[0_18px_52px_rgba(17,17,17,0.055)] md:grid-cols-[72px_minmax(0,1fr)_240px]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-subtle)] text-sm font-medium text-[color:var(--foreground)]">
                {snapshot.completionPercent === 100 ? (
                  <CheckCircle2 className="h-6 w-6 text-[color:var(--success)]" />
                ) : locked ? (
                  <Lock className="h-5 w-5 text-[color:var(--muted)]" />
                ) : (
                  String(phase.order).padStart(2, "0")
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[color:var(--surface-subtle)] px-3 py-1 text-xs font-normal text-[color:var(--muted)]">
                    {phaseTypeLabel(phase.type)}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--line)] px-3 py-1 text-xs text-[color:var(--muted)]">
                    <Clock3 className="h-3.5 w-3.5" />
                    {phase.estimatedTime}
                  </span>
                  <span className="rounded-full border border-[color:var(--line)] px-3 py-1 text-xs text-[color:var(--muted)]">
                    {phase.difficulty}
                  </span>
                </div>
                <h2 className="mt-3 text-2xl font-normal tracking-[-0.035em] text-[color:var(--foreground)]">
                  {phase.title}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-[color:var(--muted)]">
                  {phase.shortDescription}
                </p>
              </div>
              <div className="flex flex-col justify-between gap-4">
                <div className="rounded-[20px] bg-[color:var(--surface-subtle)] p-4">
                  <div className="flex items-center justify-between text-sm text-[color:var(--muted)]">
                    <span>{snapshot.completionPercent}% complete</span>
                    <span className={`rounded-full border px-2.5 py-1 text-xs ${stateClass(state)}`}>{state.replace("-", " ")}</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full bg-[color:var(--foreground)] transition-all"
                      style={{ width: `${snapshot.completionPercent}%` }}
                    />
                  </div>
                </div>
                <span className="inline-flex items-center justify-end gap-2 text-sm font-medium text-[color:var(--foreground)]">
                  {getPhaseCtaLabel(state)}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
