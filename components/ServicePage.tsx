import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, MessageCircle } from 'lucide-react';
import type { PageCta, ServicePageContent } from '@/content/pages';
import { routeByKey } from '@/lib/routes';
import type { CtaLocation } from '@/lib/tracking';
import { whatsappUrl } from '@/services/whatsappService';
import { BookVisitButton } from './BookVisit';
import { GoldRateCard } from './GoldRateCard';
import { StoreAddress } from './Layout';
import { TrackedLink } from './TrackedCTA';

const primaryClass =
  'inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-400 text-maroon-950 px-7 py-3 md:py-4 rounded-sm font-semibold tracking-wide whitespace-nowrap transition-all shadow-xl hover:-translate-y-0.5';
const secondaryClass =
  'inline-flex items-center justify-center gap-2 text-white/90 hover:text-gold-200 px-3 py-3 border-b border-white/40 hover:border-gold-300 transition-colors';

const Cta = ({ cta, location, primary }: { cta: PageCta; location: CtaLocation; primary: boolean }) =>
  cta.kind === 'book_visit' ? (
    <BookVisitButton location={location} defaultPurpose={cta.purpose} className={primary ? primaryClass : secondaryClass}>
      {cta.label}
    </BookVisitButton>
  ) : (
    <TrackedLink
      href={whatsappUrl(cta.message)}
      target="_blank"
      rel="noopener noreferrer"
      track={{ cta: 'whatsapp', location, intent: cta.intent, category: cta.category }}
      className={primary ? primaryClass : secondaryClass}
    >
      <MessageCircle size={18} aria-hidden="true" />
      {cta.label}
    </TrackedLink>
  );

export const ServicePage = ({ content }: { content: ServicePageContent }) => {
  const route = routeByKey(content.key);
  const isGoldRate = content.key === 'gold_rate';

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-maroon-900 text-white">
        <div className="container mx-auto px-6 md:px-12 pt-6 pb-14 md:pb-20">
          <nav aria-label="Breadcrumb" className="mb-8 md:mb-12">
            <ol className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-maroon-100">
              <li>
                <Link to="/" className="hover:text-gold-200">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={12} />
              </li>
              <li aria-current="page" className="text-gold-200">
                {route.name}
              </li>
            </ol>
          </nav>

          <div className={`grid gap-10 md:gap-14 items-center ${isGoldRate ? '' : 'md:grid-cols-2'}`}>
            <div className={isGoldRate ? 'max-w-3xl mx-auto text-center' : ''}>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-300 mb-4 block">{content.eyebrow}</span>
              <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-6">{content.h1}</h1>
              <p className="text-maroon-100 font-light text-base md:text-lg leading-relaxed mb-8">{content.intro}</p>
              {!isGoldRate && (
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start">
                  <Cta cta={content.primaryCta} location="page_hero" primary />
                  {content.secondaryCta && <Cta cta={content.secondaryCta} location="page_hero" primary={false} />}
                </div>
              )}
            </div>
            {isGoldRate ? (
              <div className="max-w-5xl w-full mx-auto">
                <GoldRateCard location="page_hero" />
              </div>
            ) : (
              <img
                src={content.image.src}
                width={content.image.width}
                height={content.image.height}
                alt={content.image.alt}
                fetchPriority="high"
                className="w-full aspect-[4/3] object-cover shadow-2xl"
              />
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl space-y-12 md:space-y-16">
          {content.sections.map((sec) => (
            <div key={sec.heading}>
              <h2 className="text-2xl md:text-4xl font-serif text-maroon-900 mb-5">{sec.heading}</h2>
              {sec.paragraphs?.map((p) => (
                <p key={p} className="text-gray-700 font-light leading-relaxed text-base md:text-lg mb-4">
                  {p}
                </p>
              ))}
              {sec.bullets && (
                <ul className="space-y-3">
                  {sec.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-gray-700 font-light leading-relaxed text-base md:text-lg">
                      <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      {content.faqs.length > 0 && (
        <section className="py-16 md:py-20 bg-cream-50 border-y border-gold-100">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-serif text-maroon-900 text-center mb-10">Questions &amp; Answers</h2>
            <div className="divide-y divide-gold-200 border-y border-gold-200">
              {content.faqs.map((f, i) => (
                <details key={f.q} className="group py-5" open={i === 0}>
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="font-serif text-lg md:text-xl text-maroon-900">{f.q}</h3>
                    <ChevronDown size={20} className="flex-shrink-0 text-gold-800 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-gray-700 font-light leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="py-14 md:py-20 bg-maroon-900 text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Talk to Mr. Soni</h2>
          <p className="text-maroon-100 font-light leading-relaxed mb-8">
            Open every day, 10 AM to 9:30 PM, on Jivdaya Lane, Ghatkopar West. We usually reply on WhatsApp within minutes
            during shop hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-center">
            <Cta cta={content.primaryCta} location="page_cta" primary />
            {content.secondaryCta && <Cta cta={content.secondaryCta} location="page_cta" primary={false} />}
          </div>
        </div>
      </section>

      {/* Related pages */}
      <nav aria-label="Related pages" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 mb-6 text-center">Also at our shop</p>
          <ul className="grid sm:grid-cols-3 gap-4">
            {content.related
              .map(routeByKey)
              .filter((r) => r.indexable)
              .map((r) => (
                <li key={r.path}>
                  <Link
                    to={r.path}
                    className="flex items-center justify-between gap-3 p-5 border border-gold-200 bg-cream-50 hover:bg-gold-50 hover:border-gold-400 transition-colors font-serif text-lg text-maroon-900"
                  >
                    {r.name}
                    <ChevronRight size={18} className="text-gold-800" aria-hidden="true" />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </nav>

      <StoreAddress />
    </div>
  );
};
