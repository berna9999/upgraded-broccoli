# Restaurant Template · Next.js + Tailwind

Template one-page per ristoranti, interamente guidato dai dati: **ogni testo, immagine, colore e link
vive in `src/config/restaurant.json`**. Per un nuovo cliente si duplica il progetto, si modifica il JSON
e si fa il deploy.

## Avvio

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build di produzione
npm run typecheck  # verifica TypeScript
```

Richiede Node.js 18.18 o superiore (consigliato 20+).

## Struttura

```
src/
├─ config/
│  ├─ restaurant.json   ← TUTTI i contenuti del sito
│  └─ themes.ts         ← preset di colori (elegante, osteria, notte)
├─ types/restaurant.ts  ← schema tipizzato del JSON
├─ lib/
│  ├─ config.ts         ← accesso tipizzato al JSON
│  ├─ theme.ts          ← JSON → variabili CSS (colori, font, raggio)
│  ├─ fonts.ts          ← font disponibili (next/font, self-hosted)
│  ├─ sections.ts       ← visibilità sezioni e voci della navbar
│  ├─ booking.ts        ← provider di prenotazione → link
│  ├─ seo.ts            ← metadata, OpenGraph, JSON-LD schema.org/Restaurant
│  └─ format.ts         ← prezzi, date, segnaposto {{...}}
├─ components/
│  ├─ Navbar · Hero · About · MenuSection · Experiences · Reviews · Contact · Footer
│  ├─ MenuTabs · BookingForm · HeroSlides · LegalPage
│  └─ ui/ (CoverImage, Reveal, SectionHeading, ButtonLink, Stars, HoursList, Icon)
└─ app/
   ├─ layout.tsx        ← metadata SEO, tema, navbar, footer, JSON-LD
   ├─ page.tsx          ← home: rende le sezioni nell'ordine di layout.order
   ├─ privacy/ · cookie-policy/ · not-found.tsx
   └─ sitemap.ts · robots.ts
```

## Personalizzare un sito

| Cosa                     | Dove nel JSON                                   |
|--------------------------|-------------------------------------------------|
| Nome, payoff, logo       | `general`                                       |
| SEO e anteprime social   | `meta` (imposta sempre `siteUrl` col dominio reale) |
| Look & feel              | `theme.preset`, `theme.colors`, `theme.fonts`, `theme.radius` |
| Ordine delle sezioni     | `layout.order`                                  |
| Contatti e mappa         | `contact`                                       |
| Orari                    | `hours.days`                                    |
| Prenotazioni             | `booking`                                       |
| Testi dell'interfaccia   | `labels` (utile anche per siti in altre lingue) |
| Privacy e cookie policy  | `legal` (i segnaposto `{{companyName}}`, `{{email}}`, ecc. vengono compilati in automatico) |

### Tema

- `theme.preset`: `"elegante"` (costiero, sabbia e verde mare), `"osteria"` (terracotta e carta),
  `"notte"` (fine dining scuro).
- `theme.colors`: override puntuali in esadecimale, es. `{ "primary": "#7A1F2B" }`.
- `theme.fonts.heading`: `cormorant` | `playfair` | `fraunces`; `theme.fonts.body`: `inter` | `lato`.

I colori diventano variabili CSS su `<html>` e Tailwind le legge (`bg-primary`, `text-accent/80`, …),
quindi tutto il sito cambia aspetto senza toccare i componenti. Per aggiungere un preset basta una voce
in `src/config/themes.ts`; per un nuovo font, una riga in `src/lib/fonts.ts`.

### Sezioni opzionali

Ogni sezione ha `enabled`. Se è `false`, **o se è vuota** (es. `experiences.items: []`), non viene
renderizzata e sparisce anche dalla navbar e dal footer.

### Prenotazioni (`booking.provider`)

| Valore         | Comportamento                                                        |
|----------------|----------------------------------------------------------------------|
| `covermanager` / `thefork` / `custom` | apre `booking.url` in una nuova scheda          |
| `whatsapp`     | apre la chat con `contact.whatsapp` e `booking.whatsappMessage`      |
| `phone`        | link `tel:`                                                          |
| `email`        | link `mailto:`                                                       |
| `form`         | modulo nella sezione Contatti che invia la richiesta via WhatsApp o email (`formChannel`) |

Tutti i pulsanti con `"action": "booking"` (hero, esperienze) usano automaticamente il provider scelto.

### Menu

- `price`: un numero viene formattato nella valuta di `menu.currency`; una stringa è mostrata così com'è
  (es. `"Calice € 8 · Bottiglia € 34"`).
- `allergens`: numeri della legenda UE in `menu.allergens`.
- `tags`: chiavi definite in `menu.tags` (specialità, vegano, senza glutine…), personalizzabili.

### Immagini

Gli URL possono puntare a qualsiasi CDN HTTPS o a file in `public/` (es. `/images/sala.jpg`).
Se un'immagine manca o non si carica compare un placeholder nei colori del tema. In produzione conviene
limitare `images.remotePatterns` in `next.config.mjs` agli host realmente usati.

## Deploy su Vercel

1. Pubblica il repository su GitHub.
2. Su vercel.com → *Add New Project* → importa il repository (framework rilevato automaticamente).
3. Aggiorna `meta.siteUrl` con il dominio definitivo (serve per canonical, sitemap e OpenGraph).

## Note legali

Il sito usa solo cookie tecnici, ma la mappa Google Maps incorporata può impostare cookie di terze
parti: se il cliente lo richiede, disattiva la mappa (`contactSection.showMap: false`) oppure aggiungi
un banner di consenso prima di caricarla. I testi legali di esempio vanno verificati dal consulente del
cliente.
