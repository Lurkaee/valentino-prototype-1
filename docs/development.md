# Development

## Prerequisites
- Node.js 20+
- `pnpm` 12.4.2 (enforced via `packageManager` in `package.json`)
- Docker (for local PostgreSQL instance) or a local PostgreSQL 16 server

## Local PostgreSQL Database Setup
Local development and automated testing require a running PostgreSQL instance.

To run PostgreSQL 16 with Docker:
```bash
docker run -d \
  --name valentino-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=valentino_dev \
  -p 5432:5432 \
  postgres:16-alpine
```

Local connection string:
```text
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/valentino_dev"
```

## Environment Variables
Create a local `.env` file (copied from `.env.example`):
```bash
APP_URL=http://localhost:3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/valentino_dev"
EDIT_SECRET_PEPPER=dev-local-pepper-32-chars-minimum-length-key
```

## Database Commands
All migrations use standard Prisma migration workflows:
```bash
# Apply pending migrations to local database (production & CI mechanism)
pnpm db:migrate

# Generate Prisma Client after schema changes
pnpm db:generate

# Create new migrations during development (interactive)
pnpm db:dev
```
Note: `prisma db push` is not permitted in the deployment or standard development workflow.

## Running the Application
```bash
# Install dependencies
pnpm install --frozen-lockfile

# Generate Prisma Client
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Start local Next.js development server
pnpm dev
```

## Verification & Testing Suite
```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```
