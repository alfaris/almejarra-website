import { useSyncExternalStore, type MouseEvent } from 'react'

import type { Lang } from '@/content/types'
import { SITE_ROOT } from '@/lib/paths'

export type Route = 'home' | 'team'

/**
 * Two routing modes:
 * - Hosted builds use real URLs (/, /en/, /team/, /en/team/), each with its own generated HTML page,
 *   so search engines see a language and a page per address.
 * - The standalone build (one self-contained index.html that also opens from file://) uses
 *   hash routes (#/team) and keeps the language in state, since paths don't exist on disk.
 */
export const HASH_ROUTING = import.meta.env.MODE === 'standalone'

const NAV_EVENT = 'almejarra:navigate'
const TEAM_HASH = '#/team'

const ROOT = SITE_ROOT

function snapshot(): string {
  if (HASH_ROUTING) return window.location.hash.startsWith(TEAM_HASH) ? 'team|' : 'home|'
  const parts = decodeURI(window.location.pathname).slice(ROOT.length).split('/').filter(Boolean)
  const lang = parts[0] === 'en' ? 'en' : 'ar'
  const page = parts[lang === 'en' ? 1 : 0]
  return `${page === 'team' ? 'team' : 'home'}|${lang}`
}

function subscribe(cb: () => void) {
  window.addEventListener('hashchange', cb)
  window.addEventListener('popstate', cb)
  window.addEventListener(NAV_EVENT, cb)
  return () => {
    window.removeEventListener('hashchange', cb)
    window.removeEventListener('popstate', cb)
    window.removeEventListener(NAV_EVENT, cb)
  }
}

function parse(s: string) {
  const [route, lang] = s.split('|')
  return { route: route as Route, lang: (lang || null) as Lang | null }
}

/** The current page, and the language the URL names (null in hash mode, where i18n decides). */
export function useLocation() {
  return parse(useSyncExternalStore(subscribe, snapshot, () => 'home|ar'))
}

export const useRoute = () => useLocation().route

export function currentLocation() {
  return parse(snapshot())
}

/** The URL of a page, optionally at a home-page section. */
export function hrefFor(lang: Lang, route: Route, section?: string) {
  if (HASH_ROUTING) return route === 'team' ? TEAM_HASH : `#${section ?? 'top'}`
  return `${ROOT}${lang === 'en' ? 'en/' : ''}${route === 'team' ? 'team/' : ''}${section ? `#${section}` : ''}`
}

export function navigate(href: string) {
  if (HASH_ROUTING) {
    window.location.hash = href
    return
  }
  window.history.pushState(null, '', href)
  window.dispatchEvent(new Event(NAV_EVENT))
}

/** Click handler for internal links: navigates in place, leaving modified clicks (new tab etc.) native. */
export function onLinkClick(href: string) {
  return (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(href)
  }
}
