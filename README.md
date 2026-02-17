# HAVn Boligstyling

Nettside for HAVn Boligstyling bygget med Next.js, Formspree og Netlify.

## Tech Stack

- **Frontend:** Next.js 14 (App Router)
- **Skjema:** Formspree
- **Hosting:** Netlify

## Sider

- **Hjem** – Hero + CTA «Bestill befaring»
- **Tjenester** – Boligstyling, konsultasjon, utleiestyling
- **Prosjekter** – Før/etter-galleri (statisk innhold)
- **Om** – Historie + bilde
- **Kontakt** – Skjema (Formspree) + Instagram-lenke

## Kom i gang

### 1. Installer avhengigheter

```bash
npm install
```

### 2. Formspree-oppsett

1. Opprett konto på [formspree.io](https://formspree.io)
2. Lag et nytt skjema og kopier Form ID (f.eks. `xyzabcde`)
3. Opprett `.env.local`:

```
NEXT_PUBLIC_FORMSPREE_ID=xyzabcde
```

### 3. Logo (valgfritt)

Legg logo i `public/logo.png` og legg til i `.env.local`:

```
NEXT_PUBLIC_LOGO_URL=/logo.png
```

### 4. Instagram (valgfritt)

Legg til i `.env.local` for å vise Instagram-lenke på kontaktsiden:

```
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/din-profil
```

### 5. Kjør utviklingsserver

```bash
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000).

## Redigere innhold

Alt innhold er statisk og redigeres direkte i koden:

- **Prosjekter:** `app/prosjekter/page.tsx` – legg til/endre prosjekter i `projects`-arrayet
- **Om oss:** `app/om/page.tsx` – tekst og bilde
- **Tjenester:** `app/tjenester/page.tsx`

For prosjektbilder: legg bilder i `public/prosjekter/` og bruk f.eks. `/prosjekter/før-1.jpg` som bilde-URL.

## Deploy til Netlify

1. Koble repo til Netlify
2. Legg til miljøvariabler: `NEXT_PUBLIC_FORMSPREE_ID`, evt. `NEXT_PUBLIC_LOGO_URL` og `NEXT_PUBLIC_INSTAGRAM_URL`
3. Build command: `npm run build`
