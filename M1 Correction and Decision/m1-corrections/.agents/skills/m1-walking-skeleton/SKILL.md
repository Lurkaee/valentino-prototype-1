---
name: m1-walking-skeleton
description: "Milestone 1 for Valentino Prototype 1. Builds the thinnest complete vertical slice: one template, anonymous cookie-based edit access, a minimal editor with autosave and live preview, separate draft and published states, and a public share link. Use after M0 is approved and before any template system, media or gallery work."
---

# M1 — Walking skeleton (vertical slice)

Goal: prove the whole product loop with as little product as possible.
`create -> edit access -> customize -> live preview -> autosave/save -> publish -> public link -> edit draft (public unchanged) -> republish`

## Authority
`docs/m1-decisions.md` is authoritative and overrides your plan. **[O]** items are fixed; you may argue against **[R]** items in the plan with reasons. Read it fully before planning, and in the plan map each numbered section to how you satisfy it.

## Plan (stop for owner approval)
Implementation Plan artifact must include: the first template's concept (mood, layout, one signature animation), the schema, the route and endpoint list, the auth/cookie/CSRF design, the revision scheme, the test plan mapped to Gates A-D, and answers or proposals for open items O1-O2.

## Build order
1. Schema (Prisma): `Experience` with `publicId`, `editCredentialHash`, `editCredentialVersion`, `templateId`, `templateVersion`, `draftConfig`, `draftRevision`, `publishedConfig?`, `publishedRevision?`, `publishedAt?`, `status` (`draft | published | disabled | deleted`), timestamps. Non-destructive migration.
2. Template `src/templates/<id>/v1/` with `draftSchema`, `publishSchema`, `normalizeConfig()`, and one `<ExperienceRenderer mode="preview" | "public" />` shared by editor and public page.
3. Shared pieces: ID/credential generation, hashing, cookie helpers, Origin/CSRF check, `RateLimiter` interface with in-memory adapter, redacting logger, `MediaStore` interface + `MediaSlot`, input normalization (graphemes, NFC, bidi strip).
4. API + auth: create (sets cookie), save draft, publish; all validated with Zod on the server.
5. Editor at `/edit/[publicId]`: form, live preview (stacked on mobile), autosave + Save Draft with status indicator, Publish with strict-validation errors, copy-URL with fallback.
6. Public page `/v/[publicId]`: `publishedConfig` only, mobile-first, noindex and generic metadata, 404/410 states.
7. Tests for Gates A-D, then `browser-verify`, then `security-reviewer` and `code-reviewer`.

## Gate
All four acceptance gates in `docs/m1-decisions.md` section 10 pass, plus lint, typecheck, test, test:e2e, build. Promote the decisions per section 12. Checkpoint report via `phase-runner`.

## Out of scope
Gallery, second template, uploads, accounts, recovery UI, QR code, analytics, landing-page polish, and everything in the "Out of scope" list in `AGENTS.md`.
