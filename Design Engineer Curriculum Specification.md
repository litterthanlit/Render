# **Design Engineer Curriculum Specification**

*Version 2: Design Engineering for the Agent Era*

## **Purpose**

This document outlines a comprehensive curriculum for teaching designers who have never written code before how to become fully hireable design engineers. The program combines interactive, hands-on labs with structured learning paths to build competence from foundational web technologies through modern frontend frameworks, design systems, and deployment.

Version 2 repositions the program for how interface software is now built. Coding agents can generate plausible code quickly; what they cannot supply is product judgment, system consistency, accessibility rigor, interaction taste, and accountability for what ships. This curriculum trains the person who supplies those things. Learners still build fundamentals by hand, then learn to brief, direct, review, verify, and own work produced with agents.

## **Program Principles**

1. **Fundamentals first, by hand.** Phases 1–5 are completed without AI code generation. Learners cannot review what they cannot read, and they cannot direct an agent precisely without the vocabulary the fundamentals provide.
2. **Agents are woven in, not bolted on.** From Phase 6 onward, AI-assisted work appears inside every phase through the Agent Pass (below), not as a single late module.
3. **Grade judgment, not output.** When an agent produced the code, the learner is assessed on the quality of their brief, the defects they caught, the checks they ran, and the decisions they documented.
4. **Teach concepts, use current tools as examples.** Tools change faster than the curriculum. Lessons name the concept (context files, tool connections, diff review) and treat specific products as replaceable examples.
5. **Verification is a habit, not a phase.** Tests, accessibility checks, and acceptance criteria appear early so they can act as guardrails for both human and agent work.
6. **Systems are context.** Design tokens, component documentation, and project instructions are taught as material that both people and agents read, which makes design-system quality directly affect delivery speed.
7. **Original work over tutorials.** Every phase after the foundations ends with work the learner scoped themselves, not only guided exercises.

## **Target Audience**

The program is designed for product, UX, and UI designers who are proficient in tools like Figma, and understand visual design, layout, and user flows, but have little to no experience with HTML, CSS, JavaScript, Git, or production code. No prior experience with AI coding tools is assumed.

## **Learning Objectives**

Learners will:

* Build a strong foundation in web fundamentals: HTML, CSS, and semantic structure.
* Learn modern CSS layout techniques (box model, Flexbox, Grid, fluid type, container queries) and responsive design.
* Understand JavaScript fundamentals and DOM manipulation to create interactive interfaces.
* Gain proficiency with Git and command-line workflows, including branching, merging, resolving conflicts, and reviewing diffs.
* Direct coding agents with clear briefs, project context, and task boundaries, and review their output critically.
* Conduct lightweight product discovery and user research before implementation, and turn findings into briefs that people and agents can act on.
* Develop skills in React and TypeScript for component-based UI development.
* Translate Figma systems into code with tokens, variants, documentation, and governance, structured so agents can use the system correctly.
* Write practical tests and use them as guardrails for both human and agent-generated changes.
* Apply accessibility best practices and measurable performance budgets in all aspects of UI development.
* Work with APIs and asynchronous data to build dynamic experiences.
* Create polished micro-interactions and animations.
* Design and build interfaces for AI products: streaming output, uncertainty, citations, agent progress, and human approval steps.
* Deploy projects with continuous integration and document them for a professional portfolio.
* Develop a capstone project that demonstrates the ability to translate a real design into a production-ready, accessible, responsive web application, with a documented, reviewable workflow.

## **The Agent Pass**

The Agent Pass is the standard structure for AI-assisted work from Phase 6 onward. It is attached to selected labs in each phase rather than taught once.

1. **Build or study by hand.** The learner completes the core lab themselves, or reviews a hand-built reference.
2. **Brief.** The learner writes a short brief for a related or extended task: goal, constraints, acceptance criteria, files in scope, and what "done" means.
3. **Generate.** An agent produces an implementation. In the platform's sandboxed labs, the output may include deliberately planted defects (for example: a missing focus state, a hard-coded value instead of a token, a layout that breaks at a narrow width, an unlabeled control, an unhandled error state).
4. **Review.** The learner reviews the diff against the brief, the design system, accessibility requirements, and the phase's checks, and records each issue found.
5. **Verify and fix.** The learner runs the checks or tests, fixes or rejects changes, and confirms the result.
6. **Log decisions.** The learner records what they accepted, overrode, or rewrote, and why.

