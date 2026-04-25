export type RuntimeType = "html-css-js";

export type ValidationRule =
  | {
      type: "selector-exists";
      selector: string;
      message: string;
    }
  | {
      type: "selector-count";
      selector: string;
      count: number;
      message: string;
    }
  | {
      type: "text-equals";
      selector: string;
      text: string;
      message: string;
    }
  | {
      type: "has-class";
      selector: string;
      className: string;
      message: string;
    }
  | {
      type: "style-equals";
      selector: string;
      property: string;
      value: string;
      message: string;
    }
  | {
      type: "expression-returns";
      expression: string;
      expected: string | number | boolean;
      message: string;
    };

export type CodeFiles = {
  html: string;
  css: string;
  js: string;
};

export type Exercise = {
  id: string;
  title: string;
  prompt: string;
  runtime: RuntimeType;
  starterFiles: CodeFiles;
  solutionFiles: CodeFiles;
  hints: string[];
  checks: ValidationRule[];
  xp: number;
};

export type ConceptCheckPrompt = {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
};

export type ConceptCheckActivity = {
  type: "concept-check";
  id: string;
  title: string;
  prompt: string;
  prompts: ConceptCheckPrompt[];
  hints: string[];
  xp: number;
};

export type TerminalStep = {
  id: string;
  instruction: string;
  expectedCommand: string;
  output: string;
  hint: string;
};

export type SimulatedTerminalActivity = {
  type: "simulated-terminal";
  id: string;
  title: string;
  prompt: string;
  initialPath: string;
  steps: TerminalStep[];
  completionMessage: string;
  xp: number;
};

export type ExternalSubmissionActivity = {
  type: "external-submission";
  id: string;
  title: string;
  prompt: string;
  checklist: string[];
  requiredFields: Array<"githubUrl" | "pullRequestUrl">;
  xp: number;
};

export type ReactValidationRule = {
  id: string;
  label: string;
  pattern: string;
  message: string;
};

export type ReactRenderedCheck =
  | {
      type: "text-includes";
      id: string;
      label: string;
      text: string;
      message: string;
    }
  | {
      type: "selector-count";
      id: string;
      label: string;
      selector: string;
      count: number;
      message: string;
    }
  | {
      type: "click-text-change";
      id: string;
      label: string;
      selector: string;
      beforeText: string;
      afterText: string;
      message: string;
    }
  | {
      type: "click-text-includes";
      id: string;
      label: string;
      selector: string;
      text: string;
      message: string;
    }
  | {
      type: "selector-has-class";
      id: string;
      label: string;
      selector: string;
      className: string;
      message: string;
    }
  | {
      type: "input-text-includes";
      id: string;
      label: string;
      selector: string;
      value: string;
      text: string;
      message: string;
    };

export type ReactComponentActivity = {
  type: "react-component" | "ts-react-component";
  id: string;
  title: string;
  prompt: string;
  starterCode: string;
  fakeFileName: string;
  previewComponentName: string;
  instructions: string[];
  solutionCode: string;
  previewDescription: string;
  hints: string[];
  checks: ReactValidationRule[];
  renderedChecks: ReactRenderedCheck[];
  xp: number;
};

export type ComponentDocsField = {
  id: string;
  label: string;
  placeholder: string;
  minLength: number;
};

export type ComponentDocsActivity = {
  type: "component-docs";
  id: string;
  title: string;
  prompt: string;
  fields: ComponentDocsField[];
  checklist: string[];
  xp: number;
};

export type AuditNoteActivity = {
  type: "audit-note";
  id: string;
  title: string;
  prompt: string;
  fields: ComponentDocsField[];
  checklist: string[];
  xp: number;
};

export type StateModelActivity = {
  type: "state-model";
  id: string;
  title: string;
  prompt: string;
  fields: ComponentDocsField[];
  checklist: string[];
  xp: number;
};

export type MotionAuditActivity = {
  type: "motion-audit";
  id: string;
  title: string;
  prompt: string;
  fields: ComponentDocsField[];
  checklist: string[];
  xp: number;
};

export type DeploymentChecklistActivity = {
  type: "deployment-checklist";
  id: string;
  title: string;
  prompt: string;
  fields: ComponentDocsField[];
  checklist: string[];
  xp: number;
};

export type ReleaseReadmeActivity = {
  type: "release-readme";
  id: string;
  title: string;
  prompt: string;
  fields: ComponentDocsField[];
  checklist: string[];
  xp: number;
};

