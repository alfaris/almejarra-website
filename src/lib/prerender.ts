/**
 * True when the page arrived with its content already in the HTML (see scripts/prerender.mjs).
 * Read when the app's modules load, before React replaces that markup, so above-the-fold intro
 * animations can start from their final state instead of hiding text the visitor already sees.
 */
export const PRERENDERED = typeof document !== 'undefined' && !!document.getElementById('root')?.hasChildNodes()
