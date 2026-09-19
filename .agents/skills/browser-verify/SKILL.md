---
name: browser-verify
description: "Verifies UI work in a real browser across mobile, tablet and desktop viewports with evidence. Use after any change to pages, components, styles, animation, the editor, or the public experience, and before marking a UI feature done."
---

# Browser verification

Source-code inspection and a passing compile are not verification. Verify in a real browser.

## Procedure
1. Start the app (`pnpm dev`, or `pnpm build && pnpm start` for performance checks).
2. Use Antigravity's browser tooling (browser subagent, `/browser`). If it is unavailable this session, say so, fall back to Playwright screenshots, and mark anything unverified as NOT VERIFIED.
3. Walk the real user flow for the milestone (not just the page you edited).
4. At each viewport: 360x640 (mobile portrait), 640x360 (mobile landscape), 768x1024 (tablet), 1280x800 (laptop), 1920x1080 (desktop). Check layout, overflow, tap targets, text wrapping with a very long name and a non-Latin name, and safe areas.
5. Open the console and network panels: zero errors, no failed requests, no mixed content.
6. Emulate `prefers-reduced-motion: reduce`: nothing essential is lost or stuck.
7. Keyboard-only pass: every control reachable, focus visible, no traps.
8. Public experience only: throttle to Fast 4G and record LCP; verify invalid link, disabled, and missing-optional-content states.
9. Capture screenshots (or a recording) as artifacts and attach the key ones to the PR.

## Persist what you found
Any critical journey you verified by hand must also become a Playwright test so it is re-checked on every PR. Manual verification alone does not count as coverage.

## Report
A short table: viewport / result / evidence / issues. Fix issues, then re-run the failing viewports.
