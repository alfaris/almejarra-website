import { cn } from '@/lib/utils'

/** The identity's purple bar ending in red, lime and blue slants. Never mirrored. */
export function BrandStripe({ className }: { className?: string }) {
  return (
    <div dir="ltr" aria-hidden className={cn('relative flex h-3 w-full overflow-hidden bg-[#8e2a8c]', className)}>
      <div className="absolute inset-y-0 end-[4%] flex">
        {['var(--rim-red)', 'var(--rim-lime)', 'var(--rim-blue)', 'var(--rim-blue)'].map((c, i) => (
          <span key={i} className="-ms-1 h-full w-16 -skew-x-[35deg] md:w-24" style={{ background: c, opacity: i === 3 ? 0.55 : 1 }} />
        ))}
      </div>
    </div>
  )
}
