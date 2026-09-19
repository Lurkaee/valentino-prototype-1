# M1 decisions (authoritative for M1)

These override the M1 Implementation Plan and any ambiguous wording elsewhere.
Tags: **[O]** = owner decision, do not deviate. **[R]** = recommended clarification; you may propose an alternative in the plan with reasons, the owner approves.

## 1. Anonymous creator authentication
- **[O]** No user accounts. Each experience gets a `publicId` and a high-entropy edit credential. Only a keyed hash of the credential is stored (HMAC-SHA-256 with `EDIT_SECRET_PEPPER`).
- **[O]** The long-lived credential must not stay in a query string during normal editor use. Editor auth is an HttpOnly, SameSite cookie (Secure in production), then the editor lives at `/edit/[publicId]`.
- **[R] Flow.** `POST /api/experiences` generates `publicId` (>=128 bit) and credential (>=256 bit), stores the hash, and sets the edit cookie in that same response. The credential is never put in a URL, JSON body or client-side JS. The client then navigates to `/edit/[publicId]`. This is the "secure exchange" for the creating browser; no exchange endpoint is needed for M1.
- **[R] Cookie.** Per-experience name, `Path=/`, HttpOnly, `SameSite=Lax`, `Secure` in production (`__Host-` prefix when Secure), 90-day sliding expiry. The public page ignores this cookie and never reflects it.
- **[R] Recovery-ready, not built.** Model stores `editCredentialHash` plus an integer `editCredentialVersion`. A future recovery link would carry the credential in the URL **fragment** (never sent to servers or Referer) and POST it in a body to an exchange endpoint that sets the cookie; rotating bumps the version. No Experience redesign needed.
- **[O]** The credential must never appear in: server logs, analytics, public API responses after exchange, error messages, Open Graph metadata, public pages.
- **[R]** Request logging must not record `Cookie`/`Set-Cookie` headers, request bodies, or query strings on `/api/*` and `/edit/*`.
- **[R] CSRF.** Every state-changing request requires the valid cookie **and** an `Origin` header matching `APP_URL` (missing or mismatched is rejected) and a JSON content type.
- **[R]** `/edit/*` and all `/api/*` responses send `Cache-Control: no-store`. `/edit/*` sends `Referrer-Policy: no-referrer`.
- **[R]** Invalid or missing edit auth: API returns 401; the edit page shows a friendly "no edit access" state (noindex, no-store). Neither reveals anything about the content.

## 2. Draft vs published
- **[O]** `draftConfig` and `publishedConfig` are separate. Editing or autosaving never changes the recipient-facing page. The public route renders `publishedConfig` only and never falls back to the draft.
- **[O]** Only an explicit Publish may: authenticate the creator; validate the draft against the pinned template/version schema; normalize it; create the published snapshot; update publication metadata; make it available at `/v/[publicId]`. A draft may stay incomplete.
- **[R] Two schemas per template version.** `draftSchema` is lenient (types and length caps, everything optional). `publishSchema` is strict (required fields, normalization), with per-field errors surfaced in the UI.
- **[R] Revisions.** `draftRevision` increments on every successful draft write. Saves send `baseRevision`; a stale write gets 409 with the latest revision (covers two tabs and out-of-order autosave responses). Publish sends `expectedRevision` so the snapshot equals what the creator saw; stale gives 409 "draft changed, review and publish again".
- **[R]** Publish runs in one DB transaction and is idempotent. The client flushes any pending autosave and waits for confirmation before sending Publish. Store `publishedRevision` and `publishedAt`.
- **[R] Public responses.** Unknown ID and never-published return the same generic 404. Disabled/deleted returns a friendly "no longer available" page with HTTP 410. All are `noindex` and `no-store`.
- **[R]** M1 has no disable/delete UI. Tests set status through a test fixture or DB seed, never through a public endpoint.

## 3. Editor persistence
- **[O]** Debounced autosave plus an explicit Save Draft action. Save Draft gives immediate visual confirmation. Publish is always explicit, never automatic.
- **[R]** Debounce about 1s after the last change. Visible states: Saving / Saved (time) / Failed with Retry / Offline. Flush pending changes on `visibilitychange` and `pagehide` (fetch with `keepalive`). Warn on leave only when unsaved. Disable Publish while saving.
- **[R]** Tests wait for the saved indicator or the network response, never fixed sleeps.

