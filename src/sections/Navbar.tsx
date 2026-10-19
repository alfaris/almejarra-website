import { useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Languages, Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { site } from '@/content/site'
import { useI18n } from '@/lib/i18n'
import { TEAM_HASH, goToTeam, useRoute } from '@/lib/router'
import { scrollToId } from '@/lib/scroll'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  const { t } = useI18n()
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      {/* The mark keeps its original orientation in both languages. */}
      <img src={site.images.logoMark} alt="" width={292} height={189} className="h-7 w-auto" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight">{t.brand.name}</span>
        <span className="text-[0.65rem] opacity-60">{t.brand.tagline}</span>
      </span>
    </span>
  )
}

export function Navbar() {
  const { t, toggleLang, lang } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const route = useRoute()
  const { scrollY, scrollYProgress } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))

  useEffect(() => {
    const ids = t.nav.links.map((l) => l.id)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [t, route])
  const current = route === 'team' ? 'team' : active

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToId(id)
  }

  // Close the menu first so Lenis can scroll the unlocked page.
  const goFromMenu = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(false)
    setTimeout(() => (id === 'team' ? goToTeam() : scrollToId(id)), 320)
  }

  const linkClass = (id: string) =>
    cn('relative rounded-full px-3.5 py-2 text-sm text-white/75 transition hover:text-white', current === id && 'text-white')
  const pill = (id: string) =>
    current === id && (
      <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/10" transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }} />
    )

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 text-white transition-all duration-500',
        scrolled ? 'bg-space/75 shadow-lg shadow-black/10 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-[72px] md:px-8">
        <a href="#top" onClick={go('top')} aria-label={t.brand.name}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {t.nav.links.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={go(l.id)} className={linkClass(l.id)}>
              {pill(l.id)}
              {l.label}
            </a>
          ))}
          <a href={TEAM_HASH} className={linkClass('team')} aria-current={route === 'team' ? 'page' : undefined}>
            {pill('team')}
            {t.nav.team}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={toggleLang} className="text-white" lang={lang === 'ar' ? 'en' : 'ar'}>
            <Languages />
            {t.nav.switchLang}
          </Button>
          <Button variant="star" size="sm" className="hidden sm:inline-flex" asChild>
            <a href="#contact" onClick={go('contact')}>
              {t.nav.book}
            </a>
          </Button>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white lg:hidden" aria-label={t.nav.menu}>
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent closeLabel={t.nav.close}>
              <SheetTitle>
                <Logo />
              </SheetTitle>
              <SheetDescription>{t.nav.menu}</SheetDescription>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
                {t.nav.links.map((l, i) => (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={goFromMenu(l.id)}
                    className="flex items-baseline gap-3 rounded-xl px-3 py-3 font-display text-2xl transition hover:bg-white/5"
                  >
                    <span className="text-xs text-star tabular-nums">0{i + 1}</span>
                    {l.label}
                  </a>
                ))}
                <a
                  href={TEAM_HASH}
                  onClick={goFromMenu('team')}
                  className="flex items-baseline gap-3 rounded-xl px-3 py-3 font-display text-2xl transition hover:bg-white/5"
                >
                  <span className="text-xs text-star tabular-nums">0{t.nav.links.length + 1}</span>
                  {t.nav.team}
                </a>
              </nav>
              <Button variant="star" size="lg" className="mt-auto" asChild>
                <a href="#contact" onClick={goFromMenu('contact')}>
                  {t.nav.book}
                </a>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <motion.div
        className="rim-gradient absolute inset-x-0 bottom-0 h-0.5 origin-left rtl:origin-right"
        style={{ scaleX: scrollYProgress }}
        aria-hidden
      />
    </header>
  )
}
