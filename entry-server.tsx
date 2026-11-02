// Build-time prerender entry. `npm run build` bundles this with `vite build --ssr`,
// then scripts/prerender.mjs injects the HTML into dist/index.html so crawlers,
// link previews and AI search see the full page without running JavaScript.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppShell } from './App';

export function render(url = '/') {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </React.StrictMode>
  );
}
