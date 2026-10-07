import Link from "next/link";
import { services, type GalleryItem } from "@/lib/site";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { CarArt } from "./CarArt";

/** Horizontal service filter, used by the Gallery and Videos pages. Scrolls sideways on phones. */
export function ServiceTabs({ basePath, active, counts }: { basePath: string; active?: string; counts?: Record<string, number> }) {
  // Only show services that have something to show (counts include "" for All).
  const withItems = counts ? services.filter((s) => counts[s.slug]) : services;
  const tabs = [{ slug: "", label: "All" }, ...withItems.map((s) => ({ slug: s.slug, label: s.short }))];
  return (
    <nav aria-label="Filter by service" className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
      <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
        {tabs.map((t) => {
          const isActive = (active ?? "") === t.slug;
          const href = t.slug ? `${basePath}/${t.slug}` : basePath;
          const count = counts?.[t.slug];
          return (
            <li key={t.slug || "all"}>
              <Link
                href={href}
                scroll={false}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? "border-accent bg-accent text-on-accent" : "border-white/15 text-white/80 hover:border-accent hover:text-accent"
                }`}
              >
                {t.label}
                {count !== undefined && <span className={`text-xs ${isActive ? "text-on-accent/70" : "text-mist"}`}>{count}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const service = services.find((s) => s.slug === item.service);
  return (
    <figure className="group overflow-hidden rounded-3xl border border-white/10 bg-panel">
      {index % 2 === 0 ? (
        <BeforeAfterSlider paint={item.paint} label={`Drag to compare ${item.vehicle} before and after`} />
      ) : (
        <div className="aspect-[2/1] overflow-hidden">
          <CarArt
            id={`g-${item.service}-${index}`}
            paint={item.paint}
            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <figcaption className="p-5">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">{service?.name}</span>
        <span className="mt-2 block font-display text-lg font-semibold text-white">{item.vehicle}</span>
        <span className="mt-1 block text-sm text-mist">{item.note}</span>
      </figcaption>
    </figure>
  );
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <GalleryCard key={`${item.service}-${item.vehicle}`} item={item} index={i} />
      ))}
    </div>
  );
}

export function countByService<T extends { service: string }>(items: T[]) {
  const counts: Record<string, number> = { "": items.length };
  for (const item of items) counts[item.service] = (counts[item.service] ?? 0) + 1;
  return counts;
}
