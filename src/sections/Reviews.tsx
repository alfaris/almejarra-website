import { Quote, Star } from 'lucide-react'

import { SectionHeading } from '@/components/SectionHeading'
import { reviews, type Review } from '@/content/reviews'
import { useI18n } from '@/lib/i18n'
import { useReducedMotion } from '@/lib/useMediaQuery'
import { cn } from '@/lib/utils'

function ReviewCard({ review, lang }: { review: Review; lang: 'ar' | 'en' }) {
  return (
    <figure className="flex h-full w-[min(22rem,80vw)] shrink-0 flex-col gap-4 rounded-3xl border bg-card p-6">
      <div className="flex items-center justify-between">
        <Quote className="size-7 text-primary/40" aria-hidden />
        {review.rating && (
          <span className="flex gap-0.5 text-star" aria-label={`${review.rating}/5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className={cn('size-4', i < review.rating! ? 'fill-current' : 'opacity-30')} aria-hidden />
            ))}
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
  if (reviews.length === 0) return null

  // A moving strip needs enough cards to fill the screen; otherwise show a simple row.
  const scroll = reviews.length >= 3 && !reduced

  return (
    <section id="reviews" className="overflow-hidden bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading eyebrow={t.reviews.eyebrow} title={t.reviews.title} />
      </div>
      {scroll ? (
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
