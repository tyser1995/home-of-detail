import Link from "next/link";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { bookItem, navItems } from "@/lib/menu";
import { site } from "@/lib/site";
import { Logo } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-2 pb-24 lg:pb-0">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
            Premium car detailing, ceramic coating and paint protection film — protection that lasts, not just a shine.
          </p>
          <div className="mt-6 flex gap-4 text-sm font-medium">
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent">
              Facebook
            </a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent">
              Instagram
            </a>
            <a href={site.messenger} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent">
              Messenger
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-white">Services</h2>
          <ul className="mt-5 grid gap-3 text-sm">
            {(navItems.find((m) => m.key === "services")?.children ?? []).map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-mist hover:text-accent">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-white">Explore</h2>
          <ul className="mt-5 grid gap-3 text-sm">
            {[...navItems, ...(bookItem ? [bookItem] : [])].map((l) => (
              <li key={l.key}>
                <Link href={l.href} className="text-mist hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-white">Contact</h2>
          <ul className="mt-5 grid gap-4 text-sm text-mist">
            <li className="flex gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {site.address}
            </li>
            <li className="flex gap-3">
              <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={site.phoneHref} className="hover:text-accent">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="break-all hover:text-accent">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-mist sm:flex-row">
          <p>
            Copyright © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <a href="#main" className="flex items-center gap-1.5 hover:text-accent">
            Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
