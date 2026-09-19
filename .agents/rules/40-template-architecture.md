---
trigger: model_decision
description: "Apply when creating or changing templates, the template registry, template config schemas, the editor, the preview renderer, or the public renderer."
---

# Template architecture rules

Conceptual flow: `TemplateDefinition (id, version) -> config schema (Zod) -> normalizeConfig() -> <ExperienceRenderer/>`.

- Templates are data-driven definitions in a registry, not copy-pasted pages. Never create `Template1.tsx`, `Template2.tsx` with duplicated app logic. Shared primitives (layout, media, animation, theme tokens) live in `src/templates/shared/`.
- Each template defines: `id`, `version`, `name`, `description`, `category`, preview asset, active flag, a Zod schema for the fields it supports, default config, and its React component. A template need not support every field.
- `normalizeConfig(templateId, version, rawConfig)` fills defaults, drops unknown keys, and tolerates missing optional fields and missing media. Editor preview and public page both call it.
- One `<ExperienceRenderer mode="preview" | "public" />` for both editor and public page. No separate rendering logic. This prevents "looks right in the editor, broken when published".
- **Published template versions are immutable.** To change a template, add a new version folder (`src/templates/<id>/v2/`); an experience stays pinned to its `templateVersion`. Provide an explicit config-migration function if an upgrade is ever offered.
- Adding a new template must touch only its own folder plus one registry entry. If it requires editing unrelated core code, the architecture is wrong: stop and raise it.
- Do not duplicate whole template definitions into experience records; store `templateId`, `templateVersion` and the user's `config` only.
