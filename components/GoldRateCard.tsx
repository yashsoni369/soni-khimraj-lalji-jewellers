import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { todayInIndia, useGoldRate, useLoaderRate } from '@/hooks/useGoldRate';
import { formatInr, type MetalPrice } from '@/lib/goldRate';
import type { CtaLocation } from '@/lib/tracking';
import { createGoldRateMessage, whatsappUrl } from '@/services/whatsappService';
import { TrackedLink } from './TrackedCTA';
import { WhatsAppIcon } from './site/icons';

// "6 Nov" from the rate's ISO date (UTC, so server and client agree).
const cardDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' });

const Change = ({ pct }: { pct: number | null }) => {
  if (pct === null || pct === 0) return null;
  const up = pct > 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${up ? 'text-[#9fd8b4]' : 'text-[#f0b4a8]'}`}>
      <Icon size={13} aria-hidden="true" />
      <span className="sr-only">{up ? 'up' : 'down'}</span>
      {Math.abs(pct).toFixed(2)}%
    </span>
  );
};

const Row = ({ label, price, unit }: { label: string; price?: MetalPrice | null; unit?: string }) => (
  <div className="flex items-baseline justify-between gap-4 border-t border-brass/25 px-1 py-[clamp(10px,1.1vw,14px)]">
    <dt className="text-[clamp(1rem,1.5vw,1.2rem)] text-glass">{label}</dt>
    <dd className="flex flex-col items-end gap-0.5 text-right">
      {price ? (
        <>
          <span data-odo className="tabular text-[clamp(1.15rem,1.9vw,1.5rem)] text-glass">
            {formatInr(price.price)}
            {unit && <span className="text-[0.75em] text-glass-soft">{unit}</span>}
          </span>
          <Change pct={price.changePct} />
        </>
      ) : (
        <span className="block h-6 w-28 rounded-sm bg-white/10 motion-safe:animate-pulse" aria-hidden="true" />
      )}
    </dd>
  </div>
);

/**
 * IBJA benchmark rate in a brass-framed glass card, with a WhatsApp CTA for the shop's own
 * rate. On server-rendered pages the rate comes from the route loader (in the HTML); elsewhere
 * it is fetched in the browser. "Refresh rate" shows when the rate is over 3 days old or the
 * fetch failed. With no rate at all, only the WhatsApp ask is shown.
 */
export const GoldRateCard = ({ location }: { location: CtaLocation }) => {
  const state = useGoldRate(useLoaderRate());
  const rate = state.status === 'loading' ? null : state.rate;
  // IBJA skips Sundays and holidays, so only call it stale after 3 days.
  const stale = !!rate && rate.date < todayInIndia(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000));
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // "Today" is only known in the browser; render the button after hydration so server and client HTML match.
  const showRefresh = mounted && (state.status === 'error' || stale);
  const hasCard = state.status !== 'error' || !!rate;

  return (
    <div className="mx-auto w-full max-w-[600px] text-left">
      <div data-ratecard className="rate-card px-[clamp(18px,3.4vw,40px)] pb-[clamp(18px,2.4vw,28px)] pt-[clamp(22px,2.8vw,34px)]">
        <span aria-hidden="true" className="hinge left-[18%]" />
        <span aria-hidden="true" className="hinge right-[18%]" />
        {/* one glass sheen when the card arrives (MotionLayer); clipped to the glass, not the hinges */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <span
            data-sheen
            className="absolute -inset-y-[40%] -left-[60%] w-[40%] -skew-x-[14deg] bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0"
          />
        </span>
        {hasCard ? (
          <>
            <p className="font-display text-[clamp(1.35rem,2.4vw,2rem)] leading-tight text-brass-hi" aria-live="polite">
              Today&rsquo;s gold rate{' '}
              {/* source and date on their own line, so the title never wraps on a stray "·" */}
              <span className="mt-1.5 block whitespace-nowrap font-sans text-[0.8rem] font-medium uppercase tracking-[0.14em] text-[#c6aa78]">
                <abbr title="India Bullion &amp; Jewellers Association" className="no-underline">
                  IBJA
                </abbr>{' '}
                benchmark
                {rate ? (
                  <>
                    {' '}· <time dateTime={rate.date}>{cardDate(rate.date)}</time>
                  </>
                ) : (
                  <span className="sr-only"> (loading)</span>
                )}
              </span>
            </p>
            <dl className="mt-[clamp(14px,1.8vw,22px)] border-b border-brass/25">
              <Row label="24 carat (999)" price={rate?.gold.k24} />
              <Row label="22 carat (916)" price={rate?.gold.k22} />
              <Row label="18 carat (750)" price={rate?.gold.k18} />
              <Row label="Silver (999)" price={rate ? rate.silver : undefined} unit="/kg" />
            </dl>
            <p className="mt-4 text-center text-[0.9rem] leading-relaxed text-glass-soft">
              Per 10 g, before GST and making charges · Ask Mr. Soni for today&rsquo;s shop rate
              {showRefresh && (
                <>
                  {' '}
                  <button
                    type="button"
                    onClick={state.refresh}
                    disabled={state.refreshing}
                    className="inline-flex min-h-[44px] items-center px-1 text-brass-hi underline underline-offset-4 disabled:opacity-60"
                  >
                    {state.refreshing ? 'Refreshing…' : 'Refresh rate'}
                  </button>
                </>
              )}
            </p>
          </>
        ) : (
          <p className="pr-[clamp(64px,8vw,84px)] font-display text-[clamp(1.35rem,2.4vw,2rem)] leading-tight text-brass-hi">
            Today&rsquo;s gold rate on WhatsApp
            <span className="mt-2 block font-sans text-[0.95rem] leading-relaxed text-glass-soft">
              Mr. Soni will send today&rsquo;s 24K, 22K and 18K rate for our shop.
            </span>
          </p>
        )}
      </div>
      <div className="mt-7 text-center">
        <TrackedLink
          href={whatsappUrl(createGoldRateMessage())}
          target="_blank"
          rel="noopener noreferrer"
          track={{ cta: 'whatsapp', location, intent: 'gold_rate' }}
          className="btn btn-glass min-h-[52px] px-7 text-[1rem]"
        >
          <span className="btn-in">
            <WhatsAppIcon className="size-5" /> Get Our Shop&rsquo;s Rate on WhatsApp
          </span>
        </TrackedLink>
      </div>
    </div>
  );
};
