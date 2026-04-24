import {
  CurriculumPhase,
  ProjectSubmission,
  UserProgress
} from "@/lib/types";

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
  return Boolean(submission?.githubUrl.trim() && submission?.reflection.trim());
}

export function isPhaseComplete(phase: CurriculumPhase, progress: UserProgress) {
  const { lessonIds, exerciseIds, activityIds, projectIds } = getPhaseIds(phase);
  const lessonsComplete = lessonIds.every((lessonId) =>
    progress.completedLessonIds.includes(lessonId)
  );
  const exercisesComplete = exerciseIds.every((exerciseId) =>
    progress.completedExerciseIds.includes(exerciseId)
  );
  const activitiesComplete = activityIds.every((activityId) =>
    progress.completedActivityIds.includes(activityId)
  );
  const projectsComplete = projectIds.every((projectId) =>
    isProjectSubmissionComplete(
      progress.projectSubmissions.find((submission) => submission.projectId === projectId)
    )
  );

  return lessonsComplete && exercisesComplete && activitiesComplete && projectsComplete;
}

export function getPhaseCompletionPercent(phase: CurriculumPhase, progress: UserProgress) {
  const { lessonIds, projectIds } = getPhaseIds(phase);
  const completedLessons = lessonIds.filter((lessonId) =>
    progress.completedLessonIds.includes(lessonId)
  ).length;
  const completedProjects = projectIds.filter((projectId) =>
    isProjectSubmissionComplete(
      progress.projectSubmissions.find((submission) => submission.projectId === projectId)
    )
  ).length;
  const totalItems = lessonIds.length + projectIds.length;

  if (totalItems === 0) {
    return 0;
  }

  return Math.round(((completedLessons + completedProjects) / totalItems) * 100);
}

export function isPhaseUnlocked(
  phase: CurriculumPhase,
  allPhases: CurriculumPhase[],
  progress: UserProgress
) {
  if (phase.order <= 5) {
    return true;
  }

  if (phase.order === 6) {
    const phaseFive = allPhases.find((item) => item.order === 5);
    return phaseFive ? isPhaseComplete(phaseFive, progress) : false;
  }

  if (phase.order === 7) {
    const phaseSix = allPhases.find((item) => item.order === 6);
    return phaseSix ? isPhaseComplete(phaseSix, progress) : false;
  }

  return false;
}

export function getPhaseAccessState(
  phase: CurriculumPhase,
  allPhases: CurriculumPhase[],
  progress: UserProgress
): PhaseAccessState {
  if (phase.order >= 8) {
    return "coming-soon";
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
