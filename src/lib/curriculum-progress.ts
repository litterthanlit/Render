import {
  CurriculumPhase,
  ProjectSubmission,
  UserProgress
} from "@/lib/types";
import { isCurriculumReviewMode } from "@/lib/review-mode";

export type PhaseAccessState = "available" | "in-progress" | "completed" | "locked" | "coming-soon";

export function getPhaseIds(phase: CurriculumPhase) {
  return {
    lessonIds: phase.lessons.map((lesson) => lesson.id),
    exerciseIds: phase.lessons.flatMap((lesson) => (lesson.exercise ? [lesson.exercise.id] : [])),
    activityIds: phase.lessons.flatMap((lesson) => (lesson.activity ? [lesson.activity.id] : [])),
    projectIds: phase.projects.map((project) => project.id)
  };
}

export function isProjectSubmissionComplete(submission?: ProjectSubmission) {
  return Boolean(
    submission &&
      /^https?:\/\/\S+\.\S+/.test(submission.githubUrl.trim()) &&
      submission.reflection.trim()
  );
}

function isProjectComplete(project: CurriculumPhase["projects"][number], progress: UserProgress) {
  const submission = progress.projectSubmissions.find((item) => item.projectId === project.id);
  const githubValid = Boolean(submission && /^https?:\/\/\S+\.\S+/.test(submission.githubUrl.trim()));
  const deploymentValid = Boolean(
    submission && /^https?:\/\/\S+\.\S+/.test(submission.deploymentUrl.trim())
  );
  return Boolean(
    githubValid &&
      submission?.reflection.trim() &&
      (!project.requiresDeploymentUrl || deploymentValid)
  );
}

// Phases at or below this order are open from the start; later phases unlock in sequence.
export const STARTER_PHASE_COUNT = 5;

// A phase with no lessons or projects has nothing to complete, so it never counts as done.
export function hasRequiredWork(phase: CurriculumPhase) {
  return phase.lessons.length + phase.projects.length > 0;
}

export function isPhaseComplete(phase: CurriculumPhase, progress: UserProgress) {
  if (!hasRequiredWork(phase)) {
    return false;
  }

  const { lessonIds, exerciseIds, activityIds } = getPhaseIds(phase);
  const lessonsComplete = lessonIds.every((lessonId) =>
    progress.completedLessonIds.includes(lessonId)
  );
  const exercisesComplete = exerciseIds.every((exerciseId) =>
    progress.completedExerciseIds.includes(exerciseId)
  );
  const activitiesComplete = activityIds.every((activityId) =>
    progress.completedActivityIds.includes(activityId)
  );
  const projectsComplete = phase.projects.every((project) => isProjectComplete(project, progress));

  return lessonsComplete && exercisesComplete && activitiesComplete && projectsComplete;
}

export function getPhaseCompletionPercent(phase: CurriculumPhase, progress: UserProgress) {
  const { lessonIds } = getPhaseIds(phase);
  const completedLessons = lessonIds.filter((lessonId) =>
    progress.completedLessonIds.includes(lessonId)
  ).length;
  const completedProjects = phase.projects.filter((project) => isProjectComplete(project, progress)).length;
  const totalItems = lessonIds.length + phase.projects.length;

  if (totalItems === 0) {
    return 0;
  }

  return Math.round(((completedLessons + completedProjects) / totalItems) * 100);
}

export function isPhaseUnlocked(
  phase: CurriculumPhase,
  allPhases: CurriculumPhase[],
  progress: UserProgress
): boolean {
  if (phase.order <= STARTER_PHASE_COUNT) {
    return true;
  }

  const previous = allPhases.find((item) => item.order === phase.order - 1);
  if (!previous) {
    return false;
  }

  // An empty previous phase cannot be completed, so it passes its own unlock state through.
  return hasRequiredWork(previous)
    ? isPhaseComplete(previous, progress)
    : isPhaseUnlocked(previous, allPhases, progress);
}

export function getPhaseAccessState(
  phase: CurriculumPhase,
  allPhases: CurriculumPhase[],
  progress: UserProgress
): PhaseAccessState {
  if (phase.status === "Coming soon") {
    return "coming-soon";
  }

  if (isCurriculumReviewMode()) {
    if (isPhaseComplete(phase, progress)) {
      return "completed";
    }

    return getPhaseCompletionPercent(phase, progress) > 0 ? "in-progress" : "available";
  }

  if (!isPhaseUnlocked(phase, allPhases, progress)) {
    return "locked";
  }

  if (isPhaseComplete(phase, progress)) {
    return "completed";
  }

  return getPhaseCompletionPercent(phase, progress) > 0 ? "in-progress" : "available";
}

export function getPhaseCtaLabel(state: PhaseAccessState) {
  return {
    available: "Start",
    "in-progress": "Continue",
    completed: "Review",
    locked: "Complete previous phase",
    "coming-soon": "Preview"
  }[state];
}
