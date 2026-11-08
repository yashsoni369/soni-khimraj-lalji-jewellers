import { Fragment } from 'react';
import { Link } from 'react-router';
import { ChevronRight, Plus } from 'lucide-react';
import { preload } from 'react-dom';
import type { PageCta, PageSection, ServicePageContent } from '@/content/pages';
import { routeByKey } from '@/lib/routes';
import type { CtaLocation } from '@/lib/tracking';
import { whatsappUrl } from '@/services/whatsappService';
import { BookVisitButton } from './BookVisit';
import { GoldRateCard } from './GoldRateCard';
import { StoreAddress } from './Layout';
import { PAGE_HEROES } from './site/pageHeroes';
import { PLATES, type Plate } from './site/media';
import { WhatsAppIcon } from './site/icons';
import { TrackedLink } from './TrackedCTA';

// Item pages (gold rate, bridal, old gold, silver, scheme) in the Velvet Counter world.
// SEO: every <h1>/<h2>/<h3> and every word of body copy comes straight from content/pages.ts;
// display lines and tray tags are never headings.

const primaryClass = 'btn btn-glass min-h-[52px] px-7 text-[1rem]';
const secondaryClass = 'btn btn-ghost min-h-[52px] px-7 text-[1rem]';

const Cta = ({ cta, location, primary }: { cta: PageCta; location: CtaLocation; primary: boolean }) =>
  cta.kind === 'book_visit' ? (
    <BookVisitButton location={location} defaultPurpose={cta.purpose} className={primary ? primaryClass : secondaryClass}>
      <span className="btn-in">{cta.label}</span>
    </BookVisitButton>
  ) : (
    <TrackedLink
      href={whatsappUrl(cta.message)}
      target="_blank"
      rel="noopener noreferrer"
      track={{ cta: 'whatsapp', location, intent: cta.intent, category: cta.category }}
      className={primary ? primaryClass : secondaryClass}
    >
      <span className="btn-in">
        <WhatsAppIcon className="size-5" />
        {cta.label}
      </span>
    </TrackedLink>
  );

// ---------- body sections ----------

// Tray photos for "lists of pieces". `tag` is the short brass name on the tray; when it is
// missing the bullet itself is short enough to be the tag.
type Tray = { plate: Plate; tag?: string; focus?: string };
const TRAYS: Record<string, Tray[]> = {
  'bridal:What you will find': [
    { plate: PLATES.kundanNecklace, tag: 'Kundan & Polki' },
    { plate: PLATES.goldBangles, tag: '22K gold' },
    { plate: PLATES.mangalsutra, tag: 'Mangalsutras' },
    { plate: PLATES.diamondStuds, tag: 'Diamond, 18K' },
    { plate: PLATES.polkiChoker, tag: 'Made to order' },
  ],
  'silver:What we have in silver': [
    { plate: PLATES.silverPayal },
    {
      plate: {
        src: '/images/redesign/hero-silver-1280.webp',
        srcSet: '/images/redesign/hero-silver-1280.webp 1280w, /images/redesign/hero-silver-1920.webp 1920w',
        width: 1280,
        height: 714,
        alt: 'A silver diya and a small engraved silver bowl on a green velvet tray, with silver bangles and anklets – silver gift articles in Ghatkopar',
      },
      focus: '68% 40%',
    },
    { plate: PLATES.silverPooja },
  ],
};

const bodyText = 'text-[clamp(1.05rem,1.25vw,1.2rem)] font-light leading-relaxed text-glass-soft';

const Steps = ({ items }: { items: string[] }) => (
  <ol className="border-b border-brass/25">
    {items.map((b, i) => (
      <li key={b} className="grid grid-cols-[auto_1fr] items-baseline gap-x-[clamp(16px,3vw,40px)] border-t border-brass/25 py-[clamp(18px,2.2vw,28px)]">
        <span className="font-display text-[clamp(2rem,3.4vw,3rem)] leading-none text-brass tabular" aria-hidden="true">
          {String(i + 1).padStart(2, '0')}
        </span>
        <span className="text-[clamp(1.05rem,1.35vw,1.3rem)] leading-relaxed text-glass">{b}</span>
      </li>
    ))}
  </ol>
);

