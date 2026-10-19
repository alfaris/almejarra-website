import type { ReactNode } from 'react'
import { motion } from 'motion/react'

import { staggerChild as variants } from '@/lib/motion'

/** Fades and lifts its child into view once. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

