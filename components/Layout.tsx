import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Instagram, Facebook, MapPin, Phone, Clock, UserPlus, Star, CalendarDays, Footprints } from 'lucide-react';
import { STORE_INFO, NEARBY_AREAS } from '../constants';
import { whatsappUrl, createEnquiryMessage, createGoldRateMessage } from '../services/whatsappService';
import { TrackedLink } from './TrackedCTA';
import { BookVisitButton } from './BookVisit';
import { WhatsAppIcon } from './site/icons';
import { useGoldRate, useLoaderRate } from '@/hooks/useGoldRate';
import { formatInr } from '@/lib/goldRate';
import { ROUTES } from '@/lib/routes';
import type { CtaLocation } from '@/lib/tracking';

// Footer links: '/#id' scrolls on the homepage (or goes there first);
// plain paths are client-side navigations to the other pages.
function useNavTo() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    const hash = path.startsWith('/#') ? path.slice(1) : '';
    if (hash && pathname === '/') {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', path);
    } else {
      navigate(path);
    }
  };
}

const PAGE_LINKS = ROUTES.filter((r) => r.indexable && r.path !== '/');

// --- VISIT BLOCK ---
// The last section of every page: the real shop photo, the address, hours and every way to reach the counter.
// `location` defaults to the long-standing 'store_address'; the homepage passes 'visit_block'.
export const StoreAddress = ({ location = 'store_address' }: { location?: CtaLocation }) => {
  // the phone link here always reported as footer_phone_1; keep that on the item pages
  const phoneLocation: CtaLocation = location === 'store_address' ? 'footer_phone_1' : location;
  const lastArea = NEARBY_AREAS[NEARBY_AREAS.length - 1];

  return (
    <section id="visit" aria-labelledby="visit-h" data-bg="#0c0f0e" className="sec bg-counter-3">
      <div className="wrap">
        {/* mockup C: the shop photo | the heading over the address, hours and two actions */}
        <div className="grid items-center gap-x-[clamp(32px,5vw,80px)] gap-y-10 lg:grid-cols-2">
          <TrackedLink
            href={STORE_INFO.mapEmbedUrl}
            target="_blank"
            rel="noopener noreferrer"
            track={{ cta: 'directions', location }}
            className="group block overflow-hidden rounded-md ring-1 ring-brass/30"
          >
            <img
              src="/images/soni-khimraj-lalji-jewellers-shop-ghatkopar-west.webp"
              width="840"
              height="840"
              loading="lazy"
              decoding="async"
              data-loupe
              className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
              alt="Soni Khimraj Lalji Jewellers shop front on Jivdaya Lane, Ghatkopar West, Mumbai"
            />
          </TrackedLink>

          <div>
            {/* H2 first in the HTML (SEO, word for word), shown under the display line */}
            <div className="flex flex-col-reverse">
              <h2 id="visit-h" className="kicker mt-3 text-[#c6aa78]">
                Visit Our Jewellery Shop in Ghatkopar West
              </h2>
              <p data-reveal="heading" className="display font-bold tracking-[-0.025em] text-[clamp(2.25rem,4.2vw,4rem)] leading-[1.06] text-brass">
                Come to the counter
              </p>
            </div>
            <p className="mt-5 text-[clamp(1.05rem,1.3vw,1.2rem)] leading-relaxed text-glass">
              <span className="text-brass-hi">A short walk from Ghatkopar station (West).</span> Serving families from{' '}
              {NEARBY_AREAS.slice(0, -1).join(', ')} and {lastArea}.
            </p>
            <h3 className="mt-8 font-display text-[clamp(1.35rem,1.8vw,1.6rem)] leading-tight text-glass">
              Soni Khimraj Lalji Jewellers
            </h3>
            <address className="mt-4 grid gap-4 border-t border-brass/25 pt-5 not-italic">
              <TrackedLink
                href={STORE_INFO.mapEmbedUrl}
                target="_blank"
                rel="noopener noreferrer"
                track={{ cta: 'directions', location }}
                className="group flex items-start gap-3"
              >
                <MapPin size={20} aria-hidden="true" className="mt-1 shrink-0 text-brass" />
                <span className="text-[1.08rem] leading-relaxed text-glass group-hover:text-brass-hi">
                  {STORE_INFO.streetAddress},<br />
                  {STORE_INFO.locality}, {STORE_INFO.region} {STORE_INFO.postalCode}
                </span>
              </TrackedLink>
              <p className="flex items-start gap-3">
                <Footprints size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-brass" />
                <span className="text-[1.08rem] text-glass-soft">A short walk from Ghatkopar station (West)</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone size={20} aria-hidden="true" className="shrink-0 text-brass" />
                <TrackedLink
                  href={`tel:${STORE_INFO.phone}`}
                  track={{ cta: 'phone', location: phoneLocation, phoneNumber: STORE_INFO.phone }}
                  className="inline-flex min-h-[44px] items-center text-[1.08rem] text-glass tabular hover:text-brass-hi"
                >
                  {STORE_INFO.phoneDisplay}
                </TrackedLink>
              </p>
              <p className="flex items-start gap-3">
                <Clock size={20} aria-hidden="true" className="mt-1 shrink-0 text-brass" />
                <span className="text-[1.08rem] leading-relaxed text-glass">
                  Open {STORE_INFO.hours}
                  <span className="block text-brass-hi">Open every day, Thursday too</span>
                </span>
              </p>
            </address>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <TrackedLink
                href={STORE_INFO.mapEmbedUrl}
                target="_blank"
                rel="noopener noreferrer"
                track={{ cta: 'directions', location }}
                className="btn btn-brass min-h-[52px] px-6 text-[1rem]"
              >
                <span className="btn-in">
                  <MapPin size={18} aria-hidden="true" /> Get directions
                </span>
              </TrackedLink>
              <BookVisitButton location={location} className="btn btn-ghost min-h-[52px] px-6 text-[1rem]">
                <span className="btn-in">
                  <CalendarDays size={18} aria-hidden="true" /> Book a visit
                </span>
              </BookVisitButton>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-1">
              <TrackedLink
                track={{ cta: 'whatsapp', location, intent: 'chat_general' }}
                href={whatsappUrl(createEnquiryMessage('I would like to visit your store'))}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw inline-flex min-h-[44px] items-center gap-2 text-[1rem] text-brass-hi"
              >
                <WhatsAppIcon className="size-[18px]" /> WhatsApp Mr. Soni
              </TrackedLink>
              <TrackedLink
                href={STORE_INFO.vcardUrl}
                download
                track={{ cta: 'save_contact', location }}
                className="link-draw inline-flex min-h-[44px] items-center gap-2 text-[1rem] text-brass-hi"
              >
                <UserPlus size={18} aria-hidden="true" /> Save our number
              </TrackedLink>
            </div>
            {STORE_INFO.reviewUrl && (
              <TrackedLink
                href={STORE_INFO.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                track={{ cta: 'review', location }}
                className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[0.95rem] text-glass-soft underline underline-offset-4 hover:text-brass-hi"
              >
                <Star size={16} aria-hidden="true" /> Visited us? Leave a Google review
              </TrackedLink>
            )}
          </div>
        </div>

        <iframe
          title="Map to Soni Khimraj Lalji Jewellers, Ghatkopar West"
          src={STORE_INFO.mapIframeSrc}
          width="100%"
          height="320"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="mt-[clamp(32px,4.5vw,64px)] block h-[300px] w-full rounded-md border-0 ring-1 ring-brass/30 md:h-[360px]"
        ></iframe>
      </div>
    </section>
  );
};

// --- FOOTER ---
const footLink = 'inline-flex min-h-[44px] items-center text-[0.98rem] text-glass-soft transition-colors hover:text-brass-hi';

export const Footer = () => {
  const navTo = useNavTo();
  return (
    <footer className="border-t border-brass/25 bg-[#0a0d0c] pb-28 pt-[clamp(56px,7vw,96px)] text-glass lg:pb-12">
      <div className="wrap">
        <div className="flex flex-col items-center text-center">
          <img
            src="/images/soni-khimraj-lalji-logo.webp"
            alt="Soni Khimraj Lalji Jewellers logo"
            width="600"
            height="264"
            loading="lazy"
            decoding="async"
            className="tone-brass aspect-[600/264] h-[clamp(56px,6vw,84px)] w-auto"
          />
          <p className="mt-5 font-display text-[clamp(1.9rem,4.2vw,3.6rem)] leading-tight text-glass">
            Soni Khimraj Lalji Jewellers
          </p>
          <p lang="hi" className="mt-1 font-deva text-[clamp(1rem,1.5vw,1.3rem)] text-[#c6aa78]">
            सोनी खिमराज लालजी ज्वेलर्स
          </p>
          <p className="mt-5 max-w-lg text-[1rem] font-light leading-relaxed text-glass-soft">
            BIS hallmarked gold, diamond and silver jewellery for over 25 years.
            Your trusted jewellers on Jivdaya Lane, Ghatkopar West, Mumbai.
          </p>
          {/* the BIS mark keeps its official colours on a light plate */}
          <span className="mt-6 inline-block rounded-md bg-glass px-3 py-2">
            <img
              src="/images/bis-logo.webp"
              alt="BIS hallmark logo – Bureau of Indian Standards certified jeweller"
              width="320"
              height="226"
              loading="lazy"
              decoding="async"
              className="aspect-[320/226] h-9 w-auto md:h-10"
            />
          </span>
          <div className="mt-6 flex gap-2">
            <TrackedLink
              href={STORE_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              track={{ cta: 'social', location: 'footer_social', platform: 'instagram', url: STORE_INFO.instagram }}
              className="grid size-11 place-items-center text-glass-soft hover:text-brass-hi"
              aria-label="Follow us on Instagram"
            >
              <Instagram size={20} strokeWidth={1.5} aria-hidden="true" />
            </TrackedLink>
            <TrackedLink
              href={STORE_INFO.facebook}
              target="_blank"
              rel="noopener noreferrer"
              track={{ cta: 'social', location: 'footer_social', platform: 'facebook', url: STORE_INFO.facebook }}
              className="grid size-11 place-items-center text-glass-soft hover:text-brass-hi"
              aria-label="Follow us on Facebook"
            >
              <Facebook size={20} strokeWidth={1.5} aria-hidden="true" />
            </TrackedLink>
            <TrackedLink href={STORE_INFO.mapEmbedUrl} target="_blank" rel="noopener noreferrer" track={{ cta: 'directions', location: 'footer_address' }} className="grid size-11 place-items-center text-glass-soft hover:text-brass-hi" aria-label="Find us on Google Maps">
              <MapPin size={20} strokeWidth={1.5} aria-hidden="true" />
            </TrackedLink>
          </div>
        </div>

        <div className="mt-[clamp(40px,5vw,72px)] grid gap-10 border-t border-brass/25 pt-[clamp(36px,4.5vw,64px)] text-center md:grid-cols-3 md:text-left">
          <div>
            <h3 className="font-display text-[1.35rem] text-brass-hi">Explore</h3>
            <ul className="mt-3 grid justify-items-center md:justify-items-start">
              {[
                ...PAGE_LINKS.map((r) => ({ name: r.name, path: r.path })),
                { name: 'What We Offer', path: '/#services' },
                { name: 'FAQs', path: '/#faq' },
              ].map((l) => (
                <li key={l.path}>
                  <a href={l.path} onClick={(e) => navTo(e, l.path)} className={footLink}>
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-[1.35rem] text-brass-hi">Visit</h3>
            <address className="mx-auto mt-4 max-w-xs text-[0.98rem] not-italic leading-relaxed text-glass-soft md:mx-0">
              {STORE_INFO.address}
            </address>
            <TrackedLink
              href={STORE_INFO.mapEmbedUrl}
              target="_blank"
              rel="noopener noreferrer"
              track={{ cta: 'directions', location: 'footer_address' }}
              className="mt-2 inline-flex min-h-[44px] items-center text-[0.98rem] text-brass-hi underline underline-offset-[5px]"
            >
              Get Directions
            </TrackedLink>
          </div>
          <div>
            <h3 className="font-display text-[1.35rem] text-brass-hi">Contact</h3>
            <div className="mt-3 grid justify-items-center md:justify-items-start">
              <TrackedLink href={`tel:${STORE_INFO.phone}`} track={{ cta: 'phone', location: 'footer_phone_2', phoneNumber: STORE_INFO.phone }} className={`${footLink} tabular text-glass`}>
                {STORE_INFO.phoneDisplay}
              </TrackedLink>
              <p className="py-1 text-[0.98rem] text-glass-soft">{STORE_INFO.hours}</p>
              <TrackedLink
                href={STORE_INFO.vcardUrl}
                download
                track={{ cta: 'save_contact', location: 'footer_contact' }}
                className={`${footLink} gap-2`}
              >
                <UserPlus size={16} aria-hidden="true" /> Save our number
              </TrackedLink>
              {STORE_INFO.reviewUrl && (
                <TrackedLink
                  href={STORE_INFO.reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  track={{ cta: 'review', location: 'footer_contact' }}
                  className={`${footLink} gap-2`}
                >
                  <Star size={16} aria-hidden="true" /> Leave a Google review
                </TrackedLink>
              )}
            </div>
          </div>
        </div>

        <p className="mt-[clamp(40px,5vw,72px)] border-t border-white/[0.06] pt-8 text-center text-[0.8rem] uppercase tracking-[0.14em] text-glass-mute">
          © 2026 Soni Khimraj Lalji Jewellers. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

// --- STICKY MOBILE CTA BAR ---
// WhatsApp / Call / Directions, always one tap away on small screens once you scroll past the hero.
export const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const outline =
    'flex min-h-[48px] items-center justify-center gap-2 rounded-full text-[0.9rem] font-semibold text-glass ring-1 ring-inset ring-brass active:bg-brass active:text-brass-ink';

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] motion-reduce:transition-none lg:hidden ${visible ? 'translate-y-0' : 'translate-y-full'}`}
      role="navigation"
      aria-label="Quick contact"
    >
      <div className="grid grid-cols-3 gap-2 border-t border-brass/25 bg-counter-3/95 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md">
        <TrackedLink
          track={{ cta: 'whatsapp', location: 'sticky_mobile_whatsapp', intent: 'chat_general' }}
          href={whatsappUrl(createEnquiryMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-glass text-[0.9rem] font-semibold text-counter active:bg-brass"
          aria-label="Chat with Mr. Soni on WhatsApp"
        >
          <WhatsAppIcon className="size-5" />
          <span>WhatsApp</span>
        </TrackedLink>
        <TrackedLink
          href={`tel:${STORE_INFO.phone}`}
          track={{ cta: 'phone', location: 'sticky_mobile_call', phoneNumber: STORE_INFO.phone }}
          className={outline}
          aria-label="Call the store"
        >
          <Phone size={17} aria-hidden="true" className="text-brass-hi" />
          <span>Call</span>
        </TrackedLink>
        <TrackedLink
          href={STORE_INFO.mapEmbedUrl}
          target="_blank"
          rel="noopener noreferrer"
          track={{ cta: 'directions', location: 'sticky_mobile_directions' }}
          className={outline}
          aria-label="Get directions to the store"
        >
          <MapPin size={17} aria-hidden="true" className="text-brass-hi" />
          <span>Directions</span>
        </TrackedLink>
      </div>
    </div>
  );
};

// --- TODAY'S GOLD RATE CHIP ---
// Desktop: a small glass label (bottom right) with the IBJA 22K rate; asks for the shop rate on WhatsApp.
export const GoldRateChip = () => {
  const [visible, setVisible] = useState(false);
  const goldRate = useGoldRate(useLoaderRate());
  const rate = goldRate.status === 'loading' ? null : goldRate.rate;

  useEffect(() => {
    const show = () => setVisible(window.scrollY > 600);
    show();
    window.addEventListener('scroll', show, { passive: true });
    return () => window.removeEventListener('scroll', show);
  }, []);

  return (
    <TrackedLink
      track={{ cta: 'whatsapp', location: 'gold_rate_chip', intent: 'gold_rate' }}
      href={whatsappUrl(createGoldRateMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get today's 22K gold rate from our shop on WhatsApp"
      tabIndex={visible ? undefined : -1}
      className={`fixed bottom-8 right-8 z-40 hidden items-center gap-3 rounded-full bg-counter-2/90 py-2.5 pl-3 pr-5 text-glass ring-1 ring-brass/60 backdrop-blur-md transition-[opacity,transform,background-color] duration-500 hover:bg-velvet motion-reduce:transition-none lg:inline-flex ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
    >
      <span className="grid size-8 place-items-center rounded-full bg-glass text-counter">
        <WhatsAppIcon className="size-[18px]" />
      </span>
      <span className="grid leading-tight">
        <span className="text-[0.88rem] font-semibold tabular">
          {rate ? (
            <>
              IBJA 22K {formatInr(rate.gold.k22.price)}
              <span className="font-normal text-glass-soft">/10g</span>
            </>
          ) : (
            "Today's 22K Gold Rate"
          )}
        </span>
        <span className="text-[0.72rem] uppercase tracking-[0.12em] text-[#c6aa78]">Shop rate on WhatsApp</span>
      </span>
    </TrackedLink>
  );
};
