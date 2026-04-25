import { notFound } from "next/navigation";

import { PhaseDetailClient } from "@/components/PhaseDetailClient";
import { curriculumPhases, getPhaseBySlug } from "@/content";

export default async function TrackPage({
  params
}: {
  params: Promise<{ trackSlug: string }>;
}) {
  const { trackSlug } = await params;
  const phase = getPhaseBySlug(trackSlug);

  if (!phase) {
    notFound();
  }

  const nextPhase = curriculumPhases.find((item) => item.order === phase.order + 1);

  return (
    <div className="mx-auto w-full max-w-[1480px] px-5 py-10 md:px-8 md:py-16">
      <PhaseDetailClient phase={phase} nextPhaseSlug={nextPhase?.slug} />
    </div>
  );
}
