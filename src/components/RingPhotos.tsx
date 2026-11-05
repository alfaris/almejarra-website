import { motion } from 'motion/react'

import { site } from '@/content/site'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/**
 * A fan of polaroid photos beside the hero's 3D ring. It follows the ring through the
 * --ring-x / --ring-y / --ring-r variables the galaxy sets on its container every frame.
 * While open the cards are live: the one under the pointer lifts and straightens, and a
 * click opens it large.
 */
export function RingPhotos({
  open,
  compact,
  side,
  reduced,
  onHoverChange,
  onSelect,
}: {
  open: boolean
  /** Phones show fewer, smaller cards. */
  compact: boolean
  /** Where the ring sits: -1 left, 1 right, 0 centred. */
  side: -1 | 0 | 1
  reduced: boolean
  /** The pointer moved onto or off the cards, which keeps the fan open. */
  onHoverChange: (on: boolean) => void
  /** A card was clicked or tapped: its index in site.ringPhotos. */
  onSelect: (index: number) => void
}) {
  const { t } = useI18n()
  const photos = compact ? site.ringPhotos.slice(0, 4) : site.ringPhotos
  // The fan opens downward, into the space under the ring, leaning toward the screen edge so
  // it stays clear of the headline beside the ring.
  const centre = 90 - side * 20
  const spread = compact ? 120 : 160
  const step = photos.length > 1 ? spread / (photos.length - 1) : 0

  return (
    // data-ring-keep: taps here don't count as tapping away from the ring (see Galaxy).
    <div className="group/fan pointer-events-none absolute inset-0 z-10" data-ring-keep>
      {photos.map((photo, i) => {
        const angle = ((centre - spread / 2 + i * step) * Math.PI) / 180
        // Alternate tilts so the cards look dealt by hand.
        const tilt = (i % 2 ? 1 : -1) * (4 + ((i * 5) % 8))
        const distance = `(var(--ring-r) + ${compact ? 90 : 130}px)`
        return (
          <motion.div
            key={photo.src}
            className={cn('absolute w-[7.5rem] hover:z-10 md:w-[9.5rem]', open && 'pointer-events-auto')}
            style={{
              left: 'var(--ring-x)',
              top: 'var(--ring-y)',
              translate: '-50% -50%',
              transform: `translate(calc(var(--t) * ${Math.cos(angle).toFixed(3)} * ${distance}), calc(var(--t) * ${Math.sin(angle).toFixed(3)} * ${distance})) rotate(calc(var(--t) * ${tilt}deg)) scale(calc(0.4 + var(--t) * 0.6))`,
            }}
            initial={false}
            animate={{ '--t': open || reduced ? 1 : 0, opacity: open ? 1 : 0 } as Record<string, number>}
            transition={
              reduced
                ? { duration: 0.2 }
                : { type: 'spring', stiffness: 220, damping: 22, delay: open ? i * 0.04 : (photos.length - 1 - i) * 0.02 }
            }
            onPointerEnter={(e) => e.pointerType === 'mouse' && onHoverChange(true)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && onHoverChange(false)}
          >
            <button
              type="button"
              tabIndex={open ? 0 : -1}
              aria-hidden={!open}
              aria-label={`${t.hero.photos.open}: ${t.hero.photos.alts[i]}`}
              onClick={() => onSelect(i)}
              // Hovered, the card lifts and straightens (undoing its tilt); the others dim.
              style={{ '--tilt': `${-tilt}deg` } as React.CSSProperties}
              className="block w-full cursor-zoom-in rounded-md bg-white p-1.5 pb-5 shadow-2xl shadow-black/50 transition duration-300 ease-out group-hover/fan:opacity-60 hover:!opacity-100 hover:[transform:rotate(var(--tilt))_scale(1.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-star md:p-2 md:pb-6"
            >
              <img src={photo.src} alt="" loading="lazy" decoding="async" className="block w-full rounded-sm" />
            </button>
          </motion.div>
        )
      })}
    </div>
  )
}
