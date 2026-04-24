import { javascriptForDesigners } from "@/content/tracks/javascript-for-designers";
import { accessibilityDesignSystems } from "@/content/tracks/accessibility-design-systems";
import { animationInteraction } from "@/content/tracks/animation-interaction";
import { htmlCssFoundations } from "@/content/tracks/html-css-foundations";
import {
  curriculumPhases,
  getLessonByPhaseSlug,
  getNextLessonInPhase,
  getPhaseBySlug
} from "@/content/curriculum";
import { Lesson, Track, TrackSummary } from "@/lib/types";

export {
  curriculumPhases,
  getPhaseBySlug,
  getPhaseActivityIds,
  getPhaseExerciseIds,
  getPhaseLessonIds,
  getPhaseProjectIds
} from "@/content/curriculum";

export const tracks: Track[] = [
  htmlCssFoundations,
  javascriptForDesigners,
  animationInteraction,
  accessibilityDesignSystems
];

export const comingSoonTracks: TrackSummary[] = [
  {
    id: "track-react-systems",
    slug: "react-systems",
    title: "React Systems & State",
    level: "Intermediate",
    shortDescription:
      "Move from browser exercises into reusable React components, state transitions, and production patterns.",
    estimatedHours: "6 hours",
    status: "Coming next"
  },
  {
    id: "track-fullstack",
    slug: "product-apis",
    title: "Product APIs & Full-Stack Flows",
    level: "Intermediate",
    shortDescription:
      "Connect interface intent to data, APIs, and the product decisions that make design engineering full-stack.",
    estimatedHours: "6 hours",
    status: "Coming next"
  }
];

export function getTrackSummaries() {
  return tracks.map(({ modules, ...summary }) => summary);
}

export function getTrackBySlug(trackSlug: string) {
  return tracks.find((track) => track.slug === trackSlug);
}

export function getLessonBySlug(trackSlug: string, lessonSlug: string): {
  track: Track;
  lesson: Lesson;
} | null {
  const phasePayload = getLessonByPhaseSlug(trackSlug, lessonSlug);
  if (phasePayload) {
    return {
      track: {
        id: phasePayload.phase.id,
        slug: phasePayload.phase.slug,
        title: phasePayload.phase.title,
        level: phasePayload.phase.difficulty,
        shortDescription: phasePayload.phase.shortDescription,
        estimatedHours: phasePayload.phase.estimatedTime,
        status: phasePayload.phase.status === "Available" ? "Available" : "Coming next",
        modules: [
          {
            id: `${phasePayload.phase.id}-lessons`,
            title: phasePayload.phase.title,
            summary: phasePayload.phase.goal,
            lessons: phasePayload.phase.lessons
          }
        ]
      },
      lesson: phasePayload.lesson
    };
  }

  const track = getTrackBySlug(trackSlug);
  if (!track) {
    return null;
  }

  for (const module of track.modules) {
    const lesson = module.lessons.find((item) => item.slug === lessonSlug);
    if (lesson) {
      return { track, lesson };
    }
  }

  return null;
}

export function getNextLessonInTrack(trackSlug: string, lessonSlug: string) {
  const phaseLesson = getNextLessonInPhase(trackSlug, lessonSlug);
  if (phaseLesson) {
    return phaseLesson;
  }

  const track = getTrackBySlug(trackSlug);
  if (!track) {
    return null;
  }

  const lessons = track.modules.flatMap((module) => module.lessons);
  const currentIndex = lessons.findIndex((lesson) => lesson.slug === lessonSlug);

  if (currentIndex === -1 || currentIndex === lessons.length - 1) {
    return null;
  }

  return lessons[currentIndex + 1];
}

export function getTrackLessonIds(track: Track) {
  return track.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id));
}

export function getTrackExerciseIds(track: Track) {
  return track.modules.flatMap((module) =>
    module.lessons.flatMap((lesson) => (lesson.exercise ? [lesson.exercise.id] : []))
  );
}
