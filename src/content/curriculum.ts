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

const designSystemsLessons: Lesson[] = [
  {
    id: "lesson-ds-code-system",
    slug: "what-a-design-system-becomes-in-code",
    title: "What a Design System Becomes in Code",
    duration: "35 min",
    objectives: [
      "Explain how Figma system decisions become production code decisions.",
      "Distinguish one-off UI from reusable system UI.",
      "Identify tokens, component APIs, variants, states, documentation, and design debt."
    ],
    sections: [
      {
        title: "A Figma library is the beginning, not the system",
        paragraphs: [
          "A design system becomes real when product teams can use it repeatedly without re-deciding color, spacing, states, naming, and behavior every time.",
          "In code, system work shows up as token names, typed component APIs, constrained variants, explicit states, and documentation that helps designers and engineers make the same decision twice."
        ]
      },
      {
        title: "The design engineer bridge",
        paragraphs: [
          "Design engineers keep the Figma library and production UI from drifting apart. They translate visual intent into reusable implementation choices and make gaps visible before they turn into design debt.",
          "The goal is not to make every component complex. The goal is to make important decisions reusable, named, and hard to misuse."
        ],
        bulletPoints: [
          "Tokens preserve visual decisions.",
          "Component APIs expose intentional controls.",
          "Variants constrain allowed options.",
          "States make behavior visible.",
          "Docs explain when and how to use the system."
        ]
      }
    ],
    activity: {
      type: "concept-check",
      id: "activity-ds-concept-check",
      title: "Match design-system terms to code decisions",
      prompt: "Match each design-system term to the production decision it represents.",
      prompts: [
        {
          id: "ds-token",
          prompt: "Which term names a reusable visual value like color, spacing, type, or radius?",
          options: ["token", "pull request", "route", "effect"],
          answer: "token",
          explanation: "A token gives a visual decision a reusable name."
        },
        {
          id: "ds-semantic-token",
          prompt: "Which term names design intent instead of a raw value?",
          options: ["semantic token", "array index", "commit hash", "selector"],
          answer: "semantic token",
          explanation: "A semantic token describes purpose, like action background or surface border."
        },
        {
          id: "ds-api",
          prompt: "Which term describes the props and controls a component exposes?",
          options: ["component API", "terminal", "stylesheet reset", "repository"],
          answer: "component API",
          explanation: "A component API is how other people configure and use the component."
        },
        {
          id: "ds-variant",
          prompt: "Which term means an intentional component option like primary, secondary, or ghost?",
          options: ["variant", "runtime", "deployment", "hydration"],
          answer: "variant",
          explanation: "Variants are named alternatives that should be constrained and purposeful."
        },
        {
          id: "ds-state",
          prompt: "Which term describes conditions like disabled, error, loading, selected, or empty?",
          options: ["state", "branch", "package", "remote"],
          answer: "state",
          explanation: "States show how the component behaves beyond its default appearance."
        },
        {
          id: "ds-guideline",
          prompt: "Which term tells teams when and how to use a component?",
          options: ["usage guideline", "map key", "boolean", "localStorage"],
          answer: "usage guideline",
          explanation: "Usage guidelines make the system teachable and reviewable."
        },
        {
          id: "ds-debt",
          prompt: "Which term describes drift, inconsistent one-offs, and undocumented exceptions?",
          options: ["design debt", "prop", "JSX", "theme"],
          answer: "design debt",
          explanation: "Design debt builds when teams keep solving system decisions differently."
        }
      ],
      hints: ["Translate each term back to Figma variables, component properties, variants, and documentation."],
      xp: 90
    },
    nextLessonSlug: "design-tokens-naming-visual-decisions"
  },
  {
    id: "lesson-ds-token-naming",
    slug: "design-tokens-naming-visual-decisions",
    title: "Design Tokens: Naming Visual Decisions",
    duration: "50 min",
    objectives: [
      "Define raw and semantic token names.",
      "Create color, spacing, radius, and typography tokens.",
      "Render UI from token values instead of hard-coded one-off styles."
    ],
    sections: [
      {
        title: "Tokens name decisions",
        paragraphs: [
          "A token is a named design decision. The value matters, but the name matters more because the name tells the team why that value exists.",
          "`blue500` only describes a color. `color-action-primary-bg` describes how the color should be used. That difference is what keeps a system consistent when the brand or theme changes."
        ],
        bulletPoints: [
          "Bad: `blue500`; better raw: `color-blue-500`; semantic: `color-action-primary-bg`.",
          "Bad: `spacing-12`; semantic: `space-card-padding`.",
          "Raw tokens describe values. Semantic tokens describe jobs."
        ]
      }
    ],
    activity: {
      type: "ts-react-component",
      id: "activity-ds-token-object",
      title: "Create a token object",
      prompt: "Define raw tokens and semantic aliases, then render a card using the token values.",
      starterCode: `const tokens = {\n  color: {},\n  space: {},\n  radius: {},\n  type: {},\n  semantic: {}\n};\n\nexport default function App() {\n  return <article>Token preview</article>;\n}`,
      fakeFileName: "App.tsx",
      previewComponentName: "App",
      instructions: [
        "Define color, spacing, radius, and typography tokens.",
        "Add semantic token names for component intent.",
        "Use token values in the rendered preview."
      ],
      solutionCode: `const tokens = {\n  color: {\n    blue500: \"#2563eb\",\n    gray900: \"#111827\",\n    white: \"#ffffff\"\n  },\n  space: {\n    cardPadding: \"24px\",\n    stackGap: \"12px\"\n  },\n  radius: {\n    card: \"18px\"\n  },\n  type: {\n    headingSize: \"24px\",\n    bodySize: \"15px\"\n  },\n  semantic: {\n    colorActionPrimaryBg: \"#2563eb\",\n    colorSurfaceDefault: \"#ffffff\",\n    colorTextStrong: \"#111827\",\n    spaceCardPadding: \"24px\"\n  }\n};\n\nexport default function App() {\n  return (\n    <article\n      className=\"token-card\"\n      style={{\n        background: tokens.semantic.colorSurfaceDefault,\n        color: tokens.semantic.colorTextStrong,\n        padding: tokens.semantic.spaceCardPadding,\n        borderRadius: tokens.radius.card,\n        display: \"grid\",\n        gap: tokens.space.stackGap\n      }}\n    >\n      <p style={{ color: tokens.semantic.colorActionPrimaryBg, margin: 0 }}>Semantic token preview</p>\n      <h2 style={{ fontSize: tokens.type.headingSize, margin: 0 }}>System card</h2>\n      <p style={{ fontSize: tokens.type.bodySize, margin: 0 }}>This card is styled from named token decisions.</p>\n    </article>\n  );\n}`,
      previewDescription: "Expected UI: a token-driven card that uses semantic token values for color and spacing.",
      hints: [
        "Use a single `tokens` object with nested groups.",
        "Semantic names should describe intent, like `colorActionPrimaryBg`.",
        "Apply tokens through inline styles for this MVP."
      ],
      checks: [
        { id: "token-object", label: "Token object exists", pattern: "const\\s+tokens\\s*=", message: "Create a `tokens` object." },
        { id: "color-tokens", label: "Color tokens exist", pattern: "color\\s*:\\s*\\{[\\s\\S]*#[0-9a-fA-F]{6}", message: "Add color tokens with real color values." },
        { id: "spacing-tokens", label: "Spacing tokens exist", pattern: "space\\s*:\\s*\\{[\\s\\S]*(px|rem)", message: "Add spacing tokens." },
        { id: "radius-tokens", label: "Radius tokens exist", pattern: "radius\\s*:\\s*\\{[\\s\\S]*(px|rem)", message: "Add radius tokens." },
        { id: "type-tokens", label: "Typography tokens exist", pattern: "type\\s*:\\s*\\{[\\s\\S]*(font|Size|heading|body)", message: "Add typography tokens." },
        { id: "semantic-tokens", label: "Semantic token names exist", pattern: "semantic\\s*:\\s*\\{[\\s\\S]*(colorActionPrimaryBg|colorSurfaceDefault|spaceCardPadding)", message: "Add semantic token aliases that describe intent." },
        { id: "uses-tokens", label: "Preview uses token values", pattern: "style=\\{\\{[\\s\\S]*tokens\\.", message: "Use token values in the rendered styles." }
      ],
      renderedChecks: [
        { type: "text-includes", id: "renders-token-preview", label: "Preview renders token card", text: "System card", message: "The preview should render the token-driven card." },
        { type: "selector-count", id: "renders-token-card", label: "Card element renders", selector: ".token-card", count: 1, message: "Render one `.token-card` element." }
      ],
      xp: 120
    },
    nextLessonSlug: "semantic-tokens-and-themes"
  },
  {
    id: "lesson-ds-themes",
    slug: "semantic-tokens-and-themes",
    title: "Semantic Tokens and Themes",
    duration: "55 min",
    objectives: [
      "Use semantic tokens instead of hard-coded component values.",
      "Create light and dark theme token objects.",
      "Toggle a component between themes without rewriting the component."
    ],
    sections: [
      {
        title: "Themes swap tokens, not components",
        paragraphs: [
          "A strong theme system protects design intent. The component asks for `surface`, `text`, `border`, and `accent`; the theme decides what values those names mean.",
          "That is why `color.surface.default` is more useful than `color.gray.900`. The semantic name survives when the theme changes."
        ]
      }
    ],
    activity: {
      type: "ts-react-component",
      id: "activity-ds-themed-panel",
      title: "Build a themed panel",
      prompt: "Define light and dark semantic theme tokens, then toggle the same panel between them.",
      starterCode: `import { useState } from \"react\";\n\nconst lightTheme = {};\nconst darkTheme = {};\n\nexport default function App() {\n  return <section>Themed panel</section>;\n}`,
      fakeFileName: "App.tsx",
      previewComponentName: "App",
      instructions: [
        "Define `lightTheme` and `darkTheme` objects.",
        "Use semantic names: surface, text, border, accent.",
        "Use state to toggle between themes."
      ],
      solutionCode: `import { useState } from \"react\";\n\ntype ThemeTokens = {\n  surface: string;\n  text: string;\n  border: string;\n  accent: string;\n};\n\nconst lightTheme: ThemeTokens = {\n  surface: \"#ffffff\",\n  text: \"#111827\",\n  border: \"#d1d5db\",\n  accent: \"#2563eb\"\n};\n\nconst darkTheme: ThemeTokens = {\n  surface: \"#111827\",\n  text: \"#f9fafb\",\n  border: \"#374151\",\n  accent: \"#93c5fd\"\n};\n\nexport default function App() {\n  const [themeName, setThemeName] = useState<\"light\" | \"dark\">(\"light\");\n  const theme = themeName === \"light\" ? lightTheme : darkTheme;\n\n  return (\n    <section className=\"theme-panel\" style={{ background: theme.surface, color: theme.text, border: "1px solid " + theme.border, padding: 24, borderRadius: 18 }}>\n      <p style={{ color: theme.accent, marginTop: 0 }}>{themeName === \"light\" ? \"Light theme\" : \"Dark theme\"}</p>\n      <h2>Semantic theme panel</h2>\n      <button type=\"button\" onClick={() => setThemeName(themeName === \"light\" ? \"dark\" : \"light\")}>Switch to {themeName === \"light\" ? \"dark\" : \"light\"}</button>\n    </section>\n  );\n}`,
      previewDescription: "Expected UI: a panel that starts in light theme and changes to dark theme when the button is clicked.",
      hints: [
        "Both themes should share the same token names.",
        "Use `useState` for `themeName`.",
        "The component should read from `theme.surface`, `theme.text`, `theme.border`, and `theme.accent`."
      ],
      checks: [
        { id: "light-theme", label: "Light theme exists", pattern: "const\\s+lightTheme", message: "Define a `lightTheme` object." },
        { id: "dark-theme", label: "Dark theme exists", pattern: "const\\s+darkTheme", message: "Define a `darkTheme` object." },
        { id: "semantic-names", label: "Semantic token names exist", pattern: "surface[\\s\\S]*text[\\s\\S]*border[\\s\\S]*accent", message: "Use semantic token names like surface, text, border, and accent." },
        { id: "theme-state", label: "Theme uses state", pattern: "useState\\s*<[^>]*light[\\s\\S]*dark[^>]*>\\s*\\(", message: "Use typed state to switch themes." },
        { id: "theme-toggle", label: "Toggle changes theme", pattern: "onClick=\\{[^}]*setThemeName", message: "Use a button click to change the theme." }
      ],
      renderedChecks: [
        { type: "text-includes", id: "starts-light", label: "Starts in light theme", text: "Light theme", message: "The preview should start in light mode." },
        { type: "click-text-change", id: "toggles-dark", label: "Toggle changes rendered theme", selector: "button", beforeText: "Switch to dark", afterText: "Switch to light", message: "Clicking the toggle should switch the rendered theme." }
      ],
      xp: 125
    },
    nextLessonSlug: "component-apis-props-as-design-controls"
  },
  {
    id: "lesson-ds-component-api",
    slug: "component-apis-props-as-design-controls",
    title: "Component APIs: Props as Design Controls",
    duration: "55 min",
    objectives: [
      "Design a typed component API from intentional controls.",
      "Constrain variants and sizes with union types.",
      "Render Button examples with variants, sizes, and disabled state."
    ],
    sections: [
      {
        title: "Props are coded component properties",
        paragraphs: [
          "A component API is the set of controls you expose to other people. In Figma that might be variant, size, icon, or disabled. In React, those controls become props.",
          "Good APIs make the right thing easy. They use clear allowed values, avoid vague names, and do not expose random styling knobs that break consistency."
        ]
      }
    ],
    activity: {
      type: "ts-react-component",
      id: "activity-ds-button-api",
      title: "Build a typed Button API",
      prompt: "Create a Button system component with constrained variant, size, disabled, and children props.",
      starterCode: `type ButtonVariant = string;\ntype ButtonSize = string;\n\nfunction Button({ children }) {\n  return <button>{children}</button>;\n}\n\nexport default function App() {\n  return <Button>Publish</Button>;\n}`,
      fakeFileName: "App.tsx",
      previewComponentName: "App",
      instructions: [
        "Define variant and size union types.",
        "Type the Button props.",
        "Render primary, secondary, ghost, sm, md, lg, and disabled examples."
      ],
      solutionCode: `type ButtonVariant = \"primary\" | \"secondary\" | \"ghost\";\ntype ButtonSize = \"sm\" | \"md\" | \"lg\";\n\ntype ButtonProps = {\n  variant: ButtonVariant;\n  size: ButtonSize;\n  disabled?: boolean;\n  children: string;\n};\n\nfunction Button({ variant, size, disabled = false, children }: ButtonProps) {\n  const variantStyles = {\n    primary: { background: \"#111827\", color: \"#ffffff\", border: \"1px solid #111827\" },\n    secondary: { background: \"#ffffff\", color: \"#111827\", border: \"1px solid #d1d5db\" },\n    ghost: { background: \"transparent\", color: \"#111827\", border: \"1px solid transparent\" }\n  };\n  const sizeStyles = {\n    sm: { padding: \"8px 10px\", fontSize: \"13px\" },\n    md: { padding: \"10px 14px\", fontSize: \"15px\" },\n    lg: { padding: \"14px 18px\", fontSize: \"17px\" }\n  };\n\n  return <button className={"button button-" + variant + " button-" + size} disabled={disabled} style={{ ...variantStyles[variant], ...sizeStyles[size], opacity: disabled ? 0.45 : 1 }}>{children}</button>;\n}\n\nexport default function App() {\n  return (\n    <main className=\"board\">\n      <Button variant=\"primary\" size=\"md\">Primary</Button>\n      <Button variant=\"secondary\" size=\"sm\">Secondary small</Button>\n      <Button variant=\"ghost\" size=\"lg\">Ghost large</Button>\n      <Button variant=\"primary\" size=\"lg\" disabled>Disabled</Button>\n    </main>\n  );\n}`,
      previewDescription: "Expected UI: several Button examples showing variants, sizes, and disabled state.",
      hints: [
        "Union types should list the allowed values.",
        "Map variant and size values to styles.",
        "Disabled should be a boolean prop."
      ],
      checks: [
        { id: "button-api-variant-union", label: "Variant union exists", pattern: "type\\s+ButtonVariant\\s*=\\s*[\"']primary[\"']\\s*\\|\\s*[\"']secondary[\"']\\s*\\|\\s*[\"']ghost[\"']", message: "Define `ButtonVariant` with primary, secondary, and ghost." },
        { id: "size-union", label: "Size union exists", pattern: "type\\s+ButtonSize\\s*=\\s*[\"']sm[\"']\\s*\\|\\s*[\"']md[\"']\\s*\\|\\s*[\"']lg[\"']", message: "Define `ButtonSize` with sm, md, and lg." },
        { id: "props-typed", label: "Button props are typed", pattern: "type\\s+ButtonProps[\\s\\S]*variant\\s*:\\s*ButtonVariant[\\s\\S]*size\\s*:\\s*ButtonSize[\\s\\S]*disabled\\?", message: "Type variant, size, disabled, and children props." },
        { id: "renders-variants", label: "Variants render", pattern: "variant=[\"']primary[\"'][\\s\\S]*variant=[\"']secondary[\"'][\\s\\S]*variant=[\"']ghost[\"']", message: "Render primary, secondary, and ghost examples." },
        { id: "renders-sizes", label: "Sizes render", pattern: "size=[\"']sm[\"'][\\s\\S]*size=[\"']lg[\"']|size=[\"']lg[\"'][\\s\\S]*size=[\"']sm[\"']", message: "Render at least sm and lg examples." },
        { id: "button-disabled-state", label: "Disabled renders", pattern: "disabled", message: "Render a disabled Button example." },
        { id: "style-changes", label: "Props change visuals", pattern: "(variantStyles|sizeStyles|button-\\$\\{variant\\}|className=\\{[^}]*variant)", message: "Use variant or size props to change the visual style." }
      ],
      renderedChecks: [
        { type: "selector-count", id: "renders-buttons", label: "Preview renders multiple buttons", selector: "button", count: 4, message: "The preview should render at least four buttons." },
        { type: "text-includes", id: "renders-disabled-text", label: "Disabled example renders", text: "Disabled", message: "The disabled example should be visible." }
      ],
      xp: 130
    },
    nextLessonSlug: "states-designing-beyond-the-default"
  },
  {
    id: "lesson-ds-states",
    slug: "states-designing-beyond-the-default",
    title: "States: Designing Beyond the Default",
    duration: "55 min",
    objectives: [
      "Make non-default component states explicit.",
      "Type TextField props for error, disabled, helper text, and required state.",
      "Render accessible field examples."
    ],
    sections: [
      {
        title: "A component is incomplete if only the default state exists",
        paragraphs: [
          "States are often lost in handoff because the happy path gets all the attention. Production UI needs default, focus, active, disabled, loading, error, empty, and selected states where they apply.",
          "Design engineers make states explicit in code so product teams do not invent one-off behavior every time an edge case appears."
        ]
      }
    ],
    activity: {
      type: "ts-react-component",
      id: "activity-ds-textfield-states",
      title: "Build TextField states",
      prompt: "Create a typed TextField with default, helper, error, disabled, and required examples.",
      starterCode: `function TextField() {\n  return (\n    <label>\n      Project name\n      <input placeholder=\"Project name\" />\n    </label>\n  );\n}\n\nexport default function App() {\n  return <TextField />;\n}`,
      fakeFileName: "App.tsx",
      previewComponentName: "App",
      instructions: [
        "Type the TextField props.",
        "Associate label and input with `htmlFor` and `id`.",
        "Render at least three state examples."
      ],
      solutionCode: `type TextFieldProps = {\n  id: string;\n  label: string;\n  helperText?: string;\n  error?: string;\n  disabled?: boolean;\n  required?: boolean;\n};\n\nfunction TextField({ id, label, helperText, error, disabled = false, required = false }: TextFieldProps) {\n  const message = error ?? helperText;\n\n  return (\n    <label className=\"text-field\" htmlFor={id} style={{ display: \"grid\", gap: 6, opacity: disabled ? 0.5 : 1 }}>\n      <span>{label}{required ? \" *\" : \"\"}</span>\n      <input id={id} disabled={disabled} required={required} aria-invalid={Boolean(error)} aria-describedby={message ? id + "-message" : undefined} style={{ border: "1px solid " + (error ? "#dc2626" : "#d1d5db"), borderRadius: 12, padding: 12 }} />\n      {message ? <small id={id + "-message"} style={{ color: error ? \"#dc2626\" : \"#6b7280\" }}>{message}</small> : null}\n    </label>\n  );\n}\n\nexport default function App() {\n  return (\n    <main className=\"board\">\n      <TextField id=\"project-name\" label=\"Project name\" helperText=\"Use the same name as the case study.\" required />\n      <TextField id=\"repo-url\" label=\"Repository URL\" error=\"Enter a valid GitHub URL.\" />\n      <TextField id=\"archived\" label=\"Archived project\" helperText=\"Disabled fields explain why they cannot be edited.\" disabled />\n    </main>\n  );\n}`,
      previewDescription: "Expected UI: three TextField examples covering required/helper, error, and disabled states.",
      hints: [
        "Use `type TextFieldProps = { ... }`.",
        "The label can wrap the input and also include `htmlFor`.",
        "Render `error` before `helperText` when both exist."
      ],
      checks: [
        { id: "textfield-props-type", label: "Typed props exist", pattern: "type\\s+TextFieldProps[\\s\\S]*helperText\\?[\\s\\S]*error\\?[\\s\\S]*disabled\\?[\\s\\S]*required\\?", message: "Define typed TextField props for helper, error, disabled, and required states." },
        { id: "error-state", label: "Error state exists", pattern: "error[\\s\\S]*aria-invalid|aria-invalid[\\s\\S]*error", message: "Use error to change the field state." },
        { id: "textfield-disabled-state", label: "Disabled state exists", pattern: "disabled=\\{disabled\\}|disabled\\?", message: "Wire the disabled prop to the input." },
        { id: "helper-text", label: "Helper text renders", pattern: "helperText[\\s\\S]*<small|<small[\\s\\S]*helperText", message: "Render helper text or an error message." },
        { id: "label-input", label: "Label is associated with input", pattern: "htmlFor=\\{id\\}[\\s\\S]*id=\\{id\\}|<label[\\s\\S]*<input", message: "Associate the label and input." },
        { id: "three-examples", label: "Three examples render", pattern: "(<TextField[\\s\\S]*){3,}", message: "Render at least three TextField examples." }
      ],
      renderedChecks: [
        { type: "selector-count", id: "renders-fields", label: "Preview renders three fields", selector: "input", count: 3, message: "The preview should render at least three inputs." },
        { type: "text-includes", id: "renders-error", label: "Error message renders", text: "Enter a valid GitHub URL.", message: "The error state should render a message." },
        { type: "text-includes", id: "renders-helper", label: "Helper text renders", text: "Use the same name", message: "The helper text should render." }
      ],
      xp: 130
    },
    nextLessonSlug: "documenting-components-like-a-design-engineer"
  },
  {
    id: "lesson-ds-documentation",
    slug: "documenting-components-like-a-design-engineer",
    title: "Documenting Components Like a Design Engineer",
    duration: "45 min",
    objectives: [
      "Document component purpose, props, variants, states, and usage guidelines.",
      "Write documentation useful to both designers and engineers.",
      "Explain how Storybook fits into real product teams."
    ],
    sections: [
      {
        title: "Documentation is part of the system",
        paragraphs: [
          "A component without documentation still relies on memory and Slack messages. Design-system documentation makes usage, constraints, states, and accessibility expectations visible.",
          "Storybook is often where coded components, examples, props, and usage notes live together. In this MVP, you will write the component entry structure before building full Storybook workflows later."
        ],
        bulletPoints: [
          "Engineers need props, allowed values, examples, and accessibility notes.",
          "Designers need purpose, variants, states, do and don't guidance, and Figma alignment notes.",
          "Product teams need to know when to use the component and when not to."
        ]
      }
    ],
    activity: {
      type: "component-docs",
      id: "activity-ds-component-docs",
      title: "Write a component documentation entry",
      prompt: "Create a practical documentation entry for a Button or TextField system component.",
      fields: [
        { id: "componentName", label: "Component name", placeholder: "Button", minLength: 3 },
        { id: "purpose", label: "Purpose", placeholder: "What job does this component do in the product?", minLength: 20 },
        { id: "props", label: "Props", placeholder: "List props, allowed values, and what each prop controls.", minLength: 30 },
        { id: "variants", label: "Variants", placeholder: "Describe variants such as primary, secondary, ghost, sm, md, lg.", minLength: 20 },
        { id: "states", label: "States", placeholder: "Document default, disabled, loading, error, selected, or other relevant states.", minLength: 20 },
        { id: "usage", label: "Usage guidelines", placeholder: "When should teams use this component? When should they choose something else?", minLength: 30 },
        { id: "dosDonts", label: "Do / don't notes", placeholder: "Write at least one do and one don't.", minLength: 20 },
        { id: "accessibility", label: "Accessibility notes", placeholder: "Labels, keyboard behavior, disabled semantics, error text, or focus expectations.", minLength: 25 }
      ],
      checklist: [
        "Component name and purpose are clear",
        "Props and allowed values are documented",
        "Variants and states are explicit",
        "Do / don't guidance is practical",
        "Accessibility notes are included"
      ],
      xp: 110
    }
  }
];

