# Kickoff prompt (paste into a new Antigravity conversation)

Open this repo as an Antigravity **Project**, start the conversation in **New Worktree Mode**, then paste:

```
Read AGENTS.md, docs/product.md, docs/architecture.md and docs/decisions.md.
Before doing anything else, tell me: (1) which model is active, (2) which rules, skills and subagents you can see.
Then run /m0-repo-foundation. Produce the Implementation Plan artifact and wait for my approval before writing code.
```

For later milestones, start a fresh conversation and paste:

```
Read AGENTS.md and docs/decisions.md. State the active model. Then run /m1-walking-skeleton
```
(replace with `/m2-template-system`, `/m3-media-pipeline`, `/m4-gallery-landing`, `/m5-polish`, `/m6-hardening-release` in order, only after the previous checkpoint is approved and merged).

If the slash command doesn't appear, the skill isn't loaded: check Customizations, or paste the contents of the skill's `SKILL.md` as the prompt.
