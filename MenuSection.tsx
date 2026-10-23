import { isMenuVisible } from "@/lib/sections";
import type { Labels, MenuConfig } from "@/types/restaurant";
import { MenuTabs } from "./MenuTabs";
import { Icon } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

interface MenuSectionProps {
  data: MenuConfig;
  locale: string;
  labels: Pick<Labels, "menuTabs" | "allergens" | "allergensLegend" | "tagsLegend" | "downloadMenu">;
}

export function MenuSection({ data, locale, labels }: MenuSectionProps) {
  if (!isMenuVisible(data)) return null;
  const headingId = `${data.id}-title`;
  const tagEntries = Object.entries(data.tags);

  return (
    <section id={data.id} aria-labelledby={headingId} className="section-padding bg-surface">
      <div className="container">
        <SectionHeading id={headingId} eyebrow={data.eyebrow} title={data.title} intro={data.intro} />

        <Reveal className="mt-14">
          <MenuTabs
            categories={data.categories}
            tags={data.tags}
            allergens={data.allergens}
            currency={data.currency}
            locale={locale}
            labels={{ tablist: labels.menuTabs, allergens: labels.allergens }}
          />
        </Reveal>

        <div className="mx-auto mt-14 max-w-3xl space-y-6 text-sm text-muted">
          {data.pdfUrl && (
            <p className="text-center">
              <a
                href={data.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:underline"
              >
                <Icon name="file" className="h-4 w-4" />
                {labels.downloadMenu}
              </a>
            </p>
          )}

          {tagEntries.length > 0 && (
            <div>
              <h3 className="sr-only">{labels.tagsLegend}</h3>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {tagEntries.map(([key, tag]) => (
                  <li key={key} className="flex items-center gap-1.5">
                    <span aria-hidden="true" className="font-semibold text-secondary">
                      {tag.symbol}
                    </span>
                    {tag.label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.allergens.length > 0 && (
            <details className="group rounded-theme border border-border bg-background px-5 py-4">
              <summary className="cursor-pointer list-none font-medium text-foreground marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {labels.allergensLegend}
                  <span aria-hidden="true" className="transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <ol className="mt-4 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {data.allergens.map((a) => (
                  <li key={a.id}>
                    <span className="inline-block w-6 font-semibold text-foreground">{a.id}</span>
                    {a.name}
                  </li>
                ))}
              </ol>
            </details>
          )}

          {data.note && <p className="text-center leading-relaxed">{data.note}</p>}
        </div>
      </div>
    </section>
  );
}
