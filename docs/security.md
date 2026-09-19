# Security notes

The enforceable rules live in `.agents/rules/10-security-baseline.md`. This file records the threat model and review checklist.

## What we protect
Personal romantic messages, names, and photos (with hidden location metadata) belonging to real people who did not sign up for anything: the recipients.

## Main threats
- Stored XSS / HTML injection through names, messages, captions, links.
- Guessing or enumerating share links; stealing or leaking edit secrets (logs, Referer, analytics).
- Malicious or oversized uploads; leaking GPS/EXIF from photos.
- Abuse: harassment or impersonation sent as a "romantic" link; spam creation; phishing links inside messages.
- Secret leakage: keys in git, logs, or client bundles.
- Scraping and indexing of private pages.

## Controls (summary)
Server-side Zod validation; plain-text rendering only; unguessable `publicId`; hashed edit secret; rate limits; image re-encode + metadata strip; CSP and security headers; `noindex`; no trackers on public pages; report and disable/delete paths; secret scanning before every commit; dependency audit before release.

## Review checklist (run in M1, M3, M6)
See `.agents/agents/security-reviewer.md`.

## Reporting
Add a contact address for abuse and security reports before any public launch (owner action).
