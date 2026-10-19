/**
 * Absolute path of the site root, from the page's <meta name="app-root"> ("./" on /, "../" on /en/,
 * "../../" on /en/team/). Asset and page URLs are built from it so they resolve from any page,
 * including when the site lives in a sub-folder.
 */
export const SITE_ROOT = new URL(
  document.querySelector('meta[name="app-root"]')?.getAttribute('content') ?? './',
  window.location.href,
).pathname

export const assetUrl = (path: string) => `${SITE_ROOT}${path}`
