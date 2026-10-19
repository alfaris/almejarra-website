import { useEffect, useRef } from 'react'
import { useInView } from 'motion/react'
import { ExternalLink } from 'lucide-react'

import { cn } from '@/lib/utils'

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
  }
}

const SCRIPT_ID = 'instagram-embed-js'

/**
 * Instagram's official post/reel embed. The script loads only once the embed scrolls near the
 * viewport. The markup lives outside React's tree because embed.js replaces it with an iframe.
 * Until then (or if Instagram is blocked) the link inside is the fallback.
 */
export function InstagramEmbed({ url, label, className }: { url: string; label: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null)
  const near = useInView(box, { once: true, margin: '400px 0px' })

  useEffect(() => {
    const el = box.current
    if (!near || !el) return
    const blockquote = document.createElement('blockquote')
    blockquote.className = 'instagram-media'
    blockquote.dataset.instgrmPermalink = url
    blockquote.dataset.instgrmVersion = '14'
    // Styled like the placeholder so a blocked or slow Instagram still looks intentional.
    blockquote.style.cssText =
      'background:var(--space);color:#fff;border:0;border-radius:1.5rem;margin:0;min-width:280px;max-width:540px;width:100%;min-height:420px;display:flex;align-items:center;justify-content:center;'
    const link = document.createElement('a')
    link.href = url
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.textContent = label
    link.style.cssText = 'display:block;padding:2rem;text-align:center;color:inherit;font-size:1.125rem;text-decoration:underline;text-underline-offset:6px;'
    blockquote.append(link)
    el.replaceChildren(blockquote)

    const process = () => window.instgrm?.Embeds.process()
    const existing = document.getElementById(SCRIPT_ID)
    if (existing) {
      process()
      return
    }
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.async = true
    script.src = 'https://www.instagram.com/embed.js'
    script.onload = process
    document.body.append(script)
  }, [near, url, label])

  return (
    <div className={cn('relative flex min-h-[420px] items-center justify-center', className)}>
      <div ref={box} className="w-full [&_iframe]:!min-w-0 [&_iframe]:rounded-3xl">
        {/* Placeholder until the embed is created. */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[420px] flex-col items-center justify-center gap-3 rounded-3xl bg-space p-8 text-center text-white"
        >
          <span className="rim-gradient size-14 rounded-full p-[3px]">
            <span className="block size-full rounded-full bg-space" />
          </span>
          <span className="font-display text-lg">{label}</span>
          <ExternalLink className="size-4 opacity-60" aria-hidden />
        </a>
      </div>
    </div>
  )
}
