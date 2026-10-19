import * as React from 'react'

import { cn } from '@/lib/utils'

const fieldBase =
  'w-full min-w-0 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white outline-none transition placeholder:text-white/40 focus-visible:border-star focus-visible:ring-[3px] focus-visible:ring-star/30 aria-invalid:border-rim-red md:text-sm'

function Input({ className, ...props }: React.ComponentProps<'input'>) {
  return <input data-slot="input" className={cn(fieldBase, 'h-12', className)} {...props} />
}

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return <textarea data-slot="textarea" className={cn(fieldBase, 'min-h-28 resize-y', className)} {...props} />
}

function Select({ className, ...props }: React.ComponentProps<'select'>) {
  return <select data-slot="select" className={cn(fieldBase, 'h-12 appearance-none [&>option]:text-black', className)} {...props} />
}

function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return <label data-slot="label" className={cn('text-sm font-medium text-white/80', className)} {...props} />
}

export { Input, Textarea, Select, Label }
