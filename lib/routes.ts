// Single source of truth for every URL on the site. Used by the router (App.tsx),
// the build-time prerender (scripts/prerender.mjs: head tags, sitemap) and
// client-side title updates (hooks/usePageMeta.ts).

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
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly';
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
    priority: 1.0,
    changefreq: 'weekly',
  },
  {
    key: 'gold_rate',
    path: '/gold-rate-today-ghatkopar',
    title: 'Gold Rate Today in Ghatkopar, Mumbai (22K, 24K, 18K) | Soni Khimraj Lalji',
    description:
      "Today's IBJA gold rate for 24K (999), 22K (916) and 18K (750) per 10 grams, plus silver per kg. Get our Ghatkopar West shop rate on WhatsApp.",
    name: 'Gold Rate Today',
    indexable: true,
    priority: 0.9,
    changefreq: 'daily',
  },
  {
    key: 'bridal',
    path: '/bridal-jewellery',
    title: 'Bridal Jewellery in Ghatkopar West, Mumbai | Soni Khimraj Lalji Jewellers',
    description:
      'Bridal Kundan & Polki sets, BIS hallmarked gold necklaces, mangalsutras and custom bridal jewellery in Ghatkopar West. Book a relaxed visit with your family.',
    name: 'Bridal Jewellery',
    indexable: true,
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    key: 'old_gold_exchange',
    path: '/old-gold-exchange',
    title: 'Old Gold Exchange in Ghatkopar West, Mumbai | Soni Khimraj Lalji Jewellers',
    description:
      'Exchange your old gold for new jewellery in Ghatkopar West. Purity tested in front of you and its value given against new BIS hallmarked designs.',
    name: 'Old Gold Exchange',
    indexable: true,
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    key: 'silver',
    path: '/silver-jewellery',
    title: 'Silver Jewellery & Articles in Ghatkopar, Mumbai | Soni Khimraj Lalji',
    description:
      'Silver jewellery, gift articles and pooja items at Soni Khimraj Lalji Jewellers, Jivdaya Lane, Ghatkopar West. Ask for our latest silver catalogue on WhatsApp.',
    name: 'Silver Jewellery',
    indexable: true,
    priority: 0.7,
    changefreq: 'monthly',
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
    priority: 0.7,
    changefreq: 'monthly',
  },
];

export const NOT_FOUND_ROUTE: SiteRoute = {
  key: 'not_found',
  path: '/404',
  title: 'Page not found | Soni Khimraj Lalji Jewellers',
  description: 'This page does not exist. Visit our homepage for jewellery, gold rates and our Ghatkopar West shop address.',
  name: 'Page not found',
  indexable: false,
  priority: 0,
  changefreq: 'monthly',
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
