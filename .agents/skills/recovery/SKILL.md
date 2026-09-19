---
name: recovery
description: "Safe procedure when a change breaks the build, tests, or app, or when the working tree is in an unknown state. Use whenever something regresses, a merge goes wrong, or you are tempted to keep patching on top of broken work."
---

# Recovery

If implementation goes wrong: **stop**. Do not stack more changes on broken work.

1. Say plainly what broke and how you noticed. Do not hide failures.
2. `git status` and `git diff` to see the current state. `git log --oneline -10` to find the last known good commit.
3. Decide whether the problem is local (one change) or architectural (the approach is wrong).
4. Local: fix it in a new small commit, or `git revert <sha>` the offending commit. Architectural: stop and bring the owner a short write-up with options.
5. Never use `git reset --hard`, `git clean -fdx`, or force-push to "fix" things unless the owner explicitly says so.
6. Re-run lint, typecheck, tests, build, and the browser check that failed.
7. Add a regression test where it makes sense. Note the incident under Known Issues in the checkpoint report.
