"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Clock3, Lock, Target } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Badge, Button, CapstoneMilestones, Card, CareerChecklist, Progress, SeriousPanel } from "@/components/render-ui";
import { ProjectSubmissionShell } from "@/components/ProjectSubmissionShell";
import {
  curriculumPhases,
  getPhaseActivityIds,
  getPhaseExerciseIds,
  getPhaseLessonIds,
  getPhaseProjectIds
} from "@/content";
import { getPhaseAccessState, getPhaseCtaLabel } from "@/lib/curriculum-progress";
import { completePhase, getDefaultProgress, progressForPhase, readProgress } from "@/lib/progress";
import { isCurriculumReviewMode } from "@/lib/review-mode";
import { CurriculumPhase, UserProgress } from "@/lib/types";

type PhaseDetailClientProps = {
  phase: CurriculumPhase;
  nextPhaseSlug?: string;
};

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3 text-sm leading-6 text-[color:var(--foreground)]">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[color:var(--success)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold text-[color:var(--muted-strong)]">{children}</p>;
}

export function PhaseDetailClient({ phase, nextPhaseSlug }: PhaseDetailClientProps) {
  const [progress, setProgress] = useState<UserProgress>(() => getDefaultProgress());

  const lessonIds = useMemo(() => getPhaseLessonIds(phase), [phase]);
  const exerciseIds = useMemo(() => getPhaseExerciseIds(phase), [phase]);
  const activityIds = useMemo(() => getPhaseActivityIds(phase), [phase]);
  const projectIds = useMemo(() => getPhaseProjectIds(phase), [phase]);
  const snapshot = progressForPhase(progress, lessonIds, exerciseIds, activityIds, projectIds, phase);
  const accessState = getPhaseAccessState(phase, curriculumPhases, progress);
  const locked = accessState === "locked" || accessState === "coming-soon";
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

  useEffect(() => {
    if (snapshot.completionPercent === 100 && !progress.completedPhaseIds.includes(phase.id)) {
      completePhase(phase.id);
      window.dispatchEvent(new Event("render-progress-changed"));
    }
  }, [phase.id, progress.completedPhaseIds, snapshot.completionPercent]);

  const firstLesson = phase.lessons[0];
  const primaryCtaLabel = getPhaseCtaLabel(accessState);
  const isCapstone = phase.type === "capstone";
  const isCareer = phase.type === "career";

  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-[color:var(--muted)]">
        <Link className="hover:text-[color:var(--foreground)]" href="/">
          Home
        </Link>
        <ChevronRight className="size-4" />
        <Link className="hover:text-[color:var(--foreground)]" href="/tracks">
          Curriculum
        </Link>
        <ChevronRight className="size-4" />
        <span className="text-[color:var(--foreground)]">{phase.title}</span>
      </nav>

      <section className="grid gap-6 rounded-lg border border-[color:var(--line)] bg-white p-6 shadow-[0_10px_30px_rgba(17,17,17,0.045)] lg:grid-cols-[minmax(0,1fr)_310px] md:p-8">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Phase {phase.order}</Badge>
            <Badge tone={isCapstone ? "purple" : isCareer ? "blue" : "neutral"}>{phase.type}</Badge>
            <Badge>{phase.difficulty}</Badge>
            {reviewMode ? <Badge tone="purple">Review mode</Badge> : null}
          </div>
          <h1 className="mt-5 max-w-4xl text-balance text-3xl font-semibold md:text-4xl">
            {phase.title}
          </h1>
          <p className="mt-4 max-w-3xl text-pretty text-base leading-7 text-[color:var(--muted)]">
            {phase.goal}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {firstLesson && !locked ? (
              <Button href={`/tracks/${phase.slug}/${firstLesson.slug}`}>
                {primaryCtaLabel}
                <ArrowRight className="size-4" />
              </Button>
            ) : null}
            {locked ? (
              <Button disabled variant="secondary">
                <Lock className="size-4" />
                {primaryCtaLabel}
              </Button>
            ) : null}
            {nextPhaseSlug && !locked ? (
              <Button href={`/tracks/${nextPhaseSlug}`} variant="secondary">
                Next phase
                <ArrowRight className="size-4" />
              </Button>
            ) : null}
          </div>
        </div>

        <Card className="rounded-lg p-5 shadow-none">
          <div className="flex items-center justify-between gap-3">
            <SectionTitle>Phase progress</SectionTitle>
            {locked ? <Lock className="size-4 text-[color:var(--muted)]" /> : null}
          </div>
          <p className="mt-5 text-4xl font-semibold tabular-nums">{snapshot.completionPercent}%</p>
          <Progress className="mt-4" value={snapshot.completionPercent} />
          <div className="mt-5 grid gap-3 text-sm text-[color:var(--muted)]">
            <div className="flex justify-between gap-3">
              <span>Estimated time</span>
              <span className="font-medium text-[color:var(--foreground)]">{phase.estimatedTime}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span>Lessons</span>
              <span className="font-medium tabular-nums text-[color:var(--foreground)]">{phase.lessons.length}</span>
            </div>
          </div>
        </Card>
      </section>

      {isCapstone ? (
        <SeriousPanel
          title="Final assessment brief"
          copy="Build, document, deploy, and present a review-ready product dashboard. The goal is proof of judgment and craft, not a decorative final project."
        >
          <CapstoneMilestones />
        </SeriousPanel>
      ) : null}

      {isCareer ? (
        <SeriousPanel
          title="Final launchpad"
          copy="Package your strongest work clearly and honestly. Render helps you prepare evidence; it does not promise hiring outcomes."
        >
          <CareerChecklist />
        </SeriousPanel>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-lg p-5">
          <SectionTitle>Topics</SectionTitle>
          <Bullets items={phase.topics} />
        </Card>
        <Card className="rounded-lg p-5">
          <SectionTitle>Deliverables</SectionTitle>
          <Bullets items={phase.deliverables} />
        </Card>
        <Card className="rounded-lg p-5">
          <SectionTitle>Unlock requirements</SectionTitle>
          <Bullets items={phase.unlockRequirements} />
        </Card>
      </div>

      {phase.lessons.length > 0 ? (
        <Card className="rounded-lg p-5 md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionTitle>{isCapstone ? "Milestone labs" : isCareer ? "Career labs" : "Browser labs"}</SectionTitle>
              <h2 className="mt-2 text-2xl font-semibold">Lessons and labs</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[color:var(--muted)]">
              Each item includes context, guided objectives, workbench tasks, and completion evidence.
            </p>
          </div>
          <div className="mt-6 grid gap-3">
            {phase.lessons.map((lesson, index) => {
              const complete = progress.completedLessonIds.includes(lesson.id);
              return (
                <Link
                  key={lesson.id}
                  href={locked ? `/tracks/${phase.slug}` : `/tracks/${phase.slug}/${lesson.slug}`}
                  className="group grid gap-4 rounded-lg border border-[color:var(--line)] bg-[color:var(--surface-subtle)]/70 p-4 transition hover:border-[color:var(--line-strong)] hover:bg-white md:grid-cols-[44px_minmax(0,1fr)_auto]"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg border border-[color:var(--line)] bg-white text-sm font-medium tabular-nums">
                    {complete ? <CheckCircle2 className="size-5 text-[color:var(--success)]" /> : String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-[color:var(--muted)]">
                      <Clock3 className="size-3.5" />
                      {lesson.duration}
                    </div>
                    <h3 className="mt-1 truncate text-base font-semibold">{lesson.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-[color:var(--muted)]">
                      {lesson.objectives[0]}
                    </p>
                  </div>
                  <span className="flex items-center gap-2 text-sm font-medium">
                    {reviewMode && !complete ? "Preview" : locked ? "Locked" : complete ? "Review" : "Start"}
                    <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Card>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.55fr)]">
        <Card className="rounded-lg p-5">
          <div className="flex items-start gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-[color:var(--surface-subtle)]">
              <Target className="size-4" />
            </span>
            <div>
              <SectionTitle>Project and rubric</SectionTitle>
              <Bullets items={phase.evaluationCriteria} />
            </div>
          </div>
        </Card>
        <Card className="rounded-lg p-5">
          <SectionTitle>Required tools</SectionTitle>
          <Bullets items={phase.requiredTools} />
        </Card>
      </div>

      {phase.projects.map((project) =>
        locked && !reviewMode ? (
          <Card key={project.id} className="rounded-lg p-5">
            <SectionTitle>Project preview</SectionTitle>
            <h3 className="mt-3 text-xl font-semibold">{project.title}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[color:var(--muted)]">{project.brief}</p>
          </Card>
        ) : (
          <ProjectSubmissionShell key={project.id} project={project} />
        )
      )}
    </div>
  );
}
