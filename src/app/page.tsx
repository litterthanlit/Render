import { ArrowRight, CheckCircle2 } from "lucide-react";

import {
  AccentRule,
  Button,
  FeatureCard,
  ProductMockup,
  RoadmapTimeline,
  SectionHeading,
  StatRow,
  landingFeatures
} from "@/components/render-ui";
import { curriculumPhases } from "@/content";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 md:px-6 md:py-12">
      <section className="grid items-center gap-10 pb-14 pt-8 lg:grid-cols-[minmax(0,0.84fr)_minmax(560px,1fr)] lg:gap-14 lg:pb-20 lg:pt-14">
        <div>
          <h1 className="text-balance text-5xl font-semibold leading-[1.02] text-[color:var(--foreground)] md:text-6xl lg:text-7xl">
            Design. Code. Ship.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-[color:var(--muted)]">
            The complete learn-by-doing path for designers who want to build real products.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/tracks">
              Start learning
              <ArrowRight className="size-4" />
            </Button>
            <Button href="/tracks" variant="secondary">
              View curriculum
            </Button>
          </div>
        </div>

        <ProductMockup />
      </section>

      <StatRow />

      <section className="grid gap-8 py-16 lg:grid-cols-[minmax(260px,0.42fr)_1fr] lg:items-start">
        <SectionHeading
          title="A product path, not a code trivia course."
          copy="Render teaches frontend foundations through realistic product surfaces, feedback states, reusable components, and shipped work."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {landingFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <AccentRule />

      <section id="path" className="py-16">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            title="The 14-phase path"
            copy="Start with interface fundamentals, then move into React, TypeScript, systems, deployment, capstone, and career packaging."
          />
          <Button href="/tracks" variant="secondary">
            Explore all phases
            <ArrowRight className="size-4" />
          </Button>
        </div>
        <RoadmapTimeline
          items={curriculumPhases.map((phase) => ({
            order: phase.order,
            title: phase.title,
            slug: phase.slug,
            type: phase.type
          }))}
        />
      </section>

      <section className="grid gap-5 rounded-lg border border-[color:var(--line)] bg-white p-6 shadow-[0_10px_30px_rgba(17,17,17,0.045)] md:grid-cols-[1fr_auto] md:items-center md:p-8">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--success)]">
            <CheckCircle2 className="size-4" />
            Built for designers starting from zero code
          </div>
          <h2 className="mt-3 text-balance text-2xl font-semibold md:text-3xl">
            Build real interfaces while learning the engineering habits behind them.
          </h2>
        </div>
        <Button href="/tracks">
          Start learning
          <ArrowRight className="size-4" />
        </Button>
      </section>
    </div>
  );
}
