# Architecture

Modular monolith. Separate concerns, one deployable.

## Domains
1. **Marketing** (`/`): explains and converts. Kept thin until the core flow works.
2. **Template system** (`src/templates`): registry, per-version config schemas, shared primitives, template components.
3. **Builder** (`/templates`, `/create`, `/edit`): gallery, editor, live preview, save, publish.
4. **Public experience** (`/v/[publicId]`): renders the published snapshot only.
5. **Persistence & API**: Prisma/PostgreSQL, server-validated writes.
6. **Media** (M3): storage abstraction, processing, cleanup.

## Rendering contract (the most important rule)
```
editor state -> normalizeConfig(templateId, version, config) -> <ExperienceRenderer mode="preview" />
DB publishedConfig -> normalizeConfig(...)                     -> <ExperienceRenderer mode="public" />
```
Same renderer, same normalization, so "correct in the editor" means "correct when published".

## Templates
Repo-managed for the prototype (no template database or CMS). Each template has `id`, `version`, metadata, Zod schema, defaults, component. Published versions are immutable; a change is a new version folder. Experiences pin `templateId` + `templateVersion`.

## Data model (conceptual)
```
Experience   id, publicId (unguessable), editSecretHash, templateId, templateVersion,
             draftConfig, publishedConfig?, status: draft|published|disabled|deleted,
             createdAt, updatedAt, publishedAt
MediaAsset   id, experienceId, storageKey (random), mime, bytes, width, height, altText, status
Report       id, experienceId, reason, status, createdAt
```
No `User` table unless decision D2 changes. Templates are not DB rows in the prototype.

## Routes (proposed)
`/` landing | `/templates` gallery | `/create/[templateId]` new | `/edit/...` edit (secret-based) | `/v/[publicId]` public | `/api/*` server endpoints | `/api/health`.

## Cross-cutting
- Validation: Zod schemas shared by client and server; server is authoritative.
- Errors: typed errors, friendly messages, no stack traces to users.
- Caching: in M1, all routes (`/v/*`, `/edit/*`, `/api/*`) deliberately send `Cache-Control: no-store` to eliminate any risk of stale recipient content after republish, disable, or deletion. Public caching, ISR, and CDN revalidation are deferred to M5/M6 after a privacy and cache-invalidation review. LCP in M1 is recorded as informational evidence only.
- Analytics: a no-op `track(event)` extension point only.
- Observability: structured server logs without personal content.

## Suggested layout (adapt after inspecting the generated app)
```
src/app/            routes
src/templates/      registry.ts, shared/, <id>/v1/
src/lib/            config, validation, ids, rate-limit, storage
prisma/             schema.prisma, migrations
docs/  .agents/  .github/
```
