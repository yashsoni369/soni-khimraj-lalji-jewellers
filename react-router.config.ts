import type { Config } from '@react-router/dev/config';
import { vercelPreset } from '@vercel/react-router/vite';

// Hybrid rendering:
//  - `/` and `/gold-rate-today-ghatkopar` are server-rendered on request (they show the
//    live IBJA rate in the HTML) and cached by the CDN via each route's `headers`.
//  - Every other page is pre-rendered to static HTML at build time.
// `presets: [vercelPreset()]` only tells the build how to package for Vercel; all
// behaviour (loaders, headers, caching) lives in our route code.
export default {
  ssr: true,
  prerender: [
    '/bridal-jewellery',
    '/old-gold-exchange',
    '/silver-jewellery',
    '/gold-dream-scheme',
    '/our-story',
    '/collections',
    '/gemstones',
  ],
  presets: [vercelPreset()],
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },
} satisfies Config;
