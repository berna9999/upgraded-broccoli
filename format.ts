export function formatPrice(price: number | string | undefined, locale: string, currency: string) {
  if (price === undefined || price === "") return "";
  if (typeof price === "string") return price;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatDate(iso: string, locale: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(date);
}

/** Sostituisce i segnaposto {{chiave}} nei testi del JSON (es. nelle pagine legali). */
export function fillTemplate(text: string, vars: Record<string, string>) {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key: string) => vars[key] ?? match);
}

export const toLocaleTag = (locale: string) => locale.replace("_", "-");