const accessibilityPerformanceLessons: Lesson[] = [
  {
    id: "lesson-a11y-quality",
    slug: "accessibility-is-interface-quality",
    title: "Accessibility Is Interface Quality",
    duration: "35 min",
    objectives: [
      "Explain accessibility as product quality, not an optional checklist.",
      "Identify common interface failures before they ship.",
      "Connect semantic structure, keyboard use, focus, contrast, names, and motion preferences to real users."
    ],
    sections: [
      {
        title: "Accessible UI is better UI",
        paragraphs: [
          "Accessibility is not a separate layer added after polish. It is part of whether the interface can be understood, operated, and trusted by real people on real devices.",
          "Designers and design engineers own this together because many accessibility failures begin as design omissions: missing states, color-only feedback, weak contrast, unclear labels, or interactions that only work with a mouse."
        ]
      },
      {
        title: "Common shipping failures",
        paragraphs: [
          "The practical goal is to notice problems early, fix them in the component, and document the quality bar so the same issue does not come back in every feature.",
          "In this phase, you will audit and fix interface details the way you would before opening a PR or handing work to a product engineering team."
        ],
        bulletPoints: [
          "Clickable divs instead of real controls.",
          "Inputs without labels or useful error text.",
          "Focus states that disappear.",
          "Status shown only by color.",
          "Motion with no reduced-motion fallback.",
          "Slow or shifting UI that feels broken."
        ]
      }
    ],
    activity: {
      type: "concept-check",
      id: "activity-a11y-quality-concept",
      title: "Match accessibility concepts to interface quality",
      prompt: "Match each accessibility concept to the shipping-quality issue it helps solve.",
      prompts: [
        {
          id: "a11y-semantic-html",
          prompt: "What gives content and regions meaningful structure?",
          options: ["semantic HTML", "box shadow", "deployment", "branch"],
          answer: "semantic HTML",
          explanation: "Semantic HTML helps browsers and assistive technology understand the interface."
        },
        {
          id: "a11y-keyboard",
          prompt: "What lets someone operate the interface without a mouse?",
          options: ["keyboard navigation", "image compression", "CSS grid", "commit message"],
          answer: "keyboard navigation",
          explanation: "Keyboard navigation is core interaction support, not an edge case."
        },
        {
          id: "a11y-focus",
          prompt: "What shows where keyboard attention is right now?",
          options: ["focus state", "semantic token", "route", "array map"],
          answer: "focus state",
          explanation: "Visible focus lets keyboard users track their position."
        },
        {
          id: "a11y-name",
          prompt: "What tells assistive technology what a control is called?",
          options: ["accessible name", "padding", "localStorage", "hover color"],
          answer: "accessible name",
          explanation: "Buttons, links, and inputs need names that describe their job."
        },
        {
          id: "a11y-contrast",
          prompt: "What protects readability for low-vision users and rough device conditions?",
          options: ["color contrast", "pull request", "z-index", "prop drilling"],
          answer: "color contrast",
          explanation: "Readable contrast is a design quality issue."
        },
        {
          id: "a11y-motion",
          prompt: "What respects people who are sensitive to movement?",
          options: ["reduced motion", "large bundle", "empty state", "hard refresh"],
          answer: "reduced motion",
          explanation: "Motion should clarify without forcing animation on everyone."
        },
        {
          id: "a11y-at",
          prompt: "What includes screen readers and other tools people use to operate software?",
          options: ["assistive technology", "storybook", "hydration", "style reset"],
          answer: "assistive technology",
          explanation: "Assistive technology helps people perceive and operate interfaces."
        }
      ],
      hints: ["Think in terms of users: keyboard users, screen reader users, low-vision users, and motion-sensitive users."],
      xp: 95
    },
    nextLessonSlug: "keyboard-navigation-and-focus"
  },
  {
    id: "lesson-a11y-keyboard-focus",
    slug: "keyboard-navigation-and-focus",
    title: "Keyboard Navigation and Focus",
    duration: "50 min",
    objectives: [
      "Replace fake interactive elements with real controls.",
      "Add visible focus styles.",
      "Make selected state understandable without relying on color alone."
    ],
    sections: [
      {
        title: "Interaction must survive without a mouse",
        paragraphs: [
          "Every action someone can click should also work from the keyboard. Real buttons and links already have keyboard behavior; clickable divs usually do not.",
          "Visible focus is the keyboard user's cursor. If focus disappears, the interface becomes guesswork."
        ],
        bulletPoints: [
          "Use buttons for actions.",
          "Use links for navigation.",
          "Preserve visual design while using real elements.",
          "Do not use color as the only selected-state cue."
        ]
      }
    ],
    exercise: {
      id: "exercise-a11y-action-panel",
      title: "Fix an inaccessible action panel",
      prompt:
        "Turn the fake clickable controls into real keyboard-friendly controls with visible focus and a selected state that does not rely on color alone.",
      runtime: "html-css-js",
      starterFiles: {
        html: `<section class="action-panel">\n  <h2>Publish settings</h2>\n  <div class="fake-button" onclick="document.body.dataset.saved='true'">Save changes</div>\n  <div class="fake-link" onclick="location.hash='preview'">Preview page</div>\n  <div class="choice selected">Public</div>\n</section>`,
        css: `.action-panel {\n  max-width: 460px;\n  margin: 40px auto;\n  padding: 24px;\n  border: 1px solid #d8dee8;\n  border-radius: 18px;\n  background: #fff;\n  display: grid;\n  gap: 14px;\n}\n.fake-button, .fake-link, .choice {\n  padding: 12px 14px;\n  border-radius: 12px;\n  cursor: pointer;\n}\n.fake-button { background: #111827; color: white; }\n.fake-link { color: #2563eb; }\n.choice { border: 1px solid #d8dee8; }\n.choice.selected { border-color: #2563eb; color: #2563eb; }`,
        js: `document.querySelector(".choice")?.addEventListener("click", (event) => {\n  event.currentTarget.classList.toggle("selected");\n});`
      },
      solutionFiles: {
        html: `<section class="action-panel">\n  <h2>Publish settings</h2>\n  <button class="action-button" type="button">Save changes</button>\n  <a class="preview-link" href="#preview">Preview page</a>\n  <button class="choice selected" type="button" aria-pressed="true"><span aria-hidden="true">✓</span> Public <span class="state-label">Selected</span></button>\n</section>`,
        css: `.action-panel {\n  max-width: 460px;\n  margin: 40px auto;\n  padding: 24px;\n  border: 1px solid #d8dee8;\n  border-radius: 18px;\n  background: #fff;\n  display: grid;\n  gap: 14px;\n}\n.action-button, .preview-link, .choice {\n  padding: 12px 14px;\n  border-radius: 12px;\n}\n.action-button { border: 0; background: #111827; color: white; }\n.preview-link { color: #2563eb; text-decoration: underline; }\n.choice { border: 1px solid #d8dee8; background: white; color: #111827; text-align: left; }\n.choice.selected { border-color: #2563eb; }\n.state-label { margin-left: 8px; font-size: 12px; font-weight: 700; }\n.action-button:focus-visible,\n.preview-link:focus-visible,\n.choice:focus-visible {\n  outline: 3px solid #f59e0b;\n  outline-offset: 3px;\n}`,
        js: `document.querySelector(".choice")?.addEventListener("click", (event) => {\n  const pressed = event.currentTarget.getAttribute("aria-pressed") === "true";\n  event.currentTarget.setAttribute("aria-pressed", String(!pressed));\n});`
      },
      hints: [
        "The save action should be a `button`, not a clickable `div`.",
        "Use `:focus-visible` for keyboard focus styling.",
        "A selected state can include text, a symbol, or `aria-pressed`, not only a blue border."
      ],
      checks: [
        {
          type: "selector-exists",
          selector: "button.action-button",
          message: "Use a real button for the save action."
        },
        {
          type: "selector-exists",
          selector: "a.preview-link[href]",
          message: "Use a real link for the preview navigation."
        },
        {
          type: "expression-returns",
          expression: "!document.querySelector('[onclick], .fake-button, .fake-link')",
          expected: true,
          message: "Remove clickable div patterns from the action panel."
        },
        {
          type: "expression-returns",
          expression: "Array.from(document.styleSheets).some((sheet) => Array.from(sheet.cssRules).some((rule) => rule.cssText.includes(':focus-visible') && rule.cssText.includes('outline')))",
          expected: true,
          message: "Add a visible focus style."
        },
        {
          type: "expression-returns",
          expression: "Boolean(document.querySelector('.choice[aria-pressed], .choice .state-label'))",
          expected: true,
          message: "Selected state needs a non-color cue."
        }
      ],
      xp: 120
    },
    nextLessonSlug: "forms-labels-errors-and-helper-text"
  },
  {
    id: "lesson-a11y-forms",
    slug: "forms-labels-errors-and-helper-text",
    title: "Forms, Labels, Errors, and Helper Text",
    duration: "50 min",
    objectives: [
      "Associate form labels with inputs.",
      "Connect helper and error text to the field.",
      "Make required and disabled states understandable."
    ],
    sections: [
      {
        title: "Placeholders are not labels",
        paragraphs: [
          "A placeholder disappears as soon as someone types. A label stays available, gives the field an accessible name, and helps people recover when they return to a form.",
          "Errors and helper text should be connected to the input so the field, message, and state are understood as one unit."
        ]
      }
    ],
    exercise: {
      id: "exercise-a11y-signup-form",
      title: "Fix form labels and error text",
      prompt:
        "Repair the sign-up form so its label, helper text, error text, required state, and disabled state are understandable.",
      runtime: "html-css-js",
      starterFiles: {
        html: `<form class="signup-form">\n  <h2>Join the launch list</h2>\n  <input class="email-field" placeholder="Email address">\n  <p class="error">Invalid email</p>\n  <button class="submit-button" disabled>Submit</button>\n</form>`,
        css: `.signup-form {\n  max-width: 460px;\n  margin: 40px auto;\n  padding: 24px;\n  border: 1px solid #dde3ec;\n  border-radius: 18px;\n  display: grid;\n  gap: 12px;\n}\n.email-field, .submit-button {\n  padding: 12px;\n  border-radius: 12px;\n  border: 1px solid #cbd5e1;\n}\n.error { color: #dc2626; }\n.submit-button { background: #111827; color: white; }`,
        js: `document.querySelector(".signup-form")?.addEventListener("submit", (event) => event.preventDefault());`
      },
      solutionFiles: {
        html: `<form class="signup-form">\n  <h2>Join the launch list</h2>\n  <label for="email">Email address <span aria-hidden="true">*</span></label>\n  <input id="email" class="email-field" type="email" required aria-describedby="email-help email-error" aria-invalid="true">\n  <p id="email-help" class="helper">Use the email where you want launch updates.</p>\n  <p id="email-error" class="error">Enter a valid email address.</p>\n  <button class="submit-button" type="submit" disabled aria-disabled="true">Submit unavailable until the email is valid</button>\n</form>`,
        css: `.signup-form {\n  max-width: 460px;\n  margin: 40px auto;\n  padding: 24px;\n  border: 1px solid #dde3ec;\n  border-radius: 18px;\n  display: grid;\n  gap: 12px;\n}\n.email-field, .submit-button {\n  padding: 12px;\n  border-radius: 12px;\n  border: 1px solid #cbd5e1;\n}\n.email-field:focus-visible {\n  outline: 3px solid #2563eb;\n  outline-offset: 2px;\n}\n.helper { color: #475569; }\n.error { color: #b91c1c; font-weight: 600; }\n.submit-button { background: #111827; color: white; }\n.submit-button:disabled { opacity: 0.55; cursor: not-allowed; }`,
        js: `document.querySelector(".signup-form")?.addEventListener("submit", (event) => event.preventDefault());`
      },
      hints: [
        "Add a persistent label with `for` that matches the input `id`.",
        "Use `aria-describedby` to connect helper and error text.",
        "Make the disabled button explain why it is unavailable."
      ],
      checks: [
        {
          type: "selector-exists",
          selector: "label[for='email']",
          message: "Add a label associated with the email input."
        },
        {
          type: "selector-exists",
          selector: "input#email[required]",
          message: "Give the input an id and make the required state explicit."
        },
        {
          type: "selector-exists",
          selector: "#email-help",
          message: "Add helper text for the field."
        },
        {
          type: "selector-exists",
          selector: "#email-error",
          message: "Add error text for the field."
        },
        {
          type: "selector-exists",
          selector: "input[aria-describedby~='email-help'][aria-describedby~='email-error']",
          message: "Connect helper and error text with aria-describedby."
        },
        {
          type: "selector-exists",
          selector: "button:disabled",
          message: "Render a clear disabled submit state."
        }
      ],
      xp: 120
    },
    nextLessonSlug: "color-contrast-and-motion-preferences"
  },
  {
    id: "lesson-a11y-contrast-motion",
    slug: "color-contrast-and-motion-preferences",
    title: "Color, Contrast, and Motion Preferences",
    duration: "50 min",
    objectives: [
      "Improve low-contrast UI text.",
      "Add a non-color status cue.",
      "Respect reduced-motion preferences."
    ],
    sections: [
      {
        title: "Visual polish has to stay readable",
        paragraphs: [
          "A status card can look refined and still fail if its text is hard to read, its state only appears as color, or its motion ignores user preferences.",
          "The goal is to preserve visual intent while making the state readable, understandable, and calmer for people who prefer reduced motion."
        ]
      }
    ],
    exercise: {
      id: "exercise-a11y-status-card",
      title: "Fix contrast and motion issues",
      prompt:
        "Improve the status card by strengthening contrast, adding a non-color status cue, and adding a reduced-motion fallback.",
      runtime: "html-css-js",
      starterFiles: {
        html: `<article class="status-card is-warning">\n  <p class="status">Delayed</p>\n  <h2>Asset export</h2>\n  <p class="description">Large images are still processing.</p>\n</article>`,
        css: `:root {\n  --status-text: #f3c8a2;\n  --surface: #fff7ed;\n}\n.status-card {\n  max-width: 460px;\n  margin: 40px auto;\n  padding: 24px;\n  border-radius: 18px;\n  background: var(--surface);\n  animation: pulse 1s infinite alternate;\n}\n.status { color: var(--status-text); font-weight: 700; }\n@keyframes pulse { from { transform: scale(1); } to { transform: scale(1.03); } }`,
        js: `document.querySelector(".status-card")?.setAttribute("data-state", "delayed");`
      },
      solutionFiles: {
        html: `<article class="status-card is-warning">\n  <p class="status"><span aria-hidden="true">!</span> Delayed <span class="status-label">Needs attention</span></p>\n  <h2>Asset export</h2>\n  <p class="description">Large images are still processing.</p>\n</article>`,
        css: `:root {\n  --status-text: #92400e;\n  --surface: #fff7ed;\n}\n.status-card {\n  max-width: 460px;\n  margin: 40px auto;\n  padding: 24px;\n  border-radius: 18px;\n  background: var(--surface);\n  animation: pulse 1s infinite alternate;\n}\n.status { color: var(--status-text); font-weight: 800; }\n.status-label { margin-left: 8px; color: #111827; font-size: 12px; }\n@keyframes pulse { from { transform: scale(1); } to { transform: scale(1.02); } }\n@media (prefers-reduced-motion: reduce) {\n  .status-card { animation: none; }\n}`,
        js: `document.querySelector(".status-card")?.setAttribute("data-state", "delayed");`
      },
      hints: [
        "Replace the weak status text color with a stronger token.",
        "Add status text or a small label so color is not the only cue.",
        "Use `@media (prefers-reduced-motion: reduce)` to disable animation."
      ],
      checks: [
        {
          type: "expression-returns",
          expression: "getComputedStyle(document.querySelector('.status')).color !== 'rgb(243, 200, 162)'",
          expected: true,
          message: "Improve the weak starter contrast token."
        },
        {
          type: "selector-exists",
          selector: ".status-label",
          message: "Add a non-color status cue."
        },
        {
          type: "text-equals",
          selector: ".status-label",
          text: "Needs attention",
          message: "Use clear status text, not only color."
        },
        {
          type: "expression-returns",
          expression: "Array.from(document.styleSheets).some((sheet) => Array.from(sheet.cssRules).some((rule) => rule.cssText.includes('prefers-reduced-motion')))",
          expected: true,
          message: "Add a reduced-motion preference fallback."
        },
        {
          type: "selector-exists",
          selector: ".status-card[data-state='delayed']",
          message: "Keep the rendered status card working."
        }
      ],
      xp: 120
    },
    nextLessonSlug: "performance-basics-for-interface-builders"
  },
  {
    id: "lesson-performance-basics",
    slug: "performance-basics-for-interface-builders",
    title: "Performance Basics for Interface Builders",
    duration: "40 min",
    objectives: [
      "Explain performance as part of user experience.",
      "Spot common interface performance risks.",
      "Connect loading states, image dimensions, layout shifts, and heavy motion to perceived quality."
    ],
    sections: [
      {
        title: "Slow UI feels broken",
        paragraphs: [
          "Performance is not only an engineering metric. When a button waits, an image jumps, or a page loads without feedback, people experience the interface as unreliable.",
          "Design engineers should be able to spot the obvious risks before a PR: oversized images, missing dimensions, no loading state, unnecessary repeated DOM, heavy animation, and layout shifts."
        ]
      }
    ],
    activity: {
      type: "concept-check",
      id: "activity-performance-mini-audit",
      title: "Identify performance risks",
      prompt: "Review the mock component issues and select the performance risk each one represents.",
      prompts: [
        {
          id: "perf-image-size",
          prompt: "A 4000px hero image is shown at 320px wide. What is the issue?",
          options: ["oversized image", "missing label", "bad branch name", "semantic token"],
          answer: "oversized image",
          explanation: "Images should be sized for the job they do."
        },
        {
          id: "perf-dimensions",
          prompt: "An image loads and pushes the card content down. What was probably missing?",
          options: ["image dimensions", "aria-live", "union type", "remote origin"],
          answer: "image dimensions",
          explanation: "Known dimensions help prevent layout shift."
        },
        {
          id: "perf-loading",
          prompt: "A panel is blank while data loads. What should the UI include?",
          options: ["loading state", "color-only feedback", "clickable div", "focus trap"],
          answer: "loading state",
          explanation: "Loading states make wait time understandable."
        },
        {
          id: "perf-repetition",
          prompt: "Twenty repeated cards are hand-coded one by one. What is the likely risk?",
          options: ["avoidable DOM/UI work", "good semantic structure", "reduced motion", "valid form state"],
          answer: "avoidable DOM/UI work",
          explanation: "Repeated UI should usually come from data and reusable components."
        },
        {
          id: "perf-animation",
          prompt: "A background animation runs constantly and distracts from reading. What is the issue?",
          options: ["heavy animation", "correct tab order", "helper text", "README"],
          answer: "heavy animation",
          explanation: "Animation should support the interface, not tax attention or devices."
        },
        {
          id: "perf-shift",
          prompt: "The CTA jumps after late-loading content appears. What quality problem is this?",
          options: ["avoidable layout shift", "good contrast", "prop contract", "keyboard support"],
          answer: "avoidable layout shift",
          explanation: "Stable layouts help people trust and operate the interface."
        }
      ],
      hints: ["Think about what makes an interface feel slow, jumpy, or unreliable to a user."],
      xp: 105
    },
    nextLessonSlug: "audit-and-fix-a-component"
  },
  {
    id: "lesson-audit-fix-component",
    slug: "audit-and-fix-a-component",
    title: "Audit and Fix a Component",
    duration: "45 min",
    objectives: [
      "Write a practical accessibility and performance audit note.",
      "Summarize before/after changes for a PR review.",
      "Track remaining concerns without blocking the learning workflow."
    ],
    sections: [
      {
        title: "Audit before you ship",
        paragraphs: [
          "A design engineer reviews more than whether the UI matches the mockup. Before shipping, they check if the component can be operated, understood, read, and trusted in rough conditions.",
          "A useful audit note is specific: what was broken, what changed, what remains risky, and what a reviewer should look at next."
        ],
        bulletPoints: [
          "Keyboard and focus behavior.",
          "Labels, names, helper text, and errors.",
          "Contrast, motion, and status cues.",
          "Loading behavior, layout stability, and asset size.",
          "Before/after summary for PR review."
        ]
      }
    ],
    activity: {
      type: "audit-note",
      id: "activity-a11y-performance-audit-note",
      title: "Write a shipping-quality audit note",
      prompt: "Document the issues, fixes, and remaining concerns for a component quality pass.",
      fields: [
        { id: "auditComponentName", label: "Component name", placeholder: "SignupForm, StatusCard, ButtonGroup...", minLength: 3 },
        { id: "accessibilityIssues", label: "Accessibility issues found", placeholder: "Missing label, unclear accessible name, color-only status...", minLength: 25 },
        { id: "keyboardFocusIssues", label: "Keyboard/focus issues found", placeholder: "Tab order, focus visibility, fake buttons, link/button mismatch...", minLength: 25 },
        { id: "formLabelIssues", label: "Form/label issues if relevant", placeholder: "Input label, helper text, error connection, required state...", minLength: 20 },
        { id: "motionContrastIssues", label: "Motion/contrast issues", placeholder: "Weak contrast, status only by color, motion preference gap...", minLength: 25 },
        { id: "performanceRisks", label: "Performance risks", placeholder: "Oversized image, layout shift, no loading state, heavy animation...", minLength: 25 },
        { id: "fixesApplied", label: "Fixes applied", placeholder: "What changed in code or design?", minLength: 30 },
        { id: "remainingConcerns", label: "Remaining concerns", placeholder: "What still needs review, measurement, or design attention?", minLength: 25 },
        { id: "beforeAfterSummary", label: "Before/after summary", placeholder: "Before the component..., after the component...", minLength: 35 }
      ],
      checklist: [
        "Keyboard/focus behavior is covered",
        "Labels or accessible names are covered",
        "Contrast, status, or motion is covered",
        "Performance or loading risk is covered",
        "Before/after summary is specific enough for a PR"
      ],
      xp: 115
    }
  }
];

