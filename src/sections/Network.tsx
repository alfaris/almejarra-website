import { motion } from 'motion/react'
import { ExternalLink, Sparkle } from 'lucide-react'

import { staggerChild, staggerParent } from '@/lib/motion'
import { SectionHeading } from '@/components/SectionHeading'
import { useI18n } from '@/lib/i18n'

// Fixed, well-scattered star field for the constellation backdrop (deterministic hash, no Math.random).
const hash = (n: number) => {
  const v = Math.sin(n * 12.9898) * 43758.5453
  return v - Math.floor(v)
}
const stars = Array.from({ length: 30 }, (_, i) => ({
  x: Math.round((4 + hash(i + 1) * 92) * 10) / 10,
  y: Math.round((4 + hash(i + 101) * 92) * 10) / 10,
}))

// Join each star to its nearest neighbour to sketch constellations.
const links = stars.map((s, i) => {
  let best = -1
  let bestD = Infinity
  stars.forEach((o, j) => {
    const d = (o.x - s.x) ** 2 + (o.y - s.y) ** 2
    if (j !== i && d < bestD) {
      bestD = d
      best = j
    }
  })
  return [i, best] as const
})

export function Network() {
  const { t } = useI18n()
  return (
    <section className="relative overflow-hidden bg-space-2 py-24 text-white md:py-32">
      {/* Percentage coordinates without a viewBox: the field stretches to the section but dots stay round. */}
      <svg className="pointer-events-none absolute inset-0 size-full opacity-30" aria-hidden>
        {links.map(([a, b], i) => (
          <line key={i} x1={`${stars[a].x}%`} y1={`${stars[a].y}%`} x2={`${stars[b].x}%`} y2={`${stars[b].y}%`} stroke="white" strokeWidth="1" />
        ))}
        {stars.map((s, i) => (
          <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r="2.5" fill="white" />
        ))}
      </svg>
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow={t.network.eyebrow} title={t.network.title} subtitle={t.network.subtitle} dark />
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {t.network.groups.map((g) => (
            <div key={g.title}>
              <h3 className="mb-5 flex items-center gap-2 font-display text-lg text-star">
                <Sparkle className="size-4 fill-current" aria-hidden />
                {g.title}
              </h3>
              <motion.ul
                className="grid gap-3 sm:grid-cols-2"
                variants={staggerParent}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-10% 0px' }}
              >
                {g.items.map((s) => (
                  <motion.li key={s.name} variants={staggerChild}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur transition hover:border-star/50 hover:bg-white/[0.07]"
                    >
                      <span>
                        <span className="block font-display text-lg font-medium">{s.name}</span>
                        <span className="block text-sm text-white/55">{s.city}</span>
                      </span>
                      <ExternalLink className="size-4 text-white/40 transition group-hover:text-star" aria-hidden />
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
