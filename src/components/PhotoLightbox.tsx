import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Dialog } from 'radix-ui'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import { site } from '@/content/site'
import { useI18n } from '@/lib/i18n'

/** The ring photos, one at a time and large, with previous / next, arrow keys and swipe. */
export function PhotoLightbox({ index, onChange }: { index: number | null; onChange: (index: number | null) => void }) {
  const { t, dir } = useI18n()
  const photos = site.ringPhotos
  const count = photos.length
  const go = (step: number) => index !== null && onChange((index + step + count) % count)

  // Arrow keys follow the reading direction: in Arabic, ← is the next photo.
  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      const forward = (e.key === 'ArrowRight') === (dir === 'ltr')
      onChange((index + (forward ? 1 : -1) + count) % count)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, dir, count, onChange])

  const Prev = dir === 'rtl' ? ChevronRight : ChevronLeft
  const Next = dir === 'rtl' ? ChevronLeft : ChevronRight
  const navButton =
    'absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-star'

  return (
    <Dialog.Root open={index !== null} onOpenChange={(open) => !open && onChange(null)}>
      <Dialog.Portal>
        {/* data-ring-block: the galaxy ignores the pointer over the lightbox. */}
        <Dialog.Overlay data-ring-block className="fixed inset-0 z-50 bg-space/90 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          data-ring-block
          dir={dir}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-4 text-white outline-none md:p-10"
          onClick={(e) => e.target === e.currentTarget && onChange(null)}
        >
          <Dialog.Title className="sr-only">{index !== null ? t.hero.photos.alts[index] : ''}</Dialog.Title>
          <div className="relative flex w-full max-w-5xl items-center justify-center">
            <AnimatePresence mode="popLayout" initial={false}>
              {index !== null && (
                <motion.img
                  key={index}
                  src={photos[index].full}
                  alt={t.hero.photos.alts[index]}
                  className="max-h-[78svh] w-auto max-w-full touch-pan-y select-none rounded-xl shadow-2xl shadow-black/60"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  // Swipe sideways on touch screens; the drag snaps back and the photo changes.
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) < 60) return
                    const towardStart = dir === 'rtl' ? info.offset.x > 0 : info.offset.x < 0
                    go(towardStart ? 1 : -1)
                  }}
                />
              )}
            </AnimatePresence>
            <button type="button" onClick={() => go(-1)} className={`${navButton} start-0 md:-start-16`} aria-label={t.hero.photos.prev}>
              <Prev className="size-5" />
            </button>
            <button type="button" onClick={() => go(1)} className={`${navButton} end-0 md:-end-16`} aria-label={t.hero.photos.next}>
              <Next className="size-5" />
            </button>
          </div>
          {index !== null && (
            <p className="flex max-w-xl flex-wrap items-baseline justify-center gap-x-3 text-center text-sm text-white/75">
              <span>{t.hero.photos.alts[index]}</span>
              <span className="text-white/45 tabular-nums" dir="ltr">
                {index + 1} / {count}
              </span>
            </p>
          )}
          <Dialog.Close
            className="absolute end-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-star"
            aria-label={t.hero.photos.close}
          >
            <X className="size-5" />
          </Dialog.Close>
          <Dialog.Description className="sr-only">
            {index !== null ? `${index + 1} / ${count}` : ''}
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
