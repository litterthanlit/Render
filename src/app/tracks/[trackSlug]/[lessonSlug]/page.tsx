import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

import { LearningActivityLab } from "@/components/LearningActivityLab";
import { LessonLab } from "@/components/LessonLab";
import { getLessonBySlug, getNextLessonInTrack } from "@/content";

export default async function LessonPage({
  params
}: {
  params: Promise<{ trackSlug: string; lessonSlug: string }>;
}) {
  const { trackSlug, lessonSlug } = await params;
  const payload = getLessonBySlug(trackSlug, lessonSlug);

  if (!payload) {
    notFound();
  }

  const { track, lesson } = payload;
  const nextLesson = getNextLessonInTrack(trackSlug, lessonSlug);

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 md:px-8 md:py-16 xl:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
      <aside className="space-y-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[color:var(--muted)]">
          <Link className="transition hover:text-[color:var(--foreground)]" href="/">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link className="transition hover:text-[color:var(--foreground)]" href="/tracks">
            Tracks
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            className="transition hover:text-[color:var(--foreground)]"
            href={`/tracks/${track.slug}`}
          >
            {track.title}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[color:var(--foreground)]">{lesson.title}</span>
        </nav>

        <div className="rounded-[28px] border border-[color:var(--line)] bg-white p-6 shadow-[0_1px_0_rgba(16,24,40,0.04)]">
          <Link
            className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]"
            href={`/tracks/${track.slug}`}
          >
            Back to {track.title}
          </Link>
          <p className="mt-5 text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
            Lesson
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-[color:var(--foreground)]">
            {lesson.title}
          </h1>
          <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
            {lesson.duration} of focused practice.
          </p>
        </div>

        <div className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] p-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
            Objectives
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[color:var(--foreground)]">
            {lesson.objectives.map((objective) => (
              <li key={objective} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--foreground)]" />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          {lesson.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[28px] border border-[color:var(--line)] bg-white p-6 shadow-[0_1px_0_rgba(16,24,40,0.04)]"
            >
              <h2 className="text-2xl font-semibold text-[color:var(--foreground)]">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-[color:var(--muted)]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bulletPoints ? (
                  <ul className="space-y-2 text-[color:var(--foreground)]">
                    {section.bulletPoints.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--foreground)]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </aside>

      {lesson.exercise ? (
        <LessonLab
          lessonId={lesson.id}
          exercise={lesson.exercise}
          nextLessonSlug={nextLesson?.slug}
          nextLessonTitle={nextLesson?.title}
          trackSlug={track.slug}
        />
      ) : null}
      {lesson.activity ? (
        <LearningActivityLab
          lessonId={lesson.id}
          activity={lesson.activity}
          nextLessonSlug={nextLesson?.slug}
          nextLessonTitle={nextLesson?.title}
          trackSlug={track.slug}
        />
      ) : null}
    </div>
  );
}