const dataStateLessons: Lesson[] = [
  {
    id: "lesson-data-products",
    slug: "data-turns-components-into-products",
    title: "Data Turns Components Into Products",
    duration: "40 min",
    objectives: [
      "Explain how data changes static components into product surfaces.",
      "Separate server data from local UI state.",
      "Name the loading, empty, error, success, and optimistic states a real interface needs."
    ],
    sections: [
      {
        title: "Product UI is stateful",
        paragraphs: [
          "A polished component is only the starting point. Real product surfaces depend on data that can load slowly, fail, arrive empty, change after user input, or save in the background.",
          "Design engineers need to design and build more than the happy path. A dashboard, table, card list, settings panel, or form should explain what is happening at every moment."
        ],
        bulletPoints: [
          "Server data comes from a fetch or mock API.",
          "Local state tracks the user's current interaction.",
          "Derived state is calculated from source data, like filtered results.",
          "Loading, empty, error, and saving states are interface states, not afterthoughts."
        ]
      }
    ],
    activity: {
      type: "concept-check",
      id: "activity-data-state-concept",
      title: "Match data concepts to product UI states",
      prompt: "Match each data/state concept to the role it plays in a product interface.",
      prompts: [
        {
          id: "data-api",
          prompt: "What is the contract a frontend uses to request or save data?",
          options: ["API", "box shadow", "focus ring", "Figma frame"],
          answer: "API",
          explanation: "An API is the interface the UI uses to ask another system for data."
        },
        {
          id: "data-server",
          prompt: "What data usually comes from a backend, service, or mock request?",
          options: ["server data", "hover state", "local tab order", "font smoothing"],
          answer: "server data",
          explanation: "Server data is not owned by the component; the UI requests it and reacts to it."
        },
        {
          id: "data-local-state",
          prompt: "What tracks user interaction inside the interface?",
          options: ["local state", "semantic token", "deployment URL", "remote origin"],
          answer: "local state",
          explanation: "Search text, selected filters, open panels, and draft inputs are local UI state."
        },
        {
          id: "data-loading",
          prompt: "What should appear while data is still being requested?",
          options: ["loading state", "empty state", "union prop", "pull request"],
          answer: "loading state",
          explanation: "Loading states keep the UI from feeling frozen or broken."
        },
        {
          id: "data-empty",
          prompt: "What explains that a request succeeded but returned no items?",
          options: ["empty state", "error state", "saving state", "focus trap"],
          answer: "empty state",
          explanation: "Empty states are successful states with no content yet."
        },
        {
          id: "data-error",
          prompt: "What tells the user something failed and how to recover?",
          options: ["error state", "success state", "design token", "grid gap"],
          answer: "error state",
          explanation: "Useful error states include plain copy and a recovery action."
        },
        {
          id: "data-derived",
          prompt: "What is calculated from source data without destroying the original list?",
          options: ["derived state", "raw token", "commit message", "static markup"],
          answer: "derived state",
          explanation: "Filtered or sorted results are derived from the original data."
        },
        {
          id: "data-optimistic",
          prompt: "What updates the UI immediately while a save is still being confirmed?",
          options: ["optimistic update", "reduced motion", "accessible name", "route segment"],
          answer: "optimistic update",
          explanation: "Optimistic UI makes the interface feel fast while still handling save feedback."
        }
      ],
      hints: ["Think about what the user sees while data is loading, missing, failing, changing, or saving."],
      xp: 100
    },
    nextLessonSlug: "fetching-data-and-showing-loading-states"
  },
  {
    id: "lesson-data-loading",
    slug: "fetching-data-and-showing-loading-states",
    title: "Fetching Data and Showing Loading States",
    duration: "60 min",
    objectives: [
      "Use a controlled mock API instead of hard-coded card data.",
      "Load data with useEffect and async/await.",
      "Show a clear loading state before rendering cards."
    ],
    sections: [
      {
        title: "Fetching is a UI state problem",
        paragraphs: [
          "`fetch` is how frontend code asks for data. In this MVP lab, you will use a controlled mock function so the behavior is predictable and the validation is deterministic.",
          "The important design-engineering move is not the network detail. It is making the interface communicate while the data is on the way."
        ]
      }
    ],
    activity: {
      type: "ts-react-component",
      id: "activity-data-loading-projects",
      title: "Build a data-loading project list",
      prompt: "Use the mock API to load projects, show loading feedback, then render cards from returned data.",
      starterCode: `import React, { useEffect, useState } from "react";\n\ntype Project = {\n  id: number;\n  title: string;\n  status: string;\n};\n\nfunction fetchProjects(): Promise<Project[]> {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      resolve([\n        { id: 1, title: "Design system audit", status: "In review" },\n        { id: 2, title: "Dashboard refresh", status: "In progress" },\n        { id: 3, title: "Settings cleanup", status: "Ready" }\n      ]);\n    }, 30);\n  });\n}\n\nexport default function App() {\n  const projects = [\n    { id: 1, title: "Static placeholder", status: "Draft" }\n  ];\n\n  return (\n    <main className="board">\n      <h1>Project dashboard</h1>\n      {projects.map((project) => (\n        <article className="project-card" key={project.id}>\n          <p className="status">{project.status}</p>\n          <h2>{project.title}</h2>\n        </article>\n      ))}\n    </main>\n  );\n}`,
      fakeFileName: "App.tsx",
      previewComponentName: "App",
      instructions: [
        "Use `useEffect` to call `fetchProjects()` after the component renders.",
        "Store the returned projects in state.",
        "Show loading copy before the projects arrive.",
        "Render the returned project cards from state."
      ],
      solutionCode: `import React, { useEffect, useState } from "react";\n\ntype Project = {\n  id: number;\n  title: string;\n  status: string;\n};\n\nfunction fetchProjects(): Promise<Project[]> {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      resolve([\n        { id: 1, title: "Design system audit", status: "In review" },\n        { id: 2, title: "Dashboard refresh", status: "In progress" },\n        { id: 3, title: "Settings cleanup", status: "Ready" }\n      ]);\n    }, 30);\n  });\n}\n\nexport default function App() {\n  const [projects, setProjects] = useState<Project[]>([]);\n  const [isLoading, setIsLoading] = useState(true);\n\n  useEffect(() => {\n    async function loadProjects() {\n      setIsLoading(true);\n      const nextProjects = await fetchProjects();\n      setProjects(nextProjects);\n      setIsLoading(false);\n    }\n\n    loadProjects();\n  }, []);\n\n  if (isLoading) {\n    return <main className=\"board\"><p>Loading projects...</p></main>;\n  }\n\n  return (\n    <main className=\"board\">\n      <h1>Project dashboard</h1>\n      {projects.map((project) => (\n        <article className=\"project-card\" key={project.id}>\n          <p className=\"status\">{project.status}</p>\n          <h2>{project.title}</h2>\n        </article>\n      ))}\n    </main>\n  );\n}`,
      previewDescription: "Expected UI: a project dashboard that briefly loads, then renders three project cards from mock API data.",
      hints: [
        "Start with `const [projects, setProjects] = useState<Project[]>([])`.",
        "Call the mock API inside `useEffect`, not directly in the render body.",
        "Use loading copy like `Loading projects...` so the UI never appears frozen."
      ],
      checks: [
        { id: "uses-use-effect", label: "useEffect is used", pattern: "useEffect\\s*\\(", message: "Call the mock API from `useEffect`." },
        { id: "uses-async", label: "Async or promise handling exists", pattern: "(async\\s+function|await\\s+fetchProjects|fetchProjects\\(\\)\\.then)", message: "Handle the mock API asynchronously." },
        { id: "project-state", label: "Returned data is stored in state", pattern: "useState\\s*<\\s*Project\\[\\]\\s*>|useState\\s*\\(\\s*\\[\\s*\\]\\s*\\)", message: "Store returned projects in state." },
        { id: "loading-state", label: "Loading state exists", pattern: "(isLoading|loading)[\\s\\S]*useState", message: "Track and render a loading state." },
        { id: "fetch-called", label: "fetchProjects is called", pattern: "fetchProjects\\s*\\(", message: "Use the provided mock API." }
      ],
      renderedChecks: [
        { type: "text-includes", id: "renders-api-data", label: "Project data renders", text: "Design system audit", message: "The returned mock project should render in the preview." },
        { type: "selector-count", id: "data-loading-renders-three-cards", label: "Three project cards render", selector: ".project-card", count: 3, message: "Render at least three project cards from the returned data." }
      ],
      xp: 130
    },
    nextLessonSlug: "empty-and-error-states"
  },
  {
    id: "lesson-data-empty-error",
    slug: "empty-and-error-states",
    title: "Empty and Error States",
    duration: "55 min",
    objectives: [
      "Distinguish empty, loading, and error states.",
      "Write helpful empty and error copy.",
      "Include a retry action when data fails."
    ],
    sections: [
      {
        title: "Nothing happened is not a state",
        paragraphs: [
          "A successful request can still return no items. That is an empty state, not an error.",
          "An error state should say what happened in plain language and give the user a recovery action. The interface should not render broken cards or confusing blanks when data is missing."
        ]
      }
    ],
    activity: {
      type: "ts-react-component",
      id: "activity-data-empty-error-panel",
      title: "Fix empty and error states",
      prompt: "Repair the data panel so it handles empty data, error copy, and retry recovery instead of pretending every request succeeds.",
      starterCode: `import React, { useState } from "react";\n\ntype Project = { id: number; title: string };\n\nexport default function App() {\n  const [projects] = useState<Project[]>([]);\n\n  return (\n    <main className=\"board\">\n      <h1>Project feed</h1>\n      {projects.map((project) => (\n        <article className=\"project-card\" key={project.id}>\n          <h2>{project.title}</h2>\n        </article>\n      ))}\n    </main>\n  );\n}`,
      fakeFileName: "App.tsx",
      previewComponentName: "App",
      instructions: [
        "Add an explicit empty state for successful requests with no items.",
        "Add an explicit error state with useful copy.",
        "Include a retry button.",
        "Avoid rendering broken or blank UI when the project list is empty."
      ],
      solutionCode: `import React, { useState } from "react";\n\ntype Project = { id: number; title: string };\ntype ViewState = \"success\" | \"empty\" | \"error\";\n\nexport default function App() {\n  const [projects, setProjects] = useState<Project[]>([]);\n  const [viewState, setViewState] = useState<ViewState>(\"empty\");\n\n  function retry() {\n    setProjects([{ id: 1, title: \"Recovered project\" }]);\n    setViewState(\"success\");\n  }\n\n  return (\n    <main className=\"board\">\n      <h1>Project feed</h1>\n      {viewState === \"empty\" && projects.length === 0 ? (\n        <section className=\"project-card empty-state\">\n          <h2>No projects yet</h2>\n          <p>Create or import a project to start filling this dashboard.</p>\n        </section>\n      ) : null}\n      {viewState === \"error\" ? (\n        <section className=\"project-card error-state\">\n          <h2>Projects could not load</h2>\n          <p>Check the connection and try again.</p>\n          <button type=\"button\" onClick={retry}>Retry</button>\n        </section>\n      ) : null}\n      <section className=\"project-card error-state\">\n        <h2>Projects could not load</h2>\n        <p>Check the connection and try again.</p>\n        <button type=\"button\" onClick={retry}>Retry</button>\n      </section>\n      {viewState === \"success\" ? projects.map((project) => (\n        <article className=\"project-card\" key={project.id}>\n          <h2>{project.title}</h2>\n        </article>\n      )) : null}\n    </main>\n  );\n}`,
      previewDescription: "Expected UI: useful empty copy, useful error copy, and a retry action instead of a blank panel.",
      hints: [
        "Empty and error states should have different copy.",
        "A retry button gives the user a recovery action.",
        "Use conditional rendering so missing data does not create broken cards."
      ],
      checks: [
        { id: "empty-state", label: "Empty state exists", pattern: "(empty-state|No projects yet|empty)", message: "Add a clear empty state." },
        { id: "data-error-state", label: "Error state exists", pattern: "(error-state|could not load|error)", message: "Add a clear error state." },
        { id: "retry-handler", label: "Retry action exists", pattern: "(function\\s+retry|const\\s+retry|onClick=\\{\\s*retry\\s*\\})", message: "Add a retry action." },
        { id: "conditional-rendering", label: "Conditional rendering protects missing data", pattern: "(projects\\.length\\s*===\\s*0|viewState\\s*===|status\\s*===)", message: "Use state conditions before rendering panels." }
      ],
      renderedChecks: [
        { type: "text-includes", id: "empty-copy", label: "Empty copy renders", text: "No projects yet", message: "The preview should include helpful empty-state copy." },
        { type: "text-includes", id: "error-copy", label: "Error copy renders", text: "Projects could not load", message: "The preview should include helpful error copy." },
        { type: "text-includes", id: "retry-copy", label: "Retry action renders", text: "Retry", message: "The preview should include a retry button." }
      ],
      xp: 125
    },
    nextLessonSlug: "filtering-search-and-derived-state"
  },
  {
    id: "lesson-data-filtering",
    slug: "filtering-search-and-derived-state",
    title: "Filtering, Search, and Derived State",
    duration: "55 min",
    objectives: [
      "Store search query as local state.",
      "Filter data without destroying the original source list.",
      "Render a useful no-results state."
    ],
    sections: [
      {
        title: "Filtered results are derived state",
        paragraphs: [
          "Search and filters should not mutate the source data. Keep the original array available, then derive the visible results from the current query or filter.",
          "This keeps the UI predictable: clearing the search should bring the full list back."
        ]
      }
    ],
    activity: {
      type: "ts-react-component",
      id: "activity-data-search-dashboard",
      title: "Build a searchable project dashboard",
      prompt: "Add search query state, derive filtered results from source data, and show a no-results state.",
      starterCode: `import React, { useState } from "react";\n\ntype Project = { id: number; title: string; team: string };\n\nconst projects: Project[] = [\n  { id: 1, title: "Design system audit", team: "Systems" },\n  { id: 2, title: "Checkout cleanup", team: "Product" },\n  { id: 3, title: "Analytics dashboard", team: "Data" }\n];\n\nexport default function App() {\n  return (\n    <main className=\"board\">\n      <h1>Projects</h1>\n      {projects.map((project) => (\n        <article className=\"project-card\" key={project.id}>\n          <p className=\"status\">{project.team}</p>\n          <h2>{project.title}</h2>\n        </article>\n      ))}\n    </main>\n  );\n}`,
      fakeFileName: "App.tsx",
      previewComponentName: "App",
      instructions: [
        "Store the search query in state.",
        "Render a controlled search input.",
        "Use `.filter()` to derive visible projects from the original array.",
        "Show no-results copy when the filtered list is empty."
      ],
      solutionCode: `import React, { useState } from "react";\n\ntype Project = { id: number; title: string; team: string };\n\nconst projects: Project[] = [\n  { id: 1, title: "Design system audit", team: "Systems" },\n  { id: 2, title: "Checkout cleanup", team: "Product" },\n  { id: 3, title: "Analytics dashboard", team: "Data" }\n];\n\nexport default function App() {\n  const [query, setQuery] = useState(\"dashboard\");\n  const filteredProjects = projects.filter((project) =>\n    project.title.toLowerCase().includes(query.toLowerCase()) ||\n    project.team.toLowerCase().includes(query.toLowerCase())\n  );\n\n  return (\n    <main className=\"board\">\n      <h1>Projects</h1>\n      <label>\n        Search projects\n        <input value={query} onChange={(event) => setQuery(event.target.value)} />\n      </label>\n      {filteredProjects.length === 0 ? <p>No matching projects</p> : null}\n      {filteredProjects.map((project) => (\n        <article className=\"project-card\" key={project.id}>\n          <p className=\"status\">{project.team}</p>\n          <h2>{project.title}</h2>\n        </article>\n      ))}\n    </main>\n  );\n}`,
      previewDescription: "Expected UI: a search input that filters project cards from the original data and includes a no-results state.",
      hints: [
        "Keep `projects` as the source array.",
        "Create `filteredProjects` with `.filter()` inside the component.",
        "The input should use `value={query}` and update with `onChange`."
      ],
      checks: [
        { id: "query-state", label: "Query state exists", pattern: "useState\\s*\\(\\s*[\"'][^\"']*[\"']\\s*\\)", message: "Store the search query in local state." },
        { id: "search-controlled-input", label: "Input updates query", pattern: "<input[\\s\\S]*value=\\{query\\}[\\s\\S]*onChange=\\{", message: "Make the search input controlled by query state." },
        { id: "filter-used", label: ".filter() is used", pattern: "\\.filter\\s*\\(", message: "Derive visible results with `.filter()`." },
        { id: "source-data-kept", label: "Original data remains available", pattern: "const\\s+projects\\s*:\\s*Project\\[\\]", message: "Keep the source project data separate from derived results." },
        { id: "no-results", label: "No-results state exists", pattern: "No matching projects|no-results|filteredProjects\\.length\\s*===\\s*0", message: "Show a no-results state when filtering returns nothing." }
      ],
      renderedChecks: [
        { type: "text-includes", id: "renders-search", label: "Search UI renders", text: "Search projects", message: "The preview should include a search input label." },
        { type: "selector-count", id: "filtered-card-renders", label: "Filtered result renders", selector: ".project-card", count: 1, message: "The preview should render at least one filtered project card." },
        { type: "input-text-includes", id: "search-updates-results", label: "Typing updates results", selector: "input", value: "checkout", text: "Checkout cleanup", message: "Typing a search query should update the rendered results." },
        { type: "input-text-includes", id: "search-shows-no-results", label: "No-results state appears", selector: "input", value: "zzzz", text: "No matching projects", message: "A query with no matches should show a no-results state." }
      ],
      xp: 125
    },
    nextLessonSlug: "forms-saving-and-optimistic-ui"
  },
  {
    id: "lesson-data-forms-saving",
    slug: "forms-saving-and-optimistic-ui",
    title: "Forms, Saving, and Optimistic UI",
    duration: "60 min",
    objectives: [
      "Control form input with state.",
      "Show saving and success feedback.",
      "Add a submitted item to the rendered list."
    ],
    sections: [
      {
        title: "Forms need feedback",
        paragraphs: [
          "A form is not complete when it accepts text. It needs a clear saving state, disabled behavior while work is in progress, success feedback, and a reset path after submission.",
          "Optimistic UI means the interface can update quickly while still communicating that a save is being confirmed."
        ]
      }
    ],
    activity: {
      type: "ts-react-component",
      id: "activity-data-add-project-form",
      title: "Build an add-project form",
      prompt: "Create a controlled form that saves a project, shows saving/success feedback, adds the item, and clears the input.",
      starterCode: `import React, { useState } from "react";\n\ntype Project = { id: number; title: string };\n\nfunction saveProject(title: string): Promise<Project> {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve({ id: Date.now(), title }), 30);\n  });\n}\n\nexport default function App() {\n  const [projects] = useState<Project[]>([\n    { id: 1, title: "Design system audit" }\n  ]);\n\n  return (\n    <main className=\"board\">\n      <h1>Project intake</h1>\n      <form>\n        <input placeholder=\"Project title\" />\n        <button type=\"submit\">Add project</button>\n      </form>\n      {projects.map((project) => <article className=\"project-card\" key={project.id}><h2>{project.title}</h2></article>)}\n    </main>\n  );\n}`,
      fakeFileName: "App.tsx",
      previewComponentName: "App",
      instructions: [
        "Control the input value with state.",
        "Handle form submit and call `saveProject()`.",
        "Show a saving state and disable submit while saving.",
        "Add the saved project to the rendered list, show success feedback, and clear the form."
      ],
      solutionCode: `import React, { useState } from "react";\n\ntype Project = { id: number; title: string };\n\nfunction saveProject(title: string): Promise<Project> {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve({ id: Date.now(), title }), 30);\n  });\n}\n\nexport default function App() {\n  const [projects, setProjects] = useState<Project[]>([\n    { id: 1, title: "Design system audit" }\n  ]);\n  const [title, setTitle] = useState(\"Roadmap review\");\n  const [isSaving, setIsSaving] = useState(false);\n  const [saveMessage, setSaveMessage] = useState(\"\");\n\n  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {\n    event.preventDefault();\n    if (!title.trim()) return;\n    setIsSaving(true);\n    setSaveMessage(\"Saving project...\");\n    const savedProject = await saveProject(title);\n    setProjects((currentProjects) => [...currentProjects, savedProject]);\n    setTitle(\"\");\n    setIsSaving(false);\n    setSaveMessage(\"Project saved\");\n  }\n\n  return (\n    <main className=\"board\">\n      <h1>Project intake</h1>\n      <form onSubmit={handleSubmit}>\n        <label>\n          Project title\n          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder=\"Project title\" />\n        </label>\n        <button type=\"submit\" disabled={isSaving}>{isSaving ? \"Saving...\" : saveMessage === \"Project saved\" ? \"Saved\" : \"Add project\"}</button>\n      </form>\n      {saveMessage ? <p>{saveMessage}</p> : null}\n      {projects.map((project) => <article className=\"project-card\" key={project.id}><h2>{project.title}</h2></article>)}\n    </main>\n  );\n}`,
      previewDescription: "Expected UI: a controlled add-project form with saving feedback, success feedback, and a rendered list that grows after submit.",
      hints: [
        "Use one state value for the input draft and another for saving.",
        "Prevent the default form submit before calling the mock save function.",
        "After saving, append the new project and clear the input."
      ],
      checks: [
        { id: "add-project-controlled-input", label: "Controlled input exists", pattern: "<input[\\s\\S]*value=\\{title\\}[\\s\\S]*onChange=\\{", message: "Control the input value with state." },
        { id: "submit-handler", label: "Submit handler exists", pattern: "(handleSubmit|onSubmit=\\{)", message: "Handle form submission." },
        { id: "saving-state", label: "Saving state exists", pattern: "(isSaving|saving)[\\s\\S]*useState", message: "Track saving state." },
        { id: "save-called", label: "saveProject is called", pattern: "saveProject\\s*\\(", message: "Use the mock save function." },
        { id: "adds-item", label: "New item is added to list", pattern: "setProjects\\s*\\([\\s\\S]*(\\.\\.\\.currentProjects|\\.\\.\\.projects|savedProject)", message: "Add the saved item to rendered project state." },
        { id: "success-feedback", label: "Success feedback exists", pattern: "(Project saved|saveMessage|success)", message: "Show feedback after saving." }
      ],
      renderedChecks: [
        { type: "click-text-change", id: "save-click-feedback", label: "Submit gives success feedback", selector: "button[type='submit']", beforeText: "Add project", afterText: "Saved", message: "Clicking submit should change the button to a saved state." },
        { type: "text-includes", id: "form-renders", label: "Project form renders", text: "Project intake", message: "The preview should render the add-project form." },
        { type: "text-includes", id: "initial-item-renders", label: "Existing project renders", text: "Design system audit", message: "The list should render existing project data." },
        { type: "selector-count", id: "project-card-renders", label: "Project list renders", selector: ".project-card", count: 1, message: "The preview should render the project list." }
      ],
      xp: 135
    },
    nextLessonSlug: "state-models-for-product-interfaces"
  },
  {
    id: "lesson-data-state-models",
    slug: "state-models-for-product-interfaces",
    title: "State Models for Product Interfaces",
    duration: "45 min",
    objectives: [
      "Document the states a product surface must handle.",
      "Name server-data states and local UI states separately.",
      "Use a state model to guide design review and PR review."
    ],
    sections: [
      {
        title: "A product surface is not one screen",
        paragraphs: [
          "The same dashboard can be idle, loading, successful, empty, failing, saving, or recovering. Naming those states makes design review sharper and code less fragile.",
          "A state model helps designers and engineers avoid impossible combinations, like showing success copy while the save button is still disabled for an error."
        ],
        bulletPoints: [
          "Server-data states: loading, success, empty, error.",
          "Local UI states: query, selected filter, draft form input, saving.",
          "Recovery actions: retry, clear search, edit input, submit again.",
          "Edge cases: slow response, duplicate item, no permission, partial data."
        ]
      }
    ],
    activity: {
      type: "state-model",
      id: "activity-data-state-model",
      title: "Document a product state model",
      prompt: "Describe the states a data-driven product surface needs before it is review-ready.",
      fields: [
        { id: "surfaceName", label: "Product surface name", placeholder: "Project dashboard, settings panel, report list...", minLength: 3 },
        { id: "dataStates", label: "Data states", placeholder: "Idle, loading, success, empty, error...", minLength: 25 },
        { id: "localUiStates", label: "Local UI states", placeholder: "Search query, selected filter, draft input, saving flag...", minLength: 25 },
        { id: "emptyStateCopy", label: "Empty state copy", placeholder: "What should the user see when the request succeeds with no items?", minLength: 20 },
        { id: "errorStateCopy", label: "Error state copy", placeholder: "Plain-language failure copy and what the user can do next.", minLength: 20 },
        { id: "loadingBehavior", label: "Loading behavior", placeholder: "Skeleton, spinner, disabled controls, preserved previous data...", minLength: 25 },
        { id: "savingBehavior", label: "Saving behavior", placeholder: "Disabled submit, optimistic item, saving copy, success feedback...", minLength: 25 },
        { id: "recoveryAction", label: "Recovery action", placeholder: "Retry, clear search, edit field, re-submit...", minLength: 15 },
        { id: "edgeCases", label: "Edge cases", placeholder: "Slow network, duplicate item, empty search, stale data, partial failure...", minLength: 25 }
      ],
      checklist: [
        "Server-data states are named",
        "Local UI states are named",
        "Empty and error copy are written",
        "Loading and saving behavior are described",
        "Recovery action and edge cases are included"
      ],
      xp: 115
    }
  }
];

