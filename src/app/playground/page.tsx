import { LessonLab } from "@/components/LessonLab";
import { PageHeader } from "@/components/render-ui";

export default function PlaygroundPage() {
  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 md:px-6 md:py-10">
      <PageHeader
        eyebrow="Freeform lab"
        title="Prototype layout, content, and interaction ideas without checkpoints"
        copy="This playground uses the same runtime as the lesson engine, so experiments here behave like the exercises you complete inside each track."
      />

      <div className="mt-8">
        <LessonLab
          standaloneTitle="Render playground"
          standalonePrompt="Use this space to test layouts, write small interactions, and experiment with interface direction."
        />
      </div>
    </div>
  );
}
