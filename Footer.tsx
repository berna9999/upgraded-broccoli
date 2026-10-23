import type { NavLink } from "@/lib/sections";
import type { ContactConfig, FooterConfig, GeneralConfig, HoursConfig, Labels } from "@/types/restaurant";
import { HoursList } from "./ui/HoursList";
import { Icon } from "./ui/Icon";

interface FooterProps {
  data: FooterConfig;
  general: Pick<GeneralConfig, "name" | "payoff">;
  contact: ContactConfig;
  hours: HoursConfig;
  links: NavLink[];
  labels: Labels;
}

export function Footer({ data, general, contact, hours, links, labels }: FooterProps) {
  const year = new Date().getFullYear();
  const { address } = contact;
  const link = "opacity-80 transition-opacity hover:opacity-100 hover:underline underline-offset-4";

  // Il colore "overlay" è scuro in ogni preset: il footer usa quindi testo chiaro fisso.
  return (
    <footer className="bg-overlay text-white">
      <div className="container grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="lg:col-span-1">
          <p className="font-heading text-3xl font-semibold">{general.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] opacity-70">{general.payoff}</p>
          {data.tagline && <p className="mt-5 text-sm leading-relaxed opacity-80">{data.tagline}</p>}
          {data.social.length > 0 && (
            <div className="mt-6">
              <p className="sr-only">{labels.followUs}</p>
              <ul className="flex gap-3">
                {data.social.map((social) => (
                  <li key={social.url}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white hover:text-overlay"
                    >
                      <Icon name={social.platform === "google" || social.platform === "website" ? "globe" : social.platform} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {links.length > 0 && (
          <nav aria-label={labels.mainNavigation}>
            <ul className="space-y-3 text-sm">
              {links.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div>
          <p className="text-xs uppercase tracking-[0.2em] opacity-70">{labels.contactsTitle}</p>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p>
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className={link}>
                {address.street}, {address.postalCode} {address.city} ({address.province})
              </a>
            </p>
            <p>
              <a href={`tel:${contact.phone}`} className={link}>
                {contact.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${contact.email}`} className={`break-all ${link}`}>
                {contact.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] opacity-70">{labels.hoursTitle}</p>
          <div className="mt-3 opacity-90">
            <HoursList days={hours.days} closedLabel={labels.closed} todayLabel={labels.today} compact />
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container flex flex-col gap-3 py-6 text-xs opacity-75 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {data.legal.companyName} · {labels.vat} {data.legal.vatNumber}
            {data.legal.extra ? ` · ${data.legal.extra}` : ""} · {labels.allRightsReserved}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <a href="/privacy" className="hover:underline">
                {labels.privacyPolicy}
              </a>
            </li>
            <li>
              <a href="/cookie-policy" className="hover:underline">
                {labels.cookiePolicy}
              </a>
            </li>
            {data.credits && (
              <li>
                {data.credits.label}{" "}
                <a href={data.credits.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {data.credits.name}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}
