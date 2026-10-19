import { Rocket } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'
import { scrollToId } from '@/lib/scroll'
import { cn } from '@/lib/utils'

/** "Join the crew" card: preselects the matching interest in the contact form. */
export function JoinCta({ className }: { className?: string }) {
  const { t } = useI18n()
  const join = t.team.join
  const onJoin = () => {
    scrollToId('contact')
    // From the team page the form mounts after the route change, so announce the interest once it exists.
    setTimeout(() => window.dispatchEvent(new CustomEvent('almejarra:interest', { detail: t.contact.form.interestOptions[7] })), 400)
  }
  return (
    <div className={cn('relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[1.75rem] bg-nebula p-8 text-white md:flex-row md:items-center md:p-10', className)}>
      <div className="rim-gradient absolute -end-20 -top-20 size-60 rounded-full opacity-40 blur-2xl" aria-hidden />
      <div className="relative">
        <Rocket className="mb-4 size-8 text-star" aria-hidden />
        <h3 className="font-display text-3xl font-semibold">{join.title}</h3>
        <p className="mt-2 max-w-lg text-white/80">{join.text}</p>
      </div>
      <Button variant="star" size="lg" className="relative" onClick={onJoin}>
        {join.cta}
      </Button>
    </div>
  )
}
