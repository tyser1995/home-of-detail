import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { countByService, GalleryGrid, ServiceTabs } from "@/components/media";
import { FinalCta, PageHero } from "@/components/sections";
import { requireEnabled } from "@/lib/menu";
import { gallery, services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Before and after transformations from the Home of Detail studio, grouped by service.",
};

export default function GalleryPage() {
  requireEnabled("gallery");
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Transformations"
        intro="Visual proof of precision. Browse our work by service and drag any slider to compare before and after."
      />
      <section className="pb-16 sm:pb-24">
        <div className="container-x">
          <ServiceTabs basePath="/gallery" counts={countByService(gallery)} />
          <div className="mt-12 grid gap-16">
            {services.map((s) => {
              const items = gallery.filter((g) => g.service === s.slug);
              if (!items.length) return null;
              return (
                <section key={s.slug} aria-labelledby={`g-${s.slug}`}>
                  <div className="mb-6 flex items-end justify-between gap-4">
                    <h2 id={`g-${s.slug}`} className="h-display text-2xl text-white sm:text-3xl">
                      {s.name}
                    </h2>
                    <Link href={`/gallery/${s.slug}`} className="flex shrink-0 items-center gap-1 text-sm font-semibold text-accent">
                      View all <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                  <GalleryGrid items={items.slice(0, 3)} />
                </section>
              );
            })}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
