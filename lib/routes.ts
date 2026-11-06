// Single source of truth for every URL on the site. Used by app/routes.ts, the
// sitemap (app/routes/sitemap.ts) and
// per-route <head> tags (metaFor, used by each route module's `meta` export).

export const SITE_URL = 'https://www.sonikhimrajlaljijewellers.com';

export type PageType =
  | 'home'
  | 'gold_rate'
  | 'bridal'
  | 'old_gold_exchange'
  | 'silver'
  | 'gold_dream_scheme'
  | 'not_found';

export interface SiteRoute {
  key: PageType;
  path: string;
  /** <title>, ~60 chars */
  title: string;
  /** meta description, ~155 chars */
  description: string;
  /** Short name for breadcrumbs and nav */
  name: string;
  /** false = noindex, left out of the sitemap and nav */
  indexable: boolean;
  /** Date the page content last really changed (sitemap <lastmod>). Bump it when you edit the page. */
  updated: string;
}

export const ROUTES: SiteRoute[] = [
  {
    key: 'home',
    path: '/',
    title: 'Jewellers in Ghatkopar West, Mumbai | Soni Khimraj Lalji Jewellers',
    description:
      "BIS hallmarked 916 gold, diamond, silver & bridal jewellery in Ghatkopar West, Mumbai for 25+ years. Visit us on Jivdaya Lane or WhatsApp for today's gold rate.",
    name: 'Home',
    indexable: true,
    updated: '2026-11-05',
  },
  {
    key: 'gold_rate',
    path: '/gold-rate-today-ghatkopar',
    title: 'Gold Rate Today in Ghatkopar, Mumbai (22K, 24K, 18K) | Soni Khimraj Lalji',
    description:
      "Today's IBJA gold rate for 24K (999), 22K (916) and 18K (750) per 10 grams, plus silver per kg. Get our Ghatkopar West shop rate on WhatsApp.",
    name: 'Gold Rate Today',
    indexable: true,
    updated: '2026-11-05',
  },
  {
    key: 'bridal',
    path: '/bridal-jewellery',
    title: 'Bridal Jewellery in Ghatkopar West, Mumbai | Soni Khimraj Lalji Jewellers',
    description:
      'Bridal Kundan & Polki sets, BIS hallmarked gold necklaces, mangalsutras and custom bridal jewellery in Ghatkopar West. Book a relaxed visit with your family.',
    name: 'Bridal Jewellery',
    indexable: true,
    updated: '2026-11-05',
  },
  {
    key: 'old_gold_exchange',
    path: '/old-gold-exchange',
    title: 'Old Gold Exchange in Ghatkopar West, Mumbai | Soni Khimraj Lalji Jewellers',
    description:
      'Exchange your old gold for new jewellery in Ghatkopar West. Purity tested in front of you and its value given against new BIS hallmarked designs.',
    name: 'Old Gold Exchange',
    indexable: true,
    updated: '2026-11-05',
  },
  {
    key: 'silver',
    path: '/silver-jewellery',
    title: 'Silver Jewellery & Articles in Ghatkopar, Mumbai | Soni Khimraj Lalji',
    description:
      'Silver jewellery, gift articles and pooja items at Soni Khimraj Lalji Jewellers, Jivdaya Lane, Ghatkopar West. Ask for our latest silver catalogue on WhatsApp.',
    name: 'Silver Jewellery',
    indexable: true,
    updated: '2026-11-05',
  },
  {
    // TODO(owner): set indexable: true once the scheme terms are on the page.
    key: 'gold_dream_scheme',
    path: '/gold-dream-scheme',
    title: 'Gold Dream Scheme – Monthly Gold Savings | Soni Khimraj Lalji Jewellers',
    description:
      'Save every month towards your gold jewellery with the Gold Dream Scheme at Soni Khimraj Lalji Jewellers, Ghatkopar West.',
    name: 'Gold Dream Scheme',
    indexable: false,
    updated: '2026-11-05',
  },
];

export const NOT_FOUND_ROUTE: SiteRoute = {
  key: 'not_found',
  path: '/404',
  title: 'Page not found | Soni Khimraj Lalji Jewellers',
  description: 'This page does not exist. Visit our homepage for jewellery, gold rates and our Ghatkopar West shop address.',
  name: 'Page not found',
  indexable: false,
  updated: '2026-11-05',
};

const normalise = (pathname: string) => (pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname);

export function routeFor(pathname: string): SiteRoute {
  const p = normalise(pathname);
  return ROUTES.find((r) => r.path === p) ?? NOT_FOUND_ROUTE;
}

export function routeByKey(key: PageType): SiteRoute {
  return ROUTES.find((r) => r.key === key) ?? NOT_FOUND_ROUTE;
}

export function pageTypeFor(pathname: string): PageType {
  return routeFor(pathname).key;
}

export const canonicalUrl = (route: SiteRoute) => `${SITE_URL}${route.path === '/' ? '/' : route.path}`;

const ROBOTS_INDEX = 'index, follow, max-image-preview:large';
const ROBOTS_NOINDEX = 'noindex, follow';

/**
 * <head> tags for a route, in React Router `meta` descriptor format. Site-wide tags
 * (og:type, og:image, twitter:card, icons, global JSON-LD) live in app/root.tsx.
 */
export function metaFor(route: SiteRoute, jsonLd: Record<string, unknown> | null) {
  const url = canonicalUrl(route);
  const notFound = route.key === 'not_found';
  return [
    { title: route.title },
    { name: 'description', content: route.description },
    ...(notFound ? [] : [{ tagName: 'link', rel: 'canonical', href: url }]),
    { name: 'robots', content: route.indexable ? ROBOTS_INDEX : ROBOTS_NOINDEX },
    { property: 'og:url', content: url },
    { property: 'og:title', content: route.title },
    { property: 'og:description', content: route.description },
    { name: 'twitter:title', content: route.title },
    { name: 'twitter:description', content: route.description },
    ...(jsonLd ? [{ 'script:ld+json': jsonLd }] : []),
  ];
}
