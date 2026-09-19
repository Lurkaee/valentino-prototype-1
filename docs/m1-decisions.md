# M1 decisions (authoritative for M1)

These override the M1 Implementation Plan and any ambiguous wording elsewhere.
Tags: **[O]** = owner decision, do not deviate. **[R]** = recommended clarification; you may propose an alternative in the plan with reasons, the owner approves.

## 1. Anonymous creator authentication
- **[O]** No user accounts. Each experience gets a `publicId` and a high-entropy edit credential. Only a keyed hash of the credential is stored (HMAC-SHA-256 with `EDIT_SECRET_PEPPER`).
- **[O]** The long-lived credential must not stay in a query string during normal editor use. Editor auth is an HttpOnly, SameSite cookie (Secure in production), then the editor lives at `/edit/[publicId]`.
- **[O]** Cookie names are per-experience; the server verifies that the credential belongs to the requested experience.
- **[R] Flow.** `POST /api/experiences` generates `publicId` (>=128 bit) and credential (>=256 bit), stores the hash, and sets the edit cookie in that same response. The credential is never put in a URL, JSON body or client-side JS. The client then navigates to `/edit/[publicId]`. This is the "secure exchange" for the creating browser; no exchange endpoint is needed for M1.
- **[R] Cookie.** Cookie name is `__Host-edit-token-[publicId]` (production) or `edit-token-[publicId]` (dev), `Path=/`, HttpOnly, `SameSite=Lax`, `Secure` in production. Because the cookie uses `Path=/`, it can accompany requests outside the editor. Therefore: `/v/*` handlers MUST ignore edit cookies entirely; public rendering and authorization never consume an edit cookie.
- **[O] Session lifetime.** 90-day sliding inactivity lifetime; 180-day absolute maximum lifetime enforced server-side. The `Experience` model stores `editCredentialIssuedAt`. The server rejects edit operations after 180 days from `editCredentialIssuedAt`, regardless of whether the browser holds an unexpired cookie. Browser cookie expiry (`Max-Age=90 days`) is only the client-side convenience/inactivity mechanism; browser cookie expiry ≠ server-side credential validity. When valid authenticated writes occur before the cutoff, the cookie is renewed with 90-day Max-Age up to the 180-day absolute ceiling.
- **[O] Recovery.** M1 does NOT implement recovery links, magic links, or account recovery. M1 displays only an editor reminder banner: "Edit access is stored in this browser. Keep this browser/device available if you want to edit this Valentine later." Do NOT display the raw credential. Do NOT display or copy a private edit URL containing the credential. Do NOT place the credential in URL, URL fragment, DOM, JSON response, client JS, localStorage, sessionStorage, analytics, console output, or logs. The data model remains recovery-ready with `editCredentialHash` and `editCredentialVersion` for a future M6 implementation.
- **[O]** The credential must never appear in: server logs, analytics, public API responses, error messages, Open Graph metadata, public pages, or client storage.
- **[R]** Request logging must not record `Cookie`/`Set-Cookie` headers, request bodies, or query strings on `/api/*` and `/edit/*`.
- **[R] CSRF.** Every state-changing request requires the valid cookie **and** an `Origin` header matching `APP_URL` (missing or mismatched is rejected) and a JSON content type.
- **[R]** `/edit/*`, `/v/*`, and all `/api/*` responses send `Cache-Control: no-store`. `/edit/*` sends `Referrer-Policy: no-referrer`.
- **[R]** Invalid or missing edit auth: API returns 401; the edit page shows a friendly "no edit access" state (noindex, no-store). Neither reveals anything about the content.