const motionLessons: Lesson[] = [
  {
    id: "lesson-motion-job",
    slug: "motion-has-a-job",
    title: "Motion Has a Job",
    duration: "40 min",
    objectives: [
      "Explain motion as interface communication, not decoration.",
      "Identify feedback, continuity, attention, and state-change motion.",
      "Connect motion choices to accessibility and performance."
    ],
    sections: [
      {
        title: "Motion should earn its place",
        paragraphs: [
          "Good product motion tells the user what happened, what changed, or where attention should go next. It makes interaction feel understandable.",
          "Bad motion distracts, slows the task, hides feedback, or excludes people who prefer reduced motion. Define the job before choosing duration or easing."
        ],
        bulletPoints: [
          "Feedback motion confirms an action.",
          "Transition motion makes a state change easier to follow.",
          "Attention guidance points to what matters now.",
          "Reduced-motion support is part of the design, not an extra."
        ]
      }
    ],
    activity: {
      type: "concept-check",
      id: "activity-motion-concept-check",
      title: "Match motion concepts to interface jobs",
      prompt: "Match each motion concept to the job it performs in product UI.",
      prompts: [
        { id: "motion-feedback", prompt: "What confirms that a user action worked?", options: ["feedback motion", "layout shift", "decorative loop", "API route"], answer: "feedback motion", explanation: "Feedback motion helps the user trust that the action registered." },
        { id: "motion-transition", prompt: "What helps users follow a UI changing from one state to another?", options: ["transition motion", "hard refresh", "raw token", "branch name"], answer: "transition motion", explanation: "Transition motion connects before and after states." },
        { id: "motion-attention", prompt: "What guides the eye toward the next important area?", options: ["attention guidance", "database schema", "font fallback", "z-index"], answer: "attention guidance", explanation: "Attention guidance should clarify, not compete with the task." },
        { id: "motion-state", prompt: "What makes selected, saved, dismissed, or expanded UI understandable?", options: ["state change", "empty commit", "padding reset", "static mockup"], answer: "state change", explanation: "Motion can make state changes easier to perceive." },
        { id: "motion-duration", prompt: "What controls how long motion takes?", options: ["duration", "selector", "repo URL", "ARIA role"], answer: "duration", explanation: "Duration changes whether motion feels snappy, calm, or slow." },
        { id: "motion-easing", prompt: "What controls acceleration and deceleration?", options: ["easing", "localStorage", "error boundary", "pull request"], answer: "easing", explanation: "Easing shapes the character and perceived quality of motion." },
        { id: "motion-reduced", prompt: "What respects users who prefer less animation?", options: ["reduced motion", "infinite animation", "box shadow", "manual deploy"], answer: "reduced motion", explanation: "Reduced-motion fallbacks are accessibility support." },
        { id: "motion-performance", prompt: "What usually animates more safely than layout properties?", options: ["performance-safe animation", "width animation", "top animation", "margin animation"], answer: "performance-safe animation", explanation: "Transform and opacity are generally safer than layout-heavy properties." }
      ],
      hints: ["Think about the user's task: feedback, continuity, attention, state, accessibility, and performance."],
      xp: 100
    },
    nextLessonSlug: "transitions-for-interaction-states"
  },
  {
    id: "lesson-motion-interaction-states",
    slug: "transitions-for-interaction-states",
    title: "Transitions for Interaction States",
    duration: "55 min",
    objectives: [
      "Add purposeful transitions to hover, focus, active, and selected states.",
      "Preserve semantic controls and visible focus.",
      "Avoid layout-breaking animation."
    ],
    sections: [
      {
        title: "Interaction states should feel intentional",
        paragraphs: [
          "Hover, focus, active, selected, and disabled states tell people what can be operated and what just happened.",
          "Animate transform and opacity when possible. Keep focus visible, and never make motion the only cue."
        ]
      }
    ],
    exercise: {
      id: "exercise-motion-action-card",
      title: "Polish an interactive action card",
      prompt: "Add usable transition, hover, focus, active, and selected feedback without replacing semantic controls.",
      runtime: "html-css-js",
      starterFiles: {
        html: `<article class="action-card">\n  <p class="eyebrow">Review ready</p>\n  <h2>Publish component updates</h2>\n  <p>Check states, accessibility, and implementation notes before opening a PR.</p>\n  <button class="action-button" type="button">Mark selected</button>\n</article>`,
        css: `.action-card {\n  max-width: 460px;\n  margin: 40px auto;\n  padding: 24px;\n  border: 1px solid #d8dee8;\n  border-radius: 18px;\n  background: #fff;\n}\n.action-button {\n  border: 0;\n  border-radius: 999px;\n  background: #111827;\n  color: white;\n  padding: 10px 14px;\n}\n.action-card.is-selected { border-color: #2563eb; }`,
        js: `document.querySelector(".action-button")?.addEventListener("click", () => {\n  document.querySelector(".action-card")?.classList.toggle("is-selected");\n});`
      },
      solutionFiles: {
        html: `<article class="action-card">\n  <p class="eyebrow">Review ready</p>\n  <h2>Publish component updates</h2>\n  <p>Check states, accessibility, and implementation notes before opening a PR.</p>\n  <button class="action-button" type="button" aria-pressed="false">Mark selected</button>\n  <p class="selected-copy" aria-live="polite"></p>\n</article>`,
        css: `.action-card {\n  max-width: 460px;\n  margin: 40px auto;\n  padding: 24px;\n  border: 1px solid #d8dee8;\n  border-radius: 18px;\n  background: #fff;\n  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;\n}\n.action-card:hover { transform: translateY(-2px); }\n.action-card.is-selected { border-color: #2563eb; box-shadow: 0 18px 44px rgba(37, 99, 235, .14); }\n.action-button {\n  border: 0;\n  border-radius: 999px;\n  background: #111827;\n  color: white;\n  padding: 10px 14px;\n  transition: transform 120ms ease, opacity 120ms ease;\n}\n.action-button:focus-visible { outline: 3px solid #f59e0b; outline-offset: 3px; }\n.action-button:active { transform: scale(.97); }\n.selected-copy { font-weight: 700; }`,
        js: `document.querySelector(".action-button")?.addEventListener("click", (event) => {\n  const card = document.querySelector(".action-card");\n  card?.classList.toggle("is-selected");\n  const selected = card?.classList.contains("is-selected") ?? false;\n  event.currentTarget.setAttribute("aria-pressed", String(selected));\n  document.querySelector(".selected-copy").textContent = selected ? "Selected for review" : "";\n});`
      },
      hints: [
        "Use `transition` on the element that changes.",
        "Use `:focus-visible` for a visible keyboard focus state.",
        "Selected state should include text or aria state, not just motion."
      ],
      checks: [
        { type: "expression-returns", expression: "Array.from(document.styleSheets).some(sheet => Array.from(sheet.cssRules).some(rule => rule.cssText.includes('transition')))", expected: true, message: "Add a transition to the interaction state." },
        { type: "expression-returns", expression: "Array.from(document.styleSheets).some(sheet => Array.from(sheet.cssRules).some(rule => rule.cssText.includes('transform') || rule.cssText.includes('opacity')))", expected: true, message: "Use transform or opacity for motion feedback." },
        { type: "expression-returns", expression: "Array.from(document.styleSheets).some(sheet => Array.from(sheet.cssRules).some(rule => rule.cssText.includes(':focus-visible') && rule.cssText.includes('outline')))", expected: true, message: "Keep a visible focus state." },
        { type: "selector-exists", selector: ".action-card.is-selected, .action-button[aria-pressed]", message: "Add selected state feedback." },
        { type: "selector-exists", selector: "button.action-button", message: "Keep the action as a semantic button." }
      ],
      xp: 120
    },
    nextLessonSlug: "timing-easing-and-motion-tokens"
  },
  {
    id: "lesson-motion-tokens",
    slug: "timing-easing-and-motion-tokens",
    title: "Timing, Easing, and Motion Tokens",
    duration: "50 min",
    objectives: [
      "Define semantic duration and easing tokens.",
      "Apply different timing to feedback and larger transitions.",
      "Connect motion values to design systems."
    ],
    sections: [
      {
        title: "Motion values are system decisions",
        paragraphs: [
          "Duration changes whether motion feels immediate or calm. Easing changes the perceived personality of a transition.",
          "Design systems should name these decisions so product motion stays consistent: duration-fast, duration-normal, ease-standard, ease-emphasized."
        ]
      }
    ],
    exercise: {
      id: "exercise-motion-tokens",
      title: "Create and apply motion tokens",
      prompt: "Define semantic motion tokens and apply them to button feedback and card transitions.",
      runtime: "html-css-js",
      starterFiles: {
        html: `<article class="motion-card">\n  <h2>Motion token preview</h2>\n  <button class="motion-button" type="button">Preview change</button>\n</article>`,
        css: `.motion-card {\n  max-width: 460px;\n  margin: 40px auto;\n  padding: 24px;\n  border-radius: 18px;\n  border: 1px solid #d8dee8;\n  background: #fff;\n}\n.motion-button {\n  border: 0;\n  border-radius: 999px;\n  background: #111827;\n  color: white;\n  padding: 10px 14px;\n}`,
        js: `document.querySelector(".motion-button")?.addEventListener("click", () => {\n  document.querySelector(".motion-card")?.classList.toggle("is-expanded");\n});`
      },
      solutionFiles: {
        html: `<article class="motion-card">\n  <h2>Motion token preview</h2>\n  <button class="motion-button" type="button">Preview change</button>\n</article>`,
        css: `:root {\n  --duration-feedback-fast: 120ms;\n  --duration-transition-normal: 220ms;\n  --duration-transition-slow: 360ms;\n  --ease-standard: cubic-bezier(.2, 0, 0, 1);\n  --ease-emphasized: cubic-bezier(.2, .8, .2, 1);\n}\n.motion-card {\n  max-width: 460px;\n  margin: 40px auto;\n  padding: 24px;\n  border-radius: 18px;\n  border: 1px solid #d8dee8;\n  background: #fff;\n  transition: transform var(--duration-transition-normal) var(--ease-standard), border-color var(--duration-transition-normal) var(--ease-standard);\n}\n.motion-card.is-expanded { transform: translateY(-3px); border-color: #2563eb; }\n.motion-button {\n  border: 0;\n  border-radius: 999px;\n  background: #111827;\n  color: white;\n  padding: 10px 14px;\n  transition: transform var(--duration-feedback-fast) var(--ease-emphasized);\n}\n.motion-button:active { transform: scale(.97); }`,
        js: `document.querySelector(".motion-button")?.addEventListener("click", () => {\n  document.querySelector(".motion-card")?.classList.toggle("is-expanded");\n});`
      },
      hints: [
        "Use CSS variables for duration and easing.",
        "Name the token by purpose, not only by speed.",
        "Use a faster token for button feedback than for the card transition."
      ],
      checks: [
        { type: "expression-returns", expression: "Array.from(document.styleSheets).some(sheet => Array.from(sheet.cssRules).some(rule => rule.cssText.includes('--duration-feedback-fast') && rule.cssText.includes('--duration-transition-normal')))", expected: true, message: "Define at least two semantic duration tokens." },
        { type: "expression-returns", expression: "Array.from(document.styleSheets).some(sheet => Array.from(sheet.cssRules).some(rule => rule.cssText.includes('--ease-standard') || rule.cssText.includes('--ease-emphasized')))", expected: true, message: "Define semantic easing tokens." },
        { type: "expression-returns", expression: "Array.from(document.styleSheets).some(sheet => Array.from(sheet.cssRules).some(rule => rule.cssText.includes('transition') && rule.cssText.includes('var(--duration')))", expected: true, message: "Use token values in transitions." },
        { type: "expression-returns", expression: "Array.from(document.styleSheets).some(sheet => Array.from(sheet.cssRules).some(rule => rule.cssText.includes('transform')))", expected: true, message: "Use transform for the motion behavior." }
      ],
      xp: 115
    },
    nextLessonSlug: "enter-exit-and-conditional-ui"
  },
  {
    id: "lesson-motion-toast",
    slug: "enter-exit-and-conditional-ui",
    title: "Enter, Exit, and Conditional UI",
    duration: "55 min",
    objectives: [
      "Use React state to control conditional UI.",
      "Animate a toast entering and dismissing.",
      "Keep the notification understandable and dismissible."
    ],
    sections: [
      {
        title: "Appearing and disappearing is part of product flow",
        paragraphs: [
          "Toasts, drawers, alerts, and dropdowns appear because something changed. Motion can make that change easier to follow.",
          "In this MVP, use mounted state plus classes. The goal is to communicate, not to build a full animation framework."
        ]
      }
    ],
    activity: {
      type: "ts-react-component",
      id: "activity-motion-toast",
      title: "Build a dismissible toast notification",
      prompt: "Use state-driven visibility, enter/dismiss classes, and a dismiss button to make a useful toast.",
      starterCode: `import React, { useState } from "react";\n\nexport default function App() {\n  return (\n    <main className="board">\n      <button type="button">Save changes</button>\n      <section className="project-card toast">Changes saved</section>\n    </main>\n  );\n}`,
      fakeFileName: "App.tsx",
      previewComponentName: "App",
      instructions: [
        "Use `useState` to control whether the toast is visible.",
        "Add transition or animation styles for the toast.",
        "Include a dismiss button.",
        "Clicking dismiss should change the rendered UI."
      ],
      solutionCode: `import React, { useState } from "react";\n\nexport default function App() {\n  const [isVisible, setIsVisible] = useState(true);\n\n  return (\n    <main className="board">\n      <button type="button" onClick={() => setIsVisible(true)}>Save changes</button>\n      {isVisible ? (\n        <section className="project-card toast toast-enter" role="status">\n          <p>Changes saved</p>\n          <button type="button" onClick={() => setIsVisible(false)}>Dismiss</button>\n        </section>\n      ) : <p>Notification dismissed</p>}\n      <style>{\n        \`.toast { transition: opacity 180ms ease, transform 180ms ease; animation: toast-in 180ms ease both; }\n        .toast-enter { opacity: 1; transform: translateY(0); }\n        @keyframes toast-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }\n        @media (prefers-reduced-motion: reduce) { .toast { animation: none; transition: none; } }\`\n      }</style>\n    </main>\n  );\n}`,
      previewDescription: "Expected UI: a visible toast with message text and a dismiss button; clicking dismiss changes the UI.",
      hints: [
        "Use `const [isVisible, setIsVisible] = useState(true)`.",
        "Render the toast conditionally.",
        "Use transition or keyframes for the enter state."
      ],
      checks: [
        { id: "toast-use-state", label: "useState controls visibility", pattern: "useState\\s*\\(", message: "Use React state to control toast visibility." },
        { id: "toast-dismiss-handler", label: "Dismiss handler exists", pattern: "onClick=\\{\\s*\\(\\)\\s*=>\\s*set[A-Za-z0-9_]+\\(false\\)", message: "Clicking dismiss should hide the toast." },
        { id: "toast-motion", label: "Transition or animation exists", pattern: "(transition|animation|@keyframes)", message: "Add enter or dismiss motion." },
        { id: "toast-button", label: "Dismiss button exists", pattern: "<button[\\s\\S]*Dismiss", message: "Include a dismiss button." }
      ],
      renderedChecks: [
        { type: "text-includes", id: "toast-message-renders", label: "Toast message renders", text: "Changes saved", message: "The toast should render a clear message." },
        { type: "click-text-includes", id: "toast-dismiss-click", label: "Dismiss changes UI", selector: ".toast button", text: "Notification dismissed", message: "Clicking dismiss should remove or change the toast UI." }
      ],
      xp: 130
    },
    nextLessonSlug: "feedback-micro-interactions"
  },
  {
    id: "lesson-motion-feedback",
    slug: "feedback-micro-interactions",
    title: "Feedback Micro-Interactions",
    duration: "55 min",
    objectives: [
      "Use state to confirm a user action.",
      "Combine text and subtle motion feedback.",
      "Avoid motion-only feedback."
    ],
    sections: [
      {
        title: "Feedback makes actions feel trustworthy",
        paragraphs: [
          "Save, copy, favorite, upload, delete, and submit actions need feedback. The user should not have to guess whether the action worked.",
          "A micro-interaction can use motion, but the feedback must also be visible as text or state."
        ]
      }
    ],
    activity: {
      type: "ts-react-component",
      id: "activity-motion-feedback-button",
      title: "Build a save feedback button",
      prompt: "Use state, text, and subtle motion to confirm that a save action worked.",
      starterCode: `import React from "react";\n\nexport default function App() {\n  return <button className="save-button" type="button">Save</button>;\n}`,
      fakeFileName: "App.tsx",
      previewComponentName: "App",
      instructions: [
        "Track saved status with state.",
        "Update the button text after click.",
        "Add a feedback class or state.",
        "Use transition or animation for subtle feedback."
      ],
      solutionCode: `import React, { useState } from "react";\n\nexport default function App() {\n  const [status, setStatus] = useState<"idle" | "saved">("idle");\n  const saved = status === "saved";\n\n  return (\n    <main className="board">\n      <button\n        className={saved ? "save-button is-saved pulse-feedback" : "save-button"}\n        type="button"\n        aria-label={saved ? "Saved" : "Save changes"}\n        onClick={() => setStatus("saved")}\n      >\n        {saved ? "Saved" : "Save"}\n      </button>\n      <style>{\n        \`.save-button { transition: transform 140ms ease, background 140ms ease; }\n        .save-button:focus-visible { outline: 3px solid #f59e0b; outline-offset: 3px; }\n        .is-saved { background: #111827; color: white; }\n        .pulse-feedback { animation: save-pulse 180ms ease; }\n        @keyframes save-pulse { from { transform: scale(.96); } to { transform: scale(1); } }\n        @media (prefers-reduced-motion: reduce) { .pulse-feedback { animation: none; } }\`\n      }</style>\n    </main>\n  );\n}`,
      previewDescription: "Expected UI: clicking Save changes the button to Saved with text and subtle motion feedback.",
      hints: [
        "Use state for the action status.",
        "Change text from Save to Saved.",
        "Use a class like `is-saved` or `pulse-feedback` for visual feedback."
      ],
      checks: [
        { id: "feedback-use-state", label: "useState is used", pattern: "useState\\s*(<[^>]+>)?\\s*\\(", message: "Use state to track action status." },
        { id: "feedback-click", label: "Click handler exists", pattern: "onClick=\\{", message: "Add a click handler." },
        { id: "feedback-text", label: "Button text changes", pattern: "Saved[\\s\\S]*Save|Save[\\s\\S]*Saved", message: "Show clear text feedback." },
        { id: "feedback-class", label: "Feedback class/state appears", pattern: "(is-saved|pulse-feedback|status\\s*===)", message: "Add a feedback class or state." },
        { id: "feedback-motion", label: "Transition or animation exists", pattern: "(transition|animation|@keyframes)", message: "Add subtle motion feedback." },
        { id: "feedback-accessible", label: "Accessible text or label exists", pattern: "(aria-label|Saved)", message: "Feedback should not be motion-only." }
      ],
      renderedChecks: [
        { type: "click-text-includes", id: "save-button-click", label: "Click changes button text", selector: "button", text: "Saved", message: "Clicking the button should change visible feedback text." },
        { type: "selector-has-class", id: "saved-class-renders", label: "Saved visual state appears", selector: "button", className: "is-saved", message: "The saved state should apply a visible class." }
      ],
      xp: 130
    },
    nextLessonSlug: "reduced-motion-and-performance-safe-animation"
  },
  {
    id: "lesson-motion-audit",
    slug: "reduced-motion-and-performance-safe-animation",
    title: "Reduced Motion and Performance-Safe Animation",
    duration: "45 min",
    objectives: [
      "Respect reduced-motion preferences.",
      "Prefer transform and opacity over layout-heavy animation.",
      "Write a motion audit note before shipping."
    ],
    sections: [
      {
        title: "Motion needs a quality pass",
        paragraphs: [
          "Motion preferences are accessibility preferences. Product motion should not block a task or force animation on people who prefer less movement.",
          "Performance-safe animation usually favors transform and opacity. Width, height, top, left, margin, filter, and heavy shadows deserve extra caution."
        ]
      }
    ],
    activity: {
      type: "motion-audit",
      id: "activity-motion-audit",
      title: "Write a motion QA audit",
      prompt: "Review a component's motion and document purpose, accessibility, performance, and suggested fixes.",
      fields: [
        { id: "motionPurpose", label: "Motion purpose", placeholder: "What job does the motion perform?", minLength: 25 },
        { id: "animatedProperties", label: "Animated properties", placeholder: "transform, opacity, color, width, box-shadow...", minLength: 20 },
        { id: "durationEasing", label: "Duration and easing", placeholder: "Fast feedback, normal transition, easing choice...", minLength: 20 },
        { id: "reducedMotionFallback", label: "Reduced-motion fallback", placeholder: "How does this change when motion is reduced?", minLength: 25 },
        { id: "accessibilityRisk", label: "Accessibility risk", placeholder: "Focus, motion-only feedback, distraction, vestibular risk...", minLength: 25 },
        { id: "performanceRisk", label: "Performance risk", placeholder: "Layout-heavy properties, infinite loops, large shadows...", minLength: 25 },
        { id: "suggestedFix", label: "Suggested fix", placeholder: "What would you change before shipping?", minLength: 25 },
        { id: "beforeAfterNote", label: "Before/after note", placeholder: "Before the UI felt..., after the motion...", minLength: 35 }
      ],
      checklist: [
        "Motion purpose is named",
        "Animated properties are reviewed",
        "Reduced-motion fallback is included",
        "Accessibility and performance risks are named",
        "Suggested fix and before/after note are specific"
      ],
      xp: 115
    }
  }
];

