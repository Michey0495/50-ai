import type { MetadataRoute } from "next";
import { EMAIL_SCENARIOS, DOCUMENT_SCENARIOS } from "@/lib/scenarios";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bunsho.ezoai.jp";

export default function sitemap(): MetadataRoute.Sitemap {
  const emailPages = EMAIL_SCENARIOS.map((s) => ({
    url: `${SITE_URL}/email/${s.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const documentPages = DOCUMENT_SCENARIOS.map((s) => ({
    url: `${SITE_URL}/document/${s.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...emailPages,
    ...documentPages,
  ];
}
