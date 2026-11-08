import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { STORE_INFO } from '../../constants';
import { whatsappUrl, createEnquiryMessage } from '../../services/whatsappService';
import { TrackedLink } from '../TrackedCTA';
import { WhatsAppIcon } from './icons';

// Velvet Counter header: wordmark left, page links centred, phone and WhatsApp right.
// The header itself may hide on scroll (MotionLayer); the WhatsApp pill never does.
export const NAV_LINKS = [
  { name: 'Gold Rate', path: '/gold-rate-today-ghatkopar' },
  { name: 'Bridal', path: '/bridal-jewellery' },
  { name: 'Collections', path: '/collections' },
  { name: 'Old Gold', path: '/old-gold-exchange' },
  { name: 'Our Story', path: '/our-story' },
  { name: 'Visit', path: '/#visit' },
] as const;

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header
        id="site-header"
        className="fixed inset-x-0 top-0 z-50 h-[var(--hdr)] border-b border-white/[0.06] bg-[#181818]/95 backdrop-blur-md transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] data-[hidden=true]:-translate-y-full"
      >
        <div className="mx-auto flex h-full items-center justify-between gap-6 px-[max(16px,2.9vw)] md:pb-[1vw]">
          <Link
            to="/"
            className="shrink-0 text-center font-display uppercase leading-none text-[#c2a173]"
          >
            <span className="block text-[clamp(0.95rem,1.34vw,34px)] tracking-[0.04em]">Soni Khimraj Lalji</span>{' '}
            <span className="mt-[0.35em] block text-[clamp(0.6rem,0.8vw,20px)] tracking-[0.32em]">Jewellers</span>
            <span className="sr-only">, home</span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-[1.1vw] font-light text-[clamp(0.9rem,1.34vw,34px)] text-[#e4e4e4]">
              {NAV_LINKS.map((l, i) => (
                <li key={l.path} className="flex items-center gap-[1.1vw]">
                  {i > 0 && <span aria-hidden="true" className="text-brass-soft">·</span>}
                  <Link to={l.path} className="link-draw whitespace-nowrap hover:text-glass">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-[0.75vw]">
            <TrackedLink
              href={`tel:${STORE_INFO.phone}`}
              track={{ cta: 'phone', location: 'header', phoneNumber: STORE_INFO.phone }}
              className="link-draw hidden whitespace-nowrap text-[clamp(0.9rem,1.25vw,32px)] text-[#e4e4e4] tabular md:inline"
            >
              {STORE_INFO.phoneDisplay}
            </TrackedLink>
            <TrackedLink
              track={{ cta: 'whatsapp', location: 'header', intent: 'chat_general' }}
              href={whatsappUrl(createEnquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Mr. Soni"
              className="grid size-[clamp(40px,2.9vw,74px)] place-items-center rounded-full bg-[#282828] text-[#dcd8d4] transition-colors hover:bg-velvet hover:text-glass"
            >
              <WhatsAppIcon className="size-[52%]" />
            </TrackedLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid size-11 place-items-center rounded-full text-glass lg:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-[var(--hdr)] z-40 border-b border-white/[0.06] bg-counter-2 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-6 py-6">
          {NAV_LINKS.map((l) => (
            <Link key={l.path} to={l.path} className="border-b border-white/[0.06] py-3 font-display text-2xl text-glass">
              {l.name}
            </Link>
          ))}
          <TrackedLink
            track={{ cta: 'whatsapp', location: 'mobile_menu', intent: 'chat_general' }}
            href={whatsappUrl(createEnquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-glass mt-5 px-6 py-4 text-base"
          >
            <span className="btn-in">
              <WhatsAppIcon className="size-5" /> WhatsApp Mr. Soni
            </span>
          </TrackedLink>
          <TrackedLink
            href={`tel:${STORE_INFO.phone}`}
            track={{ cta: 'phone', location: 'mobile_menu', phoneNumber: STORE_INFO.phone }}
            className="mt-3 text-center text-glass-soft tabular"
          >
            Call {STORE_INFO.phoneDisplay}
          </TrackedLink>
        </nav>
      </div>
    </>
  );
};
