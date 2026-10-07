import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Clock, Tag } from "lucide-react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { FaqList, FinalCta, PageHero, ServiceCard } from "@/components/sections";
import { ButtonLink } from "@/components/ui";
import { getService, serviceCategories, services, whatsappLink } from "@/lib/site";
import { bookHref, requireEnabled } from "@/lib/menu";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.name, description: service.summary };
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  requireEnabled("services");
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const category = serviceCategories[service.category];
  const others = services.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={category.name} title={service.name} intro={service.summary}>
        <ButtonLink href={bookHref(service.slug)}>
          Book this service <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
        <ButtonLink href={whatsappLink(`Hi! I'd like a quote for ${service.name}.`)} variant="outline">
          Ask for a quote
        </ButtonLink>
      </PageHero>

      <section className="pb-16 sm:pb-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <div>
            <BeforeAfterSlider paint={service.paint} label={`Drag to compare ${service.name} before and after`} />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {service.highlights.map((h) => (
                <div key={h} className="glass flex items-center gap-3 rounded-2xl p-4">
                  <Check className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-white/90">{h}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-white/10 bg-panel p-6 sm:p-8 lg:sticky lg:top-28">
            <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-mist">
                  <Tag className="h-3.5 w-3.5" aria-hidden="true" /> Starting at
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-white">{service.startingAt}</p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-mist">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" /> Duration
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-white">{service.duration}</p>
              </div>
            </div>
            <h2 className="mt-6 font-display text-lg font-semibold text-white">What&apos;s included</h2>
            <ul className="mt-4 grid gap-3">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-white/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl bg-accent/10 p-4 text-sm text-white/90">
              <span className="font-semibold text-accent">Ideal for: </span>
              {service.idealFor}
            </p>
            <ButtonLink href={bookHref(service.slug)} className="mt-6 w-full">
              Book this service
            </ButtonLink>
          </aside>
        </div>
      </section>

      <section className="section bg-ink-2">
        <div className="container-x">
          <h2 className="h-display text-3xl text-white sm:text-4xl">Frequently asked</h2>
          <div className="mt-8">
            <FaqList limit={4} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <h2 className="h-display text-3xl text-white sm:text-4xl">More {category.name.toLowerCase()}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
