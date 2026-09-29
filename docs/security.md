# Security Architecture & Threat Model

> **Status:** Production-grade security baseline active (enforcing `.agents/rules/10-security-baseline.md`).

Valentino handles deeply personal romantic messages, names, and memories. A critical premise of the product is that **recipients never signed up for an account**—they receive a link shared in confidence. Protecting their privacy and ensuring that creators retain sovereign, leak-free control over their experiences is paramount.

---

## 1. What We Protect

1. **Recipients:** Individuals who receive a private experience link. They must never be tracked, profiled, indexed by search engines, or exposed to hostile scripts or content injection.
2. **Creators:** Users who compose intimate letters without an account. Their ability to edit, update, disable, or delete their creation must remain securely tied to their session without exposing them to credential theft or tampering.
3. **Personal Content:** Partner names, personal greetings, romantic letters, and uploaded media. These must never leak into search engine indexes, open logs, or public scrapers.

---

## 2. Threat Model & Mitigations

| Threat Vector | Potential Impact | Implemented Mitigation |
| :--- | :--- | :--- |
| **Stored XSS & HTML Injection** | Malicious script execution in recipient's browser | Strict plain-text React escaping; no `dangerouslySetInnerHTML`; server-authoritative Zod validation; Unicode grapheme boundary length limits. |
| **Link Enumeration & Guessing** | Strangers discovering private love letters | High-entropy 128-bit unguessable identifiers (`nanoid` custom alphabet); no public listing, sitemap, or directory of created experiences. |
| **Credential & Edit Theft** | Unauthorized tampering or deletion of letters | 256-bit random edit secrets; HMAC-SHA256 hashed with server-side pepper; constant-time comparison; scoped `__Host-` cookies; zero credential leakage in JSON/DOM/logs. |
| **Search Engine Scraping** | Intimate letters appearing in Google search results | Strict `X-Robots-Tag: noindex, nofollow` headers; `<meta name="robots" content="noindex">`; `Cache-Control: no-store` on all sensitive views. |
| **Cross-Site Request Forgery (CSRF)** | Third-party sites modifying or publishing drafts | Origin verification on all state-changing endpoints (`POST`, `PUT`, `DELETE`); strict canonical host matching in production; rejection with `403 Forbidden`. |
| **Concurrent Overwrite Races** | Lost edits when editing across tabs or devices | Integer revision tracking (`draftRevision`); optimistic concurrency checks reject out-of-order writes with `409 Conflict`. |

---

## 3. Cryptographic & Credential Architecture

### Identifiers vs. Edit Secrets
Each experience has two decoupled identifiers:
* **`publicId` (Share Link):** A 128-bit high-entropy unguessable string used exclusively for routing and public view.
* **`editSecret` (Author Secret):** A 256-bit cryptographically secure random token generated at creation time.

### Storage & Verification
1. **Never Stored in Plaintext:** The database stores only `editSecretHash`:
   $$\text{editSecretHash} = \text{HMAC-SHA256}(\text{editSecret}, \text{EDIT\_SECRET\_PEPPER})$$
2. **Constant-Time Verification:** When an author accesses the editor or submits an edit, the provided token is hashed and verified using `crypto.timingSafeEqual()` to eliminate timing attack vectors.
3. **Absolute Session Expiration:** Edit sessions enforce a 180-day hard limit (`editCredentialIssuedAt`). Expired sessions are rejected with `401 Unauthorized`.

### Cookie Security Specs
Edit tokens are transmitted exclusively through secure HTTP cookies:
* **Name:** `__Host-edit-token-[publicId]` (Production) / `edit-token-[publicId]` (Development)
* **Attributes:** `HttpOnly`, `Secure` (Production), `SameSite=Lax`, `Path=/`
* **Zero Leakage Rule:** Edit secrets are never returned in JSON response bodies, never rendered into the DOM, never placed in URL query parameters, and never logged in server telemetry.

---

## 4. Public Route Isolation (`/v/[publicId]`)

The public recipient route operates under a zero-trust model:
* **Ignores Edit Cookies:** The route handler completely ignores any edit cookie present in the request. A creator viewing their own published link sees exactly what a recipient sees, with zero creator privileges active.
* **True HTTP Status Codes:**
  * `404 Not Found` — Experience does not exist or has never been published.
  * `410 Gone` — Experience has been explicitly disabled or deleted by the author.
  * `200 OK` — Experience is actively published.
* **Strict Cache Controls:** Emits `Cache-Control: no-store` to prevent intermediary proxies, CDNs, or browser caches from retaining private correspondence after deletion or modification.

---

## 5. Origin & CSRF Defense

All mutating API endpoints (`/api/experiences/*`) validate incoming requests:
* **Production:** The `Origin` header must strictly match the canonical `APP_URL`.
* **Vercel Previews:** The `Origin` header is dynamically validated against the verified deployment host (`x-forwarded-host`).
* **Untrusted Origins:** Requests from external domains or missing valid origins are rejected immediately with `403 Forbidden`.

---

## 6. Content Sanitization & Data Integrity

1. **Plain-Text Only:** All user fields (partner names, sender signatures, greetings, letters) are treated strictly as plain text. Rendering is handled through React's native string encoding.
2. **Length & Grapheme Limits:** Validated using server-authoritative Zod schemas. Multi-byte Unicode characters, emojis, and combined grapheme clusters are measured accurately using `Intl.Segmenter` to prevent layout breaks or database buffer overflows.
3. **Strict Publish Schema:** While drafts permit partial or empty fields for effortless auto-saving, publishing requires satisfying the strict `publishSchema` (mandatory partner name, sender name, message body, and valid theme tokens).
4. **Normalized Snapshots:** Publishing takes an immutable snapshot of normalized configuration, detaching the public experience from subsequent in-progress draft revisions.

---

## 7. Operational Security & Reporting

* **Secrets in Code:** Checked against git commits with automated pre-commit scanning. Secret scanning and push protection are active on GitHub.
* **Dependencies:** Automated security scans and Dependabot alerts are enabled. Next.js and core packages are pinned to patched, vulnerability-free releases.
* **Security Contact:** For vulnerability disclosures or abuse reports regarding hosted experiences, please submit an issue on the canonical repository: [Lurkaee/valentino-prototype-1](https://github.com/Lurkaee/valentino-prototype-1).

