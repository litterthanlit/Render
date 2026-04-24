"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Lock, Route, Sparkles } from "lucide-react";
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

  return (
    <div className="space-y-10">
      <section className="grid gap-6 rounded-[32px] border border-[color:var(--line)] bg-white p-6 shadow-[0_1px_0_rgba(16,24,40,0.04)] md:grid-cols-[minmax(0,1.6fr)_minmax(260px,0.8fr)] md:p-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--muted)]">
            Design engineer curriculum
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)] md:text-6xl">
            A complete path from designer to hireable design engineer.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[color:var(--muted)]">
            This MVP maps the full 14-phase program from the curriculum spec, keeps the
            hands-on browser labs for beginner work, and creates the project and capstone
            scaffolding needed for the full platform.
          </p>
          <Link
            className="button-primary mt-6 inline-flex items-center gap-2"
            href={`/tracks/${continuePhase.slug}`}
          >
            Continue learning
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 rounded-[24px] bg-[color:var(--surface-subtle)] p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white p-3">
              <Route className="h-5 w-5 text-[color:var(--foreground)]" />
            </div>
            <div>
              <p className="text-3xl font-semibold text-[color:var(--foreground)]">
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
            <div className="rounded-2xl bg-white p-4">
              <p className="text-2xl font-semibold">{phases.length}</p>
              <p className="mt-1 text-[color:var(--muted)]">Phases</p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-2xl font-semibold">{availablePhases}</p>
              <p className="mt-1 text-[color:var(--muted)]">Open in MVP</p>
            </div>
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
              className="group grid gap-5 rounded-[28px] border border-[color:var(--line)] bg-white p-5 shadow-[0_1px_0_rgba(16,24,40,0.04)] transition hover:border-[color:var(--line-strong)] hover:shadow-[0_16px_44px_rgba(15,23,42,0.06)] md:grid-cols-[72px_minmax(0,1fr)_220px]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface-subtle)] text-sm font-semibold text-[color:var(--foreground)]">
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
                  <span className="rounded-full bg-[color:var(--surface-subtle)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--muted)]">
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
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                  {phase.title}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-[color:var(--muted)]">
                  {phase.shortDescription}
                </p>
              </div>
              <div className="flex flex-col justify-between gap-4">
                <div className="rounded-3xl bg-[color:var(--surface-subtle)] p-4">
                  <div className="flex items-center justify-between text-sm text-[color:var(--muted)]">
                    <span>{snapshot.completionPercent}% complete</span>
                    <span>{state.replace("-", " ")}</span>
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
                  <Sparkles className="h-4 w-4 transition group-hover:scale-105" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
