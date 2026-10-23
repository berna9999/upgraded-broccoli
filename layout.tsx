import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getBookingLink } from "@/lib/booking";
import { restaurant } from "@/lib/config";
import { fontVariables } from "@/lib/fonts";
import { getNavLinks, isHeroVisible } from "@/lib/sections";
import { buildJsonLd, buildMetadata } from "@/lib/seo";
import { resolveColors, themeStyle } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = buildMetadata(restaurant);

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: resolveColors(restaurant.theme).primary,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const { general, labels } = restaurant;
  const links = getNavLinks(restaurant);
  const booking = getBookingLink(restaurant);
  const jsonLd = JSON.stringify(buildJsonLd(restaurant)).replace(/</g, "\\u003c");

  return (
    <html lang={restaurant.meta.lang} className={fontVariables} style={themeStyle(restaurant.theme)} suppressHydrationWarning>
      <head>
        {/* Abilita le animazioni di comparsa solo se JS è attivo: senza JS i contenuti restano visibili. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[60] rounded-theme bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {labels.skipToContent}
        </a>
        <Navbar
          brand={{ name: general.name, logo: general.logo }}
          links={links}
          booking={booking}
          overHero={isHeroVisible(restaurant.hero) && restaurant.layout.order[0] === "hero"}
          labels={labels}
        />
        <main id="main">{children}</main>
        <Footer
          data={restaurant.footer}
          general={general}
          contact={restaurant.contact}
          hours={restaurant.hours}
          links={links}
          labels={labels}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </body>
    </html>
  );
}
