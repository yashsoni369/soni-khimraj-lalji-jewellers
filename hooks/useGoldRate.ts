import { useCallback, useEffect, useState } from 'react';
import { fetchGoldRate, type GoldRate } from '@/lib/goldRate';

type State =
  | { status: 'loading' }
  | { status: 'ok'; rate: GoldRate; live: boolean }
  | { status: 'error'; rate: GoldRate | null };

const STORAGE_KEY = 'skl-gold-rate';
const STORAGE_TTL_MS = 10 * 60 * 1000;
export const SEED_ELEMENT_ID = 'skl-gold-rate';

// --- Build-time seed ---------------------------------------------------------
// scripts/prerender.mjs fetches the IBJA rate once per build, calls seedGoldRate()
// before rendering and writes the same JSON into <script id="skl-gold-rate">.
// Server render and first client render both start from that rate, so the HTML
// contains real prices for crawlers that don't run JavaScript (ChatGPT, Claude,
// Perplexity) and hydration still matches.
let serverSeed: GoldRate | null = null;

export function seedGoldRate(rate: GoldRate | null) {
  serverSeed = rate;
}

function readSeed(): GoldRate | null {
  if (typeof document === 'undefined') return serverSeed;
  try {
    const el = document.getElementById(SEED_ELEMENT_ID);
    const rate = el?.textContent ? (JSON.parse(el.textContent) as GoldRate) : null;
    return rate?.gold?.k22?.price ? rate : null;
  } catch {
    return null;
  }
}

// --- Session cache -----------------------------------------------------------
// Reloads, new tabs and page changes within 10 min reuse the live rate instead of
// calling the API again. Storage can be blocked (private mode), so every access
// is guarded.
function readStored(): GoldRate | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { rate, savedAt } = JSON.parse(raw) as { rate: GoldRate; savedAt: number };
    return Date.now() - savedAt < STORAGE_TTL_MS && rate?.gold?.k22?.price ? rate : null;
  } catch {
    return null;
  }
}

function store(rate: GoldRate) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ rate, savedAt: Date.now() }));
  } catch {
    /* storage unavailable – fine */
  }
}

function clearStored() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable – fine */
  }
}

// One request per page load, shared by every component that shows the rate.
let pending: Promise<GoldRate> | null = null;

function load(): Promise<GoldRate> {
  if (!pending) {
    const stored = readStored();
    pending = stored
      ? Promise.resolve(stored)
      : (import.meta.env.DEV
          ? fetchGoldRate() // no /api in `vite dev`; the upstream allows CORS
          : fetch('/api/gold-rate').then((r) => {
              if (!r.ok) throw new Error(`gold rate ${r.status}`); // 429/503 → keep the seed / WhatsApp CTA
              return r.json() as Promise<GoldRate>;
            })
        ).then((rate) => {
          store(rate);
          return rate;
        });
    pending.catch(() => {
      pending = null;
    });
  }
  return pending;
}

function initialState(): State {
  const seed = readSeed();
  return seed ? { status: 'ok', rate: seed, live: false } : { status: 'loading' };
}

/** Today's date in India (YYYY-MM-DD), the calendar IBJA publishes on. */
export function todayInIndia(now = new Date()): string {
  return new Date(now.getTime() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

/**
 * Starts from the build-time seed (same on server and first client render), then
 * swaps in the live rate. `refresh()` drops the session cache and fetches again.
 */
export function useGoldRate(): State & { refresh: () => void; refreshing: boolean } {
  const [state, setState] = useState<State>(initialState);
  const [refreshing, setRefreshing] = useState(false);

  const run = useCallback((isAlive: () => boolean) => {
    return load().then(
      (rate) => isAlive() && setState({ status: 'ok', rate, live: true }),
      () =>
        isAlive() &&
        setState((prev) => ({ status: 'error', rate: prev.status === 'loading' ? null : prev.rate })),
    );
  }, []);

  useEffect(() => {
    let alive = true;
    run(() => alive);
    return () => {
      alive = false;
    };
  }, [run]);

  const refresh = useCallback(() => {
    clearStored();
    pending = null;
    setRefreshing(true);
    run(() => true).finally(() => setRefreshing(false));
  }, [run]);

  return { ...state, refresh, refreshing };
}
