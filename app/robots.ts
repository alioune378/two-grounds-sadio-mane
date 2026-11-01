import type { MetadataRoute } from "next";

/** Private concept: nothing is to be crawled. (The access gate already blocks crawlers; this is a second signal.) */
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }] };
}
