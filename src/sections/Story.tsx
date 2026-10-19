import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

import { SectionHeading } from '@/components/SectionHeading'
import { useI18n } from '@/lib/i18n'

export function Story() {
  const { t } = useI18n()
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 50%'] })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="relative overflow-hidden bg-space py-24 text-white md:py-36">
      <div className="pointer-events-none absolute -start-40 top-1/3 size-[40rem] rounded-full bg-nebula/20 blur-3xl" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-4 md:px-8 lg:grid-cols-2">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow={t.story.eyebrow} title={t.story.title} dark />
        </div>
        <ol ref={ref} className="relative space-y-14 ps-10">
          <div className="absolute start-[11px] top-2 bottom-2 w-px bg-white/10" aria-hidden />
          <motion.div style={{ height }} className="absolute start-[11px] top-2 w-px bg-gradient-to-b from-star via-nebula-light to-rim-blue" aria-hidden />
          {t.story.items.map((s, i) => (
            <motion.li
              key={s.date}
              className="relative"
              initial={{ opacity: 0, x: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
            >
              <span className="absolute -start-10 top-1 flex size-6 items-center justify-center rounded-full border border-star/50 bg-space">
                <span className="size-2 rounded-full bg-star shadow-[0_0_12px_var(--star)]" />
              </span>
              <p className="font-display text-sm uppercase tracking-[0.2em] text-star">{s.date}</p>
              <h3 className="mt-2 font-display text-3xl font-semibold md:text-4xl">{s.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-white/70">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