## 4. Rate limiting
- **[O]** An in-memory limiter is allowed for dev/test only and must never be described as production protection. Production needs a distributed or provider-backed limiter before launch.
- **[R]** Put it behind a `RateLimiter` interface (module singleton on `globalThis` so dev reloads don't reset it). Add "distributed rate limiter" as a launch blocker in `docs/deployment.md` and the M6 gate.
- **[R] Starting limits** (tunable): save about 60/min per experience, publish about 10/min, create about 10/hour per IP, failed edit auth about 10 per 15 min per IP + `publicId`. Return 429 with `Retry-After` and a friendly message. Keys contain no personal content. Normal autosave must never trip the limit.

## 5. Package manager
- **[O]** pnpm only. Scripts: `pnpm install`, `dev`, `test`, `test:e2e`, `typecheck`, `lint`, `build`. Commit `pnpm-lock.yaml`. No npm/yarn lockfiles.
- **[R]** Pin `packageManager` in `package.json`. CI uses `pnpm install --frozen-lockfile`, installs Playwright browsers (`pnpm exec playwright install --with-deps chromium`), and fails if `package-lock.json` or `yarn.lock` exists.

## 6. Public privacy
- **[O]** Public pages send `X-Robots-Tag: noindex`, include `noindex` metadata, use generic social-preview metadata, and expose no private creator information through metadata.
- **[O]** No personalized names, messages, or user content in default Open Graph titles/descriptions, analytics payloads, logs, error traces, or public APIs.
- **[R]** Apply `X-Robots-Tag` to all `/v/*` and `/edit/*` responses including 404/410. Use `robots: noindex, nofollow`. Expose no JSON API for published content; the page is server-rendered.
- **[R] Hydration leak check.** Data serialized to the client on the public page contains only what the template needs from `publishedConfig`: no `draftConfig`, credential, hash, revision, or internal IDs.
- **[R]** Structured logger with redaction. Error boundaries show a generic message, never config or request data.

## 7. Media scope
- **[O]** Don't block M1 on media storage. Include a media abstraction. Handle missing/invalid media safely.
- **[R]** Define a `MediaStore` interface (`resolve`) and a `MediaSlot` primitive. The config schema has an optional `heroMedia` reference that the M1 editor does not expose. The renderer resolves it via `MediaStore`; missing, invalid or unsafe references fall back gracefully (no broken image, no throw). Prove it with a fixture test. No upload endpoint, storage provider or image library in M1.

## 8. QR code
- **[O]** Optional polish. Blocking criterion: Publish -> receive public URL -> copy it -> open it.
- **[R]** Default: don't build QR in M1 (avoids a dependency). If built after every gate passes, generate client-side and justify the dependency in the PR. The Copy button needs a fallback (select-text) when `navigator.clipboard` is unavailable, e.g. in-app browsers.

## 9. Input handling (added; needed for the Unicode/emoji checks)
- **[R]** Limits count graphemes (`Intl.Segmenter`), not UTF-16 length. Starting caps: names 60, message 2,000. Enforced identically on client and server (shared Zod).
- **[R]** Normalize to NFC, trim, collapse whitespace (keep newlines in the message). Strip control characters and bidi override/isolate characters (U+202A-202E, U+2066-2069). **Keep ZWJ/ZWNJ**: emoji sequences and Indic scripts need them.
- **[R]** Accent is an enum of palette keys, never a raw color or CSS from the client. Text wraps (`overflow-wrap: anywhere`); nothing truncates silently.

## 10. Acceptance (M1 is done only when all four gates pass)
Use unique test strings (e.g. `Ananya-🌹-7f3a`) so leak assertions are meaningful. Use two Playwright browser contexts: creator and recipient.

**Gate A — journey (e2e).** Create -> receive edit access -> open editor -> customize partner name, sender name, message, accent -> live preview updates -> autosave -> refresh -> draft persisted -> explicit Save Draft -> Publish -> receive and copy public URL -> open it in the recipient context -> published content verified -> modify draft -> public page unchanged -> Publish again -> new snapshot visible. Also: rapid typing then immediate Publish publishes the final text (flush + revision).

**Gate B — negative and security.** Invalid or missing edit auth rejected (401 / friendly page). Cookie from experience X cannot edit Y. Missing or mismatched `Origin` rejected. Stale `baseRevision`/`expectedRevision` returns 409. Unpublished renders the generic 404. Disabled/deleted renders the graceful 410 page. Rate limiter returns 429 without throttling normal autosave. Cookie flags asserted (HttpOnly, SameSite, Secure in prod config). Accent outside the palette rejected.

**Gate C — layout and motion.** Long Unicode names (Latin with diacritics, Devanagari, Odia, Arabic, CJK), ZWJ emoji, and a 60-grapheme name render without overflow at 360x640, 768x1024, 1280x800 (assert `scrollWidth <= clientWidth`). Reduced motion (`emulateMedia({ reducedMotion: 'reduce' })`): content visible, no running animations. Run `browser-verify` for 640x360 and 1920x1080 as evidence (not automated gates).

**Gate D — privacy.** Read the credential from `context.cookies()` and assert it appears nowhere in: any request URL or Referer, response bodies, page HTML/DOM, `localStorage`/`sessionStorage`, console output, or captured server logs. Public page `<head>`, OG/Twitter tags and `X-Robots-Tag` contain none of the test strings and are `noindex`. `Referrer-Policy: no-referrer` on `/edit/*`. Hydration payload contains no draft or credential data. Logger redaction unit-tested.

Also required: `pnpm lint`, `typecheck`, `test`, `test:e2e`, `build` all green, and the `security-reviewer` run with findings addressed.

## 11. Scope discipline
**[O]** No accounts, payments, social feeds, AI chat, recommendations, complex analytics, admin CMS, microservices, unless the owner approves.

## 12. Promote to permanent docs (do in the M1 PR)
- `docs/decisions.md`: mark D2 **settled** (no accounts, cookie-based edit auth, recovery-ready) as ADR-0004; add ADR-0005 for separate draft/published state with revisions.
- `.agents/rules/10-security-baseline.md`: add three lines (keep the file under 12,000 characters): (a) state-changing requests need cookie auth plus an `Origin` check; (b) edit-auth cookies are HttpOnly, SameSite, Secure in production and never logged; (c) `/edit/*` and `/api/*` responses are `no-store`.
- `docs/deployment.md`: add "distributed rate limiter" as a launch blocker.

## 13. Open items for the owner
- **O1 Recovery UX.** With no accounts, clearing cookies or switching device loses edit access. M1 makes recovery possible but does not build it. Recommendation: after M1, add a one-time "Save your private edit link" panel (fragment-based). Default: defer; decide before public launch.
- **O2 Cookie lifetime.** Default 90 days sliding. Confirm or change.
