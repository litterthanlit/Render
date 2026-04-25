"use client";

import { Flame, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

import { readProgress } from "@/lib/progress";
import { UserProgress } from "@/lib/types";

const emptyState: UserProgress = {
  version: 1,
  completedLessonIds: [],
  completedExerciseIds: [],
  completedActivityIds: [],
  submittedProjectIds: [],
  completedPhaseIds: [],
  projectSubmissions: [],
  componentDocsEntries: [],
  xp: 0,
  streakCount: 0,
  lastActiveDate: null
};

export function ProgressDock() {
  const [progress, setProgress] = useState<UserProgress>(emptyState);

  useEffect(() => {
    const sync = () => setProgress(readProgress());

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("render-progress-changed", sync as EventListener);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("render-progress-changed", sync as EventListener);
    };
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white px-2 py-1 shadow-[0_1px_0_rgba(16,24,40,0.04)]">
      <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--surface-subtle)] px-2.5 py-1 text-[11px] font-medium text-[color:var(--foreground)]">
        <Flame className="h-3.5 w-3.5 text-[color:var(--accent)]" />
        {progress.streakCount} day streak
      </span>
      <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--surface-subtle)] px-2.5 py-1 text-[11px] font-medium text-[color:var(--foreground)]">
        <Trophy className="h-3.5 w-3.5 text-[color:var(--accent-strong)]" />
        {progress.xp} XP
      </span>
    </div>
  );
}
