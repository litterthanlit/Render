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

export function isPhaseComplete(phase: CurriculumPhase, progress: UserProgress) {
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

  if (phase.order === 8) {
    const phaseSeven = allPhases.find((item) => item.order === 7);
    return phaseSeven ? isPhaseComplete(phaseSeven, progress) : false;
  }

  if (phase.order === 9) {
    const phaseEight = allPhases.find((item) => item.order === 8);
    return phaseEight ? isPhaseComplete(phaseEight, progress) : false;
  }

  if (phase.order === 10) {
    const phaseNine = allPhases.find((item) => item.order === 9);
    return phaseNine ? isPhaseComplete(phaseNine, progress) : false;
  }

  if (phase.order === 11) {
    const phaseTen = allPhases.find((item) => item.order === 10);
    return phaseTen ? isPhaseComplete(phaseTen, progress) : false;
  }

  if (phase.order === 12) {
    const phaseEleven = allPhases.find((item) => item.order === 11);
    return phaseEleven ? isPhaseComplete(phaseEleven, progress) : false;
  }

  if (phase.order === 13) {
    const phaseTwelve = allPhases.find((item) => item.order === 12);
    return phaseTwelve ? isPhaseComplete(phaseTwelve, progress) : false;
  }

  if (phase.order === 14) {
    const phaseThirteen = allPhases.find((item) => item.order === 13);
    return phaseThirteen ? isPhaseComplete(phaseThirteen, progress) : false;
  }

  return false;
}

export function getPhaseAccessState(
  phase: CurriculumPhase,
  allPhases: CurriculumPhase[],
  progress: UserProgress
): PhaseAccessState {
  if (phase.order > 14) {
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