// "24K (999) – 99.9% pure gold. ..." : the label before the dash is picked out; the text itself is unchanged.
const Specs = ({ items }: { items: string[] }) => (
  <ul className="border-b border-brass/25">
    {items.map((b) => {
      const at = b.indexOf(' – ');
      const label = at > 0 ? b.slice(0, at) : null;
      return (
        <li key={b} className="border-t border-brass/25 py-[clamp(16px,2vw,26px)] md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] md:gap-x-10">
          {label ? (
            <>
              <span className="block font-display text-[clamp(1.5rem,2.3vw,2.1rem)] leading-tight text-brass-hi">{label}</span>
              <span className={`mt-1 block md:mt-0 ${bodyText} !text-glass`}>
                <span className="sr-only"> – </span>
                {b.slice(at + 3)}
              </span>
            </>
          ) : (
            <span className={`block ${bodyText} !text-glass`}>{b}</span>
          )}
        </li>
      );
    })}
  </ul>
);

const Checks = ({ items }: { items: string[] }) => (
  <ul className="border-b border-brass/25">
    {items.map((b) => (
      <li key={b} className="flex gap-4 border-t border-brass/25 py-[clamp(14px,1.8vw,22px)] text-[clamp(1.05rem,1.35vw,1.3rem)] leading-relaxed text-glass">
        <span aria-hidden="true" className="mt-[0.7em] h-px w-5 shrink-0 bg-brass" />
        <span>{b}</span>
      </li>
    ))}
  </ul>
);

const TrayRail = ({ trays, items }: { trays: Tray[]; items: string[] }) => (
  <ul data-rail className="rail mt-[clamp(28px,3.5vw,48px)]">
    {items.map((b, i) => {
      const t = trays[i];
      return (
        <li key={b} className="tray flex w-[clamp(240px,70vw,300px)] shrink-0 flex-col md:w-[clamp(240px,22vw,300px)]">
          <div className="tray-box">
            <div className="tray-photo">
              <img
                src={t.plate.src}
                srcSet={t.plate.srcSet}
                sizes="(min-width: 1280px) 300px, (min-width: 768px) 22vw, 70vw"
                width={t.plate.width}
                height={t.plate.height}
                alt={t.plate.alt}
                loading="lazy"
                decoding="async"
                data-loupe
                className="h-full w-full object-cover"
                style={t.focus ? { objectPosition: t.focus } : undefined}
              />
            </div>
            {t.tag ? (
              <span className="tray-tag" aria-hidden="true">
                {t.tag}
              </span>
            ) : (
              <span className="tray-tag">{b}</span>
            )}
          </div>
          {t.tag && <p className="mt-9 text-[0.98rem] leading-relaxed text-glass-soft">{b}</p>}
        </li>
      );
    })}
  </ul>
);