const deploymentLessons: Lesson[] = [
  {
    id: "lesson-deploy-local-to-shipped",
    slug: "from-local-prototype-to-shipped-project",
    title: "From Local Prototype to Shipped Project",
    duration: "45 min",
    objectives: [
      "Explain local preview, GitHub repo, deployed URL, production build, and preview deployment.",
      "Understand why shipped work needs to be easy to inspect.",
      "Connect deployment workflow to portfolio and team review."
    ],
    sections: [
      {
        title: "Shipped work is inspectable work",
        paragraphs: [
          "A local prototype proves the interface can work on your machine. A shipped project proves someone else can open it, review it, and understand what you built.",
          "Design engineers make work easy to inspect: a GitHub repo for code review, a deployed URL for product review, and a build step that catches problems before sharing."
        ],
        bulletPoints: [
          "Local development is where you iterate quickly.",
          "A production build checks the project as it will be shipped.",
          "A deployed URL lets reviewers experience the interface.",
          "A release checklist keeps quality from depending on memory."
        ]
      }
    ],
    activity: {
      type: "concept-check",
      id: "activity-deploy-concept-check",
      title: "Match deployment workflow terms",
      prompt: "Match each deployment concept to the role it plays in a review-ready frontend project.",
      prompts: [
        { id: "deploy-local", prompt: "Where do you run and edit the project on your machine?", options: ["local development", "production build", "hosting", "release checklist"], answer: "local development", explanation: "Local development is the fast loop for editing and previewing before sharing." },
        { id: "deploy-build", prompt: "What checks and bundles the app for shipping?", options: ["production build", "GitHub repo", "preview deployment", "README"], answer: "production build", explanation: "The production build catches issues that may not show during local dev." },
        { id: "deploy-url", prompt: "What should a reviewer open to experience the project?", options: ["deployed URL", "node_modules", "package-lock", "terminal prompt"], answer: "deployed URL", explanation: "A deployed URL makes the work visible without setup." },
        { id: "deploy-repo", prompt: "What should an engineer inspect for code and history?", options: ["GitHub repo", "browser cache", "image folder", "localhost"], answer: "GitHub repo", explanation: "The repo shows code organization, commits, and setup instructions." },
        { id: "deploy-preview", prompt: "What lets teams review changes before they become the main public version?", options: ["preview deployment", "hard refresh", "secret key", "CSS reset"], answer: "preview deployment", explanation: "Preview deployments make branches or PRs reviewable before release." },
        { id: "deploy-command", prompt: "What tells the tool how to create the production version?", options: ["build command", "eyebrow text", "alt text", "branch name"], answer: "build command", explanation: "The build command is often something like `npm run build`." },
        { id: "deploy-hosting", prompt: "What serves the built project at a public URL?", options: ["hosting", "localStorage", "component props", "mock data"], answer: "hosting", explanation: "Hosting makes the built files available to other people." },
        { id: "deploy-release", prompt: "What helps you verify quality before sharing?", options: ["release checklist", "unused import", "missing asset", "hard-coded secret"], answer: "release checklist", explanation: "A checklist keeps final review practical and repeatable." }
      ],
      hints: ["Think about what a designer, engineer, or hiring manager needs to inspect."],
      xp: 100
    },
    nextLessonSlug: "build-commands-and-production-checks"
  },
  {
    id: "lesson-deploy-build-commands",
    slug: "build-commands-and-production-checks",
    title: "Build Commands and Production Checks",
    duration: "55 min",
    objectives: [
      "Understand why `npm run dev` and `npm run build` are different.",
      "Read a beginner-friendly fake build error.",
      "Practice the command sequence for installing, previewing, building, fixing, and previewing again."
    ],
    sections: [
      {
        title: "Builds catch what local previews can hide",
        paragraphs: [
          "`npm run dev` is for fast iteration. `npm run build` asks a stricter question: can this project become a production version someone else can open?",
          "Build errors are not a verdict on your ability. They are specific clues: a missing import, wrong path, syntax error, dependency issue, or missing configuration."
        ]
      }
    ],
    activity: {
      type: "simulated-terminal",
      id: "activity-deploy-build-terminal",
      title: "Run a production build workflow",
      prompt: "Use a simulated terminal to install, preview, build, read a fake error, fix it, and preview the production build.",
      initialPath: "~/render/portfolio-project",
      steps: [
        { id: "install", instruction: "Install project dependencies.", expectedCommand: "npm install", output: "added 184 packages. Dependencies are ready.", hint: "Start by installing dependencies." },
        { id: "dev", instruction: "Start the local development server.", expectedCommand: "npm run dev", output: "Local dev server ready at http://localhost:5173", hint: "Use the dev command for local iteration." },
        { id: "build-fail", instruction: "Run the production build check.", expectedCommand: "npm run build", output: "Build failed: src/components/Hero.tsx imports './Badge' but the file is named './badge'. On production hosting, file paths are case-sensitive.", hint: "Use the production build command." },
        { id: "explain", instruction: "Name the fix you would make before rerunning the build.", expectedCommand: "fix file path casing", output: "Correct. Rename the import or file so the casing matches exactly.", hint: "The error says the path casing does not match." },
        { id: "build-pass", instruction: "Rerun the production build after the fix.", expectedCommand: "npm run build", output: "Build completed. dist assets generated.", hint: "Run the same production build command again." },
        { id: "preview", instruction: "Preview the production build locally.", expectedCommand: "npm run preview", output: "Production preview ready at http://localhost:4173", hint: "Preview the built output, not the dev server." }
      ],
      completionMessage: "Production workflow complete. You installed, previewed, built, diagnosed, fixed, rebuilt, and previewed the shipped version.",
      xp: 120
    },
    nextLessonSlug: "deploying-a-frontend-project"
  },
  {
    id: "lesson-deploy-frontend-project",
    slug: "deploying-a-frontend-project",
    title: "Deploying a Frontend Project",
    duration: "55 min",
    objectives: [
      "Identify the practical steps in a Vercel or Netlify-style deploy.",
      "Record build command, output directory, repo URL, and deployed URL.",
      "Review deploy logs and preview links before sharing."
    ],
    sections: [
      {
        title: "Deployment turns a repo into a review surface",
        paragraphs: [
          "Frontend hosting connects to your repo, runs the build command, and serves the output at a URL. The important beginner skill is knowing what the platform needs and what to check when it finishes.",
          "A design engineer should know the repo, build command, output directory, deploy logs, preview link, and final URL well enough to explain them in review."
        ]
      }
    ],
    activity: {
      type: "deployment-checklist",
      id: "activity-deploy-checklist",
      title: "Complete a deployment checklist",
      prompt: "Document the core deployment details you would verify before sharing a frontend project.",
      fields: [
        { id: "githubUrl", label: "GitHub repo URL", placeholder: "https://github.com/your-name/project", minLength: 12 },
        { id: "deployedUrl", label: "Deployed URL", placeholder: "https://your-project.vercel.app", minLength: 12 },
        { id: "buildCommand", label: "Build command", placeholder: "npm run build", minLength: 8 },
        { id: "outputDirectory", label: "Output directory", placeholder: "dist or .next, depending on the stack", minLength: 3 },
        { id: "deployNote", label: "What did you check after deploy?", placeholder: "I opened the preview URL, checked mobile, reviewed logs, and confirmed the homepage loaded.", minLength: 35 }
      ],
      checklist: [
        "Project is pushed to GitHub",
        "Deploy platform is connected",
        "Build command is identified",
        "Output directory is identified",
        "Deployment URL is saved",
        "Deploy logs and preview link are reviewed"
      ],
      xp: 110
    },
    nextLessonSlug: "environment-variables-and-configuration-basics"
  },
  {
    id: "lesson-deploy-env-config",
    slug: "environment-variables-and-configuration-basics",
    title: "Environment Variables and Configuration Basics",
    duration: "60 min",
    objectives: [
      "Understand frontend configuration without real secrets.",
      "Use a clear public env-style name for config.",
      "Add helpful fallback UI when configuration is missing."
    ],
    sections: [
      {
        title: "Configuration should be explicit",
        paragraphs: [
          "Environment variables let a project change configuration without rewriting components. In frontend projects, public env vars are visible to users, so they should not contain secrets.",
          "A useful production interface handles missing configuration with a clear message instead of breaking silently."
        ],
        bulletPoints: [
          "Use frontend-public naming such as `VITE_PUBLIC_API_URL` for non-secret config.",
          "Never teach or commit secret keys in client-side code.",
          "Show a helpful setup message when config is missing."
        ]
      }
    ],
    activity: {
      type: "ts-react-component",
      id: "activity-deploy-config-panel",
      title: "Fix a config-driven data panel",
      prompt: "Replace hard-coded config with a clear public config object and fallback UI.",
      starterCode: `import React from "react";\n\nexport default function App() {\n  const apiUrl = "https://api.example.com/projects";\n\n  return (\n    <main className="board">\n      <section className="project-card">\n        <p className="status">Production config</p>\n        <h2>Project API</h2>\n        <p>Loading from {apiUrl}</p>\n      </section>\n    </main>\n  );\n}`,
      fakeFileName: "App.tsx",
      previewComponentName: "App",
      instructions: [
        "Create a mock public env/config object.",
        "Use a clear name such as `VITE_PUBLIC_API_URL`.",
        "Render fallback UI when config is missing.",
        "Do not put a secret key in frontend code."
      ],
      solutionCode: `import React from "react";\n\ntype PublicConfig = {\n  VITE_PUBLIC_API_URL?: string;\n};\n\nconst publicConfig: PublicConfig = {\n  VITE_PUBLIC_API_URL: "https://api.example.com/projects"\n};\n\nexport default function App() {\n  const apiUrl = publicConfig.VITE_PUBLIC_API_URL;\n\n  if (!apiUrl) {\n    return (\n      <main className="board">\n        <section className="project-card error-state">\n          <h2>Configuration missing</h2>\n          <p>Add VITE_PUBLIC_API_URL in the deploy settings before sharing this project.</p>\n        </section>\n      </main>\n    );\n  }\n\n  return (\n    <main className="board">\n      <section className="project-card">\n        <p className="status">Production config</p>\n        <h2>Project API</h2>\n        <p>Using public API URL: {apiUrl}</p>\n      </section>\n    </main>\n  );\n}`,
      previewDescription: "Expected UI: a project API panel renders from a named public config value and includes fallback copy for missing config.",
      hints: [
        "Use a mock object like `const publicConfig = { VITE_PUBLIC_API_URL: \"...\" }`.",
        "Check for a missing value before rendering the happy path.",
        "Frontend config is public; avoid words like `SECRET_KEY`."
      ],
      checks: [
        { id: "config-object", label: "Config object exists", pattern: "(publicConfig|env|config)\\s*[:=]", message: "Create a named config or env-style object." },
        { id: "public-name", label: "Public frontend naming is used", pattern: "VITE_(PUBLIC_)?[A-Z0-9_]+", message: "Use a Vite-style public config name." },
        { id: "fallback", label: "Fallback UI exists", pattern: "(if\\s*\\(!|\\?\\s*\\(|Configuration missing|config.*missing)", message: "Handle missing configuration." },
        { id: "helpful-error", label: "Helpful config error text exists", pattern: "(Configuration missing|Add VITE|deploy settings|missing config)", message: "Tell the reviewer what is missing." },
        { id: "no-secret", label: "No secret key pattern is encouraged", pattern: "^(?![\\s\\S]*(SECRET_KEY|PRIVATE_KEY|API_SECRET))[\\s\\S]*$", message: "Do not put secrets in frontend code." }
      ],
      renderedChecks: [
        { type: "text-includes", id: "config-panel-renders", label: "Config panel renders", text: "Project API", message: "Render a config-driven panel." },
        { type: "text-includes", id: "public-url-renders", label: "Public URL appears", text: "api.example.com", message: "Show the public config value in the preview." }
      ],
      xp: 130
    },
    nextLessonSlug: "debugging-failed-builds-and-broken-deploys"
  },
  {
    id: "lesson-deploy-debugging",
    slug: "debugging-failed-builds-and-broken-deploys",
    title: "Debugging Failed Builds and Broken Deploys",
    duration: "55 min",
    objectives: [
      "Read fake production symptoms without panic.",
      "Choose where to inspect first.",
      "Verify fixes with a build, preview, or browser check."
    ],
    sections: [
      {
        title: "Debugging is part of shipping",
        paragraphs: [
          "A failed deploy is a product-quality signal. The job is to read the symptom, inspect the most likely place first, and verify the fix instead of guessing.",
          "Most beginner production issues are ordinary: wrong paths, missing env vars, route mismatches, API errors, or build command mismatch."
        ]
      }
    ],
    activity: {
      type: "debugging-scenarios",
      id: "activity-deploy-debugging-scenarios",
      title: "Diagnose deploy issues",
      prompt: "For each fake production issue, choose the likely cause, where to look first, and how to verify the fix.",
      scenarios: [
        {
          id: "missing-import",
          title: "Build fails on import",
          issue: "Deploy log: `Module not found: Can't resolve './Projectcard'`.",
          causeOptions: ["Missing or case-mismatched import", "Slow hosting region", "Too many CSS variables"],
          stepOptions: ["Open the file named in the build log", "Change the brand color", "Clear browser history"],
          verificationOptions: ["Rerun `npm run build`", "Add a screenshot", "Rename the GitHub repo"],
          answer: { cause: "Missing or case-mismatched import", step: "Open the file named in the build log", verification: "Rerun `npm run build`" },
          explanation: "The build log points to an import path issue. Fix the path, then build again."
        },
        {
          id: "wrong-image",
          title: "Hero image missing after deploy",
          issue: "The local preview shows the image, but production shows a broken image icon.",
          causeOptions: ["Wrong image path or asset location", "Button has no hover state", "README is too short"],
          stepOptions: ["Inspect the image URL and public assets path", "Rewrite all components", "Disable TypeScript"],
          verificationOptions: ["Open the deployed URL and confirm the image loads", "Run only the dev server", "Delete the deployment"],
          answer: { cause: "Wrong image path or asset location", step: "Inspect the image URL and public assets path", verification: "Open the deployed URL and confirm the image loads" },
          explanation: "Missing production images usually start with a path or public assets check."
        },
        {
          id: "missing-env",
          title: "Configured panel fails in production",
          issue: "The deploy preview says `Configuration missing`, but local dev works.",
          causeOptions: ["Environment variable missing in hosting settings", "CSS border radius is too small", "Package name is private"],
          stepOptions: ["Check deploy environment variables", "Change the font stack", "Open the design file"],
          verificationOptions: ["Redeploy and confirm the configured UI loads", "Run a color contrast check only", "Close the PR"],
          answer: { cause: "Environment variable missing in hosting settings", step: "Check deploy environment variables", verification: "Redeploy and confirm the configured UI loads" },
          explanation: "If config works locally but not after deploy, inspect hosting env vars first."
        },
        {
          id: "route-404",
          title: "Shared route returns 404",
          issue: "The homepage works, but `/dashboard` is a 404 in production.",
          causeOptions: ["Route or hosting fallback mismatch", "Unused import", "Motion token missing"],
          stepOptions: ["Check route file names and hosting fallback behavior", "Reinstall your editor", "Change button text"],
          verificationOptions: ["Open the exact deployed route after redeploy", "Only check localhost", "Archive the repo"],
          answer: { cause: "Route or hosting fallback mismatch", step: "Check route file names and hosting fallback behavior", verification: "Open the exact deployed route after redeploy" },
          explanation: "Broken production routes need exact URL verification, not just a homepage check."
        },
        {
          id: "api-error",
          title: "Data request fails",
          issue: "The UI loads, but the project list shows an API error message.",
          causeOptions: ["API request or configured API URL is failing", "The README has too many sections", "Focus state is visible"],
          stepOptions: ["Check browser console/network and config value", "Remove all loading states", "Rename every component"],
          verificationOptions: ["Retry the deployed UI and confirm data or useful error state", "Change the hero headline", "Commit without testing"],
          answer: { cause: "API request or configured API URL is failing", step: "Check browser console/network and config value", verification: "Retry the deployed UI and confirm data or useful error state" },
          explanation: "Data failures should be traced through console/network clues and config."
        },
        {
          id: "build-command",
          title: "Deploy platform cannot build",
          issue: "Deploy settings run `npm run production`, but the project only has `npm run build`.",
          causeOptions: ["Build command mismatch", "Image alt text missing", "Too much whitespace"],
          stepOptions: ["Check package scripts and deploy build command", "Change the deployment URL", "Delete package-lock"],
          verificationOptions: ["Redeploy and confirm build logs show success", "Only open Figma", "Skip the README"],
          answer: { cause: "Build command mismatch", step: "Check package scripts and deploy build command", verification: "Redeploy and confirm build logs show success" },
          explanation: "The hosting tool must run a command that actually exists in package scripts."
        }
      ],
      hints: ["Start from the symptom, then choose the first place with evidence: build log, asset path, env settings, route, network, or package scripts."],
      xp: 120
    },
    nextLessonSlug: "release-checklist-and-project-readme"
  },
  {
    id: "lesson-deploy-release-readme",
    slug: "release-checklist-and-project-readme",
    title: "Release Checklist and Project README",
    duration: "60 min",
    objectives: [
      "Plan a README that helps designers, engineers, and hiring teams inspect the project.",
      "Document setup, quality checks, screenshots, and known limitations.",
      "Use a release checklist before sharing."
    ],
    sections: [
      {
        title: "Documentation is part of shipped quality",
        paragraphs: [
          "A reviewer should not have to reverse-engineer why the project exists, what changed, how to run it, or what quality checks were done.",
          "A good README is a product surface for your work: summary, demo link, screenshots, stack, setup, accessibility notes, performance notes, design decisions, and honest limitations."
        ]
      }
    ],
    activity: {
      type: "release-readme",
      id: "activity-deploy-release-readme",
      title: "Create a release README plan",
      prompt: "Write the README and release checklist details a reviewer would need before capstone.",
      fields: [
        { id: "projectName", label: "Project name", placeholder: "Project Dashboard", minLength: 3 },
        { id: "summary", label: "One-sentence summary", placeholder: "A data-driven dashboard for reviewing project status and quality checks.", minLength: 30 },
        { id: "liveDemoUrl", label: "Live demo URL", placeholder: "https://your-project.vercel.app", minLength: 12 },
        { id: "githubRepoUrl", label: "GitHub repo URL", placeholder: "https://github.com/your-name/project", minLength: 12 },
        { id: "techStack", label: "Tech stack", placeholder: "Vite, React, TypeScript, CSS", minLength: 12 },
        { id: "features", label: "Key features", placeholder: "Reusable cards, loading/error states, search, release checklist...", minLength: 35 },
        { id: "setupSteps", label: "Setup steps", placeholder: "npm install, npm run dev, npm run build, npm run preview", minLength: 35 },
        { id: "accessibilityNotes", label: "Accessibility notes", placeholder: "Keyboard check, labels, focus states, reduced motion...", minLength: 35 },
        { id: "performanceNotes", label: "Performance notes", placeholder: "Image sizing, production build, no unnecessary layout shifts...", minLength: 35 },
        { id: "knownLimitations", label: "Known limitations", placeholder: "What is intentionally out of scope or still rough?", minLength: 25 },
        { id: "releaseChecklist", label: "Release checklist", placeholder: "Build passes, deployed URL works, mobile checked, keyboard checked, README updated...", minLength: 45 },
        { id: "reviewerNote", label: "Reviewer note", placeholder: "What should a hiring manager or engineer inspect first?", minLength: 35 }
      ],
      checklist: [
        "Project summary is clear",
        "Live demo and repo URLs are included",
        "Setup instructions are usable",
        "Accessibility and performance notes are included",
        "Known limitations are honest",
        "Release checklist is complete"
      ],
      xp: 120
    }
  }
];

