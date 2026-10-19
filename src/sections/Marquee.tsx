import { Sparkle } from 'lucide-react'

import { useI18n } from '@/lib/i18n'

export function Marquee() {
  const { t, dir } = useI18n()
  const items = [...t.marquee, ...t.marquee]
  return (
    <div className="relative overflow-hidden bg-nebula py-5 text-white" dir="ltr" aria-hidden>
      <div className="flex w-max animate-marquee gap-10" style={{ animationDirection: dir === 'rtl' ? 'reverse' : 'normal' }}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center gap-10" dir={dir}>
            {items.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-10 font-display text-2xl font-medium whitespace-nowrap md:text-3xl">
                {w}
                <Sparkle className="size-5 fill-star text-star" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
