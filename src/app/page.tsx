import Link from "next/link";

import { TrackCard } from "@/components/TrackCard";
import { comingSoonTracks, tracks } from "@/content";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 py-10 md:px-8 md:py-16">
      <section className="grid gap-8 rounded-[36px] border border-white/8 bg-[linear-gradient(135deg,rgba(13,16,18,0.95),rgba(7,9,10,0.98))] p-8 shadow-[0_36px_140px_rgba(0,0,0,0.45)] md:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] md:p-12">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-[color:var(--accent)]">
            Browser-based design engineering
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-[color:var(--paper)] md:text-7xl">
            Learn design engineering by editing real code, not watching from the sidelines.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[color:var(--muted)] md:text-lg">
            Render is an interactive learning studio for designers who want to move from
            visual direction into implementation. Every lesson ends in a working interface,
            a live preview, and explicit feedback on what still needs refinement.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="button-primary" href="/tracks">
              Start the first track
            </Link>
            <Link className="button-muted" href="/playground">
              Open the playground
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[28px] border border-[color:var(--line-strong)] bg-[rgba(11,14,17,0.9)] p-5">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--warm)]">
              What makes it interactive
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[color:var(--paper)]">
              <li>Write HTML, CSS, and JavaScript inside each lesson.</li>
              <li>Run a live preview in a sandboxed lab.</li>
              <li>Check your work against authored validation rules.</li>
              <li>Keep local progress and XP as you complete exercises.</li>
            </ul>
          </div>

          <div className="rounded-[28px] border border-white/8 bg-white/4 p-5">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--muted)]">
              First milestone
            </p>
            <p className="mt-3 text-3xl font-semibold text-[color:var(--paper)]">2 tracks</p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              Start with foundations and JavaScript for designers, then expand into React,
              accessibility, systems, and full-stack workflows.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--warm)]">
              Available now
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[color:var(--paper)]">
              Learn by building from the first lesson.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[color:var(--muted)]">
            The first tracks focus on readable structure, layout systems, and JavaScript
            behaviors that make interfaces feel alive.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>

      <section className="rounded-[34px] border border-white/8 bg-white/3 p-8">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--muted)]">
          Coming next
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {comingSoonTracks.map((track) => (
            <article
              key={track.id}
              className="rounded-[24px] border border-white/8 bg-[rgba(10,13,15,0.76)] p-5"
            >
              <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--accent)]">
                {track.level}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-[color:var(--paper)]">
                {track.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                {track.shortDescription}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
