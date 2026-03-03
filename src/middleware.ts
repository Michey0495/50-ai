import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  // Security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  // Cache headers for static assets
  if (
    pathname.startsWith("/llms.txt") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/.well-known/")
  ) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=86400, s-maxage=86400"
    );
  }

  // API rate limit headers
  if (pathname.startsWith("/api/")) {
    response.headers.set("X-RateLimit-Limit", "5");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
