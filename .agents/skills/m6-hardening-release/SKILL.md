---
name: m6-hardening-release
description: "Milestone 6 for Valentino Prototype 1. Runs the full test, security, privacy and abuse-handling review, then prepares deployment configuration, migration and rollback plans, and a production smoke-test checklist. The owner performs the deployment. Use after M5 is approved."
---

# M6 — Hardening and release preparation

**Deployment is executed by the owner.** You prepare and validate; never deploy or run destructive production operations yourself. Decision D3 (hosting, database, storage) must be settled before this milestone.

## Do
1. **Full run**: unit, integration, e2e, lint, typecheck, build, and browser verification at all viewports.
2. **Security review** with the `security-reviewer` subagent across the whole app: XSS paths, link handling, ID enumeration, edit-secret handling, upload pipeline, rate limits, headers/CSP, secrets in code and in git history, dependency audit (`pnpm audit`), unused dependencies.
3. **Abuse and privacy**: verify the report path, the disable/delete path for a published experience, `noindex`, no third-party trackers on public pages, no personal content in logs, deletion actually removes data and media.
4. **Resilience**: behavior under DB or storage failure (friendly error, no stack trace), rate-limit behavior, cache strategy for the public route (expect a traffic spike around Feb 14).
5. **Deployment prep**: production env variable list (names only), build config, migration strategy (forward-only, non-destructive; owner approves anything else), backup and rollback plan, domain configuration notes, `docs/deployment.md`.
6. **Smoke-test checklist** for after deploy: landing -> gallery -> editor -> save -> publish -> public link -> mobile check -> report and disable path.
7. Fix all high-priority findings. List the rest in Known Issues with severity.

## Gate
All checks green, no high-severity findings open, docs complete, owner has a step-by-step deploy checklist and rollback plan. Checkpoint report posted.
