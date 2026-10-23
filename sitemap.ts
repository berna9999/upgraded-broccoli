import type { MetadataRoute } from "next";
import { restaurant } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = restaurant.meta.siteUrl.replace(/\/$/, "");
  const lastModified = new Date();
  return [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cookie-policy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
