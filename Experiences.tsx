import { resolveCta, type ResolvedLink } from "@/lib/booking";
import { formatPrice } from "@/lib/format";
import { isExperiencesVisible } from "@/lib/sections";
import type { ExperiencesConfig } from "@/types/restaurant";
import { ButtonLink } from "./ui/ButtonLink";
import { CoverImage } from "./ui/CoverImage";
import { Icon } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

interface ExperiencesProps {
  data: ExperiencesConfig;
  booking: ResolvedLink | null;
  locale: string;
  currency: string;
}

export function Experiences({ data, booking, locale, currency }: ExperiencesProps) {
  if (!isExperiencesVisible(data)) return null;
  const headingId = `${data.id}-title`;

  return (
    <section id={data.id} aria-labelledby={headingId} className="section-padding">
      <div className="container">
        <SectionHeading id={headingId} eyebrow={data.eyebrow} title={data.title} intro={data.intro} />

        <ul className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, i) => {
            const cta = item.cta ? resolveCta(item.cta, booking) : null;
            const price = formatPrice(item.price, locale, currency);
            return (
              <li key={item.title}>
                <Reveal delay={i * 120} className="h-full">
                  <article className="group flex h-full flex-col overflow-hidden rounded-theme border border-border bg-surface">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <CoverImage
                        src={item.image?.src}
                        alt={item.image?.alt ?? item.title}
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="transition-transform duration-700 group-hover:scale-105"
                      />
                      {item.badge && (
                        <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-foreground">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      {item.date && (
                        <p className="flex items-center gap-2 text-sm text-muted">
                          <Icon name="calendar" className="h-4 w-4 text-accent" />
                          {item.date}
                        </p>
                      )}
                      <h3 className="mt-3 font-heading text-2xl font-medium sm:text-3xl">{item.title}</h3>
                      <p className="mt-3 flex-1 leading-relaxed text-muted">{item.description}</p>
                      {(price || cta) && (
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                          {price && <span className="font-heading text-2xl text-primary">{price}</span>}
                          {cta && (
                            <ButtonLink href={cta.href} external={cta.external} variant="outline" className="px-5 text-xs">
                              {cta.label}
                            </ButtonLink>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
