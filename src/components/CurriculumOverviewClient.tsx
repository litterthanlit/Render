"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Flag, Layers3, Lock, Play, Rocket } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge, Button, Card, Progress, SmallMetric } from "@/components/render-ui";
import {
  getPhaseActivityIds,
  getPhaseExerciseIds,
  getPhaseLessonIds,
  getPhaseProjectIds
} from "@/content";
import { getPhaseAccessState, getPhaseCtaLabel } from "@/lib/curriculum-progress";
import { getDefaultProgress, progressForPhase, readProgress } from "@/lib/progress";
import { isCurriculumReviewMode } from "@/lib/review-mode";
import { cn } from "@/lib/cn";
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

const sidebarLinks = [
  { href: "/tracks", label: "Curriculum" },
  { href: "/capstone", label: "Projects" },
  { href: "/career-prep", label: "Career" },
  { href: "/playground", label: "Playground" }
];

function stateTone(state: ReturnType<typeof getPhaseAccessState>) {
  if (state === "completed") return "success";
  if (state === "in-progress") return "blue";
  if (state === "available") return "purple";
  return "neutral";
}

export function CurriculumOverviewClient({ phases }: CurriculumOverviewClientProps) {
  const pathname = usePathname();
  const [progress, setProgress] = useState<UserProgress>(() => getDefaultProgress());
  const reviewMode = isCurriculumReviewMode();

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
  const totalPercent = Math.round(
    phaseSnapshots.reduce((sum, item) => sum + item.completionPercent, 0) / phases.length
  );
  const continuePhase =
    phases.find((phase, index) => phaseStates[index] !== "locked" && phaseStates[index] !== "coming-soon" && phaseSnapshots[index].completionPercent < 100) ?? phases[0];
  const continueIndex = phases.findIndex((phase) => phase.id === continuePhase.id);
  const continueSnapshot = phaseSnapshots[continueIndex] ?? phaseSnapshots[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_280px]">
      <aside className="hidden rounded-lg border border-[color:var(--line)] bg-white p-3 shadow-[0_8px_24px_rgba(17,17,17,0.035)] xl:block">
        <nav className="space-y-1">
          {sidebarLinks.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2.5 text-sm transition",
                  active
                    ? "bg-[color:var(--surface-subtle)] font-medium text-[color:var(--foreground)]"
                    : "text-[color:var(--muted)] hover:bg-[color:var(--surface-subtle)] hover:text-[color:var(--foreground)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        {progress.streakCount > 0 ? (
          <Card className="mt-6 rounded-lg p-4 shadow-none">
            <p className="text-2xl font-semibold tabular-nums">{progress.streakCount}</p>
            <p className="mt-1 text-xs text-[color:var(--muted)]">day streak</p>
          </Card>
        ) : null}
      </aside>

      <main className="min-w-0 space-y-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-balance text-3xl font-semibold md:text-4xl">Your curriculum</h1>
            <p className="mt-2 text-pretty text-sm leading-6 text-[color:var(--muted)]">
              Track your progress and keep building.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <SmallMetric label="phases" value="14" icon={<Layers3 className="size-4" />} />
            <SmallMetric label="hands-on labs" value="100+" icon={<Rocket className="size-4" />} />
            <SmallMetric label="real projects" value="20+" icon={<CheckCircle2 className="size-4" />} />
            <SmallMetric label="capstone" value="1" icon={<Flag className="size-4" />} />
          </div>
        </div>

        {reviewMode ? (
          <Badge tone="purple">Curriculum review mode: all phases and lessons are viewable.</Badge>
        ) : null}

        <Card className="rounded-lg p-5">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex size-10 items-center justify-center rounded-lg bg-[color:var(--foreground)] text-white">
                <Play className="size-4 fill-current" />
              </span>
              <div>
                <p className="text-sm text-[color:var(--muted)]">Continue where you left off</p>
                <h2 className="mt-1 text-xl font-semibold">{continuePhase.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
                  {continuePhase.shortDescription}
                </p>
              </div>
            </div>
            <div className="min-w-full md:min-w-[240px]">
              <div className="mb-2 flex justify-between text-sm text-[color:var(--muted)]">
                <span>{continueSnapshot.completionPercent}% complete</span>
                <span>{continuePhase.estimatedTime}</span>
              </div>
              <Progress value={continueSnapshot.completionPercent} />
              <Button className="mt-4 w-full" href={`/tracks/${continuePhase.slug}`} variant="secondary">
                Continue
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid gap-3">
          {phases.map((phase, index) => {
            const snapshot = phaseSnapshots[index];
            const state = phaseStates[index];
            const locked = state === "locked" || state === "coming-soon";
            return (
              <Link
                key={phase.id}
                href={`/tracks/${phase.slug}`}
                className="group grid gap-4 rounded-lg border border-[color:var(--line)] bg-white p-4 shadow-[0_1px_0_rgba(17,17,17,0.03)] transition hover:border-[color:var(--line-strong)] hover:shadow-[0_12px_30px_rgba(17,17,17,0.045)] md:grid-cols-[48px_minmax(0,1fr)_230px]"
              >
                <div className="flex size-11 items-center justify-center rounded-lg border border-[color:var(--line)] bg-[color:var(--surface-subtle)] text-sm font-semibold tabular-nums">
                  {snapshot.completionPercent === 100 ? <CheckCircle2 className="size-5 text-[color:var(--success)]" /> : locked ? <Lock className="size-4 text-[color:var(--muted)]" /> : phase.order}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{phaseTypeLabel(phase.type)}</Badge>
                    <Badge>
                      <Clock3 className="size-3" />
                      {phase.estimatedTime}
                    </Badge>
                    <Badge tone={stateTone(state)}>{state.replace("-", " ")}</Badge>
                  </div>
                  <h2 className="mt-3 truncate text-lg font-semibold">{phase.title}</h2>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-[color:var(--muted)]">
                    {phase.shortDescription}
                  </p>
                </div>
                <div className="flex flex-col justify-center gap-3">
                  <div className="flex items-center justify-between text-xs text-[color:var(--muted)]">
                    <span>{snapshot.completedLessons + snapshot.completedProjects}/{snapshot.totalLessons + snapshot.totalProjects} complete</span>
                    <span>{snapshot.completionPercent}%</span>
                  </div>
                  <Progress value={snapshot.completionPercent} />
                  <span className="inline-flex items-center justify-end gap-2 text-sm font-medium">
                    {getPhaseCtaLabel(state)}
                    <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <aside className="space-y-4">
        <Card className="rounded-lg p-5">
          <p className="text-sm font-medium">Overall progress</p>
          <div className="mt-6 flex items-center justify-center">
            <div className="grid size-36 place-items-center rounded-full border-[10px] border-[color:var(--surface-subtle)] text-center">
              <div>
                <p className="text-3xl font-semibold tabular-nums">{totalPercent}%</p>
                <p className="text-xs text-[color:var(--muted)]">completed</p>
              </div>
            </div>
          </div>
          <Progress className="mt-4" value={totalPercent} />
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-[color:var(--muted)]">Labs completed</span>
              <span className="font-medium tabular-nums">
                {phaseSnapshots.reduce((sum, item) => sum + item.completedLessons + item.completedProjects, 0)}/
                {phaseSnapshots.reduce((sum, item) => sum + item.totalLessons + item.totalProjects, 0)}
              </span>
            </div>
            {progress.streakCount > 0 ? (
              <div className="flex justify-between gap-3">
                <span className="text-[color:var(--muted)]">Current streak</span>
                <span className="font-medium tabular-nums">{progress.streakCount} days</span>
              </div>
            ) : null}
          </div>
          <Button className="mt-6 w-full" href="/tracks" variant="secondary">
            View full roadmap
          </Button>
        </Card>
      </aside>
    </div>
  );
}
