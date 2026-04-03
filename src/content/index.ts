import { javascriptForDesigners } from "@/content/tracks/javascript-for-designers";
import { htmlCssFoundations } from "@/content/tracks/html-css-foundations";
import { Lesson, Track, TrackSummary } from "@/lib/types";

export const tracks: Track[] = [htmlCssFoundations, javascriptForDesigners];

export const comingSoonTracks: TrackSummary[] = [
  {
    id: "track-react",
    slug: "react-component-thinking",
    title: "React & Component Thinking",
    level: "Intermediate",
    shortDescription:
      "Move from one-off screens into reusable component systems and stateful interfaces.",
    estimatedHours: "6 hours",
    status: "Coming next"
  },
  {
    id: "track-systems",
    slug: "accessibility-and-systems",
    title: "Accessibility & Design Systems",
    level: "Intermediate",
    shortDescription:
      "Learn how product quality, semantics, and reuse patterns shape durable interface systems.",
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

export function getTrackLessonIds(track: Track) {
  return track.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id));
}

export function getTrackExerciseIds(track: Track) {
  return track.modules.flatMap((module) =>
    module.lessons.map((lesson) => lesson.exercise.id)
  );
}
