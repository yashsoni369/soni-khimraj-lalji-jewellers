// /our-story - pre-rendered at build time (react-router.config.ts prerender).
import type { Route } from './+types/our-story';
import { OurStoryPage, OUR_STORY_HERO } from '../../components/pages/OurStoryPage';
import { heroPreload } from '../../components/site/PageHero';
import { metaFor, routeByKey } from '../../lib/routes';
import { pageJsonLd } from '../../lib/structuredData';

const route = routeByKey('our_story');

export const meta: Route.MetaFunction = () => metaFor(route, pageJsonLd(route));

// LCP image: the hero plate.
export const links: Route.LinksFunction = () => [heroPreload(OUR_STORY_HERO)];

export default function OurStory() {
  return <OurStoryPage />;
}
