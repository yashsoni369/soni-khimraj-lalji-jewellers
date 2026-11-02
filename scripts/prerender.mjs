// Injects the server-rendered app into dist/index.html (runs after both vite builds).
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = process.cwd();
const htmlPath = path.join(root, 'dist', 'index.html');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const { render } = await import(pathToFileURL(ssrEntry).href);
const appHtml = render('/');

const template = readFileSync(htmlPath, 'utf-8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) {
  throw new Error(`prerender: "${marker}" not found in dist/index.html`);
}
writeFileSync(htmlPath, template.replace(marker, `<div id="root">${appHtml}</div>`));
rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });

const h1 = (appHtml.match(/<h1\b/g) || []).length;
console.log(`prerender: injected ${(appHtml.length / 1024).toFixed(1)} KB of HTML (${h1} h1)`);
if (h1 !== 1) throw new Error(`prerender: expected exactly 1 <h1>, found ${h1}`);
