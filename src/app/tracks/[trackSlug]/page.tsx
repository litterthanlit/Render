import { notFound } from "next/navigation";

import { TrackDetailClient } from "@/components/TrackDetailClient";
import { getTrackBySlug } from "@/content";

export default async function TrackPage({
  params
}: {
  params: Promise<{ trackSlug: string }>;
}) {
  const { trackSlug } = await params;
  const track = getTrackBySlug(trackSlug);

  if (!track) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-8 md:py-16">
      <TrackDetailClient track={track} />
    </div>
  );
}
