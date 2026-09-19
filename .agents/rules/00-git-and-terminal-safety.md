---
trigger: always_on
---

# Git, terminal and approval boundaries

## Git
- Work on `feature/<topic>` branches. Never commit directly to `main`. Never merge to `main`; the owner merges PRs.
- Never force-push. Never rewrite pushed history. Never run `git reset --hard`, `git clean -fdx`, `git checkout .` or `git stash drop` when uncommitted work exists, unless the owner explicitly asks.
- Commit one logical change at a time, Conventional Commits (`feat:`, `fix:`, `test:`, `docs:`, `chore:`, `refactor:`).
- Before every commit: run `git status` and review `git diff --staged`. Confirm there are no secrets, `.env*` files, build output, or unrelated changes.
- The GitHub remote (`origin`) is created by the owner. Verify it with `git remote -v`. If it is missing, stop and report it. Never create or delete repositories, change repo settings or visibility, or handle GitHub tokens yourself.
- Pushing feature branches and opening PRs is fine when GitHub tooling is already authenticated. If it isn't, stop and give the owner the exact commands.

## Terminal
- Stay inside this workspace. No `sudo`, no global installs, no `curl | sh`, no deleting anything outside build output (`.next`, `dist`, `coverage`, `test-results`).
- Never print environment variable values or file contents that may hold secrets.
- Do not change Antigravity settings, permissions, sandbox or global config (`~/.gemini`), and do not touch other projects.
- Adding a dependency needs a one-line justification in the PR (why, size, maintenance status). Prefer the standard library and platform features. Keep the lockfile committed. Do not mix package managers.

## Requires explicit owner approval first
Destructive or irreversible database migrations, dropping data, force-push or history rewrite, changing framework or database technology, replacing hosting or domain configuration, deleting large groups of files, removing a major feature, major auth changes, anything in the "Out of scope" list in AGENTS.md.

## Reversibility
Prefer small changes that can be reverted with a single `git revert`. Do not stack new work on top of broken work (see skill `recovery`).
