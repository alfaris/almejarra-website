import type Lenis from 'lenis'

let lenis: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenis = instance
}

/** Smoothly scroll to a section id, offset for the fixed navbar. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -72 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}
