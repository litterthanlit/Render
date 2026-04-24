import { htmlCssFoundations } from "@/content/tracks/html-css-foundations";
import { javascriptForDesigners } from "@/content/tracks/javascript-for-designers";
import { CurriculumPhase, Lesson } from "@/lib/types";

const allExistingLessons = [
  ...htmlCssFoundations.modules.flatMap((module) => module.lessons),
  ...javascriptForDesigners.modules.flatMap((module) => module.lessons)
];

function lesson(id: string): Lesson {
  const found = allExistingLessons.find((item) => item.id === id);
  if (!found) {
    throw new Error(`Missing lesson ${id}`);
  }
  return found;
}

const gitWorkflowLessons: Lesson[] = [
  {
    id: "lesson-git-why-designers-need-it",
    slug: "what-git-is-and-why-designers-need-it",
    title: "What Git Is and Why Designers Need It",
    duration: "25 min",
    objectives: [
      "Explain version control in plain design terms.",
      "Tell the difference between Git and GitHub.",
      "Map commits, repositories, branches, and pull requests to familiar design workflow concepts."
    ],
    sections: [
      {
        title: "Code needs history",
        paragraphs: [
          "When you design in Figma, you naturally create versions: an exploration, a refinement, a reviewed direction, a final candidate. Code needs the same kind of memory, but with more precision.",
          "Git is version control. It records meaningful saved milestones in a project so you can understand what changed, when it changed, and why it changed.",
          "For a design engineer, Git is not a developer ritual. It is how interface decisions become reviewable, reversible, and safe to share."
        ]
      },
      {
        title: "The core ideas",
        paragraphs: [
          "A repository is the project folder Git is watching. A commit is a saved milestone with a message. A branch is a separate line of exploration. GitHub is a place to host the project and invite review.",
          "A pull request is closest to a design critique: it shows the proposed change, gives people a place to comment, and creates a clear moment before the work merges into the main project."
        ],
        bulletPoints: [
          "Git: the version-control tool on your machine.",
          "GitHub: the hosted shelf where repositories can be shared and reviewed.",
          "Commit: a named save point in the project history.",
          "Branch: a focused exploration that does not disturb the main work.",
          "Pull request: a reviewable proposal to merge a branch."
        ]
      }
    ],
    activity: {
      type: "concept-check",
      id: "activity-git-concept-check",
      title: "Label the Git workflow",
      prompt:
        "Match each Git concept to the design-workflow idea it most closely resembles.",
      prompts: [
        {
          id: "concept-repository",
          prompt: "Which concept is the project folder Git is tracking?",
          options: ["Repository", "Pull request", "Commit", "Terminal"],
          answer: "Repository",
          explanation: "A repository is the project container with Git history attached."
        },
        {
          id: "concept-commit",
          prompt: "Which concept is most like a named saved milestone?",
          options: ["Branch", "Commit", "GitHub", "README"],
          answer: "Commit",
          explanation: "A commit captures a specific set of changes with a message."
        },
        {
          id: "concept-branch",
          prompt: "Which concept is most like a separate design exploration?",
          options: ["Branch", "Remote", "Status", "Main"],
          answer: "Branch",
          explanation: "A branch lets you explore without changing the main line of work."
        },
        {
          id: "concept-github",
          prompt: "What is GitHub in this workflow?",
          options: [
            "A hosted place to share repositories",
            "The command that saves a milestone",
            "The local project history itself",
            "A CSS framework"
          ],
          answer: "A hosted place to share repositories",
          explanation: "Git works locally; GitHub hosts the repository so others can see and review it."
        }
      ],
      hints: [
        "Think about what designers already know: files, versions, explorations, critique, and documentation."
      ],
      xp: 70
    },
    nextLessonSlug: "command-line-basics-for-designers"
  },
  {
    id: "lesson-command-line-basics",
    slug: "command-line-basics-for-designers",
    title: "Command Line Basics for Designers",
    duration: "35 min",
    objectives: [
      "Use the terminal to move around project folders.",
      "Understand `pwd`, `ls`, `cd`, `mkdir`, `touch`, `code .`, and `clear`.",
      "Complete a safe simulated command sequence without needing a real terminal yet."
    ],
    sections: [
      {
        title: "The terminal is a text-based tool palette",
        paragraphs: [
          "The terminal can feel stark at first because it does not show buttons, panels, or familiar affordances. But most beginner work is a small set of repeatable commands.",
          "You use it to ask where you are, move into folders, create files, open a project in your editor, and run tools. It is less like programming at first and more like navigating a very precise file browser."
        ]
      },
      {
        title: "The first commands",
        paragraphs: [
          "`pwd` prints the current folder. `ls` lists files. `mkdir` creates a folder. `cd` moves into a folder. `touch` creates a file. `code .` opens the current folder in VS Code. `clear` clears the terminal view.",
          "The goal is not memorization. The goal is comfort: knowing that commands are small, readable actions you can retry."
        ],
        bulletPoints: [
          "`pwd`: Where am I?",
          "`ls`: What is here?",
          "`mkdir project-name`: Make a folder.",
          "`cd project-name`: Enter that folder.",
          "`touch index.html`: Create a file.",
          "`code .`: Open this folder in VS Code."
        ]
      }
    ],
    activity: {
      type: "simulated-terminal",
      id: "activity-terminal-basics",
      title: "Create a tiny project folder",
      prompt:
        "Use a simulated terminal to check your location, create a project folder, enter it, create `index.html`, and list the files.",
      initialPath: "~/Desktop",
      steps: [
        {
          id: "terminal-pwd",
          instruction: "Check the current folder.",
          expectedCommand: "pwd",
          output: "~/Desktop",
          hint: "Type `pwd` to print the working directory."
        },
        {
          id: "terminal-mkdir",
          instruction: "Create a folder called `portfolio-card`.",
          expectedCommand: "mkdir portfolio-card",
          output: "Created folder: portfolio-card",
          hint: "`mkdir` means make directory."
        },
        {
          id: "terminal-cd",
          instruction: "Enter the new folder.",
          expectedCommand: "cd portfolio-card",
          output: "Moved into portfolio-card",
          hint: "`cd` changes directory."
        },
        {
          id: "terminal-touch",
          instruction: "Create an `index.html` file.",
          expectedCommand: "touch index.html",
          output: "Created file: index.html",
          hint: "`touch` creates an empty file when it does not exist."
        },
        {
          id: "terminal-ls",
          instruction: "List the files in the folder.",
          expectedCommand: "ls",
          output: "index.html",
          hint: "`ls` lists what is in the current folder."
        }
      ],
      completionMessage: "Nice. You created a real project shape: a folder with an HTML file inside.",
      xp: 85
    },
    nextLessonSlug: "create-your-first-git-repository"
  },
  {
    id: "lesson-first-git-repository",
    slug: "create-your-first-git-repository",
    title: "Create Your First Git Repository",
    duration: "40 min",
    objectives: [
      "Understand the first local Git workflow.",
      "Use `git init`, `git status`, `git add .`, and `git commit` in order.",
      "Explain staged and unstaged changes without jargon."
    ],
    sections: [
      {
        title: "From folder to tracked project",
        paragraphs: [
          "A regular folder becomes a Git repository when you run `git init`. From that moment, Git can notice file changes and save milestones.",
          "`git status` is the safest command in Git. It tells you what changed and what Git expects next. When you are unsure, run status."
        ]
      },
      {
        title: "Staging is choosing what goes into the milestone",
        paragraphs: [
          "Before a commit, Git asks you to stage changes. Think of staging like selecting the exact frames you want to present in a design review.",
          "`git add .` stages everything changed in the current project. `git commit -m \"Initial commit\"` saves the milestone with a message."
        ],
        bulletPoints: [
          "`git init`: Start tracking this project.",
          "`git status`: Ask Git what changed.",
          "`git add .`: Stage the current changes.",
          "`git commit -m \"Initial commit\"`: Save the first milestone."
        ]
      }
    ],
    activity: {
      type: "simulated-terminal",
      id: "activity-first-git-repo",
      title: "Save the first milestone",
      prompt:
        "Run the first local Git workflow in order. The simulated terminal will show what Git would say after each successful command.",
      initialPath: "~/Desktop/portfolio-card",
      steps: [
        {
          id: "git-init",
          instruction: "Turn the project folder into a Git repository.",
          expectedCommand: "git init",
          output: "Initialized empty Git repository in portfolio-card/.git/",
          hint: "Start with `git init`."
        },
        {
          id: "git-status-1",
          instruction: "Ask Git what it sees.",
          expectedCommand: "git status",
          output: "On branch main\n\nUntracked files:\n  index.html\n\nnothing added to commit",
          hint: "`git status` is the safe way to inspect the project."
        },
        {
          id: "git-add",
          instruction: "Stage the project files for the first commit.",
          expectedCommand: "git add .",
          output: "Staged changes:\n  new file: index.html",
          hint: "`git add .` stages all current changes."
        },
        {
          id: "git-commit",
          instruction: "Save the first milestone with a clear message.",
          expectedCommand: "git commit -m \"Initial commit\"",
          output: "[main 1a2b3c4] Initial commit\n 1 file changed, 12 insertions(+)\n create mode 100644 index.html",
          hint: "Use `git commit -m \"Initial commit\"` exactly."
        }
      ],
      completionMessage: "First commit saved. Your project now has a recoverable history point.",
      xp: 95
    },
    nextLessonSlug: "push-to-github-and-open-a-pull-request"
  },
  {
    id: "lesson-github-pr",
    slug: "push-to-github-and-open-a-pull-request",
    title: "Push to GitHub and Open a Pull Request",
    duration: "45 min",
    objectives: [
      "Understand how a local repository connects to GitHub.",
      "Explain remote origin, push, branches, and pull requests.",
      "Complete a guided external workflow with GitHub and PR links."
    ],
    sections: [
      {
        title: "GitHub is the project shelf",
        paragraphs: [
          "Git saves history locally. GitHub gives that history a shared home. Once a repository is on GitHub, you can share the code, open a pull request, and ask for review.",
          "A remote named `origin` is the GitHub address your local repository pushes to. `git push` uploads your commits."
        ]
      },
      {
        title: "Pull requests are code critique",
        paragraphs: [
          "A pull request is a proposal, not a final declaration. It tells teammates what changed, why it changed, and what kind of feedback would help.",
          "Design engineers use PRs to make interface decisions visible: structure, accessibility, responsive behavior, naming, and polish can all be reviewed."
        ],
        bulletPoints: [
          "Create a GitHub repository for the project.",
          "Connect your local repository with a remote origin.",
          "Push your commits to GitHub.",
          "Create a branch for a small change.",
          "Open a pull request and describe the work."
        ]
      }
    ],
    activity: {
      type: "external-submission",
      id: "activity-github-pr-checklist",
      title: "Complete the GitHub sharing workflow",
      prompt:
        "Use GitHub outside the platform, then return here to confirm each step and paste your repository and pull request URLs.",
      checklist: [
        "Create a new GitHub repository.",
        "Connect the local repository to GitHub as `origin`.",
        "Push the main branch.",
        "Create a feature branch for a small README or interface update.",
        "Push the branch.",
        "Open a pull request with a short description."
      ],
      requiredFields: ["githubUrl", "pullRequestUrl"],
      xp: 110
    }
  }
];

