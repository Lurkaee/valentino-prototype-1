# Deployment

Filled in during M6 (`/m6-hardening-release`): production env variable names, build config, migrations, rollback, domain notes, post-deploy smoke checklist. The owner performs deployments.

## Launch Blockers (from M1)
1. **Distributed Rate Limiter**: The in-memory rate limiter in `src/lib/rate-limiter.ts` is strictly for dev/test single-instance execution. A distributed or edge/provider-backed limiter (e.g. Redis, Upstash, or Cloudflare/Vercel edge middleware) must be plugged into the `RateLimiter` interface before any public production deployment.
2. **Production Cookie Requirements**: Production deployment requires HTTPS. Edit sessions use the `__Host-edit-token-[publicId]` cookie name prefix, requiring `Secure`, `Path=/`, and no subdomains.
3. **Caching and Invalidation**: In M1, `/v/*`, `/edit/*`, and `/api/*` use `Cache-Control: no-store`. Public CDN caching and cache revalidation must be reviewed in M5/M6 before enabling any caching on `/v/*`.
