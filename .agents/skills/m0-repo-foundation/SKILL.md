---
name: m0-repo-foundation
description: "Milestone 0 for Valentino Prototype 1. Verifies the repo and GitHub remote, then bootstraps a runnable Next.js, Tailwind, Prisma, Vitest and Playwright project with CI. Use when starting the project or when the app skeleton does not exist yet."
---

# M0 — Repository foundation

Goal: a clean repo that boots, lints, type-checks, tests, builds, and runs in CI. No product features.

## Inspect first
- `git status`, `git log`, `git remote -v`. `origin` must exist (the owner creates it). If not, stop and report; do not create repositories.
- Read `AGENTS.md`, all docs, and list the rules/skills/subagents you can see. State the active model.
- If a `package.json` already exists, keep its stack and package manager; document rather than replace.

## Do
1. Scaffold Next.js (App Router, TypeScript, Tailwind, ESLint) with **pnpm**. Use `src/` layout.
2. Add Vitest (unit) and Playwright (e2e) with one smoke test each. Add Prisma with PostgreSQL configured from `DATABASE_URL`; do not design the product schema yet.
3. Add scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `test`, `test:e2e`.
4. Add a GitHub Actions workflow `.github/workflows/ci.yml` running install, lint, typecheck, test, build on PRs and on `main`.
5. Add a placeholder home page and a `/api/health` route.
6. Fill in `docs/development.md` (install, env, run, test) and confirm `.env.example` matches what the code reads. Update README quick start.
7. Record the stack in `docs/decisions.md` (ADR-0001 already exists; append any deviation with reasons).

## Gate
- `pnpm install && pnpm dev` boots; `/api/health` responds.
- `pnpm lint && pnpm typecheck && pnpm test && pnpm build` pass locally and in CI.
- Working tree clean, no secrets staged, `.env.local` ignored.
- PR opened from `feature/project-foundation`. Checkpoint report posted.

## Out of scope
Any editor, template, database schema, media, or landing-page work.
