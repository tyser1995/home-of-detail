import { ArrowRight, ShieldCheck } from "lucide-react";
import { CarArt } from "@/components/CarArt";
import {
  FaqSection,
  FinalCta,
  LocationSection,
  MembershipSection,
  ProcessSection,
  ReasonsSection,
  ResultsSection,
  ServicesSection,
  StatsBar,
  TestimonialsSection,
  WhyNotBasicWash,
} from "@/components/sections";
import { ButtonLink, Stars } from "@/components/ui";
import { bookHref, isEnabled } from "@/lib/menu";

function Hero() {
  return (
    <section className="grid-glow relative -mt-16 overflow-hidden lg:-mt-20">
      <div className="container-x grid min-h-[100svh] items-center gap-10 pb-16 pt-28 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pt-32">
        <div className="animate-fade-up">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/90 sm:text-sm">
            <Stars className="h-3.5 w-3.5" /> 5.0 rating · 1,000+ cars detailed
          </span>
          <h1 className="h-display mt-6 text-[2.6rem] leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Not just a car wash. <span className="text-gradient">A complete protection system.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
            Home of Detail is a premium detailing &amp; coating studio. We go beyond temporary shine — delivering deep gloss, long-term
            protection and paint that&apos;s effortless to maintain.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={bookHref()} className="!px-8 !py-4 text-base">
              Book your slot <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            {isEnabled("services") && (
              <ButtonLink href="/services" variant="outline" className="!px-8 !py-4 text-base">
                Explore services
              </ButtonLink>
            )}
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-mist">Trusted by owners of</p>
          <p className="mt-2 text-sm font-medium text-white/70">Toyota · Ford · Mitsubishi · Nissan · Honda · BMW · Mercedes-Benz</p>
        </div>

        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="absolute inset-x-10 top-1/2 h-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />
          <CarArt id="hero" paint="#0f3a5f" background={false} className="relative w-full lg:scale-[1.2] lg:origin-left drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]" />
          <div className="glass absolute bottom-0 left-2 flex items-center gap-3 rounded-2xl px-4 py-3 sm:left-6 lg:-bottom-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-white">Up to 5-year protection</span>
              <span className="block text-xs text-mist">9H ceramic &amp; self-healing PPF</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <WhyNotBasicWash />
      <ServicesSection />
      <ResultsSection />
      <ReasonsSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <LocationSection />
      <MembershipSection />
      <FinalCta />
    </>
  );
}
