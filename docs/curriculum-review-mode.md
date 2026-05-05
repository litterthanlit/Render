# Curriculum Review Mode

Set this public environment flag when external reviewers need to inspect the full curriculum without completing earlier phases:

```bash
NEXT_PUBLIC_CURRICULUM_REVIEW_MODE=true
```

When enabled:

- Phase pages are viewable.
- Lesson and lab pages are viewable from direct URLs.
- `/tracks` still shows local progress.
- Locked phases display as previewable for curriculum review.
- Activity, project, and phase completion logic remains unchanged.
- No progress is auto-completed.
- The dev-only progress helper remains development-only and is not exposed by this flag.

When disabled or unset, normal learner progression and locked-route behavior apply.
