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
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 md:px-6 md:py-10">
      <PhaseDetailClient phase={phase} nextPhaseSlug={nextPhase?.slug} />
    </div>
  );
}