export type DebuggingScenario = {
  id: string;
  title: string;
  issue: string;
  causeOptions: string[];
  stepOptions: string[];
  verificationOptions: string[];
  answer: {
    cause: string;
    step: string;
    verification: string;
  };
  explanation: string;
};

export type DebuggingScenariosActivity = {
  type: "debugging-scenarios";
  id: string;
  title: string;
  prompt: string;
  scenarios: DebuggingScenario[];
  hints: string[];
  xp: number;
};

export type CapstoneMilestoneField = ComponentDocsField & {
  inputType?: "text" | "url";
};

export type CapstoneMilestone = {
  id: string;
  title: string;
  description: string;
  fields: CapstoneMilestoneField[];
  checklist?: string[];
};

export type CapstoneRubricCategory = {
  id: string;
  title: string;
  criteria: string[];
};

export type CapstoneMilestonesActivity = {
  type: "capstone-milestones" | "career-readiness";
  id: string;
  title: string;
  prompt: string;
  brief: string;
  requirements: {
    title: string;
    items: string[];
  }[];
  milestones: CapstoneMilestone[];
  finalSubmissionFields: CapstoneMilestoneField[];
  optionalSubmissionFields: CapstoneMilestoneField[];
  rubric: CapstoneRubricCategory[];
  caseStudyChecklist: string[];
  finalReviewChecklist: string[];
  xp: number;
};

export type LearningActivity =
  | ConceptCheckActivity
  | SimulatedTerminalActivity
  | ExternalSubmissionActivity
  | ReactComponentActivity
  | ComponentDocsActivity
  | AuditNoteActivity
  | StateModelActivity
  | MotionAuditActivity
  | DeploymentChecklistActivity
  | ReleaseReadmeActivity
  | DebuggingScenariosActivity
  | CapstoneMilestonesActivity;

export type LessonSection = {
  title: string;
  paragraphs: string[];
  bulletPoints?: string[];
};

export type Lesson = {
  id: string;
  slug: string;
  title: string;
  duration: string;
  objectives: string[];
  sections: LessonSection[];
  exercise?: Exercise;
  activity?: LearningActivity;
  nextLessonSlug?: string;
};

export type Module = {
  id: string;
  title: string;
  summary: string;
  lessons: Lesson[];
};

export type PhaseType = "fundamentals" | "project" | "systems" | "capstone" | "career";
export type PhaseDifficulty = "Beginner" | "Intermediate" | "Advanced";
export type PhaseStatus = "Available" | "Locked" | "Coming soon";

export type TrackSummary = {
  id: string;
  slug: string;
  title: string;
  level: PhaseDifficulty;
  shortDescription: string;
  estimatedHours: string;
  status: "Available" | "Coming next";
};

export type Track = TrackSummary & {
  modules: Module[];
};

export type ProjectSubmissionStatus =
  | "not-submitted"
  | "submitted"
  | "needs-revision"
  | "approved";

export type ProjectSubmission = {
  projectId: string;
  githubUrl: string;
  deploymentUrl: string;
  pullRequestUrl?: string;
  reflection: string;
  screenshotNote: string;
  status: ProjectSubmissionStatus;
  rubricScore?: number;
  reviewerComments?: string;
};

export type ComponentDocsEntry = {
  activityId: string;
  fields: Record<string, string>;
  updatedAt: string;
};

export type CurriculumProject = {
  id: string;
  title: string;
  brief: string;
  deliverables: string[];
  rubric: string[];
  submissionRequired: boolean;
  requiresDeploymentUrl?: boolean;
};

export type CurriculumPhase = {
  id: string;
  order: number;
  slug: string;
  title: string;
  shortDescription: string;
  goal: string;
  estimatedTime: string;
  difficulty: PhaseDifficulty;
  type: PhaseType;
  status: PhaseStatus;
  topics: string[];
  lessons: Lesson[];
  labs: string[];
  projects: CurriculumProject[];
  deliverables: string[];
  evaluationCriteria: string[];
  unlockRequirements: string[];
  requiredTools: string[];
  mentorCheckpoints: string[];
};

export type UserProgress = {
  version: number;
  completedLessonIds: string[];
  completedExerciseIds: string[];
  completedActivityIds: string[];
  submittedProjectIds: string[];
  completedPhaseIds: string[];
  projectSubmissions: ProjectSubmission[];
  componentDocsEntries: ComponentDocsEntry[];
  xp: number;
  streakCount: number;
  lastActiveDate: string | null;
};

export type ValidationResult = {
  rule: ValidationRule;
  passed: boolean;
  detail: string;
};
