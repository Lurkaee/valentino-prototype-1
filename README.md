# Valentino Prototype 1

A reusable Valentine's website template platform. Pick a template, customize it, preview it live, publish it, and send the link to someone you love.

**Status:** M1 complete, M7 Vercel Deployment & Live Progression active. PostgreSQL persistent database configured with automated Prisma migrations.

## Docs
- [Product](docs/product.md) · [Architecture](docs/architecture.md) · [Decisions](docs/decisions.md) · [Security](docs/security.md)
- [Development](docs/development.md) · [Testing](docs/testing.md) · [Deployment](docs/deployment.md) · [Template system](docs/template-system.md)
- [Owner workflow](docs/workflow.md) · [Kickoff prompt](docs/KICKOFF.md)

## How this repo is set up for Antigravity
| Path | Purpose |
|------|---------|
| `AGENTS.md` | Short always-on instructions |
| `.agents/rules/` | Standing rules (each file under 12,000 characters) |
| `.agents/skills/` | Milestone procedures `/m0-…` to `/m6-…`, `browser-verify`, `recovery`, `phase-runner` |
| `.agents/agents/` | Read-only `code-reviewer` and `security-reviewer` subagents |

## Owner setup checklist
1. Canonical GitHub repository: [Lurkaee/valentino-prototype-1](https://github.com/Lurkaee/valentino-prototype-1) (Visibility: **public**).
2. In GitHub: protect `main` (require a PR, block force-push; require CI). Turn on Dependabot alerts, and secret scanning/push protection.
3. Open the folder in Antigravity as a **Project**. Start milestone conversations in **New Worktree Mode**.
4. In Customizations -> Rules, confirm `AGENTS.md`, `00`, `10`, `20` are **Always on** and `30`, `40` are **Model decision**. Confirm the skills and subagents are listed.
5. Leave terminal commands in the sandbox / request-review mode. Leave non-workspace file access off.
6. Paste the prompt from [docs/KICKOFF.md](docs/KICKOFF.md).

## Canonical GitHub Repository
The canonical repository is:
```bash
https://github.com/Lurkaee/valentino-prototype-1.git
```
Branches:
- `main` (default branch)
- `feature/m1-walking-skeleton` (M1 implementation branch)
