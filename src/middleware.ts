import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Intercept /v/:publicId to return real HTTP 410 if experience is DISABLED or DELETED
  const publicViewMatch = pathname.match(/^\/v\/([a-zA-Z0-9_-]+)$/);
  if (publicViewMatch) {
    const publicId = publicViewMatch[1];
    try {
      const statusRes = await fetch(`${request.nextUrl.origin}/api/internal/status/${publicId}`, {
        cache: "no-store",
      });

      if (statusRes.ok) {
        const data = await statusRes.json().catch(() => ({}));
        if (data.status === "DISABLED" || data.status === "DELETED") {
          const html410 = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Valentine Unavailable</title>
  <meta name="robots" content="noindex, nofollow" />
  <style>
    body { margin: 0; background: #0B0B12; color: #F8FAFC; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; text-align: center; padding: 1.5rem; }
    .card { max-width: 28rem; width: 100%; padding: 2rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 1rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
    h1 { font-size: 1.25rem; margin-bottom: 0.5rem; font-weight: 500; }
    p { font-size: 0.875rem; color: #94A3B8; margin-bottom: 1.5rem; }
    a { display: inline-block; padding: 0.625rem 1.25rem; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 0.75rem; background: #E11D48; color: #FFFFFF; text-decoration: none; }
  </style>
</head>
<body>
  <div class="card" data-testid="gone-410-container">
    <div style="font-size: 2.5rem; margin-bottom: 1rem;">🥀</div>
    <h1>This Experience is No Longer Available</h1>
    <p>The creator has removed or disabled this Valentine.</p>
    <a href="/create">Create Your Own Valentine</a>
  </div>
</body>
</html>`;

          return new NextResponse(html410, {
            status: 410,
            headers: {
              "Content-Type": "text/html; charset=utf-8",
              "Cache-Control": "no-store",
              "X-Robots-Tag": "noindex, nofollow",
              "X-Content-Type-Options": "nosniff",
            },
          });
        }
      }
    } catch {
      // Fall through to page rendering if internal fetch fails
    }
  }

  const response = NextResponse.next();

  // Enforce security headers on response
  response.headers.set("X-Content-Type-Options", "nosniff");

  if (pathname.startsWith("/v/") || pathname.startsWith("/edit/") || pathname.startsWith("/api/")) {
    response.headers.set("Cache-Control", "no-store");
  }

  if (pathname.startsWith("/v/") || pathname.startsWith("/edit/")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  if (pathname.startsWith("/edit/")) {
    response.headers.set("Referrer-Policy", "no-referrer");
  }

  return response;
}

export const config = {
  matcher: ["/v/:path*", "/edit/:path*", "/api/:path*"],
};
