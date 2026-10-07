"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { serviceCategories, services, servicesIn, whatsappLink, type ServiceCategory } from "@/lib/site";
import { buttonClass } from "./ui";

const field =
  "w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-base text-white placeholder:text-white/30 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";
const labelCls = "mb-2 block text-sm font-medium text-white/90";

export function BookingForm({ defaultService = "" }: { defaultService?: string }) {
  const [sent, setSent] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const serviceName = services.find((s) => s.slug === data.get("service"))?.name ?? "Not sure yet";
    const lines = [
      "Hi Home of Detail! I'd like to book a slot.",
      "",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Vehicle: ${data.get("vehicle")}`,
      `Service: ${serviceName}`,
      `Preferred date: ${data.get("date") || "Flexible"}`,
    ];
    const notes = String(data.get("notes") ?? "").trim();
    if (notes) lines.push(`Notes: ${notes}`);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-accent/40 bg-accent/10 p-8 text-center sm:p-12">
        <CheckCircle2 className="h-14 w-14 text-accent" aria-hidden="true" />
        <h2 className="mt-5 font-display text-2xl font-semibold text-white">Almost done!</h2>
        <p className="mt-3 max-w-md text-mist">
          We opened WhatsApp with your booking details. Just hit send and our team will confirm your slot in minutes.
        </p>
        <button type="button" onClick={() => setSent(false)} className={buttonClass("outline", "mt-8")}>
          Edit booking details
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-3xl border border-white/10 bg-panel p-6 sm:grid-cols-2 sm:p-8">
      <div>
        <label htmlFor="name" className={labelCls}>
          Full name
        </label>
        <input id="name" name="name" required autoComplete="name" placeholder="Juan Dela Cruz" className={field} />
      </div>
      <div>
        <label htmlFor="phone" className={labelCls}>
          Mobile number
        </label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="09XX XXX XXXX" className={field} />
      </div>
      <div>
        <label htmlFor="vehicle" className={labelCls}>
          Vehicle (year, make, model)
        </label>
        <input id="vehicle" name="vehicle" required placeholder="2024 Toyota Fortuner" className={field} />
      </div>
      <div>
        <label htmlFor="service" className={labelCls}>
          Service
        </label>
        <select id="service" name="service" defaultValue={defaultService} className={field}>
          <option value="">Not sure yet — recommend one</option>
          {(Object.keys(serviceCategories) as ServiceCategory[]).map((c) => (
            <optgroup key={c} label={serviceCategories[c].name}>
              {servicesIn(c).map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name} (from {s.startingAt})
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="date" className={labelCls}>
          Preferred date
        </label>
        <input id="date" name="date" type="date" min={today} className={`${field} [color-scheme:dark]`} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="notes" className={labelCls}>
          Notes <span className="text-mist">(optional)</span>
        </label>
        <textarea id="notes" name="notes" rows={4} placeholder="Paint condition, concerns, questions…" className={field} />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className={buttonClass("primary", "w-full !py-4 text-base")}>
          <Send className="h-4 w-4" aria-hidden="true" /> Send booking request
        </button>
        <p className="mt-3 text-center text-xs text-mist">Your request opens in WhatsApp so you can confirm directly with our team.</p>
      </div>
    </form>
  );
}
