import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { ar } from '@/content/ar'
import { en } from '@/content/en'
import type { Content, Lang } from '@/content/types'
import { HASH_ROUTING, hrefFor, navigate, useLocation } from '@/lib/router'

const dictionaries: Record<Lang, Content> = { ar, en }
const STORAGE_KEY = 'almejarra-lang'

// Standalone (hash-routed) builds keep the language in state; hosted builds read it from the URL.
function initialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (fromUrl === 'ar' || fromUrl === 'en') return fromUrl
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'ar' || saved === 'en') return saved
  } catch {
    // Storage can be unavailable (private mode); fall through to the default.
  }
  return 'ar'
}

interface I18nValue {
  lang: Lang
  dir: 'rtl' | 'ltr'
  t: Content
  setLang: (lang: Lang) => void
  toggleLang: () => void
  /** Where the language switch leads: the same page in the other language. */
  otherLangHref: string
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [stateLang, setStateLang] = useState<Lang>(initialLang)
  const lang: Lang = HASH_ROUTING ? stateLang : (location.lang ?? 'ar')
  const t = dictionaries[lang]
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const other: Lang = lang === 'ar' ? 'en' : 'ar'
  const otherLangHref = HASH_ROUTING ? `?lang=${other}` : hrefFor(other, location.route)

  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = dir
    const page = location.route === 'team' ? t.meta.team : t.meta
    document.title = page.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description)
  }, [lang, dir, t, location.route])

  const setLang = useCallback(
    (next: Lang) => {
      if (!HASH_ROUTING) {
        // Keep the visitor's place on the page by carrying the section hash over.
        const section = window.location.hash.slice(1) || undefined
        navigate(hrefFor(next, location.route, section))
        return
      }
      setStateLang(next)
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Ignore storage failures; the choice still applies for this visit.
      }
    },
    [location.route],
  )

  const value = useMemo<I18nValue>(
    () => ({ lang, dir, t, setLang, toggleLang: () => setLang(other), otherLangHref }),
    [lang, dir, t, setLang, other, otherLangHref],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}
