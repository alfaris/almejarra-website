import type Lenis from 'lenis'

import { TEAM_HASH } from './router'

let lenis: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenis = instance
}

/** Smoothly scroll to a section id, offset for the fixed navbar. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el || window.location.hash.startsWith(TEAM_HASH)) {
    // Sections live on the home page: switching the hash routes there, and App scrolls once it renders.
    window.location.hash = id
    return
  }
  if (lenis) {
    // The page height may have just changed (route switch), so re-measure before scrolling.
    lenis.resize()
    lenis.scrollTo(el, { offset: -72 })
  }
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}
