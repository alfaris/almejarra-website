import type Lenis from 'lenis'

import { currentLocation, hrefFor, navigate } from './router'

let lenis: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenis = instance
}

/** Smoothly scroll to a home-page section, offset for the fixed navbar; from another page, go home first. */
export function scrollToId(id: string) {
  const { route, lang } = currentLocation()
  const el = document.getElementById(id)
  if (!el || route !== 'home') {
    // App scrolls to the section once the home page renders.
    navigate(hrefFor(lang ?? (document.documentElement.lang === 'en' ? 'en' : 'ar'), 'home', id))
    return
  }
  if (lenis) {
    // The page height may have just changed (route switch), so re-measure before scrolling.
    lenis.resize()
    lenis.scrollTo(el, { offset: -72 })
  } else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}
