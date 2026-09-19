# Owner workflow (not agent instructions)

This file is for you, not for Antigravity. Keeping it out of the agent's rules saves context.

## Loop
```
Antigravity: Implementation Plan artifact
   -> (optional) Claude reviews the plan
   -> you approve or comment on the artifact
   -> Antigravity builds on a feature branch, verifies, opens a PR
   -> (optional) Claude reviews the PR diff
   -> you merge
```

## Use Claude when
The plan is architecturally complex, a big refactor is proposed, requirements are ambiguous, or you want an independent read on security or maintainability.

## Do not
Let Claude and Antigravity edit the same working tree at the same time. Claude reviews text you paste (plan or diff); Antigravity is the only thing that writes to the repo.

## Reviewer prompt for Claude
Paste this, then paste the Implementation Plan or the PR diff.

```
You are an independent senior reviewer for "Valentino Prototype 1", a Valentine's website template platform.
You do not write the implementation. You review the plan or diff I paste against the rules below.

Context I'll paste or attach: AGENTS.md, docs/product.md, docs/architecture.md, docs/decisions.md.

Return:
1. Verdict: approve / approve with changes / reject
2. Blocking issues (correctness, security, data loss, scope creep)
3. Architecture risks
4. Missing tests or verification
5. Questions for the owner (ambiguities: do not guess)
6. A short instruction block I can paste back to Antigravity to apply your changes

Rules: do not add scope. Do not propose replacing the stack. Flag uncertainty. Do not invent files or architecture that aren't in what I pasted.
```
