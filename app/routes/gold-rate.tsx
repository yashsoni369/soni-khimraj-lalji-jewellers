// /gold-rate-today-ghatkopar – server-rendered on request so the IBJA rate is in the HTML.
import type { Route } from './+types/gold-rate';
import { ServicePage } from '../../components/ServicePage';
import { PAGE_CONTENT } from '../../content/pages';
import { getGoldRateOrNull } from '../../lib/goldRateCache';
import { SSR_PAGE_CACHE } from '../../lib/pageCache';
import { metaFor, routeByKey } from '../../lib/routes';
import { pageJsonLd } from '../../lib/structuredData';

const route = routeByKey('gold_rate');

export const loader = async () => ({ rate: await getGoldRateOrNull() });

export const headers: Route.HeadersFunction = () => ({ 'Cache-Control': SSR_PAGE_CACHE });

export const meta: Route.MetaFunction = () => metaFor(route, pageJsonLd(route));

export default function GoldRate() {
  return <ServicePage content={PAGE_CONTENT.gold_rate} />;
}
