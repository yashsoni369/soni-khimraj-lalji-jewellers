// /collections - pre-rendered at build time (react-router.config.ts prerender).
import type { Route } from './+types/collections';
import { CollectionsPage, COLLECTIONS_HERO } from '../../components/pages/CollectionsPage';
import { heroPreload } from '../../components/site/PageHero';
import { metaFor, routeByKey } from '../../lib/routes';
import { pageJsonLd } from '../../lib/structuredData';

const route = routeByKey('collections');

export const meta: Route.MetaFunction = () => metaFor(route, pageJsonLd(route));

// LCP image: the hero plate.
export const links: Route.LinksFunction = () => [heroPreload(COLLECTIONS_HERO)];

export default function Collections() {
  return <CollectionsPage />;
}
