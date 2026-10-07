import Link from "next/link";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { bookHref } from "@/lib/menu";

// Sticky action bar shown on phones and tablets only.
export function MobileBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/90 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-[auto_auto_1fr] gap-2">
        <a href={site.phoneHref} aria-label="Call us" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white">
          <Phone className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href={whatsappLink("Hi Home of Detail! I'd like to ask about your services.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </a>
        <Link href={bookHref()} className="flex h-12 items-center justify-center gap-2 rounded-full bg-accent font-semibold text-on-accent">
          <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Book Now
        </Link>
      </div>
    </div>
  );
}
