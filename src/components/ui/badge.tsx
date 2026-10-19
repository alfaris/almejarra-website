import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium [&>svg]:size-3.5',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary/10 text-primary',
        star: 'border-transparent bg-star/15 text-star',
        outline: 'border-current/20',
        glass: 'border-white/15 bg-white/10 text-white backdrop-blur',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

function Badge({ className, variant, ...props }: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge }
