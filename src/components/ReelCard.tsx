import { useRef, useState } from 'react'
import { ExternalLink, Play } from 'lucide-react'

import { SocialIcon } from '@/components/SocialIcon'
import { cn } from '@/lib/utils'

/**
 * A self-hosted copy of an Instagram reel in a themed card: the cover shows until play is
 * pressed, then the video plays in place. The video file only downloads on play.
 */
export function ReelCard({
  video,
  poster,
  instagramUrl,
  playLabel,
  linkLabel,
  className,
}: {
  video: string
  poster: string
  instagramUrl: string
  playLabel: string
  linkLabel: string
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const play = () => {
    setPlaying(true)
    // Start in the same click so browsers allow sound; if playback is refused, the native controls remain.
    ref.current?.play().catch(() => {})
  }

  return (
    <div className={cn('mx-auto w-full max-w-[380px]', className)}>
      <div className="group relative aspect-[9/16] overflow-hidden rounded-[1.75rem] bg-space shadow-2xl shadow-primary/20">
        <video
          ref={ref}
          src={video}
          poster={poster}
          preload="none"
          playsInline
          controls={playing}
          onEnded={() => setPlaying(false)}
          className="absolute inset-0 size-full object-cover"
        />
        {!playing && (
          <button
            type="button"
            onClick={play}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-space/70 via-transparent to-space/20 outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-star/60"
          >
            <span className="absolute start-4 top-4 inline-flex items-center gap-2 rounded-full bg-space/50 px-3 py-1.5 text-xs text-white backdrop-blur" aria-hidden>
              <SocialIcon id="instagram" className="size-3.5" />
              Reel
            </span>
            <span
              className="rim-gradient flex size-20 items-center justify-center rounded-full p-[3px] shadow-2xl shadow-black/40 transition-transform duration-500 group-hover:scale-110"
              aria-hidden
            >
              <span className="flex size-full items-center justify-center rounded-full bg-space/75 backdrop-blur">
                <Play className="ms-1 size-8 fill-white text-white" />
              </span>
            </span>
            <span className="sr-only">{playLabel}</span>
          </button>
        )}
      </div>
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
      >
        <SocialIcon id="instagram" className="size-4" />
        {linkLabel}
        <ExternalLink className="size-3.5 opacity-60" aria-hidden />
      </a>
    </div>
  )
}