const capstoneLessons: Lesson[] = [
  {
    id: "lesson-capstone-studio",
    slug: "build-a-review-ready-product-dashboard",
    title: "Build a Review-Ready Product Dashboard",
    duration: "Final assessment",
    objectives: [
      "Build, document, deploy, and present a review-ready product dashboard.",
      "Prove junior design engineer readiness across product UI, systems, accessibility, data, motion, and production workflow.",
      "Create a portfolio artifact with clear design and technical rationale."
    ],
    sections: [
      {
        title: "This is the final proof",
        paragraphs: [
          "The capstone is not another small exercise. It is the integrated project that shows you can work like a junior design engineer: define the product surface, build reusable typed components, handle real UI states, ship the work, and explain the decisions.",
          "You will build a responsive product dashboard for a fictional design/product team. The dashboard helps a team track projects, statuses, owners, review stages, and recent activity."
        ],
        bulletPoints: [
          "Use GitHub, React, TypeScript, tokens, mock data, state, accessibility, motion, deployment, and documentation.",
          "Keep Storybook optional for this MVP because it has not been fully taught as an integrated tool yet.",
          "Treat the final output as a portfolio artifact a hiring team can inspect."
        ]
      }
    ],
    activity: {
      type: "capstone-milestones",
      id: "activity-capstone-review-ready-dashboard",
      title: "Build a Review-Ready Product Dashboard",
      prompt: "Complete the six capstone milestones, submit the final artifact, and self-review against the hireability rubric.",
      brief:
        "Build a responsive product dashboard for a fictional design/product team. The interface should help a team track projects, statuses, owners, review stages, and recent activity.",
      requirements: [
        {
          title: "Core product surface",
          items: [
            "Dashboard overview",
            "Project list, cards, or table",
            "Filtering/search",
            "Project status states",
            "Loading, empty, error, and success states",
            "Add/edit project form or modal",
            "Settings/preferences panel or theme toggle",
            "Feedback micro-interaction",
            "Toast, notification, or confirmation pattern"
          ]
        },
        {
          title: "Design-system requirements",
          items: [
            "Token definitions and semantic tokens",
            "Light/dark or themed surface",
            "Typed Button component",
            "Typed input/form component",
            "Typed card/status component",
            "Explicit component states",
            "Reusable component APIs",
            "Component documentation notes"
          ]
        },
        {
          title: "Production documentation",
          items: [
            "GitHub repo and deployed URL",
            "README/release note",
            "Setup instructions",
            "Accessibility and performance notes",
            "Known limitations",
            "Design and technical rationale",
            "Final case-study reflection"
          ]
        }
      ],
      milestones: [
        {
          id: "brief-state-model",
          title: "Product Brief and State Model",
          description: "Define the product surface before writing production code.",
          fields: [
            { id: "m1SurfaceName", label: "Product surface name", placeholder: "Project Review Dashboard", minLength: 5 },
            { id: "m1TargetUser", label: "Target user", placeholder: "Design leads, product designers, PMs...", minLength: 20 },
            { id: "m1Job", label: "Primary job-to-be-done", placeholder: "Help the team understand what needs review next...", minLength: 30 },
            { id: "m1Sections", label: "Key screens/sections", placeholder: "Overview, project list, activity feed, settings...", minLength: 30 },
            { id: "m1DataObjects", label: "Core data objects", placeholder: "Project, owner, status, stage, activity item...", minLength: 30 },
            { id: "m1Loading", label: "Loading state", placeholder: "What appears while project data loads?", minLength: 20 },
            { id: "m1Empty", label: "Empty state", placeholder: "What appears when there are no projects?", minLength: 20 },
            { id: "m1Error", label: "Error state", placeholder: "What appears when data fails?", minLength: 20 },
            { id: "m1Success", label: "Success state", placeholder: "What does the happy path show?", minLength: 20 },
            { id: "m1Saving", label: "Saving state", placeholder: "What happens when the form is saving?", minLength: 20 },
            { id: "m1EdgeCases", label: "Edge cases", placeholder: "No results, long names, missing owner, offline/error...", minLength: 35 }
          ]
        },
        {
          id: "tokens-component-plan",
          title: "Tokens and Component Plan",
          description: "Plan the coded system that keeps the dashboard consistent.",
          fields: [
            { id: "m2ColorTokens", label: "Color tokens", placeholder: "Raw color tokens and intended use.", minLength: 25 },
            { id: "m2SemanticTokens", label: "Semantic tokens", placeholder: "surface, text, border, action, status...", minLength: 35 },
            { id: "m2SpacingTokens", label: "Spacing tokens", placeholder: "space-card-padding, space-stack-gap...", minLength: 20 },
            { id: "m2RadiusTokens", label: "Radius tokens", placeholder: "radius-card, radius-control...", minLength: 20 },
            { id: "m2TypographyTokens", label: "Typography tokens", placeholder: "heading, body, label, metadata...", minLength: 20 },
            { id: "m2MotionTokens", label: "Motion tokens", placeholder: "duration-fast, duration-normal, ease-standard...", minLength: 25 },
            { id: "m2Components", label: "At least three component plans", placeholder: "Button variants/states; TextField states; StatusCard variants...", minLength: 70 },
            { id: "m2Variants", label: "Component variants", placeholder: "primary/secondary/ghost, status values, sizes...", minLength: 35 },
            { id: "m2States", label: "Component states", placeholder: "default, hover, focus, disabled, loading, error, empty...", minLength: 35 }
          ]
        },
        {
          id: "repo-setup",
          title: "Build Plan and Repo Setup",
          description: "Set up the project so engineering reviewers can inspect and run it.",
          fields: [
            { id: "m3GithubUrl", label: "GitHub repo URL", placeholder: "https://github.com/your-name/capstone", minLength: 12, inputType: "url" },
            { id: "m3TechStack", label: "Planned tech stack", placeholder: "Vite, React, TypeScript, CSS...", minLength: 20 },
            { id: "m3SetupCommand", label: "Local setup command", placeholder: "npm install", minLength: 8 },
            { id: "m3BuildCommand", label: "Build command", placeholder: "npm run build", minLength: 8 },
            { id: "m3Workflow", label: "Branch/PR workflow note", placeholder: "I will work on a feature branch and open a PR for review...", minLength: 35 },
            { id: "m3FirstCommit", label: "First milestone commit note", placeholder: "Initial project scaffold with README and component plan...", minLength: 30 }
          ]
        },
        {
          id: "implementation-checklist",
          title: "Implementation Checklist",
          description: "Confirm the product UI and core system pieces are built.",
          fields: [
            { id: "m4ImplementationNote", label: "Implementation note", placeholder: "What is built, what changed, and what still needs polish?", minLength: 45 }
          ],
          checklist: [
            "Project list/dashboard built",
            "Reusable components built",
            "Typed props used",
            "Mock data/API used",
            "Loading state implemented",
            "Empty state implemented",
            "Error state implemented",
            "Search/filter implemented",
            "Form or modal implemented",
            "Accessibility pass completed",
            "Motion/reduced-motion pass completed"
          ]
        },
        {
          id: "deployment-release",
          title: "Deployment and Release",
          description: "Ship the project and document production quality checks.",
          fields: [
            { id: "m5DeployedUrl", label: "Deployed URL", placeholder: "https://capstone.vercel.app", minLength: 12, inputType: "url" },
            { id: "m5BuildCommand", label: "Production build command", placeholder: "npm run build", minLength: 8 },
            { id: "m5ReleaseChecklist", label: "Release checklist", placeholder: "Build passes, deployed URL works, mobile checked...", minLength: 45 },
            { id: "m5A11y", label: "Accessibility check note", placeholder: "Keyboard, labels, focus, non-color cues...", minLength: 35 },
            { id: "m5Performance", label: "Performance check note", placeholder: "Image sizing, layout shifts, loading states...", minLength: 35 },
            { id: "m5Limitations", label: "Known limitations", placeholder: "What is honest and intentionally out of scope?", minLength: 30 },
            { id: "m5Readme", label: "README/release note link or summary", placeholder: "Link or summary of README/release notes.", minLength: 35 }
          ]
        },
        {
          id: "case-study-reflection",
          title: "Case Study and Final Reflection",
          description: "Explain the design and engineering decisions behind the artifact.",
          fields: [
            { id: "m6Summary", label: "Project summary", placeholder: "What did you build?", minLength: 35 },
            { id: "m6Context", label: "Problem/context", placeholder: "What product problem does this dashboard solve?", minLength: 45 },
            { id: "m6DesignSystem", label: "Design-system decisions", placeholder: "Tokens, components, variants, states...", minLength: 45 },
            { id: "m6Technical", label: "Technical decisions", placeholder: "React structure, TypeScript, mock API, state...", minLength: 45 },
            { id: "m6A11y", label: "Accessibility improvements", placeholder: "Labels, focus, keyboard, reduced motion...", minLength: 35 },
            { id: "m6StateData", label: "State/data decisions", placeholder: "Loading, error, empty, search, form state...", minLength: 35 },
            { id: "m6Motion", label: "Motion decisions", placeholder: "Feedback, toast, transition purpose...", minLength: 35 },
            { id: "m6Screenshots", label: "Screenshots placeholder", placeholder: "What screenshots or before/after views will you include?", minLength: 25 },
            { id: "m6ImproveNext", label: "What would you improve next?", placeholder: "What would change with more time?", minLength: 35 },
            { id: "m6Reflection", label: "Final reflection", placeholder: "What does this prove about your design engineering readiness?", minLength: 45 }
          ]
        }
      ],
      finalSubmissionFields: [
        { id: "finalGithubUrl", label: "Final submission GitHub repo URL", placeholder: "https://github.com/your-name/capstone", minLength: 12, inputType: "url" },
        { id: "finalDeployedUrl", label: "Final submission deployed URL", placeholder: "https://capstone.vercel.app", minLength: 12, inputType: "url" },
        { id: "finalReadme", label: "Final README/release note URL or summary", placeholder: "Link or concise release summary.", minLength: 35 },
        { id: "finalCaseStudy", label: "Final case study summary", placeholder: "Summarize problem, decisions, implementation, and outcome.", minLength: 60 },
        { id: "finalReflection", label: "Final capstone reflection", placeholder: "What this project proves and what you would improve next.", minLength: 60 }
      ],
      optionalSubmissionFields: [
        { id: "optionalStorybook", label: "Storybook URL (optional)", placeholder: "Optional for MVP.", minLength: 0, inputType: "url" },
        { id: "optionalFigma", label: "Figma URL (optional)", placeholder: "Optional handoff or design source.", minLength: 0, inputType: "url" },
        { id: "optionalPr", label: "PR URL (optional)", placeholder: "Optional pull request link.", minLength: 0, inputType: "url" },
        { id: "optionalScreenshot", label: "Screenshot link (optional)", placeholder: "Optional screenshot folder or image link.", minLength: 0, inputType: "url" },
        { id: "optionalVideo", label: "Loom/video walkthrough URL (optional)", placeholder: "Optional walkthrough.", minLength: 0, inputType: "url" }
      ],
      rubric: [
        { id: "product", title: "Product quality", criteria: ["Clear product surface", "Useful states", "Realistic interaction flow", "Edge cases handled"] },
        { id: "visualSystem", title: "Visual/design-system quality", criteria: ["Tokens and semantic tokens used", "Reusable components", "Variants and states explicit", "Consistent spacing/type/color"] },
        { id: "technical", title: "Technical quality", criteria: ["React components are structured", "TypeScript props are typed", "Mock data/API works", "Search/filter and form state work", "Code is readable"] },
        { id: "capstoneAccessibility", title: "Accessibility quality", criteria: ["Semantic HTML", "Labels and accessible names", "Keyboard usability", "Visible focus states", "Non-color cues", "Reduced-motion handling"] },
        { id: "production", title: "Production quality", criteria: ["Build documented", "Deployed URL works", "README useful", "Known limitations honest", "Release checklist complete"] },
        { id: "portfolio", title: "Portfolio quality", criteria: ["Case study explains decisions", "Screenshots/placeholders included", "Design and technical rationale included", "Reflection is specific"] }
      ],
      caseStudyChecklist: [
        "Problem/context is clear",
        "Design-system decisions are explained",
        "Technical rationale is understandable",
        "Accessibility, state/data, and motion decisions are included",
        "Screenshots or placeholders are planned",
        "Next improvements are honest"
      ],
      finalReviewChecklist: [
        "GitHub repo opens",
        "Deployed URL works",
        "README explains setup",
        "Build command is documented",
        "Keyboard and mobile checks are complete",
        "Known limitations are included",
        "Final reflection is specific"
      ],
      xp: 500
    }
  }
];

