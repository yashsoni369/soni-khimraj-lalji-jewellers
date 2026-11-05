// Renders every route in lib/routes.ts into its own HTML file (runs after both vite builds):
//   /                → dist/index.html
//   /bridal-jewellery → dist/bridal-jewellery.html  (served at the clean URL via vercel.json cleanUrls)
//   unknown paths    → dist/404.html
// Each file gets its own title, description, canonical, robots, og/twitter tags and JSON-LD.
// Also writes dist/sitemap.xml from the indexable routes.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const { render, ROUTES, NOT_FOUND_ROUTE, SITE_URL, canonicalUrl, pageJsonLd, fetchGoldRate, seedGoldRate, SEED_ELEMENT_ID } =
  await import(pathToFileURL(ssrEntry).href);

// Bake the IBJA rate into the HTML once per build, so crawlers that don't run
// JavaScript (ChatGPT, Claude, Perplexity) see real prices. Browsers still fetch
// the live rate. A failed fetch never fails the build: pages show "Loading…".
let goldRate = null;
try {
  goldRate = await fetchGoldRate();
  console.log(`prerender: IBJA rate ${goldRate.date} (22K ₹${goldRate.gold.k22.price}/10g)`);
} catch (err) {
  console.warn(`prerender: WARNING gold rate not baked in (${err?.message ?? err}); pages show "Loading…"`);
}
seedGoldRate(goldRate);
const goldRateScript = goldRate
  ? `<script id="${SEED_ELEMENT_ID}" type="application/json">${JSON.stringify(goldRate).replace(/</g, '\\u003c')}</script>`
  : '';

const template = readFileSync(path.join(dist, 'index.html'), 'utf-8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error(`prerender: "${marker}" not found in dist/index.html`);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setTag(html, regex, replacement, label) {
  if (!regex.test(html)) throw new Error(`prerender: ${label} not found in template`);
  return html.replace(regex, replacement);
}

function buildPage(route, url) {
  const appHtml = render(url);
  const h1 = (appHtml.match(/<h1\b/g) || []).length;
  if (h1 !== 1) throw new Error(`prerender: ${url} has ${h1} <h1>, expected 1`);
  if (route.key !== 'not_found' && appHtml.includes('Page not found')) {
    throw new Error(`prerender: ${url} rendered the 404 page – add it to the <Routes> in App.tsx`);
  }

  const canonical = canonicalUrl(route);
  const title = esc(route.title);
  const desc = esc(route.description);
  const robots = route.indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow';

  let html = template;
  html = setTag(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`, 'title');
  html = setTag(html, /(<meta name="description"\s+content=")[^"]*(")/, `$1${desc}$2`, 'description');
  html = setTag(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`, 'canonical');
  html = setTag(html, /(<meta name="robots" content=")[^"]*(")/, `$1${robots}$2`, 'robots');
  html = setTag(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`, 'og:url');
  html = setTag(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`, 'og:title');
  html = setTag(html, /(<meta property="og:description"\s+content=")[^"]*(")/, `$1${desc}$2`, 'og:description');
  html = setTag(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`, 'twitter:title');
  html = setTag(html, /(<meta name="twitter:description"\s+content=")[^"]*(")/, `$1${desc}$2`, 'twitter:description');

  // A 404 must not claim a canonical URL.
  if (route.key === 'not_found') html = html.replace(/\s*<link rel="canonical"[^>]*>/, '');

  // The LCP preload in index.html is the homepage hero; other pages have their own hero.
  if (route.key !== 'home') html = html.replace(/\s*<link rel="preload" as="image"[^>]*>/, '');

  const ld = pageJsonLd(route);
  if (ld) {
    const json = JSON.stringify(ld).replace(/</g, '\\u003c');
    html = html.replace('</head>', `  <script type="application/ld+json">${json}</script>\n</head>`);
  }

  if (goldRateScript) html = html.replace('</head>', `  ${goldRateScript}\n</head>`);

  return { html: html.replace(marker, `<div id="root">${appHtml}</div>`), kb: appHtml.length / 1024 };
}

for (const route of ROUTES) {
  const file = route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`;
  const { html, kb } = buildPage(route, route.path);
  writeFileSync(path.join(dist, file), html);
  console.log(`prerender: ${route.path.padEnd(28)} → ${file.padEnd(32)} ${kb.toFixed(1)} KB${route.indexable ? '' : '  (noindex)'}`);
}

const notFound = buildPage(NOT_FOUND_ROUTE, '/__not-found__');
writeFileSync(path.join(dist, '404.html'), notFound.html);
console.log('prerender: (unknown paths)'.padEnd(40), '→ 404.html');

// lastmod = when the page content really changed (route.updated), not the build
// time; the gold-rate page changes whenever the baked-in rate does.
// changefreq/priority are left out: Google and Bing ignore them.
const lastmod = (r) => (r.key === 'gold_rate' && goldRate && goldRate.date > r.updated ? goldRate.date : r.updated);
const indexable = ROUTES.filter((r) => r.indexable);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map(
    (r) => `  <url>
    <loc>${canonicalUrl(r)}</loc>
    <lastmod>${lastmod(r)}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
console.log(`prerender: sitemap.xml with ${indexable.length} URLs (${SITE_URL})`);

rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
