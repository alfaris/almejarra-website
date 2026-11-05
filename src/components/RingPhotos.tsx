import { motion } from 'motion/react'

import { site } from '@/content/site'

/**
 * A fan of polaroid photos beside the hero's 3D ring. It follows the ring through the
 * --ring-x / --ring-y / --ring-r variables the galaxy sets on its container every frame.
 */
export function RingPhotos({
  open,
  compact,
  side,
  reduced,
}: {
  open: boolean
  /** Where the ring sits: -1 left, 1 right, 0 centred. */
  side: -1 | 0 | 1
  /** Phones show fewer, smaller cards. */
  compact: boolean
  reduced: boolean
}) {
  const photos = compact ? site.ringPhotos.slice(0, 4) : site.ringPhotos
  // The fan opens downward, into the space under the ring, leaning toward the screen edge so
  // it stays clear of the headline beside the ring.
  const centre = 90 - side * 20
  const spread = compact ? 120 : 160
  const step = photos.length > 1 ? spread / (photos.length - 1) : 0

  return (
    <div className="pointer-events-none absolute inset-0 z-10" aria-hidden>
      {photos.map((src, i) => {
        const angle = ((centre - spread / 2 + i * step) * Math.PI) / 180
        // Alternate tilts so the cards look dealt by hand.
        const tilt = (i % 2 ? 1 : -1) * (4 + ((i * 5) % 8))
        const distance = `(var(--ring-r) + ${compact ? 90 : 130}px)`
        return (
          <motion.div
            key={src}
            className="absolute w-[7.5rem] md:w-[9.5rem]"
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
          >
            <div className="rounded-md bg-white p-1.5 pb-5 shadow-2xl shadow-black/50 md:p-2 md:pb-6">
              <img src={src} alt="" loading="lazy" decoding="async" className="block w-full rounded-sm" />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
