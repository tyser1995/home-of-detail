import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { countByService, GalleryGrid, ServiceTabs } from "@/components/media";
import { FinalCta, PageHero } from "@/components/sections";
import { ButtonLink } from "@/components/ui";
import { bookHref, isEnabled, requireEnabled } from "@/lib/menu";
import { gallery, getService, services } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/gallery/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return { title: `${service.name} Gallery`, description: `Before and after results of our ${service.name} work.` };
}

export default async function ServiceGalleryPage(props: PageProps<"/gallery/[slug]">) {
  requireEnabled("gallery");
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const items = gallery.filter((g) => g.service === service.slug);

  return (
    <>
      <PageHero eyebrow="Gallery" title={service.name} intro={`Real ${service.short.toLowerCase()} results from our studio.`}>
        <ButtonLink href={bookHref(service.slug)}>
          Book this service <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
        {isEnabled("services") && (
          <ButtonLink href={`/services/${service.slug}`} variant="outline">
            Service details
          </ButtonLink>
        )}
      </PageHero>
      <section className="pb-16 sm:pb-24">
        <div className="container-x">
          <ServiceTabs basePath="/gallery" active={service.slug} counts={countByService(gallery)} />
          <div className="mt-10">
            {items.length ? (
              <GalleryGrid items={items} />
            ) : (
              <p className="rounded-3xl border border-white/10 bg-panel p-10 text-center text-mist">
                New {service.name} photos coming soon.
              </p>
            )}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