**Assessment:** the Agent Pass is graded on brief clarity, the share of planted and real defects caught, verification performed, and the quality of the decision log. Passing generated output without review does not count as completion.

**Boundaries:** no AI code generation in Phases 1–5. Learners may use AI to explain concepts or error messages in those phases, but the code they submit must be their own.

## **Program Overview**

The curriculum is organized into eighteen sequential phases in five stages. Each phase has clear learning goals, lessons, interactive labs, and projects. The program provides a progressive path from absolute beginner to a junior design engineer with a complete portfolio.

| Stage | Phases | Focus |
|---|---|---|
| Foundations (by hand) | 1–5 | Web fundamentals, Git, and developer workflow without AI code generation |
| Directing work | 6–7 | Agent workflow and product discovery: deciding what to build and how to brief it |
| Building systems | 8–11 | React, TypeScript, design systems, and testing as guardrails |
| Production quality | 12–15 | Accessibility, performance, data, motion, deployment, and CI |
| AI products and proof | 16–18 | Interfaces for AI products, capstone, and career preparation |

### **Phase 1: Orientation to Code for Designers**

Goal: Introduce the mindset of coding as a design material, set up the development environment, and set expectations for how AI fits into the program.
 Topics:

* Why designers code
* Development tools overview
* Code editors and browser DevTools
* Using online sandboxes
* How the program uses AI: hand-built foundations first, agent-directed work later, and why
   Activities:
* Set up VS Code or an online editor
* Explore DevTools to inspect HTML and CSS on a real product page
* Compare a hand-written component with an AI-generated one and list differences the learner cannot yet judge (a baseline revisited at the end of Phase 5)
   Deliverables:
* Environment checklist
* Reflection on coding mindset
* Baseline "what I can't judge yet" list
   Evaluation Criteria: Learner can set up a development environment, inspect a page with DevTools, and articulate why coding enhances design.

### **Phase 2: HTML & Semantic Structure**

Goal: Build solid knowledge of semantic HTML and accessible structure.
 Topics:

* HTML tags and document structure
* Semantic elements and landmarks
* Headings, lists, links versus buttons
* Forms and labels
* Accessibility basics and the accessibility tree
   Activities:
* Interactive labs building a portfolio card with proper headings and labels
* Exercise mapping a page using header, nav, main, and footer landmarks
* Lab building an accessible form with labels and helper text
* Short quizzes on semantic tags
   Deliverables:
* Portfolio card markup
* Page skeleton with landmarks
* Accessible form markup
   Evaluation Criteria: Learner produces well-structured, semantic HTML and explains tag choices in design language.

### **Phase 3: CSS Layout & Responsive Design**

Goal: Learn to control layout, spacing, and rhythm using modern CSS.
 Topics:

* Box model, margin, padding, and `box-sizing`
* Flexbox basics and advanced features
* Grid layout, including named areas and auto-fit columns
* Responsive media queries and mobile-first breakpoints
* Fluid type and spacing with `clamp()`
* Container queries for component-level responsiveness
* CSS custom properties as early tokens
   Activities:
* Lab inspecting and fixing box-model spacing issues
* Lab arranging a split hero section with Flexbox
* Exercise composing a compact action row
* Lab building a responsive card grid with Grid
* Lab adapting a card with a container query
* Project: build a responsive homepage that adapts to mobile, tablet, and desktop (submitted as files in the platform; moved into Git in Phase 5)
   Deliverables:
* Responsive hero section
* Action row component
* Responsive card grid
* Responsive homepage project
   Evaluation Criteria: Learner can build responsive layouts using Flexbox and Grid, use fluid values and container queries where appropriate, and explain spacing and breakpoint decisions.

### **Phase 4: JavaScript Fundamentals & DOM Manipulation**

Goal: Introduce the principles of JavaScript programming and how to interact with the DOM.
 Topics:

* Variables, data types, objects, arrays, and functions
* Conditionals and loops
* Event handling
* DOM querying and manipulation
* Reading error messages and using the console to debug
   Activities:
