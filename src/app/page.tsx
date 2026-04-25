import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Box,
  CheckCircle2,
  Code2,
  Globe2,
  Play,
  Rocket,
  UserRound
} from "lucide-react";

import { curriculumPhases } from "@/content";

const roadmapItems = [
  { order: 1, label: "Orientation" },
  { order: 2, label: "HTML & Structure" },
  { order: 3, label: "CSS & Layout" },
  { order: 4, label: "JavaScript Fundamentals" },
  { order: 5, label: "Git & Workflow" },
  { order: 6, label: "React Fundamentals" },
  { order: 7, label: "TypeScript" },
  { order: 13, label: "Capstone Project", accent: "red" },
  { order: 14, label: "Career Preparation", accent: "red" }
];

const features = [
  {
    icon: Code2,
    title: "Learn by building",
    copy: "Interactive labs with instant feedback, hints, and live previews in your browser.",
    accent: "blue"
  },
  {
    icon: Box,
    title: "Real-world projects",
    copy: "Build practical interfaces, systems, and full product surfaces — not toy apps.",
    accent: "purple"
  },
  {
    icon: Globe2,
    title: "Ship with confidence",
    copy: "Deploy, debug, and document like a pro. Take your work from local to live.",
    accent: "blue"
  },
  {
    icon: UserRound,
    title: "Career ready",
    copy: "Build your portfolio, write case studies, and prepare for real-world interviews.",
    accent: "red"
  }
];