## 2. Draft vs published
- **[O]** `draftConfig` and `publishedConfig` are separate. Editing or autosaving never changes the recipient-facing page. The public route renders `publishedConfig` only and never falls back to the draft.
- **[O]** Only an explicit Publish may: authenticate the creator; validate the draft against the pinned template/version schema; normalize it; create the published snapshot; update publication metadata; make it available at `/v/[publicId]`. A draft may stay incomplete.
- **[R] Two schemas per template version.** `draftSchema` is lenient (types and length caps, everything optional). `publishSchema` is strict (required fields, normalization), with per-field errors surfaced in the UI.
- **[R] Revisions.** `draftRevision` increments on every successful draft write. Saves send `baseRevision`; a stale write gets 409 with the latest revision (covers two tabs and out-of-order autosave responses). Publish sends `expectedRevision` so the snapshot equals what the creator saw; stale gives 409 "draft changed, review and publish again".
- **[R]** Publish runs in one DB transaction and is idempotent. The client flushes any pending autosave and waits for confirmation before sending Publish. Store `publishedRevision` and `publishedAt`.
- **[O] Public responses and caching.** Unknown ID and never-published return the same generic 404. Disabled/deleted returns a friendly "no longer available" page with HTTP 410. All public pages (`/v/*`) and API endpoints send `Cache-Control: no-store` and `X-Robots-Tag: noindex`. No public caching, ISR, revalidation, or CDN caching in M1 (ADR-0006). Primary caching risk is stale recipient content after republish, disable, or deletion. Public caching strategy will be evaluated in M5 and decided in M6 after privacy review.
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
- **[O]** Plain `pnpm ...` only. Never `npx pnpm`. Scripts: `pnpm install`, `pnpm dev`, `pnpm test`, `pnpm test:e2e`, `pnpm typecheck`, `pnpm lint`, `pnpm build`. Machine bootstrap uses `corepack enable` or `npm i -g pnpm@12.4.2`. Commit `pnpm-lock.yaml`. No npm/yarn lockfiles.
- **[R]** Pin `packageManager` in `package.json`. CI uses `pnpm/action-setup`, `pnpm install --frozen-lockfile`, installs Playwright browsers (`pnpm exec playwright install --with-deps chromium`), and fails if `package-lock.json` or `yarn.lock` exists.

## 6. Public privacy
- **[O]** Public pages send `X-Robots-Tag: noindex`, include `noindex` metadata, use generic social-preview metadata, and expose no private creator information through metadata.
- **[O]** No personalized names, messages, or user content in default Open Graph titles/descriptions, analytics payloads, logs, error traces, or public APIs.
- **[R]** Apply `X-Robots-Tag` and `Cache-Control: no-store` to all `/v/*` and `/edit/*` responses including 404/410. Use `robots: noindex, nofollow`. Expose no JSON API for published content; the page is server-rendered.
- **[R] Hydration leak check.** Data serialized to the client on the public page contains only what the template needs from `publishedConfig`: no `draftConfig`, credential, hash, revision, or internal IDs.
- **[R]** Structured logger with redaction. Error boundaries show a generic message, never config or request data.

## 7. Media scope
- **[O]** Don't block M1 on media storage. Include a media abstraction. Handle missing/invalid media safely.
- **[R]** Define a `MediaStore` interface (`resolve`) and a `MediaSlot` primitive. The config schema has an optional `heroMedia` reference that the M1 editor does not expose. The renderer resolves it via `MediaStore`; missing, invalid or unsafe references fall back gracefully (no broken image, no throw). Prove it with a fixture test. No upload endpoint, storage provider or image library in M1.

## 8. QR code
- **[O]** Deferred in M1. Blocking criterion: Publish -> receive public URL -> copy it -> open it.
- **[R]** The Copy button needs a fallback (select-text) when `navigator.clipboard` is unavailable, e.g. in-app browsers.

