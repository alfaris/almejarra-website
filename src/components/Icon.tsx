import {
  Armchair,
  CalendarDays,
  Coffee,
  GraduationCap,
  Handshake,
  Lightbulb,
  Lock,
  Presentation,
  Printer,
  Projector,
  Rocket,
  Sparkles,
  Sun,
  Users,
  Wallet,
  Wifi,
  type LucideProps,
} from 'lucide-react'

import type { IconName } from '@/content/types'

const icons = {
  wifi: Wifi,
  coffee: Coffee,
  armchair: Armchair,
  printer: Printer,
  users: Users,
  sparkles: Sparkles,
  calendar: CalendarDays,
  wallet: Wallet,
  sun: Sun,
  projector: Projector,
  presentation: Presentation,
  lightbulb: Lightbulb,
  handshake: Handshake,
  rocket: Rocket,
  graduation: GraduationCap,
  lock: Lock,
} satisfies Record<IconName, unknown>

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = icons[name]
  return <Cmp aria-hidden {...props} />
}
