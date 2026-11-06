// Server-side IBJA rate cache, shared by the /api/gold-rate handler and the page
// loaders (home, gold-rate page). Per server instance:
//   - 10-min memory cache, so the upstream is called at most every 10 minutes
//   - concurrent misses share one in-flight upstream fetch
//   - upstream down or bad data → the last good rate is served
// `.js` extension: imported by server code that runs as native ESM.
import { fetchGoldRate, type GoldRate } from './goldRate.js';

const CACHE_TTL_MS = 10 * 60 * 1000;

let cached: { rate: GoldRate; fetchedAt: number } | null = null;
let inflight: Promise<GoldRate> | null = null;

export async function getGoldRate(now = Date.now()): Promise<GoldRate> {
  if (cached && now - cached.fetchedAt < CACHE_TTL_MS) return cached.rate;
  if (!inflight) {
    inflight = fetchGoldRate()
      .then((rate) => {
        cached = { rate, fetchedAt: Date.now() };
        return rate;
      })
      .finally(() => {
        inflight = null;
      });
  }
  try {
    return await inflight;
  } catch (err) {
    if (cached) return cached.rate;
    throw err;
  }
}

/** For page loaders: never throws, so a rate failure never breaks the page. */
export const getGoldRateOrNull = () => getGoldRate().catch(() => null);

/** Test hooks. */
export function __resetGoldRateCache() {
  cached = null;
  inflight = null;
}
export function __expireGoldRateCache() {
  if (cached) cached.fetchedAt = 0;
}
