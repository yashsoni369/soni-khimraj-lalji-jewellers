import { Link } from 'react-router';
import { whatsappUrl, createEnquiryMessage } from '../../services/whatsappService';
import { TrackedLink } from '../TrackedCTA';
import { useGoldRate, useLoaderRate } from '@/hooks/useGoldRate';
import { formatInr } from '@/lib/goldRate';

// Homepage hero, built to the approved mockup A (.impeccable/mocks/home-a.png, spec .impeccable/build/spec.json).
// SEO: the <h1> keeps the existing keyword line word for word; "Tested in front of you…" is display text.
// LCP: the counter photo is never hidden or faded; motion only transforms it after it has painted.

const shortDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' });

export const HERO_IMAGE = {
  // web sizes of the hero-photo plate (assets/plates/hero-photo.png)
  src: '/images/redesign/hero-photo-1600.webp',
  srcSet:
    '/images/redesign/hero-photo-960.webp 960w, /images/redesign/hero-photo-1600.webp 1600w, /images/redesign/hero-photo-2560.webp 2560w',
};

export const CounterHero = () => {
  const goldRate = useGoldRate(useLoaderRate());
  const rate = goldRate.status === 'loading' ? null : goldRate.rate;

  return (
    <section
      id="top"
      aria-labelledby="hero-h1"
      // phones: copy on the dark counter, then the photo below it; md+: copy over the photo (mockup A)
      className="relative isolate flex flex-col overflow-clip bg-counter-3 md:block md:aspect-[2528/1526]"
    >
      <div className="hero-bg relative order-last -z-10 aspect-[5/4] md:absolute md:inset-0 md:order-none md:aspect-auto md:[clip-path:inset(0_0_0_6.4%)]">
        <img
          src={HERO_IMAGE.src}
          srcSet={HERO_IMAGE.srcSet}
          sizes="100vw"
          width={2560}
          height={1429}
          fetchPriority="high"
          decoding="async"
          alt="A velvet tray with a kundan necklace and gold bangles on the glass counter, beside a touchstone, a loupe and a jewellery scale – gold and diamond jewellers in Ghatkopar West"
          className="hero-img h-full w-full object-cover object-[70%_50%]"
        />
        {/* md+: keeps the text side legible where the copy sits over the photo */}
        <div aria-hidden="true" className="absolute inset-0 hidden bg-gradient-to-r from-[#0b0f0d]/90 from-0% via-[#0d1210]/30 via-[14%] to-transparent to-[45%] md:block" />
        {/* phones: the photo fades up into the counter behind the copy */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-counter-3 to-transparent md:hidden" />
        <div aria-hidden="true" className="absolute inset-0 hidden bg-[radial-gradient(ellipse_70%_45%_at_0%_100%,rgba(11,15,13,0.92),transparent_70%)] md:block" />
      </div>

      <div className="hero-copy flex h-full flex-col justify-end px-[max(20px,6.45vw)] pb-6 pt-8 md:justify-start md:pb-0 md:pt-[13.9vw]">
        <p lang="hi" className="order-1 font-devaleading-[1.2] text-[#988050] text-[clamp(1.1rem,1.72vw,44px)]">
          सोनी खिमराज लालजी ज्वेलर्स
        </p>
        {/* H1 first in the HTML (SEO, word for word); shown as the first line of the sub row,
            so the Devanagari name sits directly on the headline as in mockup A */}
        <h1
          id="hero-h1"
          className="order-3 mt-[0.75em] font-sans font-normal leading-[1.3] text-[#c6aa78] text-[clamp(1rem,1.62vw,41px)]"
        >
          Gold &amp; Diamond Jewellers in Ghatkopar West, Mumbai
        </h1>
        <p className="display order-2 mt-0 font-bold tracking-[-0.025em] leading-[1.2] text-[clamp(2.3rem,4.6vw,116px)]">
          <span className="block text-[#ba995c]">Tested in front of you.</span>
          <span className="block text-[#f7f7f7]">Weighed in front of you.</span>
        </p>
        <p className="order-4 mt-[0.15em] max-w-[34rem] md:max-w-none font-sans font-light text-[#a7aca9] text-[clamp(1rem,1.62vw,41px)]">
          BIS 916 hallmarked gold · 25+ years on Jivdaya Lane, Ghatkopar West
        </p>
        <div className="order-5 mt-[clamp(20px,2.4vw,60px)] flex flex-wrap items-center gap-x-[2vw] gap-y-4">
          <TrackedLink
            track={{ cta: 'whatsapp', location: 'hero', intent: 'chat_general' }}
            href={whatsappUrl(createEnquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-glass magnetic h-[clamp(52px,4.03vw,102px)] px-[clamp(24px,1.9vw,48px)] text-[clamp(1rem,1.5vw,38px)] font-normal"
          >
            <span className="btn-in">WhatsApp Mr. Soni</span>
          </TrackedLink>
          <Link
            to="/old-gold-exchange"
            className="link-draw inline-flex min-h-11 items-center font-sans font-light tracking-[-0.015em] text-[#c6aa78] text-[clamp(1rem,1.58vw,40px)]"
          >
            Bring your old gold →
          </Link>
        </div>
      </div>

      <p className="absolute bottom-[3.6%] right-[1.86%] hidden rounded-[0.55vw] border border-white/40 bg-white/[0.14] px-[1.05vw] py-[0.42vw] font-sans font-normal text-[#efece6] backdrop-blur-md tabular md:block text-[clamp(0.8rem,1.1vw,28px)]">
        {rate ? (
          <>
            Today&rsquo;s 22K rate · IBJA {shortDate(rate.date)} · {formatInr(rate.gold.k22.price)} / 10g
          </>
        ) : (
          <>Today&rsquo;s 22K rate on WhatsApp</>
        )}
      </p>
    </section>
  );
};
