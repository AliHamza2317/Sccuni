import type { MetadataRoute } from "next";
import { getPrograms, getUniversities } from "@/lib/data";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/programs", "/merit-calculator", "/best-fit", "/admissions-calendar", "/scholarships"].map((p) => ({ url: `${base}${p}`, changeFrequency: "daily" as const, priority: p === "" ? 1 : 0.8 }));
  const programs = getPrograms().map((p) => ({ url: `${base}/programs/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.7 }));
  const universities = getUniversities().map((u) => ({ url: `${base}/universities/${u.slug}`, changeFrequency: "weekly" as const, priority: 0.7 }));
  return [...pages, ...programs, ...universities];
}
