# Deployment Architecture (M7)

## Overview
Valentino Prototype 1 is hosted on **Vercel** with a persistent **PostgreSQL** database and automated migrations via Prisma.

## Environments & Database Isolation
CRITICAL: Production and Preview environments must **never** share a database.
- **Production (`main` branch)**:
  - Deployed automatically from GitHub `main` branch.
  - Connected to dedicated Production PostgreSQL database.
- **Preview (Feature branches & Pull Requests)**:
  - Deployed automatically on every push or PR update.
  - Connected to dedicated Preview PostgreSQL database / isolated environment.
  - Migrations in Preview environments cannot mutate or impact Production.

## Database Migrations
Deployments use reproducible, checked-in SQL migrations:
- Migration engine: `prisma migrate deploy` (packaged in `pnpm vercel-build`).
- Schema definitions: `prisma/schema.prisma` (`provider = "postgresql"`).
- Migration folder: `prisma/migrations/`.
- Lockfile: `prisma/migrations/migration_lock.toml`.
- Note: `prisma db push` is strictly prohibited in production and preview workflows.

## Environment Variables
The following environment variables are required across environments:

| Variable | Local | Preview | Production | Purpose |
|----------|-------|---------|------------|---------|
| `DATABASE_URL` | `postgresql://...localhost:5432/valentino_dev` | Dedicated Preview PostgreSQL URL | Dedicated Production PostgreSQL URL | PostgreSQL connection string |
| `APP_URL` | `http://localhost:3000` | (Not set or Preview URL) | `https://<production-domain>` | Canonical base URL for absolute links & CSRF |
| `EDIT_SECRET_PEPPER` | Dev local secret (32+ chars) | Strong random 32+ char secret | Strong random 32+ char secret | Server-side pepper for edit credential HMAC hashing |
| `VERCEL_ENV` | Not set | Automatically set to `preview` | Automatically set to `production` | Environment indicator used by CSRF logic |

## CSRF / Origin Security in Preview vs Production
- **Production**: State-changing requests (`POST`, `PUT`, `DELETE`) require an `Origin` matching the explicit `APP_URL`.
- **Preview**: When `VERCEL_ENV === "preview"`, the application verifies the request `Origin` strictly against the deployment host (`x-forwarded-host` or `host` header). Arbitrary or third-party origins are rejected with `403 Forbidden`.

## Vercel Build Command
Configured in `package.json`:
```json
"vercel-build": "prisma generate && prisma migrate deploy && next build"
```
Vercel executes this build step upon receiving a deployment hook, ensuring pending migrations are executed before building and deploying the Next.js bundle.

## Rollback Procedure
1. If a deployment fails due to application code:
   - Roll back to the previous successful deployment in the Vercel dashboard.
2. If a migration needs reversal:
   - Write an explicit forward migration that undoes the offending schema changes, test locally, verify against preview database, and deploy via standard git workflow.
