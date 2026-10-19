import { motion } from 'motion/react'
import { Check, Orbit } from 'lucide-react'

import { staggerChild, staggerParent } from '@/lib/motion'
import { SectionHeading } from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'
import { scrollToId } from '@/lib/scroll'
import { cn } from '@/lib/utils'

export function Packages() {
  const { t } = useI18n()
  const p = t.packages
  const choose = (name: string) => {
    window.dispatchEvent(new CustomEvent('almejarra:interest', { detail: name }))
    scrollToId('contact')
  }
  return (
    <section id="packages" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} subtitle={p.subtitle} align="center" />
        <motion.div
          className="mt-16 grid items-stretch gap-6 lg:grid-cols-3"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {p.items.map((item) => (
            <motion.article
              key={item.id}
              variants={staggerChild}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className={cn(
                'relative flex flex-col rounded-[2rem] border p-8',
                item.highlighted ? 'bg-space text-white shadow-2xl shadow-primary/30 lg:-my-4 lg:py-12' : 'bg-card',
              )}
            >
              {item.highlighted && <div className="rim-gradient absolute inset-x-8 -top-px h-px" aria-hidden />}
              <div className="flex items-center justify-between">
                <h3 className="font-display text-3xl font-semibold" dir="ltr">
                  {item.name}
                </h3>
                <Orbit className={cn('size-7', item.highlighted ? 'text-star' : 'text-primary')} aria-hidden />
              </div>
              <p className={cn('mt-4 leading-relaxed', item.highlighted ? 'text-white/70' : 'text-muted-foreground')}>{item.description}</p>
              <p className={cn('mt-8 font-display text-xl font-semibold', item.highlighted ? 'text-star' : 'text-primary')}>{item.price}</p>
              <ul className="mt-6 space-y-3 border-t border-current/10 pt-6">
                {item.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className={cn('mt-0.5 size-4 shrink-0', item.highlighted ? 'text-star' : 'text-primary')} aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-10 w-full"
                size="lg"
                variant={item.highlighted ? 'star' : 'outline'}
                onClick={() => choose(item.name)}
              >
                {p.cta}
              </Button>
            </motion.article>
          ))}
        </motion.div>
        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-muted-foreground">{p.note}</p>
      </div>
    </section>
  )
}