## 9. Input handling
- **[R]** Limits count graphemes (`Intl.Segmenter`), not UTF-16 length. Starting caps: names 60, message 2,000. Enforced identically on client and server (shared Zod).
- **[R]** Normalize to NFC, trim, collapse whitespace (keep newlines in the message). Strip control characters and bidi override/isolate characters (U+202A-202E, U+2066-2069). **Keep ZWJ/ZWNJ**: emoji sequences and Indic scripts need them.
- **[R]** Accent is an enum of palette keys, never a raw color or CSS from the client. Text wraps (`overflow-wrap: anywhere`); nothing truncates silently.

## 10. Acceptance (M1 is done only when all four gates pass)
Use unique test strings (e.g. `Ananya-🌹-7f3a`) so leak assertions are meaningful. Use two Playwright browser contexts: creator and recipient.

**Gate A — journey (e2e).** Create -> receive edit access -> open editor -> customize partner name, sender name, message, accent -> live preview updates -> autosave -> refresh -> draft persisted -> explicit Save Draft -> Publish -> receive and copy public URL -> open it in the recipient context -> published content verified -> modify draft -> public page unchanged -> Publish again -> new snapshot visible. Also: rapid typing then immediate Publish publishes the final text (flush + revision).

**Gate B — negative and security.** Invalid or missing edit auth rejected (401 / friendly page). Cookie from experience X cannot edit Y (verified on server). Missing or mismatched `Origin` rejected. Stale `baseRevision`/`expectedRevision` returns 409. Unpublished renders the generic 404. Disabled/deleted renders the graceful 410 page. Rate limiter returns 429 without throttling normal autosave. Cookie flags asserted (HttpOnly, SameSite, Secure in prod config). Accent outside the palette rejected. Edit operations rejected after 180 days from `editCredentialIssuedAt`.

**Gate C — layout and motion.** Long Unicode names (Latin with diacritics, Devanagari, Odia, Arabic, CJK), ZWJ emoji, and a 60-grapheme name render without overflow at 360x640, 768x1024, 1280x800 (assert `scrollWidth <= clientWidth`). Reduced motion (`emulateMedia({ reducedMotion: 'reduce' })`): content visible, no running animations. Run `browser-verify` for 640x360 and 1920x1080 as evidence. LCP is recorded as INFORMATIONAL evidence only (not a gate).

**Gate D — privacy.** Read the credential from `context.cookies()` and assert it appears nowhere in: any request URL, URL fragment, Referer, response bodies, page HTML/DOM, `localStorage`/`sessionStorage`, console output, or captured server logs. Public page `<head>`, OG/Twitter tags, and `X-Robots-Tag` contain none of the test strings, are `noindex`, and send `Cache-Control: no-store`. `Referrer-Policy: no-referrer` on `/edit/*`. Hydration payload contains no draft or credential data. Logger redaction unit-tested.

Also required: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e`, `pnpm build` all green, and the `security-reviewer` run with findings addressed.

## 11. Scope discipline
**[O]** No accounts, payments, social feeds, AI chat, recommendations, complex analytics, admin CMS, microservices, unless the owner approves.

## 12. Promote to permanent docs (do in the M1 PR)
- `docs/decisions.md`: mark D2 settled as ADR-0004; add ADR-0005 (draft/published revisions) and ADR-0006 (M1 no-store caching).
- `.agents/rules/10-security-baseline.md`: add cookie auth, `Origin` validation, `no-store` headers, and per-experience server verification.
- `docs/deployment.md`: add "distributed rate limiter" as a launch blocker.

## 13. Settled Owner Decisions (formerly open items O1-O2)
- **O1 Recovery UX [O]**: M1 does NOT implement recovery links, magic links, or account recovery. M1 shows an editor reminder banner explaining that edit access is stored in this browser. Do not display raw credentials or private edit links in URL or fragment. Architecture remains recovery-ready with `editCredentialHash` and `editCredentialVersion`.
- **O2 Cookie Lifetime [O]**: 90-day sliding inactivity lifetime, 180-day absolute maximum lifetime enforced server-side via `editCredentialIssuedAt` on `Experience`. Browser cookie expiry ≠ server-side credential validity.
