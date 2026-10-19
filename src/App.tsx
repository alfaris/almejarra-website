import { useEffect } from 'react'
import Lenis from 'lenis'

import { useReducedMotion } from '@/lib/useMediaQuery'
import { useI18n } from '@/lib/i18n'
import { useRoute } from '@/lib/router'
import { scrollToId, scrollToTop, setLenis } from '@/lib/scroll'
import { About } from '@/sections/About'
import { Contact } from '@/sections/Contact'
import { Faq } from '@/sections/Faq'
import { Footer } from '@/sections/Footer'
import { Gallery } from '@/sections/Gallery'
import { Hero } from '@/sections/Hero'
import { Marquee } from '@/sections/Marquee'
import { Navbar } from '@/sections/Navbar'
import { Network } from '@/sections/Network'
import { Packages } from '@/sections/Packages'
import { Spaces } from '@/sections/Spaces'
import { Story } from '@/sections/Story'
import { Team } from '@/sections/Team'
import { TeamPage } from '@/sections/TeamPage'
import { Why } from '@/sections/Why'

export default function App() {
  const reduced = useReducedMotion()
  const route = useRoute()
  const { t } = useI18n()

  useEffect(() => {
    document.title = route === 'team' ? `${t.teamPage.title} | ${t.brand.name}` : t.meta.title
  }, [route, t])

  // On a route change start at the top, or at the home section named in the hash.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (route === 'home' && id && id !== 'top' && document.getElementById(id)) {
      const timer = setTimeout(() => scrollToId(id), 60)
      return () => clearTimeout(timer)
    }
    scrollToTop()
  }, [route])

  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.1, autoRaf: true })
    setLenis(lenis)
    return () => {
      lenis.destroy()
      setLenis(null)
    }
  }, [reduced])

  return (
    <>
      <a
        href="#main"
        onClick={(e) => {
          // Keep the hash (and so the route) intact; just move focus.
          e.preventDefault()
          document.getElementById('main')?.focus()
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-star focus:px-4 focus:py-2 focus:text-space">
        Skip to content
      </a>
      <Navbar />
      {route === 'team' ? (
        <main id="main" tabIndex={-1} className="outline-none">
          <TeamPage />
        </main>
      ) : (
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <Marquee />
          <About />
          <Spaces />
          <Packages />
          <Why />
          <Gallery />
          <Story />
          <Team />
          <Network />
          <Faq />
          <Contact />
        </main>
      )}
      <Footer />
    </>
  )
}
