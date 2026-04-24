"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

import { curriculumPhases } from "@/content";
import { getPhaseAccessState } from "@/lib/curriculum-progress";
import { readProgress } from "@/lib/progress";
import { CurriculumPhase } from "@/lib/types";

type LessonAccessGateProps = {
  phase: CurriculumPhase;
  children: ReactNode;
};

export function LessonAccessGate({ phase, children }: LessonAccessGateProps) {
  const [locked, setLocked] = useState<boolean | null>(null);

  useEffect(() => {
    const state = getPhaseAccessState(phase, curriculumPhases, readProgress());
    setLocked(state === "locked" || state === "coming-soon");
  }, [phase]);

  if (locked === null) {
    return (
      <div className="mx-auto w-full max-w-4xl px-5 py-10 md:px-8 md:py-16">
        <section className="rounded-[32px] border border-[color:var(--line)] bg-white p-8 text-center shadow-[0_1px_0_rgba(16,24,40,0.04)]">
          <p className="text-sm leading-6 text-[color:var(--muted)]">
            Checking your local progress...
          </p>
        </section>
      </div>
    );
  }

  if (!locked) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10 md:px-8 md:py-16">
      <section className="rounded-[32px] border border-[color:var(--line)] bg-white p-8 text-center shadow-[0_1px_0_rgba(16,24,40,0.04)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--surface-subtle)]">
          <Lock className="h-6 w-6 text-[color:var(--muted)]" />
        </div>
        <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
          Locked lesson
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-[color:var(--foreground)]">
          Complete the previous phase first.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
          {phase.title} is visible as a preview, but its lessons unlock only after the
          required prior work is complete.
        </p>
        <Link className="button-primary mt-6 inline-flex" href={`/tracks/${phase.slug}`}>
          Back to phase overview
        </Link>
      </section>
    </div>
  );
}
