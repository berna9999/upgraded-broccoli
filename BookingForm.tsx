"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { whatsappUrl } from "@/lib/booking";
import type { Labels } from "@/types/restaurant";

interface BookingFormProps {
  channel: "whatsapp" | "email";
  whatsapp?: string;
  email: string;
  maxGuests: number;
  privacyHref: string;
  labels: Labels["bookingForm"] & { privacyPolicy: string };
}

/**
 * Modulo di richiesta prenotazione senza backend: compone il messaggio e apre WhatsApp o il client email.
 * Per salvare le richieste su un server basta sostituire `onSubmit` con una chiamata a una API route.
 */
export function BookingForm({ channel, whatsapp, email, maxGuests, privacyHref, labels }: BookingFormProps) {
  const uid = useId();
  const [minDate, setMinDate] = useState<string>();
  useEffect(() => setMinDate(new Date().toISOString().slice(0, 10)), []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) ?? "").trim();
    const lines = [
      labels.messageIntro,
      `${labels.name}: ${value("name")}`,
      `${labels.phone}: ${value("phone")}`,
      `${labels.date}: ${value("date")}`,
      `${labels.time}: ${value("time")}`,
      `${labels.guests}: ${value("guests")}`,
      value("notes") && `${labels.notes}: ${value("notes")}`,
    ].filter(Boolean);
    const message = lines.join("\n");

    if (channel === "whatsapp" && whatsapp) {
      window.open(whatsappUrl(whatsapp, message), "_blank", "noopener,noreferrer");
    } else {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(labels.title)}&body=${encodeURIComponent(message)}`;
    }
  };

  const field =
    "mt-1.5 block w-full rounded-theme border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25";
  const label = "text-sm font-medium";
  const id = (name: string) => `${uid}-${name}`;

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor={id("name")} className={label}>
          {labels.name}
        </label>
        <input id={id("name")} name="name" required autoComplete="name" className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={id("phone")} className={label}>
          {labels.phone}
        </label>
        <input id={id("phone")} name="phone" type="tel" required autoComplete="tel" className={field} />
      </div>
      <div>
        <label htmlFor={id("date")} className={label}>
          {labels.date}
        </label>
        <input id={id("date")} name="date" type="date" required min={minDate} className={field} />
      </div>
      <div>
        <label htmlFor={id("time")} className={label}>
          {labels.time}
        </label>
        <input id={id("time")} name="time" type="time" required step={900} className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={id("guests")} className={label}>
          {labels.guests}
        </label>
        <select id={id("guests")} name="guests" required defaultValue="2" className={field}>
          {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={id("notes")} className={label}>
          {labels.notes}
        </label>
        <textarea id={id("notes")} name="notes" rows={3} className={field} />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-theme bg-primary px-7 text-sm font-medium uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {labels.submit}
        </button>
        <p className="mt-3 text-xs text-muted">
          {labels.privacyNote}{" "}
          <a href={privacyHref} className="underline underline-offset-2">
            {labels.privacyPolicy}
          </a>
        </p>
      </div>
    </form>
  );
}
