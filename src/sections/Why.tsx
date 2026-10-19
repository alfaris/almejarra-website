import { motion } from 'motion/react'

import { Icon } from '@/components/Icon'
import { staggerChild, staggerParent } from '@/lib/motion'
import { SectionHeading } from '@/components/SectionHeading'
import { useI18n } from '@/lib/i18n'

export function Why() {
  const { t } = useI18n()
  return (
    <section className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} />
        <motion.ul
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {t.why.items.map((w) => (
            <motion.li
              key={w.title}
              variants={staggerChild}
              className="group relative overflow-hidden rounded-3xl bg-background p-6 transition-shadow hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="absolute -end-10 -top-10 size-32 rounded-full bg-primary/5 transition-transform duration-700 group-hover:scale-[3]" aria-hidden />
              <span className="relative mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon name={w.icon} className="size-5" />
              </span>
              <h3 className="relative font-display text-lg font-semibold">{w.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
