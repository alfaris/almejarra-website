import type { SocialId } from '@/content/site'

// Simple brand glyphs (lucide dropped brand icons).
const paths: Record<SocialId, string> = {
  facebook: 'M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v8h4v-8H16l.5-4h-3V8.9c0-.6.4-.9 1-.9Z',
  instagram:
    'M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.9-8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5Zm3 15a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10Z',
  x: 'M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.3L5.6 21h-3l7.1-8.1L2.2 3h6.2l4.3 5.7L17.8 3Zm-1 16.2h1.7L7.3 4.7H5.5l11.3 14.5Z',
  linkedin:
    'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.1c.5-1 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6v5.4h-4v-4.8c0-1.2 0-2.6-1.6-2.6s-1.9 1.3-1.9 2.5v4.9h-4v-11Z',
  youtube:
    'M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-4.8.5-4.8s0-3.2-.5-4.8ZM9.8 15V9l5.8 3-5.8 3Z',
}

export function SocialIcon({ id, className }: { id: SocialId; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d={paths[id]} />
    </svg>
  )
}
