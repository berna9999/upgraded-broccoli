import { resolveCta, type ResolvedCta, type ResolvedLink } from "@/lib/booking";
import { isHeroVisible } from "@/lib/sections";
import type { HeroConfig, Labels } from "@/types/restaurant";
import { HeroSlides } from "./HeroSlides";
import { ButtonLink } from "./ui/ButtonLink";
import { Icon } from "./ui/Icon";

interface HeroProps {
  data: HeroConfig;
  booking: ResolvedLink | null;
  nextSectionHref?: string;
  labels: Pick<Labels, "scrollDown">;
}

export function Hero({ data, booking, nextSectionHref, labels }: HeroProps) {
  if (!isHeroVisible(data)) return null;

  const ctas = data.ctas.map((cta) => resolveCta(cta, booking)).filter((c): c is ResolvedCta => !!c);

  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center overflow-hidden text-white">
      <HeroSlides images={data.images} interval={data.slideInterval} />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-overlay/60 via-overlay to-overlay/80"
        style={{ opacity: data.overlayOpacity }}
      />

      <div className="container relative py-32 text-center">
        {data.eyebrow && (
          <p className="animate-fade-up text-xs uppercase tracking-[0.35em] text-white/85 sm:text-sm">{data.eyebrow}</p>
        )}
        <h1
          id="hero-title"
          className="mx-auto mt-6 max-w-4xl animate-fade-up font-heading text-5xl font-medium leading-[1.05] text-balance [animation-delay:150ms] sm:text-6xl lg:text-7xl"
        >
          {data.title}
        </h1>
        {data.subtitle && (
          <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-white/90 text-pretty [animation-delay:300ms] sm:text-xl">
            {data.subtitle}
          </p>
        )}
        {ctas.length > 0 && (
          <div className="mt-10 flex animate-fade-up flex-col items-center justify-center gap-4 [animation-delay:450ms] sm:flex-row">
            {ctas.map((cta) => (
              <ButtonLink
                key={cta.label}
                href={cta.href}
                external={cta.external}
                variant={cta.variant === "primary" ? "primary" : "light"}
              >
                {cta.label}
              </ButtonLink>
            ))}
          </div>
        )}
        {data.highlights && data.highlights.length > 0 && (
          <ul className="mt-12 flex animate-fade-up flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-white/80 [animation-delay:600ms]">
            {data.highlights.map((item, i) => (
              <li key={item} className="flex items-center gap-6">
                {i > 0 && <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-accent sm:block" />}
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {nextSectionHref && (
        <a
          href={nextSectionHref}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-white/80 transition-colors hover:text-white"
        >
          {labels.scrollDown}
          <Icon name="arrowDown" className="h-5 w-5 motion-safe:animate-bounce" />
        </a>
      )}
    </section>
  );
}
