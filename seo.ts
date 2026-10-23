import type { Metadata } from "next";
import { isMenuVisible } from "@/lib/sections";
import type { RestaurantConfig } from "@/types/restaurant";

export function buildMetadata(r: RestaurantConfig): Metadata {
  const { meta, general } = r;
  const images = meta.ogImage ? [{ url: meta.ogImage, width: 1200, height: 630, alt: general.name }] : undefined;

  return {
    metadataBase: new URL(meta.siteUrl),
    title: { default: meta.title, template: `%s · ${general.name}` },
    description: meta.description,
    keywords: meta.keywords,
    applicationName: general.name,
    openGraph: {
      type: "website",
      locale: meta.locale,
      siteName: general.name,
      title: meta.title,
      description: meta.description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: meta.ogImage ? [meta.ogImage] : undefined,
    },
    icons: meta.favicon ? { icon: meta.favicon } : undefined,
    robots: { index: true, follow: true },
  };
}

export const legalVars = (r: RestaurantConfig): Record<string, string> => {
  const { address } = r.contact;
  return {
    restaurantName: r.general.name,
    companyName: r.footer.legal.companyName,
    vatNumber: r.footer.legal.vatNumber,
    address:
      r.footer.legal.registeredOffice ??
      `${address.street}, ${address.postalCode} ${address.city} (${address.province})`,
    email: r.contact.email,
    phone: r.contact.phoneDisplay,
    siteUrl: r.meta.siteUrl,
  };
};

/** Dati strutturati schema.org/Restaurant per i risultati locali di Google. */
export function buildJsonLd(r: RestaurantConfig) {
  const { meta, general, contact, hours } = r;
  const siteUrl = meta.siteUrl.replace(/\/$/, "");

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: general.name,
    description: meta.description,
    url: siteUrl,
    image: meta.ogImage ? [meta.ogImage] : undefined,
    telephone: contact.phone,
    email: contact.email,
    servesCuisine: general.cuisine,
    priceRange: general.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      postalCode: contact.address.postalCode,
      addressRegion: contact.address.region,
      addressCountry: contact.address.country,
    },
    geo: contact.coordinates
      ? { "@type": "GeoCoordinates", latitude: contact.coordinates.lat, longitude: contact.coordinates.lng }
      : undefined,
    hasMap: contact.mapsUrl,
    openingHoursSpecification: hours.days
      .filter((day) => !day.closed)
      .flatMap((day) =>
        day.slots.map((slot) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: `https://schema.org/${day.dayOfWeek}`,
          opens: slot.opens,
          closes: slot.closes,
        })),
      ),
    acceptsReservations: r.booking.enabled,
    hasMenu: isMenuVisible(r.menu) ? `${siteUrl}/#${r.menu.id}` : undefined,
    sameAs: r.footer.social.map((s) => s.url),
  };
}
