import { CurriculumOverviewClient } from "@/components/CurriculumOverviewClient";
import { curriculumPhases } from "@/content";

export default function TracksPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-8 md:py-16">
      <CurriculumOverviewClient phases={curriculumPhases} />
    </div>
  );
}
