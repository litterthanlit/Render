import { describe, expect, it } from "vitest";

import { curriculumPhases } from "@/content/curriculum";

const lessons = curriculumPhases.flatMap((phase) =>
  phase.lessons.map((lesson) => ({ phase, lesson }))
);
const activities = lessons.flatMap(({ lesson }) => (lesson.activity ? [lesson.activity] : []));

describe("curriculum content", () => {
  it("uses unique phase, lesson, activity, exercise, and project ids", () => {
    const ids = curriculumPhases.flatMap((phase) => [
      phase.id,
      ...phase.projects.map((project) => project.id),
      ...phase.lessons.flatMap((lesson) => [
        lesson.id,
        ...(lesson.activity ? [lesson.activity.id] : []),
        ...(lesson.exercise ? [lesson.exercise.id] : [])
      ])
    ]);
    expect(ids.filter((id, index) => ids.indexOf(id) !== index)).toEqual([]);
  });

  it("only links to next lessons that exist", () => {
    const slugs = new Set(lessons.map(({ lesson }) => lesson.slug));
    for (const { lesson } of lessons) {
      if (lesson.nextLessonSlug) {
        expect(slugs.has(lesson.nextLessonSlug), lesson.id).toBe(true);
      }
    }
  });

  it("lists every quiz answer among its options", () => {
    for (const activity of activities) {
      if (activity.type === "concept-check") {
        for (const prompt of activity.prompts) {
          expect(prompt.options, `${activity.id}/${prompt.id}`).toContain(prompt.answer);
        }
      }
      if (activity.type === "debugging-scenarios") {
        for (const scenario of activity.scenarios) {
          const label = `${activity.id}/${scenario.id}`;
          expect(scenario.causeOptions, label).toContain(scenario.answer.cause);
          expect(scenario.stepOptions, label).toContain(scenario.answer.step);
          expect(scenario.verificationOptions, label).toContain(scenario.answer.verification);
        }
      }
    }
  });

  it("has solutions that pass their source checks and starters that do not", () => {
    for (const activity of activities) {
      if (activity.type !== "react-component" && activity.type !== "ts-react-component") {
        continue;
      }
      const passes = (code: string) =>
        activity.checks.filter((check) => new RegExp(check.pattern, "s").test(code)).length;

      expect(passes(activity.solutionCode), `${activity.id} solution`).toBe(activity.checks.length);
      expect(passes(activity.starterCode), `${activity.id} starter`).toBeLessThan(activity.checks.length);
    }
  });
});
