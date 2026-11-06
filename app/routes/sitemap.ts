// /sitemap.xml – resource route, server-rendered and CDN-cached for 1 h.
// lastmod = when the page content really changed (route.updated); for the gold-rate
// page that is also the date of the current IBJA rate. Not the build time.
// changefreq/priority are left out: Google and Bing ignore them.
import { getGoldRateOrNull } from '../../lib/goldRateCache';
import { canonicalUrl, ROUTES, type SiteRoute } from '../../lib/routes';

export const loader = async () => {
  const rate = await getGoldRateOrNull();
  const lastmod = (r: SiteRoute) => (r.key === 'gold_rate' && rate && rate.date > r.updated ? rate.date : r.updated);
  const urls = ROUTES.filter((r) => r.indexable).map(
    (r) => `  <url>\n    <loc>${canonicalUrl(r)}</loc>\n    <lastmod>${lastmod(r)}</lastmod>\n  </url>`,
  );
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
};
