"use client";

import { UserProgress } from "@/lib/types";

const STORAGE_KEY = "render-progress";
const PROGRESS_VERSION = 1;

const defaultProgress: UserProgress = {
  version: PROGRESS_VERSION,
  completedLessonIds: [],
  completedExerciseIds: [],
  completedActivityIds: [],
  submittedProjectIds: [],
  completedPhaseIds: [],
  projectSubmissions: [],
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
    completedActivityIds: progress.completedActivityIds,
    submittedProjectIds: progress.submittedProjectIds,
    completedPhaseIds: progress.completedPhaseIds,
    projectSubmissions: progress.projectSubmissions,
    xp: progress.xp + (newExercise ? xpEarned : 0),
    streakCount,
    lastActiveDate: now.toISOString()
  };

  writeProgress(updated);
  return updated;
}

export function completeActivity(lessonId: string, activityId: string, xpEarned: number) {
  const progress = readProgress();
  const now = new Date();
  const lastActive = progress.lastActiveDate ? new Date(progress.lastActiveDate) : null;

  const completedLessonIds = progress.completedLessonIds.includes(lessonId)
    ? progress.completedLessonIds
    : [...progress.completedLessonIds, lessonId];

  const newActivity = !progress.completedActivityIds.includes(activityId);
  const completedActivityIds = newActivity
    ? [...progress.completedActivityIds, activityId]
    : progress.completedActivityIds;

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
    ...progress,
    completedLessonIds,
    completedActivityIds,
    xp: progress.xp + (newActivity ? xpEarned : 0),
    streakCount,
    lastActiveDate: now.toISOString()
  };

  writeProgress(updated);
  return updated;
}

export function saveProjectSubmission(submission: UserProgress["projectSubmissions"][number]) {
  const progress = readProgress();
  const existing = progress.projectSubmissions.filter(
    (item) => item.projectId !== submission.projectId
  );
  const submittedProjectIds = progress.submittedProjectIds.includes(submission.projectId)
    ? progress.submittedProjectIds
    : [...progress.submittedProjectIds, submission.projectId];

  const updated: UserProgress = {
    ...progress,
    submittedProjectIds,
    projectSubmissions: [...existing, submission],
    lastActiveDate: new Date().toISOString()
  };

  writeProgress(updated);
  return updated;
}

export function completePhase(phaseId: string) {
  const progress = readProgress();

  if (progress.completedPhaseIds.includes(phaseId)) {
    return progress;
  }

  const updated: UserProgress = {
    ...progress,
    completedPhaseIds: [...progress.completedPhaseIds, phaseId],
    lastActiveDate: new Date().toISOString()
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

export function progressForPhase(
  progress: UserProgress,
  lessonIds: string[],
  exerciseIds: string[],
  activityIds: string[],
  projectIds: string[]
) {
  const lessonSnapshot = progressForTrack(progress, lessonIds, exerciseIds);
  const completedActivities = activityIds.filter((activityId) =>
    progress.completedActivityIds.includes(activityId)
  ).length;
  const completedProjects = projectIds.filter((projectId) =>
    progress.submittedProjectIds.includes(projectId)
  ).length;
  const totalItems = lessonIds.length + projectIds.length;
  const completedItems = lessonSnapshot.completedLessons + completedProjects;

  return {
    ...lessonSnapshot,
    completedActivities,
    totalActivities: activityIds.length,
    completedProjects,
    totalProjects: projectIds.length,
    completionPercent:
      totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100)
  };
}
