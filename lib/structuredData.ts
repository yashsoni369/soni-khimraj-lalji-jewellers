// Per-page JSON-LD, injected at build time by scripts/prerender.mjs.
// The site-wide JewelryStore + WebSite graph stays static in index.html.
import { FAQS, NEARBY_AREAS } from '../constants';
import { EDITORIAL_PAGES, PAGE_CONTENT, type PageFaq } from '../content/pages';
import { SITE_URL, canonicalUrl, type SiteRoute } from './routes';

const STORE_ID = `${SITE_URL}/#store`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const faqPage = (id: string, faqs: PageFaq[]) => ({
  '@type': 'FAQPage',
  '@id': id,
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export function pageJsonLd(route: SiteRoute): Record<string, unknown> | null {
  const url = canonicalUrl(route);

  if (route.key === 'home') {
    return { '@context': 'https://schema.org', ...faqPage(`${SITE_URL}/#faq`, FAQS.map((f) => ({ q: f.q, a: f.a }))) };
  }
  if (route.key === 'not_found') return null;

  const editorial = route.key === 'our_story' || route.key === 'collections' || route.key === 'gemstones' ? EDITORIAL_PAGES[route.key] : null;
  const content = editorial ? null : PAGE_CONTENT[route.key as keyof typeof PAGE_CONTENT];
  const image = editorial ? editorial.image : content!.image;
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: route.title,
      description: route.description,
      inLanguage: 'en-IN',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': STORE_ID },
      breadcrumb: { '@id': `${url}#breadcrumb` },
      primaryImageOfPage: `${SITE_URL}${image.src}`,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: route.name, item: url },
      ],
    },
  ];

  if (content?.serviceType) {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: content.h1,
      serviceType: content.serviceType,
      description: route.description,
      url,
      provider: { '@id': STORE_ID },
      areaServed: NEARBY_AREAS.map((name) => ({ '@type': 'Place', name: `${name}, Mumbai` })),
    });
  }
  if (content && content.faqs.length) graph.push(faqPage(`${url}#faq`, content.faqs));

  return { '@context': 'https://schema.org', '@graph': graph };
}
