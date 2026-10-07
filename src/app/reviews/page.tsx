import type { Metadata } from "next";
import { FinalCta, PageHero, TestimonialCard } from "@/components/sections";
import { Stars } from "@/components/ui";
import { testimonials } from "@/lib/site";
import { requireEnabled } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Reviews",
  description: "5-star reviews from Home of Detail customers.",
};

export default function ReviewsPage() {
  requireEnabled("reviews");
  return (
    <>
      <PageHero eyebrow="Reviews" title="5.0 stars from 1,000+ happy car owners">
        <div className="glass flex items-center gap-4 rounded-2xl px-5 py-4">
          <span className="font-display text-4xl font-bold text-white">5.0</span>
          <span>
            <Stars className="h-5 w-5" />
            <span className="mt-1 block text-sm text-mist">Average customer rating</span>
          </span>
        </div>
      </PageHero>
      <section className="pb-16 sm:pb-24">
        <div className="container-x columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
