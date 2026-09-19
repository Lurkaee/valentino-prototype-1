---
name: phase-runner
description: "The standard loop and checkpoint report for every milestone of Valentino Prototype 1. Use at the start and end of any milestone (m0 to m6), when planning a PR, or when producing a checkpoint or handoff report."
---

# Phase runner

Every milestone follows the same loop. Do not skip steps.

## 1. Start
- State the active model and list the rules and skills you can see (proves the setup loaded).
- Read `docs/product.md`, `docs/architecture.md`, `docs/decisions.md`, and the milestone skill.
- Run `git status` and `git remote -v`. Working tree must be clean and `origin` must exist. If not, stop and report.
- Check `docs/decisions.md` for open decisions this milestone depends on. Ask the owner rather than guessing.

## 2. Plan
Produce an Implementation Plan artifact containing: goal, in-scope, out-of-scope, files/modules to create or change, data/schema changes, tests to add, browser checks, risks, open questions. **Stop and wait for the owner's approval** (they may leave comments on the artifact; revise and re-present).

## 3. Build
- Create `feature/<milestone-topic>` in a new worktree.
- Small steps, small commits. Re-run tests as you go.
- Keep the scope bounded. Anything interesting but out of scope goes to Known Issues.

## 4. Verify
`pnpm lint && pnpm typecheck && pnpm test && pnpm build`, then UI verification via skill `browser-verify`. For anything touching input, links, uploads, auth or persistence, run the `security-reviewer` subagent.

## 5. Review and ship
Run the `code-reviewer` subagent on the full diff. Fix findings. Update docs and `CHANGELOG.md`. Push the branch and open a PR using the PR template. Do not merge.

## 6. Checkpoint report (post as a Walkthrough artifact and in the PR)
```
PHASE:
STATUS: (done / done with known issues / blocked)
FILES CHANGED:
FEATURES COMPLETED:
TESTS: (what ran, counts, result)
BUILD / LINT / TYPECHECK:
BROWSER VERIFICATION: (viewports covered, evidence, or NOT VERIFIED)
SECURITY REVIEW:
KNOWN ISSUES:
OWNER DECISIONS NEEDED:
NEXT PHASE:
GIT BRANCH / PR:
```
Never hide failures or unfinished work behind vague wording.
