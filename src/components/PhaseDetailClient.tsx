"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Lock, Target } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ProjectSubmissionShell } from "@/components/ProjectSubmissionShell";
import {
  curriculumPhases,
  getPhaseExerciseIds,
  getPhaseActivityIds,
  getPhaseLessonIds,
  getPhaseProjectIds
} from "@/content";
import { getPhaseAccessState, getPhaseCtaLabel } from "@/lib/curriculum-progress";
import { completePhase, getDefaultProgress, progressForPhase, readProgress } from "@/lib/progress";
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
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--foreground)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
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

  useEffect(() => {
    const sync = () => {
      setProgress(readProgress());
    };

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

  return (
    <div className="space-y-8">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-[color:var(--muted)]">
        <Link className="transition hover:text-[color:var(--foreground)]" href="/">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link className="transition hover:text-[color:var(--foreground)]" href="/tracks">
          Curriculum
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-[color:var(--foreground)]">{phase.title}</span>
      </nav>

      <section className="render-card grid gap-8 rounded-[32px] p-6 md:grid-cols-[minmax(0,1.7fr)_minmax(260px,0.8fr)] md:p-10">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[color:var(--surface-subtle)] px-3 py-1 text-xs font-normal text-[color:var(--muted)]">
              Phase {phase.order}
            </span>
            <span className="rounded-full border border-[color:var(--line)] px-3 py-1 text-xs text-[color:var(--muted)]">
              {phase.type}
            </span>
            <span className="rounded-full border border-[color:var(--line)] px-3 py-1 text-xs text-[color:var(--muted)]">
              {phase.difficulty}
            </span>
          </div>
          <h1 className="mt-5 text-5xl font-normal tracking-[-0.065em] text-[color:var(--foreground)] md:text-7xl">
            {phase.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--muted)]">
            {phase.goal}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {firstLesson && !locked ? (
              <Link
                className="button-primary inline-flex items-center gap-2"
                href={`/tracks/${phase.slug}/${firstLesson.slug}`}
              >
                {primaryCtaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
            {locked ? (
              <span className="button-muted inline-flex items-center gap-2" aria-disabled="true">
                {primaryCtaLabel}
              </span>
            ) : null}
            {nextPhaseSlug && !locked ? (
              <Link
                className="button-muted inline-flex items-center gap-2"
                href={`/tracks/${nextPhaseSlug}`}
              >
                Next phase
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
        </div>
        <div className="rounded-[24px] border border-[color:var(--line)] bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--muted)]">
              Phase progress
            </p>
            {locked ? <Lock className="h-4 w-4 text-[color:var(--muted)]" /> : null}
          </div>
          <p className="mt-4 text-4xl font-normal tracking-[-0.055em] text-[color:var(--foreground)]">
            {snapshot.completionPercent}%
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-[color:var(--foreground)] transition-all"
              style={{ width: `${snapshot.completionPercent}%` }}
            />
          </div>
          <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
            {phase.estimatedTime}. {locked ? "Preview only until the unlock requirement is met." : "Open for learning in this MVP."}
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-[28px] border border-[color:var(--line)] bg-white p-6 shadow-[0_1px_0_rgba(17,17,17,0.03)]">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
            Topics
          </p>
          <Bullets items={phase.topics} />
        </section>
        <section className="rounded-[28px] border border-[color:var(--line)] bg-white p-6 shadow-[0_1px_0_rgba(17,17,17,0.03)]">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
            Deliverables
          </p>
          <Bullets items={phase.deliverables} />
        </section>
        <section className="rounded-[28px] border border-[color:var(--line)] bg-white p-6 shadow-[0_1px_0_rgba(17,17,17,0.03)]">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
            Unlock requirements
          </p>
          <Bullets items={phase.unlockRequirements} />
        </section>
      </div>

      {phase.lessons.length > 0 ? (
        <section className="rounded-[28px] border border-[color:var(--line)] bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)] md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
                Browser labs
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">
                Interactive lessons
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[color:var(--muted)]">
              These labs preserve the current Render hands-on experience with editable code,
              live preview, automated checks, hints, completion state, and XP.
            </p>
          </div>
          <div className="mt-6 grid gap-4">
            {phase.lessons.map((lesson, index) => {
              const complete = progress.completedLessonIds.includes(lesson.id);
              return (
                <Link
                  key={lesson.id}
                  href={locked ? `/tracks/${phase.slug}` : `/tracks/${phase.slug}/${lesson.slug}`}
                className="group grid gap-4 rounded-[22px] border border-[color:var(--line)] bg-[color:var(--surface-subtle)]/75 p-5 transition hover:border-[color:var(--line-strong)] hover:bg-white md:grid-cols-[auto_1fr_auto]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--line)] bg-white text-sm text-[color:var(--foreground)]">
                    {complete ? (
                      <CheckCircle2 className="h-5 w-5 text-[color:var(--success)]" />
                    ) : (
                      String(index + 1).padStart(2, "0")
                    )}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--muted)]">
                      {lesson.duration}
                    </p>
                    <h3 className="mt-2 text-xl font-normal tracking-[-0.025em] text-[color:var(--foreground)]">
                      {lesson.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                      {lesson.objectives[0]}
                    </p>
                  </div>
                  <span className="flex items-center text-sm font-medium text-[color:var(--foreground)]">
                    {locked ? "Locked" : complete ? "Review" : "Start"}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-white p-3">
            <Target className="h-5 w-5 text-[color:var(--foreground)]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[color:var(--foreground)]">
              Evaluation criteria
            </h2>
            <Bullets items={phase.evaluationCriteria} />
          </div>
        </div>
      </section>

      {phase.labs.length > 0 ? (
        <section className="rounded-[28px] border border-[color:var(--line)] bg-white p-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
            Required labs and activities
          </p>
          <Bullets items={phase.labs} />
        </section>
      ) : null}

      {phase.projects.map((project) =>
        locked ? (
          <section
            key={project.id}
            className="rounded-[28px] border border-[color:var(--line)] bg-white p-6 shadow-[0_1px_0_rgba(16,24,40,0.04)]"
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
              Project preview
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">
              {project.title}
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[color:var(--muted)]">
              {project.brief}
            </p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
                  Deliverables preview
                </p>
                <Bullets items={project.deliverables} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
                  Rubric preview
                </p>
                <Bullets items={project.rubric} />
              </div>
            </div>
          </section>
        ) : (
          <ProjectSubmissionShell key={project.id} project={project} />
        )
      )}

      <section className="grid gap-4 rounded-[28px] border border-[color:var(--line)] bg-white p-6 md:grid-cols-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
            Required tools
          </p>
          <Bullets items={phase.requiredTools} />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
            Mentor checkpoints placeholder
          </p>
          <Bullets items={phase.mentorCheckpoints} />
        </div>
      </section>
    </div>
  );
}
