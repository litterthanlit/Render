import { Track } from "@/lib/types";

export const javascriptForDesigners: Track = {
  id: "track-js-designers",
  slug: "javascript-for-designers",
  title: "JavaScript for Designers",
  level: "Beginner",
  shortDescription:
    "Use small, readable scripts to make interface states feel responsive, legible, and alive.",
  estimatedHours: "5 hours",
  status: "Available",
  modules: [
    {
      id: "module-fundamentals",
      title: "JS Fundamentals",
      summary: "Learn the smallest possible amount of code needed to make UI react.",
      lessons: [
        {
          id: "lesson-counter",
          slug: "interaction-counter",
          title: "Wire a Simple Counter",
          duration: "20 min",
          objectives: [
            "Store and update UI state with variables.",
            "Select elements and change text content.",
            "Connect a button click to a visible result."
          ],
          sections: [
            {
              title: "UI state in plain JavaScript",
              paragraphs: [
                "Before frameworks, there is state. Even simple interfaces need a source of truth and a way to reflect that truth back to the screen.",
                "Designers often think in variants first. JavaScript lets those variants become interactive, not just visual."
              ]
            }
          ],
          exercise: {
            id: "exercise-counter",
            title: "Increment button",
            prompt: "Make the button increment the count shown in the badge each time it is clicked.",
            runtime: "html-css-js",
            starterFiles: {
              html: `<div class="counter-card">\n  <p class="label">Prototype votes</p>\n  <strong id="count">0</strong>\n  <button id="vote-button">Add vote</button>\n</div>`,
              css: `.counter-card {\n  width: 320px;\n  margin: 48px auto;\n  padding: 24px;\n  border-radius: 24px;\n  background: #ffffff;\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.08);\n}\n#count {\n  display: block;\n  margin: 12px 0 20px;\n  font-size: 48px;\n}`,
              js: `const countNode = document.querySelector("#count");\nconst voteButton = document.querySelector("#vote-button");`
            },
            solutionFiles: {
              html: `<div class="counter-card">\n  <p class="label">Prototype votes</p>\n  <strong id="count">0</strong>\n  <button id="vote-button">Add vote</button>\n</div>`,
              css: `.counter-card {\n  width: 320px;\n  margin: 48px auto;\n  padding: 24px;\n  border-radius: 24px;\n  background: #ffffff;\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.08);\n}\n#count {\n  display: block;\n  margin: 12px 0 20px;\n  font-size: 48px;\n}`,
              js: `const countNode = document.querySelector("#count");\nconst voteButton = document.querySelector("#vote-button");\nlet count = 0;\n\nvoteButton?.addEventListener("click", () => {\n  count += 1;\n  if (countNode) {\n    countNode.textContent = String(count);\n  }\n});`
            },
            hints: [
              "Store the number in a variable before you change the DOM.",
              "Update the text content after incrementing the value."
            ],
            checks: [
              {
                type: "expression-returns",
                expression: "typeof count === 'number'",
                expected: true,
                message: "Create a numeric `count` variable."
              },
              {
                type: "expression-returns",
                expression: "(() => { voteButton.click(); return document.querySelector('#count')?.textContent === '1'; })()",
                expected: true,
                message: "Clicking the button should update the visible count to 1."
              }
            ],
            xp: 70
          },
          nextLessonSlug: "theme-toggle"
        },
        {
          id: "lesson-theme-toggle",
          slug: "theme-toggle",
          title: "Build a Theme Toggle",
          duration: "25 min",
          objectives: [
            "Toggle classes in response to user action.",
            "Use JS to switch visual states.",
            "Think in named states instead of direct styles."
          ],
          sections: [
            {
              title: "State should have names",
              paragraphs: [
                "It is often better to toggle a class than to write many inline styles. A named state can travel cleanly between design and implementation.",
                "When teams share language around state names, implementation gets faster and review gets clearer."
              ]
            }
          ],
          exercise: {
            id: "exercise-theme-toggle",
            title: "Theme state toggle",
            prompt: "Make the button toggle the `is-light` class on the panel.",
            runtime: "html-css-js",
            starterFiles: {
              html: `<section class="panel" id="panel">\n  <p>Color systems are interface systems.</p>\n  <button id="toggle-theme">Toggle theme</button>\n</section>`,
              css: `.panel {\n  width: 360px;\n  margin: 48px auto;\n  padding: 24px;\n  border-radius: 24px;\n  background: #ffffff;\n  color: #0a0a0a;\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.08);\n}\n.panel.is-light {\n  background: #eff6ff;\n  color: #0a0a0a;\n}`,
              js: `const panel = document.querySelector("#panel");\nconst toggleThemeButton = document.querySelector("#toggle-theme");`
            },
            solutionFiles: {
              html: `<section class="panel" id="panel">\n  <p>Color systems are interface systems.</p>\n  <button id="toggle-theme">Toggle theme</button>\n</section>`,
              css: `.panel {\n  width: 360px;\n  margin: 48px auto;\n  padding: 24px;\n  border-radius: 24px;\n  background: #ffffff;\n  color: #0a0a0a;\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.08);\n}\n.panel.is-light {\n  background: #eff6ff;\n  color: #0a0a0a;\n}`,
              js: `const panel = document.querySelector("#panel");\nconst toggleThemeButton = document.querySelector("#toggle-theme");\n\ntoggleThemeButton?.addEventListener("click", () => {\n  panel?.classList.toggle("is-light");\n});`
            },
            hints: [
              "The panel already has the target ID.",
              "You only need one event listener and one class toggle."
            ],
            checks: [
              {
                type: "expression-returns",
                expression: "(() => { toggleThemeButton.click(); return panel.classList.contains('is-light'); })()",
                expected: true,
                message: "Clicking the button should add the `is-light` class."
              }
            ],
            xp: 65
          }
        }
      ]
    },
    {
      id: "module-dom",
      title: "DOM Manipulation",
      summary: "Use JavaScript to create, update, and filter interface elements intentionally.",
      lessons: [
        {
          id: "lesson-status-filter",
          slug: "status-filter",
          title: "Filter a Status List",
          duration: "25 min",
          objectives: [
            "Loop through nodes and update their visibility.",
            "Use data attributes to drive simple filtering.",
            "Keep interactive logic readable."
          ],
          sections: [
            {
              title: "Filtering is a design system behavior",
              paragraphs: [
                "Lists, galleries, and dashboards all rely on the same pattern: keep the data visible, then show only the pieces that fit the current view.",
                "Filtering is one of the fastest ways to make a prototype feel like a real working product."
              ]
            }
          ],
          exercise: {
            id: "exercise-status-filter",
            title: "Show only ready items",
            prompt: "When the filter button is clicked, hide every card except those with `data-status='ready'`.",
            runtime: "html-css-js",
            starterFiles: {
              html: `<div class="stack">\n  <button id="filter-ready">Show ready only</button>\n  <article class="item" data-status="ready">Prototype review</article>\n  <article class="item" data-status="draft">New onboarding flow</article>\n  <article class="item" data-status="ready">Motion tokens</article>\n</div>`,
              css: `.stack {\n  width: 420px;\n  margin: 48px auto;\n  display: grid;\n  gap: 12px;\n}\n.item {\n  padding: 16px;\n  border-radius: 18px;\n  background: #ffffff;\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.05);\n}`,
              js: `const filterReadyButton = document.querySelector("#filter-ready");\nconst items = document.querySelectorAll(".item");`
            },
            solutionFiles: {
              html: `<div class="stack">\n  <button id="filter-ready">Show ready only</button>\n  <article class="item" data-status="ready">Prototype review</article>\n  <article class="item" data-status="draft">New onboarding flow</article>\n  <article class="item" data-status="ready">Motion tokens</article>\n</div>`,
              css: `.stack {\n  width: 420px;\n  margin: 48px auto;\n  display: grid;\n  gap: 12px;\n}\n.item {\n  padding: 16px;\n  border-radius: 18px;\n  background: #ffffff;\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.05);\n}`,
              js: `const filterReadyButton = document.querySelector("#filter-ready");\nconst items = document.querySelectorAll(".item");\n\nfilterReadyButton?.addEventListener("click", () => {\n  items.forEach((item) => {\n    item.style.display = item.getAttribute("data-status") === "ready" ? "block" : "none";\n  });\n});`
            },
            hints: [
              "The node list already exists for you as `items`.",
              "Each item tells you its status with a data attribute."
            ],
            checks: [
              {
                type: "expression-returns",
                expression: "(() => { filterReadyButton.click(); return [...document.querySelectorAll('.item')].filter((item) => getComputedStyle(item).display !== 'none').length === 2; })()",
                expected: true,
                message: "After filtering, only two cards should remain visible."
              }
            ],
            xp: 75
          },
          nextLessonSlug: "render-tags"
        },
        {
          id: "lesson-render-tags",
          slug: "render-tags",
          title: "Render a Tag List from Data",
          duration: "25 min",
          objectives: [
            "Create DOM nodes from an array.",
            "Append generated elements into a container.",
            "Keep repetition inside data rather than markup."
          ],
          sections: [
            {
              title: "Data should generate repetition",
              paragraphs: [
                "As soon as content repeats, it is usually a sign that JavaScript can help you move from hand-built markup toward repeatable systems.",
                "This is the first step from designing one screen to designing something that can grow."
              ]
            }
          ],
          exercise: {
            id: "exercise-render-tags",
            title: "Build tag pills",
            prompt: "Render one tag pill per label in the `tags` array into the empty `#tag-list` container.",
            runtime: "html-css-js",
            starterFiles: {
              html: `<section class="tag-board">\n  <div id="tag-list"></div>\n</section>`,
              css: `.tag-board {\n  width: 420px;\n  margin: 48px auto;\n}\n#tag-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n.tag {\n  padding: 10px 14px;\n  border-radius: 999px;\n  background: rgba(37, 99, 235, 0.08);\n  border: 1px solid rgba(37, 99, 235, 0.08);\n}`,
              js: `const tags = ["Systems", "Prototype", "Docs"];\nconst tagList = document.querySelector("#tag-list");`
            },
            solutionFiles: {
              html: `<section class="tag-board">\n  <div id="tag-list"></div>\n</section>`,
              css: `.tag-board {\n  width: 420px;\n  margin: 48px auto;\n}\n#tag-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n.tag {\n  padding: 10px 14px;\n  border-radius: 999px;\n  background: rgba(37, 99, 235, 0.08);\n  border: 1px solid rgba(37, 99, 235, 0.08);\n}`,
              js: `const tags = ["Systems", "Prototype", "Docs"];\nconst tagList = document.querySelector("#tag-list");\n\ntags.forEach((label) => {\n  const tag = document.createElement("span");\n  tag.className = "tag";\n  tag.textContent = label;\n  tagList?.appendChild(tag);\n});`
            },
            hints: [
              "Use `document.createElement` to build each pill.",
              "Give each new node the class name `tag`."
            ],
            checks: [
              {
                type: "selector-count",
                selector: ".tag",
                count: 3,
                message: "Render one `.tag` element per item in the array."
              },
              {
                type: "text-equals",
                selector: ".tag:last-child",
                text: "Docs",
                message: "The last rendered tag should contain the text `Docs`."
              }
            ],
            xp: 75
          }
        }
      ]
    }
  ]
};
