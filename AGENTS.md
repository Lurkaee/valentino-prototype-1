# Valentino Prototype 1 — agent instructions

A reusable Valentine's website template platform. A creator picks a template, customizes it, previews it live, publishes it, and sends the share link to their partner. The recipient only ever sees the finished experience.

Before planning any milestone, read `docs/product.md` (what/why), `docs/architecture.md` (how) and `docs/decisions.md` (settled and open decisions).

## Who decides
The human owner owns product, architecture, deployment and GitHub. You implement. If a requirement is ambiguous, or an open decision in `docs/decisions.md` blocks you, ask. Never change product direction, stack or scope on your own.

## How to work
1. **Inspect**: read every file you will touch, plus `git status`. Never assume, never recreate existing work.
2. **Plan**: produce an Implementation Plan artifact (files, tests, risks, open questions). For milestone work, wait for owner approval before writing code. Small fixes don't need approval.
3. **Build** in small, reversible steps on a `feature/*` branch. Use New Worktree Mode for milestone work.
4. **Verify**: lint, typecheck, tests, build. For any UI change, follow skill `browser-verify`.
5. **Review your diff** with the `code-reviewer` subagent. Also use `security-reviewer` for anything touching user input, uploads, persistence or links.
6. **Commit** (Conventional Commits), push the branch, open a PR. Never merge to `main`; the owner merges.
7. **Finish** with a Walkthrough artifact and the checkpoint report from skill `phase-runner`.

## Milestones (skills, run in order, one per conversation)
`/m0-repo-foundation` → `/m1-walking-skeleton` → `/m2-template-system` → `/m3-media-pipeline` → `/m4-gallery-landing` → `/m5-polish` → `/m6-hardening-release`.
Do not start the next milestone until the owner approves the checkpoint. If something breaks, stop and use skill `recovery`.

## Stack (ADR-0001; change only with owner approval)
TypeScript, Next.js App Router, Tailwind CSS, PostgreSQL + Prisma, Zod, pnpm, Vitest, Playwright. Modular monolith. If the repo already contains a working choice, keep it.

## Non-negotiables
- One template renderer serves both the editor preview and the public page, fed by one normalized config.
- Every experience stores `templateId` + `templateVersion` from the first migration. Published template versions are immutable.
- All user content is untrusted: validate on the server, render as text, never as HTML.
- No secrets in git, logs, or frontend bundles. Only `.env.example` is committed.
- Mobile-first: the recipient opens the link on a phone. Respect `prefers-reduced-motion`.

## Out of scope unless the owner approves
Payments, AI features or chatbots, social or discovery feeds, messaging, heavy analytics, admin CMS, microservices, native apps.

## Keeping context small
Keep this file and always-on rules short. Procedures live in skills, detail in `docs/`. Every rules file is capped at 12,000 characters: check size before editing one.
At the start of each session, state which model is active. If it is not the model the owner asked for, say so and don't silently switch.
