// /gold-rate-today-ghatkopar – server-rendered on request so the IBJA rate is in the HTML.
import type { Route } from './+types/gold-rate';
import { ServicePage } from '../../components/ServicePage';
import { GoldRateTables } from '../../components/GoldRateTables';
import { PAGE_CONTENT } from '../../content/pages';
import { formatDayMonth, formatInr, type GoldRate } from '../../lib/goldRate';
import { getGoldHistoryOrNull, getGoldRateOrNull } from '../../lib/goldRateCache';
import { SSR_PAGE_CACHE } from '../../lib/pageCache';
import { metaFor, routeByKey, type SiteRoute } from '../../lib/routes';
import { heroPreload } from '../../components/site/pageHeroes';
import { pageJsonLd } from '../../lib/structuredData';

const route = routeByKey('gold_rate');

export const loader = async () => {
  const [rate, history] = await Promise.all([getGoldRateOrNull(), getGoldHistoryOrNull()]);
  return { rate, history };
};

export const headers: Route.HeadersFunction = () => ({ 'Cache-Control': SSR_PAGE_CACHE });

// With a live rate, the title carries its date and the description its prices (what searchers
// compare in the results). Without one, the static title and description from lib/routes.ts.
function withRate(rate: GoldRate | null | undefined): SiteRoute {
  if (!rate) return route;
  const day = formatDayMonth(rate.date);
  const { k24, k22, k18 } = rate.gold;
  return {
    ...route,
    title: `Gold Rate Today in Ghatkopar, Mumbai (${day}): 22K 916, 24K, 18K`,
    description:
      `22K (916) gold in Ghatkopar today: ${formatInr(k22.price)} per 10 g · 24K (999) ${formatInr(k24.price)} · ` +
      `18K (750) ${formatInr(k18.price)} (IBJA, ${day}).${rate.silver ? ' Silver per kg too.' : ''} Get our shop rate on WhatsApp.`,
  };
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  const rate = loaderData?.rate;
  const r = withRate(rate);
  return metaFor(r, pageJsonLd(r, { dateModified: rate?.date }));
};

// LCP image: the hero photo behind the rate card.
export const links: Route.LinksFunction = () => heroPreload('gold_rate');

export default function GoldRate({ loaderData }: Route.ComponentProps) {
  const content = PAGE_CONTENT.gold_rate;
  return (
    <ServicePage
      content={content}
      afterHero={
        content.rateTables && <GoldRateTables copy={content.rateTables} rate={loaderData.rate} history={loaderData.history} />
      }
    />
  );
}
