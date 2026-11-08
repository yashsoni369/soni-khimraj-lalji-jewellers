// Hero photos for the item pages (public/images/redesign). They are illustrative photographs of a
// jeweller's counter, not pieces the shop holds, so the alt text says only what is shown.
// `content.image` in content/pages.ts is untouched: it still feeds the JSON-LD.
import type { PageType } from '@/lib/routes';

const DIR = '/images/redesign/';

export type PageHero = { src: string; srcSet: string; width: number; height: number; alt: string };

const hero = (name: string, alt: string): PageHero => ({
  src: `${DIR}${name}-1280.webp`,
  srcSet: `${DIR}${name}-1280.webp 1280w, ${DIR}${name}-1920.webp 1920w`,
  width: 1920,
  height: 1072,
  alt,
});

export const PAGE_HEROES: Partial<Record<PageType, PageHero>> = {
  gold_rate: hero(
    'hero-goldrate',
    'An empty brass-cornered glass frame standing on a jewellery counter, with green velvet trays behind it – gold rate today in Ghatkopar',
  ),
  bridal: hero(
    'hero-bridal',
    'A kundan necklace with matching earrings and maang tikka on a green velvet tray, beside a carved wooden box on a glass counter – bridal jewellery in Ghatkopar West',
  ),
  old_gold_exchange: hero(
    'oldgold-touchstone',
    'A gold streak on a black touchstone beside a carved gold bangle on green velvet – old gold exchange in Ghatkopar West',
  ),
  silver: hero(
    'hero-silver',
    'Silver anklets, bangles, a diya and a small bowl on a green velvet tray, with a jewellery scale, a loupe and a touchstone on the counter – silver jewellery and articles in Ghatkopar',
  ),
  gold_dream_scheme: hero(
    'hero-scheme',
    'An open ledger with a brass stamp on a glass counter, beside a velvet tray of gold bangles – Gold Dream Scheme monthly gold savings',
  ),
};

/** `<link rel="preload">` descriptor for the hero (the page's LCP image). */
export const heroPreload = (key: PageType) => {
  const h = PAGE_HEROES[key];
  return h
    ? [
        {
          rel: 'preload',
          as: 'image',
          type: 'image/webp',
          href: h.src,
          imageSrcSet: h.srcSet,
          imageSizes: '100vw',
          fetchPriority: 'high',
        } as const,
      ]
    : [];
};
