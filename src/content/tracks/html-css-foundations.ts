import { Track } from "@/lib/types";

export const htmlCssFoundations: Track = {
  id: "track-html-css",
  slug: "html-css-foundations",
  title: "HTML & CSS Foundations",
  level: "Beginner",
  shortDescription:
    "Learn the structure, rhythm, and layout instincts that turn visual design decisions into real interfaces.",
  estimatedHours: "5 hours",
  status: "Available",
  modules: [
    {
      id: "module-semantic-html",
      title: "Semantic HTML",
      summary: "Translate content hierarchy into meaningful, accessible structure.",
      lessons: [
        {
          id: "lesson-semantic-card",
          slug: "semantic-portfolio-card",
          title: "Build a Semantic Portfolio Card",
          duration: "25 min",
          objectives: [
            "Use sectioning and text semantics with intent.",
            "Create a usable call-to-action with accessible copy.",
            "Structure content so layout changes do not break meaning."
          ],
          sections: [
            {
              title: "Why semantics matter",
              paragraphs: [
                "Design engineers shape meaning before they shape polish. Good markup carries hierarchy, intent, and future adaptability.",
                "A card is a great first exercise because it looks simple but still asks you to decide what is a heading, what is supporting copy, and what action a user can take."
              ]
            },
            {
              title: "What to build",
              paragraphs: [
                "Create a portfolio card with a title, a short description, and a button-like link. Keep the structure minimal and readable."
              ],
              bulletPoints: [
                "Use an article element for the card shell.",
                "Use an h2 for the main title.",
                "Use a link with the class `cta` for the main action."
              ]
            }
          ],
          exercise: {
            id: "exercise-semantic-card",
            title: "Portfolio card structure",
            prompt:
              "Turn the loose starter markup into a semantic card with a real heading and a clear call-to-action.",
            runtime: "html-css-js",
            starterFiles: {
              html: `<div class="card">\n  <div class="eyebrow">Featured project</div>\n  <div>Motion system redesign</div>\n  <p>Translate a visual exploration into a component-ready artifact.</p>\n  <a href="#">Open case study</a>\n</div>`,
              css: `.card {\n  width: min(420px, calc(100vw - 48px));\n  margin: 32px auto;\n  padding: 24px;\n  border-radius: 24px;\n  background: linear-gradient(180deg, rgba(20, 26, 28, 0.94), rgba(10, 12, 15, 0.98));\n  border: 1px solid rgba(106, 227, 255, 0.18);\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.42);\n}\n\n.eyebrow {\n  margin-bottom: 12px;\n  color: #f3a562;\n  text-transform: uppercase;\n  letter-spacing: 0.2em;\n  font-size: 12px;\n}\n\na {\n  color: #0b1114;\n  background: #6ae3ff;\n  text-decoration: none;\n  padding: 10px 14px;\n  border-radius: 999px;\n  display: inline-flex;\n  margin-top: 16px;\n}`,
              js: `const card = document.querySelector(".card");\ncard?.setAttribute("data-ready", "true");`
            },
            solutionFiles: {
              html: `<article class="card">\n  <p class="eyebrow">Featured project</p>\n  <h2>Motion system redesign</h2>\n  <p>Translate a visual exploration into a component-ready artifact.</p>\n  <a class="cta" href="#">Open case study</a>\n</article>`,
              css: `.card {\n  width: min(420px, calc(100vw - 48px));\n  margin: 32px auto;\n  padding: 24px;\n  border-radius: 24px;\n  background: linear-gradient(180deg, rgba(20, 26, 28, 0.94), rgba(10, 12, 15, 0.98));\n  border: 1px solid rgba(106, 227, 255, 0.18);\n  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.42);\n}\n\n.eyebrow {\n  margin-bottom: 12px;\n  color: #f3a562;\n  text-transform: uppercase;\n  letter-spacing: 0.2em;\n  font-size: 12px;\n}\n\nh2 {\n  margin: 0 0 10px;\n  font-size: 32px;\n}\n\n.cta {\n  color: #0b1114;\n  background: #6ae3ff;\n  text-decoration: none;\n  padding: 10px 14px;\n  border-radius: 999px;\n  display: inline-flex;\n  margin-top: 16px;\n}`,
              js: `const card = document.querySelector(".card");\ncard?.setAttribute("data-ready", "true");`
            },
            hints: [
              "The card container should communicate that it is a standalone piece of content.",
              "A project title should not stay inside a generic div.",
              "The main action needs the class name `cta` for this lesson."
            ],
            checks: [
              {
                type: "selector-exists",
                selector: "article.card",
                message: "Use an article element for the card shell."
              },
              {
                type: "text-equals",
                selector: "h2",
                text: "Motion system redesign",
                message: "Promote the project title into an h2."
              },
              {
                type: "has-class",
                selector: "a",
                className: "cta",
                message: "Give the primary action the class `cta`."
              }
            ],
            xp: 60
          },
          nextLessonSlug: "layout-with-flexbox"
        },
        {
          id: "lesson-landmark-story",
          slug: "landing-page-landmarks",
          title: "Map a Page with Landmarks",
          duration: "20 min",
          objectives: [
            "Use sectioning elements to define page regions.",
            "Separate supporting copy from primary content.",
            "Keep content readable before styling."
          ],
          sections: [
            {
              title: "Landmarks create orientation",
              paragraphs: [
                "As screens get larger and product pages get denser, structure becomes a navigation tool for both users and future developers."
              ]
            }
          ],
          exercise: {
            id: "exercise-landmarks",
            title: "Three-part page shell",
            prompt:
              "Restructure the starter into a page shell with header, main, and footer landmarks.",
            runtime: "html-css-js",
            starterFiles: {
              html: `<div class="page">\n  <div class="hero">Render</div>\n  <div class="content">From designer to design engineer.</div>\n  <div class="meta">Spring cohort</div>\n</div>`,
              css: `.page {\n  padding: 32px;\n}\n.hero {\n  font-size: 40px;\n  margin-bottom: 12px;\n}`,
              js: `document.body.dataset.lesson = "landmarks";`
            },
            solutionFiles: {
              html: `<div class="page">\n  <header><p class="hero">Render</p></header>\n  <main><p class="content">From designer to design engineer.</p></main>\n  <footer><p class="meta">Spring cohort</p></footer>\n</div>`,
              css: `.page {\n  padding: 32px;\n}\n.hero {\n  font-size: 40px;\n  margin-bottom: 12px;\n}`,
              js: `document.body.dataset.lesson = "landmarks";`
            },
            hints: [
              "You only need to add semantic wrappers around the existing content.",
              "Keep the text content unchanged."
            ],
            checks: [
              {
                type: "selector-exists",
                selector: "header",
                message: "Add a header landmark."
              },
              {
                type: "selector-exists",
                selector: "main",
                message: "Add a main landmark."
              },
              {
                type: "selector-exists",
                selector: "footer",
                message: "Add a footer landmark."
              }
            ],
            xp: 55
          }
        }
      ]
    },
    {
      id: "module-layout",
      title: "CSS Layout & Flexbox",
      summary: "Shape rhythm, distribution, and alignment with modern layout tools.",
      lessons: [
        {
          id: "lesson-flexbox-layout",
          slug: "layout-with-flexbox",
          title: "Arrange a Split Hero with Flexbox",
          duration: "30 min",
          objectives: [
            "Use flexbox to create a balanced two-column hero.",
            "Control spacing with gap and alignment rather than extra wrappers.",
            "Think about content and visual weight together."
          ],
          sections: [
            {
              title: "Why flexbox first",
              paragraphs: [
                "Flexbox is the fastest way to establish directional relationships between interface blocks. It is ideal for hero layouts, card rows, and compact control groups."
              ]
            }
          ],
          exercise: {
            id: "exercise-flexbox-layout",
            title: "Balanced split hero",
            prompt:
              "Convert the hero into a horizontal flex layout with aligned content and a visible gap between the copy block and the preview block.",
            runtime: "html-css-js",
            starterFiles: {
              html: `<section class="hero">\n  <div class="copy">\n    <p class="eyebrow">New track</p>\n    <h1>Build interfaces that think like systems.</h1>\n    <p>Learn to move from visual exploration to implementation-ready UI.</p>\n  </div>\n  <div class="preview">Preview pane</div>\n</section>`,
              css: `.hero {\n  width: min(960px, calc(100vw - 48px));\n  margin: 48px auto;\n  padding: 28px;\n  border-radius: 28px;\n  background: rgba(13, 16, 19, 0.95);\n  border: 1px solid rgba(106, 227, 255, 0.18);\n}\n\n.preview {\n  min-height: 220px;\n  border-radius: 20px;\n  border: 1px solid rgba(255,255,255,0.08);\n  padding: 20px;\n}`,
              js: `window.heroReady = true;`
            },
            solutionFiles: {
              html: `<section class="hero">\n  <div class="copy">\n    <p class="eyebrow">New track</p>\n    <h1>Build interfaces that think like systems.</h1>\n    <p>Learn to move from visual exploration to implementation-ready UI.</p>\n  </div>\n  <div class="preview">Preview pane</div>\n</section>`,
              css: `.hero {\n  width: min(960px, calc(100vw - 48px));\n  margin: 48px auto;\n  padding: 28px;\n  border-radius: 28px;\n  background: rgba(13, 16, 19, 0.95);\n  border: 1px solid rgba(106, 227, 255, 0.18);\n  display: flex;\n  gap: 24px;\n  align-items: center;\n}\n\n.copy,\n.preview {\n  flex: 1;\n}\n\n.preview {\n  min-height: 220px;\n  border-radius: 20px;\n  border: 1px solid rgba(255,255,255,0.08);\n  padding: 20px;\n}`,
              js: `window.heroReady = true;`
            },
            hints: [
              "The layout change belongs on the `.hero` container.",
              "Use `gap` rather than margin to separate the columns.",
              "Let both children grow evenly."
            ],
            checks: [
              {
                type: "style-equals",
                selector: ".hero",
                property: "display",
                value: "flex",
                message: "Turn the hero container into a flex layout."
              },
              {
                type: "style-equals",
                selector: ".hero",
                property: "align-items",
                value: "center",
                message: "Center the two columns vertically."
              },
              {
                type: "style-equals",
                selector: ".hero",
                property: "gap",
                value: "24px",
                message: "Create a clear 24px gap between the columns."
              }
            ],
            xp: 70
          },
          nextLessonSlug: "flexbox-action-row"
        },
        {
          id: "lesson-flex-controls",
          slug: "flexbox-action-row",
          title: "Compose a Compact Action Row",
          duration: "20 min",
          objectives: [
            "Group controls with clear alignment.",
            "Use flexbox to align items with different visual weights.",
            "Make interface clusters feel deliberate."
          ],
          sections: [
            {
              title: "Control groups need rhythm",
              paragraphs: [
                "Buttons, pills, and small controls often feel messy because they are spaced ad hoc. Flexbox helps them read as one intentional system."
              ]
            }
          ],
          exercise: {
            id: "exercise-action-row",
            title: "Action row layout",
            prompt: "Lay out the controls in a row, align them to the center, and push the meta pill to the far edge.",
            runtime: "html-css-js",
            starterFiles: {
              html: `<div class="actions">\n  <button>Preview</button>\n  <button>Publish</button>\n  <span class="meta">Ready for review</span>\n</div>`,
              css: `.actions {\n  width: min(680px, calc(100vw - 48px));\n  margin: 48px auto;\n  padding: 18px 20px;\n  border-radius: 999px;\n  background: rgba(13, 16, 19, 0.95);\n}\nbutton,\n.meta {\n  border: 0;\n  border-radius: 999px;\n  padding: 12px 16px;\n}\n.meta {\n  background: rgba(243, 165, 98, 0.18);\n}`,
              js: `window.actionRow = "ready";`
            },
            solutionFiles: {
              html: `<div class="actions">\n  <button>Preview</button>\n  <button>Publish</button>\n  <span class="meta">Ready for review</span>\n</div>`,
              css: `.actions {\n  width: min(680px, calc(100vw - 48px));\n  margin: 48px auto;\n  padding: 18px 20px;\n  border-radius: 999px;\n  background: rgba(13, 16, 19, 0.95);\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\nbutton,\n.meta {\n  border: 0;\n  border-radius: 999px;\n  padding: 12px 16px;\n}\n.meta {\n  background: rgba(243, 165, 98, 0.18);\n  margin-left: auto;\n}`,
              js: `window.actionRow = "ready";`
            },
            hints: [
              "The container needs to become a flex row.",
              "The pill can move away from the buttons with auto margin."
            ],
            checks: [
              {
                type: "style-equals",
                selector: ".actions",
                property: "display",
                value: "flex",
                message: "Use flexbox on the action row."
              },
              {
                type: "style-equals",
                selector: ".actions",
                property: "gap",
                value: "12px",
                message: "Add a 12px gap between controls."
              },
              {
                type: "style-equals",
                selector: ".meta",
                property: "margin-left",
                value: "auto",
                message: "Push the meta pill to the far edge."
              }
            ],
            xp: 65
          }
        }
      ]
    }
  ]
};
