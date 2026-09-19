---
name: m2-template-system
description: "Milestone 2 for Valentino Prototype 1. Extracts the working M1 template into a proper template registry with metadata, per-version config schemas and versioning, then proves the architecture by adding a second template. Use after M1 is approved."
---

# M2 — Template system

Goal: adding a template is a data-and-folder change, not a core rewrite. Existing published experiences never break.

## Do
1. Inspect the M1 code. Refactor in place; do not rewrite from scratch. Keep the M1 e2e test green throughout.
2. **Registry** (`src/templates/registry.ts`): one entry per template with `id`, `version`, `name`, `description`, `category`, theme metadata, preview asset, supported fields, `active` flag, config schema, default config, component. Expose `getTemplate(id, version)` and `listActiveTemplates()`.
3. **Versioning**: published versions are immutable. Every experience resolves its pinned `templateVersion`. Add a `migrateConfig(from, to)` hook signature (may be unused for now) and document the process for shipping v2.
4. **Shared primitives** in `src/templates/shared/` (layout, media slot, reveal animation, theme tokens). Move duplicated logic out of the first template.
5. **Second template** with a visibly different mood, built with only its own folder plus one registry line. If you must edit unrelated core code to add it, stop and report why.
6. Write `docs/template-system.md`: how to add a template, how versioning works, checklist.
7. **Tests**: schema and `normalizeConfig` tests per template; a test that an experience pinned to v1 still renders after v2 exists; registry tests (inactive templates hidden); e2e still passes for both templates.

## Gate
Second template shipped without touching unrelated core systems. v1 experiences render unchanged. Docs written. Checkpoint report posted.

## Out of scope
Gallery UI, media uploads, template admin UI.
