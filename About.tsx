import { cn } from "@/lib/cn";
import { isAboutVisible } from "@/lib/sections";
import type { AboutConfig } from "@/types/restaurant";
import { CoverImage } from "./ui/CoverImage";
import { Reveal } from "./ui/Reveal";

export function About({ data }: { data: AboutConfig }) {
  if (!isAboutVisible(data)) return null;
  const { chef, philosophy, gallery } = data;
  const headingId = `${data.id}-title`;

  return (
    <section id={data.id} aria-labelledby={headingId} className="section-padding overflow-hidden">
      <div className="container">
        {/* Storia */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            {data.eyebrow && <p className="eyebrow">{data.eyebrow}</p>}
            <h2 id={headingId} className="mt-3 font-heading text-4xl font-medium leading-tight text-balance sm:text-5xl">
              {data.title}
            </h2>
            <span aria-hidden="true" className="mt-5 block h-px w-16 bg-accent" />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              {data.story.map((paragraph, i) => (
                <p key={i} className="text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
          {data.image && (
            <Reveal delay={150} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-theme">
                <CoverImage src={data.image.src} alt={data.image.alt} sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
              <div
                aria-hidden="true"
                className="absolute -bottom-6 -left-6 -z-10 hidden h-2/3 w-2/3 rounded-theme border border-accent/60 sm:block"
              />
            </Reveal>
          )}
        </div>

        {/* Filosofia */}
        {philosophy && philosophy.items.length > 0 && (
          <div className="mt-24 sm:mt-32">
            <Reveal>
              <h3 className="text-center font-heading text-3xl font-medium sm:text-4xl">{philosophy.title}</h3>
            </Reveal>
            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {philosophy.items.map((item, i) => (
                <li key={item.title}>
                  <Reveal delay={i * 120} className="h-full rounded-theme border border-border bg-surface p-8">
                    <span className="font-heading text-4xl text-accent" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="mt-4 font-heading text-2xl font-medium">{item.title}</h4>
                    <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Chef */}
        {chef && (
          <div className="mt-24 grid items-center gap-12 sm:mt-32 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-theme">
                <CoverImage src={chef.image?.src} alt={chef.image?.alt ?? chef.name} sizes="(min-width: 1024px) 40vw, 100vw" />
              </div>
            </Reveal>
            <Reveal delay={150} className="lg:col-span-7">
              <p className="eyebrow">{chef.role}</p>
              <h3 className="mt-3 font-heading text-4xl font-medium sm:text-5xl">{chef.name}</h3>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
                {chef.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              {chef.quote && (
                <blockquote className="mt-10 border-l-2 border-accent pl-6">
                  <p className="font-heading text-2xl italic leading-snug sm:text-3xl">“{chef.quote}”</p>
                  <footer className="mt-3 text-sm uppercase tracking-[0.2em] text-muted">— {chef.name}</footer>
                </blockquote>
              )}
            </Reveal>
          </div>
        )}

        {/* Galleria */}
        {gallery.length > 0 && (
          <ul className="mt-24 grid grid-cols-2 gap-3 sm:mt-32 sm:gap-4 lg:grid-cols-4">
            {gallery.map((image, i) => (
              <li key={`${image.src}-${i}`} className={cn(i % 2 === 1 && "lg:translate-y-10")}>
                <Reveal delay={i * 100}>
                  <div className="group relative aspect-[3/4] overflow-hidden rounded-theme">
                    <CoverImage
                      src={image.src}
                      alt={image.alt}
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
