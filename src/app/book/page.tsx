import type { Metadata } from "next";
import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { PageHero } from "@/components/sections";
import { getService, site } from "@/lib/site";
import { requireEnabled } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Book a Slot",
  description: "Book your ceramic coating, PPF or detailing appointment at Home of Detail.",
};

export default async function BookPage(props: PageProps<"/book">) {
  requireEnabled("book");
  const { service } = await props.searchParams;
  const slug = typeof service === "string" && getService(service) ? service : "";

  return (
    <>
      <PageHero
        eyebrow="Book"
        title="Secure your slot"
        intro="Tell us about your car and we'll confirm your appointment. Coating and PPF slots book out quickly — reserve early."
      />
      <section className="pb-20 sm:pb-28">
        <div className="container-x grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <BookingForm defaultService={slug} />
          <aside className="grid h-fit gap-4">
            <a href={site.messenger} target="_blank" rel="noopener noreferrer" className="glass flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-accent/50">
              <MessageCircle className="h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
              <span>
                <span className="block font-semibold text-white">Prefer Messenger?</span>
                <span className="block text-sm text-mist">Chat with us on Facebook</span>
              </span>
            </a>
            <a href={site.phoneHref} className="glass flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-accent/50">
              <Phone className="h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
              <span>
                <span className="block font-semibold text-white">Call us</span>
                <span className="block text-sm text-mist">{site.phone}</span>
              </span>
            </a>
            <a href={`mailto:${site.email}`} className="glass flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-accent/50">
              <Mail className="h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block font-semibold text-white">Email us</span>
                <span className="block break-all text-sm text-mist">{site.email}</span>
              </span>
            </a>
            <div className="glass flex gap-4 rounded-2xl p-5">
              <Clock className="h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
              <span className="grid gap-1 text-sm">
                <span className="font-semibold text-white">Studio hours</span>
                {site.hours.map((h) => (
                  <span key={h.days} className="text-mist">
                    {h.days}: {h.time}
                  </span>
                ))}
              </span>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
