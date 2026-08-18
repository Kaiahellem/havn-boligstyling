# HAVN Boligstyling

Nettside for HAVN Boligstyling bygget med Next.js, Sanity CMS og Vercel.

## Tech Stack

- **Frontend:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **CMS:** Sanity (hostet Studio + `@sanity/client`)
- **Bilder:** Sanity CDN via `@sanity/image-url`
- **Kontaktskjema:** Formspree
- **Hosting:** Vercel

## Sider

| Side | Rute | Beskrivelse |
|------|------|-------------|
| Hjem | `/` | Hero + CTA «Bestill befaring» |
| Tjenester | `/tjenester` | Boligstyling, konsultasjon, utleiestyling |
| Prosjekter | `/prosjekter` | Bildegalleri med modal, data fra Sanity |
| Om | `/om` | Historie + bilde, data fra Sanity |
| Kontakt | `/kontakt` | Skjema (Formspree) + Instagram-lenke |

## Sanity-skjemaer

Definert i `studio/schemaTypes/`:

- `project.js` – prosjekter med bilder, by og tjenestetype
- `tjeneste.js` – tjenestebeskrivelser
- `omOss.js` – innhold til Om-siden
- `siteSettings.js` – globale innstillinger

## Kom i gang

### 1. Installer avhengigheter

```bash
npm install
```

### 2. Miljøvariabler

Opprett `.env.local` i prosjektroten:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=ditt-prosjekt-id
NEXT_PUBLIC_SANITY_DATASET=production

# Kontaktskjema
NEXT_PUBLIC_FORMSPREE_ID=xyzabcde

# Valgfritt
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/din-profil
```

### 3. Kjør utviklingsserver

```bash
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000).

### 4. Kjør Sanity Studio

```bash
cd studio
npx sanity dev
```

Åpne [http://localhost:3333](http://localhost:3333).

## Redigere innhold

Alt dynamisk innhold administreres via Sanity Studio:

- **Prosjekter** – legg til/endre prosjekter med bilder, by og tjenestetype
- **Tjenester** – rediger tjenestebeskrivelser
- **Om oss** – rediger tekst og bilde
- **Innstillinger** – globale siteinnstillinger

## Deploy

Prosjektet deployes automatisk via Vercel ved push til `main`.

Legg til miljøvariablene under **Settings → Environment Variables** i Vercel-dashbordet.

```bash
npm run build   # Bygg lokalt for å verifisere
```
