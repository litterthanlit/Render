import { PhaseDetailClient } from "@/components/PhaseDetailClient";
import { getPhaseBySlug } from "@/content";

export default function CapstonePage() {
  const phase = getPhaseBySlug("capstone-project");

  if (!phase) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 md:px-6 md:py-10">
      <PhaseDetailClient phase={phase} nextPhaseSlug="portfolio-and-career-preparation" />
    </div>
  );
}
