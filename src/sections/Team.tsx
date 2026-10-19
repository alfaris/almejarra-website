import { motion } from 'motion/react'
import { ArrowRight, ExternalLink, Newspaper } from 'lucide-react'

import { JoinCta } from '@/components/JoinCta'
import { Reveal } from '@/components/Reveal'
import { staggerChild, staggerParent } from '@/lib/motion'
import { SectionHeading } from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'
import { TEAM_HASH } from '@/lib/router'

export function Team() {
  const { t } = useI18n()
  const team = t.team
  return (
    <section id="community" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow={team.eyebrow} title={team.title} subtitle={team.subtitle} />
        <motion.div
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {team.members.map((m) => (
            <motion.article key={m.name} variants={staggerChild} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-secondary">
                <img
                  src={m.image}
                  alt={m.name}
                  loading="lazy"
                  className="size-full object-cover transition duration-700 group-hover:scale-105 md:grayscale md:group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space/90 via-space/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-sm text-star">{m.role}</p>
                  <h3 className="font-display text-2xl font-semibold">{m.name}</h3>
                  <p className="mt-2 overflow-hidden text-sm leading-relaxed text-white/75 transition-all duration-500 md:max-h-0 md:opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100">
                    {m.bio}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <Reveal className="mt-10">
          <Button variant="outline" size="lg" asChild>
            <a href={TEAM_HASH}>
              {team.teamLink}
              <ArrowRight className="rtl:-scale-x-100" />
            </a>
          </Button>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <JoinCta />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-[1.75rem] border p-8">
              <Newspaper className="mb-4 size-7 text-primary" aria-hidden />
              <h3 className="font-display text-xl font-semibold">{team.media.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {team.media.items.map((m) => (
                  <li key={m.href}>
                    <a
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm transition hover:bg-primary hover:text-primary-foreground"
                    >
                      {m.name}
                      <ExternalLink className="size-3.5 opacity-60" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