* Labs on variables, arrays, objects, and functions before any DOM work
* Lab wiring a simple counter: updating numbers on click
* Exercise building a theme toggle via class toggling
* Lab filtering a status list using data attributes
* Lab rendering a tag list from an array
* Debugging lab: find and fix three broken interactions using the console
   Deliverables:
* Counter component
* Theme toggle component
* Filtered list
* Tag rendering function
* Debugging notes
   Evaluation Criteria: Learner writes clean JS that updates the DOM in response to user actions and can read and act on error messages.

### **Phase 5: Git, Command Line & Developer Workflow**

Goal: Teach version control, collaboration, and effective workflow practices, with emphasis on reading and reviewing changes.
 Topics:

* Command-line essentials
* Git basics: init, status, add, commit
* Branches, switching, and merging
* Merge conflicts and how to resolve them
* Reading diffs and commit history
* Using GitHub and pull requests
* Code review etiquette: giving and receiving review
   Activities:
* Initialize a repository and commit the Phase 3 homepage project
* Practice branching and merging, including resolving a staged merge conflict
* Practice branching and merging with a peer
* Review a peer's pull request and leave structured comments
* Revisit the Phase 1 baseline list and mark what the learner can now judge
   Deliverables:
* Repository with multiple branches, a resolved conflict, and a pull request
* Pull request review left on a peer's work
   Evaluation Criteria: Learner can manage code changes, read a diff critically, and collaborate using Git and GitHub.

### **Phase 6: Directing Agents**

Goal: Teach learners to direct coding agents with clear briefs and context, and to review and verify what agents produce. This phase introduces the Agent Pass used in every later phase.
 Topics:

* What coding agents are good at, where they fail, and why
* Writing actionable briefs: goal, constraints, acceptance criteria, scope, definition of done
* Context engineering: project instruction files, design tokens, and component docs as material agents read
* Breaking work into delegable tasks and deciding what not to delegate
* Reviewing agent diffs: correctness, accessibility, system fit, maintainability
* Checks and tests as guardrails for agent work
* Connecting agents to design tools and data sources through standard tool protocols (for example, the Model Context Protocol)
* Security and privacy: secrets, private data, untrusted dependencies, and unverified output
* Disclosure: how to describe AI-assisted work honestly in reviews and portfolios
   Activities:
* Write a brief for a small change to the Phase 3 homepage, run it through an agent, and review the result
* Write a project instruction file describing conventions, tokens, and constraints, then compare agent output with and without it
* Review three agent-generated diffs with planted defects and log every issue found
* Break a multi-step feature into delegable tasks and justify which parts stay human-owned
* Complete the first full Agent Pass on a previous lab
   Deliverables:
* Brief and decision log for one agent-assisted change
* Project instruction file
* Diff review log
* Verification checklist the learner will reuse in later phases
   Evaluation Criteria: Learner can write a brief an agent can act on, catch defects in generated code, verify changes before accepting them, and explain what they delegated and why.

### **Phase 7: Product Discovery & User Research**

Goal: Teach learners to define the right problem before building the interface, and to turn findings into briefs that people and agents can act on.
 Topics:

* Product framing, assumptions, and success metrics
* User interviews, usability tests, and lightweight synthesis
* Translating research findings into requirements and interface decisions
* Acceptance criteria as the shared contract between design, engineering, and agents
* Using AI to support synthesis without replacing direct contact with users
   Activities:
* Write a short product brief for a small interface
* Conduct one moderated usability test or interview
* Convert findings into prioritized requirements with acceptance criteria
* Use an agent to draft a synthesis from anonymized notes, then audit it against the raw notes for errors and invented claims
   Deliverables:
* Product brief
* Research notes and findings summary
* Requirements checklist with acceptance criteria
* Synthesis audit note
   Evaluation Criteria: Learner can connect user evidence to design and engineering decisions and write acceptance criteria precise enough to guide implementation.

### **Phase 8: React Fundamentals**

Goal: Transition to component-based UI development using React.
 Topics:

* JSX syntax
* Components, props, and state
* Hooks for state and side effects
* Component composition
* Rendering lists and keys
   Activities:
* Convert previous labs into React components by hand
* Build a counter component in React
* Create a dynamic list component
* Agent Pass: brief an agent to extend a component with a new variant, then review and correct the result
   Deliverables:
