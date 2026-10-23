import type {
  AboutConfig,
  ContactSectionConfig,
  ExperiencesConfig,
  HeroConfig,
  MenuConfig,
  RestaurantConfig,
  ReviewsConfig,
  SectionKey,
} from "@/types/restaurant";

// Una sezione è visibile solo se abilitata E con contenuti: così un JSON incompleto non rompe il layout.
const isEnabled = (section?: { enabled?: boolean }) => !!section && section.enabled !== false;

export const isHeroVisible = (s?: HeroConfig) => isEnabled(s) && !!s?.title;

export const isAboutVisible = (s?: AboutConfig) =>
  isEnabled(s) && !!s && (s.story.length > 0 || !!s.chef || s.gallery.length > 0);

export const isMenuVisible = (s?: MenuConfig) =>
  isEnabled(s) && !!s && s.categories.some((c) => c.items.length > 0);

export const isExperiencesVisible = (s?: ExperiencesConfig) =>
  isEnabled(s) && !!s && s.items.length > 0;

export const isReviewsVisible = (s?: ReviewsConfig) =>
  isEnabled(s) && !!s && (s.items.length > 0 || s.sources.length > 0);

export const isContactVisible = (s?: ContactSectionConfig) => isEnabled(s);

type NavigableKey = Exclude<SectionKey, "hero">;

const navigable: Record<NavigableKey, (r: RestaurantConfig) => { id: string; navLabel: string } | null> = {
  about: (r) => (isAboutVisible(r.about) ? r.about : null),
  menu: (r) => (isMenuVisible(r.menu) ? r.menu : null),
  experiences: (r) => (isExperiencesVisible(r.experiences) ? r.experiences : null),
  reviews: (r) => (isReviewsVisible(r.reviews) ? r.reviews : null),
  contact: (r) => (isContactVisible(r.contactSection) ? r.contactSection : null),
};

export interface NavLink {
  href: string;
  label: string;
}

/** Voci di menu generate dalle sezioni visibili, nell'ordine definito in layout.order. */
export function getNavLinks(r: RestaurantConfig): NavLink[] {
  return r.layout.order
    .filter((key): key is NavigableKey => key !== "hero")
    .map((key) => navigable[key]?.(r))
    .filter((s): s is { id: string; navLabel: string } => !!s)
    .map((s) => ({ href: `/#${s.id}`, label: s.navLabel }));
}
