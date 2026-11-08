// /gemstones - pre-rendered at build time (react-router.config.ts prerender).
import type { Route } from './+types/gemstones';
import { GemstonesPage, GEMSTONES_HERO } from '../../components/pages/GemstonesPage';
import { heroPreload } from '../../components/site/PageHero';
import { metaFor, routeByKey } from '../../lib/routes';
import { pageJsonLd } from '../../lib/structuredData';

const route = routeByKey('gemstones');

export const meta: Route.MetaFunction = () => metaFor(route, pageJsonLd(route));

// LCP image: the hero plate.
export const links: Route.LinksFunction = () => [heroPreload(GEMSTONES_HERO)];

export default function Gemstones() {
  return <GemstonesPage />;
}