* React components library
* Simple React app
* Agent Pass decision log
   Evaluation Criteria: Learner can build interactive UI components using React, explain how state drives rendering, and identify incorrect state handling in generated code.

### **Phase 9: TypeScript for Design Engineers**

Goal: Introduce type safety and enhance code maintainability.
 Topics:

* Type annotations, interfaces, and generics
* Union types for component variants
* Migrating JavaScript to TypeScript
* Handling props and state types
* Types as a machine-readable component contract for people and agents
   Activities:
* Add types to existing React components
* Refactor a small project to TypeScript
* Agent Pass: have an agent migrate a component to TypeScript, then review for loose types, unsafe casts, and `any`
   Deliverables:
* TypeScript-converted components
* Project refactored with type safety
* Agent Pass decision log
   Evaluation Criteria: Learner uses TypeScript to prevent common runtime errors, design clear component APIs, and reject weakly typed generated code.

### **Phase 10: Figma-to-Code Design Systems & Tokens**

Goal: Teach how to formalize and maintain reusable interface patterns from Figma through code, structured so that people and agents can use the system correctly.
 Topics:

* Design tokens: color, spacing, typography, radius, motion
* Primitive versus semantic tokens, theming, and token naming
* Component architecture, APIs, and variants
* Figma variables, component properties, auto layout, and variant mapping
* Component states beyond the default
* Storybook documentation, controls, visual states, and usage guidance
* Documentation written for both human and agent consumers
* Design-system governance: contribution rules, review process, changelogs, and versioning
   Activities:
* Map a Figma component set to tokens, props, and coded variants
* Define a token set in code and document naming decisions
* Build a button, text field, and card component with responsive, accessible variants and full state coverage
* Document components in Storybook with controls, states, accessibility notes, and do/don't examples
* Agent Pass: ask an agent to build a new component using only the documented system, then audit the result for token misuse and off-system values
   Deliverables:
* Token file
* Component library
* Storybook component documentation
* Contribution guidelines and release notes
* System-fit audit of agent-generated component
   Evaluation Criteria: Learner builds scalable, reusable components, can govern a design-system change from Figma through code, and can show that the system's documentation produces on-system output from an agent.

### **Phase 11: Testing & Quality Assurance**

Goal: Teach practical testing and QA early enough that tests act as guardrails for all later work, human or agent-generated.
 Topics:

* Unit, component, interaction, and visual regression testing
* Testing behavior rather than implementation details
* Writing tests from acceptance criteria
* Tests as guardrails for agent-generated changes
* Manual QA checklists across browsers, devices, and input methods
   Activities:
* Write tests for a component's variants, states, and interactions
* Write tests from the Phase 7 acceptance criteria before implementing a feature
* Agent Pass: have an agent generate tests, then find the weak or meaningless ones (for example, tests that pass regardless of behavior)
* Use the learner's own tests to catch a regression in an agent-generated change
* Run a manual QA pass against the Phase 3 or Phase 10 work
   Deliverables:
* Component test suite
* QA checklist
* Test review notes on agent-generated tests
   Evaluation Criteria: Learner can write meaningful tests, judge test quality, and use tests to accept or reject changes with confidence.

### **Phase 12: Accessibility, Performance & Quality Metrics**

Goal: Embed accessibility and performance considerations throughout the work with measurable evidence.
 Topics:

* ARIA roles and attributes, and when not to use them
* Keyboard navigation and focus management
* Reduced motion and color contrast
* Performance optimization techniques
* Lighthouse, Web Vitals, axe, screen reader checks, and manual keyboard QA
* Automated accessibility checks in the test suite
* Quality gates and measurable acceptance criteria
* Common accessibility failures in generated code
   Activities:
* Audit a project for accessibility
* Implement keyboard interactions
* Profile and optimize a React app
* Define accessibility and performance budgets for a project
* Add automated accessibility checks to the Phase 11 test suite
* Agent Pass: audit an agent-generated interactive component with keyboard and screen reader, and fix what automated tools miss
   Deliverables:
* Accessibility audit report
* Optimized UI component
* Before/after metric snapshot
   Evaluation Criteria: Learner can identify and fix accessibility issues, meet defined budgets, and explain the measured impact of improvements.

### **Phase 13: APIs, Data & State Management**

Goal: Handle external data and manage application state.
 Topics:

