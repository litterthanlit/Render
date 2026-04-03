import Link from "next/link";
import { notFound } from "next/navigation";

import { LessonLab } from "@/components/LessonLab";
import { getLessonBySlug } from "@/content";

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

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 md:px-8 md:py-16 xl:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
      <aside className="space-y-8">
        <div className="rounded-[28px] border border-white/8 bg-[rgba(10,13,15,0.94)] p-6">
          <Link
            className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)] transition hover:text-[color:var(--paper)]"
            href={`/tracks/${track.slug}`}
          >
            Back to {track.title}
          </Link>
          <p className="mt-5 text-[11px] uppercase tracking-[0.28em] text-[color:var(--warm)]">
            Lesson
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-[color:var(--paper)]">
            {lesson.title}
          </h1>
          <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
            {lesson.duration} of focused practice.
          </p>
        </div>

        <div className="rounded-[28px] border border-white/8 bg-white/3 p-6">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--accent)]">
            Objectives
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[color:var(--paper)]">
            {lesson.objectives.map((objective) => (
              <li key={objective} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          {lesson.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[28px] border border-white/8 bg-[rgba(10,13,15,0.92)] p-6"
            >
              <h2 className="text-2xl font-semibold text-[color:var(--paper)]">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-[color:var(--muted)]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bulletPoints ? (
                  <ul className="space-y-2 text-[color:var(--paper)]">
                    {section.bulletPoints.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--warm)]" />
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

      <LessonLab lessonId={lesson.id} exercise={lesson.exercise} />
    </div>
  );
}
