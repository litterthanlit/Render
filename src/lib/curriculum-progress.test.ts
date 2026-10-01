import { describe, expect, it } from "vitest";

import { curriculumPhases } from "@/content/curriculum";
import {
  STARTER_PHASE_COUNT,
  getPhaseAccessState,
  getPhaseIds,
  hasRequiredWork,
  isPhaseComplete
} from "@/lib/curriculum-progress";
import { getDefaultProgress } from "@/lib/progress";
import { CurriculumPhase, UserProgress } from "@/lib/types";

function completePhases(phases: CurriculumPhase[], base = getDefaultProgress()): UserProgress {
  const progress = structuredClone(base);
  for (const phase of phases) {
    const { lessonIds, exerciseIds, activityIds } = getPhaseIds(phase);
    progress.completedLessonIds.push(...lessonIds);
    progress.completedExerciseIds.push(...exerciseIds);
    progress.completedActivityIds.push(...activityIds);
    for (const project of phase.projects) {
      progress.projectSubmissions.push({
        projectId: project.id,
        githubUrl: "https://github.com/learner/project",
        deploymentUrl: "https://project.example.com",
        reflection: "Reflection",
        screenshotNote: "",
        status: "submitted"
      });
    }
  }
  return progress;
}

const sortedPhases = [...curriculumPhases].sort((a, b) => a.order - b.order);
const state = (phase: CurriculumPhase, progress: UserProgress) =>
  getPhaseAccessState(phase, curriculumPhases, progress);

describe("curriculum data", () => {
  it("numbers phases 1..n with no gaps or duplicates", () => {
    expect(sortedPhases.map((phase) => phase.order)).toEqual(
      sortedPhases.map((_, index) => index + 1)
    );
  });
});

describe("phase access", () => {
  it("opens starter phases and locks the rest for a new learner", () => {
    const progress = getDefaultProgress();
    for (const phase of sortedPhases) {
      const expected = phase.order <= STARTER_PHASE_COUNT ? "available" : "locked";
      expect(state(phase, progress), phase.title).toBe(expected);
    }
  });

  it("never marks a phase with no required work as completed", () => {
    const progress = completePhases(sortedPhases);
    for (const phase of sortedPhases.filter((item) => !hasRequiredWork(item))) {
      expect(isPhaseComplete(phase, progress), phase.title).toBe(false);
    }
  });

  it("marks every phase with required work completed at full progress", () => {
    const progress = completePhases(sortedPhases);
    for (const phase of sortedPhases.filter(hasRequiredWork)) {
      expect(state(phase, progress), phase.title).toBe("completed");
    }
  });

  it("unlocks each phase after the starter range only when the previous phase is complete", () => {
    for (const phase of sortedPhases.filter((item) => item.order > STARTER_PHASE_COUNT)) {
      const earlier = sortedPhases.filter((item) => item.order < phase.order);
      const withoutPrevious = completePhases(earlier.slice(0, -1));
      const withPrevious = completePhases(earlier);

      expect(state(phase, withoutPrevious), `${phase.title} before previous phase`).toBe("locked");
      expect(state(phase, withPrevious), `${phase.title} after previous phase`).not.toBe("locked");
    }
  });

  it("reaches the final phase", () => {
    const last = sortedPhases[sortedPhases.length - 1];
    const progress = completePhases(sortedPhases.slice(0, -1));
    expect(state(last, progress)).toBe("available");
  });
});
