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

export type LearningActivity =
  | ConceptCheckActivity
  | SimulatedTerminalActivity
  | ExternalSubmissionActivity;

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

export type CurriculumProject = {
  id: string;
  title: string;
  brief: string;
  deliverables: string[];
  rubric: string[];
  submissionRequired: boolean;
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
  xp: number;
  streakCount: number;
  lastActiveDate: string | null;
};

export type ValidationResult = {
  rule: ValidationRule;
  passed: boolean;
  detail: string;
};
