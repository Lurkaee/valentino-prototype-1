# Development & Deployment Lifecycle

## Live Progression System (M7)
Every change to `valentino-prototype-1` follows the live progression lifecycle:

```text
feature branch
      ↓
GitHub push
      ↓
Vercel Preview (isolated Preview DB)
      ↓
Browser / live verification
      ↓
PR opened / updated
      ↓
GitHub Actions CI (isolated PostgreSQL 16 container)
      ↓
PR Review & Approval
      ↓
Merge to main
      ↓
Vercel Production (automatic deployment + migration deploy to Production DB)
```

## Review Loop
```text
Antigravity: Implementation & Local Verification
   -> feature branch push
   -> Vercel Preview generated & verified
   -> PR opened
   -> CI passes
   -> Owner approval & merge
   -> Production deployment active
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
