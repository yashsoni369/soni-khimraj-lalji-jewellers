import { Link } from 'react-router';
import { Instagram } from 'lucide-react';
import { STORE_INFO } from '../../constants';
import { INSTAGRAM_PROFILE } from '@/content/instagram';
import { whatsappUrl, createEnquiryMessage } from '../../services/whatsappService';
import { TrackedLink } from '../TrackedCTA';
import { StoreAddress } from '../Layout';
import { PageHero, heroPlate } from '../site/PageHero';
import { SectionHead } from '../site/SectionHead';
import { WhatsAppIcon } from '../site/icons';

export const OUR_STORY_HERO = heroPlate('hero-our-story');

const PROMISES = [
  {
    title: 'Weighed in front of you',
    text: 'Your piece goes on the scale at the counter, and we explain every line of the bill before you buy.',
  },
  {
    title: 'BIS 916 hallmark, with HUID',
    text: 'Our 22K gold carries the BIS 916 hallmark and its HUID, so you can check the purity yourself.',
  },
  {
    title: 'Old gold tested in front of you',
    text: 'Bring old gold and we test its purity on the touchstone while you watch, then value it against new designs.',
    link: { to: '/old-gold-exchange', label: 'How old gold exchange works' },
  },
];

export const OurStoryPage = () => (
  <div className="bg-counter">
    <PageHero
      id="story-h1"
      plate={OUR_STORY_HERO}
      alt="A green velvet tray with a kundan necklace on the glass counter, beside a touchstone and a jewellery scale"
      h1="Our Story: Family Jewellers on Jivdaya Lane, Ghatkopar West"
      display={
        <>
          <span className="block text-brass">25+ years on one lane.</span>
          <span className="block">Mr. Soni answers himself.</span>
        </>
      }
      lede="BIS 916 hallmarked gold, sold across the same counter on Jivdaya Lane, Ghatkopar West, for over 25 years."
    >
      <TrackedLink
        track={{ cta: 'whatsapp', location: 'story_page', intent: 'chat_general' }}
        href={whatsappUrl(createEnquiryMessage())}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-glass min-h-[52px] px-7 text-[1rem]"
      >
        <span className="btn-in">
          <WhatsAppIcon className="size-5" /> WhatsApp Mr. Soni
        </span>
      </TrackedLink>
      <a href="#visit" className="link-draw inline-flex min-h-[44px] items-center text-[1.05rem] text-[#c6aa78]">
        Plan a visit →
      </a>
      <TrackedLink
        href={INSTAGRAM_PROFILE}
        target="_blank"
        rel="noopener noreferrer"
        track={{ cta: 'social', location: 'story_page', platform: 'instagram', url: INSTAGRAM_PROFILE }}
        className="link-draw inline-flex min-h-[44px] items-center gap-2 text-[1.05rem] text-[#c6aa78]"
      >
        <Instagram size={17} aria-hidden="true" /> Follow us on Instagram
      </TrackedLink>
    </PageHero>

    {/* The family shop */}
    <section id="family-shop" aria-labelledby="family-shop-h" data-bg="#0c0f0e" className="sec bg-counter-3">
      <div className="wrap">
        <SectionHead
          id="family-shop-h"
          title="The Family Jewellery Shop of Ghatkopar West"
          display="One counter, one family, one lane"
        />
        {/* TODO(owner): photo of Mr. Soni. When it is supplied, add it as a second column here
            (data-loupe, srcSet, width/height, real alt). The section is designed to read well without it. */}
        <div className="mt-[clamp(28px,4vw,56px)] max-w-[60ch] space-y-6 text-[clamp(1.1rem,1.5vw,1.3rem)] font-light leading-[1.7] text-glass">
          <p>
            For more than 25 years, Soni Khimraj Lalji Jewellers has been the family jeweller of Ghatkopar West,
            Mumbai. Our shop is on Jivdaya Lane, a short walk from Ghatkopar station (West).
          </p>
          <p>
            Mr. Soni answers on WhatsApp himself, so the person you message is the person who will stand at the
            counter when you visit.
          </p>
          <p>
            Many of our pieces are handcrafted by karigars who have inherited their skills through generations. Every
            piece carries our promise of pure gold, honest weight and the personal care of Mr. Soni himself.
          </p>
        </div>
      </div>
    </section>

    {/* The counter promise */}
    <section id="promise" aria-labelledby="promise-h" data-bg="#17392d" className="velvet-ground sec">
      <div className="wrap">
        <SectionHead
          id="promise-h"
          tone="velvet"
          title="Our Promise at the Counter"
          display={<span className="text-brass-hi">Tested. Weighed. Hallmarked.</span>}
        />
        <ul className="mt-[clamp(32px,4.5vw,64px)] grid gap-6 md:grid-cols-3">
          {PROMISES.map((p, i) => (
            <li
              key={p.title}
              className="grid content-start gap-4 rounded-lg border border-brass/30 bg-counter-2/80 p-[clamp(24px,3vw,40px)] shadow-[0_12px_28px_rgba(0,0,0,0.4)]"
            >
              <span aria-hidden="true" className="font-display text-[3rem] leading-none text-brass tabular">
                {i + 1}
              </span>
              <h3 className="font-display text-[clamp(1.4rem,2vw,1.8rem)] leading-snug text-glass">{p.title}</h3>
              <p className="text-[1.05rem] leading-relaxed text-glass-soft">{p.text}</p>
              {p.link && (
                <Link
                  to={p.link.to}
                  className="inline-flex min-h-[44px] items-center text-[1rem] text-brass-hi underline underline-offset-[5px]"
                >
                  {p.link.label}
                  <span aria-hidden="true">&nbsp;→</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Open every day */}
    <section id="hours" aria-labelledby="hours-h" data-bg="#131917" className="sec bg-counter">
      <div className="wrap">
        <SectionHead id="hours-h" title="Open Every Day, Thursday Too" display="Come when it suits the family" />
        <p className="mt-6 max-w-[56ch] text-[clamp(1.1rem,1.5vw,1.3rem)] font-light leading-relaxed text-glass">
          We are open <span className="tabular text-brass-hi">{STORE_INFO.hours}</span>, every day of the week,
          including Thursday. If you would like the counter ready for a bigger family visit, message Mr. Soni first.
        </p>
      </div>
    </section>

    {/* The real shop front */}
    <section id="shop-front" aria-labelledby="shop-front-h" data-bg="#181c1a" className="sec bg-counter-2">
      <div className="wrap grid items-center gap-x-[clamp(32px,5vw,80px)] gap-y-10 lg:grid-cols-2">
        <div>
          <SectionHead id="shop-front-h" title="The Shop Front on Jivdaya Lane" display="Look for the gold letters" />
          <p className="mt-6 max-w-[44ch] text-[clamp(1.05rem,1.3vw,1.2rem)] font-light leading-relaxed text-glass-soft">
            Our name is written across the shop front in gold Devanagari letters, and you will see our BIS 916 hallmark sign.
            This is the real shop, not an illustration.
          </p>
          <Link
            to="/collections"
            className="mt-6 inline-flex min-h-[44px] items-center text-[1.05rem] text-brass-hi underline underline-offset-[5px]"
          >
            See what we make<span aria-hidden="true">&nbsp;→</span>
          </Link>
        </div>
        <img
          src="/images/soni-khimraj-lalji-jewellers-shop-ghatkopar-west.webp"
          width="840"
          height="840"
          loading="lazy"
          decoding="async"
          data-loupe
          className="aspect-square w-full max-w-[640px] rounded-md object-cover ring-1 ring-brass/30 lg:justify-self-end"
          alt="Soni Khimraj Lalji Jewellers shop front on Jivdaya Lane, Ghatkopar West, Mumbai"
        />
      </div>
    </section>

    <StoreAddress location="visit_block" />
  </div>
);
