import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  headers: async () => [
    {
      source: "/(.*)",
      headers: securityHeaders,
    },
    {
      source: "/llms.txt",
      headers: [
        { key: "Cache-Control", value: "public, max-age=86400, s-maxage=86400" },
        { key: "Content-Type", value: "text/plain; charset=utf-8" },
      ],
    },
    {
      source: "/.well-known/:path*",
      headers: [
        { key: "Cache-Control", value: "public, max-age=86400, s-maxage=86400" },
      ],
    },
    {
      source: "/api/:path*",
      headers: [
        { key: "X-RateLimit-Limit", value: "5" },
      ],
    },
  ],
};

export default nextConfig;
