import Link from "next/link";

import { ProgressDock } from "@/components/ProgressDock";

export function SiteHeader() {
  return (
    <header className="border-b border-white/8 bg-[rgba(7,10,11,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[radial-gradient(circle_at_top,_rgba(106,227,255,0.36),_rgba(14,20,22,1)_72%)] text-sm font-semibold uppercase tracking-[0.34em] text-[color:var(--accent)]">
            R
          </span>
          <div>
            <p className="font-serif-display text-2xl italic text-[color:var(--paper)]">
              Render
            </p>
            <p className="text-[10px] uppercase tracking-[0.32em] text-[color:var(--muted)]">
              Design engineering in motion
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-[color:var(--muted)] md:flex">
          <Link className="transition hover:text-[color:var(--paper)]" href="/tracks">
            Tracks
          </Link>
          <Link className="transition hover:text-[color:var(--paper)]" href="/playground">
            Playground
          </Link>
        </nav>

        <ProgressDock />
      </div>
    </header>
  );
}
