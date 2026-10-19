import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'

import { site } from '@/content/site'
import { useI18n } from '@/lib/i18n'
import { useRoute } from '@/lib/router'

const WHATSAPP_PATH =
  'M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3ZM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8Zm8.4-18.2A11.8 11.8 0 0 0 1.8 17.8L.2 23.8l6.1-1.6A11.8 11.8 0 0 0 23.8 12c0-3.2-1.2-6.1-3.4-8.4Z'

/** Floating WhatsApp shortcut: appears after the hero and steps aside over the contact section. */
export function WhatsAppFab() {
  const { t } = useI18n()
  const { scrollY } = useScroll()
  const [pastHero, setPastHero] = useState(false)
  const [contactVisible, setContactVisible] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setPastHero(y > window.innerHeight * 0.6))

  const route = useRoute()
  useEffect(() => {
    const el = route === 'home' ? document.getElementById('contact') : null
    if (!el) return
    const io = new IntersectionObserver(([e]) => setContactVisible(e.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [route])

  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t.whatsappFab.message)}`
  // The contact section (and its own WhatsApp button) only exists on the home page.
  const show = pastHero && !(route === 'home' && contactVisible)

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.whatsappFab.label}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="fixed bottom-5 end-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-xl shadow-black/25 outline-none transition-colors hover:bg-[#1ebe5b] focus-visible:ring-4 focus-visible:ring-[#25D366]/40 md:bottom-8 md:end-8 md:px-5"
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-7 md:size-6">
            <path d={WHATSAPP_PATH} />
          </svg>
          <span className="hidden text-sm font-semibold md:inline">{t.whatsappFab.label}</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
