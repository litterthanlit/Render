import Link from "next/link";
import { notFound } from "next/navigation";

import { LearningActivityLab } from "@/components/LearningActivityLab";
import { LessonAccessGate } from "@/components/LessonAccessGate";
import { LessonLab } from "@/components/LessonLab";
import { Breadcrumb } from "@/components/render-ui";
import { getLessonBySlug, getNextLessonInTrack, getPhaseBySlug } from "@/content";

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
  const phase = getPhaseBySlug(trackSlug);

  return (
    <LessonAccessGate phase={phase ?? {
      id: track.id,
      order: 1,
      slug: track.slug,
      title: track.title,
      shortDescription: track.shortDescription,
      goal: track.shortDescription,
      estimatedTime: track.estimatedHours,
      difficulty: track.level,
      type: "fundamentals",
      status: "Available",
      topics: [],
      lessons: [],
      labs: [],
      projects: [],
      deliverables: [],
      evaluationCriteria: [],
      unlockRequirements: [],
      requiredTools: [],
      mentorCheckpoints: []
    }}>
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 md:px-6 md:py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Curriculum", href: "/tracks" },
          { label: track.title, href: `/tracks/${track.slug}` },
          { label: lesson.title }
        ]}
      />

      <header className="mt-8 grid gap-6 border-b border-[color:var(--line)] pb-8 xl:grid-cols-[minmax(0,0.85fr)_minmax(320px,0.36fr)]">
        <div>
          <Link
            className="text-sm font-medium text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]"
            href={`/tracks/${track.slug}`}
          >
            Back to {track.title}
          </Link>
          <h1 className="mt-4 max-w-4xl text-balance text-3xl font-semibold text-[color:var(--foreground)] md:text-4xl">
            {lesson.title}
          </h1>
          <p className="mt-4 max-w-3xl text-pretty text-base leading-7 text-[color:var(--muted)]">
            {lesson.objectives[0]}
          </p>
        </div>
        <div className="rounded-lg border border-[color:var(--line)] bg-white p-5 shadow-[0_8px_24px_rgba(17,17,17,0.04)]">
          <p className="text-sm font-semibold text-[color:var(--muted-strong)]">
            Lesson focus
          </p>
          <div className="mt-4 grid gap-3 text-sm text-[color:var(--foreground)]">
            <div className="flex items-center justify-between gap-4 rounded-lg bg-[color:var(--surface-subtle)] px-4 py-3">
              <span className="text-[color:var(--muted)]">Duration</span>
              <span>{lesson.duration}</span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-lg bg-[color:var(--surface-subtle)] px-4 py-3">
              <span className="text-[color:var(--muted)]">Format</span>
              <span>{lesson.exercise ? "Interactive lab" : "Guided activity"}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(300px,380px)_minmax(0,1fr)]">
        <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
        <div className="rounded-lg border border-[color:var(--line)] bg-[color:var(--surface-subtle)]/70 p-5">
          <p className="text-sm font-semibold text-[color:var(--muted-strong)]">
            Objectives
          </p>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-[color:var(--foreground)]">
            {lesson.objectives.map((objective) => (
              <li key={objective} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--foreground)]" />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          {lesson.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-lg border border-[color:var(--line)] bg-white p-5 shadow-[0_8px_24px_rgba(17,17,17,0.035)]"
            >
              <h2 className="text-lg font-semibold text-[color:var(--foreground)]">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-[color:var(--muted)]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bulletPoints ? (
                  <ul className="space-y-2 pt-1 text-[color:var(--foreground)]">
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
    </div>
    </LessonAccessGate>
  );
}
