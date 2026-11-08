import { useEffect, useRef } from 'react';
import { Instagram, Play } from 'lucide-react';
import { TrackedLink } from '../TrackedCTA';
import { SectionHead } from '../site/SectionHead';
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_POSTS,
  INSTAGRAM_PROFILE,
  INSTAGRAM_REEL,
  postUrl,
} from '@/content/instagram';

// "From our Instagram": the shop's own posts, served from this site (no Instagram script,
// iframe or cookies). The reel plays muted only while it is on screen, never with reduced
// motion or Data Saver, and never before it is scrolled to (preload="none").
const ReelTile = () => {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const still =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (still) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const href = postUrl({ code: INSTAGRAM_REEL.code, kind: 'reel' });
  return (
    <TrackedLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      track={{ cta: 'social', location: 'instagram_strip', platform: 'instagram', url: href }}
      aria-label={INSTAGRAM_REEL.label}
      className="group relative block overflow-hidden rounded-md bg-counter-3 ring-1 ring-brass/30"
    >
      <video
        ref={video}
        src={INSTAGRAM_REEL.video}
        poster={INSTAGRAM_REEL.poster}
        width={INSTAGRAM_REEL.width}
        height={INSTAGRAM_REEL.height}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="aspect-[3/4] h-full w-full object-cover"
      />
      <span aria-hidden="true" className="absolute left-3 top-3 grid size-9 place-items-center rounded-full bg-counter/70 text-glass backdrop-blur-sm">
        <Play size={16} fill="currentColor" />
      </span>
    </TrackedLink>
  );
};

export const InstagramStrip = () => (
  <section id="instagram" aria-labelledby="instagram-h" data-bg="#131917" className="sec bg-counter">
    <div className="wrap">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <SectionHead id="instagram-h" title="Soni Khimraj Lalji Jewellers on Instagram" display="From our Instagram" />
        <TrackedLink
          href={INSTAGRAM_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          track={{ cta: 'social', location: 'instagram_strip', platform: 'instagram', url: INSTAGRAM_PROFILE }}
          className="btn btn-glass min-h-[52px] px-6 text-[1rem]"
        >
          <span className="btn-in">
            <Instagram size={18} aria-hidden="true" /> Follow {INSTAGRAM_HANDLE}
          </span>
        </TrackedLink>
      </div>

      {/* desktop: the reel (3:4) beside a 3x2 grid of squares, the two the same height */}
      <div className="mt-[clamp(28px,4vw,52px)] grid gap-[clamp(10px,1.2vw,16px)] md:grid-cols-[1fr_2fr]">
        <ReelTile />
        <ul className="grid grid-cols-2 gap-[clamp(10px,1.2vw,16px)] sm:grid-cols-3">
          {INSTAGRAM_POSTS.map((p) => {
            const href = postUrl(p);
            return (
              <li key={p.code}>
                <TrackedLink
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  track={{ cta: 'social', location: 'instagram_strip', platform: 'instagram', url: href }}
                  className="group relative block overflow-hidden rounded-md ring-1 ring-brass/30"
                >
                  <img
                    src={`/images/instagram/ig-${p.code}.webp`}
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    alt={p.alt}
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full bg-counter/70 text-glass opacity-90 backdrop-blur-sm"
                  >
                    {p.kind === 'reel' ? <Play size={14} fill="currentColor" /> : <Instagram size={15} />}
                  </span>
                </TrackedLink>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="mt-5 text-[0.95rem] text-glass-soft">
        Posts from our Instagram. Tap any one to see it there.
      </p>
    </div>
  </section>
);
