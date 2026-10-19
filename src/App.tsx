import { useEffect } from 'react'
import Lenis from 'lenis'

import { useReducedMotion } from '@/lib/useMediaQuery'
import { setLenis } from '@/lib/scroll'
import { About } from '@/sections/About'
import { Contact } from '@/sections/Contact'
import { Faq } from '@/sections/Faq'
import { Footer } from '@/sections/Footer'
import { Hero } from '@/sections/Hero'
import { Marquee } from '@/sections/Marquee'
import { Navbar } from '@/sections/Navbar'
import { Network } from '@/sections/Network'
import { Packages } from '@/sections/Packages'
import { Spaces } from '@/sections/Spaces'
import { Story } from '@/sections/Story'
import { Team } from '@/sections/Team'
import { Why } from '@/sections/Why'

export default function App() {
  const reduced = useReducedMotion()

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
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-star focus:px-4 focus:py-2 focus:text-space">
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Spaces />
        <Packages />
        <Why />
        <Story />
        <Team />
        <Network />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
