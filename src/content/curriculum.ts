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

const reactFundamentalsLessons: Lesson[] = [
  {
    id: "lesson-react-why",
    slug: "why-react-exists",
    title: "Why React Exists",
    duration: "30 min",
    objectives: [
      "Explain why manual DOM updates become hard to maintain.",
      "Connect React concepts to Figma components, variants, and states.",
      "Define component, prop, state, JSX, render, and event handler."
    ],
    sections: [
      {
        title: "From manual updates to state-driven UI",
        paragraphs: [
          "Plain JavaScript taught you how to reach into the page and change one thing at a time. That is useful, but it gets messy when many parts of an interface depend on the same state.",
          "React flips the workflow. You describe what the UI should look like for the current state, and React handles updating the screen when that state changes.",
          "For designers, React is easiest to understand as a code version of component thinking: reusable pieces, configurable inputs, named states, and predictable rendering."
        ]
      },
      {
        title: "React through a designer lens",
        paragraphs: [
          "A component is a reusable interface piece. Props are inputs that configure it, like component properties in Figma. State is internal memory, like whether a save button is currently saved. JSX is the HTML-like syntax React components return.",
          "Render means React turning component descriptions into visible UI. An event handler is a function that responds to user action, such as a click."
        ],
        bulletPoints: [
          "Component: reusable interface piece.",
          "Prop: configurable input from the outside.",
          "State: internal value that can change over time.",
          "JSX: HTML-like syntax inside JavaScript.",
          "Render: React showing UI from component data.",
          "Event handler: function that responds to interaction."
        ]
      }
    ],
    activity: {
      type: "concept-check",
      id: "activity-react-concept-check",
      title: "Match React terms to interface ideas",
      prompt: "Match each React term to the design-engineering concept it represents.",
      prompts: [
        {
          id: "react-component-term",
          prompt: "Which term means a reusable interface piece?",
          options: ["Component", "State", "Render", "Event handler"],
          answer: "Component",
          explanation: "A component is the React equivalent of a reusable UI pattern."
        },
        {
          id: "react-prop-term",
          prompt: "Which term means a configurable input passed into a component?",
          options: ["JSX", "Prop", "State", "Key"],
          answer: "Prop",
          explanation: "Props configure a component from the outside, like title or featured."
        },
        {
          id: "react-state-term",
          prompt: "Which term means internal UI memory that can change?",
          options: ["State", "Render", "Export", "className"],
          answer: "State",
          explanation: "State stores changing UI conditions, such as saved or open."
        },
        {
          id: "react-jsx-term",
          prompt: "Which term means HTML-like syntax inside JavaScript?",
          options: ["JSX", "Repository", "Remote", "Branch"],
          answer: "JSX",
          explanation: "JSX lets React components describe markup-like UI in JavaScript."
        },
        {
          id: "react-render-term",
          prompt: "Which term describes React turning component data into visible UI?",
          options: ["Commit", "Render", "Prop", "Import"],
          answer: "Render",
          explanation: "Rendering is React calculating and showing the UI."
        },
        {
          id: "react-handler-term",
          prompt: "Which term means a function that responds to a click or other user action?",
          options: ["Event handler", "Component", "JSX", "Array"],
          answer: "Event handler",
          explanation: "Event handlers connect user actions to UI behavior."
        }
      ],
      hints: ["Translate each term back to Figma: reusable piece, configurable option, visible state, and interaction."],
      xp: 80
    },
    nextLessonSlug: "your-first-component"
  },
  {
    id: "lesson-react-first-component",
    slug: "your-first-component",
    title: "Your First Component",
    duration: "40 min",
    objectives: [
      "Create a function component named `ProjectCard`.",
      "Return JSX from a component.",
      "Use `className` instead of HTML `class`."
    ],
    sections: [
      {
        title: "A component is a named interface piece",
        paragraphs: [
          "React components are JavaScript functions that return UI. The name matters: component names start with a capital letter so React can distinguish them from regular HTML tags.",
          "JSX looks like HTML, but it has a few React rules. The first rule designers usually hit is `className` instead of `class`."
        ]
      }
    ],
    activity: {
      type: "react-component",
      id: "activity-react-project-card",
      title: "Build a ProjectCard component",
      prompt: "Extract the static card into a reusable `ProjectCard` function component that returns JSX.",
      starterCode: `export default function App() {\n  return (\n    <main className="board">\n      <article className="project-card">\n        <p className="status">Featured</p>\n        <h2>Motion system redesign</h2>\n        <p>Translate a visual exploration into production-ready interaction patterns.</p>\n        <a className="cta" href="#">Open case study</a>\n      </article>\n    </main>\n  );\n}`,
      fakeFileName: "App.jsx",
      previewComponentName: "App",
      instructions: [
        "Create a `ProjectCard` function component.",
        "Move the card article into the component.",
        "Render `<ProjectCard />` from `App`."
      ],
      solutionCode: `function ProjectCard() {\n  return (\n    <article className="project-card">\n      <p className="status">Featured</p>\n      <h2>Motion system redesign</h2>\n      <p>Translate a visual exploration into production-ready interaction patterns.</p>\n      <a className="cta" href="#">Open case study</a>\n    </article>\n  );\n}\n\nexport default function App() {\n  return (\n    <main className="board">\n      <ProjectCard />\n    </main>\n  );\n}`,
      previewDescription: "Expected UI: one project card rendered by a `ProjectCard` component inside `App`.",
      hints: [
        "Create `function ProjectCard()` above `App`.",
        "Move the article JSX into `ProjectCard`.",
        "Render it with `<ProjectCard />` inside the board."
      ],
      checks: [
        { id: "component-name", label: "ProjectCard component exists", pattern: "function\\s+ProjectCard\\s*\\(", message: "Create a function named `ProjectCard`." },
        { id: "returns-jsx", label: "Component returns JSX", pattern: "function\\s+ProjectCard[\\s\\S]*return\\s*\\(", message: "`ProjectCard` should return JSX." },
        { id: "uses-classname", label: "Uses className", pattern: "className=", message: "React JSX uses `className`, not `class`." },
        { id: "renders-component", label: "App renders ProjectCard", pattern: "<ProjectCard\\s*/>", message: "Render the component inside `App`." },
        { id: "card-content", label: "Card content remains visible", pattern: "Motion system redesign[\\s\\S]*Open case study", message: "Keep the title, description, and CTA in the component." }
      ],
      renderedChecks: [
        { type: "text-includes", id: "renders-title", label: "Preview renders the title", text: "Motion system redesign", message: "The rendered preview should include the project title." },
        { type: "text-includes", id: "renders-cta", label: "Preview renders the CTA", text: "Open case study", message: "The rendered preview should include the CTA text." },
        { type: "selector-count", id: "renders-one-card", label: "Preview renders one card", selector: ".project-card", count: 1, message: "The preview should render one `.project-card`." }
      ],
      xp: 95
    },
    nextLessonSlug: "props-component-variants-in-code"
  },
  {
    id: "lesson-react-props",
    slug: "props-component-variants-in-code",
    title: "Props: Component Variants in Code",
    duration: "45 min",
    objectives: [
      "Use props as configurable component inputs.",
      "Map props to design variants and content slots.",
      "Render several cards without duplicating hard-coded markup."
    ],
    sections: [
      {
        title: "Props are component properties",
        paragraphs: [
          "In Figma, a component instance can have different text, variants, and boolean properties. In React, props do that job.",
          "A prop lets the parent decide what a component should show. The component stays reusable because its structure is shared while the content and variant values change."
        ]
      }
    ],
    activity: {
      type: "react-component",
      id: "activity-react-props-card",
      title: "Turn ProjectCard into a props-driven component",
      prompt: "Make `ProjectCard` accept title, description, status, featured, and ctaLabel props, then render at least three different cards.",
      starterCode: `function ProjectCard() {\n  return (\n    <article className="project-card">\n      <p className="status">Featured</p>\n      <h2>Motion system redesign</h2>\n      <p>Translate a visual exploration into production-ready interaction patterns.</p>\n      <a className="cta" href="#">Open case study</a>\n    </article>\n  );\n}\n\nexport default function App() {\n  return <ProjectCard />;\n}`,
      fakeFileName: "App.jsx",
      previewComponentName: "App",
      instructions: [
        "Accept title, description, status, featured, and ctaLabel props.",
        "Render at least three `ProjectCard` instances.",
        "Use `featured` to change the card class."
      ],
      solutionCode: `function ProjectCard({ title, description, status, featured, ctaLabel }) {\n  return (\n    <article className={featured ? "project-card featured" : "project-card"}>\n      <p className="status">{status}</p>\n      <h2>{title}</h2>\n      <p>{description}</p>\n      <a className="cta" href="#">{ctaLabel}</a>\n    </article>\n  );\n}\n\nexport default function App() {\n  return (\n    <main className="board">\n      <ProjectCard title="Motion system redesign" description="Interaction patterns for product teams." status="Featured" featured ctaLabel="Open case study" />\n      <ProjectCard title="Onboarding flow" description="A clearer first-run experience." status="Ready" featured={false} ctaLabel="View project" />\n      <ProjectCard title="Token cleanup" description="Spacing and color decisions made reusable." status="Draft" featured={false} ctaLabel="Review notes" />\n    </main>\n  );\n}`,
      previewDescription: "Expected UI: three project cards created from the same component with different props.",
      hints: [
        "Destructure props inside the function parameter.",
        "Use `{title}` and `{description}` in JSX.",
        "Use a conditional className for `featured`."
      ],
      checks: [
        { id: "accepts-props", label: "ProjectCard accepts props", pattern: "function\\s+ProjectCard\\s*\\(\\s*\\{[^}]*title[^}]*description[^}]*status[^}]*featured[^}]*ctaLabel", message: "Destructure the required props in `ProjectCard`." },
        { id: "renders-three", label: "At least three cards render", pattern: "(<ProjectCard[\\s\\S]*){3,}", message: "Render at least three `ProjectCard` instances." },
        { id: "featured-class", label: "Featured changes className", pattern: "className=\\{[^}]*featured[\\s\\S]*\\?", message: "Use the `featured` prop to change the card className." },
        { id: "uses-prop-values", label: "JSX uses prop values", pattern: "\\{title\\}[\\s\\S]*\\{description\\}[\\s\\S]*\\{ctaLabel\\}", message: "Render title, description, and ctaLabel from props." }
      ],
      renderedChecks: [
        { type: "selector-count", id: "renders-three-cards", label: "Preview renders three cards", selector: ".project-card", count: 3, message: "The preview should render at least three cards." },
        { type: "selector-has-class", id: "renders-featured-class", label: "Featured card has visual class", selector: ".project-card", className: "featured", message: "At least one rendered card should include the `featured` class." },
        { type: "text-includes", id: "renders-variant-text", label: "Preview renders varied card text", text: "Token cleanup", message: "The preview should show text from a different card instance." }
      ],
      xp: 105
    },
    nextLessonSlug: "state-interactive-ui"
  },
  {
    id: "lesson-react-state",
    slug: "state-interactive-ui",
    title: "State: Interactive UI",
    duration: "45 min",
    objectives: [
      "Use `useState` for internal component memory.",
      "Explain the difference between props and state.",
      "Build a button whose text and visual state update after interaction."
    ],
    sections: [
      {
        title: "State is UI memory",
        paragraphs: [
          "Props are passed into a component from the outside. State belongs inside a component and can change when someone interacts with it.",
          "Instead of manually finding a button in the DOM and changing its text, React lets you update state. The button then renders the right label and class for that state."
        ]
      }
    ],
    activity: {
      type: "react-component",
      id: "activity-react-save-button",
      title: "Build an interactive SaveButton",
      prompt: "Create a `SaveButton` with `useState` that toggles between Save and Saved when clicked.",
      starterCode: `import { useState } from "react";\n\nfunction SaveButton() {\n  return (\n    <button className="save-button" type="button">\n      Save\n    </button>\n  );\n}\n\nexport default function App() {\n  return <SaveButton />;\n}`,
      fakeFileName: "App.jsx",
      previewComponentName: "App",
      instructions: [
        "Create saved state with `useState(false)`.",
        "Update state from an `onClick` handler.",
        "Change button text and class from state."
      ],
      solutionCode: `import { useState } from "react";\n\nfunction SaveButton() {\n  const [saved, setSaved] = useState(false);\n\n  return (\n    <button\n      className={saved ? "save-button is-saved" : "save-button"}\n      type="button"\n      aria-label={saved ? "Remove saved project" : "Save project"}\n      onClick={() => setSaved(!saved)}\n    >\n      {saved ? "Saved" : "Save"}\n    </button>\n  );\n}\n\nexport default function App() {\n  return <SaveButton />;\n}`,
      previewDescription: "Expected UI: a button that starts as Save, then toggles to Saved with a selected visual state.",
      hints: [
        "Create `[saved, setSaved]` with `useState(false)`.",
        "Use `onClick` to call `setSaved(!saved)`.",
        "Use a conditional className and conditional button text."
      ],
      checks: [
        { id: "imports-usestate", label: "Imports useState", pattern: "import\\s*\\{\\s*useState\\s*\\}\\s*from\\s*[\"']react[\"']", message: "Import `useState` from React." },
        { id: "uses-usestate", label: "Uses useState", pattern: "useState\\s*\\(\\s*false\\s*\\)", message: "Initialize saved state with `useState(false)`." },
        { id: "onclick", label: "Click updates state", pattern: "onClick=\\{[^}]*setSaved", message: "Use an `onClick` handler to update state." },
        { id: "conditional-class", label: "Class updates from state", pattern: "className=\\{[^}]*saved[\\s\\S]*\\?", message: "Use state to change the button className." },
        { id: "conditional-text", label: "Text changes correctly", pattern: "\\{\\s*saved\\s*\\?\\s*[\"']Saved[\"']\\s*:\\s*[\"']Save[\"']\\s*\\}", message: "Render Save/Saved based on state." },
        { id: "aria-label", label: "Accessible button label exists", pattern: "aria-label=", message: "Add an accessible label for the button state." }
      ],
      renderedChecks: [
        { type: "text-includes", id: "renders-save", label: "Preview starts with Save", text: "Save", message: "The rendered button should start with Save." },
        { type: "click-text-change", id: "click-changes-text", label: "Click changes button text", selector: "button", beforeText: "Save", afterText: "Saved", message: "Clicking the button should change its text from Save to Saved." },
        { type: "selector-has-class", id: "click-changes-class", label: "Selected state class appears", selector: "button", className: "is-saved", message: "After the preview click test, the button should include `is-saved`." }
      ],
      xp: 110
    },
    nextLessonSlug: "rendering-lists"
  },
  {
    id: "lesson-react-rendering-lists",
    slug: "rendering-lists",
    title: "Rendering Lists",
    duration: "45 min",
    objectives: [
      "Render repeated UI from an array of data.",
      "Use `.map()` to create component instances.",
      "Add keys to repeated React elements."
    ],
    sections: [
      {
        title: "Repeated UI should come from data",
        paragraphs: [
          "Product cards, nav items, dashboards, settings rows, and tables all repeat structure. In React, repeated UI usually starts as an array and becomes visible through `.map()`.",
          "Keys help React track which rendered item is which. They are like stable names for repeated layers."
        ]
      }
    ],
    activity: {
      type: "react-component",
      id: "activity-react-render-list",
      title: "Render project cards from data",
      prompt: "Create an array of project objects and use `.map()` to render at least three `ProjectCard` components with keys.",
      starterCode: `function ProjectCard({ title, description, status }) {\n  return (\n    <article className="project-card">\n      <p className="status">{status}</p>\n      <h2>{title}</h2>\n      <p>{description}</p>\n    </article>\n  );\n}\n\nexport default function App() {\n  return (\n    <main className="board">\n      <ProjectCard title="Motion system redesign" description="Interaction patterns." status="Featured" />\n    </main>\n  );\n}`,
      fakeFileName: "App.jsx",
      previewComponentName: "App",
      instructions: [
        "Create a `projects` array with at least three objects.",
        "Use `.map()` to render `ProjectCard` for each object.",
        "Pass a stable `key` to each rendered card."
      ],
      solutionCode: `const projects = [\n  { id: "motion", title: "Motion system redesign", description: "Interaction patterns.", status: "Featured" },\n  { id: "onboarding", title: "Onboarding flow", description: "A clearer first-run path.", status: "Ready" },\n  { id: "tokens", title: "Token cleanup", description: "Reusable spacing and color decisions.", status: "Draft" }\n];\n\nfunction ProjectCard({ title, description, status }) {\n  return (\n    <article className="project-card">\n      <p className="status">{status}</p>\n      <h2>{title}</h2>\n      <p>{description}</p>\n    </article>\n  );\n}\n\nexport default function App() {\n  return (\n    <main className="board">\n      {projects.map((project) => (\n        <ProjectCard key={project.id} title={project.title} description={project.description} status={project.status} />\n      ))}\n    </main>\n  );\n}`,
      previewDescription: "Expected UI: at least three project cards rendered from a `projects` array.",
      hints: [
        "Create a `projects` array above the component.",
        "Use `projects.map((project) => ... )` inside JSX.",
        "Pass a stable `key`, such as `project.id`."
      ],
      checks: [
        { id: "array-exists", label: "Project data array exists", pattern: "const\\s+projects\\s*=\\s*\\[[\\s\\S]*\\]", message: "Create a `projects` array." },
        { id: "uses-map", label: "Uses map", pattern: "projects\\.map\\s*\\(", message: "Use `.map()` to render repeated UI." },
        { id: "has-key", label: "Each rendered item has a key", pattern: "key=\\{\\s*project\\.id\\s*\\}", message: "Pass a stable key to each rendered component." },
        { id: "reuses-card", label: "ProjectCard is reused", pattern: "<ProjectCard[\\s\\S]*key=\\{\\s*project\\.id\\s*\\}", message: "Render `ProjectCard` inside the map." },
        { id: "three-items", label: "At least three items exist", pattern: "(id\\s*:\\s*[\"'][^\"']+[\"'][\\s\\S]*){3,}", message: "Include at least three project objects." }
      ],
      renderedChecks: [
        { type: "selector-count", id: "renders-three-projects", label: "Preview renders at least three cards", selector: ".project-card", count: 3, message: "The preview should render at least three cards from data." },
        { type: "text-includes", id: "renders-onboarding", label: "Preview renders array item text", text: "Onboarding flow", message: "The preview should include text from one of the mapped data objects." },
        { type: "text-includes", id: "renders-tokens", label: "Preview renders another array item", text: "Token cleanup", message: "The preview should include another mapped project." }
      ],
      xp: 105
    }
  }
];

