import { isContactVisible } from "@/lib/sections";
import type { Cta, RestaurantConfig } from "@/types/restaurant";

export interface ResolvedLink {
  href: string;
  label: string;
  external: boolean;
}

export interface ResolvedCta extends ResolvedLink {
  variant: "primary" | "outline";
}

export const whatsappUrl = (number: string, message?: string) =>
  `https://wa.me/${number.replace(/\D/g, "")}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

/** Traduce il provider di prenotazione configurato in un link concreto. */
export function getBookingLink(r: RestaurantConfig): ResolvedLink | null {
  const { booking, contact } = r;
  if (!booking?.enabled) return null;
  const label = booking.label;
  const phoneLink = { href: `tel:${contact.phone}`, label, external: false };

  switch (booking.provider) {
    case "whatsapp":
      return contact.whatsapp
        ? { href: whatsappUrl(contact.whatsapp, booking.whatsappMessage), label, external: true }
        : phoneLink;
    case "phone":
      return phoneLink;
    case "email":
      return { href: `mailto:${contact.email}?subject=${encodeURIComponent(label)}`, label, external: false };
    case "form":
      // Il modulo vive nella sezione contatti: se è disattivata ripieghiamo sul telefono.
      return isContactVisible(r.contactSection)
        ? { href: `/#${booking.formAnchor ?? "prenota"}`, label, external: false }
        : phoneLink;
    default:
      return booking.url ? { href: booking.url, label, external: true } : phoneLink;
  }
}

export function resolveCta(cta: Cta, booking: ResolvedLink | null): ResolvedCta | null {
  const variant = cta.variant ?? "primary";
  if (cta.action === "booking" || (!cta.action && !cta.href)) {
    return booking ? { ...booking, label: cta.label, variant } : null;
  }
  if (!cta.href) return null;
  return { href: cta.href, label: cta.label, external: /^https?:\/\//.test(cta.href), variant };
}