* Fetching data with `fetch`
* Async/await and promises
* Loading, empty, error, and success states
* Local state, lifted state, Context, and reducers
* Forms, validation, and optimistic updates
* Error handling
   Activities:
* Connect a React app to a real public API
* Display dynamic data in a component
* Handle loading, empty, and error states
* Model a multi-step flow with a reducer
* Agent Pass: review agent-generated data code for unhandled errors, race conditions, and missing states
   Deliverables:
* Data-driven component
* State-managed app
* State model diagram
   Evaluation Criteria: Learner can integrate data from APIs, design every data state, and manage complex state gracefully.

### **Phase 14: Motion, Animation & Micro-Interactions**

Goal: Add polish and delight through thoughtful motion.
 Topics:

* CSS transitions and keyframes
* Framer Motion or similar libraries
* Timing functions and physics-based animation
* Motion tokens and choreography
* Reduced-motion alternatives
* Performance of animation (compositor-friendly properties)
   Activities:
* Animate button interactions
* Build a modal with entrance and exit animations
* Create a micro-interaction for a card hover effect
* Agent Pass: refine agent-generated motion against motion tokens, timing intent, and reduced-motion requirements
   Deliverables:
* Animated component library
* Motion rationale notes
   Evaluation Criteria: Learner can implement accessible, performant animations, justify their use, and correct motion that is technically valid but feels wrong.

### **Phase 15: Deployment & Continuous Integration**

Goal: Teach how to ship code to production environments with automated checks.
 Topics:

* Build tools (Vite, Next.js or similar)
* Environment variables, secrets, and the build process
* Hosting on platforms like Vercel or Netlify
* Preview deployments and release review
* Continuous integration: running tests, type checks, and accessibility checks on every pull request
* Agent-assisted changes in CI: review requirements and merge rules
   Activities:
* Deploy a small React app
* Configure environment variables for an API key without exposing it
* Set up CI with GitHub Actions that runs the learner's test suite, type checks, and accessibility checks
* Debug a failing production build
* Write a release README with known limitations
   Deliverables:
* Deployed project URL
* CI configuration file
* Release README
   Evaluation Criteria: Learner can deploy and update a web project with clear release confidence and automated quality gates.

### **Phase 16: Designing AI Products**

Goal: Teach learners to design and build interfaces for AI-powered products, an area where design engineering skills are in particular demand.
 Topics:

* Interaction patterns for AI: chat, inline assistance, background agents, and generated interfaces
* Streaming output and progressive rendering
* Communicating uncertainty, sources, and citations
* Showing agent progress across multi-step tasks
* Human approval, undo, and recovery
* Error, refusal, and timeout states
* Latency, cost, and trust as design constraints
* Evaluating AI features: defining what "good output" means and checking it
   Activities:
* Build a streaming response component with loading, partial, complete, and error states
* Design and build an agent task view showing steps, progress, and an approval step before a consequential action
* Build a citation pattern that links generated claims to sources
* Run a small usability test on an AI feature and document trust and comprehension issues
* Agent Pass: review an agent-built AI interface for missing failure states and unclear system status
   Deliverables:
* AI interface component set (streaming, progress, approval, citation, error)
* AI feature usability findings
* Evaluation checklist for an AI feature
   Evaluation Criteria: Learner can design and build AI product interfaces that communicate system status, handle failure, keep humans in control of consequential actions, and earn appropriate user trust.

### **Phase 17: Capstone Project**

Goal: Synthesize all skills into a portfolio-worthy, real-world project with a documented, reviewable workflow.
 Topics:

* End-to-end product workflow: discovery to Figma to code
* Product brief, user needs, and acceptance criteria
* Design system integration
* API integration and dynamic data
* Testing, QA, accessibility, and performance validation
* Agent workflow: briefs, context files, review, and disclosure
* Documentation and case study writing
   Activities:
* Choose or receive a Figma design to implement with a clear product brief, or choose the AI product track (an AI-powered interface built on Phase 16 patterns)
* Plan and execute the build with version control, CI, and code reviews
* Maintain a project instruction file and decision log for all agent-assisted work
* Run usability, accessibility, performance, and visual QA checks
* Write a detailed case study explaining design, technical, and workflow decisions
   Deliverables:
