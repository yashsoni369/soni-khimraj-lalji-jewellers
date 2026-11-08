// Static service pages (bridal, old gold, silver, scheme), pre-rendered at build time.
// One module, registered once per page in app/routes.ts with the page key as route id.
import { useMatches } from 'react-router';
import type { Route } from './+types/service';
import { ServicePage } from '../../components/ServicePage';
import { PAGE_CONTENT } from '../../content/pages';
import { metaFor, routeByKey, type PageType } from '../../lib/routes';
import { pageJsonLd } from '../../lib/structuredData';

type ServiceKey = Exclude<PageType, 'home' | 'gold_rate' | 'not_found' | 'our_story' | 'collections' | 'gemstones'>;

export const meta: Route.MetaFunction = ({ matches }) => {
  const route = routeByKey(matches[matches.length - 1].id as ServiceKey);
  return metaFor(route, pageJsonLd(route));
};

export default function Service() {
  const matches = useMatches();
  const key = matches[matches.length - 1].id as ServiceKey;
  return <ServicePage content={PAGE_CONTENT[key]} />;
}