const typeScriptLessons: Lesson[] = [
  {
    id: "lesson-ts-why",
    slug: "why-typescript-matters-for-design-engineers",
    title: "Why TypeScript Matters for Design Engineers",
    duration: "30 min",
    objectives: [
      "Explain TypeScript as JavaScript with type information.",
      "Describe props as component contracts.",
      "Map types to Figma component properties and variants."
    ],
    sections: [
      {
        title: "Types make component intent visible",
        paragraphs: [
          "JavaScript lets almost anything through until the code runs. That flexibility is useful early, but reusable interface systems need clearer agreements.",
          "TypeScript adds type information so mistakes show up earlier. For design engineers, types are not academic. They document what a component accepts, which variants are allowed, and which data shape a UI expects."
        ]
      },
      {
        title: "Component APIs as contracts",
        paragraphs: [
          "A typed prop is like a named component property in Figma. It tells other people how to use the component without guessing.",
          "Union types are especially useful for variants because they limit a prop to known values like `primary`, `secondary`, or `ghost` instead of any random string."
        ],
        bulletPoints: [
          "Type: a label for the kind of value allowed.",
          "Interface: a named shape for an object or props contract.",
          "Optional prop: a prop that can be omitted.",
          "Union type: a fixed set of allowed values.",
          "Type error: feedback before the bug reaches the UI."
        ]
      }
    ],
    activity: {
      type: "concept-check",
      id: "activity-ts-concept-check",
      title: "Match TypeScript terms to component API ideas",
      prompt: "Match each TypeScript idea to the design-system concept it supports.",
      prompts: [
        { id: "ts-type", prompt: "Which term names the kind of value allowed?", options: ["type", "render", "remote", "commit"], answer: "type", explanation: "A type describes the shape or kind of value expected." },
        { id: "ts-interface", prompt: "Which term can describe the shape of props?", options: ["interface", "branch", "effect", "selector"], answer: "interface", explanation: "An interface is a named object shape, often used for props." },
        { id: "ts-contract", prompt: "What is a prop contract?", options: ["The typed agreement for using a component", "A CSS reset", "A GitHub branch", "A browser cache"], answer: "The typed agreement for using a component", explanation: "Typed props tell consumers what the component accepts." },
        { id: "ts-union", prompt: "Which type limits a variant to known values?", options: ["union type", "array", "boolean", "DOM node"], answer: "union type", explanation: "A union type can limit variants to values like `primary | secondary | ghost`." },
        { id: "ts-optional", prompt: "Which prop can be left out?", options: ["optional prop", "required prop", "type error", "render prop"], answer: "optional prop", explanation: "Optional props use `?` and do not have to be passed." },
        { id: "ts-error", prompt: "What does a type error do?", options: ["Flags a mismatch before runtime", "Publishes the app", "Creates a component", "Changes CSS"], answer: "Flags a mismatch before runtime", explanation: "Type errors help catch mistakes before a user sees them." }
      ],
      hints: ["Think of TypeScript as component-property documentation that can also complain when the usage is wrong."],
      xp: 85
    },
    nextLessonSlug: "typing-component-props"
  },
  {
    id: "lesson-ts-props",
    slug: "typing-component-props",
    title: "Typing Component Props",
    duration: "45 min",
    objectives: [
      "Define a props type or interface.",
      "Type string, boolean, and optional props.",
      "Keep the component rendering after adding types."
    ],
    sections: [
      {
        title: "Typed props reduce guessing",
        paragraphs: [
          "A reusable component becomes safer when its inputs are explicit. TypeScript lets you name the props a component expects and the value each prop accepts.",
          "For beginners, `type` and `interface` can both describe props. The important habit is naming the component contract clearly."
        ]
      }
    ],
    activity: {
      type: "ts-react-component",
      id: "activity-ts-project-card-props",
      title: "Type ProjectCard props",
      prompt: "Convert a plain `ProjectCard` to TSX by adding a `ProjectCardProps` type or interface.",
      starterCode: `function ProjectCard({ title, description, ctaLabel, featured }) {\n  return (\n    <article className={featured ? \"project-card featured\" : \"project-card\"}>\n      <h2>{title}</h2>\n      <p>{description}</p>\n      <a className=\"cta\" href=\"#\">{ctaLabel}</a>\n    </article>\n  );\n}\n\nexport default function App() {\n  return <ProjectCard title=\"Motion system redesign\" description=\"Typed props make reusable UI safer.\" ctaLabel=\"Open case study\" featured />;\n}`,
      fakeFileName: "App.tsx",
      previewComponentName: "App",
      instructions: ["Define `ProjectCardProps`.", "Type title, description, and ctaLabel as strings.", "Make `featured` optional with `?`."],
      solutionCode: `type ProjectCardProps = {\n  title: string;\n  description: string;\n  ctaLabel: string;\n  featured?: boolean;\n};\n\nfunction ProjectCard({ title, description, ctaLabel, featured = false }: ProjectCardProps) {\n  return (\n    <article className={featured ? \"project-card featured\" : \"project-card\"}>\n      <h2>{title}</h2>\n      <p>{description}</p>\n      <a className=\"cta\" href=\"#\">{ctaLabel}</a>\n    </article>\n  );\n}\n\nexport default function App() {\n  return <ProjectCard title=\"Motion system redesign\" description=\"Typed props make reusable UI safer.\" ctaLabel=\"Open case study\" featured />;\n}`,
      previewDescription: "Expected UI: one typed ProjectCard with a title, description, and CTA.",
      hints: ["Use `type ProjectCardProps = { ... }` or `interface ProjectCardProps { ... }`.", "Optional props use a question mark, like `featured?: boolean`."],
      checks: [
        { id: "props-type", label: "ProjectCardProps exists", pattern: "(type|interface)\\s+ProjectCardProps", message: "Define a `ProjectCardProps` type or interface." },
        { id: "string-props", label: "String props are typed", pattern: "title\\??:\\s*string[\\s\\S]*description\\??:\\s*string[\\s\\S]*ctaLabel\\??:\\s*string", message: "Type title, description, and ctaLabel as strings." },
        { id: "optional-featured", label: "featured is optional", pattern: "featured\\?:\\s*boolean", message: "Make `featured` optional with `?`." },
        { id: "component-typed", label: "Component uses props type", pattern: "ProjectCard\\s*\\([^)]*:\\s*ProjectCardProps", message: "Annotate the component props with `ProjectCardProps`." }
      ],
      renderedChecks: [
        { type: "text-includes", id: "renders-ts-title", label: "Preview renders title", text: "Motion system redesign", message: "The preview should render the card title." },
        { type: "text-includes", id: "renders-ts-cta", label: "Preview renders CTA", text: "Open case study", message: "The preview should render the CTA." },
        { type: "selector-count", id: "renders-card", label: "Preview renders card", selector: ".project-card", count: 1, message: "The preview should render one card." }
      ],
      xp: 105
    },
    nextLessonSlug: "variants-with-union-types"
  },
  {
    id: "lesson-ts-union-variants",
    slug: "variants-with-union-types",
    title: "Variants with Union Types",
    duration: "45 min",
    objectives: [
      "Use union types for component variants.",
      "Limit allowed variant names.",
      "Render multiple typed button variants."
    ],
    sections: [
      {
        title: "Variants should not be arbitrary strings",
        paragraphs: [
          "A Figma variant usually has a known set of options. Code should do the same. If a button only supports primary, secondary, and ghost, TypeScript can make that explicit.",
          "Union types turn design-system vocabulary into a small allowed list."
        ]
      }
    ],
    activity: {
      type: "ts-react-component",
      id: "activity-ts-button-variants",
      title: "Create a typed Button variant",
      prompt: "Build a typed `Button` component with a `variant` prop limited to primary, secondary, and ghost.",
      starterCode: `function Button({ variant, children }) {\n  return <button className={\"button \" + variant}>{children}</button>;\n}\n\nexport default function App() {\n  return (\n    <main className=\"board\">\n      <Button variant=\"primary\">Publish</Button>\n    </main>\n  );\n}`,
      fakeFileName: "App.tsx",
      previewComponentName: "App",
      instructions: ["Define `ButtonVariant` as a union type.", "Type the `variant` prop.", "Render primary, secondary, and ghost buttons."],
      solutionCode: `type ButtonVariant = \"primary\" | \"secondary\" | \"ghost\";\n\ntype ButtonProps = {\n  variant: ButtonVariant;\n  children: string;\n};\n\nfunction Button({ variant, children }: ButtonProps) {\n  return <button className={\"button \" + variant}>{children}</button>;\n}\n\nexport default function App() {\n  return (\n    <main className=\"board\">\n      <Button variant=\"primary\">Publish</Button>\n      <Button variant=\"secondary\">Preview</Button>\n      <Button variant=\"ghost\">Cancel</Button>\n    </main>\n  );\n}`,
      previewDescription: "Expected UI: three buttons with primary, secondary, and ghost variants.",
      hints: ["A union type looks like `type ButtonVariant = \"primary\" | \"secondary\" | \"ghost\"`.", "Use the variant value in className."],
      checks: [
        { id: "variant-union", label: "ButtonVariant union exists", pattern: "type\\s+ButtonVariant\\s*=\\s*[\"']primary[\"']\\s*\\|\\s*[\"']secondary[\"']\\s*\\|\\s*[\"']ghost[\"']", message: "Define `ButtonVariant` with the three allowed values." },
        { id: "variant-prop-typed", label: "variant prop is typed", pattern: "variant\\s*:\\s*ButtonVariant", message: "Type the `variant` prop as `ButtonVariant`." },
        { id: "three-buttons", label: "Three variants are rendered", pattern: "variant=[\"']primary[\"'][\\s\\S]*variant=[\"']secondary[\"'][\\s\\S]*variant=[\"']ghost[\"']", message: "Render all three allowed variants." },
        { id: "class-uses-variant", label: "className changes from variant", pattern: "className=\\{[^}]*variant", message: "Use variant to change the className." }
      ],
      renderedChecks: [
        { type: "selector-count", id: "renders-three-buttons", label: "Preview renders three buttons", selector: "button", count: 3, message: "The preview should render three buttons." },
        { type: "text-includes", id: "renders-publish", label: "Preview renders primary text", text: "Publish", message: "The preview should include Publish." },
        { type: "text-includes", id: "renders-cancel", label: "Preview renders ghost text", text: "Cancel", message: "The preview should include Cancel." }
      ],
      xp: 110
    },
    nextLessonSlug: "typed-state-and-events"
  },
  {
    id: "lesson-ts-state-events",
    slug: "typed-state-and-events",
    title: "Typed State and Events",
    duration: "45 min",
    objectives: [
      "Use typed state for UI modes.",
      "Update state through an event handler.",
      "Render labels and classes from typed state."
    ],
    sections: [
      {
        title: "Typed state keeps UI modes honest",
        paragraphs: [
          "Boolean state is useful for simple on/off interactions. For modes like preview, edit, and saved, a union type is clearer because it lists every allowed mode.",
          "Typed state helps prevent a component from drifting into an impossible UI state."
        ]
      }
    ],
    activity: {
      type: "ts-react-component",
      id: "activity-ts-mode-toggle",
      title: "Build a typed ModeToggle",
      prompt: "Use a union type with `useState` to switch a button from Preview to Saved.",
      starterCode: `import { useState } from \"react\";\n\nfunction ModeToggle() {\n  const [mode, setMode] = useState(\"preview\");\n\n  return (\n    <button className=\"save-button\" type=\"button\">\n      Preview\n    </button>\n  );\n}\n\nexport default function App() {\n  return <ModeToggle />;\n}`,
      fakeFileName: "App.tsx",
      previewComponentName: "App",
      instructions: ["Define a `Mode` union type.", "Use `useState<Mode>(\"preview\")`.", "Clicking the button should set mode to saved."],
      solutionCode: `import { useState } from \"react\";\n\ntype Mode = \"preview\" | \"saved\";\n\nfunction ModeToggle() {\n  const [mode, setMode] = useState<Mode>(\"preview\");\n  const saved = mode === \"saved\";\n\n  return (\n    <button\n      className={saved ? \"save-button is-saved\" : \"save-button\"}\n      type=\"button\"\n      onClick={() => setMode(saved ? \"preview\" : \"saved\")}\n    >\n      {saved ? \"Saved\" : \"Preview\"}\n    </button>\n  );\n}\n\nexport default function App() {\n  return <ModeToggle />;\n}`,
      previewDescription: "Expected UI: a button that starts as Preview and changes to Saved when clicked.",
      hints: ["Use `type Mode = \"preview\" | \"saved\"`.", "Pass the type into `useState<Mode>()`.", "Use a click handler to change the mode."],
      checks: [
        { id: "mode-union", label: "Mode union exists", pattern: "type\\s+Mode\\s*=\\s*[\"']preview[\"']\\s*\\|\\s*[\"']saved[\"']", message: "Define a `Mode` union type." },
        { id: "typed-state", label: "useState is typed", pattern: "useState\\s*<\\s*Mode\\s*>\\s*\\(", message: "Use `useState<Mode>()`." },
        { id: "click-handler", label: "Click handler updates state", pattern: "onClick=\\{[^}]*setMode", message: "Use an event handler to update mode." },
        { id: "conditional-ui", label: "UI depends on typed state", pattern: "(mode\\s*===[\\s\\S]*saved[\\s\\S]*\\?|saved\\s*\\?[\\s\\S]*Saved)", message: "Render labels/classes from the typed mode state." }
      ],
      renderedChecks: [
        { type: "text-includes", id: "starts-preview", label: "Preview starts in preview mode", text: "Preview", message: "The button should start as Preview." },
        { type: "click-text-change", id: "click-to-saved", label: "Click changes mode", selector: "button", beforeText: "Preview", afterText: "Saved", message: "Clicking should change Preview to Saved." },
        { type: "selector-has-class", id: "saved-class", label: "Saved class appears", selector: "button", className: "is-saved", message: "Saved mode should apply `is-saved`." }
      ],
      xp: 110
    },
    nextLessonSlug: "typed-data-lists"
  },
  {
    id: "lesson-ts-data-lists",
    slug: "typed-data-lists",
    title: "Typed Data Lists",
    duration: "45 min",
    objectives: [
      "Type arrays of objects.",
      "Reuse a data type across cards.",
      "Render typed project data with `.map()`."
    ],
    sections: [
      {
        title: "Typed data makes product UI steadier",
        paragraphs: [
          "Dashboards, cards, tables, and settings screens all depend on repeated data. TypeScript lets you define the expected shape once, then reuse it wherever that data renders.",
          "When the data shape is typed, missing titles, wrong statuses, and accidental field names are easier to catch."
        ]
      }
    ],
    activity: {
      type: "ts-react-component",
      id: "activity-ts-data-list",
      title: "Render a typed project list",
      prompt: "Define a `Project` type, create a `Project[]` array, and render `ProjectCard` with `.map()`.",
      starterCode: `function ProjectCard({ title, description, status }) {\n  return (\n    <article className=\"project-card\">\n      <p className=\"status\">{status}</p>\n      <h2>{title}</h2>\n      <p>{description}</p>\n    </article>\n  );\n}\n\nconst projects = [\n  { id: \"motion\", title: \"Motion system redesign\", description: \"Interaction patterns.\", status: \"Featured\" }\n];\n\nexport default function App() {\n  return <ProjectCard title={projects[0].title} description={projects[0].description} status={projects[0].status} />;\n}`,
      fakeFileName: "App.tsx",
      previewComponentName: "App",
      instructions: ["Define a `Project` type.", "Type the data as `Project[]`.", "Render at least three cards with `.map()` and a key."],
      solutionCode: `type Project = {\n  id: string;\n  title: string;\n  description: string;\n  status: string;\n};\n\nfunction ProjectCard({ title, description, status }: Project) {\n  return (\n    <article className=\"project-card\">\n      <p className=\"status\">{status}</p>\n      <h2>{title}</h2>\n      <p>{description}</p>\n    </article>\n  );\n}\n\nconst projects: Project[] = [\n  { id: \"motion\", title: \"Motion system redesign\", description: \"Interaction patterns.\", status: \"Featured\" },\n  { id: \"onboarding\", title: \"Onboarding flow\", description: \"A clearer first-run path.\", status: \"Ready\" },\n  { id: \"tokens\", title: \"Token cleanup\", description: \"Reusable spacing and color decisions.\", status: \"Draft\" }\n];\n\nexport default function App() {\n  return (\n    <main className=\"board\">\n      {projects.map((project) => (\n        <ProjectCard key={project.id} {...project} />\n      ))}\n    </main>\n  );\n}`,
      previewDescription: "Expected UI: at least three project cards rendered from a typed `Project[]` array.",
      hints: ["A typed array looks like `const projects: Project[] = [...]`.", "Use `projects.map((project) => ...)`.", "Use `key={project.id}`."],
      checks: [
        { id: "project-type", label: "Project type exists", pattern: "(type|interface)\\s+Project", message: "Define a `Project` type or interface." },
        { id: "typed-array", label: "Array is typed", pattern: "const\\s+projects\\s*:\\s*Project\\[\\]", message: "Type the array as `Project[]`." },
        { id: "map-used", label: "map is used", pattern: "projects\\.map\\s*\\(", message: "Render the list with `.map()`." },
        { id: "key-used", label: "Stable key is used", pattern: "key=\\{\\s*project\\.id\\s*\\}", message: "Use `project.id` as the key." },
        { id: "card-reused", label: "ProjectCard is reused", pattern: "<ProjectCard[\\s\\S]*key=\\{\\s*project\\.id\\s*\\}", message: "Render `ProjectCard` inside the map." }
      ],
      renderedChecks: [
        { type: "selector-count", id: "renders-three-ts-cards", label: "Preview renders three cards", selector: ".project-card", count: 3, message: "The preview should render at least three cards." },
        { type: "text-includes", id: "renders-ts-onboarding", label: "Preview renders typed data", text: "Onboarding flow", message: "The preview should include mapped typed data." },
        { type: "text-includes", id: "renders-ts-token", label: "Preview renders another item", text: "Token cleanup", message: "The preview should include another typed project." }
      ],
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
      "Move from static markup and manual DOM updates into reusable React components, props, state, and rendered lists.",
    goal: "Teach designers how to move from static markup and manual DOM manipulation into component-based interfaces.",
    estimatedTime: "10-12 hours",
    difficulty: "Intermediate",
    type: "project",
    status: "Locked",
    topics: [
      "Why React exists",
      "UI as a function of state",
      "Components",
      "JSX",
      "Props as variants",
      "useState",
      "Event handlers",
      "Rendering lists with map",
      "Keys"
    ],
    lessons: reactFundamentalsLessons,
    labs: [
      "React concept check",
      "Build a ProjectCard component",
      "Make ProjectCard props-driven",
      "Build an interactive SaveButton with state",
      "Render ProjectCards from an array"
    ],
    projects: [
      {
        id: "project-reusable-project-card-system",
        title: "Build a Reusable Project Card System",
        brief:
          "Build a small React interface made from reusable components. Create a `ProjectCard` component, pass data through props, render multiple cards from an array, and add one interactive saved or favorited state.",
        deliverables: [
          "React component files",
          "At least one reusable card component",
          "Props-driven variants",
          "A rendered list from data",
          "One stateful interaction",
          "GitHub repo URL",
          "Short reflection: what repeated UI became a component, which parts became props, which part needed state, how this compares to Figma components and variants, and what still feels confusing"
        ],
        rubric: [
          "Component is reusable",
          "Props are used correctly",
          "State is used for interaction",
          "Repeated UI comes from data",
          "Code is readable",
          "Naming is clear",
          "Reflection is completed"
        ],
        submissionRequired: true
      }
    ],
    deliverables: [
      "Completed React concept check",
      "ProjectCard component",
      "Props-driven card variants",
      "Interactive SaveButton",
      "Rendered list of project cards",
      "Reusable Project Card System submission"
    ],
    evaluationCriteria: [
      "Learner can explain components, props, state, JSX, render, and event handlers in design terms.",
      "Learner can build a reusable React component.",
      "Learner can use props for variants and state for interaction.",
      "Learner can render repeated UI from data."
    ],
    unlockRequirements: ["Complete Phase 5: Git, Command Line & Developer Workflow"],
    requiredTools: ["Vite", "React", "npm", "Browser DevTools"],
    mentorCheckpoints: ["React component review placeholder", "Reusable card system critique placeholder"]
  },
  {
    id: "phase-07-typescript",
    order: 7,
    slug: "typescript-for-design-engineers",
    title: "TypeScript for Design Engineers",
    shortDescription:
      "Add type safety to React component APIs so props, variants, state, and data become clearer and harder to misuse.",
    goal: "Help learners add type safety to React components so component APIs become clearer, reusable, and harder to misuse.",
    estimatedTime: "10-12 hours",
    difficulty: "Intermediate",
    type: "project",
    status: "Locked",
    topics: [
      "What TypeScript is",
      "Types as documentation",
      "Props as contracts",
      "type vs interface basics",
      "Optional props",
      "Union types for variants",
      "Typed state",
      "Typed arrays of data"
    ],
    lessons: typeScriptLessons,
    labs: [
      "TypeScript concept check",
      "Type ProjectCard props",
      "Create typed Button variants",
      "Build typed state and events",
      "Render a typed data list"
    ],
    projects: [
      {
        id: "project-typed-component-set",
        title: "Type a Reusable Component Set",
        brief:
          "Upgrade a small React component set to TypeScript. Create typed props, typed variants, typed state, and a typed data list.",
        deliverables: [
          "Typed ProjectCard",
          "Typed Button",
          "Typed SaveButton or ModeToggle",
          "Typed project data array",
          "Rendered component examples",
          "GitHub repo URL",
          "Short reflection: which props became types, which UI variants became union types, where TypeScript prevented mistakes, how TypeScript compares to component properties in Figma, and what still feels confusing"
        ],
        rubric: [
          "Props are typed",
          "Variants use union types",
          "State is typed or safely inferred",
          "Data arrays are typed",
          "Components still render correctly",
          "Code is readable",
          "Naming is clear",
          "Reflection is completed"
        ],
        submissionRequired: true
      }
    ],
    deliverables: [
      "Completed TypeScript concept check",
      "Typed ProjectCard props",
      "Typed Button variants",
      "Typed state interaction",
      "Typed rendered data list",
      "Reusable typed component set submission"
    ],
    evaluationCriteria: [
      "Learner can explain TypeScript as safer component API documentation.",
      "Learner can type React props, optional props, variants, state, and data lists.",
      "Learner can render TSX labs successfully while using TypeScript patterns."
    ],
    unlockRequirements: ["Complete Phase 6: React Fundamentals"],
    requiredTools: ["TypeScript", "Vite", "React"],
    mentorCheckpoints: ["TypeScript API review placeholder", "Typed component set critique placeholder"]
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
