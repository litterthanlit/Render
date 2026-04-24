"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { progressForTrack, readProgress } from "@/lib/progress";
import { Track } from "@/lib/types";

type TrackCardProps = {
  track: Track;
};

export function TrackCard({ track }: TrackCardProps) {
  const [completionPercent, setCompletionPercent] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(0);

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
      const snapshot = progressForTrack(progress, lessonIds, exerciseIds);
      setCompletionPercent(snapshot.completionPercent);
      setCompletedLessons(snapshot.completedLessons);
    };

    sync();
    window.addEventListener("render-progress-changed", sync as EventListener);

    return () => {
      window.removeEventListener("render-progress-changed", sync as EventListener);
    };
  }, [exerciseIds, lessonIds]);

  const started = completedLessons > 0;

  return (
    <Link
      href={`/tracks/${track.slug}`}
      className="group flex h-full flex-col justify-between rounded-[28px] border border-[color:var(--line)] bg-white p-6 shadow-[0_1px_0_rgba(16,24,40,0.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(15,23,42,0.08)]"
    >
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--surface-subtle)] px-3 py-1 text-[11px] font-medium text-[color:var(--muted)]">
              <BookOpen className="h-3.5 w-3.5" />
              {track.level}
            </div>
            <div>
              <h3 className="text-[28px] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                {track.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-[color:var(--muted)]">
                {track.shortDescription}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1 rounded-full border border-[color:var(--line)] px-3 py-1 text-xs font-medium text-[color:var(--muted)]">
            <Clock3 className="h-3.5 w-3.5" />
            {track.estimatedHours}
          </div>
        </div>

        <div className="grid gap-3 rounded-3xl bg-[color:var(--surface-subtle)] p-4 text-sm">
          <div className="flex items-center justify-between text-[color:var(--muted)]">
            <span>{completedLessons} lessons complete</span>
            <span>{completionPercent}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-[color:var(--foreground)] transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-[color:var(--line)] pt-5">
        <div className="inline-flex items-center gap-2 text-sm text-[color:var(--muted)]">
          <CheckCircle2 className="h-4 w-4 text-[color:var(--accent)]" />
          {started ? "Pick up where you left off" : "Start learning from lesson one"}
        </div>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--foreground)]">
          {started ? "Continue" : "Start learning"}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
