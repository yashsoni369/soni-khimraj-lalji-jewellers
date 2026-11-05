// `/` – server-rendered on request so the IBJA rate is in the HTML.
import type { Route } from './+types/home';
import { HomePage } from '../../App';
import { getGoldRateOrNull } from '../../lib/goldRateCache';
import { SSR_PAGE_CACHE } from '../../lib/pageCache';
import { metaFor, routeByKey } from '../../lib/routes';
import { pageJsonLd } from '../../lib/structuredData';

const route = routeByKey('home');

export const loader = async () => ({ rate: await getGoldRateOrNull() });

export const headers: Route.HeadersFunction = () => ({ 'Cache-Control': SSR_PAGE_CACHE });

export const meta: Route.MetaFunction = () => metaFor(route, pageJsonLd(route));

// LCP image: the first hero slide.
export const links: Route.LinksFunction = () => [
  { rel: 'preload', as: 'image', type: 'image/webp', href: '/images/bridal-pearl-necklace-ghatkopar.webp', fetchPriority: 'high' },
];

export default function Home() {
  return <HomePage />;
}
