---
name: m5-polish
description: "Milestone 5 for Valentino Prototype 1. Improves visual hierarchy, motion, mobile UX, accessibility, performance, and social-share metadata of what already exists without adding scope. Use after M4 is approved."
---

# M5 — Quality and polish

Improve what exists. No new product features.

## Do
1. **Visual pass**: hierarchy, spacing, typography, contrast, consistency across templates and the landing page. Remove generic or cluttered elements.
2. **Motion pass**: keep one signature moment per template, add calm reduced-motion alternatives, remove anything that hurts mobile performance.
3. **Mobile UX**: real-device-sized checks, thumb reach, keyboard overlap in the editor, landscape.
4. **Accessibility**: run automated checks (axe via Playwright) plus a keyboard-only and screen-reader-label pass. Fix everything serious.
5. **Performance**: measure first (Lighthouse mobile, throttled). Targets are in the UI quality rule. Optimize only what the measurements show.
6. **Sharing**: Open Graph and Twitter metadata with a generic default title and image; canonical URL; verify how the link previews when pasted into a chat app. Personalized previews only if decision D4 says so.
7. **Error and empty states**: friendly copy everywhere, custom 404 and error pages, no stack traces.

## Gate
Lighthouse mobile and axe results recorded in the checkpoint report, before and after. No serious a11y issues. Targets met or exceptions documented.
