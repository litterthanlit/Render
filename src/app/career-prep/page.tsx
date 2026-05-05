import { PhaseDetailClient } from "@/components/PhaseDetailClient";
import { getPhaseBySlug } from "@/content";

export default function CareerPrepPage() {
  const phase = getPhaseBySlug("portfolio-and-career-preparation");

  if (!phase) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 md:px-6 md:py-10">
      <PhaseDetailClient phase={phase} />
    </div>
  );
}
