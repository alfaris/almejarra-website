# AlMejarra (المجرة) website

A fully static redesign of [almejarra.com](https://almejarra.com), the first coworking space in Sharqia (Zagazig, Egypt). It needs no backend and can be uploaded to any static host.

- **Arabic first (RTL)** with an English toggle (remembered per visitor, or forced with `?lang=en`).
- **3D galaxy hero**: React Three Fiber spiral galaxy plus the logo ring. It pauses off-screen, respects `prefers-reduced-motion` and falls back to a gradient when WebGL is unavailable.
- **Motion** reveals and scroll effects, **Lenis** smooth scrolling, and **shadcn/ui-style** components on Radix (Accordion, Sheet, Button, Badge, form fields).
- **No-backend booking**: the contact form builds a pre-filled WhatsApp message (`wa.me`) or a `mailto:` email. Nothing is stored.

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · Radix UI (shadcn pattern) · three.js / @react-three/fiber · motion · lenis · lucide-react · self-hosted fonts (IBM Plex Sans Arabic, Reem Kufi, Space Grotesk, Inter).

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run lint
npm run build     # outputs dist/
npm run preview   # serve dist/ locally
```

## Deploy

Run `npm run build` and upload the **contents of `dist/`** to any static host (cPanel/FTP, Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3…). The build uses relative paths (`base: './'`), so it also works from a sub-folder.

## Editing content

All copy lives in plain TypeScript files, so there is no CMS to maintain:

| File | What it holds |
| --- | --- |
| `src/content/site.ts` | Phones, WhatsApp number, email, map coordinates, social links, image paths |
| `src/content/ar.ts` | All Arabic text: spaces, packages, FAQ, team, timeline… |
| `src/content/en.ts` | The same structure in English |
| `src/content/types.ts` | The shared shape both languages must follow |
| `public/images/` | Photos and logo (WebP/PNG) |

Package prices currently read “Contact for pricing”. Change the `price` field of each package in `ar.ts` and `en.ts` to publish real prices.

## Structure

```
src/
  components/      Icon, Reveal, SectionHeading, SocialIcon, three/Galaxy, ui/* (shadcn-style)
  content/         site facts + ar/en dictionaries
  lib/             i18n provider, smooth-scroll helper, media-query hooks, motion variants
  sections/        Navbar, Hero, Marquee, About, Spaces, Packages, Why, Story, Team, Network, Faq, Contact, Footer
```

Content, photos and team bios come from the original almejarra.com WordPress site.
