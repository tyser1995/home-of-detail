import Link from "next/link";
import { FinalCta, PageHero, ProcessSection, ServicesGrid } from "@/components/sections";
import { ButtonLink } from "@/components/ui";
import { bookHref, requireEnabled } from "@/lib/menu";
import { serviceCategories, servicesIn, type ServiceCategory } from "@/lib/site";

/** Shared page body for /services/major and /services/minor. */
export function ServiceCategoryPage({ category }: { category: ServiceCategory }) {
  requireEnabled("services");
  const info = serviceCategories[category];
  const other = serviceCategories[category === "major" ? "minor" : "major"];

  return (
    <>
      <PageHero eyebrow="Services" title={info.name} intro={info.intro}>
        <ButtonLink href={bookHref()}>Get a quote</ButtonLink>
        <ButtonLink href="/services" variant="outline">
          All services
        </ButtonLink>
      </PageHero>
      <section className="pb-16 sm:pb-24">
        <div className="container-x">
          <ServicesGrid items={servicesIn(category)} />
          <p className="mt-10 text-center text-sm text-mist">
            Looking for something else?{" "}
            <Link href={`/services/${other.slug}`} className="font-semibold text-accent hover:underline">
              See our {other.name.toLowerCase()}
            </Link>
          </p>
        </div>
      </section>
      <ProcessSection />
      <FinalCta />
    </>
  );
}
