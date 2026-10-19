import { useRef, type CSSProperties } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowUpRight, Users } from 'lucide-react'

import { Icon } from '@/components/Icon'
import { SectionHeading } from '@/components/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { SpaceItem } from '@/content/types'
import { useI18n } from '@/lib/i18n'
import { scrollToId } from '@/lib/scroll'
import { useMediaQuery } from '@/lib/useMediaQuery'

/** CSS planet for spaces without a photo. */
function PlanetArt() {
  return (
    <div className="relative flex h-full min-h-72 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_20%,var(--space-2),var(--space))]">
      <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 70% 60%, white, transparent), radial-gradient(1.5px 1.5px at 40% 80%, white, transparent), radial-gradient(1px 1px at 85% 20%, white, transparent), radial-gradient(1px 1px at 10% 75%, white, transparent)' }} aria-hidden />
      <div className="relative size-48 md:size-64">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--nebula-light),var(--nebula)_45%,var(--space)_100%)] shadow-[0_0_80px_-10px_var(--nebula)]" />
        <div className="absolute start-1/2 top-1/2 h-14 w-[150%] -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-[50%] border-[6px] border-star/70 rtl:translate-x-1/2" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }} />
        <div className="animate-spin-slow absolute -inset-6 rounded-full border border-dashed border-white/20" />
      </div>
    </div>
  )
}

function SpaceCard({ item, index, total, progress, stack }: { item: SpaceItem; index: number; total: number; progress: MotionValue<number>; stack: boolean }) {
  const start = index / total
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index) * 0.04])
  return (
    <div className="md:sticky md:top-24 md:pt-[var(--stack)]" style={{ '--stack': `${index * 28}px` } as CSSProperties}>
      <motion.article
        style={{ scale: stack ? scale : 1 }}
        className="grid origin-top overflow-hidden rounded-[2rem] border border-white/10 bg-space-2 text-white shadow-2xl shadow-black/40 md:grid-cols-2"
      >
        <div className="relative min-h-72 overflow-hidden md:min-h-[520px]">
          {item.image && item.framed ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={item.image} alt="" aria-hidden className="absolute inset-0 size-full scale-110 object-cover opacity-50 blur-2xl" />
              <img src={item.image} alt={item.name} loading="lazy" className="relative w-3/4 max-w-80 rounded-2xl shadow-2xl ring-1 ring-white/20" />
            </div>
          ) : item.image ? (
            <img src={item.image} alt={item.name} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 hover:scale-105" />
          ) : (
            <PlanetArt />
          )}
          <span className="absolute start-5 top-5 font-display text-sm tabular-nums text-white/80 mix-blend-difference">
            0{index + 1} / 0{total}
          </span>
        </div>
        <div className="flex flex-col gap-6 p-7 md:p-12">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="star">{item.kicker}</Badge>
            {item.capacity && (
              <Badge variant="glass">
                <Users />
                {item.capacity}
              </Badge>
            )}
          </div>
          <h3 className="font-display text-4xl font-semibold md:text-5xl">{item.name}</h3>
          <p className="leading-relaxed text-white/70">{item.description}</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {item.features.map((f) => (
              <li key={f.label} className="flex items-center gap-3 text-sm">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-star">
                  <Icon name={f.icon} className="size-4" />
                </span>
                {f.label}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-2">
            <Button variant="star" onClick={() => scrollToId('contact')}>
              {item.cta}
              <ArrowUpRight className="rtl:-scale-x-100" />
            </Button>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export function Spaces() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const items = t.spaces.items
  const stack = useMediaQuery('(min-width: 768px)')
  return (
    <section id="spaces" className="relative bg-space py-24 text-white md:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(50%_60%_at_50%_0%,color-mix(in_oklch,var(--nebula)_35%,transparent),transparent)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow={t.spaces.eyebrow} title={t.spaces.title} subtitle={t.spaces.subtitle} dark />
        <div ref={ref} className="mt-16 flex flex-col gap-6 md:gap-10 md:pb-10">
          {items.map((item, i) => (
            <SpaceCard key={item.id} item={item} index={i} total={items.length} progress={scrollYProgress} stack={stack} />
          ))}
        </div>
      </div>
    </section>
  )
}
