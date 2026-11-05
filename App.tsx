import React from 'react';
import { Link } from 'react-router';
import { MessageCircle, TrendingUp, ChevronDown, ChevronRight } from 'lucide-react';
import { SERVICES, FAQS, STORE_INFO } from './constants';
import { Header, Footer, StoreAddress, StickyMobileCTA, GoldRateChip } from './components/Layout';
import { HeroCarousel, Spotlight, CategoryShowcase } from './components/Widgets';
import { TrackedLink } from './components/TrackedCTA';
import { GoldRateCard } from './components/GoldRateCard';
import { ROUTES } from './lib/routes';
import {
  whatsappUrl,
  createKnowledgeMessage,
  createHelloMessage,
  createServiceMessage,
  createOldGoldValuationMessage,
} from './services/whatsappService';

// Homepage service cards that have their own page.
const SERVICE_PAGES: Partial<Record<string, string>> = {
  gold: '/gold-rate-today-ghatkopar',
  bridal: '/bridal-jewellery',
  mangalsutra: '/bridal-jewellery',
  silver: '/silver-jewellery',
  exchange: '/old-gold-exchange',
};

// --- COMPONENT: WHY SHOP WITH US ---
const WhyShopWithUs = () => {
  const items = [
    { src: '/images/bis-hallmark-gold.webp', w: 400, h: 400, alt: 'BIS Hallmark Gold' },
    { src: '/images/trusted-by-customers.webp', w: 400, h: 419, alt: 'Trusted by hundreds of our customers' },
    { src: '/images/leading-jeweller-25-years.webp', w: 400, h: 440, alt: 'Leading jewellery brand for over 25 years' },
    { src: '/images/certified-diamond-jewellery.webp', w: 400, h: 421, alt: 'Certified diamond jewellery' },
    { src: '/images/seasoned-craftsmen.webp', w: 400, h: 375, alt: 'Crafted by seasoned craftsmen' },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#fffcf5] border-y border-gold-50/50">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-5xl font-serif text-maroon-900 text-center mb-16 md:mb-24 uppercase tracking-[0.1em] md:tracking-[0.2em] leading-tight">
          Why Shop With <br className="hidden md:block" /> Soni Khimraj Lalji Jewellers?
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 md:gap-y-20 max-w-[1600px] mx-auto items-center justify-items-center">
          {items.map((item) => (
            <li key={item.src} className="flex flex-col items-center text-center group">
              <div className="h-48 md:h-64 w-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <div className="w-48 md:w-72">
                  <img src={item.src} width={item.w} height={item.h} loading="lazy" className="w-72 h-64 object-contain" alt={item.alt} />
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-16 md:mt-24 max-w-2xl mx-auto text-center">
          <p className="text-gray-700 font-light italic text-base md:text-lg leading-relaxed mb-6">
            We'd love to meet you. Walk into our Ghatkopar store — or simply say namaste on WhatsApp.
          </p>
          <TrackedLink
            track={{ cta: 'whatsapp', location: 'why_us', intent: 'chat_general' }}
            href={whatsappUrl(createHelloMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-maroon-900 hover:bg-maroon-800 text-white px-7 py-3 md:px-8 md:py-4 rounded-sm tracking-widest uppercase text-xs md:text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <MessageCircle size={18} />
            Say Hello to Mr. Soni
          </TrackedLink>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENT: WHAT WE OFFER ---
const ServicesSection = () => (
  <section id="services" className="py-16 md:py-24 bg-white">
    <div className="container mx-auto px-6 md:px-12">
      <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 mb-4 block">What We Offer</span>
        <h2 className="text-3xl md:text-5xl font-serif text-maroon-900 mb-4">Gold, Diamond &amp; Silver Jewellery in Ghatkopar</h2>
        <p className="text-gray-600 font-light text-base md:text-lg leading-relaxed">
          Everything a family needs from a trusted neighbourhood jeweller – under one roof on Jivdaya Lane, Ghatkopar West.
        </p>
      </div>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
        {SERVICES.map((svc) => (
          <li key={svc.key} className="flex flex-col h-full p-6 border border-gold-200 bg-cream-50 hover:bg-gold-50 hover:border-gold-400 transition-colors">
            <h3 className="font-serif text-xl text-maroon-900 mb-2">{svc.title}</h3>
            <p className="text-sm text-gray-600 font-light leading-relaxed">{svc.text}</p>
            <div className="mt-auto pt-4 flex flex-wrap gap-x-5 gap-y-2">
              {SERVICE_PAGES[svc.key] && (
                <Link
                  to={SERVICE_PAGES[svc.key]!}
                  className="inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-maroon-900 font-semibold hover:text-gold-800"
                >
                  Learn more<span className="sr-only"> about {svc.title}</span> <ChevronRight size={12} aria-hidden="true" />
                </Link>
              )}
              <TrackedLink
                track={
                  svc.key === 'exchange'
                    ? { cta: 'whatsapp', location: 'services', intent: 'old_gold_valuation', category: 'exchange' }
                    : { cta: 'whatsapp', location: 'services', intent: 'catalogue_browse', category: svc.key }
                }
                href={whatsappUrl(svc.key === 'exchange' ? createOldGoldValuationMessage() : createServiceMessage(svc.title))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-gold-800 hover:text-maroon-900"
              >
                <MessageCircle size={12} aria-hidden="true" />
                {svc.key === 'exchange' ? 'Get my old gold valued' : 'Ask on WhatsApp'}
                <span className="sr-only"> about {svc.title}</span>
              </TrackedLink>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// --- COMPONENT: TODAY'S GOLD RATE ---
const GoldRateSection = () => (
  <section id="gold-rate" className="py-14 md:py-20 bg-maroon-900 text-white">
    <div className="container mx-auto px-6 max-w-5xl text-center">
      <TrendingUp className="mx-auto text-gold-300 mb-4" size={28} aria-hidden="true" />
      <h2 className="text-3xl md:text-5xl font-serif mb-4">Today's Gold Rate in Ghatkopar</h2>
      <p className="text-maroon-100 font-light text-base md:text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
        Gold prices in Mumbai change every day. Here is today's benchmark rate – message us on WhatsApp for our shop
        rate at Ghatkopar West; we reply within minutes during shop hours.
      </p>
      <GoldRateCard location="gold_rate_section" />
      <Link
        to="/gold-rate-today-ghatkopar"
        className="inline-flex items-center gap-1 mt-6 text-xs uppercase tracking-widest text-gold-200 hover:text-white"
      >
        24K vs 22K vs 18K explained <ChevronRight size={14} aria-hidden="true" />
      </Link>
    </div>
  </section>
);

// --- COMPONENT: FAQ ---
const FaqSection = () => (
  <section id="faq" className="py-16 md:py-24 bg-cream-50 border-t border-gold-100">
    <div className="container mx-auto px-6 max-w-3xl">
      <div className="text-center mb-10 md:mb-14">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 mb-4 block">FAQs</span>
        <h2 className="text-3xl md:text-5xl font-serif text-maroon-900">Frequently Asked Questions</h2>
      </div>
      <div className="divide-y divide-gold-200 border-y border-gold-200">
        {FAQS.map((f, i) => (
          <details key={f.q} className="group py-5" open={i === 0}>
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <h3 className="font-serif text-lg md:text-xl text-maroon-900">{f.q}</h3>
              <ChevronDown size={20} className="flex-shrink-0 text-gold-700 transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-gray-700 font-light leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
      <p className="text-center text-sm text-gray-700 mt-8">
        Still have a question? Call or WhatsApp us on{' '}
        <TrackedLink href={`tel:${STORE_INFO.phone}`} track={{ cta: 'phone', location: 'faq', phoneNumber: STORE_INFO.phone }} className="text-maroon-900 font-semibold underline underline-offset-4">{STORE_INFO.phoneDisplay}</TrackedLink>.
      </p>
    </div>
  </section>
);

// --- PAGE: HOME ---
export const HomePage = () => {
  return (
    <div className="bg-white">
      <HeroCarousel />

      {/* Brand Intro - Our Virāsat */}
      <section id="heritage" className="py-16 md:py-32 container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-800 mb-6 block">The Heritage</span>
          <h2 className="text-2xl md:text-5xl font-serif text-maroon-900 mb-8 leading-tight">
            Trusted Jewellers in Ghatkopar West <br className="hidden md:block" /> for Over 25 Years
          </h2>
          <p className="text-gray-600 leading-relaxed md:leading-loose font-light text-base md:text-lg mb-10">
            For more than 25 years, Soni Khimraj Lalji Jewellers has been the family jeweller of Ghatkopar West, Mumbai.
            From our shop on Jivdaya Lane we offer BIS hallmarked 22K gold jewellery, diamond jewellery, silver, bridal Kundan &amp; Polki sets
            and mangalsutras – many handcrafted by karigars who have inherited their skills through generations.
            Every piece carries our promise of pure gold, honest weight and the personal care of Mr. Soni himself.
          </p>
          <div className="w-px h-12 md:h-20 bg-gold-300 mx-auto"></div>
        </div>
      </section>

      <ServicesSection />

      {/* Spotlight Masterpiece (Dark Section) */}
      <div id="spotlight">
        <Spotlight />
      </div>

      {/* Categories as Visual Repertoire */}
      <div id="collections">
        <CategoryShowcase />
      </div>

      <GoldRateSection />

      {/* Education/Knowledge Feature */}
      <section id="knowledge" className="bg-cream-50 py-16 md:py-24 border-y border-gold-100">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <img src="/images/gold-wedding-bands-ghatkopar.webp" width="300" height="400" loading="lazy" className="mt-8 md:mt-12 w-full object-cover aspect-[3/4] shadow-lg" alt="Hallmarked gold wedding bands" />
              <img src="/images/gemstone-gold-pendant.webp" width="300" height="400" loading="lazy" className="w-full object-cover aspect-[3/4] shadow-lg" alt="Gold chain with gemstone pendant" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 mb-4 block">Knowledge</span>
            <h2 className="text-3xl md:text-5xl font-serif text-maroon-900 mb-6">The Mark of Purity: BIS Hallmark &amp; HUID</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-8 text-base md:text-lg">
              We believe in absolute transparency. Every gold piece in our collection carries the BIS Hallmark with a 6-digit HUID code –
              a guarantee of purity you can verify yourself on the BIS Care app.
              Understanding gold purity and diamond quality is essential to building your personal collection.
            </p>
            <div className="flex flex-col gap-4">
              <TrackedLink
                track={{ cta: 'content_inquiry', location: 'knowledge', topic: 'bis_hallmark' }}
                href={whatsappUrl(createKnowledgeMessage('the BIS Hallmark & HUID on your jewellery'))}
                target="_blank"
                rel="noopener noreferrer"
                className="border-l-2 border-gold-400 pl-6 py-2 text-left group hover:bg-gold-50/60 transition-colors"
              >
                <span className="block font-serif text-xl text-maroon-900 group-hover:text-gold-800 transition-colors">BIS Hallmark & HUID</span>
                <span className="block text-sm text-gray-600 font-light mt-1">Trust and transparency in every gram.</span>
                <span className="inline-flex items-center gap-1.5 mt-2 text-[11px] uppercase tracking-widest text-gold-800">
                  <MessageCircle size={12} /> Ask Mr. Soni
                </span>
              </TrackedLink>
              <TrackedLink
                track={{ cta: 'content_inquiry', location: 'knowledge', topic: 'diamond_4cs' }}
                href={whatsappUrl(createKnowledgeMessage('the 4Cs of diamond quality'))}
                target="_blank"
                rel="noopener noreferrer"
                className="border-l-2 border-gold-400 pl-6 py-2 text-left group hover:bg-gold-50/60 transition-colors"
              >
                <span className="block font-serif text-xl text-maroon-900 group-hover:text-gold-800 transition-colors">Diamond Quality Guide</span>
                <span className="block text-sm text-gray-600 font-light mt-1">Understanding the 4Cs of brilliance.</span>
                <span className="inline-flex items-center gap-1.5 mt-2 text-[11px] uppercase tracking-widest text-gold-800">
                  <MessageCircle size={12} /> Ask Mr. Soni
                </span>
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* Why Shop With Us Section */}
      <div id="why-us">
        <WhyShopWithUs />
      </div>
      <FaqSection />
      <StoreAddress />
    </div>
  );
};

// --- PAGE: 404 ---
export const NotFoundPage = () => (
  <section className="py-24 md:py-32 container mx-auto px-6 text-center">
    <h1 className="text-4xl md:text-6xl font-serif text-maroon-900 mb-6">Page not found</h1>
    <p className="text-gray-600 mb-10">The page you were looking for doesn't exist.</p>
    <ul className="flex flex-wrap justify-center gap-4">
      {ROUTES.filter((r) => r.indexable).map((r) => (
        <li key={r.path}>
          <Link to={r.path} className="inline-block border border-gold-300 px-5 py-3 text-maroon-900 hover:bg-gold-50">
            {r.name}
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

// Site chrome around every page. Rendered by app/root.tsx with the matched route in <Outlet/>.
export const AppShell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col overflow-x-clip font-sans bg-white text-gray-900 selection:bg-gold-200 selection:text-maroon-900">
    <Header />
    <main className="flex-grow pb-16 lg:pb-0">{children}</main>
    <Footer />
    <StickyMobileCTA />
    <GoldRateChip />
  </div>
);
