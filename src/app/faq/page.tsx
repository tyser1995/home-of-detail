import type { Metadata } from "next";
import { FaqList, FinalCta, PageHero } from "@/components/sections";
import { faqs } from "@/lib/site";
import { requireEnabled } from "@/lib/menu";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about ceramic coating, PPF, detailing and booking at Home of Detail.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function FaqPage() {
  requireEnabled("faq");
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered"
        intro="Everything you need to know before booking. Can't find your answer? Message us — we reply in minutes."
      />
      <section className="pb-16 sm:pb-24">
        <div className="container-x max-w-4xl">
          <FaqList />
        </div>
      </section>
      <FinalCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