* Fully responsive, accessible React app
* Storybook documentation
* Test suite, CI pipeline, and QA evidence
* Live deployment
* Agent workflow evidence: brief(s), instruction file, review and decision log, and disclosure note
* Portfolio case study
   Evaluation Criteria: Learner demonstrates independence, quality, attention to detail, and clear ownership of every decision across design, engineering, and agent-assisted work.

### **Phase 18: Portfolio & Career Preparation**

Goal: Prepare learners for job applications and interviews.
 Topics:

* Curating and presenting work
* Writing case studies
* Presenting an AI-assisted workflow honestly and as a strength
* Mock technical and design interviews, including live code review of generated code
* Resume and LinkedIn optimization
   Activities:
* Review and refine portfolio projects
* Conduct mock interviews, including a live diff review exercise
* Write case studies summarizing challenges, solutions, and workflow decisions
   Deliverables:
* Portfolio site
* Updated resume and LinkedIn profile
* Interview feedback
   Evaluation Criteria: Learner is ready to apply for junior design engineer roles with confidence and can explain how they work with agents without overstating or hiding it.

## **Assessment Standards**

To keep completion meaningful, assessments across the program follow these rules:

* **Behavioral checks over text matching.** Automated lab checks verify what the code does (rendered output, interactions, accessibility tree, test results), not whether certain words appear in the source.
* **No length-only grading.** Written work (briefs, audits, reflections, decision logs) is checked against required content and, where it matters, reviewed by a mentor or structured AI reviewer with human sign-off.
* **Real review states.** Projects move through submitted, needs revision, and approved, with rubric scores and reviewer comments.
* **Planted defects for review skills.** Agent Pass labs include known defects so review quality can be measured.
* **Independent challenges.** Each phase from Phase 3 onward includes at least one task started from a blank file with no starter code.
* **Spaced review.** Earlier skills reappear in later labs (for example, semantic HTML and contrast in the motion and AI-product phases).

## **Mentorship & Feedback**

To ensure mastery and confidence, the program must provide:

* Regular code reviews by experienced design engineers.
* Structured design critiques focusing on product intent, accessibility, interaction quality, visual polish, and technical feasibility.
* Pair programming sessions to model workflows and debugging, including sessions where the mentor models directing and reviewing an agent.
* Weekly office hours for research synthesis, Figma-to-code decisions, test strategy, agent workflow, and design-system governance.
* Mentor rubrics for pull requests, Agent Pass decision logs, Storybook quality, accessibility metrics, performance budgets, and portfolio readiness.
* Peer critique rounds where learners present tradeoffs, receive notes, and document follow-up decisions.
* An in-platform AI reviewer that gives fast first-pass feedback on code and written work; it supplements human review and never replaces final sign-off.
* Career coaching, including portfolio reviews and mock interviews.
* Community forums or cohorts for peer support and accountability.

## **Timeline Options**

The curriculum can be adapted to different schedules:
 Intensive Program (14–18 weeks):

* Commitment: 20–30 hours per week.
* Suited for students who can dedicate full-time attention.
* Weekly deliverables and frequent feedback.
   Part-Time Program (28–40 weeks):
* Commitment: 10–15 hours per week.
* Allows students to learn while maintaining part-time work or study.
* Longer milestones but consistent progress.
   Self-Paced Program:
* Flexible timeframe; students progress at their own pace.
* Recommended check-in points with mentors every two weeks, and a required mentor review at the end of Phase 5 (before agent work begins) and Phase 11 (before production-quality work begins).

## **Hireability Checklist**

Graduates should meet the following criteria:

* Comfortable coding semantic, accessible HTML and modern CSS.
* Able to build responsive layouts for multiple breakpoints using Flexbox, Grid, fluid values, and container queries.
* Fluent in JavaScript, including asynchronous patterns and DOM manipulation.
* Proficient in React and TypeScript, with awareness of component architecture.
* Capable of translating Figma systems into governed tokens, components, Storybook docs, and release notes.
* Can run lightweight product discovery and turn findings into acceptance criteria.
* Can direct coding agents with clear briefs and project context, and review, verify, and take ownership of their output.
* Understands and applies accessibility guidelines and performance optimizations with measured evidence.
* Writes practical tests and QA checklists, and uses them to accept or reject changes.
* Uses Git and GitHub workflows effectively, including branching, conflict resolution, and diff review.
* Integrates APIs and manages state in a React application.
* Can deploy projects and configure CI pipelines with automated quality gates.
* Can design and build interfaces for AI products that communicate status, handle failure, and keep humans in control.
* Demonstrates polished motion and interaction design when appropriate.
* Produces a comprehensive portfolio with case studies, code, and honest documentation of their workflow.

