# Render MVP Demo v1 Release Notes

Render MVP Demo v1 is a local-first, interactive curriculum platform for designers learning to become design engineers.

## Included

- Polished Render UI 2.0 landing page with the **Design. Code. Ship.** product framing.
- Full 14-phase curriculum path from beginner orientation through portfolio and career preparation.
- Local progress tracking, phase unlocks, completion states, XP, and streak display.
- Interactive HTML/CSS/JavaScript labs with Run, Check, Reset, Hints, validation, and live preview.
- Simulated terminal and Git workflow labs for beginner developer workflow practice.
- Sandboxed React and TSX live-preview labs for components, props, state, TypeScript, tokens, data, motion, and production-quality UI practice.
- Project submission shells for GitHub/deployed URLs, reflection, rubric review, and local persistence.
- Capstone milestone experience for a review-ready product dashboard.
- Portfolio and career-readiness phase with case-study, repo, positioning, interview, and final audit activities.
- Dev-only progress helper for QA/demo seeding, hidden in production.
- Internal external demo checklist at `docs/external-mvp-demo-checklist.md`.

## Known Limitations

- Progress is stored locally in `localStorage`; there is no account sync yet.
- No auth, payments, cohorts, mentor review, uploads, analytics, admin editing, or backend services.
- GitHub, deployment, Figma, LinkedIn, and Storybook URLs are not verified through real integrations.
- Automated validation is educational pattern-checking, not full compiler, accessibility, or end-to-end test coverage.
- Storybook is intentionally deferred.
- The old HTML/CSS/JS preview path has looser iframe isolation than the newer React/TSX sandbox.
- The MVP does not promise employment; it helps learners package credible portfolio evidence.
