import type { MetadataRoute } from "next";
import { tools, categories } from "@/lib/tools";
import { siteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/tools",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    ...tools.map((t) => `/tools/${t.slug}`),
    ...categories.map((c) => `/tools/category/${c.toLowerCase()}`),
  ].map((path) => ({
    url: `${siteUrl}${path}/`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/tools" ? 0.9 : 0.7,
  }));
}
