import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import type { CollectionCategory } from '@/lib/tracking';
import { whatsappUrl, createCategoryMessage, createPhotosMessage, createEnquiryMessage } from '../../services/whatsappService';
import { TrackedLink } from '../TrackedCTA';
import { StoreAddress } from '../Layout';
import { PageHero, heroPlate } from '../site/PageHero';
import { SectionHead } from '../site/SectionHead';
import { WhatsAppIcon } from '../site/icons';
import { PLATES, imgProps, type Plate } from '../site/media';

export const COLLECTIONS_HERO = heroPlate('hero-collections');

type Filter = 'all' | 'necklaces' | 'bangles' | 'earrings' | 'rings' | 'mangalsutra' | 'chains' | 'silver-diamond';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'necklaces', label: 'Necklaces' },
  { key: 'bangles', label: 'Bangles' },
  { key: 'earrings', label: 'Earrings' },
  { key: 'rings', label: 'Rings' },
  { key: 'mangalsutra', label: 'Mangalsutra' },
  { key: 'chains', label: 'Chains' },
  { key: 'silver-diamond', label: 'Silver & Diamond' },
];

type Item = {
  id: string;
  caption: string;
  ask: string;
  plate: Plate;
  filters: Filter[];
  category: CollectionCategory;
};

// Captions say what kind of piece the picture shows. No prices, weights or stock claims;
// the photos are illustrations (see PRODUCT.md imagery plan).
const ITEMS: Item[] = [
  { id: 'kundan-necklace', caption: 'Kundan necklace · 22K', ask: 'Kundan necklaces', plate: PLATES.kundanNecklace, filters: ['necklaces'], category: 'necklaces' },
  { id: 'gold-bangles', caption: 'Gold bangles · 22K', ask: 'gold bangles', plate: PLATES.goldBangles, filters: ['bangles'], category: 'bangles' },
  { id: 'mangalsutra', caption: 'Mangalsutra · 22K', ask: 'mangalsutras', plate: PLATES.mangalsutra, filters: ['mangalsutra'], category: 'mangalsutra' },
  { id: 'jhumkas', caption: 'Jhumka earrings · 22K', ask: 'jhumka earrings', plate: PLATES.jhumkas, filters: ['earrings'], category: 'earrings' },
  { id: 'gold-chains', caption: 'Gold chains · 22K', ask: 'gold chains', plate: PLATES.goldChains, filters: ['chains'], category: 'gold' },
  { id: 'gold-rings', caption: 'Gold rings · 22K', ask: 'gold rings', plate: PLATES.goldRings, filters: ['rings'], category: 'rings' },
  { id: 'diamond-studs', caption: 'Diamond studs · 18K', ask: 'diamond studs', plate: PLATES.diamondStuds, filters: ['earrings', 'silver-diamond'], category: 'diamond' },
  { id: 'silver-payal', caption: 'Silver payal', ask: 'silver payal', plate: PLATES.silverPayal, filters: ['silver-diamond'], category: 'silver' },
  { id: 'silver-pooja', caption: 'Silver pooja articles', ask: 'silver pooja articles', plate: PLATES.silverPooja, filters: ['silver-diamond'], category: 'silver' },
  { id: 'polki-choker', caption: 'Polki choker set', ask: 'polki choker sets', plate: PLATES.polkiChoker, filters: ['necklaces'], category: 'necklaces' },
];

// Categories the shop sells but we have no picture for yet.
const GHOSTS: { id: string; label: string; ask: string; filters: Filter[]; category: CollectionCategory }[] = [
  { id: 'ghost-pendants', label: 'Gold pendants', ask: 'gold pendants', filters: ['necklaces'], category: 'necklaces' },
  { id: 'ghost-diamond-rings', label: 'Diamond rings', ask: 'diamond rings', filters: ['rings', 'silver-diamond'], category: 'diamond' },
];

const TRAY_SIZES = '(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 92vw';

const askClass =
  'inline-flex min-h-[44px] items-center gap-2 text-[0.98rem] text-glass underline decoration-brass/70 underline-offset-[5px] hover:decoration-brass-hi';

const GhostOutline = () => (
  <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false" className="size-[38%] text-brass/55">
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round">
      <circle cx="60" cy="74" r="28" />
      <path d="M44 34 L52 20 H68 L76 34 L60 46 Z" />
    </g>
  </svg>
);