const BodySection = ({ sec: raw, contentKey, index }: { sec: PageSection; contentKey: string; index: number }) => {
  // Owner placeholders ("TODO(owner): …") stay in content/pages.ts but are never shown to visitors.
  const shown = raw.bullets?.filter((b) => !b.startsWith('TODO('));
  const pending = !!raw.bullets?.length && !shown?.length;
  const sec: PageSection = { ...raw, bullets: shown?.length ? shown : undefined };
  const id = `sec-${contentKey}-${index}`;
  const velvet = index % 2 === 0;
  const trays = sec.bullets ? TRAYS[`${contentKey}:${sec.heading}`] : undefined;
  const isSteps = !!sec.bullets && /\bworks\b/i.test(sec.heading);
  const isSpecs = !!sec.bullets && contentKey === 'gold_rate';

  const head = (
    <h2 id={id} className={`kicker ${velvet ? 'text-brass-hi' : 'text-[#c6aa78]'}`}>
      {sec.heading}
    </h2>
  );

  const ground = velvet ? 'velvet-ground' : 'bg-counter';
  const bg = velvet ? '#17392d' : '#131917';

  if (trays && sec.bullets && trays.length >= sec.bullets.length) {
    return (
      <section aria-labelledby={id} data-bg={bg} className={`${ground} relative overflow-clip py-[clamp(56px,7vw,104px)]`}>
        <div className="wrap">{head}</div>
        <TrayRail trays={trays} items={sec.bullets} />
      </section>
    );
  }

  return (
    <section aria-labelledby={id} data-bg={bg} className={`${ground} relative overflow-clip py-[clamp(56px,7vw,104px)]`}>
      <div className="wrap grid gap-x-[clamp(32px,5vw,88px)] gap-y-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <div className="lg:sticky lg:top-[calc(var(--hdr)+40px)] lg:self-start">{head}</div>
        <div className="max-w-[860px]">
          {sec.paragraphs?.map((p, i) => (
            <p key={p} className={`${bodyText} ${i === 0 ? '!text-glass' : ''} ${i > 0 ? 'mt-5' : ''}`}>
              {p}
            </p>
          ))}
          {pending && (
            <p className={`${bodyText} !text-glass`}>
              Mr. Soni will share the current details on WhatsApp or at the counter.
            </p>
          )}
          {sec.bullets && (
            <div className={sec.paragraphs ? 'mt-8' : ''}>
              {isSteps ? <Steps items={sec.bullets} /> : isSpecs ? <Specs items={sec.bullets} /> : <Checks items={sec.bullets} />}
            </div>
          )}
          {contentKey === 'silver' && /silver rate/i.test(sec.heading) && (
            <Link
              to="/gold-rate-today-ghatkopar"
              className="mt-6 inline-flex min-h-[44px] items-center text-[1rem] text-brass-hi underline-offset-[5px] hover:underline"
            >
              See today&rsquo;s benchmark rates<span aria-hidden="true">&nbsp;→</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

// ---------- page ----------

export const ServicePage = ({ content }: { content: ServicePageContent }) => {
  const route = routeByKey(content.key);
  const isGoldRate = content.key === 'gold_rate';
  const heroImg = PAGE_HEROES[content.key];
  const isOldGold = content.key === 'old_gold_exchange';

  // The gold-rate route preloads its hero in `links`; the shared service route cannot know which
  // page it is rendering there, so the hero is preloaded from here (React hoists it into <head>).
  if (heroImg && !isGoldRate) {
    preload(heroImg.src, {
      as: 'image',
      imageSrcSet: heroImg.srcSet,
      imageSizes: '100vw',
      fetchPriority: 'high',
      type: 'image/webp',
    });
  }

  return (
    <div>
      {/* Hero */}
      <section
        aria-labelledby="page-h1"
        data-bg="#0c0f0e"
        className="relative isolate overflow-clip bg-counter-3 min-h-[max(560px,calc(84svh-var(--hdr)))]"
      >
        {heroImg && (
          <div className="absolute inset-0 -z-10">
            <img
              src={heroImg.src}
              srcSet={heroImg.srcSet}
              sizes="100vw"
              width={heroImg.width}
              height={heroImg.height}
              fetchPriority="high"
              decoding="async"
              alt={heroImg.alt}
              className="h-full w-full object-cover object-[72%_50%]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[#0b0f0d]/55 md:hidden" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#0b0f0d]/90 via-[#0d1210]/50 to-transparent md:from-[#0b0f0d]/95 md:from-0% md:via-[#0d1210]/40 md:via-[38%] md:to-transparent md:to-[70%]" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0b0f0d]/70 to-transparent" />
          </div>
        )}

        <div
          className={`wrap relative grid min-h-[inherit] items-center gap-x-[clamp(32px,5vw,80px)] gap-y-10 pb-[clamp(48px,6vw,96px)] pt-[clamp(8px,2vw,24px)] ${
            isGoldRate ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,600px)]' : ''
          }`}
        >
          <div className={`self-start ${isGoldRate ? '' : 'md:self-center'}`}>
            <nav aria-label="Breadcrumb" className="mb-[clamp(24px,4vw,56px)]">
              <ol className="flex flex-wrap items-center gap-x-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-glass-soft">
                <li>
                  <Link to="/" className="inline-flex min-h-[44px] items-center hover:text-brass-hi">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight size={12} />
                </li>
                <li aria-current="page" className="text-brass-hi">
                  {route.name}
                </li>
              </ol>
            </nav>

            <div className="max-w-[40rem] md:max-w-[30rem] lg:max-w-[36rem]">
              <h1
                id="page-h1"
                className="display font-bold text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.025em]"
              >
                {content.h1}
              </h1>
              {/* the page's tagline sits under its heading, never as a label above it */}
              <p className="kicker mt-4 text-[#c6aa78]">{content.eyebrow}</p>
              {isOldGold && (
                <p data-reveal="heading" className="display mt-4 font-bold tracking-[-0.02em] text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.1] text-brass">
                  Know your gold.
                </p>
              )}
              <p className="mt-6 font-light leading-relaxed text-glass-soft text-[clamp(1.05rem,1.3vw,1.25rem)]">{content.intro}</p>
              {!isGoldRate && (
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Cta cta={content.primaryCta} location="page_hero" primary />
                  {content.secondaryCta && <Cta cta={content.secondaryCta} location="page_hero" primary={false} />}
                </div>
              )}
            </div>
          </div>

          {isGoldRate && (
            <div className="w-full self-center">
              <GoldRateCard location="page_hero" />
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      {content.sections.map((sec, i) => (
        <Fragment key={sec.heading}>
          <BodySection sec={sec} contentKey={content.key} index={i + 1} />
        </Fragment>
      ))}

      {/* FAQ */}
      {content.faqs.length > 0 && (
        <section aria-labelledby="faq-h" data-bg="#181c1a" className="sec bg-counter-2">
          <div className="wrap max-w-[1000px]">
            <h2 id="faq-h" className="kicker text-[#c6aa78]">
              Questions &amp; Answers
            </h2>
            <div className="faq mt-[clamp(24px,3vw,40px)] border-b border-brass/25">
              {content.faqs.map((f, i) => (
                <details key={f.q} className="group border-t border-brass/25" open={i === 0}>
                  <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5">
                    <h3 className="font-display text-[clamp(1.2rem,1.9vw,1.6rem)] leading-snug text-glass">{f.q}</h3>
                    <Plus
                      size={22}
                      aria-hidden="true"
                      className="shrink-0 text-brass transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                    />
                  </summary>
                  <p className="max-w-[68ch] pb-6 text-[1.05rem] font-light leading-relaxed text-glass-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section aria-labelledby="talk-h" data-bg="#17392d" className="velvet-ground relative overflow-clip py-[clamp(64px,8vw,120px)] text-center">
        <div className="wrap max-w-[760px]">
          <div className="flex flex-col-reverse items-center">
            <h2 id="talk-h" className="kicker mt-3 text-brass-hi">
              Talk to Mr. Soni
            </h2>
            <p data-reveal="heading" className="display mx-auto font-bold tracking-[-0.025em] text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1.06] text-brass">
              Ask Mr. Soni directly.
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-[56ch] text-[clamp(1.05rem,1.25vw,1.2rem)] font-light leading-relaxed text-glass-soft">
            Open every day, 10 AM to 9:30 PM, on Jivdaya Lane, Ghatkopar West. We usually reply on WhatsApp within minutes
            during shop hours.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <Cta cta={content.primaryCta} location="page_cta" primary />
            {content.secondaryCta && <Cta cta={content.secondaryCta} location="page_cta" primary={false} />}
          </div>
        </div>
      </section>

      {/* Related pages */}
      <nav aria-label="Related pages" data-bg="#131917" className="bg-counter py-[clamp(48px,6vw,88px)]">
        <div className="wrap">
          <p className="kicker mb-6 text-glass-mute">Also at our shop</p>
          <ul className="grid border-b border-brass/25 sm:grid-cols-3 sm:gap-x-8">
            {content.related
              .map(routeByKey)
              .filter((r) => r.indexable)
              .map((r) => (
                <li key={r.path} className="border-t border-brass/25">
                  <Link
                    to={r.path}
                    className="group flex min-h-[64px] items-center justify-between gap-3 py-4 font-display text-[1.35rem] text-glass transition-colors hover:text-brass-hi"
                  >
                    {r.name}
                    <ChevronRight size={20} className="text-brass transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
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
