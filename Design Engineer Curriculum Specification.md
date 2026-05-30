# **Design Engineer Curriculum Specification**

## **Purpose**

This document outlines a comprehensive curriculum for teaching designers who have never written code before how to become fully hireable design engineers. The program combines interactive, hands-on labs with structured learning paths to build competence from foundational web technologies through modern frontend frameworks, design systems, and deployment.

## **Target Audience**

The program is designed for product, UX, and UI designers who are proficient in tools like Figma, and understand visual design, layout, and user flows, but have little to no experience with HTML, CSS, JavaScript, Git, or production code.

## **Learning Objectives**

Learners will:

* Build a strong foundation in web fundamentals: HTML, CSS, and semantic structure.
* Learn modern CSS layout techniques (Flexbox, Grid) and responsive design.
* Understand JavaScript fundamentals and DOM manipulation to create interactive interfaces.
* Gain proficiency with Git and command-line workflows for version control and collaboration.
* Develop skills in React and TypeScript for component-based UI development.
* Learn to structure and maintain design systems and design tokens.
* Conduct lightweight product discovery and user research before implementation.
* Apply accessibility best practices in all aspects of UI development.
* Work with APIs and asynchronous data to build dynamic experiences.
* Implement measurable accessibility, performance, testing, and QA practices.
* Create polished micro-interactions and animations.
* Translate Figma systems into code with tokens, variants, documentation, and governance.
* Use AI tools responsibly for prototyping, code review, debugging, and documentation.
* Deploy and document projects for a professional portfolio.
* Develop a capstone project that demonstrates the ability to translate a real design into a production-ready, accessible, responsive web application.

## **Program Overview**

The curriculum is organized into sequential phases, each with clear learning goals, lessons, interactive labs, and projects. The program provides a progressive path from absolute beginner to a junior design engineer with a complete portfolio.

### **Phase 1: Orientation to Code for Designers**

Goal: Introduce the mindset of coding as a design material and set up the development environment.
 Topics:

* Why designers code
* Development tools overview
* Code editors and browser DevTools
* Using online sandboxes
   Activities:
* Set up VS Code or an online editor
* Explore DevTools to inspect HTML and CSS
   Deliverables:
* Environment checklist
* Reflections on coding mindset
   Evaluation Criteria: Learner can set up a development environment and articulate why coding enhances design.

### **Phase 2: HTML & Semantic Structure**

Goal: Build solid knowledge of semantic HTML and accessible structure.
 Topics:

* HTML tags and document structure
* Semantic elements
* Accessibility basics
   Activities:
* Interactive labs building a portfolio card with proper headings and labels
* Exercise mapping a page using header, main, footer landmarks
* Short quizzes on semantic tags
   Deliverables:
* Portfolio card markup
* Page skeleton with landmarks
   Evaluation Criteria: Learner produces well-structured, semantic HTML and explains tag choices.

### **Phase 3: CSS Layout & Responsive Design**

Goal: Learn to control layout, spacing, and rhythm using modern CSS.
 Topics:

* Box model, margin, padding
* Flexbox basics and advanced features
* Grid layout
* Responsive media queries
   Activities:
* Labs arranging a split hero section with Flexbox
* Exercise composing a compact action row
* Project: build a responsive homepage that adapts to mobile, tablet, and desktop
   Deliverables:
* Responsive hero section
* Action row component
* Responsive homepage project
   Evaluation Criteria: Learner can build responsive layouts using Flexbox and Grid and explain spacing decisions.

### **Phase 4: JavaScript Fundamentals & DOM Manipulation**

Goal: Introduce the principles of JavaScript programming and how to interact with the DOM.
 Topics:

* Variables, data types, arrays, functions
* Event handling
* DOM querying and manipulation
   Activities:
* Lab wiring a simple counter: updating numbers on click
* Exercise building a theme toggle via class toggling
* Lab filtering a status list using data attributes
* Lab rendering a tag list from an array
   Deliverables:
* Counter component
* Theme toggle component
* Filtered list
* Tag rendering function
   Evaluation Criteria: Learner writes clean JS that updates the DOM in response to user actions.

### **Phase 5: Git, Command Line & Developer Workflow**

Goal: Teach version control, collaboration, and effective workflow practices.
 Topics:

* Git basics: init, commit, branch, merge
* Using GitHub and pull requests
* Command-line essentials
   Activities:
* Initialize a repository and commit a project
* Practice branching and merging with a peer
   Deliverables:
* Repository with multiple branches and a pull request
   Evaluation Criteria: Learner can manage code changes and collaborate using Git and GitHub.

### **Phase 6: Product Discovery & User Research**

Goal: Teach learners to define the right problem before building the interface.
 Topics:

* Product framing, assumptions, and success metrics
* User interviews, usability tests, and lightweight synthesis
* Translating research findings into requirements and interface decisions
   Activities:
