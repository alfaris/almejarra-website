import * as React from 'react'
import { Dialog as SheetPrimitive } from 'radix-ui'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close

function SheetContent({
  className,
  children,
  side = 'end',
  closeLabel = 'Close',
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & { side?: 'start' | 'end'; closeLabel?: string }) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-space/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          'fixed inset-y-0 z-50 flex w-[85%] max-w-sm flex-col gap-4 bg-space p-6 text-white shadow-2xl transition ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:duration-300 data-[state=open]:duration-500',
          side === 'end'
            ? 'end-0 data-[state=closed]:slide-out-to-end data-[state=open]:slide-in-from-end'
            : 'start-0 data-[state=closed]:slide-out-to-start data-[state=open]:slide-in-from-start',
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="absolute end-4 top-4 rounded-full p-2 opacity-80 transition hover:bg-white/10 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-star">
          <X className="size-5" />
          <span className="sr-only">{closeLabel}</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  )
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return <SheetPrimitive.Title className={cn('font-display text-lg font-semibold', className)} {...props} />
}

function SheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return <SheetPrimitive.Description className={cn('sr-only', className)} {...props} />
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle, SheetDescription }
