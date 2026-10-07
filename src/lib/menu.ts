import { notFound } from "next/navigation";
import { serviceCategories, services, servicesIn, whatsappLink, type ServiceCategory } from "./site";

// Menu show/hide switchboard.
// Set `visible: false` to hide a menu item. Hiding an item also:
//   - removes it from the header, mobile menu and footer
//   - makes its page return 404 and drops it from the sitemap
//   - hides buttons elsewhere on the site that link to it
// Order here is the order shown in the navigation.
// Items with `redirectTo: "book"` have no page of their own; they link to Book Now
// (or to WhatsApp when Book Now is hidden).

export type MenuKey =
  | "home"
  | "services"
  | "gallery"
  | "videos"
  | "ownership"
  | "subscription"
  | "reviews"
  | "location"
  | "faq"
  | "book";

type MenuConfig = { key: MenuKey; label: string; href: string; visible: boolean; redirectTo?: "book" };

const menuConfig: MenuConfig[] = [
  { key: "home", label: "Home", href: "/", visible: true },
  { key: "services", label: "Services", href: "/services", visible: true },
  { key: "gallery", label: "Gallery", href: "/gallery", visible: true },
  { key: "videos", label: "Videos", href: "/videos", visible: true },
  { key: "ownership", label: "Ownership", href: "/book", visible: true, redirectTo: "book" },
  { key: "subscription", label: "Subscription", href: "/book", visible: true, redirectTo: "book" },
  { key: "reviews", label: "Reviews", href: "/reviews", visible: false },
  { key: "location", label: "Location", href: "/location", visible: true },
  { key: "faq", label: "FAQ", href: "/faq", visible: false },
  { key: "book", label: "Book Now", href: "/book", visible: true },
];

/** `group` renders a small heading above the first link of each group. */
export type SubLink = { href: string; label: string; hint?: string; group?: string };
export type MenuItem = MenuConfig & { children?: SubLink[] };

const categories = Object.keys(serviceCategories) as ServiceCategory[];

const submenus: Partial<Record<MenuKey, SubLink[]>> = {
  services: [
    { href: "/services", label: "All Services", hint: `${services.length} services` },
    ...categories.map((c) => ({
      href: `/services/${c}`,
      label: serviceCategories[c].name,
      hint: servicesIn(c).map((s) => s.short).join(" · "),
    })),
  ],
  gallery: [
    { href: "/gallery", label: "All work" },
    ...categories.flatMap((c) =>
      servicesIn(c).map((s) => ({ href: `/gallery/${s.slug}`, label: s.name, group: serviceCategories[c].name })),
    ),
  ],
};

export function isEnabled(key: MenuKey) {
  return menuConfig.find((m) => m.key === key)?.visible ?? false;
}

/** Call at the top of a page to 404 it when its menu item is hidden. */
export function requireEnabled(key: MenuKey) {
  if (!isEnabled(key)) notFound();
}

const visible = menuConfig
  .filter((m) => m.visible)
  .map((m) => ({ ...m, href: m.redirectTo === "book" ? bookHref() : m.href, children: submenus[m.key] }));

/** Regular navigation links (everything except the Book Now call-to-action). */
export const navItems: MenuItem[] = visible.filter((m) => m.key !== "book");

/** The Book Now call-to-action, or undefined when it's hidden. */
export const bookItem: MenuItem | undefined = visible.find((m) => m.key === "book");

/** Where "book" buttons point: the booking page, or WhatsApp when the booking page is hidden. */
export function bookHref(serviceSlug?: string) {
  if (isEnabled("book")) return serviceSlug ? `/book?service=${serviceSlug}` : "/book";
  return whatsappLink("Hi Home of Detail! I'd like to book a slot.");
}
