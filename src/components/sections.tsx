import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check, Clock, Gift, Mail, MapPin, MessageCircle, Navigation, Phone, Quote } from "lucide-react";
import {
  faqs,
  mapsLink,
  processSteps,
  reasons,
  serviceCategories,
  services,
  servicesIn,
  site,
  testimonials,
  whatsappLink,
  type Service,
  type ServiceCategory,
} from "@/lib/site";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { ButtonLink, Icon, SectionHeading, Stars } from "./ui";
import { bookHref, isEnabled } from "@/lib/menu";

/* ---------- Page hero for inner pages ---------- */

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="grid-glow relative -mt-16 overflow-hidden pb-14 pt-32 sm:pb-20 sm:pt-40 lg:-mt-20">
      <div className="container-x relative">
        <div className="max-w-3xl animate-fade-up">
          <span className="eyebrow">
            <span className="h-px w-6 bg-accent" />
            {eyebrow}
          </span>
          <h1 className="h-display mt-4 text-4xl text-white sm:text-5xl lg:text-6xl">{title}</h1>
          {intro && <p className="mt-5 text-base leading-relaxed text-mist sm:text-lg">{intro}</p>}
          {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
        </div>
      </div>
    </section>
  );
}

/* ---------- Trust / stats ---------- */

export function StatsBar() {
  return (
    <section aria-label="Highlights" className="border-y border-white/10 bg-ink-2">
      <div className="container-x grid grid-cols-2 divide-white/10 md:grid-cols-4 md:divide-x">
        {site.stats.map((s, i) => (
          <div key={s.label} className={`px-4 py-8 text-center sm:py-10 ${i < 2 ? "border-b border-white/10 md:border-b-0" : ""} ${i % 2 === 0 ? "border-r border-white/10 md:border-r-0" : ""}`}>
            <div className="font-display text-3xl font-bold text-white sm:text-4xl">{s.value}</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-mist sm:text-sm">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Problem / solution ---------- */

export function WhyNotBasicWash() {
  const problems = [
    "Intense sun bakes contaminants into the clear coat",
    "Heavy rain leaves mineral water spots behind",
    "Road dust and brush washes create micro-scratches",
  ];
  return (
    <section className="section">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionHeading
          align="left"
          eyebrow="The problem"
          title={<>Why a basic car wash is <span className="text-gradient">never enough</span></>}
          intro="Heat, rain and dusty roads attack your paint every day. A quick wash removes dirt for a day — but it can't stop oxidation, fading and swirl marks. We fix the damage, then lock in protection that lasts for years."
        />
        <div className="grid gap-4">
          {problems.map((p, i) => (
            <div key={p} className="glass flex items-start gap-4 rounded-2xl p-5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-red-500/15 font-display text-sm font-bold text-red-300">
                0{i + 1}
              </span>
              <p className="pt-1.5 text-white/90">{p}</p>
            </div>
          ))}
          <div className="flex items-start gap-4 rounded-2xl border border-accent/40 bg-accent/10 p-5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
              <Check className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="pt-1.5 font-medium text-white">
              Our answer: precision paint correction followed by ceramic coating or PPF — real, long-term protection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 sm:p-8"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60"
        style={{ background: "var(--color-accent)" }}
      />
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/30">
        <Icon name={service.icon} />
      </span>
      <h3 className="mt-6 font-display text-xl font-semibold text-white">{service.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{service.summary}</p>
      <ul className="mt-5 grid gap-2">
        {service.highlights.slice(0, 3).map((h) => (
          <li key={h} className="flex items-center gap-2 text-sm text-white/85">
            <Check className="h-4 w-4 text-accent" aria-hidden="true" />
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
        <span className="text-sm text-mist">
          From <span className="font-semibold text-white">{service.startingAt}</span>
        </span>
        <span className="flex items-center gap-1 text-sm font-semibold text-accent">
          Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function ServicesGrid({ items = services }: { items?: Service[] }) {
  const cols = items.length % 3 === 0 || items.length === 5 ? "lg:grid-cols-3" : "lg:grid-cols-2 xl:grid-cols-4";
  return (
    <div className={`grid gap-5 sm:grid-cols-2 ${cols}`}>
      {items.map((s) => (
        <ServiceCard key={s.slug} service={s} />
      ))}
    </div>
  );
}

/** Services split into Major and Minor groups, each with a heading and "View all" link. */
export function ServiceCategoryGroups() {
  return (
    <div className="grid gap-16">
      {(Object.keys(serviceCategories) as ServiceCategory[]).map((c) => (
        <div key={c}>
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h3 className="h-display text-2xl text-white sm:text-3xl">{serviceCategories[c].name}</h3>
              <p className="mt-2 max-w-2xl text-sm text-mist sm:text-base">{serviceCategories[c].intro}</p>
            </div>
            {isEnabled("services") && (
              <Link href={`/services/${c}`} className="flex shrink-0 items-center gap-1 text-sm font-semibold text-accent">
                View {serviceCategories[c].name.toLowerCase()} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>
          <ServicesGrid items={servicesIn(c)} />
        </div>
      ))}
    </div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="section bg-ink-2">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our services"
          title="Stop waxing. Start protecting."
          intro="Studio-grade protection and detailing, from long-term coatings and films to quick, focused details."
        />
        <div className="mt-12 sm:mt-16">
          <ServiceCategoryGroups />
        </div>
      </div>
    </section>
  );
}

/* ---------- Before / after ---------- */

export function ResultsSection() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Real results"
          title="Before & after"
          intro="Drag the slider to see the transformation — from tired, swirled paint to a finish that reflects like glass."
        />
        <div className="mx-auto mt-12 max-w-5xl">
          <BeforeAfterSlider paint="#1f2a36" label="Drag to compare the 2025 Ford Everest before and after" />
          <div className="mt-6 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div>
              <p className="font-display text-lg font-semibold text-white">2025 Ford Everest</p>
              <p className="text-sm text-mist">Two-step paint correction + 5-year ceramic coating</p>
            </div>
            {isEnabled("gallery") && (
              <ButtonLink href="/gallery" variant="outline">
                See more transformations <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why choose us ---------- */

export function ReasonsSection() {
  return (
    <section className="section bg-ink-2">
      <div className="container-x">
        <SectionHeading eyebrow="Why Home of Detail" title="Obsessive about every panel" />
        <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.title} className="glass rounded-3xl p-6 sm:p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-accent/30 to-accent/5 text-accent">
                <Icon name={r.icon} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */

export function ProcessSection() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="How it works" title="The Home of Detail process" />
        <ol className="relative mt-12 grid gap-8 sm:mt-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent lg:block" />
          {processSteps.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-accent/50 bg-ink font-display text-lg font-bold text-accent">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */

export function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-panel p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <Stars count={t.rating} />
        <Quote className="h-8 w-8 text-accent/30" aria-hidden="true" />
      </div>
      <blockquote className="mt-5 flex-1 leading-relaxed text-white/90">&ldquo;{t.text}&rdquo;</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 font-display font-semibold text-accent">
          {t.name.charAt(0)}
        </span>
        <span>
          <span className="block font-semibold text-white">{t.name}</span>
          <span className="block text-xs text-mist">{t.location}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section bg-ink-2">
      <div className="container-x">
        <SectionHeading eyebrow="Reviews" title="What our clients say" intro="5.0-star rated by car owners who trust us with their pride and joy." />
        <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>
        {isEnabled("reviews") && (
          <div className="mt-10 text-center">
            <ButtonLink href="/reviews" variant="outline">
              Read all reviews <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

export function FaqList({ limit }: { limit?: number }) {
  const list = limit ? faqs.slice(0, limit) : faqs;
  return (
    <div className="divide-y divide-white/10 rounded-3xl border border-white/10 bg-panel">
      {list.map((f, i) => (
        <details key={f.q} className="group p-5 sm:p-7" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-white sm:text-lg">
            {f.q}
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-accent transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-4 leading-relaxed text-mist">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqSection() {
  return (
    <section className="section">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHeading align="left" eyebrow="Quick answers" title="Questions car owners ask us" />
          {isEnabled("faq") && (
            <div>
              <ButtonLink href="/faq" variant="outline">
                View all FAQs <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          )}
        </div>
        <FaqList limit={4} />
      </div>
    </section>
  );
}

/* ---------- Location ---------- */

export function LocationSection() {
  return (
    <section className="section bg-ink-2">
      <div className="container-x grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col justify-center">
          <SectionHeading align="left" eyebrow="Visit the studio" title="Find us" intro="Drop by our flagship studio — bookings recommended so we can give your car the time it deserves." />
          <ul className="mt-8 grid gap-5">
            <li className="flex gap-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <span className="text-white/90">{site.address}</span>
            </li>
            <li className="flex gap-4">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <span className="grid gap-1 text-white/90">
                {site.hours.map((h) => (
                  <span key={h.days}>
                    <span className="inline-block w-24 text-mist">{h.days}</span> {h.time}
                  </span>
                ))}
              </span>
            </li>
            <li className="flex gap-4">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <a href={site.phoneHref} className="text-white/90 hover:text-accent">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-4">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="break-all text-white/90 hover:text-accent">
                {site.email}
              </a>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {site.serviceAreas.map((a) => (
              <span key={a} className="rounded-full border border-white/10 px-3 py-1 text-xs text-mist">
                {a}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href={mapsLink()}>
              <Navigation className="h-4 w-4" aria-hidden="true" /> Get directions
            </ButtonLink>
          </div>
        </div>
        <div className="min-h-[320px] overflow-hidden rounded-3xl border border-white/10 lg:min-h-[460px]">
          <iframe
            title={`Map to ${site.name}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`}
            className="h-full min-h-[320px] w-full grayscale-[60%] invert-[90%] hue-rotate-180 lg:min-h-[460px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Membership ---------- */

export function MembershipSection() {
  const perks = ["Exclusive limited-time offers", "Reward points on every service", "Member-only discounts on future visits"];
  return (
    <section className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] border border-secondary/30 bg-gradient-to-br from-[color-mix(in_srgb,var(--color-secondary)_14%,var(--color-ink))] via-panel to-ink p-8 sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="eyebrow !text-secondary">
                <Gift className="h-4 w-4" aria-hidden="true" /> Detail Club
              </span>
              <h2 className="h-display mt-4 text-3xl text-white sm:text-4xl">Join the club. Unlock member deals.</h2>
              <ul className="mt-6 grid gap-3">
                {perks.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-white/90">
                    <Check className="h-5 w-5 text-secondary" aria-hidden="true" /> {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink href={whatsappLink("Hi! I'd like to join the Home of Detail Detail Club.")} className="!bg-secondary !text-ink !shadow-none">
                  Become a member
                </ButtonLink>
              </div>
            </div>
            <div className="rounded-3xl border border-secondary/30 bg-ink/60 p-8 text-center backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">Featured deal</p>
              <p className="mt-4 font-display text-5xl font-bold text-white">₱4,444</p>
              <p className="mt-1 text-mist">Full detail + 1-year coating</p>
              <p className="mt-5 inline-block rounded-full bg-secondary/15 px-4 py-1.5 text-sm font-semibold text-secondary">+ 500 reward points</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-white/10">
      <div className="grid-glow absolute inset-0" />
      <div className="container-x section relative text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-400" /> Slots fill up fast
        </span>
        <h2 className="h-display mx-auto mt-6 max-w-3xl text-4xl text-white sm:text-5xl lg:text-6xl">
          Give your car the <span className="text-gradient">protection</span> it deserves
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-mist sm:text-lg">
          Not just a shine — a complete protection system. Message us today and secure your slot.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={bookHref()} className="!px-8 !py-4 text-base">
            Book your slot today <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href={whatsappLink("Hi Home of Detail! I'd like to ask about your services.")} variant="outline" className="!px-8 !py-4 text-base">
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat with us
          </ButtonLink>
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-mist">
          <span className="h-2 w-2 rounded-full bg-emerald-400" /> Live chat support — we reply in under 5 minutes
        </p>
      </div>
    </section>
  );
}
