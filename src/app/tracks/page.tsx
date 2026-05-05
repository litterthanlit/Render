import { CurriculumOverviewClient } from "@/components/CurriculumOverviewClient";
import { curriculumPhases } from "@/content";

export default function TracksPage() {
  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 md:px-6 md:py-10">
      <CurriculumOverviewClient phases={curriculumPhases} />
    </div>
  );
}
