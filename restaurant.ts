// Schema del file src/config/restaurant.json.
// Ogni sezione opzionale ha `enabled`: se false (o se non ha contenuti) non viene renderizzata.

export type SectionKey = "hero" | "about" | "menu" | "experiences" | "reviews" | "contact";

export type ThemePresetName = "elegante" | "osteria" | "notte";
export type HeadingFont = "cormorant" | "playfair" | "fraunces";
export type BodyFont = "inter" | "lato";

export interface ThemeColors {
  background: string;
  surface: string;
  foreground: string;
  muted: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  accent: string;
  border: string;
  overlay: string;
}

export interface ThemeConfig {
  preset: ThemePresetName;
  /** Override puntuali sui colori del preset (valori esadecimali). */
  colors?: Partial<ThemeColors>;
  fonts: { heading: HeadingFont; body: BodyFont };
  radius: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface MetaConfig {
  siteUrl: string;
  lang: string;
  locale: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  favicon?: string;
}

export interface GeneralConfig {
  name: string;
  payoff: string;
  cuisine: string[];
  priceRange: string;
  logo: {
    src?: string;
    /** Variante chiara usata sopra la hero. */
    srcOnDark?: string;
    alt: string;
    width: number;
    height: number;
  };
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  province: string;
  region: string;
  country: string;
}

export interface ContactConfig {
  phone: string;
  phoneDisplay: string;
  email: string;
  /** Numero WhatsApp in formato internazionale, solo cifre o con +. */
  whatsapp?: string;
  whatsappDisplay?: string;
  address: Address;
  mapsUrl: string;
  mapsEmbedUrl?: string;
  coordinates?: { lat: number; lng: number };
}

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface OpeningDay {
  label: string;
  dayOfWeek: DayOfWeek;
  closed?: boolean;
  slots: { opens: string; closes: string }[];
}

export interface HoursConfig {
  note?: string;
  days: OpeningDay[];
}

export type BookingProvider =
  | "covermanager"
  | "thefork"
  | "custom"
  | "whatsapp"
  | "phone"
  | "email"
  | "form";

export interface BookingConfig {
  enabled: boolean;
  provider: BookingProvider;
  /** URL del widget esterno (CoverManager, TheFork, ...). */
  url?: string;
  label: string;
  whatsappMessage?: string;
  /** Solo per provider "form": dove inviare la richiesta. */
  formChannel?: "whatsapp" | "email";
  formAnchor?: string;
  maxGuests?: number;
  note?: string;
}

export interface Cta {
  label: string;
  /** "booking" usa il sistema di prenotazione configurato. */
  action?: "booking" | "link";
  href?: string;
  variant?: "primary" | "outline";
}

export interface HeroConfig {
  enabled: boolean;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  images: ImageAsset[];
  overlayOpacity: number;
  slideInterval?: number;
  highlights?: string[];
  ctas: Cta[];
}

interface NavigableSection {
  enabled: boolean;
  id: string;
  navLabel: string;
  eyebrow?: string;
  title: string;
  intro?: string;
}

export interface AboutConfig extends NavigableSection {
  story: string[];
  image?: ImageAsset;
  philosophy?: { title: string; items: { title: string; text: string }[] };
  chef?: {
    name: string;
    role: string;
    bio: string[];
    quote?: string;
    image?: ImageAsset;
  };
  gallery: ImageAsset[];
}

export interface MenuItem {
  name: string;
  description?: string;
  /** Numero = prezzo formattato in valuta; stringa = testo libero (es. "Calice 7 · Bottiglia 32"). */
  price?: number | string;
  allergens?: number[];
  tags?: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export interface MenuConfig extends NavigableSection {
  currency: string;
  note?: string;
  pdfUrl?: string;
  tags: Record<string, { label: string; symbol: string }>;
  allergens: { id: number; name: string }[];
  categories: MenuCategory[];
}

export interface ExperienceItem {
  title: string;
  badge?: string;
  date?: string;
  description: string;
  price?: number | string;
  image?: ImageAsset;
  cta?: Cta;
}

export interface ExperiencesConfig extends NavigableSection {
  items: ExperienceItem[];
}

export interface ReviewSource {
  name: string;
  rating: number;
  count: number;
  url?: string;
}

export interface ReviewItem {
  author: string;
  rating: number;
  text: string;
  source: string;
  date?: string;
}

export interface ReviewsConfig extends NavigableSection {
  sources: ReviewSource[];
  items: ReviewItem[];
}

export interface ContactSectionConfig extends NavigableSection {
  showMap: boolean;
}

export type SocialPlatform = "instagram" | "facebook" | "tiktok" | "tripadvisor" | "google" | "website";

export interface FooterConfig {
  tagline?: string;
  social: { platform: SocialPlatform; url: string; label: string }[];
  legal: {
    companyName: string;
    vatNumber: string;
    registeredOffice?: string;
    extra?: string;
  };
  credits?: { label: string; name: string; url: string };
}

export interface LegalDocument {
  title: string;
  updatedAt: string;
  intro?: string;
  sections: { heading: string; body: string[] }[];
}

export interface Labels {
  skipToContent: string;
  openMenu: string;
  closeMenu: string;
  mainNavigation: string;
  scrollDown: string;
  menuTabs: string;
  allergens: string;
  allergensLegend: string;
  tagsLegend: string;
  downloadMenu: string;
  hoursTitle: string;
  closed: string;
  today: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  openInMaps: string;
  mapTitle: string;
  ratingOutOf: string;
  reviewsCount: string;
  readOnSource: string;
  followUs: string;
  contactsTitle: string;
  vat: string;
  allRightsReserved: string;
  privacyPolicy: string;
  cookiePolicy: string;
  lastUpdated: string;
  backHome: string;
  notFoundTitle: string;
  notFoundText: string;
  bookingForm: {
    title: string;
    intro?: string;
    name: string;
    phone: string;
    date: string;
    time: string;
    guests: string;
    notes: string;
    submit: string;
    privacyNote: string;
    messageIntro: string;
  };
}

export interface RestaurantConfig {
  meta: MetaConfig;
  general: GeneralConfig;
  theme: ThemeConfig;
  layout: { order: SectionKey[] };
  contact: ContactConfig;
  hours: HoursConfig;
  booking: BookingConfig;
  hero: HeroConfig;
  about: AboutConfig;
  menu: MenuConfig;
  experiences: ExperiencesConfig;
  reviews: ReviewsConfig;
  contactSection: ContactSectionConfig;
  footer: FooterConfig;
  legal: { privacy: LegalDocument; cookie: LegalDocument };
  labels: Labels;
}
