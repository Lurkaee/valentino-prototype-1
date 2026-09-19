---
trigger: model_decision
description: "Apply when creating or editing UI components, styles, animation, layout, copy, or the public experience page."
---

# UI quality bar

Feel: romantic, modern, premium, personal, playful, smooth. Avoid: generic AI-looking layouts, gradient overload, glassmorphism everywhere, animation on every element, huge text blocks, poor contrast.

## Mobile first (recipients open the link on a phone)
- Design at 360px wide first. Verify 360x640, 640x360 (landscape), 768x1024, 1280x800, 1920x1080.
- Use `dvh`/`svh` instead of `100vh` for full-screen sections. Respect safe-area insets. Tap targets at least 44x44px.
- Long names and messages wrap without breaking layout. Support non-Latin scripts (Devanagari, Odia, Arabic, CJK) and emoji: choose fonts with fallback stacks and check rendering.

## Motion
- Animate `transform` and `opacity` only. No layout-thrashing animation.
- Honor `prefers-reduced-motion`: provide a calm, static alternative for every animated reveal.
- Motion never blocks interaction and never loops constantly. One signature moment beats ten small ones.
- Audio or video must never autoplay. Mobile browsers block it, and it is rude. Require a tap.

## Accessibility (minimum)
- Semantic HTML, visible focus states, keyboard-operable controls, labels for inputs, meaningful `alt` text (or empty alt for decoration).
- Contrast at least 4.5:1 for body text, 3:1 for large text and UI.
- Error messages say what happened and what to do next.

## Performance targets for the public experience (measure with Lighthouse mobile preset before optimizing)
- LCP at or under 2.5s on throttled Fast 4G. CLS under 0.1.
- Initial JS for the public route is kept small (target under 170 KB gzipped). Prefer server components; make only interactive parts client components.
- Images are resized, compressed and given explicit dimensions.

## States
Every screen needs loading, empty, error and success states. The public page also needs: invalid link, disabled/removed, missing optional content.