export const curriculumPhases: CurriculumPhase[] = [
  {
    id: "phase-01-orientation",
    order: 1,
    slug: "orientation-to-code-for-designers",
    title: "Orientation to Code for Designers",
    shortDescription:
      "Set up the learning environment and reframe code as a design material.",
    goal: "Introduce the mindset of coding as a design material and set up the development environment.",
    estimatedTime: "2-3 hours",
    difficulty: "Beginner",
    type: "fundamentals",
    status: "Available",
    topics: ["Why designers code", "Development tools overview", "Code editors", "Browser DevTools", "Online sandboxes"],
    lessons: [],
    labs: ["Explore DevTools to inspect HTML and CSS", "Complete the environment checklist"],
    projects: [],
    deliverables: ["Environment checklist", "Reflection on coding mindset"],
    evaluationCriteria: [
      "Learner can set up a development environment.",
      "Learner can articulate why coding enhances design practice."
    ],
    unlockRequirements: ["Start here"],
    requiredTools: ["Browser", "VS Code or online editor", "Browser DevTools"],
    mentorCheckpoints: ["Optional setup review"]
  },
  {
    id: "phase-02-html-semantic-structure",
    order: 2,
    slug: "html-semantic-structure",
    title: "HTML & Semantic Structure",
    shortDescription:
      "Translate design hierarchy into semantic, accessible page structure.",
    goal: "Build solid knowledge of semantic HTML and accessible structure.",
    estimatedTime: "4-5 hours",
    difficulty: "Beginner",
    type: "fundamentals",
    status: "Available",
    topics: ["HTML tags", "Document structure", "Semantic elements", "Accessibility basics", "Landmarks"],
    lessons: [lesson("lesson-semantic-card"), lesson("lesson-landmark-story")],
    labs: ["Build a portfolio card with headings and labels", "Map a page using header, main, and footer landmarks", "Short quizzes on semantic tags"],
    projects: [],
    deliverables: ["Portfolio card markup", "Page skeleton with landmarks"],
    evaluationCriteria: [
      "Learner produces well-structured semantic HTML.",
      "Learner can explain tag choices in design language."
    ],
    unlockRequirements: ["Complete Phase 1 orientation"],
    requiredTools: ["Browser lab", "HTML", "Browser DevTools"],
    mentorCheckpoints: ["Semantic structure review placeholder"]
  },
  {
    id: "phase-03-css-layout-responsive-design",
    order: 3,
    slug: "css-layout-responsive-design",
    title: "CSS Layout & Responsive Design",
    shortDescription:
      "Control spacing, rhythm, responsive behavior, and modern layout systems.",
    goal: "Learn to control layout, spacing, and rhythm using modern CSS.",
    estimatedTime: "8-10 hours",
    difficulty: "Beginner",
    type: "fundamentals",
    status: "Available",
    topics: ["Box model", "Margin and padding", "Flexbox", "Grid", "Responsive media queries"],
    lessons: [lesson("lesson-flexbox-layout"), lesson("lesson-flex-controls")],
    labs: ["Arrange a split hero section with Flexbox", "Compose a compact action row"],
    projects: [
      {
        id: "project-responsive-homepage",
        title: "Responsive Homepage",
        brief:
          "Build a homepage that adapts cleanly across mobile, tablet, and desktop using semantic HTML, Flexbox, Grid, and responsive spacing.",
        deliverables: ["GitHub repo URL", "Deployed URL", "Responsive screenshots", "Short spacing and breakpoint reflection"],
        rubric: ["Semantic structure", "Responsive behavior", "Layout clarity", "Visual polish", "Accessible text and controls"],
        submissionRequired: true
      }
    ],
    deliverables: ["Responsive hero section", "Action row component", "Responsive homepage project"],
    evaluationCriteria: [
      "Learner builds responsive layouts using Flexbox and Grid.",
      "Learner can explain spacing and breakpoint decisions."
    ],
    unlockRequirements: ["Complete Phase 2 semantic labs"],
    requiredTools: ["Browser lab", "HTML", "CSS", "Browser DevTools"],
    mentorCheckpoints: ["Responsive homepage review placeholder"]
  },
  {
    id: "phase-04-js-dom",
    order: 4,
    slug: "javascript-fundamentals-dom-manipulation",
    title: "JavaScript Fundamentals & DOM Manipulation",
    shortDescription:
      "Use readable JavaScript to make interface states interactive and data-driven.",
    goal: "Introduce JavaScript programming principles and DOM interaction.",
    estimatedTime: "10-12 hours",
    difficulty: "Beginner",
    type: "fundamentals",
    status: "Available",
    topics: ["Variables", "Data types", "Arrays", "Functions", "Event handling", "DOM querying", "DOM manipulation"],
    lessons: [
      lesson("lesson-counter"),
      lesson("lesson-theme-toggle"),
      lesson("lesson-status-filter"),
      lesson("lesson-render-tags")
    ],
    labs: ["Wire a simple counter", "Build a theme toggle", "Filter a status list", "Render a tag list from an array"],
    projects: [],
    deliverables: ["Counter component", "Theme toggle component", "Filtered list", "Tag rendering function"],
    evaluationCriteria: [
      "Learner writes clean JavaScript that updates the DOM in response to user actions.",
      "Learner can describe state changes in interface terms."
    ],
    unlockRequirements: ["Complete Phase 3 layout labs"],
    requiredTools: ["Browser lab", "JavaScript", "Browser DevTools console"],
    mentorCheckpoints: ["Interaction logic review placeholder"]
  },
  {
    id: "phase-05-git-workflow",
    order: 5,
    slug: "git-command-line-developer-workflow",
    title: "Git, Command Line & Developer Workflow",
    shortDescription:
      "Bridge browser labs into real project work with terminal basics, Git history, GitHub sharing, and pull requests.",
    goal: "Help non-technical designers understand how real code work is saved, versioned, shared, reviewed, and submitted.",
    estimatedTime: "8-10 hours",
    difficulty: "Beginner",
    type: "fundamentals",
    status: "Available",
    topics: [
      "Version control",
      "Git versus GitHub",
      "Terminal navigation",
      "Local repositories",
      "Staging and commits",
      "Remote origin",
      "Branches",
      "Pull requests",
      "Code review mindset"
    ],
    lessons: gitWorkflowLessons,
    labs: [
      "Interactive Git concept check",
      "Simulated terminal project-folder exercise",
      "Simulated Git init/status/add/commit workflow",
      "Guided GitHub repository and pull request checklist"
    ],
    projects: [
      {
        id: "project-ship-first-versioned-interface",
        title: "Ship Your First Versioned Interface",
        brief:
          "Take one previous HTML/CSS/JS lab or the responsive homepage project, move it into a real local/GitHub project, commit it properly, push it to GitHub, and submit the repository for review.",
        deliverables: [
          "GitHub repository URL",
          "Pull request URL",
          "Short reflection: what changed, what Git helped track, what felt confusing, and what you would ask in a code review",
          "Screenshot placeholder"
        ],
        rubric: [
          "Repository exists",
          "Project files are organized",
          "At least 3 meaningful commits",
          "Commit messages are understandable",
          "README exists",
          "Pull request exists",
          "Reflection is completed"
        ],
        submissionRequired: true
      }
    ],
    deliverables: [
      "Completed Git concept check",
      "Completed terminal simulation",
      "Completed Git workflow simulation",
      "Completed GitHub pull request checklist",
      "Versioned interface project submission"
    ],
    evaluationCriteria: [
      "Learner can explain Git, GitHub, commits, repositories, branches, and pull requests in plain language.",
      "Learner can follow basic terminal navigation without fear.",
      "Learner can initialize, stage, and commit a local project.",
      "Learner can submit a GitHub repository, pull request, and reflection for a project."
    ],
    unlockRequirements: ["Complete the Phase 4 JavaScript labs"],
    requiredTools: ["Terminal", "Git", "GitHub", "Code editor"],
    mentorCheckpoints: ["Pull request review placeholder", "Project organization review placeholder"]
  },
  {
    id: "phase-06-react-fundamentals",
    order: 6,
    slug: "react-fundamentals",
    title: "React Fundamentals",
    shortDescription:
      "Move from DOM scripts into Vite + React components, props, state, hooks, and composition.",
    goal: "Transition to component-based UI development using React.",
    estimatedTime: "12-16 hours",
    difficulty: "Intermediate",
    type: "project",
    status: "Locked",
    topics: ["Vite", "JSX", "Components", "Props", "State", "Hooks", "Component composition"],
    lessons: [],
    labs: ["Convert previous labs into React components", "Build a counter component in React", "Create a dynamic list component"],
    projects: [
      {
        id: "project-react-component-library",
        title: "React Components Library",
        brief:
          "Rebuild the semantic card, action row, counter, theme toggle, and tag list as reusable React components in a Vite project.",
        deliverables: ["GitHub repo URL", "Deployed URL", "Component inventory", "Reflection on state and props"],
        rubric: ["Component boundaries", "Props clarity", "State correctness", "Composition quality", "Responsive behavior"],
        submissionRequired: true
      }
    ],
    deliverables: ["React component library", "Simple React app"],
    evaluationCriteria: ["Learner can build interactive UI components in React and explain how state drives rendering."],
    unlockRequirements: ["Complete Git workflow phase"],
    requiredTools: ["Vite", "React", "npm", "Browser DevTools"],
    mentorCheckpoints: ["React component review placeholder"]
  },
  {
    id: "phase-07-typescript",
    order: 7,
    slug: "typescript-for-design-engineers",
    title: "TypeScript for Design Engineers",
    shortDescription:
      "Use types to make component APIs safer, clearer, and easier to collaborate around.",
    goal: "Introduce type safety and enhance code maintainability.",
    estimatedTime: "8-10 hours",
    difficulty: "Intermediate",
    type: "project",
    status: "Locked",
    topics: ["Type annotations", "Interfaces", "Generics", "Typed props", "Typed state", "Migrating JS to TS"],
    lessons: [],
    labs: ["Add types to existing React components", "Refactor a small project to TypeScript"],
    projects: [
      {
        id: "project-typescript-refactor",
        title: "Type-Safe Interface Refactor",
        brief:
          "Convert the React component library to TypeScript and document the main component prop interfaces.",
        deliverables: ["GitHub repo URL", "TypeScript build result", "Typed props documentation"],
        rubric: ["Correct prop types", "No avoidable `any`", "Readable interfaces", "Build passes"],
        submissionRequired: true
      }
    ],
    deliverables: ["TypeScript converted components", "Project refactored with type safety"],
    evaluationCriteria: ["Learner uses TypeScript to prevent common runtime errors and improve developer confidence."],
    unlockRequirements: ["Complete React fundamentals"],
    requiredTools: ["TypeScript", "Vite", "React"],
    mentorCheckpoints: ["TypeScript API review placeholder"]
  },
  {
    id: "phase-08-design-systems-tokens",
    order: 8,
    slug: "design-systems-tokens",
    title: "Design Systems & Tokens",
    shortDescription:
      "Formalize reusable patterns with tokens, variants, component architecture, and Storybook documentation.",
    goal: "Teach how to formalize and maintain reusable interface patterns.",
    estimatedTime: "14-18 hours",
    difficulty: "Intermediate",
    type: "systems",
    status: "Locked",
    topics: ["Design tokens", "Color", "Spacing", "Typography", "Token naming", "Component variants", "Storybook"],
    lessons: [],
    labs: ["Define a token set in code", "Build button and card variants", "Document components in Storybook"],
    projects: [
      {
        id: "project-tokenized-system",
        title: "Tokenized Component System",
        brief:
          "Create a small typed component system with tokens, Button/Card variants, and required Storybook documentation.",
        deliverables: ["GitHub repo URL", "Storybook URL", "Token file", "Component documentation"],
        rubric: ["Token clarity", "Variant design", "Component API quality", "Storybook coverage", "Accessibility basics"],
        submissionRequired: true
      }
    ],
    deliverables: ["Token file", "Component library", "Component documentation"],
    evaluationCriteria: ["Learner builds scalable, reusable components and understands how tokens drive consistency."],
    unlockRequirements: ["Complete TypeScript phase"],
    requiredTools: ["React", "TypeScript", "Storybook"],
    mentorCheckpoints: ["Design system critique placeholder"]
  },
  {
    id: "phase-09-a11y-performance",
    order: 9,
    slug: "accessibility-performance",
    title: "Accessibility & Performance",
    shortDescription:
      "Audit, fix, and optimize interfaces for keyboard use, contrast, reduced motion, and runtime quality.",
    goal: "Embed accessibility and performance considerations throughout the work.",
    estimatedTime: "10-12 hours",
    difficulty: "Intermediate",
    type: "systems",
    status: "Locked",
    topics: ["ARIA", "Keyboard navigation", "Reduced motion", "Color contrast", "React profiling", "Performance optimization"],
    lessons: [],
    labs: ["Audit a project for accessibility", "Implement keyboard interactions", "Profile and optimize a React app"],
    projects: [
      {
        id: "project-a11y-performance-audit",
        title: "Accessibility and Performance Audit",
        brief:
          "Audit a previous project, fix the highest-impact issues, and produce a short before/after report.",
        deliverables: ["Audit report", "GitHub repo URL", "Deployed URL", "Before/after notes"],
        rubric: ["Keyboard support", "Contrast", "Semantic fixes", "Measured performance improvement", "Clear report"],
        submissionRequired: true
      }
    ],
    deliverables: ["Accessibility audit report", "Optimized UI component"],
    evaluationCriteria: ["Learner can identify and fix accessibility issues and improve performance."],
    unlockRequirements: ["Complete design systems phase"],
    requiredTools: ["Browser DevTools", "Lighthouse", "React Profiler"],
    mentorCheckpoints: ["Accessibility and performance review placeholder"]
  },
  {
    id: "phase-10-apis-state",
    order: 10,
    slug: "apis-data-state-management",
    title: "APIs, Data & State Management",
    shortDescription:
      "Connect interfaces to real data with async flows, loading states, errors, and app-level state.",
    goal: "Handle external data and manage application state.",
    estimatedTime: "12-14 hours",
    difficulty: "Intermediate",
    type: "project",
    status: "Locked",
    topics: ["fetch", "Async/await", "Promises", "Loading states", "Error states", "Context API", "Redux awareness"],
    lessons: [],
    labs: ["Connect a React app to a public API", "Display dynamic data", "Handle loading and error states"],
    projects: [
      {
        id: "project-data-driven-dashboard",
        title: "Data-Driven Product Dashboard",
        brief:
          "Build a responsive React dashboard that consumes a public API and handles empty, loading, error, and success states.",
        deliverables: ["GitHub repo URL", "Deployed URL", "State diagram", "Reflection on error handling"],
        rubric: ["API integration", "State clarity", "Resilient UI states", "Responsive layout", "Accessible controls"],
        submissionRequired: true
      }
    ],
    deliverables: ["Data-driven component", "State-managed app"],
    evaluationCriteria: ["Learner can integrate APIs and manage complex state gracefully."],
    unlockRequirements: ["Complete accessibility and performance phase"],
    requiredTools: ["React", "TypeScript", "Public API", "Vite"],
    mentorCheckpoints: ["Data state review placeholder"]
  },
  {
    id: "phase-11-motion",
    order: 11,
    slug: "motion-animation-micro-interactions",
    title: "Motion, Animation & Micro-Interactions",
    shortDescription:
      "Add purposeful motion with CSS transitions, keyframes, and Framer Motion while respecting accessibility.",
    goal: "Add polish and delight through thoughtful motion.",
    estimatedTime: "8-10 hours",
    difficulty: "Intermediate",
    type: "systems",
    status: "Locked",
    topics: ["CSS transitions", "Keyframes", "Framer Motion", "Timing functions", "Physics-based animation", "Reduced motion"],
    lessons: [],
    labs: ["Animate button interactions", "Build a modal with entrance and exit animations", "Create a card hover micro-interaction"],
    projects: [
      {
        id: "project-animated-component-set",
        title: "Accessible Motion Component Set",
        brief:
          "Create a small component set with hover, modal, and state-change motion that includes reduced-motion behavior.",
        deliverables: ["GitHub repo URL", "Storybook URL", "Motion rationale"],
        rubric: ["Purposeful motion", "Reduced motion support", "Performance", "Interaction quality"],
        submissionRequired: true
      }
    ],
    deliverables: ["Animated component library"],
    evaluationCriteria: ["Learner can implement accessible, performant animations and justify their use."],
    unlockRequirements: ["Complete APIs and state phase"],
    requiredTools: ["CSS", "Framer Motion", "React", "Storybook"],
    mentorCheckpoints: ["Motion critique placeholder"]
  },
  {
    id: "phase-12-deployment-ci",
    order: 12,
    slug: "deployment-continuous-integration",
    title: "Deployment & Continuous Integration",
    shortDescription:
      "Ship Vite + React work to production with environment variables, builds, Vercel, and basic GitHub Actions.",
    goal: "Teach how to ship code to production environments.",
    estimatedTime: "6-8 hours",
    difficulty: "Intermediate",
    type: "project",
    status: "Locked",
    topics: ["Build tools", "Vite build process", "Environment variables", "Vercel", "Netlify awareness", "GitHub Actions"],
    lessons: [],
    labs: ["Deploy a small React app", "Configure environment variables for an API key", "Set up basic CI with GitHub Actions"],
    projects: [
      {
        id: "project-deployment-pipeline",
        title: "Production Deployment Pipeline",
        brief:
          "Deploy a React project to Vercel and add a basic GitHub Actions workflow for install, type check, and build.",
        deliverables: ["GitHub repo URL", "Deployed URL", "CI configuration file", "Build status screenshot note"],
        rubric: ["Successful deployment", "Working CI", "Environment variable understanding", "Clear README"],
        submissionRequired: true
      }
    ],
    deliverables: ["Deployed project URL", "CI configuration file"],
    evaluationCriteria: ["Learner can deploy and update a web project and understand the build pipeline."],
    unlockRequirements: ["Complete motion phase"],
    requiredTools: ["Vercel", "GitHub Actions", "Vite", "npm"],
    mentorCheckpoints: ["Deployment review placeholder"]
  },
  {
    id: "phase-13-capstone",
    order: 13,
    slug: "capstone-project",
    title: "Capstone Project",
    shortDescription:
      "Implement a provided Figma/product brief as a responsive, accessible React app with Storybook and a case study.",
    goal: "Synthesize all skills into a portfolio-worthy, real-world project.",
    estimatedTime: "30-40 hours",
    difficulty: "Advanced",
    type: "capstone",
    status: "Locked",
    topics: ["Figma to code", "Design system integration", "API integration", "Dynamic data", "Documentation", "Case study writing"],
    lessons: [],
    labs: ["Plan implementation from the provided brief", "Build with version control and code reviews", "Write a detailed case study"],
    projects: [
      {
        id: "project-capstone-product-brief",
        title: "Provided Product Brief Capstone",
        brief:
          "Build the assigned product experience from a provided Figma brief as a production-ready Vite + React + TypeScript app with tokens, Storybook, API-backed states, accessibility, deployment, and a portfolio case study.",
        deliverables: ["GitHub repo URL", "Live deployment", "Storybook URL", "Responsive screenshots", "Portfolio case study draft"],
        rubric: ["Figma fidelity", "Responsive quality", "Accessibility", "Component architecture", "TypeScript quality", "API/state handling", "Performance", "Storybook docs", "Case study clarity"],
        submissionRequired: true
      }
    ],
    deliverables: ["Fully responsive accessible React app", "Storybook documentation", "Live deployment", "Portfolio case study"],
    evaluationCriteria: ["Learner demonstrates independence, quality, and attention to detail across design and engineering."],
    unlockRequirements: ["Complete all core project gates and supporting projects"],
    requiredTools: ["Figma", "Vite", "React", "TypeScript", "Storybook", "Vercel", "GitHub"],
    mentorCheckpoints: ["Capstone kickoff, midpoint review, final review placeholders"]
  },
  {
    id: "phase-14-career-prep",
    order: 14,
    slug: "portfolio-career-preparation",
    title: "Portfolio & Career Preparation",
    shortDescription:
      "Package the body of work into a hireable portfolio, resume, GitHub profile, and interview story.",
    goal: "Prepare learners for job applications and interviews.",
    estimatedTime: "8-12 hours",
    difficulty: "Advanced",
    type: "career",
    status: "Locked",
    topics: ["Portfolio curation", "Case studies", "Mock technical interviews", "Design interviews", "Resume", "LinkedIn", "GitHub profile"],
    lessons: [],
    labs: ["Review and refine portfolio projects", "Conduct mock interviews", "Write case studies summarizing challenges and solutions"],
    projects: [
      {
        id: "project-hireability-portfolio",
        title: "Hireability Portfolio Package",
        brief:
          "Assemble one capstone and at least three polished supporting projects into a portfolio with case studies, GitHub repos, deployed URLs, and interview-ready explanations.",
        deliverables: ["Portfolio site URL", "Resume", "LinkedIn profile", "GitHub profile", "Interview feedback notes"],
        rubric: ["Capstone quality", "Three supporting projects", "Case study clarity", "Technical credibility", "Presentation readiness"],
        submissionRequired: true
      }
    ],
    deliverables: ["Portfolio site", "Updated resume and LinkedIn profile", "Interview feedback"],
    evaluationCriteria: ["Learner is ready to apply for junior design engineer roles with confidence."],
    unlockRequirements: ["Approved capstone package"],
    requiredTools: ["Portfolio builder or custom site", "GitHub", "LinkedIn", "Resume document"],
    mentorCheckpoints: ["Portfolio review and mock interview placeholders"]
  }
];

