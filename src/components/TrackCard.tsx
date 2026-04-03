"use client";

import Link from "next/link";
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
    () => track.modules.flatMap((module) => module.lessons.map((lesson) => lesson.exercise.id)),
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

  return (
    <Link
      href={`/tracks/${track.slug}`}
      className="group flex h-full flex-col justify-between rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,20,23,0.96),rgba(8,10,12,0.98))] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.32)] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--line-strong)]"
    >
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--warm)]">
              {track.level}
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-[color:var(--paper)]">
              {track.title}
            </h3>
          </div>
          <span className="rounded-full border border-[color:var(--line-strong)] px-3 py-1 text-xs text-[color:var(--accent)]">
            {track.estimatedHours}
          </span>
        </div>
        <p className="max-w-sm text-sm leading-6 text-[color:var(--muted)]">
          {track.shortDescription}
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
          <span>{completedLessons} lessons done</span>
          <span>{completionPercent}% complete</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/6">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--warm))] transition-all duration-500"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>
    </Link>
  );
}
