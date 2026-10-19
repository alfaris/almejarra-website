# AlMejarra (المجرة) website

A fully static redesign of [almejarra.com](https://almejarra.com), the first coworking space in Sharqia (Zagazig, Egypt). It needs no backend and can be uploaded to any static host.

- **Arabic first (RTL)** with an English toggle (remembered per visitor, or forced with `?lang=en`).
- **3D galaxy hero**: React Three Fiber spiral galaxy plus the logo ring. It pauses off-screen, respects `prefers-reduced-motion` and falls back to a gradient when WebGL is unavailable.
- **Motion** reveals and scroll effects, **Lenis** smooth scrolling, and **shadcn/ui-style** components on Radix (Accordion, Sheet, Button, Badge, form fields).
- **Two pages, no server**: the home page and a Team page (current team + honors board) at `#/team`. Hash routing keeps it working from `file://` and on any static host without rewrite rules.
- **No-backend booking**: the contact form builds a pre-filled WhatsApp message (`wa.me`) or a `mailto:` email. Nothing is stored.

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · Radix UI (shadcn pattern) · three.js / @react-three/fiber · motion · lenis · lucide-react · self-hosted fonts (IBM Plex Sans Arabic, Reem Kufi, Space Grotesk, Inter; Arabic and Latin subsets only, declared in `src/fonts.css`).

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run lint
npm run build        # dist/index.html with all JS, CSS and fonts inlined
npm run build:split  # dist/ with separate, lazily loaded chunks (smaller first load)
npm run preview      # serve dist/ locally
```

## Deploy

Run `npm run build` and upload the **contents of `dist/`** (`index.html`, `favicon.jpg` and `images/`) to any static host (cPanel/FTP, Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3…). Paths are relative, so it also works from a sub-folder.

The default build inlines everything into `index.html`, so you can also open it by double-clicking it, with no server. Browsers refuse to load separate script files from `file://`, which would leave the page blank. For production hosting you can use `npm run build:split` instead: the 3D scene then loads as a separate chunk after the text, but that build only works when served over http(s).

## Editing content

All copy lives in plain TypeScript files, so there is no CMS to maintain:

| File | What it holds |
| --- | --- |
| `src/content/site.ts` | Phones, WhatsApp number, email, map coordinates, social links, image paths |
| `src/content/ar.ts` | All Arabic text: spaces, packages, FAQ, team, timeline… |
| `src/content/en.ts` | The same structure in English |
| `src/content/events.ts` | Upcoming events (date, title, place, link); past events hide themselves |
| `src/content/reviews.ts` | Member reviews; the section stays hidden until one is added |
| `src/content/meta.json` | Page titles and descriptions (run `npm run pages` after editing) |
| `src/content/types.ts` | The shared shape both languages must follow |
| `public/images/` | Photos and logo (WebP/PNG) |
| `public/videos/` | The home page reel (H.264 MP4, a copy of the Instagram post linked in `site.reel`) |

Package prices currently read “Contact for pricing”. Change the `price` field of each package in `ar.ts` and `en.ts` to publish real prices.

## Structure

```
src/
  components/      Icon, Reveal, SectionHeading, SocialIcon, three/Galaxy, ui/* (shadcn-style)
  content/         site facts + ar/en dictionaries
  lib/             i18n provider, hash router, smooth-scroll helper, media-query hooks, motion variants
  sections/        Navbar, Hero, Marquee, About, Spaces, Packages, Why, Story, Team (owners & founders), Network, Faq, Contact, Footer, TeamPage
```

Content, photos and team bios come from the original almejarra.com WordPress site.
