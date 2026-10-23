import type { MetadataRoute } from "next";
import { restaurant } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  const base = restaurant.meta.siteUrl.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
