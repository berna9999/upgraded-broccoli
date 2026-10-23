import type { ReactNode } from "react";
import { type ResolvedLink, whatsappUrl } from "@/lib/booking";
import { isContactVisible } from "@/lib/sections";
import type {
  BookingConfig,
  ContactConfig,
  ContactSectionConfig,
  HoursConfig,
  Labels,
} from "@/types/restaurant";
import { BookingForm } from "./BookingForm";
import { ButtonLink } from "./ui/ButtonLink";
import { HoursList } from "./ui/HoursList";
import { Icon, type IconName } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

interface ContactProps {
  data: ContactSectionConfig;
  contact: ContactConfig;
  hours: HoursConfig;
  booking: BookingConfig;
  bookingLink: ResolvedLink | null;
  labels: Labels;
}

function InfoRow({ icon, label, children }: { icon: IconName; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon name={icon} />
      </span>
      <div>
        <dt className="text-xs uppercase tracking-[0.16em] text-muted">{label}</dt>
        <dd className="mt-1 text-lg">{children}</dd>
      </div>
    </div>
  );
}

export function Contact({ data, contact, hours, booking, bookingLink, labels }: ContactProps) {
  if (!isContactVisible(data)) return null;
  const headingId = `${data.id}-title`;
  const { address } = contact;
  const showForm = booking.enabled && booking.provider === "form";
  const link = "underline-offset-4 hover:text-primary hover:underline";

  return (
    <section id={data.id} aria-labelledby={headingId} className="section-padding">
      <div className="container">
        <SectionHeading id={headingId} eyebrow={data.eyebrow} title={data.title} intro={data.intro} />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="space-y-12">
            <dl className="space-y-6">
              <InfoRow icon="pin" label={labels.address}>
                <address className="not-italic">
                  {address.street}
                  <br />
                  {address.postalCode} {address.city} ({address.province})
                </address>
                <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className={`mt-1 inline-block text-sm text-primary ${link}`}>
                  {labels.openInMaps}
                </a>
              </InfoRow>
              <InfoRow icon="phone" label={labels.phone}>
                <a href={`tel:${contact.phone}`} className={link}>
                  {contact.phoneDisplay}
                </a>
              </InfoRow>
              {contact.whatsapp && (
                <InfoRow icon="chat" label={labels.whatsapp}>
                  <a href={whatsappUrl(contact.whatsapp)} target="_blank" rel="noopener noreferrer" className={link}>
                    {contact.whatsappDisplay ?? contact.whatsapp}
                  </a>
                </InfoRow>
              )}
              <InfoRow icon="mail" label={labels.email}>
                <a href={`mailto:${contact.email}`} className={`break-all ${link}`}>
                  {contact.email}
                </a>
              </InfoRow>
            </dl>

            <div>
              <h3 className="flex items-center gap-3 font-heading text-2xl font-medium">
                <Icon name="clock" className="h-5 w-5 text-accent" />
                {labels.hoursTitle}
              </h3>
              <div className="mt-4">
                <HoursList days={hours.days} closedLabel={labels.closed} todayLabel={labels.today} />
              </div>
              {hours.note && <p className="mt-4 text-sm text-muted">{hours.note}</p>}
            </div>
          </Reveal>

          <Reveal delay={150} className="space-y-8">
            {showForm ? (
              <div
                id={booking.formAnchor ?? "prenota"}
                className="scroll-mt-28 rounded-theme border border-border bg-surface p-6 sm:p-8"
              >
                <h3 className="font-heading text-3xl font-medium">{labels.bookingForm.title}</h3>
                {labels.bookingForm.intro && <p className="mt-2 text-muted">{labels.bookingForm.intro}</p>}
                <div className="mt-6">
                  <BookingForm
                    channel={booking.formChannel ?? "whatsapp"}
                    whatsapp={contact.whatsapp}
                    email={contact.email}
                    maxGuests={booking.maxGuests ?? 10}
                    privacyHref="/privacy"
                    labels={{ ...labels.bookingForm, privacyPolicy: labels.privacyPolicy }}
                  />
                </div>
                {booking.note && <p className="mt-6 text-sm text-muted">{booking.note}</p>}
              </div>
            ) : (
              bookingLink && (
                <div className="rounded-theme bg-primary p-8 text-primary-foreground sm:p-10">
                  <h3 className="font-heading text-3xl font-medium">{bookingLink.label}</h3>
                  {booking.note && <p className="mt-3 opacity-90">{booking.note}</p>}
                  <ButtonLink
                    href={bookingLink.href}
                    external={bookingLink.external}
                    variant="inverse"
                    className="mt-6"
                  >
                    {bookingLink.label}
                    <Icon name="arrowRight" className="h-4 w-4" />
                  </ButtonLink>
                </div>
              )
            )}

            {data.showMap && contact.mapsEmbedUrl && (
              <div className="overflow-hidden rounded-theme border border-border">
                <iframe
                  src={contact.mapsEmbedUrl}
                  title={labels.mapTitle}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-80 w-full border-0 grayscale-[30%]"
                  allowFullScreen
                />
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