const careerPrepLessons: Lesson[] = [
  {
    id: "lesson-career-hireability-signals",
    slug: "what-makes-a-design-engineer-hireable",
    title: "What Makes a Design Engineer Hireable",
    duration: "30 min",
    objectives: [
      "Explain hireability as evidence, not claims.",
      "Identify the artifacts reviewers need to trust a junior design engineer.",
      "Translate completed projects into credible hiring signals."
    ],
    sections: [
      {
        title: "Evidence beats claims",
        paragraphs: [
          "A strong design-engineering portfolio does not say, “I learned React.” It shows shipped, reviewable work with design rationale, technical rationale, accessible states, readable code, and production documentation.",
          "You are positioning yourself as a designer who can implement real product UI, not as a senior engineer. The strongest signal is honest, specific proof."
        ],
        bulletPoints: [
          "Show deployed work, GitHub repos, README quality, and case studies.",
          "Explain component thinking, accessibility awareness, production workflow, and tradeoffs.",
          "Target junior design engineer, frontend designer, UI engineer, design systems engineer, and product-focused frontend roles."
        ]
      }
    ],
    activity: {
      type: "concept-check",
      id: "activity-career-hireability-concept-check",
      title: "Match the hiring signals",
      prompt: "Match each career-readiness term to the evidence a reviewer should see.",
      prompts: [
        {
          id: "career-artifact",
          prompt: "What is a portfolio artifact?",
          options: ["A reviewable piece of work with context, code, and outcome", "A list of tools you have heard of", "A private screenshot folder", "A generic course certificate"],
          answer: "A reviewable piece of work with context, code, and outcome",
          explanation: "A portfolio artifact lets reviewers inspect the work and understand the decisions behind it."
        },
        {
          id: "career-rationale",
          prompt: "What does technical rationale explain?",
          options: ["Why implementation choices were made", "Only the visual mood of a project", "A job title preference", "A list of colors"],
          answer: "Why implementation choices were made",
          explanation: "Technical rationale explains component, state, typing, accessibility, and production decisions."
        },
        {
          id: "career-proof",
          prompt: "What is production proof?",
          options: ["A deployed URL, repo, build notes, and release-ready documentation", "A promise that the project works locally", "A Figma thumbnail", "A hidden prototype"],
          answer: "A deployed URL, repo, build notes, and release-ready documentation",
          explanation: "Production proof makes the work easy for hiring teams and engineers to inspect."
        },
        {
          id: "career-tradeoff",
          prompt: "What is a tradeoff in a case study?",
          options: ["An honest decision about constraints, scope, or quality", "A weakness to hide", "A CSS property", "A job-board filter"],
          answer: "An honest decision about constraints, scope, or quality",
          explanation: "Tradeoffs show judgment. Junior candidates are stronger when they can explain what they chose and why."
        }
      ],
      hints: ["Think like a reviewer: what would make you trust that the learner can contribute to a product team?"],
      xp: 90
    },
    nextLessonSlug: "portfolio-structure"
  },
  {
    id: "lesson-career-portfolio-structure",
    slug: "portfolio-structure",
    title: "Portfolio Structure",
    duration: "45 min",
    objectives: [
      "Plan a portfolio that is more than a screenshot gallery.",
      "Feature the capstone and at least three supporting projects.",
      "Make project links, repos, skills, and contact paths easy to inspect."
    ],
    sections: [
      {
        title: "Package the proof",
        paragraphs: [
          "A design-engineering portfolio should explain what was built, why it matters, how it works, and what tradeoffs were made. It should work for a hiring manager, designer, or engineer who only has a few minutes.",
          "Your homepage should create a clear first impression, then route reviewers to the capstone, supporting projects, GitHub, resume, and contact links."
        ]
      }
    ],
    activity: {
      type: "career-readiness",
      id: "activity-career-portfolio-checklist",
      title: "Portfolio checklist",
      prompt: "Confirm the portfolio structure reviewers need before you start applying.",
      brief: "Plan the portfolio as a review-ready package: clear positioning, a featured capstone, supporting projects, links, skills, and contact paths.",
      requirements: [
        { title: "Portfolio standard", items: ["Clear homepage positioning", "Capstone featured", "At least three supporting projects", "Deployed and GitHub links", "Case-study summaries", "Contact path"] },
        { title: "Reviewer needs", items: ["Fast project scanning", "Design rationale", "Technical rationale", "Accessibility/performance note", "Mobile check"] },
        { title: "Local MVP note", items: ["Saved locally", "No file uploads yet", "No LinkedIn or job-board integration"] }
      ],
      milestones: [
        {
          id: "portfolio-checklist",
          title: "Portfolio Structure Checklist",
          description: "Document the visible portfolio pieces and check the required structure.",
          fields: [
            { id: "portfolioUrl", label: "Portfolio URL or placeholder", placeholder: "https://your-portfolio.dev or a planned placeholder URL.", minLength: 12, inputType: "url" },
            { id: "githubProfile", label: "GitHub profile URL", placeholder: "https://github.com/your-name", minLength: 12, inputType: "url" },
            { id: "supportingProjects", label: "Three supporting projects", placeholder: "List three projects with deployed URLs, GitHub URLs, and summary/case-study status.", minLength: 80 },
            { id: "portfolioNotes", label: "Portfolio positioning notes", placeholder: "Headline, short bio, skills, contact links, resume link/placeholder, accessibility/performance note.", minLength: 80 }
          ],
          checklist: [
            "Headline/value proposition exists",
            "Short bio exists",
            "Capstone is featured",
            "At least 3 supporting projects are included",
            "Each project has deployed URL",
            "Each project has GitHub URL",
            "Each project has case study or summary",
            "Skills section exists",
            "Contact links exist",
            "Resume link or placeholder exists",
            "GitHub profile link exists",
            "Accessibility/performance note exists",
            "Mobile check completed"
          ]
        }
      ],
      finalSubmissionFields: [],
      optionalSubmissionFields: [],
      rubric: [],
      caseStudyChecklist: ["Featured capstone", "Three supporting projects", "Project links", "Skills and contact paths"],
      finalReviewChecklist: ["Homepage makes the role target clear", "Links are easy to find", "Mobile view is checked"],
      xp: 120
    },
    nextLessonSlug: "writing-a-capstone-case-study"
  },
  {
    id: "lesson-career-capstone-case-study",
    slug: "writing-a-capstone-case-study",
    title: "Writing a Capstone Case Study",
    duration: "60 min",
    objectives: [
      "Turn the capstone into a specific product/design-engineering story.",
      "Explain design-system, technical, accessibility, data, motion, and deployment decisions.",
      "Avoid tutorial-recapping and write for reviewers."
    ],
    sections: [
      {
        title: "Write the story of the work",
        paragraphs: [
          "The capstone case study is the strongest proof artifact. It should explain context, constraints, your role, decisions, tradeoffs, and what you would improve next.",
          "Do not write it like a lesson recap. Write it like a real product story a design lead and frontend engineer can both understand."
        ]
      }
    ],
    activity: {
      type: "career-readiness",
      id: "activity-career-case-study-builder",
      title: "Capstone case study builder",
      prompt: "Draft the structured case study content reviewers need.",
      brief: "Build the capstone case study from specific decisions, not generic process language.",
      requirements: [
        { title: "Case study structure", items: ["Context", "Problem", "Role", "Constraints", "Design and technical decisions", "Tradeoffs", "Next improvements"] },
        { title: "Design-engineering proof", items: ["Tokens/components", "TypeScript APIs", "State/data", "Accessibility", "Motion", "Deployment"] },
        { title: "Tone standard", items: ["Specific", "Honest", "Review-ready", "Not inflated"] }
      ],
      milestones: [
        {
          id: "capstone-case-study-builder",
          title: "Capstone Case Study Builder",
          description: "Complete the core case-study fields with meaningful detail.",
          fields: [
            { id: "caseTitle", label: "Title", placeholder: "Review-ready product dashboard capstone", minLength: 10 },
            { id: "caseSummary", label: "One-sentence project summary", placeholder: "I built...", minLength: 35 },
            { id: "caseContext", label: "Problem/context", placeholder: "The team needed...", minLength: 60 },
            { id: "caseUser", label: "Target user", placeholder: "Who this product surface is for.", minLength: 30 },
            { id: "caseRole", label: "Your role", placeholder: "What you designed and implemented.", minLength: 35 },
            { id: "caseConstraints", label: "Constraints", placeholder: "Time, scope, mock data, no backend, MVP assumptions...", minLength: 45 },
            { id: "caseSystem", label: "Design-system decisions", placeholder: "Tokens, semantic naming, components, variants, states...", minLength: 60 },
            { id: "caseComponentApi", label: "Component/API decisions", placeholder: "Button/input/status APIs, props, variants, states...", minLength: 60 },
            { id: "caseTypescript", label: "TypeScript decisions", placeholder: "Typed props, union variants, typed data/state...", minLength: 45 },
            { id: "caseData", label: "Data/state decisions", placeholder: "Loading, empty, error, search/filter, form/saving...", minLength: 60 },
            { id: "caseA11y", label: "Accessibility improvements", placeholder: "Labels, focus, keyboard, non-color cues, reduced motion...", minLength: 45 },
            { id: "caseMotion", label: "Motion/polish choices", placeholder: "Feedback, transition purpose, reduced-motion handling...", minLength: 45 },
            { id: "caseDeploy", label: "Deployment/release notes", placeholder: "Build, deployed URL, README, quality checks...", minLength: 45 },
            { id: "caseTradeoffs", label: "Tradeoffs", placeholder: "What you chose, what you deferred, and why.", minLength: 45 },
            { id: "caseLimitations", label: "Known limitations", placeholder: "What is honest and unfinished.", minLength: 35 },
            { id: "caseImprove", label: "What you would improve next", placeholder: "Next refinements after the MVP.", minLength: 45 },
            { id: "caseFinal", label: "Final case study summary", placeholder: "The concise version a reviewer should remember.", minLength: 60 }
          ]
        }
      ],
      finalSubmissionFields: [],
      optionalSubmissionFields: [],
      rubric: [],
      caseStudyChecklist: ["Specific project story", "Design rationale", "Technical rationale", "Tradeoffs", "Next improvements"],
      finalReviewChecklist: ["Not a tutorial recap", "Screenshots/placeholders planned", "Readable by designers and engineers"],
      xp: 160
    },
    nextLessonSlug: "github-readme-and-repo-review"
  },
  {
    id: "lesson-career-repo-readiness",
    slug: "github-readme-and-repo-review",
    title: "GitHub, README, and Repo Review",
    duration: "45 min",
    objectives: [
      "Audit GitHub repos as part of the portfolio.",
      "Check README quality, setup instructions, deployment links, and known limitations.",
      "Make repos feel reviewable instead of like messy scratchpads."
    ],
    sections: [
      {
        title: "GitHub is part of the portfolio",
        paragraphs: [
          "Engineers will inspect structure, naming, README quality, commits, setup instructions, and deployment links. A repo should help reviewers understand the work quickly.",
          "A readable repo does not need to be perfect. It needs to be honest, organized, and easy to run."
        ]
      }
    ],
    activity: {
      type: "career-readiness",
      id: "activity-career-repo-readiness",
      title: "Repo readiness checklist",
      prompt: "Check the capstone repo and profile for review readiness.",
      brief: "Make GitHub support the portfolio rather than undermine it.",
      requirements: [
        { title: "Repo quality", items: ["Public/reviewable", "README", "Setup", "Build command", "Features", "Known limitations"] },
        { title: "Reviewer confidence", items: ["Meaningful commits", "Readable names", "No obvious dead files", "Deployment link works"] },
        { title: "Proof links", items: ["GitHub profile", "Capstone repo", "Deployed capstone", "README/release note"] }
      ],
      milestones: [
        {
          id: "repo-readiness",
          title: "Repo Readiness Checklist",
          description: "Confirm the capstone repo is understandable and reviewable.",
          fields: [
            { id: "repoGithubProfile", label: "GitHub profile URL", placeholder: "https://github.com/your-name", minLength: 12, inputType: "url" },
            { id: "repoCapstone", label: "Capstone repo URL", placeholder: "https://github.com/your-name/capstone", minLength: 12, inputType: "url" },
            { id: "repoDeploy", label: "Capstone deployed URL", placeholder: "https://capstone.vercel.app", minLength: 12, inputType: "url" },
            { id: "repoReadme", label: "README/release note URL or summary", placeholder: "Link or summarize the README/release note.", minLength: 45 }
          ],
          checklist: [
            "Repo is public or reviewable",
            "README exists",
            "Project summary included",
            "Live demo URL included",
            "Screenshots or placeholders included",
            "Tech stack listed",
            "Setup instructions included",
            "Build command included",
            "Features listed",
            "Accessibility notes included",
            "Performance notes included",
            "Known limitations included",
            "Meaningful commits exist",
            "Folder/file names are readable",
            "No obvious dead files or unused experiments",
            "Deployment link works"
          ]
        }
      ],
      finalSubmissionFields: [],
      optionalSubmissionFields: [],
      rubric: [],
      caseStudyChecklist: ["README quality", "Setup instructions", "Deployment link", "Known limitations"],
      finalReviewChecklist: ["Repo can be inspected quickly", "Commit history shows progress"],
      xp: 130
    },
    nextLessonSlug: "resume-linkedin-and-positioning"
  },
  {
    id: "lesson-career-positioning",
    slug: "resume-linkedin-and-positioning",
    title: "Resume, LinkedIn, and Positioning",
    duration: "50 min",
    objectives: [
      "Position as a designer who can implement without overclaiming.",
      "Write project bullets that point to proof.",
      "Prepare resume and LinkedIn language around design engineering."
    ],
    sections: [
      {
        title: "Credible positioning",
        paragraphs: [
          "Your positioning should be honest: product/UI designer moving into design engineering, frontend UI implementation, design systems, and interaction quality.",
          "The resume should point to shipped artifacts: responsive React/TypeScript interfaces, token-based components, state handling, accessibility work, deployment, and documentation."
        ]
      }
    ],
    activity: {
      type: "career-readiness",
      id: "activity-career-positioning-builder",
      title: "Positioning builder",
      prompt: "Draft role positioning, resume bullets, and LinkedIn copy.",
      brief: "Turn the curriculum into credible language reviewers can trust.",
      requirements: [
        { title: "Role target", items: ["Junior design engineer", "Frontend designer", "UI engineer", "Design systems engineer", "Product-focused frontend role"] },
        { title: "Resume proof", items: ["Project bullets", "Technical skills", "Design skills", "Links"] },
        { title: "Honest positioning", items: ["No senior overclaiming", "Clear transition story", "Skill area still strengthening"] }
      ],
      milestones: [
        {
          id: "positioning-builder",
          title: "Positioning Builder",
          description: "Write the career copy that turns the work into a credible application package.",
          fields: [
            { id: "targetRoles", label: "Target role titles", placeholder: "Junior design engineer, frontend designer, UI engineer...", minLength: 25 },
            { id: "positioningLine", label: "One-line positioning statement", placeholder: "Product/UI designer building review-ready React/TypeScript interfaces...", minLength: 45 },
            { id: "portfolioBio", label: "Short portfolio bio", placeholder: "Two to four sentences about your design + implementation focus.", minLength: 80 },
            { id: "resumeBullet1", label: "Resume project bullet 1", placeholder: "Built and deployed...", minLength: 45 },
            { id: "resumeBullet2", label: "Resume project bullet 2", placeholder: "Implemented typed components...", minLength: 45 },
            { id: "resumeBullet3", label: "Resume project bullet 3", placeholder: "Improved accessibility/state/deployment...", minLength: 45 },
            { id: "technicalSkills", label: "Technical skills list", placeholder: "HTML, CSS, JavaScript, React, TypeScript, Git, deployment...", minLength: 45 },
            { id: "designSkills", label: "Design skills list", placeholder: "Figma, design systems, interaction design, accessibility, prototyping...", minLength: 45 },
            { id: "linkedinHeadline", label: "LinkedIn headline", placeholder: "Product/UI Designer moving into Design Engineering...", minLength: 35 },
            { id: "linkedinAbout", label: "LinkedIn about summary", placeholder: "A concise transition story with project proof.", minLength: 90 },
            { id: "strengthening", label: "Currently strengthening skill area", placeholder: "For example: deeper testing, Storybook, larger codebases...", minLength: 30 }
          ]
        }
      ],
      finalSubmissionFields: [],
      optionalSubmissionFields: [],
      rubric: [],
      caseStudyChecklist: ["Target roles are clear", "Resume bullets point to artifacts", "LinkedIn copy is honest"],
      finalReviewChecklist: ["No inflated senior claims", "Proof links are ready to add"],
      xp: 140
    },
    nextLessonSlug: "interview-stories-and-final-hireability-audit"
  },
  {
    id: "lesson-career-final-audit",
    slug: "interview-stories-and-final-hireability-audit",
    title: "Interview Stories and Final Hireability Audit",
    duration: "70 min",
    objectives: [
      "Prepare interview stories around real capstone decisions.",
      "Complete a final honest readiness audit.",
      "Submit the final portfolio package without implying a guaranteed job."
    ],
    sections: [
      {
        title: "Explain decisions, not definitions",
        paragraphs: [
          "Hiring conversations test whether you can explain your work: why a component API exists, how states were handled, what accessibility issue you fixed, how deployment was checked, and what tradeoffs remain.",
          "The final audit is honest: not ready yet, almost ready, or ready to apply. It is not a promise of employment. It is a way to decide what proof is strong enough to share."
        ]
      }
    ],
    activity: {
      type: "career-readiness",
      id: "activity-career-final-readiness",
      title: "Final portfolio package and hireability audit",
      prompt: "Prepare interview stories, complete the readiness audit, submit your final portfolio package, and self-review the application standard.",
      brief: "This is the final launchpad: package your proof, prepare your stories, and honestly assess application readiness.",
      requirements: [
        { title: "Interview stories", items: ["Capstone story", "Component API", "TypeScript", "State/data", "Accessibility", "Motion", "Deployment", "Tradeoff"] },
        { title: "Final audit", items: ["Portfolio", "Technical proof", "Design engineering proof", "Communication", "Readiness status"] },
        { title: "Final package", items: ["Portfolio URL/placeholder", "Case study", "GitHub profile", "Resume placeholder", "Target roles", "Readiness statement"] }
      ],
      milestones: [
        {
          id: "interview-stories",
          title: "Interview Story Builder",
          description: "Answer the prompts you should be ready to discuss in hiring conversations.",
          fields: [
            { id: "storyCapstone", label: "Tell me about your capstone.", placeholder: "Explain the product surface, user, and outcome.", minLength: 60 },
            { id: "storyComponentApi", label: "Explain a component API you designed.", placeholder: "Props, variants, constraints, and why.", minLength: 55 },
            { id: "storyTypescript", label: "Explain a TypeScript decision.", placeholder: "Typed props, union variants, typed data/state...", minLength: 45 },
            { id: "storyData", label: "Explain a data/loading/error state decision.", placeholder: "Loading, empty, error, retry, search/filter, form state.", minLength: 55 },
            { id: "storyA11y", label: "Explain an accessibility fix.", placeholder: "Labels, focus, keyboard, contrast, non-color cues...", minLength: 45 },
            { id: "storyMotion", label: "Explain a motion/polish decision.", placeholder: "Feedback, continuity, reduced motion, performance-safe properties.", minLength: 45 },
            { id: "storyDeploy", label: "Explain a deployment problem or risk.", placeholder: "Build, deploy logs, config, README, release checks...", minLength: 45 },
            { id: "storyTradeoff", label: "Explain a tradeoff.", placeholder: "What you chose, what you deferred, and why.", minLength: 45 },
            { id: "storyImprove", label: "What would you improve next?", placeholder: "Be specific and honest.", minLength: 45 },
            { id: "storyRole", label: "What kind of role are you targeting?", placeholder: "Role titles and why they fit your current proof.", minLength: 35 }
          ]
        },
        {
          id: "hireability-audit",
          title: "Final Hireability Audit",
          description: "Check the final readiness categories and choose an honest readiness status.",
          fields: [
            { id: "auditPortfolio", label: "Portfolio audit note", placeholder: "Positioning, capstone, supporting projects, deployed links, case studies.", minLength: 60 },
            { id: "auditTechnical", label: "Technical audit note", placeholder: "React, TypeScript, data/state, tokens/components, GitHub repos.", minLength: 60 },
            { id: "auditDesignEngineering", label: "Design-engineering audit note", placeholder: "Visual craft, component thinking, accessibility, motion, production workflow.", minLength: 60 },
            { id: "auditCommunication", label: "Communication audit note", placeholder: "Case study readability, README quality, tradeoffs, interview stories, role target.", minLength: 60 },
            { id: "readinessStatus", label: "Final readiness status", placeholder: "not ready yet, almost ready, or ready to apply - with one sentence explaining why.", minLength: 35 }
          ],
          checklist: [
            "Portfolio has clear positioning",
            "Capstone is featured",
            "At least 3 supporting projects included",
            "Deployed links work",
            "Case studies explain decisions",
            "React components shown",
            "TypeScript props/variants shown",
            "Data/state handling shown",
            "Design tokens/components shown",
            "GitHub repos are reviewable",
            "Visual craft is strong",
            "Component thinking is clear",
            "Accessibility considered",
            "Motion/polish is purposeful",
            "Production/deployment workflow shown",
            "Case study is readable",
            "README is clear",
            "Tradeoffs are honest",
            "Interview stories are prepared",
            "Role target is clear"
          ]
        }
      ],
      finalSubmissionFields: [
        { id: "finalPortfolioUrl", label: "Portfolio URL or portfolio placeholder URL", placeholder: "https://your-portfolio.dev", minLength: 12, inputType: "url" },
        { id: "finalCareerCaseStudy", label: "Capstone case study URL or summary", placeholder: "Link or concise summary of the capstone case study.", minLength: 45 },
        { id: "finalGithubProfile", label: "GitHub profile URL", placeholder: "https://github.com/your-name", minLength: 12, inputType: "url" },
        { id: "finalResume", label: "Resume URL or resume placeholder", placeholder: "Link or note where the resume will live.", minLength: 20 },
        { id: "finalTargetRoles", label: "Target role titles", placeholder: "Junior design engineer, frontend designer, UI engineer...", minLength: 25 },
        { id: "finalReadinessStatement", label: "Final readiness statement", placeholder: "What your portfolio package proves and what you will keep refining.", minLength: 60 }
      ],
      optionalSubmissionFields: [
        { id: "optionalLinkedin", label: "LinkedIn URL (optional)", placeholder: "Optional LinkedIn profile.", minLength: 0, inputType: "url" },
        { id: "optionalCareerLoom", label: "Loom walkthrough URL (optional)", placeholder: "Optional walkthrough.", minLength: 0, inputType: "url" },
        { id: "optionalCareerFigma", label: "Figma profile/file URL (optional)", placeholder: "Optional Figma link.", minLength: 0, inputType: "url" },
        { id: "optionalProjects", label: "Additional project links (optional)", placeholder: "Optional extra links.", minLength: 0 }
      ],
      rubric: [
        { id: "portfolioQuality", title: "Portfolio quality", criteria: ["Clear homepage positioning", "Capstone featured", "Supporting projects included", "Deployed links visible", "Contact path clear"] },
        { id: "caseStudyQuality", title: "Case study quality", criteria: ["Problem/context clear", "Design rationale clear", "Technical rationale clear", "Tradeoffs honest", "Visuals/screenshots included or planned"] },
        { id: "repoQuality", title: "Code/repo quality", criteria: ["GitHub repos are reviewable", "READMEs useful", "Setup instructions present", "Deployment links included", "Known limitations documented"] },
        { id: "deQuality", title: "Design-engineering quality", criteria: ["Component systems shown", "TypeScript APIs shown", "Accessibility shown", "State/data handling shown", "Production workflow shown"] },
        { id: "interviewReadiness", title: "Interview readiness", criteria: ["Capstone story prepared", "Technical decisions explainable", "Design decisions explainable", "Tradeoffs explainable", "Role target clear"] }
      ],
      caseStudyChecklist: ["Portfolio package submitted", "Capstone case study ready", "GitHub profile ready", "Resume placeholder ready", "Target roles clear"],
      finalReviewChecklist: ["This does not guarantee a job", "Proof is review-ready", "Next step is refine, share, and apply"],
      xp: 220
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
    slug: "design-systems-and-tokens",
    title: "Design Systems & Tokens",
    shortDescription:
      "Turn visual design decisions into reusable coded systems: tokens, themes, typed component APIs, explicit states, and documentation.",
    goal: "Help learners build a small coded design system using tokens, semantic naming, typed component variants, reusable components, and documentation.",
    estimatedTime: "16-20 hours",
    difficulty: "Intermediate",
    type: "systems",
    status: "Locked",
    topics: [
      "Design systems in production code",
      "Raw and semantic design tokens",
      "Color, spacing, radius, and typography tokens",
      "Light and dark themes",
      "Typed component APIs",
      "Variants and sizes",
      "Component states",
      "Documentation and Storybook readiness"
    ],
    lessons: designSystemsLessons,
    labs: [
      "Design-system concept check",
      "Create a token object",
      "Build a themed panel",
      "Build a typed Button API",
      "Build TextField states",
      "Write component documentation"
    ],
    projects: [
      {
        id: "project-mini-design-system-kit",
        title: "Build a Mini Design System Kit",
        brief:
          "Build a small coded design system kit with tokens, themed components, typed variants, explicit states, and documentation.",
        deliverables: [
          "Token definitions",
          "Semantic token naming",
          "One themed component example",
          "Typed Button component",
          "Typed TextField or StatusCard component",
          "At least five component states across the kit",
          "Documentation entry",
          "GitHub repo URL",
          "Short reflection: which design decisions became tokens, which tokens were raw or semantic, which props became API controls, which states became explicit, what must stay aligned with Figma, and what still feels confusing"
        ],
        rubric: [
          "Tokens are named clearly",
          "Semantic tokens are used",
          "Theme switching works",
          "Component props are typed",
          "Variants are constrained",
          "States are explicit",
          "Components are reusable",
          "Documentation is useful",
          "Code is readable",
          "Reflection is completed"
        ],
        submissionRequired: true
      }
    ],
    deliverables: [
      "Completed design-system concept check",
      "Token object with raw and semantic tokens",
      "Themed panel with semantic light/dark tokens",
      "Typed Button API with variants and sizes",
      "TextField states component",
      "Component documentation entry",
      "Mini design system kit submission"
    ],
    evaluationCriteria: [
      "Learner can explain how Figma variables, component properties, variants, and states map to code.",
      "Learner can name raw and semantic tokens clearly.",
      "Learner can build themeable components from semantic tokens.",
      "Learner can design typed component APIs with constrained variants.",
      "Learner can document usage, states, props, and accessibility notes."
    ],
    unlockRequirements: ["Complete Phase 7: TypeScript for Design Engineers"],
    requiredTools: ["React", "TypeScript", "Storybook"],
    mentorCheckpoints: ["Design system critique placeholder", "Token naming review placeholder", "Component documentation review placeholder"]
  },
  {
    id: "phase-09-a11y-performance",
    order: 9,
    slug: "accessibility-and-performance",
    title: "Accessibility & Performance",
    shortDescription:
      "Audit, fix, and improve UI components for keyboard usability, readable structure, motion preferences, loading behavior, and basic frontend performance.",
    goal: "Help learners audit, fix, and improve real UI components for accessibility, keyboard usability, readable structure, motion preferences, loading behavior, and basic frontend performance.",
    estimatedTime: "12-14 hours",
    difficulty: "Intermediate",
    type: "systems",
    status: "Locked",
    topics: [
      "Accessibility as interface quality",
      "Semantic HTML",
      "Keyboard navigation",
      "Visible focus states",
      "Accessible names",
      "Forms, labels, helper text, and errors",
      "Color contrast and non-color status cues",
      "Reduced motion preferences",
      "Loading states, layout shifts, and basic performance"
    ],
    lessons: accessibilityPerformanceLessons,
    labs: [
      "Accessibility concept check",
      "Fix keyboard and focus issues",
      "Fix form labels and error text",
      "Fix contrast and motion issues",
      "Performance mini-audit",
      "Write a shipping-quality audit note"
    ],
    projects: [
      {
        id: "project-a11y-performance-audit",
        title: "Accessibility and Performance Audit Pass",
        brief:
          "Take one previous project or component system and perform a practical quality pass. Identify accessibility and performance issues, apply fixes, and document what changed.",
        deliverables: [
          "GitHub repo URL",
          "Deployment URL if available",
          "Audit note",
          "Before/after summary",
          "List of fixes made",
          "Reflection covering what was easy to miss, what changed during keyboard testing, which state needed more design attention, which performance issue affected UX most, and what you would include in a PR review note"
        ],
        rubric: [
          "Keyboard navigation considered",
          "Focus states visible",
          "Labels/accessibility names improved",
          "Contrast/status/motion improved",
          "Loading/performance issue addressed",
          "Audit note is clear",
          "Before/after summary is useful",
          "Reflection is completed",
          "Project submission includes GitHub URL"
        ],
        submissionRequired: true
      }
    ],
    deliverables: [
      "Completed accessibility concept check",
      "Keyboard/focus action panel fix",
      "Form label/error/helper text fix",
      "Contrast and reduced-motion status card fix",
      "Completed performance mini-audit",
      "Structured audit note",
      "Accessibility and performance audit pass submission"
    ],
    evaluationCriteria: [
      "Learner can explain accessibility as interface quality.",
      "Learner can fix obvious keyboard, focus, label, contrast, status, and motion issues.",
      "Learner can identify basic performance risks that affect UX.",
      "Learner can write a useful before/after audit note for PR review."
    ],
    unlockRequirements: ["Complete Phase 8: Design Systems & Tokens"],
    requiredTools: ["Browser lab", "Keyboard", "Browser DevTools", "Lighthouse awareness"],
    mentorCheckpoints: ["Accessibility and performance review placeholder", "Audit note critique placeholder"]
  },
  {
    id: "phase-10-apis-state",
    order: 10,
    slug: "apis-data-and-state-management",
    title: "APIs, Data & State Management",
    shortDescription:
      "Build product-like interfaces with mock API data, loading states, errors, empty states, search, forms, saving, and state transitions.",
    goal: "Help learners build data-driven interfaces that handle loading, errors, empty states, filtering, user input, and state changes with clear product-quality UI.",
    estimatedTime: "12-14 hours",
    difficulty: "Intermediate",
    type: "project",
    status: "Locked",
    topics: [
      "Static components vs data-driven interfaces",
      "Mock APIs",
      "fetch concepts",
      "async/await",
      "useEffect",
      "server data vs local UI state",
      "loading, empty, error, success, and saving states",
      "search and filtering",
      "derived state",
      "controlled forms",
      "optimistic UI basics",
      "state models for review-ready product surfaces"
    ],
    lessons: dataStateLessons,
    labs: [
      "Data/state concept check",
      "Load project data from a controlled mock API",
      "Fix empty and error states",
      "Build search and derived filtering",
      "Build a saving form with success feedback",
      "Document a product state model"
    ],
    projects: [
      {
        id: "project-data-driven-dashboard",
        title: "Build a Data-Driven Project Dashboard",
        brief:
          "Build a small product dashboard that fetches project data from a mock API, displays loading/error/empty states, supports search or filtering, and includes a form to add a new project.",
        deliverables: [
          "Data-driven React/TSX interface",
          "Project card/list component",
          "Loading, empty, error, and success states",
          "Search or filter UI",
          "Add-project form",
          "State model note",
          "GitHub repo URL",
          "Deployment URL if available",
          "Reflection covering which states were designed beyond the happy path, what data came from the mock API, what state was local, how loading/errors were handled, what search/filtering changed, what you would ask an engineer in review, and what still feels confusing"
        ],
        rubric: [
          "Loading state exists",
          "Empty state exists",
          "Error state exists",
          "Retry action exists",
          "Data renders from mock API",
          "Search/filtering works",
          "Form uses controlled state",
          "Saving/success feedback exists",
          "State model is documented",
          "Code is readable",
          "Reflection is completed",
          "Project submission includes GitHub URL"
        ],
        submissionRequired: true
      }
    ],
    deliverables: [
      "Completed data/state concept check",
      "Mock API data-loading project list",
      "Empty/error/retry panel",
      "Searchable project dashboard",
      "Add-project form with saving and success feedback",
      "Structured state model",
      "Data-driven project dashboard submission"
    ],
    evaluationCriteria: [
      "Learner can explain server data, local state, derived state, and optimistic updates in product UI terms.",
      "Learner can build loading, empty, error, success, saving, and retry states.",
      "Learner can filter data without destroying source data.",
      "Learner can use controlled form state and document a review-ready state model."
    ],
    unlockRequirements: ["Complete Phase 9: Accessibility & Performance"],
    requiredTools: ["React", "TypeScript", "Browser lab", "Controlled mock APIs", "Vite later for project work"],
    mentorCheckpoints: ["Data-driven dashboard review placeholder", "State model critique placeholder"]
  },
  {
    id: "phase-11-motion",
    order: 11,
    slug: "motion-animation-and-micro-interactions",
    title: "Motion, Animation & Micro-Interactions",
    shortDescription:
      "Use motion as interface communication: feedback, continuity, hierarchy, state change, and perceived quality.",
    goal: "Help learners design and implement purposeful interface motion using CSS, React state, timing, easing, interaction states, reduced-motion preferences, and performance-aware animation patterns.",
    estimatedTime: "8-10 hours",
    difficulty: "Intermediate",
    type: "systems",
    status: "Locked",
    topics: [
      "Motion as interface communication",
      "Feedback motion",
      "Transition motion",
      "Hover, focus, active, selected, and disabled states",
      "Timing and easing",
      "Motion tokens",
      "Conditional UI",
      "Micro-interactions",
      "Reduced motion",
      "Performance-safe animation"
    ],
    lessons: motionLessons,
    labs: [
      "Motion concept check",
      "Polish interaction states",
      "Create motion tokens",
      "Build a dismissible toast",
      "Build a save feedback micro-interaction",
      "Write a motion QA audit"
    ],
    projects: [
      {
        id: "project-animated-component-set",
        title: "Interaction Polish Pass",
        brief:
          "Take a previous interface or component system and add purposeful motion and micro-interactions that improve feedback, state transitions, and perceived quality while respecting accessibility and reduced-motion preferences.",
        deliverables: [
          "Polished interactive component or product surface",
          "Motion token definitions",
          "Feedback micro-interaction",
          "Conditional UI transition",
          "Reduced-motion handling",
          "Motion audit note",
          "GitHub repo URL",
          "Deployment URL if available",
          "Reflection covering what job each motion choice performs, which interaction needed feedback most, which state transition felt abrupt, what changed for reduced motion, which animation properties were chosen and why, what you would ask in review, and what still feels confusing"
        ],
        rubric: [
          "Motion has clear purpose",
          "Transitions improve state clarity",
          "Interaction feedback is visible",
          "Focus states remain accessible",
          "Motion tokens are used",
          "Reduced-motion fallback exists",
          "Performance-safe properties are preferred",
          "Audit note is completed",
          "Code is readable",
          "Reflection is completed",
          "Project submission includes GitHub URL"
        ],
        submissionRequired: true
      }
    ],
    deliverables: [
      "Completed motion concept check",
      "Interaction-state transition lab",
      "Motion token lab",
      "Dismissible toast lab",
      "Feedback micro-interaction lab",
      "Motion QA audit",
      "Interaction polish pass submission"
    ],
    evaluationCriteria: [
      "Learner can explain motion as feedback, continuity, attention, and state communication.",
      "Learner can implement accessible transitions and micro-interactions with CSS and React state.",
      "Learner can define motion tokens and reduced-motion fallbacks.",
      "Learner can audit motion for purpose, accessibility, and performance."
    ],
    unlockRequirements: ["Complete Phase 10: APIs, Data & State Management"],
    requiredTools: ["CSS", "React", "TypeScript", "Browser lab"],
    mentorCheckpoints: ["Motion critique placeholder", "Interaction polish review placeholder"]
  },
  {
    id: "phase-12-deployment-ci",
    order: 12,
    slug: "deployment-and-production-workflow",
    title: "Deployment & Production Workflow",
    shortDescription:
      "Prepare, build, deploy, debug, and document frontend projects so they are review-ready and portfolio-ready.",
    goal: "Help learners prepare, build, deploy, debug, and document a frontend project so it can be reviewed by hiring teams, designers, and engineers.",
    estimatedTime: "8-10 hours",
    difficulty: "Intermediate",
    type: "project",
    status: "Locked",
    topics: [
      "Local preview vs deployed work",
      "GitHub repo review",
      "Production builds",
      "Build commands",
      "Frontend hosting basics",
      "Preview deployments",
      "Environment variables and public config",
      "Deploy logs",
      "Failed build debugging",
      "README quality",
      "Release checklists",
      "Portfolio-ready handoff"
    ],
    lessons: deploymentLessons,
    labs: [
      "Deployment workflow concept check",
      "Simulated production build terminal",
      "Deployment checklist",
      "Config/env TSX lab",
      "Debugging scenarios",
      "Release README checklist"
    ],
    projects: [
      {
        id: "project-deployment-pipeline",
        title: "Ship a Portfolio-Ready Frontend Project",
        brief:
          "Take one previous project and prepare it for real review. Build it, deploy it, document it, check production quality, and submit it as a portfolio-ready artifact.",
        deliverables: [
          "GitHub repo URL",
          "Deployed URL",
          "Build command used",
          "README or release note",
          "Release checklist",
          "Accessibility check",
          "Performance check",
          "Known limitations",
          "Reflection covering what broke or could have broken during deployment, what the production build caught, what you added to make review easier, what a hiring manager sees first, what an engineer needs to run it, what quality checks you performed, and what still feels confusing"
        ],
        rubric: [
          "GitHub repo is provided",
          "Deployed URL is provided",
          "Build command is documented",
          "README/release note is useful",
          "Setup instructions are clear",
          "Accessibility check is included",
          "Performance check is included",
          "Known limitations are honest",
          "Project is review-ready",
          "Reflection is completed"
        ],
        submissionRequired: true,
        requiresDeploymentUrl: true
      }
    ],
    deliverables: [
      "Completed deployment concept check",
      "Simulated successful build workflow",
      "Deployment checklist",
      "Config/env lab",
      "Debugging scenario exercise",
      "Release README/checklist",
      "Portfolio-ready frontend project submission"
    ],
    evaluationCriteria: [
      "Learner can explain local development, production builds, deployed URLs, preview deployments, hosting, and release checklists.",
      "Learner can run a beginner production workflow and diagnose common build/deploy failures.",
      "Learner can document public config without implying frontend secrets are private.",
      "Learner can prepare a README/release note that makes work reviewable by designers, engineers, and hiring teams."
    ],
    unlockRequirements: ["Complete Phase 11: Motion, Animation & Micro-Interactions"],
    requiredTools: ["GitHub", "Vite", "React", "TypeScript", "npm", "Vercel or Netlify-style hosting later for project work"],
    mentorCheckpoints: ["Deployment review placeholder", "Portfolio-readiness review placeholder"]
  },
  {
    id: "phase-13-capstone",
    order: 13,
    slug: "capstone-project",
    title: "Capstone Project",
    shortDescription:
      "Build, document, deploy, and present a review-ready product dashboard as the final proof of junior design engineer readiness.",
    goal: "Create the final proof project: a review-ready portfolio artifact that combines product UI, component systems, accessibility, data, motion, deployment, and case-study rationale.",
    estimatedTime: "35-45 hours",
    difficulty: "Advanced",
    type: "capstone",
    status: "Locked",
    topics: [
      "Product brief interpretation",
      "Product state model",
      "React + TypeScript implementation",
      "Design tokens and component APIs",
      "Mock API/data layer",
      "Accessibility and reduced motion",
      "Data/state handling",
      "Motion and feedback",
      "Production build and deployment",
      "README/release documentation",
      "Case study and portfolio presentation"
    ],
    lessons: capstoneLessons,
    labs: [
      "Product brief and state model milestone",
      "Tokens and component plan milestone",
      "Build plan and repo setup milestone",
      "Implementation checklist milestone",
      "Deployment and release milestone",
      "Case study and final reflection milestone",
      "Final capstone submission",
      "Rubric self-review"
    ],
    projects: [],
    deliverables: [
      "Responsive product dashboard",
      "Reusable typed component system",
      "Mock API/data layer",
      "Search/filter and controlled form",
      "Loading, empty, error, success, and saving states",
      "Accessibility and reduced-motion pass",
      "Production build and deployed URL",
      "GitHub repo",
      "README/release note",
      "Case study summary",
      "Final reflection"
    ],
    evaluationCriteria: [
      "Learner can plan and build a realistic product surface with useful states and edge cases.",
      "Learner can implement reusable typed components using tokens, variants, and documented APIs.",
      "Learner can handle mock data, derived state, controlled forms, accessibility, motion, and production workflow.",
      "Learner can explain design rationale, technical rationale, known limitations, and portfolio relevance."
    ],
    unlockRequirements: ["Complete Phase 12: Deployment & Production Workflow"],
    requiredTools: ["GitHub", "Vite", "React", "TypeScript", "CSS", "Mock data", "Vercel or Netlify-style hosting"],
    mentorCheckpoints: ["Capstone kickoff placeholder", "Milestone review placeholder", "Final review placeholder"]
  },
  {
    id: "phase-14-career-prep",
    order: 14,
    slug: "portfolio-and-career-preparation",
    title: "Portfolio & Career Preparation",
    shortDescription:
      "Package the full body of work into a review-ready portfolio, case-study system, GitHub profile, resume positioning, and interview story set.",
    goal: "Help learners turn their completed projects into a clear, review-ready portfolio package and prepare to explain their design-engineering decisions in hiring conversations.",
    estimatedTime: "12-18 hours",
    difficulty: "Advanced",
    type: "career",
    status: "Locked",
    topics: [
      "Hiring signals for design engineers",
      "Portfolio structure",
      "Capstone case-study writing",
      "GitHub and README review",
      "Resume and LinkedIn positioning",
      "Interview stories",
      "Final hireability audit"
    ],
    lessons: careerPrepLessons,
    labs: [
      "Hireability concept check",
      "Portfolio checklist",
      "Capstone case study builder",
      "Repo readiness checklist",
      "Positioning builder",
      "Interview story builder",
      "Final hireability audit",
      "Final portfolio package",
      "Final readiness rubric"
    ],
    projects: [],
    deliverables: [
      "Portfolio URL or placeholder",
      "Featured capstone case study",
      "At least three supporting project summaries",
      "GitHub profile and reviewable repos",
      "README/release notes",
      "Resume and LinkedIn positioning copy",
      "Interview story answers",
      "Final hireability audit",
      "Final readiness rubric"
    ],
    evaluationCriteria: [
      "Learner can show evidence of design craft and frontend implementation without overclaiming.",
      "Learner can package capstone and supporting projects with deployed URLs, GitHub repos, and case-study rationale.",
      "Learner can explain design-system, TypeScript, accessibility, state/data, motion, and deployment decisions in hiring conversations.",
      "Learner can honestly audit application readiness and identify what still needs strengthening."
    ],
    unlockRequirements: ["Complete Phase 13: Capstone Project"],
    requiredTools: ["Portfolio site or placeholder", "GitHub", "Resume document", "LinkedIn later", "Deployed project URLs"],
    mentorCheckpoints: ["Portfolio review placeholder", "Mock interview placeholder", "Final readiness review placeholder"]
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
