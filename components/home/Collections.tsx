import type { ReactNode } from 'react';
import {
  whatsappUrl,
  createCategoryMessage,
  createOccasionMessage,
} from '../../services/whatsappService';
import type { CollectionCategory } from '@/lib/tracking';
import { TrackedLink } from '../TrackedCTA';
import { BookVisitButton } from '../BookVisit';
import { SectionHead } from '../site/SectionHead';
import { WhatsAppIcon } from '../site/icons';
import { PLATES, imgProps, type Plate } from '../site/media';

// Collections: the occasions stack (each tray slides over the last on desktop, pure CSS sticky;
// [data-stack] lets the motion layer add the sink-back) and the four category rows (H3s kept word for word).

type Occasion = { label: string; title: string; text: string; plate: Plate; cta: ReactNode };

const ctaClass =
  'inline-flex min-h-[44px] items-center gap-2 text-[1rem] text-brass-hi underline decoration-brass/60 underline-offset-[5px] hover:decoration-brass-hi';

const OCCASIONS: Occasion[] = [
  {
    label: 'Daily wear',
    title: 'Chains, bangles and studs you never take off',
    text: '22K and 18K, BIS hallmarked, light enough for every day.',
    plate: PLATES.goldBangles,
    cta: (
      <TrackedLink
        track={{ cta: 'whatsapp', location: 'occasions', intent: 'catalogue_browse', category: 'gold' }}
        href={whatsappUrl(createOccasionMessage('daily wear gold jewellery'))}
        target="_blank"
        rel="noopener noreferrer"
        className={ctaClass}
      >
        <WhatsAppIcon className="size-[18px]" /> Ask about daily wear →
      </TrackedLink>
    ),
  },
  {
    label: 'Festive',
    title: 'Jhumkas and necklaces for Diwali, Dhanteras and Akshaya Tritiya',
    text: 'Buy on the day you choose; we’re open every day.',
    plate: PLATES.jhumkas,
    cta: (
      <TrackedLink
        track={{ cta: 'whatsapp', location: 'occasions', intent: 'catalogue_browse' }}
        href={whatsappUrl(createOccasionMessage('festive jewellery'))}
        target="_blank"
        rel="noopener noreferrer"
        className={ctaClass}
      >
        <WhatsAppIcon className="size-[18px]" /> Ask about festive pieces →
      </TrackedLink>
    ),
  },
  {
    label: 'Bridal',
    title: 'Kundan and polki sets, chosen with your family',
    text: 'Book a time and we’ll keep the counter ready.',
    plate: PLATES.polkiChoker,
    cta: (
      <BookVisitButton location="occasions" defaultPurpose="bridal" className="btn btn-glass min-h-[52px] px-7 text-[1rem]">
        <span className="btn-in">Book a bridal visit</span>
      </BookVisitButton>
    ),
  },
];

const CATEGORIES: { name: string; category: CollectionCategory; plate: Plate }[] = [
  { name: 'Necklaces', category: 'necklaces', plate: PLATES.kundanNecklace },
  { name: 'Rings', category: 'rings', plate: PLATES.goldRings },
  { name: 'Earrings', category: 'earrings', plate: PLATES.jhumkas },
  { name: 'Bangles', category: 'bangles', plate: PLATES.goldBangles },
];

// sticky offsets so each card leaves a sliver of the one beneath
const STACK_TOP = ['md:top-[calc(var(--hdr)+24px)]', 'md:top-[calc(var(--hdr)+44px)]', 'md:top-[calc(var(--hdr)+64px)]'];

export const Collections = () => (
  <section id="collections" aria-labelledby="collections-h" data-bg="#17392d" className="velvet-ground sec">
    <div className="wrap">
      <SectionHead
        id="collections-h"
        tone="velvet"
        title={<>Gold &amp; Diamond Jewellery Collections</>}
        display="For every day, every festival, every wedding"
      />
      <p className="mt-5 max-w-[60ch] text-[clamp(1rem,1.2vw,1.15rem)] font-light leading-relaxed text-glass-soft">
        Necklaces, rings, earrings and bangles – browse the latest designs on WhatsApp or see them in our Ghatkopar store.
      </p>

      <div data-stack className="mt-[clamp(36px,5vw,64px)] grid gap-6 md:gap-0">
        {OCCASIONS.map((o, i) => (
          <div
            key={o.label}
            data-stack-card
            className={`grid overflow-hidden rounded-lg border border-brass/30 bg-counter-2 shadow-[0_-12px_40px_rgba(0,0,0,0.45)] md:sticky md:mb-[8svh] md:min-h-[min(62svh,560px)] md:grid-cols-2 ${STACK_TOP[i]}`}
          >
            <div className="order-2 grid content-center gap-4 p-[clamp(24px,4vw,56px)] md:order-1">
              <p className="font-display text-[clamp(1.8rem,3.2vw,2.9rem)] font-bold leading-[1.1] tracking-[-0.02em] text-glass">{o.title}</p>
              <p className="kicker -mt-2 text-[#c6aa78]">{o.label}</p>
              <p className="max-w-[44ch] text-[1.05rem] text-glass-soft">{o.text}</p>
              <div className="pt-1">{o.cta}</div>
            </div>
            <div className="relative order-1 aspect-[4/3] bg-velvet-deep md:order-2 md:aspect-auto">
              <img
                {...imgProps(o.plate, '(min-width: 768px) 50vw, 100vw')}
                data-loupe
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      <ul data-follow className="mt-[clamp(48px,6vw,88px)] border-b border-brass/30">
        {CATEGORIES.map((c) => (
          <li
            key={c.category}
            data-follow-item={c.category}
            className="group relative flex items-center gap-[clamp(16px,2.5vw,32px)] border-t border-brass/30 py-[clamp(14px,1.8vw,24px)]"
          >
            <img
              {...imgProps(c.plate, '96px')}
              alt=""
              className="size-[clamp(64px,7vw,96px)] shrink-0 rounded-md object-cover ring-1 ring-brass/30"
            />
            <h3 className="flex-1 font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-none text-glass transition-colors group-hover:text-brass-hi">
              {c.name}
            </h3>
            <span className="hidden items-center gap-2 text-[0.95rem] text-brass-hi sm:inline-flex">
              <WhatsAppIcon className="size-[18px]" /> See catalogue on WhatsApp →
            </span>
            <span aria-hidden="true" className="text-xl text-brass-hi sm:hidden">
              →
            </span>
            <TrackedLink
              track={{ cta: 'whatsapp', location: 'categories', intent: 'catalogue_browse', category: c.category }}
              href={whatsappUrl(createCategoryMessage(c.name))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`See our ${c.name} catalogue on WhatsApp`}
              className="absolute inset-0 z-10"
            />
          </li>
        ))}
      </ul>
    </div>
  </section>
);
