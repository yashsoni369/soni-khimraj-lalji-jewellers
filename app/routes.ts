// URL → route module. Paths come from lib/routes.ts (single source of truth).
import { type RouteConfig, route, index } from '@react-router/dev/routes';
import { routeByKey } from '../lib/routes';

const path = (key: Parameters<typeof routeByKey>[0]) => routeByKey(key).path;

export default [
  // Server-rendered on request (live rate in the HTML, CDN-cached)
  index('routes/home.tsx'),
  route(path('gold_rate'), 'routes/gold-rate.tsx'),
  // Pre-rendered at build time (react-router.config.ts `prerender`)
  route(path('bridal'), 'routes/service.tsx', { id: 'bridal' }),
  route(path('old_gold_exchange'), 'routes/service.tsx', { id: 'old_gold_exchange' }),
  route(path('silver'), 'routes/service.tsx', { id: 'silver' }),
  route(path('gold_dream_scheme'), 'routes/service.tsx', { id: 'gold_dream_scheme' }),
  route(path('our_story'), 'routes/our-story.tsx'),
  route(path('collections'), 'routes/collections.tsx'),
  route(path('gemstones'), 'routes/gemstones.tsx'),
  route('sitemap.xml', 'routes/sitemap.ts'),
  // Resource route (JSON API)
  route('api/gold-rate', 'routes/api.gold-rate.ts'),
  // Everything else: real 404
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
