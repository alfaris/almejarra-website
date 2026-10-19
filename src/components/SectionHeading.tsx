import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  dark = false,
  align = 'start',
}: {
  eyebrow: string
  title: string
  subtitle?: string
  className?: string
  dark?: boolean
  align?: 'start' | 'center'
}) {
  return (
    <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      <p className={cn('mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em]', dark ? 'text-star' : 'text-primary', align === 'center' && 'justify-center')}>
        <span className="h-px w-8 bg-current" aria-hidden />
        {eyebrow}
      </p>
      <h2 className={cn('font-display text-4xl font-semibold leading-[1.1] tracking-tight text-balance md:text-6xl', dark && 'text-white')}>{title}</h2>
      {subtitle && <p className={cn('mt-5 text-lg leading-relaxed text-pretty', dark ? 'text-white/70' : 'text-muted-foreground')}>{subtitle}</p>}
    </Reveal>
  )
}
