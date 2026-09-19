---
name: m4-gallery-landing
description: "Milestone 4 for Valentino Prototype 1. Builds the template gallery, template preview, select-template flow, and the marketing landing page. Use after M3 is approved."
---

# M4 — Gallery and landing

Goal: a visitor discovers, previews and selects a template, then lands in the editor with it preloaded.

## Do
1. **Gallery** (`/templates`): cards from `listActiveTemplates()`. Show name, description, category, preview image. Filter by category only if there are enough templates to need it.
2. **Template preview**: render the real template with sample data via the shared renderer (not a screenshot), with a clear "Use this template" action. Sample data is fictional and clearly labeled.
3. **Select flow**: gallery -> preview -> `/create/[templateId]` with defaults loaded. Invalid or inactive template IDs show a friendly state.
4. **Landing page** (`/`): hero with a real preview, how it works (Discover -> Choose -> Customize -> Preview -> Publish -> Share), featured templates, one CTA, footer. Link to privacy and report-abuse info. Do not over-build.
5. **States**: loading, empty, and error states for every data-driven screen.
6. **Tests and verification**: component and e2e tests for gallery -> select -> editor; `browser-verify` at all viewports.

## Gate
A first-time visitor can find, preview and select a template and reach the editor without confusion. Checkpoint report posted.

## Out of scope
Search, accounts, favorites, template admin UI, payments.
