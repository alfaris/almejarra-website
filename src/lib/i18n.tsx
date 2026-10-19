import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { ar } from '@/content/ar'
import { en } from '@/content/en'
import type { Content, Lang } from '@/content/types'

const dictionaries: Record<Lang, Content> = { ar, en }
const STORAGE_KEY = 'almejarra-lang'

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
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const t = dictionaries[lang]
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = dir
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang, dir, t])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Ignore storage failures; the choice still applies for this visit.
    }
  }, [])

  const value = useMemo<I18nValue>(
    () => ({ lang, dir, t, setLang, toggleLang: () => setLang(lang === 'ar' ? 'en' : 'ar') }),
    [lang, dir, t, setLang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}
