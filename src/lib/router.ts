import { useSyncExternalStore } from 'react'

export type Route = 'home' | 'team'

/** Hash routes keep the build server-free: they work from file:// and on any static host. */
export const TEAM_HASH = '#/team'

function currentRoute(): Route {
  return window.location.hash.startsWith(TEAM_HASH) ? 'team' : 'home'
}

function subscribe(cb: () => void) {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}

export function useRoute() {
  return useSyncExternalStore(subscribe, currentRoute, () => 'home' as Route)
}

export function goToTeam() {
  window.location.hash = TEAM_HASH
}
