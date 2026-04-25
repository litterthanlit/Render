"use client";

import { ClipboardCheck, ImagePlus, Send } from "lucide-react";
import { useEffect, useState } from "react";

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
    <section className="rounded-[28px] border border-[color:var(--line)] bg-white p-6 shadow-[0_12px_36px_rgba(17,17,17,0.04)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
            Project submission
          </p>
          <h3 className="mt-3 text-2xl font-normal tracking-[-0.035em] text-[color:var(--foreground)]">
            {project.title}
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[color:var(--muted)]">
            {project.brief}
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--surface-subtle)] px-3 py-1 text-xs font-medium text-[color:var(--foreground)]">
          <ClipboardCheck className="h-4 w-4" />
          {statusLabels[status]}
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-[color:var(--foreground)]">
          GitHub repo URL
          <input
            className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-subtle)] px-4 py-3 text-sm font-normal outline-none transition focus:border-[color:var(--line-strong)]"
            value={githubUrl}
            onChange={(event) => setGithubUrl(event.target.value)}
            placeholder="https://github.com/..."
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[color:var(--foreground)]">
          Pull request URL
          <input
            className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-subtle)] px-4 py-3 text-sm font-normal outline-none transition focus:border-[color:var(--line-strong)]"
            value={pullRequestUrl}
            onChange={(event) => setPullRequestUrl(event.target.value)}
            placeholder="https://github.com/.../pull/1"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[color:var(--foreground)]">
          Deployment URL
          <input
            className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-subtle)] px-4 py-3 text-sm font-normal outline-none transition focus:border-[color:var(--line-strong)]"
            value={deploymentUrl}
            onChange={(event) => setDeploymentUrl(event.target.value)}
            placeholder="https://..."
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-medium text-[color:var(--foreground)]">
        Notes / reflection
        <textarea
          className="min-h-32 rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface-subtle)] px-4 py-3 text-sm font-normal leading-6 outline-none transition focus:border-[color:var(--line-strong)]"
          value={reflection}
          onChange={(event) => setReflection(event.target.value)}
          placeholder="What changed, what you learned, and what still needs review?"
        />
      </label>

      <label className="mt-4 grid gap-2 text-sm font-medium text-[color:var(--foreground)]">
        Screenshot upload placeholder
        <div className="flex items-center gap-3 rounded-2xl border border-dashed border-[color:var(--line-strong)] bg-[color:var(--surface-subtle)] p-4">
          <ImagePlus className="h-5 w-5 text-[color:var(--muted)]" />
          <input
            className="w-full bg-transparent text-sm font-normal outline-none"
            value={screenshotNote}
            onChange={(event) => setScreenshotNote(event.target.value)}
            placeholder="Add screenshot notes for now. File uploads can be wired to storage later."
          />
        </div>
      </label>

      <div className="mt-5 rounded-3xl bg-[color:var(--surface-subtle)] p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
          Rubric checklist
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {project.rubric.map((item) => (
            <label key={item} className="flex items-center gap-3 text-sm text-[color:var(--foreground)]">
              <input type="checkbox" className="h-4 w-4 accent-[color:var(--foreground)]" />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        className="button-primary mt-5 inline-flex items-center gap-2"
        type="button"
        onClick={submit}
      >
        <Send className="h-4 w-4" />
        Save submission
      </button>
      {attemptedSubmit && (!githubValid || !reflectionValid || !deploymentValid) ? (
        <p className="mt-3 rounded-2xl border border-[color:var(--danger)]/16 bg-[color:var(--danger-soft)] px-4 py-3 text-sm leading-6 text-[color:var(--foreground)]">
          {project.requiresDeploymentUrl
            ? "Add valid GitHub and deployed URLs that start with http:// or https://, plus a reflection before submitting."
            : "Add a valid GitHub URL that starts with http:// or https://, plus a reflection before submitting."}
        </p>
      ) : null}
    </section>
  );
}