## **Common Gaps to Avoid**

Avoid these pitfalls when developing the curriculum:

* Teaching HTML/CSS basics without progressing to responsive design and advanced layout techniques.
* Jumping into React without first building strong JavaScript fundamentals.
* Ignoring Git and workflow tools until the end; integrate them early.
* Requiring Git or deployment deliverables before those skills are taught.
* Relying solely on tutorial-style exercises without requiring original projects.
* Neglecting accessibility and performance until the final phases.
* Teaching testing after deployment, so learners ship before they learn to verify.
* Failing to connect code exercises back to real product design and systems thinking.
* Treating Figma-to-code work as pixel copying instead of systems translation and governance.
* Using Storybook as a gallery instead of a maintained source of component behavior, states, and usage rules.
* Skipping tests, QA passes, or measurable acceptance criteria.
* Letting learners use AI to generate code before they can read and judge it.
* Teaching AI as a single late module instead of a workflow practiced throughout.
* Teaching AI tools as shortcuts without requiring review, validation, and ownership.
* Teaching specific AI products instead of durable concepts, so lessons go stale within months.
* Grading AI-assisted work on the output alone instead of on the brief, review, and verification.
* Grading written work by length or code by text matching.
* Providing minimal or automated feedback; students need human review.
* Running critique as opinion-only feedback instead of a structured operating model with rubrics and follow-up decisions.
* Not giving students a chance to build and document a full project from scratch.

## **Changes from Version 1**

| Change | Reason |
|---|---|
| Added Phase 6: Directing Agents | Agent-directed work is now part of everyday design engineering; it needs explicit teaching and assessment |
| Added the Agent Pass to Phases 6–17 | Integrates AI practice throughout instead of in one late phase |
| Added Phase 16: Designing AI Products | Interfaces for AI products are a growing, design-led area of frontend work |
| Removed the standalone AI-Era phase | Its content now lives in Phase 6, the Agent Pass, and Phase 16 |
| Moved Product Discovery to Phase 7 (before React) | Every later build should start from a brief and acceptance criteria |
| Split Testing from Deployment and moved Testing to Phase 11 | Tests must exist before production work so they can act as guardrails |
| Merged Figma-to-Code into Design Systems (Phase 10) | They are one topic; splitting them separated tokens from their source |
| Expanded Phases 3–5 | Added Grid, box model, fluid type, container queries, JS basics, debugging, branching, merging, and conflict resolution |
| Moved the Phase 3 project's Git submission to Phase 5 | Learners were asked for a GitHub repository before Git was taught |
| Added Assessment Standards | Prevents completion by text matching or length-only answers |
| Extended timelines | Two new phases and expanded foundations |

### **Phase Mapping (Version 1 → Version 2)**

| V1 | V2 |
|---|---|
| 1 Orientation | 1 Orientation (adds AI expectations) |
| 2 HTML & Semantic Structure | 2 (adds forms) |
| 3 CSS Layout & Responsive Design | 3 (expanded) |
| 4 JavaScript & DOM | 4 (expanded) |
| 5 Git & Workflow | 5 (adds merging, conflicts, diff review) |
| — | **6 Directing Agents (new)** |
| 6 Product Discovery | 7 |
| 7 React Fundamentals | 8 |
| 8 TypeScript | 9 |
| 9 Figma-to-Code Design Systems | 10 |
| 13 Testing, QA, Deployment & CI (testing half) | 11 Testing & QA |
| 10 Accessibility & Performance | 12 |
| 11 APIs, Data & State | 13 |
| 12 Motion | 14 |
| 13 Testing, QA, Deployment & CI (deployment half) | 15 Deployment & CI |
| 14 AI-Era Design Engineering | Folded into 6, the Agent Pass, and 16 |
| — | **16 Designing AI Products (new)** |
| 15 Capstone | 17 (adds agent workflow evidence and AI product track) |
| 16 Portfolio & Career | 18 |