export const CollectionsPage = () => {
  const [filter, setFilter] = useState<Filter>('all');
  // The filter bar needs JavaScript, so it stays hidden until the page is interactive;
  // without JS every tray is simply shown.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const shows = (f: Filter[]) => filter === 'all' || f.includes(filter);
  const shownCount = ITEMS.filter((i) => shows(i.filters)).length;
  const label = FILTERS.find((f) => f.key === filter)!.label;

  return (
    <div className="bg-counter">
      <PageHero
        id="collections-h1"
        plate={COLLECTIONS_HERO}
        alt="A green velvet tray with gold bangles and a necklace on the glass counter of a jewellery shop"
        h1="Gold & Diamond Jewellery Designs in Ghatkopar"
        display={
          <>
            <span className="block text-brass">Pick a tray.</span>
            <span className="block">Ask Mr. Soni about it.</span>
          </>
        }
        lede="Necklaces, bangles, earrings, rings, mangalsutras and chains from our Jivdaya Lane shop in Ghatkopar West, BIS hallmarked."
      >
        <a href="#browse" className="btn btn-glass min-h-[52px] px-7 text-[1rem]">
          <span className="btn-in">Browse the trays</span>
        </a>
        <TrackedLink
          track={{ cta: 'whatsapp', location: 'collections_page', intent: 'catalogue_browse' }}
          href={whatsappUrl(createEnquiryMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="link-draw inline-flex min-h-[44px] items-center gap-2 text-[1.05rem] text-[#c6aa78]"
        >
          WhatsApp Mr. Soni →
        </TrackedLink>
      </PageHero>

      <section id="browse" aria-labelledby="browse-h" data-bg="#17392d" className="velvet-ground sec">
        <div className="wrap">
          <SectionHead
            id="browse-h"
            tone="velvet"
            title="Gold, Diamond & Silver Designs to Browse"
            display="The kinds of pieces we make and stock"
          />
          <p
            role="note"
            className="mt-6 max-w-[62ch] rounded-md border border-brass/40 bg-velvet-deep/70 px-5 py-4 text-[1.02rem] leading-relaxed text-glass"
          >
            <strong className="font-semibold text-brass-hi">These photos are illustrations.</strong> They show the kind
            of piece, not a particular one in the shop. Mr. Soni will share photos of the pieces we have right now on
            WhatsApp.
          </p>

          <div
            role="group"
            aria-label="Filter by category"
            // keeps its space before hydration (visibility, not display) so the grid doesn't shift
            className={`mt-[clamp(28px,3.5vw,48px)] flex flex-wrap gap-3 ${ready ? '' : 'invisible'}`}
          >
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
                className={`min-h-[44px] rounded-full px-5 text-[0.98rem] font-semibold ring-1 ring-inset transition-colors ${
                  filter === f.key
                    ? 'bg-brass text-brass-ink ring-brass'
                    : 'text-glass ring-brass/60 hover:bg-brass/20'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p aria-live="polite" className={`mt-4 text-[0.95rem] text-glass-soft ${ready ? '' : 'invisible'}`}>
            {filter === 'all' ? `Showing all ${ITEMS.length} trays` : `Showing ${shownCount} of ${ITEMS.length} trays: ${label}`}
          </p>

          <ul
            data-flip-grid
            className="mt-[clamp(28px,3.5vw,48px)] grid gap-x-[clamp(18px,2.5vw,36px)] gap-y-[clamp(44px,5vw,72px)] sm:grid-cols-2 lg:grid-cols-3"
          >
            {ITEMS.map((item) => (
              <li key={item.id} data-flip-item data-cat={item.filters.join(' ')} hidden={!shows(item.filters)} className="tray flex flex-col">
                <div className="tray-box">
                  <div className="tray-photo">
                    <img {...imgProps(item.plate, TRAY_SIZES)} data-loupe className="h-full w-full object-cover" />
                  </div>
                  <h3 className="tray-tag">{item.caption}</h3>
                </div>
                <div className="mt-9">
                  <TrackedLink
                    track={{ cta: 'whatsapp', location: 'collections_page', intent: 'catalogue_browse', category: item.category }}
                    href={whatsappUrl(createPhotosMessage(item.ask))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={askClass}
                  >
                    <WhatsAppIcon className="size-[18px] text-brass-hi" />
                    Ask on WhatsApp
                    <span className="sr-only"> about {item.caption}</span>
                  </TrackedLink>
                </div>
              </li>
            ))}
            {GHOSTS.map((g) => (
              <li key={g.id} data-flip-item data-cat={g.filters.join(' ')} hidden={!shows(g.filters)} className="flex flex-col">
                <div className="relative grid aspect-square place-items-center rounded-md border border-dashed border-brass/50 bg-velvet-deep/50">
                  <GhostOutline />
                  <h3 className="absolute inset-x-0 bottom-0 translate-y-1/2 mx-auto w-max max-w-[92%] rounded-[3px] border border-dashed border-brass/60 bg-counter px-3 py-1.5 text-center font-sans text-[0.8rem] font-semibold uppercase leading-tight tracking-[0.06em] text-brass-hi">
                    {g.label}
                  </h3>
                </div>
                <div className="mt-9">
                  <TrackedLink
                    track={{ cta: 'whatsapp', location: 'collections_page', intent: 'catalogue_browse', category: g.category }}
                    href={whatsappUrl(createPhotosMessage(g.ask))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={askClass}
                  >
                    <WhatsAppIcon className="size-[18px] text-brass-hi" />
                    Ask Mr. Soni for photos
                    <span className="sr-only"> of {g.label}</span>
                  </TrackedLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="ask" aria-labelledby="ask-h" data-bg="#0c0f0e" className="sec bg-counter-3">
        <div className="wrap">
          <SectionHead id="ask-h" title="Can't See Your Design? Ask Mr. Soni" display="We also make to order" />
          <p className="mt-6 max-w-[56ch] text-[clamp(1.05rem,1.4vw,1.25rem)] font-light leading-relaxed text-glass-soft">
            Tell us what you have in mind, or bring a picture, and we will tell you whether we have it or can make it.
            For weddings, see our{' '}
            <Link to="/bridal-jewellery" className="text-brass-hi underline underline-offset-4">
              bridal jewellery
            </Link>
            ; for today's rate, see the{' '}
            <Link to="/gold-rate-today-ghatkopar" className="text-brass-hi underline underline-offset-4">
              gold rate in Ghatkopar
            </Link>
            .
          </p>
          <TrackedLink
            track={{ cta: 'whatsapp', location: 'collections_page', intent: 'catalogue_browse', category: 'custom' }}
            href={whatsappUrl(createCategoryMessage('jewellery'))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-glass mt-8 min-h-[52px] px-7 text-[1rem]"
          >
            <span className="btn-in">
              <WhatsAppIcon className="size-5" /> Ask for the latest designs
            </span>
          </TrackedLink>
        </div>
      </section>

      <StoreAddress location="visit_block" />
    </div>
  );
};