* Write a short product brief for a small interface
* Conduct one moderated usability test or interview
* Convert findings into prioritized requirements
   Deliverables:
* Product brief
* Research notes and findings summary
* Requirements checklist
   Evaluation Criteria: Learner can connect user evidence to design and engineering decisions.

### **Phase 7: React Fundamentals**

Goal: Transition to component-based UI development using React.
 Topics:

* JSX syntax
* Components, props, and state
* Hooks for state and side effects
* Component composition
   Activities:
* Convert previous labs into React components
* Build a counter component in React
* Create a dynamic list component
   Deliverables:
* React components library
* Simple React app
   Evaluation Criteria: Learner can build interactive UI components using React and explain how state drives rendering.

### **Phase 8: TypeScript for Design Engineers**

Goal: Introduce type safety and enhance code maintainability.
 Topics:

* Type annotations, interfaces, generics
* Migrating JavaScript to TypeScript
* Handling props and state types
   Activities:
* Add types to existing React components
* Refactor a small project to TypeScript
   Deliverables:
* TypeScript converted components
* Project refactored with type safety
   Evaluation Criteria: Learner uses TypeScript to prevent common runtime errors and improve developer confidence.

### **Phase 9: Figma-to-Code Design Systems & Tokens**

Goal: Teach how to formalize and maintain reusable interface patterns.
 Topics:

* Design tokens: color, spacing, typography
* Token naming and management
* Component architecture and variants
* Figma variables, component properties, auto layout, and variant mapping
* Storybook documentation, controls, visual states, and usage guidance
* Design-system governance: contribution rules, review process, changelogs, and versioning
   Activities:
* Map a Figma component set to tokens, props, and coded variants
* Define a token set in code and document naming decisions
* Build a button and card component with responsive, accessible variants
* Document components in Storybook with controls, states, accessibility notes, and do/don't examples
   Deliverables:
* Token file
* Component library
* Storybook component documentation
* Contribution guidelines and release notes
   Evaluation Criteria: Learner builds scalable, reusable components and can govern a design-system change from Figma through code.

### **Phase 10: Accessibility, Performance & Quality Metrics**

Goal: Embed accessibility and performance considerations throughout the work.
 Topics:

* ARIA roles and attributes
* Keyboard navigation
* Reduced motion and color contrast
* Performance optimization techniques
* Lighthouse, Web Vitals, axe, screen reader checks, and manual keyboard QA
* Quality gates and measurable acceptance criteria
   Activities:
* Audit a project for accessibility
* Implement keyboard interactions
* Profile and optimize a React app
* Define accessibility and performance budgets for a project
   Deliverables:
* Accessibility audit report
* Optimized UI component
* Before/after metric snapshot
   Evaluation Criteria: Learner can identify and fix accessibility issues, meet defined budgets, and explain the measured impact of improvements.

### **Phase 11: APIs, Data & State Management**

Goal: Handle external data and manage application state.
 Topics:

* Fetching data with fetch/axios
* Async/await and promises
* Global state management (Context API or Redux)
* Error handling
   Activities:
* Connect a React app to a public API
* Display dynamic data in a component
* Handle loading and error states
   Deliverables:
* Data-driven component
* State-managed app
   Evaluation Criteria: Learner can integrate data from APIs and manage complex state gracefully.

### **Phase 12: Motion, Animation & Micro-Interactions**

Goal: Add polish and delight through thoughtful motion.
 Topics:

* CSS transitions and keyframes
* Framer Motion or similar libraries
* Timing functions and physics-based animation
   Activities:
* Animate button interactions
* Build a modal with entrance and exit animations
* Create a micro-interaction for a card hover effect
   Deliverables:
* Animated component library
   Evaluation Criteria: Learner can implement accessible, performant animations and justify their use.

### **Phase 13: Testing, QA, Deployment & Continuous Integration**

Goal: Teach how to verify and ship code to production environments.
 Topics:

* Unit, component, interaction, and visual regression testing
* Manual QA checklists across browsers, devices, and input methods
* Build tools (Vite, Next.js or similar)
* Environment variables and build process
* Hosting on platforms like Vercel or Netlify
* Continuous Integration basics
   Activities:
* Write tests for a component's variants, states, and interactions
* Run a manual QA pass against a responsive project
* Deploy a small React app
* Configure environment variables for an API key
* Set up basic CI with GitHub Actions
   Deliverables:
* Test suite and QA checklist
* Deployed project URL
* CI configuration file
   Evaluation Criteria: Learner can test, QA, deploy, and update a web project with clear release confidence.

### **Phase 14: AI-Era Design Engineering**

Goal: Teach responsible use of AI tools as part of modern design engineering work.
 Topics:

* Prompting for implementation planning, prototyping, and refactoring
* Reviewing AI-generated code for correctness, accessibility, security, and maintainability
* Using AI to accelerate documentation, test ideas, debugging, and design-system audits
* Protecting private data and avoiding unverified AI output
   Activities:
