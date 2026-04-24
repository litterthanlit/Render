import { Track } from "@/lib/types";

export const animationInteraction: Track = {
  id: "track-animation-interaction",
  slug: "animation-interaction",
  title: "Animation & Interaction",
  level: "Intermediate",
  shortDescription:
    "Use motion and state transitions intentionally so interfaces feel responsive, legible, and alive.",
  estimatedHours: "5 hours",
  status: "Available",
  modules: [
    {
      id: "module-motion-principles",
      title: "Motion Principles",
      summary: "Learn how timing, easing, and hover states shape product feel.",
      lessons: [
        {
          id: "lesson-hover-lift",
          slug: "hover-lift-card",
          title: "Create a Hover Lift Card",
          duration: "25 min",
          objectives: [
            "Use transitions to signal interactivity without noise.",
            "Pair transform and shadow changes for a subtle lift effect.",
            "Keep motion responsive and product-like."
          ],
          sections: [
            {
              title: "Motion should clarify",
              paragraphs: [
                "The best interface motion explains state and intent. It should make the product feel more understandable, not more decorative.",
                "A card hover is a small move, but it teaches a useful pattern: reinforce affordance with timing, distance, and contrast."
              ],
              bulletPoints: [
                "Transition only the properties that need to move.",
                "Keep hover distance small.",
                "Use shadow and transform together for a more natural result."
              ]
            }
          ],
          exercise: {
            id: "exercise-hover-lift",
            title: "Hover lift interaction",
            prompt:
              "Add a smooth hover lift to the card by transitioning transform and box-shadow, then move the card upward on hover.",
            runtime: "html-css-js",
            starterFiles: {
              html: `<article class="motion-card">\n  <p class="eyebrow">Interactive pattern</p>\n  <h2>Hover lift</h2>\n  <p>Make the card feel responsive without turning it into a novelty effect.</p>\n</article>`,
              css: `.motion-card {\n  width: min(420px, calc(100vw - 48px));\n  margin: 56px auto;\n  padding: 28px;\n  border-radius: 28px;\n  background: #ffffff;\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.08);\n}\n.eyebrow {\n  color: #2563eb;\n  text-transform: uppercase;\n  letter-spacing: 0.24em;\n  font-size: 12px;\n}`,
              js: `document.body.dataset.lesson = "hover";`
            },
            solutionFiles: {
              html: `<article class="motion-card">\n  <p class="eyebrow">Interactive pattern</p>\n  <h2>Hover lift</h2>\n  <p>Make the card feel responsive without turning it into a novelty effect.</p>\n</article>`,
              css: `.motion-card {\n  width: min(420px, calc(100vw - 48px));\n  margin: 56px auto;\n  padding: 28px;\n  border-radius: 28px;\n  background: #ffffff;\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.08);\n  transition: transform 180ms ease, box-shadow 180ms ease;\n}\n.motion-card:hover {\n  transform: translateY(-6px);\n  box-shadow: 0 24px 56px rgba(15, 23, 42, 0.14);\n}\n.eyebrow {\n  color: #2563eb;\n  text-transform: uppercase;\n  letter-spacing: 0.24em;\n  font-size: 12px;\n}`,
              js: `document.body.dataset.lesson = "hover";`
            },
            hints: [
              "The card should transition before the hover state is applied.",
              "Use `translateY` for the movement.",
              "A stronger shadow on hover helps the lift read clearly."
            ],
            checks: [
              {
                type: "style-equals",
                selector: ".motion-card",
                property: "transition-property",
                value: "transform, box-shadow",
                message: "Transition transform and box-shadow on the card."
              },
              {
                type: "expression-returns",
                expression:
                  "Array.from(document.styleSheets).some((sheet) => Array.from(sheet.cssRules).some((rule) => rule.selectorText === '.motion-card:hover'))",
                expected: true,
                message: "Add a hover rule for the card."
              }
            ],
            xp: 75
          }
        },
        {
          id: "lesson-button-feedback",
          slug: "button-press-feedback",
          title: "Design a Pressed Button State",
          duration: "20 min",
          objectives: [
            "Use `:active` and small scale shifts to reinforce input feedback.",
            "Make buttons feel immediate rather than static.",
            "Keep pressed states subtle and believable."
          ],
          sections: [
            {
              title: "Pressed states create trust",
              paragraphs: [
                "Users notice when buttons respond immediately. Press feedback is one of the smallest interactions in a product, but it affects perceived quality everywhere."
              ]
            }
          ],
          exercise: {
            id: "exercise-button-press",
            title: "Pressed button state",
            prompt: "Add an active state that scales the button down slightly when it is pressed.",
            runtime: "html-css-js",
            starterFiles: {
              html: `<button class="cta">Ship the prototype</button>`,
              css: `.cta {\n  margin: 64px auto;\n  display: inline-flex;\n  border: 0;\n  border-radius: 999px;\n  padding: 14px 20px;\n  background: #111827;\n  color: white;\n}`,
              js: `document.body.dataset.lesson = "press";`
            },
            solutionFiles: {
              html: `<button class="cta">Ship the prototype</button>`,
              css: `.cta {\n  margin: 64px auto;\n  display: inline-flex;\n  border: 0;\n  border-radius: 999px;\n  padding: 14px 20px;\n  background: #111827;\n  color: white;\n  transition: transform 120ms ease;\n}\n.cta:active {\n  transform: scale(0.98);\n}`,
              js: `document.body.dataset.lesson = "press";`
            },
            hints: [
              "The button needs a transition for the pressed state to feel smooth.",
              "Use the `:active` selector."
            ],
            checks: [
              {
                type: "expression-returns",
                expression:
                  "Array.from(document.styleSheets).some((sheet) => Array.from(sheet.cssRules).some((rule) => rule.selectorText === '.cta:active'))",
                expected: true,
                message: "Add a pressed `:active` state to the button."
              }
            ],
            xp: 65
          }
        }
      ]
    },
    {
      id: "module-ui-patterns",
      title: "Interactive UI Patterns",
      summary: "Turn simple states into clear, product-like interface behaviors.",
      lessons: [
        {
          id: "lesson-accordion",
          slug: "toggle-faq-panel",
          title: "Toggle an FAQ Panel",
          duration: "25 min",
          objectives: [
            "Show and hide content in response to a button click.",
            "Toggle classes to represent open and closed states.",
            "Keep interactive code small and legible."
          ],
          sections: [
            {
              title: "Pattern before framework",
              paragraphs: [
                "Before you reach for a component library, it helps to understand the underlying pattern. An accordion is just a state change with a visible consequence."
              ]
            }
          ],
          exercise: {
            id: "exercise-accordion",
            title: "FAQ reveal",
            prompt:
              "When the button is clicked, toggle the `is-open` class on the panel so the answer can appear.",
            runtime: "html-css-js",
            starterFiles: {
              html: `<section class="faq" id="faq-panel">\n  <button id="faq-toggle">What does Render teach?</button>\n  <p class="answer">It teaches designers how to turn interface intent into implementation-ready UI.</p>\n</section>`,
              css: `.faq {\n  width: min(520px, calc(100vw - 48px));\n  margin: 56px auto;\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  border-radius: 24px;\n  padding: 24px;\n  background: #ffffff;\n}\n.answer {\n  display: none;\n  margin-top: 16px;\n}\n.faq.is-open .answer {\n  display: block;\n}`,
              js: `const faqPanel = document.querySelector("#faq-panel");\nconst faqToggle = document.querySelector("#faq-toggle");`
            },
            solutionFiles: {
              html: `<section class="faq" id="faq-panel">\n  <button id="faq-toggle">What does Render teach?</button>\n  <p class="answer">It teaches designers how to turn interface intent into implementation-ready UI.</p>\n</section>`,
              css: `.faq {\n  width: min(520px, calc(100vw - 48px));\n  margin: 56px auto;\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  border-radius: 24px;\n  padding: 24px;\n  background: #ffffff;\n}\n.answer {\n  display: none;\n  margin-top: 16px;\n}\n.faq.is-open .answer {\n  display: block;\n}`,
              js: `const faqPanel = document.querySelector("#faq-panel");\nconst faqToggle = document.querySelector("#faq-toggle");\n\nfaqToggle?.addEventListener("click", () => {\n  faqPanel?.classList.toggle("is-open");\n});`
            },
            hints: [
              "The panel already has the ID you need.",
              "You only need one event listener and one class toggle."
            ],
            checks: [
              {
                type: "expression-returns",
                expression:
                  "(() => { faqToggle.click(); return faqPanel.classList.contains('is-open'); })()",
                expected: true,
                message: "Clicking the button should toggle the `is-open` class."
              }
            ],
            xp: 75
          }
        },
        {
          id: "lesson-toast",
          slug: "trigger-success-toast",
          title: "Trigger a Success Toast",
          duration: "25 min",
          objectives: [
            "Reveal a lightweight feedback message with JavaScript.",
            "Think about action-response pairs in product UI.",
            "Use classes to control present and hidden states."
          ],
          sections: [
            {
              title: "Feedback closes the loop",
              paragraphs: [
                "Actions need responses. A success toast is a compact way to tell users that their work landed without forcing them to scan the whole page."
              ]
            }
          ],
          exercise: {
            id: "exercise-toast",
            title: "Success toast reveal",
            prompt:
              "Clicking the publish button should add the `is-visible` class to the toast message.",
            runtime: "html-css-js",
            starterFiles: {
              html: `<div class="stack">\n  <button id="publish-button">Publish update</button>\n  <div class="toast" id="toast">Update published</div>\n</div>`,
              css: `.stack {\n  width: min(420px, calc(100vw - 48px));\n  margin: 56px auto;\n}\n.toast {\n  margin-top: 16px;\n  padding: 14px 16px;\n  border-radius: 18px;\n  background: rgba(37, 99, 235, 0.08);\n  display: none;\n}\n.toast.is-visible {\n  display: block;\n}`,
              js: `const publishButton = document.querySelector("#publish-button");\nconst toast = document.querySelector("#toast");`
            },
            solutionFiles: {
              html: `<div class="stack">\n  <button id="publish-button">Publish update</button>\n  <div class="toast" id="toast">Update published</div>\n</div>`,
              css: `.stack {\n  width: min(420px, calc(100vw - 48px));\n  margin: 56px auto;\n}\n.toast {\n  margin-top: 16px;\n  padding: 14px 16px;\n  border-radius: 18px;\n  background: rgba(37, 99, 235, 0.08);\n  display: none;\n}\n.toast.is-visible {\n  display: block;\n}`,
              js: `const publishButton = document.querySelector("#publish-button");\nconst toast = document.querySelector("#toast");\n\npublishButton?.addEventListener("click", () => {\n  toast?.classList.add("is-visible");\n});`
            },
            hints: [
              "The hidden state is already handled for you in CSS.",
              "You only need to add the correct class when the button is clicked."
            ],
            checks: [
              {
                type: "expression-returns",
                expression:
                  "(() => { publishButton.click(); return toast.classList.contains('is-visible'); })()",
                expected: true,
                message: "Clicking the publish button should reveal the toast."
              }
            ],
            xp: 75
          }
        }
      ]
    }
  ]
};
