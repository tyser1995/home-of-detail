import type { MetadataRoute } from "next";
import { bookItem, isEnabled, navItems } from "@/lib/menu";
import { services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [...navItems.filter((m) => !m.redirectTo), ...(bookItem ? [bookItem] : [])].map((m) => m.href);
  const perService = [
    ...(isEnabled("services") ? ["/services/major", "/services/minor", ...services.map((s) => `/services/${s.slug}`)] : []),
    ...(isEnabled("gallery") ? services.map((s) => `/gallery/${s.slug}`) : []),
  ];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p === "/" ? "" : p}`, priority: p === "/" ? 1 : 0.8 })),
    ...perService.map((p) => ({ url: `${site.url}${p}`, priority: 0.7 })),
  ];
}
