# Changelog

All notable changes to this project are recorded here. Format: Keep a Changelog. Versioning: none yet (prototype).

## [M1 - Walking Skeleton] - 2026-09-19
### Added
- **Walking Skeleton End-to-End**: Next.js 15, React 19, TypeScript, Tailwind CSS, Prisma ORM, SQLite/Postgres.
- **Anonymous Per-Experience Auth**: 256-bit cryptographically secure edit credentials hashed with HMAC-SHA-256 + secret pepper. Stored in per-experience HttpOnly, SameSite cookie with sliding 90-day expiry and 180-day absolute expiration cutoff.
- **CSRF & Origin Security**: Origin validation against `APP_URL` and `application/json` Content-Type enforcement.
- **Optimistic Concurrency**: `draftRevision` increments on write; 409 conflict returned on stale baseRevision; publish requires explicit `expectedRevision`.
- **Snapshot Isolation**: Public recipient page `/v/[publicId]` serves strictly from `publishedConfig` and completely ignores edit cookies.
- **HTTP 404 & 410 Routing**: Real HTTP 404 for unknown or unpublished experiences; real HTTP 410 for disabled or deleted experiences.
- **Midnight Rose v1 Template**: Dark romantic aesthetic with animated wax seal unsealing, responsive across 360px to 1920px viewports, and instant unseal for `prefers-reduced-motion`.
- **Acceptance Gates A-D**: Vitest integration/unit tests (19 tests) and Playwright E2E suites (8 tests) passing across mobile and desktop.
- **CI Workflow**: GitHub Actions pipeline executing lint, typecheck, unit tests, production build, and Playwright E2E.
