"use client";

import { Lock } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

import { Button, Card } from "@/components/render-ui";
import { curriculumPhases } from "@/content";
import { getPhaseAccessState } from "@/lib/curriculum-progress";
import { readProgress } from "@/lib/progress";
import { isCurriculumReviewMode } from "@/lib/review-mode";
import { CurriculumPhase } from "@/lib/types";

type LessonAccessGateProps = {
  phase: CurriculumPhase;
  children: ReactNode;
};

function GatePanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 md:px-6 md:py-10">
      <Card className="mx-auto max-w-lg rounded-lg p-8 text-center">{children}</Card>
    </div>
  );
}

export function LessonAccessGate({ phase, children }: LessonAccessGateProps) {
  const [locked, setLocked] = useState<boolean | null>(null);

  useEffect(() => {
    if (isCurriculumReviewMode()) {
      setLocked(false);
      return;
    }

    const state = getPhaseAccessState(phase, curriculumPhases, readProgress());
    setLocked(state === "locked" || state === "coming-soon");
  }, [phase]);

  if (locked === null) {
    return (
      <GatePanel>
        <p className="text-sm leading-6 text-[color:var(--muted)]">Checking your local progress…</p>
      </GatePanel>
    );
  }

  if (!locked) {
    return <>{children}</>;
  }

  return (
    <GatePanel>
      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[color:var(--surface-subtle)]">
        <Lock className="size-6 text-[color:var(--muted)]" />
      </div>
      <p className="mt-6 text-sm font-medium text-[color:var(--muted)]">Locked lesson</p>
      <h1 className="mt-2 text-balance text-2xl font-semibold">Complete the previous phase first</h1>
      <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-6 text-[color:var(--muted)]">
        {phase.title} is visible as a preview, but its lessons unlock only after the required prior
        work is complete.
      </p>
      <Button className="mt-6" href={`/tracks/${phase.slug}`}>
        Back to phase overview
      </Button>
    </GatePanel>
  );
}
