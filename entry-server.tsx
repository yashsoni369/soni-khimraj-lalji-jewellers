// Build-time prerender entry. `npm run build` bundles this with `vite build --ssr`,
// then scripts/prerender.mjs renders every route in lib/routes.ts to its own HTML
// file so crawlers, link previews and AI search see full pages without JavaScript.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppShell } from './App';

export { ROUTES, NOT_FOUND_ROUTE, SITE_URL, canonicalUrl } from './lib/routes';
export { pageJsonLd } from './lib/structuredData';

export function render(url = '/') {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </React.StrictMode>
  );
}
