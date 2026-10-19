import { motion } from 'motion/react'

import { SectionHeading } from '@/components/SectionHeading'
import { useI18n } from '@/lib/i18n'
import { staggerChild, staggerParent } from '@/lib/motion'

// Bento placement for the five photos, in content order.
const tiles = [
  'col-span-2 row-span-2',
  'row-span-2',
  '',
  '',
  'col-span-2 md:col-span-4',
]

export function Gallery() {
  const { t } = useI18n()
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title} />
        <motion.ul
          className="mt-12 grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {t.gallery.items.map((item, i) => (
            <motion.li key={item.src} variants={staggerChild} className={`group relative overflow-hidden rounded-3xl bg-secondary ${tiles[i] ?? ''}`}>
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="size-full object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-space/80 to-transparent p-4 text-sm text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {item.alt}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
