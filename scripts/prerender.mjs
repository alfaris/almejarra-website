// Renders each built page in headless Chromium and writes the result into its dist/ HTML, so the
// text is there before JavaScript runs: search engines and link previews read the whole page, and
// visitors see the content at once. React then takes over on load (see src/lib/prerender.ts).
// Runs after `vite build`; needs Chromium (`npx playwright install chromium`).
import { createServer } from 'node:http'
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const pages = ['', 'en/', 'team/', 'en/team/']

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
}

// A minimal static server for dist/, enough for the pages to load as they would on the host.
const server = createServer((req, res) => {
  let path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '')
  let file = join(dist, path)
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
  if (!existsSync(file)) {
    res.writeHead(404).end()
    return
  }
  res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' })
  res.end(readFileSync(file))
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const origin = `http://127.0.0.1:${server.address().port}/`

// No WebGL: the galaxy is decoration, and the nebula backdrop stands in for it.
const browser = await chromium.launch({ args: ['--disable-3d-apis'] })
try {
  for (const path of pages) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
    const errors = []
    page.on('pageerror', (e) => errors.push(e.message))
    await page.goto(origin + path, { waitUntil: 'networkidle' })
    await page.waitForSelector('#root > *')

    // Scroll through once so every reveal-on-scroll block reaches its final state, then back up.
    const height = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < height; y += 400) {
      await page.evaluate((top) => window.scrollTo(0, top), y)
      await page.waitForTimeout(120)
    }
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(1500)

    const markup = await page.evaluate(() => {
      const root = document.getElementById('root')
      root.querySelectorAll('canvas').forEach((c) => c.remove())
      return root.innerHTML
    })
    if (errors.length) throw new Error(`/${path}: ${errors.join('; ')}`)

    const file = join(dist, path, 'index.html')
    const html = readFileSync(file, 'utf8')
    const empty = /<div id="root">[\s\S]*?<\/div>(?=\s*<noscript>)/
    if (!empty.test(html)) throw new Error(`/${path}: no #root placeholder in ${file}`)
    writeFileSync(file, html.replace(empty, () => `<div id="root">${markup}</div>`))
    const words = (await page.evaluate(() => document.getElementById('root').innerText)).split(/\s+/).length
    console.log(`Prerendered /${path} (${words} words)`)
    await page.close()
  }
} finally {
  await browser.close()
  server.close()
}
