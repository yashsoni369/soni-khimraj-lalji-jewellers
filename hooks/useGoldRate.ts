import { useEffect, useState } from 'react';
import { fetchGoldRate, type GoldRate } from '@/lib/goldRate';

type State = { status: 'loading' } | { status: 'ok'; rate: GoldRate } | { status: 'error' };

const STORAGE_KEY = 'skl-gold-rate';
const STORAGE_TTL_MS = 10 * 60 * 1000;

// Session cache: reloads, new tabs and page changes within 10 min reuse the rate
// instead of calling the API again. Storage can be blocked (private mode), so
// every access is guarded.
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
              if (!r.ok) throw new Error(`gold rate ${r.status}`); // 429/503 → WhatsApp-only fallback
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

/** Always 'loading' on the server and first client render, so hydration matches. */
export function useGoldRate(): State {
  const [state, setState] = useState<State>({ status: 'loading' });
  useEffect(() => {
    let alive = true;
    load().then(
      (rate) => alive && setState({ status: 'ok', rate }),
      () => alive && setState({ status: 'error' }),
    );
    return () => {
      alive = false;
    };
  }, []);
  return state;
}
