import { useCallback, useEffect, useState } from 'react';
import { useMatches } from 'react-router';
import type { GoldRate } from '@/lib/goldRate';

type State =
  | { status: 'loading' }
  | { status: 'ok'; rate: GoldRate }
  | { status: 'error'; rate: GoldRate | null };

const STORAGE_KEY = 'skl-gold-rate';
const STORAGE_TTL_MS = 10 * 60 * 1000;

// --- Session cache -----------------------------------------------------------
// Reloads, new tabs and page changes within 10 min reuse the rate instead of
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
      : fetch('/api/gold-rate')
          .then((r) => {
            if (!r.ok) throw new Error(`gold rate ${r.status}`); // 429/503 → keep what we have / WhatsApp CTA
            return r.json() as Promise<GoldRate>;
          })
          .then((rate) => {
            store(rate);
            return rate;
          });
    pending.catch(() => {
      pending = null;
    });
  }
  return pending;
}

/** Today's date in India (YYYY-MM-DD), the calendar IBJA publishes on. */
export function todayInIndia(now = new Date()): string {
  return new Date(now.getTime() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

/**
 * The rate a server loader put in this page's data (home and gold-rate pages),
 * or null on pre-rendered pages. Identical on server and client, so hydration matches.
 */
export function useLoaderRate(): GoldRate | null {
  const matches = useMatches();
  for (const m of matches) {
    const rate = (m.loaderData as { rate?: GoldRate | null } | undefined)?.rate;
    if (rate?.gold?.k22?.price) return rate;
  }
  return null;
}

/**
 * Server-rendered pages start from the loader's rate (in the HTML, readable without
 * JavaScript) and need no extra request. Pre-rendered pages fetch it once per session.
 * `refresh()` drops the session cache and fetches again.
 */
export function useGoldRate(initial: GoldRate | null = null) {
  const [state, setState] = useState<State>(() => (initial ? { status: 'ok', rate: initial } : { status: 'loading' }));
  const [refreshing, setRefreshing] = useState(false);

  const run = useCallback(
    (isAlive: () => boolean) =>
      load().then(
        (rate) => isAlive() && setState({ status: 'ok', rate }),
        () => isAlive() && setState((prev) => ({ status: 'error', rate: prev.status === 'loading' ? null : prev.rate })),
      ),
    [],
  );

  useEffect(() => {
    if (initial) {
      store(initial); // later pages in this session reuse it
      return;
    }
    let alive = true;
    run(() => alive);
    return () => {
      alive = false;
    };
  }, [initial, run]);

  const refresh = useCallback(() => {
    clearStored();
    pending = null;
    setRefreshing(true);
    run(() => true).finally(() => setRefreshing(false));
  }, [run]);

  return { ...state, refresh, refreshing };
}
