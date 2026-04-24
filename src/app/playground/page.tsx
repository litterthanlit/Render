import { LessonLab } from "@/components/LessonLab";

export default function PlaygroundPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10 md:px-8 md:py-16">
      <section className="max-w-3xl space-y-4">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--muted)]">
          Freeform lab
        </p>
        <h1 className="text-4xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)] md:text-6xl">
          Prototype layout, content, and interaction ideas without checkpoints.
        </h1>
        <p className="text-base leading-7 text-[color:var(--muted)]">
          This playground uses the same runtime as the lesson engine, so experiments here
          behave like the exercises you complete inside each track.
        </p>
      </section>

      <LessonLab
        standaloneTitle="Render playground"
        standalonePrompt="Use this space to test layouts, write small interactions, and experiment with interface direction."
      />
    </div>
  );
}
