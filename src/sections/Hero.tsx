import { lazy, Suspense, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { ArrowDown, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'
import { scrollToId } from '@/lib/scroll'
import { useMediaQuery, useReducedMotion } from '@/lib/useMediaQuery'

const GalaxyScene = lazy(() => import('@/components/three/Galaxy'))

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export function Hero() {
  const { t, lang, dir } = useI18n()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { margin: '0px 0px 0px 0px' })
  const reduced = useReducedMotion()
  const compact = useMediaQuery('(max-width: 768px)')
  const [webgl] = useState(hasWebGL)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const words = (line: string) => line.split(' ')

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-svh items-center overflow-hidden bg-space text-white">
      {/* Fallback nebula, also visible while the 3D scene loads. */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 55%, color-mix(in oklch, var(--nebula) 55%, transparent), transparent 70%), radial-gradient(40% 35% at 75% 30%, color-mix(in oklch, var(--rim-blue) 25%, transparent), transparent 70%), var(--space)',
        }}
        aria-hidden
      />
      {webgl && (
        <div className="absolute inset-0 -z-10">
          <Suspense fallback={null}>
            <GalaxyScene active={inView} reduced={reduced} compact={compact} offsetX={compact ? 0 : dir === 'rtl' ? -2.8 : 2.8} />
          </Suspense>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-space/40 via-transparent to-space" aria-hidden />
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay" aria-hidden />

      <motion.div style={{ y: textY, opacity: textOpacity }} className="mx-auto w-full max-w-7xl px-4 pb-24 pt-32 md:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Badge variant="glass" className="mb-8">
            <MapPin />
            {t.hero.eyebrow}
          </Badge>
        </motion.div>

        <h1 key={lang} className="font-display text-[clamp(2.75rem,8.5vw,7.5rem)] font-semibold leading-[1.02] tracking-tight">
          {t.hero.title.map((line, li) => (
            <span key={li} className="block overflow-hidden pb-[0.08em]">
              {words(line).map((w, wi) => (
                <motion.span
                  key={wi}
                  className={li === 1 ? 'text-gradient inline-block' : 'inline-block'}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + li * 0.15 + wi * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                  {wi < words(line).length - 1 && ' '}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
        >
          <Button variant="star" size="lg" onClick={() => scrollToId('contact')}>
            {t.hero.primary}
          </Button>
          <Button variant="glass" size="lg" onClick={() => scrollToId('spaces')}>
            {t.hero.secondary}
          </Button>
          <span className="ms-2 font-display text-lg text-white/60">{t.hero.hashtag}</span>
        </motion.div>
      </motion.div>

      <button
        type="button"
        onClick={() => scrollToId('about')}
        className="absolute bottom-6 start-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60 transition hover:text-white rtl:translate-x-1/2"
      >
        {t.hero.scroll}
        <motion.span animate={reduced ? undefined : { y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown className="size-4" />
        </motion.span>
      </button>
    </section>
  )
}
