import { motion } from 'motion/react'
import { ArrowUpRight, CalendarDays, Clock, MapPin } from 'lucide-react'

import { SectionHeading } from '@/components/SectionHeading'
import { SocialIcon } from '@/components/SocialIcon'
import { Button } from '@/components/ui/button'
import { events } from '@/content/events'
import { site } from '@/content/site'
import { useI18n } from '@/lib/i18n'
import { staggerChild, staggerParent } from '@/lib/motion'
import { scrollToId } from '@/lib/scroll'

/** Today as YYYY-MM-DD in the visitor's time zone, to compare with event dates. */
function today() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function Events() {
  const { t, lang } = useI18n()
  const e = t.events
  const now = today()
  const upcoming = events.filter((ev) => (ev.endDate ?? ev.date) >= now).sort((a, b) => a.date.localeCompare(b.date))
  const locale = lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB'
  const day = new Intl.DateTimeFormat(locale, { day: 'numeric', timeZone: 'UTC' })
  const month = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' })
  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long', timeZone: 'UTC' })
  const asDate = (s: string) => new Date(`${s}T00:00:00Z`)

  const host = () => {
    scrollToId('contact')
    setTimeout(() => window.dispatchEvent(new CustomEvent('almejarra:interest', { detail: t.contact.form.interestOptions[6] })), 400)
  }

  return (
    <section id="events" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow={e.eyebrow} title={e.title} subtitle={e.subtitle} />

        {upcoming.length > 0 ? (
          <motion.ul
            className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
          >
            {upcoming.map((ev) => (
              <motion.li key={ev.date + ev.title.en} variants={staggerChild} className="flex gap-5 rounded-3xl border bg-card p-6">
                <time
                  dateTime={ev.date}
                  className="flex size-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-space text-white"
                >
                  <span className="font-display text-3xl font-semibold leading-none">{day.format(asDate(ev.date))}</span>
                  <span className="mt-1 text-xs text-star">{month.format(asDate(ev.date))}</span>
                </time>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <h3 className="font-display text-xl font-semibold leading-snug">{ev.title[lang]}</h3>
                  <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-4" aria-hidden />
                      {weekday.format(asDate(ev.date))}
                      {ev.endDate && ` – ${day.format(asDate(ev.endDate))} ${month.format(asDate(ev.endDate))}`}
                    </span>
                    {ev.time && (
                      <span className="inline-flex items-center gap-1.5" dir="ltr">
                        <Clock className="size-4" aria-hidden />
                        {ev.time}
                      </span>
                    )}
                    {ev.place && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-4" aria-hidden />
                        {ev.place[lang]}
                      </span>
                    )}
                  </p>
                  {ev.description && <p className="text-sm leading-relaxed text-muted-foreground">{ev.description[lang]}</p>}
                  {ev.link && (
                    <a
                      href={ev.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-primary hover:underline"
                    >
                      {e.details}
                      <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden />
                    </a>
                  )}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <div className="relative mt-12 overflow-hidden rounded-[2rem] bg-space p-8 text-white md:p-12">
            <div className="rim-gradient absolute -end-24 -top-24 size-72 rounded-full opacity-30 blur-3xl" aria-hidden />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-5">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-star">
                  <CalendarDays className="size-7" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold">{e.emptyTitle}</h3>
                  <p className="mt-2 max-w-lg text-white/70">{e.emptyText}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="star" size="lg" asChild>
                  <a href={site.facebookEvents} target="_blank" rel="noopener noreferrer">
                    <SocialIcon id="facebook" className="size-4" />
                    {e.follow}
                  </a>
                </Button>
                <Button variant="glass" size="lg" onClick={host}>
                  {e.host}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
