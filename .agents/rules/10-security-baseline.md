---
trigger: always_on
---

# Security baseline (this is production software, even though the theme is playful)

Never trust the client. Anything that affects persisted data or what other people see is validated again on the server (Zod schemas shared between client and server).

## User-generated content
- Names, messages and captions are plain text. Render through React's normal escaping. Never use `dangerouslySetInnerHTML`, `innerHTML`, or user-supplied CSS, HTML, SVG or script.
- Enforce length limits per field, and normalize whitespace and Unicode. Long names and emoji must not break layout.
- If links are ever allowed: `https:` only, no `javascript:` or `data:`, add `rel="noopener noreferrer"`.

## Identifiers, secrets and sessions
- `publicId` (the share link) is random and unguessable: at least 128 bits from a cryptographic RNG (e.g. `nanoid` with 22+ chars). Never sequential.
- The edit credential is a separate random value of at least 256 bits. Store only a keyed hash (HMAC-SHA-256 with `EDIT_SECRET_PEPPER`), compare in constant time (`crypto.timingSafeEqual`).
- Edit-auth cookies use per-experience names (`__Host-edit-token-[publicId]` in production, `edit-token-[publicId]` in dev), `Path=/`, HttpOnly, `SameSite=Lax`, `Secure` in production. The server verifies that the credential belongs to the requested experience.
- The edit credential must never appear in: request URLs, URL fragments, DOM, JSON responses, client JavaScript, `localStorage`, `sessionStorage`, console logs, or server logs. Request logging must never record `Cookie` or `Set-Cookie`.
- `/v/*` handlers must ignore edit cookies entirely; public rendering and authorization never consume an edit cookie.
- State-changing requests (`POST`, `PUT`, `PATCH`, `DELETE`) require a valid cookie, an `Origin` header strictly matching `APP_URL`, and a JSON Content-Type.
- Server secrets never reach the frontend bundle. Only `NEXT_PUBLIC_*` values are public and they must not be sensitive.

## Uploads (from M3)
- Allowlist types by sniffing magic bytes, not by extension or the client MIME type. Images only. No SVG uploads.
- Enforce byte size and pixel-dimension limits before decoding (decompression bombs).
- Re-encode every image server-side and strip metadata. Photos carry GPS coordinates in EXIF; they must never be published.
- Never trust the user's filename. Store under random keys. Serve with `X-Content-Type-Options: nosniff`.

## Abuse and privacy
- Rate-limit create, save, publish, upload and report endpoints.
- Public experiences are unlisted: send `X-Robots-Tag: noindex` and `<meta name="robots" content="noindex">`.
- Link previews (Open Graph) must not leak personal content by default: use a generic title and image unless the owner decides otherwise (decision D4).
- No third-party trackers or ad scripts on public experience pages. Do not put personal content (names, messages) in logs or analytics events.
- Every published experience must have a working disable/delete path and a report path (M6 verifies both).

## Headers and errors
- `/edit/*`, `/v/*`, and all `/api/*` responses send `Cache-Control: no-store`. `/edit/*` sends `Referrer-Policy: no-referrer`.
- Set a Content-Security-Policy, `X-Content-Type-Options: nosniff`, and `frame-ancestors` restrictions on all routes.
- Never show stack traces or raw errors to users. Return typed, friendly errors; log details server-side without personal content.

If unsure whether something is safe, treat it as unsafe and ask the owner.
