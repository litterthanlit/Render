"use client";

import { useEffect, useState } from "react";

import { readProgress } from "@/lib/progress";
import { UserProgress } from "@/lib/types";

const emptyState: UserProgress = {
  version: 1,
  completedLessonIds: [],
  completedExerciseIds: [],
  xp: 0,
  streakCount: 0,
  lastActiveDate: null
};

export function ProgressDock() {
  const [progress, setProgress] = useState<UserProgress>(emptyState);

  useEffect(() => {
    setProgress(readProgress());

    const handler = () => setProgress(readProgress());
    window.addEventListener("storage", handler);
    window.addEventListener("render-progress-changed", handler as EventListener);

    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("render-progress-changed", handler as EventListener);
    };
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-2 text-xs text-[color:var(--paper)]">
      <span className="rounded-full bg-[color:var(--warm)]/14 px-2 py-1 uppercase tracking-[0.24em] text-[10px] text-[color:var(--warm)]">
        {progress.streakCount} day streak
      </span>
      <span className="rounded-full bg-[color:var(--accent)]/14 px-2 py-1 uppercase tracking-[0.24em] text-[10px] text-[color:var(--accent)]">
        {progress.xp} XP
      </span>
    </div>
  );
}