function ProductMockup() {
  return (
    <div className="relative">
      <div className="dot-matrix absolute -right-12 -top-16 h-72 w-80 opacity-60" />
      <div className="dot-matrix-red absolute -right-12 bottom-8 h-32 w-36 opacity-60" />
      <div className="render-card render-soft-shadow relative overflow-hidden rounded-[28px]">
        <div className="grid min-h-[390px] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border-b border-[color:var(--line)] bg-white/80 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between border-b border-[color:var(--line)] px-5 py-4">
              <div className="flex items-center gap-3">
                <Code2 className="h-4 w-4 text-[color:var(--muted)]" />
                <span className="text-sm text-[color:var(--foreground)]">DashboardCard.tsx</span>
                <span className="rounded-full bg-[color:var(--surface-subtle)] px-2 py-1 text-[10px] text-[color:var(--muted)]">
                  TSX
                </span>
              </div>
            </div>
            <pre className="overflow-hidden px-5 py-4 font-mono text-[11px] leading-6 text-[color:var(--muted)] md:text-xs">
              <code>{`import { Card } from "@/components/ui/card";

export function DashboardCard({
  title,
  value,
  trend
}: {
  title: string;
  value: string;
  trend: string;
}) {
  return (
    <Card className="transition">
      <p>{title}</p>
      <p>{value}</p>
      <p>{trend}</p>
    </Card>
  );
}`}</code>
            </pre>
            <div className="flex items-center justify-between border-t border-[color:var(--line)] px-5 py-3">
              <div className="flex items-center gap-2 text-sm text-[color:var(--muted)]">
                <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--success)]" />
                Completed successfully
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--line)] bg-white px-3 py-2 text-sm text-[color:var(--foreground)]" type="button">
                <Play className="h-3.5 w-3.5 fill-[color:var(--foreground)]" />
                Run
              </button>
            </div>
          </div>

          <div className="bg-white/70">
            <div className="flex items-center justify-between border-b border-[color:var(--line)] px-5 py-4">
              <span className="text-sm text-[color:var(--foreground)]">Preview</span>
              <span className="rounded-xl bg-[color:var(--surface-subtle)] px-2 py-1 text-xs text-[color:var(--muted)]">
                Live
              </span>
            </div>
            <div className="flex min-h-[300px] items-center justify-center p-6">
              <div className="w-full max-w-[300px] rounded-[20px] border border-[color:var(--line)] bg-white p-6 shadow-[0_18px_60px_rgba(17,17,17,0.08)]">
                <p className="text-sm text-[color:var(--muted)]">Total Users</p>
                <p className="mt-4 text-4xl font-normal tracking-[-0.05em] text-[color:var(--foreground)]">
                  12,345
                </p>
                <p className="mt-2 text-sm text-emerald-600">+12.5% from last week</p>
                <svg className="mt-8 h-20 w-full" viewBox="0 0 260 80" role="img" aria-label="Soft trend line">
                  <path d="M5 62 C45 40 72 58 102 45 C130 30 155 22 184 33 C210 42 232 26 255 18" fill="none" stroke="#7c7cff" strokeLinecap="round" strokeWidth="3" />
                  <circle cx="255" cy="18" r="4" fill="#5d8cff" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-14 px-5 py-10 md:px-8 md:py-16">
      <section className="grid items-center gap-12 py-8 lg:grid-cols-[0.72fr_1fr] lg:py-16">
        <div>
          <h1 className="text-balance text-6xl font-normal tracking-[-0.075em] text-[color:var(--foreground)] md:text-7xl lg:text-8xl">
            Design. Code. Ship.
          </h1>
          <p className="mt-7 max-w-xl text-xl font-normal leading-9 tracking-[-0.02em] text-[color:var(--muted)]">
            The complete learn-by-doing path for designers who want to build real products.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="button-primary inline-flex items-center gap-2" href="/tracks">
              Start learning
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link className="button-muted inline-flex items-center gap-2" href="/tracks">
              View curriculum
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { icon: BookOpen, value: "14", label: "Phases" },
              { icon: Code2, value: "100+", label: "Hands-on labs" },
              { icon: Rocket, value: "20+", label: "Real projects" },
              { icon: CheckCircle2, value: "1", label: "Capstone" }
            ].map(({ icon: Icon, value, label }) => (
              <div key={label}>
                <Icon className="h-5 w-5 text-[color:var(--muted)]" />
                <p className="mt-5 text-3xl font-normal tracking-[-0.05em] text-[color:var(--foreground)]">
                  {value}
                </p>
                <p className="mt-1 text-sm text-[color:var(--muted)]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <ProductMockup />
      </section>

      <section id="path" className="render-card rounded-[32px] p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-normal tracking-[-0.045em] text-[color:var(--foreground)]">
              The full path
            </h2>
            <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
              From your first line of code to a review-ready portfolio.
            </p>
            <Link className="button-muted mt-5 inline-flex items-center gap-2" href="/tracks">
              Explore all phases
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="overflow-x-auto pb-3">
            <div className="relative flex min-w-[860px] items-start justify-between gap-6 px-1 pt-6">
              <div className="absolute left-5 right-5 top-8 h-px bg-[color:var(--line)]" />
              {roadmapItems.map((item, index) => (
                <div key={item.order} className="relative flex w-24 flex-col items-center text-center">
                  <span className={`h-2 w-2 rounded-full ${item.accent === "red" ? "bg-[color:var(--accent-red)]" : "bg-[color:var(--accent)]"}`} />
                  <span className="mt-6 flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--line-strong)] bg-white text-sm text-[color:var(--foreground)] shadow-[0_6px_16px_rgba(17,17,17,0.04)]">
                    {item.order}
                  </span>
                  <span className="mt-3 text-sm leading-5 text-[color:var(--foreground)]">
                    {item.label}
                  </span>
                  {index === 6 ? <span className="mt-1 text-sm text-[color:var(--muted)]">...</span> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {features.map(({ icon: Icon, title, copy, accent }) => (
          <article key={title} className="render-card relative min-h-[250px] overflow-hidden rounded-[28px] p-7">
            <div className={`absolute bottom-0 right-0 h-24 w-32 opacity-70 ${accent === "red" ? "dot-matrix-red" : "dot-matrix"}`} />
            <Icon className="h-6 w-6 text-[color:var(--foreground)]" />
            <h3 className="mt-8 text-xl font-normal tracking-[-0.025em] text-[color:var(--foreground)]">
              {title}
            </h3>
            <p className="mt-4 max-w-[240px] text-sm leading-7 text-[color:var(--muted)]">
              {copy}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-[32px] border border-[color:var(--line)] bg-[color:var(--foreground)] p-8 text-white md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-white/58">Render curriculum</p>
            <h2 className="mt-2 text-3xl font-normal tracking-[-0.045em]">
              {curriculumPhases.length} phases from visual intent to shipped product work.
            </h2>
          </div>
          <Link className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-[color:var(--foreground)]" href="/tracks">
            View curriculum
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
