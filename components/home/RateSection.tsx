import { Link } from 'react-router';
import { GoldRateCard } from '../GoldRateCard';
import { SectionHead } from '../site/SectionHead';
import { PLATES } from '../site/media';

// Today's rate under glass, on velvet (approved mockup B). The card is server-rendered with the live IBJA rate.
export const RateSection = () => (
  <section
    id="gold-rate"
    aria-labelledby="gold-rate-h"
    data-bg="#0f2a21"
    className="relative isolate overflow-clip bg-velvet-deep pb-[clamp(72px,9vw,136px)] pt-[clamp(56px,6.5vw,104px)]"
  >
    <img
      src={PLATES.velvet.src}
      srcSet={PLATES.velvet.srcSet}
      sizes="100vw"
      width={PLATES.velvet.width}
      height={PLATES.velvet.height}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className="absolute inset-0 -z-10 h-full w-full object-cover opacity-90"
    />
    <div className="wrap text-center">
      <SectionHead id="gold-rate-h" tone="velvet" center title="Today's Gold Rate in Ghatkopar" />
      <p className="mx-auto mt-5 max-w-[60ch] text-[clamp(1rem,1.2vw,1.15rem)] font-light leading-relaxed text-glass-soft">
        Gold prices in Mumbai change every day. Here is today's benchmark rate – message us on WhatsApp for our shop
        rate at Ghatkopar West; we reply within minutes during shop hours.
      </p>
      <div className="mt-[clamp(36px,4.5vw,60px)]">
        <GoldRateCard location="rate_card" />
      </div>
      <Link
        to="/gold-rate-today-ghatkopar"
        className="mt-5 inline-flex min-h-[44px] items-center text-[0.95rem] text-brass-hi underline-offset-[5px] hover:underline"
      >
        24K vs 22K vs 18K explained<span aria-hidden="true">&nbsp;→</span>
      </Link>
    </div>
  </section>
);
