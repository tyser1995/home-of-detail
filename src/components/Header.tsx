"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { bookItem, navItems } from "@/lib/menu";
import { site } from "@/lib/site";
import { ButtonLink, Logo } from "./ui";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Items that redirect elsewhere (e.g. Ownership -> Book Now) never show as the current page.
  const isActive = ({ href, redirectTo }: { href: string; redirectTo?: string }) =>
    !redirectTo && (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          scrolled || open ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex xl:gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.key} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={isActive(item) ? "page" : undefined}
                    className={`flex items-center gap-1 rounded-full px-2.5 py-2 text-sm font-medium xl:px-4 transition-colors hover:text-accent ${
                      isActive(item) ? "text-accent" : "text-white/80"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" aria-hidden="true" />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="max-h-[75vh] overflow-y-auto rounded-2xl border border-white/10 bg-panel/95 p-2 shadow-2xl backdrop-blur-xl">
                      {item.children.map((child, i) => (
                        <Fragment key={child.href}>
                          {child.group && child.group !== item.children?.[i - 1]?.group && (
                            <p className="mt-2 border-t border-white/10 px-4 pb-1 pt-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">
                              {child.group}
                            </p>
                          )}
                          <Link
                            href={child.href}
                            className={`block rounded-xl px-4 transition-colors hover:bg-white/5 ${child.hint ? "py-3" : "py-2"} ${
                              pathname === child.href ? "bg-white/5" : ""
                            }`}
                          >
                            <span className="block text-sm font-semibold text-white">{child.label}</span>
                            {child.hint && <span className="block text-xs text-mist">{child.hint}</span>}
                          </Link>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={isActive(item) ? "page" : undefined}
                  className={`rounded-full px-2.5 py-2 text-sm font-medium xl:px-4 transition-colors hover:text-accent ${
                    isActive(item) ? "text-accent" : "text-white/80"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 text-sm font-medium text-white/80 hover:text-accent xl:flex"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.phone}
            </a>
            {bookItem && (
              <ButtonLink href={bookItem.href} className="max-sm:!hidden !px-5 !py-2.5">
                {bookItem.label}
              </ButtonLink>
            )}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer: kept outside <header> because its backdrop-filter would trap `fixed` positioning. */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto bg-ink transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-x flex flex-col gap-1 py-6">
          {navItems.map((item) => (
            <div key={item.key}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3.5 font-display text-2xl font-semibold ${
                  isActive(item) ? "text-accent" : "text-white"
                }`}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="mb-2 ml-4 flex flex-col border-l border-white/10 pl-4">
                  {item.children.map((child, i) => (
                    <Fragment key={child.href}>
                      {child.group && child.group !== item.children?.[i - 1]?.group && (
                        <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">{child.group}</p>
                      )}
                      <Link
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className={`py-2 text-base hover:text-accent ${pathname === child.href ? "text-accent" : "text-mist"}`}
                      >
                        {child.label}
                      </Link>
                    </Fragment>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
            {bookItem && (
              <ButtonLink href={bookItem.href} onClick={() => setOpen(false)} className="w-full !py-4 text-base">
                {bookItem.label}
              </ButtonLink>
            )}
            <ButtonLink href={site.phoneHref} variant="outline" className="w-full !py-4 text-base">
              <Phone className="h-4 w-4" aria-hidden="true" /> Call {site.phone}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </>
  );
}
