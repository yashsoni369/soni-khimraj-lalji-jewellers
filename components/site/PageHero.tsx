import type { ReactNode } from 'react';

// Hero for the editorial pages (our story, collections, gemstones): a wide plate on the
// left-dark gradient, the <h1> as the keyword kicker and a display line beneath, like the homepage.
// LCP: the plate is the LCP image, so it is eager, high priority and never faded or hidden.

export type HeroPlate = { src: string; srcSet: string; width: number; height: number };

export const heroPlate = (name: string): HeroPlate => ({
  src: `/images/redesign/${name}-1280.webp`,
  srcSet: `/images/redesign/${name}-1280.webp 1280w, /images/redesign/${name}-1920.webp 1920w`,
  width: 1280,
  height: 714,
});

/** `links` entry that preloads a hero plate (use in each route module). */
export const heroPreload = (plate: HeroPlate) => ({
  rel: 'preload',
  as: 'image',
  type: 'image/webp',
  href: plate.src,
  imageSrcSet: plate.srcSet,
  imageSizes: '100vw',
  fetchPriority: 'high',
});

export const PageHero = ({
  id,
  plate,
  alt,
  h1,
  display,
  lede,
  children,
}: {
  id: string;
  plate: HeroPlate;
  alt: string;
  h1: string;
  display: ReactNode;
  lede: ReactNode;
  children?: ReactNode;
}) => (
  <section
    aria-labelledby={id}
    className="relative isolate flex min-h-[max(480px,calc(78svh-var(--hdr)))] items-end overflow-clip bg-counter-3 pb-[clamp(40px,6vw,88px)] pt-16 md:items-center md:pb-[clamp(48px,6vw,96px)]"
  >
    <img
      src={plate.src}
      srcSet={plate.srcSet}
      sizes="100vw"
      width={plate.width}
      height={plate.height}
      fetchPriority="high"
      decoding="async"
      alt={alt}
      className="hero-img absolute inset-0 -z-10 h-full w-full object-cover object-[68%_50%]"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b0f0d]/90 via-[#0b0f0d]/55 to-[#0b0f0d]/10 md:from-[#0b0f0d]/95 md:via-[#0b0f0d]/60 md:to-transparent"
    />
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0b0f0d]/40 md:hidden" />
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-[#0d1210]/80 to-transparent" />
    <div className="wrap">
      {/* H1 first in the HTML (SEO, word for word), shown under the display line */}
      <div className="flex max-w-[44rem] flex-col">
        <h1 id={id} className="kicker order-2 mt-4 text-[#c6aa78]">
          {h1}
        </h1>
        <p data-reveal="heading" className="display order-1 font-bold tracking-[-0.025em] text-[clamp(2.4rem,5.2vw,5rem)] leading-[1.06] text-glass">
          {display}
        </p>
        <p className="order-3 mt-5 max-w-[36rem] text-[clamp(1.05rem,1.4vw,1.25rem)] font-light leading-relaxed text-glass-soft">{lede}</p>
        {children && <div className="order-4 mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">{children}</div>}
      </div>
    </div>
  </section>
);
