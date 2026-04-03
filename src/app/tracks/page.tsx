import { TrackCard } from "@/components/TrackCard";
import { tracks } from "@/content";

export default function TracksPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-10 md:px-8 md:py-16">
      <section className="max-w-3xl space-y-4">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--accent)]">
          Curriculum
        </p>
        <h1 className="text-4xl font-semibold text-[color:var(--paper)] md:text-6xl">
          Choose a track and move from visual intent into real interface behavior.
        </h1>
        <p className="text-base leading-7 text-[color:var(--muted)]">
          Every lesson pairs concise teaching with a live lab. Build up instincts in
          structure, layout, and interaction one system at a time.
        </p>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}