* Use an AI assistant to scaffold a component, then review and improve it manually
* Compare AI-generated variants against Figma specs and acceptance criteria
* Create tests or QA notes from a product brief and component states
   Deliverables:
* AI-assisted component with review notes
* Prompt log and verification checklist
   Evaluation Criteria: Learner can use AI to speed up work while retaining ownership of quality and decisions.

### **Phase 15: Capstone Project**

Goal: Synthesize all skills into a portfolio-worthy, real-world project.
 Topics:

* End-to-end product workflow: Figma to code
* Product brief, user needs, and acceptance criteria
* Design system integration
* API integration and dynamic data
* Testing, QA, accessibility, and performance validation
* Documentation and case study writing
   Activities:
* Choose or receive a Figma design to implement with a clear product brief
* Plan and execute the build with version control and code reviews
* Run usability, accessibility, performance, and visual QA checks
* Write a detailed case study explaining design and technical decisions
   Deliverables:
* Fully responsive, accessible React app
* Storybook documentation
* Test and QA evidence
* Live deployment
* Portfolio case study
   Evaluation Criteria: Learner demonstrates independence, quality, and attention to detail across design and engineering.

### **Phase 16: Portfolio & Career Preparation**

Goal: Prepare learners for job applications and interviews.
 Topics:

* Curating and presenting work
* Writing case studies
* Mock technical and design interviews
* Resume and LinkedIn optimization
   Activities:
* Review and refine portfolio projects
* Conduct mock interviews
* Write case studies summarizing challenges and solutions
   Deliverables:
* Portfolio site
* Updated resume and LinkedIn profile
* Interview feedback
   Evaluation Criteria: Learner is ready to apply for junior design engineer roles with confidence.

## **Mentorship & Feedback**

To ensure mastery and confidence, the program must provide:

* Regular code reviews by experienced design engineers.
* Structured design critiques focusing on product intent, accessibility, interaction quality, visual polish, and technical feasibility.
* Pair programming sessions to model workflows and debugging.
* Weekly office hours for research synthesis, Figma-to-code decisions, test strategy, and design-system governance.
* Mentor rubrics for pull requests, Storybook quality, accessibility metrics, performance budgets, and portfolio readiness.
* Peer critique rounds where learners present tradeoffs, receive notes, and document follow-up decisions.
* Career coaching, including portfolio reviews and mock interviews.
* Community forums or cohorts for peer support and accountability.

## **Timeline Options**

The curriculum can be adapted to different schedules:
 Intensive Program (12–16 weeks):

* Commitment: 20–30 hours per week.
* Suited for students who can dedicate full-time attention.
* Weekly deliverables and frequent feedback.
   Part-Time Program (24–36 weeks):
* Commitment: 10–15 hours per week.
* Allows students to learn while maintaining part-time work or study.
* Longer milestones but consistent progress.
   Self-Paced Program:
* Flexible timeframe; students progress at their own pace.
* Recommended check-in points with mentors every two weeks.

## **Hireability Checklist**

Graduates should meet the following criteria:

* Comfortable coding semantic, accessible HTML and modern CSS.
* Able to build responsive layouts for multiple breakpoints.
* Fluent in JavaScript, including asynchronous patterns and DOM manipulation.
* Proficient in React and TypeScript, with awareness of component architecture.
* Capable of translating Figma systems into governed tokens, components, Storybook docs, and release notes.
* Can run lightweight product discovery and connect user findings to implementation requirements.
* Understands and applies accessibility guidelines and performance optimizations with measured evidence.
* Writes practical tests and QA checklists for component states, responsive behavior, and critical flows.
* Uses Git and GitHub workflows effectively.
* Integrates APIs and manages state in a React application.
* Can deploy projects and configure CI pipelines.
* Uses AI tools responsibly while verifying generated code and design decisions.
* Demonstrates polished motion and interaction design when appropriate.
* Produces a comprehensive portfolio with case studies and code.

## **Common Gaps to Avoid**

Avoid these pitfalls when developing the curriculum:

* Teaching HTML/CSS basics without progressing to responsive design and advanced layout techniques.
* Jumping into React without first building strong JavaScript fundamentals.
* Ignoring Git and workflow tools until the end; integrate them early.
* Relying solely on tutorial-style exercises without requiring original projects.
* Neglecting accessibility and performance until the final phases.
* Failing to connect code exercises back to real product design and systems thinking.
* Treating Figma-to-code work as pixel copying instead of systems translation and governance.
* Using Storybook as a gallery instead of a maintained source of component behavior, states, and usage rules.
* Skipping tests, QA passes, or measurable acceptance criteria.
* Teaching AI tools as shortcuts without requiring review, validation, and ownership.
* Providing minimal or automated feedback; students need human review.
* Running critique as opinion-only feedback instead of a structured operating model with rubrics and follow-up decisions.
* Not giving students a chance to build and document a full project from scratch.
