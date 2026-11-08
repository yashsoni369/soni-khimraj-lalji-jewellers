import React from 'react';
import { Link } from 'react-router';
import { Footer, StoreAddress, StickyMobileCTA, GoldRateChip } from './components/Layout';
import { Header } from './components/site/Header';
import { CounterHero } from './components/home/CounterHero';
import { TrustBand } from './components/home/TrustBand';
import { CounterRail } from './components/home/CounterRail';
import { RateSection } from './components/home/RateSection';
import { OldGoldStory } from './components/home/OldGoldStory';
import { Story } from './components/home/Story';
import { Collections } from './components/home/Collections';
import { WhyUs } from './components/home/WhyUs';
import { Faq } from './components/home/Faq';
import { InstagramStrip } from './components/home/InstagramStrip';
import { ROUTES } from './lib/routes';

// --- PAGE: HOME ---
// The Velvet Counter: hero → trust band → tray rail → rate card → old gold → story → collections
// → why us → FAQ → visit. Every H2/H3 keeps its existing text (see the SEO rules in the build plan).
export const HomePage = () => (
  <div className="bg-counter">
    <CounterHero />
    <TrustBand />
    <CounterRail />
    <RateSection />
    <OldGoldStory />
    <Story />
    <Collections />
    <WhyUs />
    <Faq />
    <InstagramStrip />
    <StoreAddress location="visit_block" />
  </div>
);

// --- PAGE: 404 ---
// An empty velvet tray: nothing on it, and the way back to every page.
export const NotFoundPage = () => (
  <section
    aria-labelledby="nf-h1"
    className="relative isolate flex min-h-[calc(100svh-var(--hdr))] items-center overflow-clip bg-counter-3 py-20"
  >
    <img
      src="/images/redesign/hero-404-1280.webp"
      srcSet="/images/redesign/hero-404-1280.webp 1280w, /images/redesign/hero-404-1920.webp 1920w"
      sizes="100vw"
      width={1280}
      height={714}
      alt="An empty green velvet tray on a glass jewellery counter"
      decoding="async"
      className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_50%]"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b0f0d]/95 via-[#0b0f0d]/70 to-[#0b0f0d]/10"
    />
    <div className="wrap">
      <div className="flex flex-col-reverse">
        <h1 id="nf-h1" className="kicker mt-3 text-[#c6aa78]">
          Page not found
        </h1>
        <p className="display font-bold tracking-[-0.025em] text-[clamp(2.5rem,6vw,5rem)] leading-[1.04]">Nothing on this tray.</p>
      </div>
      <p className="mt-5 max-w-[40ch] text-[1.1rem] text-glass-soft">The page you were looking for doesn't exist.</p>
      <ul className="mt-8 flex max-w-[720px] flex-wrap gap-3">
        {ROUTES.filter((r) => r.indexable).map((r) => (
          <li key={r.path}>
            <Link to={r.path} className="btn btn-ghost min-h-[48px] px-5 text-[0.98rem]">
              <span className="btn-in">{r.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// Site chrome around every page. Rendered by app/root.tsx with the matched route in <Outlet/>.
export const AppShell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col overflow-x-clip font-sans bg-counter text-glass selection:bg-brass selection:text-brass-ink">
    <Header />
    <main id="main" className="flex-grow pt-[var(--hdr)]">{children}</main>
    <Footer />
    <StickyMobileCTA />
    <GoldRateChip />
  </div>
);
