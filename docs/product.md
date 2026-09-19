# Product

## Vision
A reusable Valentine's website template platform. People create a personal, romantic web experience for their partner, share a link, and the partner opens it (usually on a phone) to a polished, memorable page. It is a template system, not a single landing page.

Feel: emotional, premium, personal, playful, modern, memorable.

## Journey
`Discover -> Choose template -> Customize -> Live preview -> Save draft -> Publish -> Share link -> Partner opens it`

The recipient never sees the builder. Low friction: show something beautiful fast; don't ask for dozens of fields up front.

## Two audiences
- **Creator**: browses templates, customizes, previews, publishes, shares. May edit or delete later.
- **Recipient**: opens a link, sees the finished experience. Almost always on mobile, often inside a chat app's in-app browser.

## Customization surface (each template opts in to what it supports)
- Partner: partner name, sender name, nicknames, relationship message.
- Message: greeting, letter or short message, closing/signature.
- Media (M3): hero image, couple photos, gallery.
- Visual: theme/accent, typography option, decorative elements the template allows.
- Optional interactive blocks: timeline, memories, "reasons I love you", countdown, surprise reveal, final message.

## Publishing rules
- Publishing snapshots the draft. Later edits stay private until the creator republishes.
- Public links are unlisted and unguessable, and are not indexed by search engines.
- A creator can disable or delete a published experience. Anyone can report one.

## Non-goals (need owner approval)
Payments, AI features, social feeds/discovery, messaging, complex analytics, admin CMS, microservices, native apps.

## Later (do not build now, but don't block)
Accounts, analytics events (`template_viewed`, `template_selected`, `customization_started`, `experience_saved`, `experience_published`, `experience_shared` via a no-op `track()` interface), template admin UI, monetization.
