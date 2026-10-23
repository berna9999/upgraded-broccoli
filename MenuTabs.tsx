"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import type { MenuConfig } from "@/types/restaurant";

interface MenuTabsProps {
  categories: MenuConfig["categories"];
  tags: MenuConfig["tags"];
  allergens: MenuConfig["allergens"];
  currency: string;
  locale: string;
  labels: { tablist: string; allergens: string };
}

/** Tab accessibili (pattern WAI-ARIA "tabs"): frecce, Home e End spostano il focus. */
export function MenuTabs({ categories, tags, allergens, currency, locale, labels }: MenuTabsProps) {
  const visible = categories.filter((c) => c.items.length > 0);
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const allergenName = new Map(allergens.map((a) => [a.id, a.name]));

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = visible.length - 1;
    const next =
      event.key === "ArrowRight" ? (index + 1) % visible.length
      : event.key === "ArrowLeft" ? (index - 1 + visible.length) % visible.length
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : -1;
    if (next < 0) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={labels.tablist}
        className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
      >
        {visible.map((category, i) => (
          <button
            key={category.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${category.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${category.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "min-h-11 shrink-0 snap-start rounded-full border px-5 text-sm uppercase tracking-[0.14em] transition-colors",
              i === active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-foreground hover:border-primary/60",
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      {visible.map((category, i) => (
        // Tutti i pannelli restano nell'HTML (utile per la SEO), solo quello attivo è visibile.
        <div
          key={category.id}
          role="tabpanel"
          id={`panel-${category.id}`}
          aria-labelledby={`tab-${category.id}`}
          hidden={i !== active}
          tabIndex={0}
          className="mx-auto mt-12 max-w-3xl focus-visible:outline-none"
        >
          {category.description && <p className="mb-6 text-center italic text-muted">{category.description}</p>}
          <ul className="divide-y divide-border">
            {category.items.map((item) => {
              const price = formatPrice(item.price, locale, currency);
              return (
                <li key={item.name} className="py-6">
                  <div className="flex items-baseline gap-4">
                    <h3 className="font-heading text-xl font-medium sm:text-2xl">{item.name}</h3>
                    <span aria-hidden="true" className="h-px flex-1 translate-y-[-0.3em] border-b border-dotted border-muted/40" />
                    {price && (
                      <span
                        className={cn(
                          "max-w-[45%] text-right font-heading text-lg text-primary sm:text-xl",
                          typeof item.price === "number" && "whitespace-nowrap",
                        )}
                      >
                        {price}
                      </span>
                    )}
                  </div>
                  {item.description && <p className="mt-2 leading-relaxed text-muted">{item.description}</p>}
                  {((item.tags?.length ?? 0) > 0 || (item.allergens?.length ?? 0) > 0) && (
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                      {item.tags?.map((tag) =>
                        tags[tag] ? (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-full bg-secondary/15 px-2.5 py-1 font-medium text-foreground"
                          >
                            <span aria-hidden="true" className="text-secondary">
                              {tags[tag].symbol}
                            </span>
                            {tags[tag].label}
                          </span>
                        ) : null,
                      )}
                      {item.allergens && item.allergens.length > 0 && (
                        <span className="text-muted">
                          {labels.allergens}:{" "}
                          {item.allergens.map((id, idx) => (
                            <span key={id}>
                              <abbr title={allergenName.get(id)} className="cursor-help no-underline">
                                {id}
                              </abbr>
                              {idx < item.allergens!.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </span>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
