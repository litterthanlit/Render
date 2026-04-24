import { Track } from "@/lib/types";

export const accessibilityDesignSystems: Track = {
  id: "track-accessibility-design-systems",
  slug: "accessibility-design-systems",
  title: "Accessibility & Design Systems",
  level: "Intermediate",
  shortDescription:
    "Learn how clear semantics, focus states, and reusable patterns raise interface quality across the whole product.",
  estimatedHours: "5 hours",
  status: "Available",
  modules: [
    {
      id: "module-accessibility-foundations",
      title: "Accessibility Foundations",
      summary: "Strengthen clarity, focus, and semantics so product interfaces work for more people.",
      lessons: [
        {
          id: "lesson-focus-ring",
          slug: "visible-focus-ring",
          title: "Add a Visible Focus Ring",
          duration: "20 min",
          objectives: [
            "Create keyboard-visible feedback for interactive elements.",
            "Use `:focus-visible` so focus treatment appears intentionally.",
            "Treat accessibility as part of product polish."
          ],
          sections: [
            {
              title: "Focus is a product signal",
              paragraphs: [
                "Focus states are often treated like technical leftovers, but they are really orientation tools. They tell users where the interface is listening.",
                "A clear focus ring is one of the easiest improvements you can make to a product interface."
              ]
            }
          ],
          exercise: {
            id: "exercise-focus-ring",
            title: "Focusable button state",
            prompt:
              "Add a `:focus-visible` style to the button so keyboard users can clearly see where focus is.",
            runtime: "html-css-js",
            starterFiles: {
              html: `<button class="cta">Continue to lesson</button>`,
              css: `.cta {\n  margin: 64px auto;\n  display: inline-flex;\n  border: 0;\n  border-radius: 999px;\n  padding: 14px 20px;\n  background: #111827;\n  color: white;\n}`,
              js: `document.body.dataset.lesson = "focus";`
            },
            solutionFiles: {
              html: `<button class="cta">Continue to lesson</button>`,
              css: `.cta {\n  margin: 64px auto;\n  display: inline-flex;\n  border: 0;\n  border-radius: 999px;\n  padding: 14px 20px;\n  background: #111827;\n  color: white;\n}\n.cta:focus-visible {\n  outline: 3px solid #2563eb;\n  outline-offset: 3px;\n}`,
              js: `document.body.dataset.lesson = "focus";`
            },
            hints: [
              "Use `:focus-visible`, not just `:focus`.",
              "An outline and some offset is enough for this lesson."
            ],
            checks: [
              {
                type: "expression-returns",
                expression:
                  "Array.from(document.styleSheets).some((sheet) => Array.from(sheet.cssRules).some((rule) => rule.selectorText === '.cta:focus-visible'))",
                expected: true,
                message: "Add a visible `:focus-visible` style to the button."
              }
            ],
            xp: 65
          }
        },
        {
          id: "lesson-label-input",
          slug: "label-an-input",
          title: "Label an Input Clearly",
          duration: "20 min",
          objectives: [
            "Associate form labels with inputs correctly.",
            "Keep forms understandable before visual styling.",
            "Treat accessible naming as part of design quality."
          ],
          sections: [
            {
              title: "Names come before polish",
              paragraphs: [
                "Good forms are understandable in structure before they are attractive in styling. A visible label is one of the simplest ways to lower friction."
              ]
            }
          ],
          exercise: {
            id: "exercise-input-label",
            title: "Accessible label pairing",
            prompt:
              "Add a label linked to the email field using matching `for` and `id` values.",
            runtime: "html-css-js",
            starterFiles: {
              html: `<form class="stack">\n  <input id="email" type="email" placeholder="name@example.com" />\n</form>`,
              css: `.stack {\n  width: min(420px, calc(100vw - 48px));\n  margin: 56px auto;\n  display: grid;\n  gap: 12px;\n}\ninput {\n  padding: 14px 16px;\n  border-radius: 16px;\n  border: 1px solid rgba(15, 23, 42, 0.16);\n}`,
              js: `document.body.dataset.lesson = "label";`
            },
            solutionFiles: {
              html: `<form class="stack">\n  <label for="email">Email address</label>\n  <input id="email" type="email" placeholder="name@example.com" />\n</form>`,
              css: `.stack {\n  width: min(420px, calc(100vw - 48px));\n  margin: 56px auto;\n  display: grid;\n  gap: 12px;\n}\ninput {\n  padding: 14px 16px;\n  border-radius: 16px;\n  border: 1px solid rgba(15, 23, 42, 0.16);\n}`,
              js: `document.body.dataset.lesson = "label";`
            },
            hints: [
              "The input already has an ID.",
              "Use a visible text label before the field."
            ],
            checks: [
              {
                type: "selector-exists",
                selector: "label[for='email']",
                message: "Add a label linked to the email field."
              }
            ],
            xp: 60
          }
        }
      ]
    },
    {
      id: "module-system-patterns",
      title: "Design System Patterns",
      summary: "Capture repeatable structure so interface decisions scale cleanly.",
      lessons: [
        {
          id: "lesson-badge-system",
          slug: "consistent-badge-system",
          title: "Build a Consistent Badge System",
          duration: "25 min",
          objectives: [
            "Use one class to define a repeatable component shell.",
            "Separate component structure from one-off styling.",
            "Think in reusable product patterns."
          ],
          sections: [
            {
              title: "Systems reduce rework",
              paragraphs: [
                "A design system is not just tokens and components. It is the habit of shaping repeatable solutions so every new screen does not start from zero."
              ]
            }
          ],
          exercise: {
            id: "exercise-badge-system",
            title: "Badge class reuse",
            prompt:
              "Add the `badge` class to all three status pills so they share one reusable base style.",
            runtime: "html-css-js",
            starterFiles: {
              html: `<div class="stack">\n  <span class="status">Ready</span>\n  <span class="status">Review</span>\n  <span class="status">Draft</span>\n</div>`,
              css: `.stack {\n  width: min(420px, calc(100vw - 48px));\n  margin: 56px auto;\n  display: flex;\n  gap: 10px;\n}\n.badge {\n  padding: 10px 14px;\n  border-radius: 999px;\n  background: rgba(37, 99, 235, 0.08);\n}`,
              js: `document.body.dataset.lesson = "badge";`
            },
            solutionFiles: {
              html: `<div class="stack">\n  <span class="status badge">Ready</span>\n  <span class="status badge">Review</span>\n  <span class="status badge">Draft</span>\n</div>`,
              css: `.stack {\n  width: min(420px, calc(100vw - 48px));\n  margin: 56px auto;\n  display: flex;\n  gap: 10px;\n}\n.badge {\n  padding: 10px 14px;\n  border-radius: 999px;\n  background: rgba(37, 99, 235, 0.08);\n}`,
              js: `document.body.dataset.lesson = "badge";`
            },
            hints: [
              "The CSS already contains the shared component class.",
              "All three pills should use it."
            ],
            checks: [
              {
                type: "selector-count",
                selector: ".badge",
                count: 3,
                message: "Apply the `badge` class to all three pills."
              }
            ],
            xp: 70
          }
        },
        {
          id: "lesson-card-header",
          slug: "shared-card-header",
          title: "Standardize a Card Header",
          duration: "25 min",
          objectives: [
            "Give repeated headers a shared wrapper class.",
            "Use semantic structure to support reusable composition.",
            "Spot where a one-off layout should become a pattern."
          ],
          sections: [
            {
              title: "Patterns start with naming",
              paragraphs: [
                "Once a structure repeats, naming it is the first step toward reuse. Clear wrappers make it easier to port a pattern across a product."
              ]
            }
          ],
          exercise: {
            id: "exercise-card-header",
            title: "Shared card header wrapper",
            prompt:
              "Wrap the eyebrow and title in a `.card-header` element so the repeated header structure can be styled as one unit.",
            runtime: "html-css-js",
            starterFiles: {
              html: `<article class="card">\n  <p class="eyebrow">Component</p>\n  <h2>Settings panel</h2>\n  <p>Keep the structure ready for reuse.</p>\n</article>`,
              css: `.card {\n  width: min(420px, calc(100vw - 48px));\n  margin: 56px auto;\n  padding: 24px;\n  border-radius: 24px;\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  background: #ffffff;\n}\n.card-header {\n  display: grid;\n  gap: 8px;\n}`,
              js: `document.body.dataset.lesson = "header";`
            },
            solutionFiles: {
              html: `<article class="card">\n  <div class="card-header">\n    <p class="eyebrow">Component</p>\n    <h2>Settings panel</h2>\n  </div>\n  <p>Keep the structure ready for reuse.</p>\n</article>`,
              css: `.card {\n  width: min(420px, calc(100vw - 48px));\n  margin: 56px auto;\n  padding: 24px;\n  border-radius: 24px;\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  background: #ffffff;\n}\n.card-header {\n  display: grid;\n  gap: 8px;\n}`,
              js: `document.body.dataset.lesson = "header";`
            },
            hints: [
              "The wrapper class already exists in the CSS.",
              "Only the eyebrow and the title belong inside it."
            ],
            checks: [
              {
                type: "selector-exists",
                selector: ".card-header",
                message: "Add a shared `.card-header` wrapper."
              },
              {
                type: "selector-count",
                selector: ".card-header > *",
                count: 2,
                message: "The card header should contain exactly two children."
              }
            ],
            xp: 75
          }
        }
      ]
    }
  ]
};
