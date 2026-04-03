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
  exercise: Exercise;
  nextLessonSlug?: string;
};

export type Module = {
  id: string;
  title: string;
  summary: string;
  lessons: Lesson[];
};

export type TrackSummary = {
  id: string;
  slug: string;
  title: string;
  level: "Beginner" | "Intermediate";
  shortDescription: string;
  estimatedHours: string;
  status: "Available" | "Coming next";
};

export type Track = TrackSummary & {
  modules: Module[];
};

export type UserProgress = {
  version: number;
  completedLessonIds: string[];
  completedExerciseIds: string[];
  xp: number;
  streakCount: number;
  lastActiveDate: string | null;
};

export type ValidationResult = {
  rule: ValidationRule;
  passed: boolean;
  detail: string;
};
