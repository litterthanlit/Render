"use client";

import { UserProgress } from "@/lib/types";

const STORAGE_KEY = "render-progress";
const PROGRESS_VERSION = 1;

const defaultProgress: UserProgress = {
  version: PROGRESS_VERSION,
  completedLessonIds: [],
  completedExerciseIds: [],
  xp: 0,
  streakCount: 0,
  lastActiveDate: null
};

function sameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

function yesterday(date: Date) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() - 1);
  return copy;
}

export function readProgress(): UserProgress {
  if (typeof window === "undefined") {
    return defaultProgress;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultProgress;
    }

    const parsed = JSON.parse(raw) as Partial<UserProgress>;
    if (parsed.version !== PROGRESS_VERSION) {
      return defaultProgress;
    }

    return {
      ...defaultProgress,
      ...parsed
    };
  } catch {
    return defaultProgress;
  }
}

export function writeProgress(progress: UserProgress) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function completeExercise(
  lessonId: string,
  exerciseId: string,
  xpEarned: number
) {
  const progress = readProgress();
  const now = new Date();
  const lastActive = progress.lastActiveDate ? new Date(progress.lastActiveDate) : null;

  const completedLessonIds = progress.completedLessonIds.includes(lessonId)
    ? progress.completedLessonIds
    : [...progress.completedLessonIds, lessonId];

  const newExercise = !progress.completedExerciseIds.includes(exerciseId);
  const completedExerciseIds = newExercise
    ? [...progress.completedExerciseIds, exerciseId]
    : progress.completedExerciseIds;

  let streakCount = progress.streakCount || 1;

  if (!lastActive) {
    streakCount = 1;
  } else if (sameDay(lastActive, now)) {
    streakCount = progress.streakCount;
  } else if (sameDay(yesterday(now), lastActive)) {
    streakCount = progress.streakCount + 1;
  } else {
    streakCount = 1;
  }

  const updated: UserProgress = {
    version: PROGRESS_VERSION,
    completedLessonIds,
    completedExerciseIds,
    xp: progress.xp + (newExercise ? xpEarned : 0),
    streakCount,
    lastActiveDate: now.toISOString()
  };

  writeProgress(updated);
  return updated;
}

export function progressForTrack(
  progress: UserProgress,
  lessonIds: string[],
  exerciseIds: string[]
) {
  const completedLessons = lessonIds.filter((lessonId) =>
    progress.completedLessonIds.includes(lessonId)
  ).length;
  const completedExercises = exerciseIds.filter((exerciseId) =>
    progress.completedExerciseIds.includes(exerciseId)
  ).length;

  return {
    completedLessons,
    totalLessons: lessonIds.length,
    completedExercises,
    totalExercises: exerciseIds.length,
    completionPercent:
      lessonIds.length === 0 ? 0 : Math.round((completedLessons / lessonIds.length) * 100)
  };
}
