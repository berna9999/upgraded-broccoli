import { isReviewsVisible } from "@/lib/sections";
import type { Labels, ReviewsConfig } from "@/types/restaurant";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { Stars } from "./ui/Stars";

interface ReviewsProps {
  data: ReviewsConfig;
  locale: string;
  labels: Pick<Labels, "ratingOutOf" | "reviewsCount" | "readOnSource">;
}

export function Reviews({ data, locale, labels }: ReviewsProps) {
  if (!isReviewsVisible(data)) return null;
  const headingId = `${data.id}-title`;
  const rating = (value: number) => value.toLocaleString(locale, { maximumFractionDigits: 1 });
  const ratingLabel = (value: number) => `${rating(value)} ${labels.ratingOutOf}`;

  return (
    <section id={data.id} aria-labelledby={headingId} className="section-padding bg-primary text-primary-foreground">
      <div className="container">
        <SectionHeading id={headingId} eyebrow={data.eyebrow} title={data.title} intro={data.intro} inverted />

        {data.sources.length > 0 && (
          <Reveal className="mt-12">
            <ul className="flex flex-wrap justify-center gap-4">
              {data.sources.map((source) => {
                const content = (
                  <>
                    <span className="font-heading text-4xl">{rating(source.rating)}</span>
                    <span className="flex flex-col items-start gap-1">
                      <Stars rating={source.rating} label={ratingLabel(source.rating)} />
                      <span className="text-xs uppercase tracking-[0.14em] opacity-80">
                        {source.name} · {source.count.toLocaleString(locale)} {labels.reviewsCount}
                      </span>
                    </span>
                  </>
                );
                const classes =
                  "flex items-center gap-4 rounded-theme border border-primary-foreground/20 px-6 py-4 transition-colors";
                return (
                  <li key={source.name}>
                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${labels.readOnSource} ${source.name}: ${ratingLabel(source.rating)}`}
                        className={`${classes} hover:bg-primary-foreground/10`}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className={classes}>{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        )}

        {data.items.length > 0 && (
          <ul className="-mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
            {data.items.map((review, i) => (
              <li key={`${review.author}-${i}`} className="w-[85%] shrink-0 snap-center sm:w-[60%] md:w-auto">
                <Reveal delay={i * 100} className="h-full">
                  <figure className="flex h-full flex-col rounded-theme bg-primary-foreground/[0.06] p-7 ring-1 ring-primary-foreground/15">
                    <Stars rating={review.rating} label={ratingLabel(review.rating)} />
                    <blockquote className="mt-5 flex-1 font-heading text-xl leading-snug">“{review.text}”</blockquote>
                    <figcaption className="mt-6 text-sm">
                      <span className="font-semibold">{review.author}</span>
                      <span className="block opacity-75">
                        {review.source}
                        {review.date ? ` · ${review.date}` : ""}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
