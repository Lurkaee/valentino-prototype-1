---
trigger: always_on
---

# Definition of done and honesty rules

A feature is done only when all of these are true:
- Implementation complete and types valid.
- Tests added or updated, and passing. Lint and build pass.
- For UI: verified in a real browser with evidence (screenshots or recording), including the mobile viewport.
- Error, empty, loading and missing-optional-content states handled.
- Security implications considered (see the security baseline).
- Docs updated (`docs/*`, `CHANGELOG.md`, `.env.example` if new variables).
- Diff reviewed, no unrelated changes, commit created.

"Code written" is not "done". TypeScript compiling is not "verified".

## Honesty
- Never claim success while any test, lint, typecheck or build step is failing or was skipped. Say exactly what ran and what did not.
- Report blockers immediately with the exact error and what you tried. Don't hide unfinished work behind vague words.
- If a step could not be verified (no browser available, no credentials), write "NOT VERIFIED" in the checkpoint report.
- If you find a problem outside the current scope, note it under Known Issues instead of fixing it silently.
