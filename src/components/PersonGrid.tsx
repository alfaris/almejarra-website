import { motion } from 'motion/react'
import { UserRound } from 'lucide-react'

import type { Person } from '@/content/types'
import { staggerChild, staggerParent } from '@/lib/motion'
import { cn } from '@/lib/utils'

/** Round portraits with name and role; used for the team and the honors board. */
export function PersonGrid({ people, className, ring = 'border-background' }: { people: Person[]; className?: string; ring?: string }) {
  return (
    <motion.ul
      className={cn('grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3', className)}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
    >
      {people.map((p) => (
        <motion.li key={p.name} variants={staggerChild} className="group flex flex-col items-center text-center">
          <div className="relative mb-3 size-24 md:size-28">
            <div className="rim-gradient absolute -inset-1 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
            {p.image ? (
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                width={320}
                height={320}
                className={cn('relative size-full rounded-full border-4 object-cover grayscale transition duration-500 group-hover:grayscale-0', ring)}
              />
            ) : (
              <span
                aria-hidden
                className={cn('relative flex size-full items-center justify-center rounded-full border-4 bg-nebula text-white/90', ring)}
              >
                <UserRound className="size-10" />
              </span>
            )}
          </div>
          <p className="font-display font-semibold">{p.name}</p>
          <p className="mt-1 max-w-48 text-xs leading-snug text-muted-foreground">{p.role}</p>
        </motion.li>
      ))}
    </motion.ul>
  )
}
