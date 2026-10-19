import { ExternalLink, Quote, Star } from 'lucide-react'

import { SectionHeading } from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { reviews, type Review } from '@/content/reviews'
import { site } from '@/content/site'
import { useI18n } from '@/lib/i18n'
import { useReducedMotion } from '@/lib/useMediaQuery'
import { cn } from '@/lib/utils'

/** Five stars filled up to `value`, including a partly filled last star (4.7 → 70% of the fifth). */
function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn('flex gap-0.5 text-star', className)} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.min(Math.max(value - i, 0), 1)
        return (
          <span key={i} className="relative">
            <Star className="size-[1em] opacity-30" />
            {fill > 0 && (
              // Clip from the start edge so the fill reads in the page's direction.
              <span className="absolute inset-y-0 start-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className="size-[1em] fill-current" />
              </span>
            )}
          </span>
        )
      })}
    </span>
  )
}

/** The listing's overall rating, with a link to every review on Google Maps. */
function GoogleRating() {
  const { t } = useI18n()
  // Western digits, like every other number on the site.
  const rating = site.google.rating.toFixed(1)
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4 rounded-3xl border bg-card p-5 md:p-6">
      <div className="flex items-center gap-4">
        <span className="font-display text-5xl font-semibold leading-none">{rating}</span>
        <div>
          <Stars value={site.google.rating} className="text-xl" />
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="sr-only">{`${rating} / 5 · `}</span>
            {t.reviews.rating}
          </p>
        </div>
      </div>
      <Button variant="outline" className="ms-auto" asChild>
        <a href={site.google.mapsUrl} target="_blank" rel="noopener noreferrer">
          {t.reviews.seeAll}
          <ExternalLink className="rtl:-scale-x-100" aria-hidden />
        </a>
      </Button>
    </div>
  )
}

function ReviewCard({ review, lang }: { review: Review; lang: 'ar' | 'en' }) {
  return (
    <figure className="flex h-full w-[min(22rem,80vw)] shrink-0 flex-col gap-4 rounded-3xl border bg-card p-6">
      <div className="flex items-center justify-between">
        <Quote className="size-7 text-primary/40" aria-hidden />
        {review.rating && (
          <span className="text-base" role="img" aria-label={`${review.rating}/5`}>
            <Stars value={review.rating} />
          </span>
        )}
      </div>
      {/* The quote keeps its original language and direction on both pages. */}
      <blockquote lang={review.quoteLang} dir={review.quoteLang === 'ar' ? 'rtl' : 'ltr'} className="flex-1 leading-relaxed">
        {review.quote}
      </blockquote>
      <figcaption className="text-sm">
        <span className="block font-display font-semibold">{review.name}</span>
        <span className="text-muted-foreground">
          {[review.role?.[lang], review.source].filter(Boolean).join(' · ')}
        </span>
      </figcaption>
    </figure>
  )
}

export function Reviews() {
  const { t, lang, dir } = useI18n()
  const reduced = useReducedMotion()

  // A moving strip needs enough cards to fill the screen; otherwise show a simple row.
  const scroll = reviews.length >= 3 && !reduced

  return (
    <section id="reviews" className="overflow-hidden bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow={t.reviews.eyebrow} title={t.reviews.title} subtitle={reviews.length ? t.reviews.subtitle : undefined} />
        <div className="mt-10">
          <GoogleRating />
        </div>
      </div>
      {reviews.length === 0 ? null : scroll ? (
        <div className="mask-fade-x group mt-12" dir="ltr">
          <div
            className="flex w-max animate-marquee gap-5 py-2 group-hover:[animation-play-state:paused]"
            style={{ animationDirection: dir === 'rtl' ? 'reverse' : 'normal', animationDuration: `${reviews.length * 8}s` }}
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 gap-5" aria-hidden={copy === 1} dir={dir}>
                {reviews.map((r) => (
                  <ReviewCard key={r.name + copy} review={r} lang={lang} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-12 flex max-w-7xl flex-wrap gap-5 px-4 md:px-8">
          {reviews.map((r) => (
            <ReviewCard key={r.name} review={r} lang={lang} />
          ))}
        </div>
      )}
    </section>
  )
}
