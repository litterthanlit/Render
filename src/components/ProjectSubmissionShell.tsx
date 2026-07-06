"use client";

import { ClipboardCheck, ImagePlus, Send } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge, Button, Card, Eyebrow, FormField, Input, Textarea } from "@/components/render-ui";
import { saveProjectSubmission, readProgress } from "@/lib/progress";
import { CurriculumProject, ProjectSubmissionStatus } from "@/lib/types";

type ProjectSubmissionShellProps = {
  project: CurriculumProject;
};

const statusLabels: Record<ProjectSubmissionStatus, string> = {
  "not-submitted": "Not submitted",
  submitted: "Submitted",
  "needs-revision": "Needs revision",
  approved: "Approved"
};

const statusTone: Record<ProjectSubmissionStatus, "neutral" | "blue" | "success" | "warning"> = {
  "not-submitted": "neutral",
  submitted: "blue",
  "needs-revision": "warning",
  approved: "success"
};

export function ProjectSubmissionShell({ project }: ProjectSubmissionShellProps) {
  const [githubUrl, setGithubUrl] = useState("");
  const [deploymentUrl, setDeploymentUrl] = useState("");
  const [pullRequestUrl, setPullRequestUrl] = useState("");
  const [reflection, setReflection] = useState("");
  const [screenshotNote, setScreenshotNote] = useState("");
  const [status, setStatus] = useState<ProjectSubmissionStatus>("not-submitted");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const validUrl = (value: string) => /^https?:\/\/\S+\.\S+/.test(value.trim());
  const githubValid = validUrl(githubUrl);
  const deploymentValid = !project.requiresDeploymentUrl || validUrl(deploymentUrl);
  const reflectionValid = Boolean(reflection.trim());

  useEffect(() => {
    const existing = readProgress().projectSubmissions.find(
      (item) => item.projectId === project.id
    );
    if (!existing) {
      return;
    }

    setGithubUrl(existing.githubUrl);
    setDeploymentUrl(existing.deploymentUrl);
    setPullRequestUrl(existing.pullRequestUrl ?? "");
    setReflection(existing.reflection);
    setScreenshotNote(existing.screenshotNote);
    setStatus(existing.status);
  }, [project.id]);

  const submit = () => {
    setAttemptedSubmit(true);
    if (!githubValid || !reflectionValid || !deploymentValid) {
      return;
    }

    const updated = saveProjectSubmission({
      projectId: project.id,
      githubUrl,
      deploymentUrl,
      pullRequestUrl,
      reflection,
      screenshotNote,
      status: "submitted",
      reviewerComments: "Reviewer comments placeholder for a future mentor workflow."
    });
    setStatus(
      updated.projectSubmissions.find((item) => item.projectId === project.id)?.status ??
        "submitted"
    );
    window.dispatchEvent(new Event("render-progress-changed"));
  };

  return (
    <Card className="rounded-lg p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <Eyebrow>Project submission</Eyebrow>
          <h3 className="mt-2 text-2xl font-semibold">{project.title}</h3>
          <p className="mt-3 max-w-3xl text-pretty text-sm leading-6 text-[color:var(--muted)]">
            {project.brief}
          </p>
        </div>
        <Badge tone={statusTone[status]}>
          <ClipboardCheck className="size-3" />
          {statusLabels[status]}
        </Badge>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <FormField label="GitHub repo URL">
          <Input
            value={githubUrl}
            onChange={(event) => setGithubUrl(event.target.value)}
            placeholder="https://github.com/..."
          />
        </FormField>
        <FormField label="Pull request URL">
          <Input
            value={pullRequestUrl}
            onChange={(event) => setPullRequestUrl(event.target.value)}
            placeholder="https://github.com/.../pull/1"
          />
        </FormField>
        <FormField label="Deployment URL">
          <Input
            value={deploymentUrl}
            onChange={(event) => setDeploymentUrl(event.target.value)}
            placeholder="https://..."
          />
        </FormField>
      </div>

      <FormField label="Notes / reflection" error={attemptedSubmit && !reflectionValid ? "Add a reflection before submitting." : undefined}>
        <Textarea
          value={reflection}
          onChange={(event) => setReflection(event.target.value)}
          placeholder="What changed, what you learned, and what still needs review?"
        />
      </FormField>

      <FormField label="Screenshot upload placeholder">
        <div className="flex items-center gap-3 rounded-lg border border-dashed border-[color:var(--line-strong)] bg-[color:var(--surface-subtle)] p-3">
          <ImagePlus className="size-5 shrink-0 text-[color:var(--muted)]" />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--muted-soft)]"
            value={screenshotNote}
            onChange={(event) => setScreenshotNote(event.target.value)}
            placeholder="Add screenshot notes for now. File uploads can be wired to storage later."
          />
        </div>
      </FormField>

      <div className="mt-5 rounded-lg bg-[color:var(--surface-subtle)] p-4">
        <p className="text-sm font-medium text-[color:var(--muted-strong)]">Rubric checklist</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {project.rubric.map((item) => (
            <label key={item} className="flex items-center gap-3 text-sm text-[color:var(--foreground)]">
              <input type="checkbox" className="size-4 accent-[color:var(--foreground)]" />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <Button className="mt-5" type="button" onClick={submit}>
        <Send className="size-4" />
        Save submission
      </Button>
      {attemptedSubmit && (!githubValid || !deploymentValid) ? (
        <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-[color:var(--foreground)]">
          {project.requiresDeploymentUrl
            ? "Add valid GitHub and deployed URLs that start with http:// or https://."
            : "Add a valid GitHub URL that starts with http:// or https://."}
        </p>
      ) : null}
    </Card>
  );
}
