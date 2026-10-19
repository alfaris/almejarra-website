import { ArrowUp } from 'lucide-react'

import { BrandStripe } from '@/components/BrandStripe'
import { SocialIcon } from '@/components/SocialIcon'
import { site } from '@/content/site'
import { useI18n } from '@/lib/i18n'
import { hrefFor, onLinkClick, useRoute } from '@/lib/router'
import { scrollToId } from '@/lib/scroll'
import { Logo } from './Navbar'

const year = new Date().getFullYear()

export function Footer() {
  const { t, lang } = useI18n()
  const route = useRoute()
  const teamHref = hrefFor(lang, 'team')
  return (
    <footer className="relative overflow-hidden bg-space pt-16 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-10 border-t border-white/10 pt-12 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{t.footer.about}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-sm">
            {t.nav.links.map((l) => (
              <a
                key={l.id}
                href={route === 'home' ? `#${l.id}` : hrefFor(lang, 'home', l.id)}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId(l.id)
                }}
                className="text-white/70 transition hover:text-star"
              >
                {l.label}
              </a>
            ))}
            <a href={teamHref} onClick={onLinkClick(teamHref)} className="text-white/70 transition hover:text-star">
              {t.nav.team}
            </a>
          </nav>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <div className="flex gap-2">
              {site.socials.map((s) => (
                <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.id} className="inline-flex size-10 items-center justify-center rounded-full bg-white/5 transition hover:bg-star hover:text-space">
                  <SocialIcon id={s.id} className="size-4" />
                </a>
              ))}
            </div>
            <button type="button" onClick={() => scrollToId('top')} className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
              <ArrowUp className="size-4" />
              {t.footer.backToTop}
            </button>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-white/10 py-6 text-xs text-white/60 sm:flex-row">
          <p>
            {t.footer.rights} {year}
          </p>
          <p>{t.footer.madeWith}</p>
        </div>
      </div>
      <p
        className="pointer-events-none select-none text-center font-display text-[22vw] font-bold leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.08)]"
        aria-hidden
      >
        {t.brand.name}
      </p>
      <BrandStripe />
    </footer>
  )
}
