import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
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