export function getPhaseBySlug(phaseSlug: string) {
  return curriculumPhases.find((phase) => phase.slug === phaseSlug);
}

export function getLessonByPhaseSlug(phaseSlug: string, lessonSlug: string) {
  const phase = getPhaseBySlug(phaseSlug);
  if (!phase) {
    return null;
  }

  const foundLesson = phase.lessons.find((item) => item.slug === lessonSlug);
  return foundLesson ? { phase, lesson: foundLesson } : null;
}

export function getNextLessonInPhase(phaseSlug: string, lessonSlug: string) {
  const phase = getPhaseBySlug(phaseSlug);
  if (!phase) {
    return null;
  }

  const currentIndex = phase.lessons.findIndex((item) => item.slug === lessonSlug);
  if (currentIndex === -1 || currentIndex === phase.lessons.length - 1) {
    return null;
  }

  return phase.lessons[currentIndex + 1];
}

export function getPhaseLessonIds(phase: CurriculumPhase) {
  return phase.lessons.map((item) => item.id);
}

export function getPhaseExerciseIds(phase: CurriculumPhase) {
  return phase.lessons.flatMap((item) => (item.exercise ? [item.exercise.id] : []));
}

export function getPhaseActivityIds(phase: CurriculumPhase) {
  return phase.lessons.flatMap((item) => (item.activity ? [item.activity.id] : []));
}

export function getPhaseProjectIds(phase: CurriculumPhase) {
  return phase.projects.map((item) => item.id);
}
