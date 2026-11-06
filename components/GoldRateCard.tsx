import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { todayInIndia, useGoldRate, useLoaderRate } from '@/hooks/useGoldRate';
import { formatInr, formatRateDate, type MetalPrice } from '@/lib/goldRate';
import type { CtaLocation } from '@/lib/tracking';
import { createGoldRateMessage, whatsappUrl } from '@/services/whatsappService';
import { TrackedLink } from './TrackedCTA';

const Change = ({ pct }: { pct: number | null }) => {
  if (pct === null || pct === 0) return null;
  const up = pct > 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${up ? 'text-green-300' : 'text-red-200'}`}>
      <Icon size={14} aria-hidden="true" />
      <span className="sr-only">{up ? 'up' : 'down'}</span>
      {Math.abs(pct).toFixed(2)}%
    </span>
  );
};

const Row = ({ label, sub, price, unit }: { label: string; sub: string; price?: MetalPrice | null; unit: string }) => (
  <div className="flex flex-col items-center justify-center gap-1 px-3 py-5 border border-gold-400/30 bg-maroon-950/40">
    <dt className="text-xs uppercase tracking-[0.2em] text-gold-300">
      {label} <span className="text-maroon-100/80 normal-case tracking-normal">({sub})</span>
    </dt>
    <dd className="flex flex-col items-center gap-1">
      {price ? (
        <>
          <span className="font-serif text-2xl md:text-3xl text-white tabular-nums">{formatInr(price.price)}</span>
          <span className="text-[11px] text-maroon-100/80">{unit}</span>
          <Change pct={price.changePct} />
        </>
      ) : (
        <span className="h-8 w-28 rounded-sm bg-white/10 animate-pulse" aria-hidden="true" />
      )}
    </dd>
  </div>
);

/**
 * IBJA benchmark rate with a WhatsApp CTA for the shop's own rate. On server-rendered
 * pages the rate comes from the route loader (in the HTML); elsewhere it is fetched
 * in the browser. "Refresh rate" shows when the rate is over 3 days old or the fetch
 * failed. With no rate at all, only the CTA is shown.
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

  return (
    <div className="text-left">
      {(state.status !== 'error' || rate) && (
        <>
          <p className="text-center text-sm text-maroon-100 mb-4" aria-live="polite">
            {rate ? (
              <>
                IBJA benchmark rate for <time dateTime={rate.date}>{formatRateDate(rate.date)}</time>
              </>
            ) : (
              'Loading today’s IBJA rate…'
            )}
          </p>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-4">
            <Row label="24K" sub="999" price={rate?.gold.k24} unit="per 10 g" />
            <Row label="22K" sub="916" price={rate?.gold.k22} unit="per 10 g" />
            <Row label="18K" sub="750" price={rate?.gold.k18} unit="per 10 g" />
            <Row label="Silver" sub="999" price={rate ? rate.silver : undefined} unit="per kg" />
          </dl>
          <p className="text-center text-xs text-maroon-100/80 leading-relaxed mb-8">
            Benchmark rate published by the India Bullion &amp; Jewellers Association (IBJA), excluding 3% GST and making
            charges. Our shop rate may differ.
            {showRefresh && (
              <>
                {' '}
                <button
                  type="button"
                  onClick={state.refresh}
                  disabled={state.refreshing}
                  className="underline underline-offset-2 text-gold-300 hover:text-gold-200 disabled:opacity-60"
                >
                  {state.refreshing ? 'Refreshing…' : 'Refresh rate'}
                </button>
              </>
            )}
          </p>
        </>
      )}
      <div className="text-center">
        <TrackedLink
          href={whatsappUrl(createGoldRateMessage())}
          target="_blank"
          rel="noopener noreferrer"
          track={{ cta: 'whatsapp', location, intent: 'gold_rate' }}
          className="inline-flex items-center gap-3 bg-gold-500 hover:bg-gold-400 text-maroon-950 px-7 py-3 md:py-4 rounded-sm font-semibold tracking-wide transition-all shadow-xl hover:-translate-y-0.5"
        >
          Get Our Shop’s Rate on WhatsApp
        </TrackedLink>
      </div>
    </div>
  );
};
