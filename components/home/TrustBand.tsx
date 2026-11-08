// Trust band under the hero: proof points as plain text (no headings). Static and complete;
// the motion layer may turn [data-band] into a scroll-linked marquee.
export const TRUST_POINTS = [
  'BIS 916 hallmark',
  'HUID on every piece',
  '25+ years on Jivdaya Lane',
  'Old gold tested in front of you',
  'Open every day, Thursday too',
] as const;

export const TrustBand = () => (
  <section aria-label="Why families trust us" data-bg="#131917" className="border-y border-brass/25 bg-counter">
    <ul
      data-band
      className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-center gap-x-[clamp(14px,1.5vw,26px)] gap-y-2 px-4 py-[clamp(16px,1.8vw,26px)] font-display text-[clamp(1.05rem,1.3vw,1.45rem)] leading-snug text-[#c6aa78]"
    >
      {TRUST_POINTS.map((t, i) => (
        <li key={t} className="flex items-center gap-x-[clamp(14px,1.5vw,26px)]">
          {i > 0 && (
            <svg aria-hidden="true" viewBox="0 0 10 10" className="size-[0.42em] shrink-0 text-brass-soft">
              <path d="M5 0 10 5 5 10 0 5Z" fill="currentColor" />
            </svg>
          )}
          <span className="whitespace-nowrap">{t}</span>
        </li>
      ))}
    </ul>
  </section>
);
