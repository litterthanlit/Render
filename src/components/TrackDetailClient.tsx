"use client";

import Link from "next/link";
import { CheckCircle2, ChevronRight, Target } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { progressForTrack, readProgress } from "@/lib/progress";
import { Track } from "@/lib/types";

type TrackDetailClientProps = {
  track: Track;
};

export function TrackDetailClient({ track }: TrackDetailClientProps) {
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [completionPercent, setCompletionPercent] = useState(0);

  const lessonIds = useMemo(
    () => track.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id)),
    [track]
  );
  const exerciseIds = useMemo(
    () =>
      track.modules.flatMap((module) =>
        module.lessons.flatMap((lesson) => (lesson.exercise ? [lesson.exercise.id] : []))
      ),
    [track]
  );

  useEffect(() => {
    const sync = () => {
      const progress = readProgress();
      setCompletedLessonIds(progress.completedLessonIds);
      setCompletionPercent(progressForTrack(progress, lessonIds, exerciseIds).completionPercent);
    };

    sync();
    window.addEventListener("render-progress-changed", sync as EventListener);

    return () => {
      window.removeEventListener("render-progress-changed", sync as EventListener);
    };
  }, [exerciseIds, lessonIds]);

  return (
    <div className="space-y-10">
      <nav className="flex items-center gap-2 text-sm text-[color:var(--muted)]">
        <Link className="transition hover:text-[color:var(--foreground)]" href="/">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span>Tracks</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-[color:var(--foreground)]">{track.title}</span>
      </nav>

      <div className="grid gap-5 rounded-[32px] border border-[color:var(--line)] bg-white p-6 shadow-[0_1px_0_rgba(16,24,40,0.04)] md:grid-cols-[minmax(0,2fr)_minmax(220px,1fr)] md:p-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--muted)]">
            {track.level} track
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[color:var(--foreground)] md:text-6xl">
            {track.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted)]">
            {track.shortDescription}
          </p>
        </div>
        <div className="rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] p-5">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Track progress
          </p>
          <p className="mt-3 text-4xl font-semibold text-[color:var(--foreground)]">
            {completionPercent}%
          </p>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            {lessonIds.length} lessons across {track.modules.length} modules.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {track.modules.map((module, moduleIndex) => (
          <section
            key={module.id}
            className="rounded-[28px] border border-[color:var(--line)] bg-white p-6 shadow-[0_1px_0_rgba(16,24,40,0.04)] md:p-8"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--muted)]">
                  Module {moduleIndex + 1}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">
                  {module.title}
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-[color:var(--muted)]">
                {module.summary}
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              {module.lessons.map((lesson, lessonIndex) => {
                const complete = completedLessonIds.includes(lesson.id);
                return (
                  <Link
                    key={lesson.id}
                    href={`/tracks/${track.slug}/${lesson.slug}`}
                    className="group grid gap-4 rounded-[22px] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] p-5 transition hover:border-[color:var(--line-strong)] hover:bg-white md:grid-cols-[auto_1fr_auto]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--line)] bg-white text-sm text-[color:var(--foreground)]">
                      {complete ? (
                        <CheckCircle2 className="h-5 w-5 text-[color:var(--success)]" />
                      ) : (
                        String(lessonIndex + 1).padStart(2, "0")
                      )}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--muted)]">
                        {lesson.duration}
                      </p>
                      <h3 className="mt-2 text-xl font-medium text-[color:var(--foreground)]">
                        {lesson.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                        {lesson.objectives[0]}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.22em] ${
                          complete
                            ? "bg-[color:var(--success-soft)] text-[color:var(--success)]"
                            : "bg-white text-[color:var(--muted)]"
                        }`}
                      >
                        {complete ? "Complete" : "Start"}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        <section className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-white p-3 shadow-[0_1px_0_rgba(16,24,40,0.04)]">
              <Target className="h-5 w-5 text-[color:var(--foreground)]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[color:var(--foreground)]">
                How to move through this track
              </h2>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                Read the lesson, run the starter code, then use Check to confirm the core
                behavior. Progress is saved locally so you can come back and continue.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
