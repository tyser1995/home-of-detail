import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Armchair, Award, Coffee, Droplets, Eye, Film, Hexagon, Lightbulb, ShieldCheck, Sparkles, SprayCan, Star, Sun } from "lucide-react";

type Variant = "primary" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "glow-accent bg-accent text-on-accent hover:-translate-y-0.5 hover:brightness-110",
  outline: "border border-white/20 text-white hover:border-accent hover:text-accent",
  ghost: "text-white hover:text-accent",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${variants[variant]} ${extra}`;
}

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: { href: string; variant?: Variant; className?: string; children: ReactNode } & Omit<
  ComponentProps<"a">,
  "href"
>) {
  const cls = buttonClass(variant, className);
  if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: "color-mix(in srgb, var(--color-accent) 55%, var(--color-white))" }} />
            <stop offset="1" style={{ stopColor: "var(--color-accent)" }} />
          </linearGradient>
        </defs>
        <path d="M20 3 36 17v19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V17Z" fill="none" stroke="url(#logo-g)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M11 28c3-6 15-6 18 0" fill="none" stroke="url(#logo-g)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M20 13l1.6 3.4 3.4 1.6-3.4 1.6L20 23l-1.6-3.4L15 18l3.4-1.6Z" style={{ fill: "var(--color-white)" }} />
      </svg>
      <span className="font-display leading-none">
        <span className="block text-[1.05rem] font-bold tracking-tight text-white">Home of Detail</span>
        <span className="block text-[0.6rem] font-medium uppercase tracking-[0.3em] text-mist">Auto Care Studio</span>
      </span>
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignCls}`}>
      {eyebrow && (
        <span className="eyebrow">
          <span className="h-px w-6 bg-accent" />
          {eyebrow}
        </span>
      )}
      <h2 className="h-display text-3xl text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {intro && <p className="text-base leading-relaxed text-mist sm:text-lg">{intro}</p>}
    </div>
  );
}

export function Stars({ count = 5, className = "h-4 w-4" }: { count?: number; className?: string }) {
  return (
    <span className="inline-flex gap-0.5 text-secondary" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className={`${className} fill-current`} aria-hidden="true" />
      ))}
    </span>
  );
}

const icons = {
  shield: ShieldCheck,
  film: Film,
  sparkles: Sparkles,
  droplets: Droplets,
  award: Award,
  lightbulb: Lightbulb,
  coffee: Coffee,
  eye: Eye,
  hexagon: Hexagon,
  sun: Sun,
  spray: SprayCan,
  armchair: Armchair,
};

export function Icon({ name, className = "h-6 w-6" }: { name: keyof typeof icons; className?: string }) {
  const Cmp = icons[name];
  return <Cmp className={className} aria-hidden="true" />;
}
