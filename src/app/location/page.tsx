import type { Metadata } from "next";
import { FinalCta, LocationSection, PageHero } from "@/components/sections";
import { site } from "@/lib/site";
import { requireEnabled } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Location",
  description: `Visit the ${site.name} studio. Address, opening hours and directions.`,
};

export default function LocationPage() {
  requireEnabled("location");
  return (
    <>
      <PageHero
        eyebrow="Location"
        title="Visit our flagship studio"
        intro={`Proudly serving ${site.serviceAreas.join(", ")} and nearby areas.`}
      />
      <LocationSection />
      <FinalCta />
    </>
  );
}
