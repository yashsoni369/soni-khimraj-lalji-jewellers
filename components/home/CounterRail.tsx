import { useRef } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SERVICES } from '../../constants';
import {
  whatsappUrl,
  createServiceMessage,
  createOldGoldValuationMessage,
} from '../../services/whatsappService';
import { TrackedLink } from '../TrackedCTA';
import { SectionHead } from '../site/SectionHead';
import { WhatsAppIcon } from '../site/icons';
import { PLATES, imgProps, type Plate } from '../site/media';

// "On the counter today": one velvet tray per service (the 7 service H3s, word for word).
// A horizontal list that swipes natively on phones; the motion layer pins [data-rail] on desktop.

// Homepage service cards that have their own page.
const SERVICE_PAGES: Partial<Record<string, string>> = {
  gold: '/gold-rate-today-ghatkopar',
  bridal: '/bridal-jewellery',
  mangalsutra: '/bridal-jewellery',
  silver: '/silver-jewellery',
  exchange: '/old-gold-exchange',
};

const SERVICE_TRAYS: Record<(typeof SERVICES)[number]['key'], Plate> = {
  gold: PLATES.goldChains,
  diamond: PLATES.diamondStuds,
  silver: PLATES.silverPooja,
  bridal: PLATES.kundanNecklace,
  mangalsutra: PLATES.mangalsutra,
  custom: PLATES.polkiChoker,
  exchange: PLATES.touchstone,
};

const TRAY_SIZES = '(min-width: 1280px) 320px, (min-width: 768px) 26vw, 74vw';

export const CounterRail = () => {
  const railRef = useRef<HTMLUListElement>(null);
  const nudge = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const step = (rail.querySelector('li')?.getBoundingClientRect().width ?? 300) + 24;
    rail.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section
      id="services"
      aria-labelledby="services-h"
      data-bg="#17392d"
      className="velvet-ground relative overflow-clip py-[clamp(64px,8vw,120px)]"
    >
      {/* mockup C: centred heading, the rail arrows on its baseline at the right */}
      <div className="wrap grid items-start gap-x-10 gap-y-6 md:grid-cols-[1fr_auto_1fr]">
        <div aria-hidden="true" className="hidden md:block" />
        <div className="text-center">
          <SectionHead
            id="services-h"
            tone="velvet"
            center
            title={<>Gold, Diamond &amp; Silver Jewellery in Ghatkopar</>}
            display={<span className="text-brass-hi">On the counter today</span>}
          />
          <p className="mx-auto mt-5 max-w-[56ch] text-[clamp(1rem,1.2vw,1.15rem)] font-light leading-relaxed text-glass-soft">
            Everything a family needs from a trusted neighbourhood jeweller – under one roof on Jivdaya Lane, Ghatkopar
            West.
          </p>
        </div>
        {/* centred on the display line's x-height: 0.6 × its font size, less half the 48px button */}
        <div
          className="hidden gap-3 justify-self-end md:mt-[calc(clamp(2.25rem,4.6vw,4.25rem)*0.6_-_24px)] md:flex"
          data-rail-nav
        >
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Previous trays"
            className="grid size-12 place-items-center rounded-full text-glass ring-1 ring-inset ring-brass/70 transition-colors hover:bg-brass hover:text-brass-ink"
          >
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Next trays"
            className="grid size-12 place-items-center rounded-full text-glass ring-1 ring-inset ring-brass/70 transition-colors hover:bg-brass hover:text-brass-ink"
          >
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      <a className="skip-link" href="#gold-rate">
        Skip the collection
      </a>
      <ul ref={railRef} data-rail className="rail mt-[clamp(28px,3.5vw,48px)]">
        {SERVICES.map((svc) => {
          const plate = SERVICE_TRAYS[svc.key];
          const page = SERVICE_PAGES[svc.key];
          const isExchange = svc.key === 'exchange';
          return (
            <li key={svc.key} className="tray flex w-[clamp(256px,74vw,320px)] shrink-0 flex-col md:w-[clamp(256px,26vw,320px)]">
              <div className="tray-box">
                <div className="tray-photo">
                  <img
                    {...imgProps(plate, TRAY_SIZES)}
                    data-loupe
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="tray-tag">{svc.title}</h3>
              </div>
              <p className="mt-9 text-[0.98rem] leading-relaxed text-glass-soft">{svc.text}</p>
              <div className="mt-auto flex flex-wrap items-center gap-x-6 pt-3">
                <TrackedLink
                  track={
                    isExchange
                      ? { cta: 'whatsapp', location: 'counter_rail', intent: 'old_gold_valuation', category: 'exchange' }
                      : { cta: 'whatsapp', location: 'counter_rail', intent: 'catalogue_browse', category: svc.key }
                  }
                  href={whatsappUrl(isExchange ? createOldGoldValuationMessage() : createServiceMessage(svc.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 text-[0.98rem] text-glass underline decoration-brass/70 underline-offset-[5px] hover:decoration-brass-hi"
                >
                  <WhatsAppIcon className="size-[18px] text-brass-hi" />
                  {isExchange ? 'Get my old gold valued' : 'Ask on WhatsApp'}
                  <span className="sr-only"> about {svc.title}</span>
                </TrackedLink>
                {page && (
                  <Link
                    to={page}
                    className="inline-flex min-h-[44px] items-center text-[0.98rem] text-brass-hi underline-offset-[5px] hover:underline"
                  >
                    Learn more<span className="sr-only"> about {svc.title}</span>
                    <span aria-hidden="true">&nbsp;→</span>
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
