import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Code2, Sparkles, Target } from "lucide-react";

import { TrackCard } from "@/components/TrackCard";
import { comingSoonTracks, tracks } from "@/content";

const featuredTracks = tracks.slice(0, 2);

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 py-10 md:px-8 md:py-16">
      <section className="grid gap-6 rounded-[36px] border border-[color:var(--line)] bg-white p-8 shadow-[0_1px_0_rgba(16,24,40,0.04)] md:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] md:p-12">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-[color:var(--surface-subtle)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-[color:var(--muted)]">
            <Sparkles className="h-3.5 w-3.5" />
            Intent-based design engineering
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-[color:var(--foreground)] md:text-7xl">
            Build the bridge from interface taste to production-ready code.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            Render teaches designers how to think in structure, state, systems, and
            interaction by letting them edit real code directly inside each lesson.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="button-primary inline-flex items-center gap-2" href="/tracks">
              Start learning
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link className="button-muted inline-flex items-center gap-2" href="/playground">
              Open playground
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] p-5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
              Why it converts
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[color:var(--foreground)]">
              <li className="flex gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 text-[color:var(--accent)]" />
                <span>Every lesson includes a live preview and a concrete “Check” moment.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 text-[color:var(--accent)]" />
                <span>Progress persists locally so learners can return without friction.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 text-[color:var(--accent)]" />
                <span>The path starts simple and expands toward systems and full-stack work.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-[28px] border border-[color:var(--line)] bg-white p-5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
              First release
            </p>
            <p className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
              4 tracks
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              Foundations, JavaScript, animation, and accessibility. Enough range to feel
              like a real system, not a toy tutorial.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            icon: BookOpen,
            title: "Structured lessons",
            copy: "Short teaching sections, purposeful starter code, and clear objectives."
          },
          {
            icon: Code2,
            title: "Real code in-browser",
            copy: "Edit HTML, CSS, and JavaScript directly inside the platform with instant preview."
          },
          {
            icon: Target,
            title: "Check against intent",
            copy: "Validation rules inspect the DOM and behavior so feedback stays specific."
          }
        ].map(({ icon: Icon, title, copy }) => (
          <article
            key={title}
            className="rounded-[28px] border border-[color:var(--line)] bg-white p-6 shadow-[0_1px_0_rgba(16,24,40,0.04)]"
          >
            <div className="inline-flex rounded-2xl bg-[color:var(--surface-subtle)] p-3">
              <Icon className="h-5 w-5 text-[color:var(--foreground)]" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-[color:var(--foreground)]">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{copy}</p>
          </article>
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Featured tracks
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
              Start with the fundamentals, then push into interaction and systems.
            </h2>
          </div>
          <Link
            className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--foreground)]"
            href="/tracks"
          >
            See all tracks
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {featuredTracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>

      <section className="rounded-[34px] border border-[color:var(--line)] bg-white p-8 shadow-[0_1px_0_rgba(16,24,40,0.04)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--muted)]">
              What’s next
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
              The roadmap continues into React systems and full-stack product flows.
            </h2>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {comingSoonTracks.map((track) => (
            <article
              key={track.id}
              className="rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface-subtle)] p-5"
            >
              <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--muted)]">
                {track.level}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                {track.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                {track.shortDescription}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[36px] border border-[color:var(--line)] bg-[color:var(--foreground)] px-8 py-10 text-white">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">Ready to start</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
              Begin with the first track and let the product teach through momentum.
            </h2>
          </div>
          <Link className="rounded-full bg-white px-5 py-3 text-sm font-medium text-[color:var(--foreground)]" href="/tracks">
            Start learning
          </Link>
        </div>
      </section>
    </div>
  );
}
