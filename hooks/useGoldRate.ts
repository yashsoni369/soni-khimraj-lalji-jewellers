import { useEffect, useState } from 'react';
import { fetchGoldRate, type GoldRate } from '@/lib/goldRate';

type State = { status: 'loading' } | { status: 'ok'; rate: GoldRate } | { status: 'error' };

// One request per page load, shared by every component that shows the rate.
let pending: Promise<GoldRate> | null = null;

function load(): Promise<GoldRate> {
  if (!pending) {
    pending = (
      import.meta.env.DEV
        ? fetchGoldRate() // no /api in `vite dev`; the upstream allows CORS
        : fetch('/api/gold-rate').then((r) => {
            if (!r.ok) throw new Error(`gold rate ${r.status}`);
            return r.json() as Promise<GoldRate>;
          })
    ).catch((err) => {
      pending = null;
      throw err;
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
