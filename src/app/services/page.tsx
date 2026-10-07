import type { Metadata } from "next";
import { FinalCta, PageHero, ProcessSection, ServiceCategoryGroups } from "@/components/sections";
import { ButtonLink } from "@/components/ui";
import { bookHref, requireEnabled } from "@/lib/menu";

export const metadata: Metadata = {
  title: "All Services",
  description:
    "Major services (PPF, graphene & ceramic coating, window tint, repaint & repair) and minor services (interior, exterior, headlight & glass detail).",
};

export default function ServicesPage() {
  requireEnabled("services");
  return (
    <>
      <PageHero
        eyebrow="All Services"
        title="Protection packages built for real roads"
        intro="From long-term coatings, films and paint repair to quick interior, exterior, headlight and glass details. Every service is done by trained technicians in our climate-controlled studio."
      >
        <ButtonLink href={bookHref()}>Get a quote</ButtonLink>
      </PageHero>
      <section className="pb-16 sm:pb-24">
        <div className="container-x">
          <ServiceCategoryGroups />
          <p className="mt-12 text-center text-sm text-mist">
            Prices are starting rates for sedans. Final pricing depends on vehicle size and condition, confirmed after inspection.
          </p>
        </div>
      </section>
      <ProcessSection />
      <FinalCta />
    </>
  );
}
