# Valentino Prototype 1

A reusable Valentine's website template platform. Pick a template, customize it, preview it live, publish it, and send the link to someone you love.

**Status:** bootstrap. Agent rules, skills and docs are in place; the application is created in milestone M0.

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
1. Create the GitHub repo and push (see below). Keep it **private** for now.
2. In GitHub: protect `main` (require a PR, block force-push; require CI once M0 adds it). Turn on Dependabot alerts, and secret scanning/push protection if your plan offers them.
3. Open the folder in Antigravity as a **Project**. Start milestone conversations in **New Worktree Mode**.
4. In Customizations -> Rules, confirm `AGENTS.md`, `00`, `10`, `20` are **Always on** and `30`, `40` are **Model decision**. Confirm the skills and subagents are listed.
5. Leave terminal commands in the sandbox / request-review mode. Leave non-workspace file access off.
6. Paste the prompt from [docs/KICKOFF.md](docs/KICKOFF.md).

## Create the GitHub repo
With the GitHub CLI:
```bash
git init -b main
git add .
git commit -m "chore: bootstrap repo with agent rules, skills and docs"
gh auth login                       # once
gh repo create valentino-prototype-1 --private --source=. --remote=origin --push
```
Without it: create an **empty private** repo named `valentino-prototype-1` on github.com (no README, license or .gitignore), then:
```bash
git init -b main && git add . && git commit -m "chore: bootstrap repo with agent rules, skills and docs"
git remote add origin https://github.com/<your-username>/valentino-prototype-1.git
git push -u origin main
```
