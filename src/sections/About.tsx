import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'motion/react'
import { Eye, Target } from 'lucide-react'

import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { staggerChild, staggerParent } from '@/lib/motion'
import { SectionHeading } from '@/components/SectionHeading'
import { site } from '@/content/site'
import { useI18n } from '@/lib/i18n'
import { useReducedMotion } from '@/lib/useMediaQuery'

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduced = useReducedMotion()
  const [n, setN] = useState(reduced ? value : 0)
  const format = (v: number) => String(v)

  useEffect(() => {
    if (!inView || reduced) return
    const from = value > 1900 ? value - 40 : 0
    const controls = animate(from, value, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)), onComplete: () => setN(value) })
    return () => controls.stop()
  }, [inView, value, reduced])

  return (
    <span ref={ref} className="tabular-nums">
      {format(n)}
      {suffix}
    </span>
  )
}

export function About() {
  const { t } = useI18n()
  const a = t.about
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={a.eyebrow} title={a.title} />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              {a.body.map((p, i) => (
                <Reveal key={i} delay={0.1 * i}>
                  <p className="text-pretty">{p}</p>
                </Reveal>
              ))}
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                { ...a.vision, icon: Eye },
                { ...a.mission, icon: Target },
              ].map((b, i) => (
                <Reveal key={b.title} delay={0.1 * i}>
                  <div className="h-full rounded-2xl border bg-card p-6">
                    <b.icon className="mb-4 size-6 text-primary" aria-hidden />
                    <h3 className="font-display text-xl font-semibold">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <Reveal>
              <figure className="relative">
                <div className="rim-gradient absolute -inset-1 rounded-[2rem] opacity-70 blur-xl" aria-hidden />
                <img
                  src={site.images.crew}
                  alt={t.team.title}
                  loading="lazy"
                  width={1000}
                  height={667}
                  className="relative aspect-[4/5] w-full rounded-[1.75rem] object-cover"
                />
                <div className="absolute -bottom-6 start-6 end-6 rounded-2xl bg-space/90 p-5 text-white backdrop-blur md:start-10 md:end-10">
                  <p className="font-display text-2xl font-semibold">{t.hero.hashtag}</p>
                  <p className="mt-1 text-sm text-white/70">{t.footer.about}</p>
                </div>
              </figure>
            </Reveal>
          </div>
        </div>

        <motion.dl
          className="mt-28 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border bg-border md:grid-cols-4"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {a.stats.map((s) => (
            <motion.div key={s.label} variants={staggerChild} className="flex flex-col gap-2 bg-background p-6 md:p-10">
              <dt className="order-2 text-sm text-muted-foreground">{s.label}</dt>
              <dd className="font-display text-4xl font-semibold text-primary md:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        <motion.div
          className="mt-16 grid gap-6 md:grid-cols-3"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {a.pillars.map((p, i) => (
            <motion.article
              key={p.title}
              variants={staggerChild}
              className="group relative overflow-hidden rounded-3xl bg-secondary p-8 transition-colors duration-500 hover:bg-space hover:text-white"
            >
              <span className="absolute end-6 top-6 font-display text-6xl font-bold text-primary/10 transition-colors group-hover:text-white/10">0{i + 1}</span>
              <span className="mb-10 inline-flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                <Icon name={p.icon} className="size-6" />
              </span>
              <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground transition-colors group-hover:text-white/70">{p.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
