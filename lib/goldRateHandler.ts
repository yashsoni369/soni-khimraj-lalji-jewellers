// Portable GET /api/gold-rate handler. Web-standard Request/Response only, so it
// runs on any host that supports the Fetch API (Node 18+, Vercel, Netlify,
// Cloudflare, Deno). All protection lives here, not in host configuration:
//   1. GET/HEAD only                    → 405 otherwise
//   2. no query strings                 → 400 (stops cache-busting / junk)
//   3. per-IP rate limit (in-memory)    → 429 with Retry-After
//   4. 10-min in-memory cache, one shared upstream fetch, last-good fallback
//   5. upstream timeout + value sanity checks (lib/goldRate.ts)
// `.js` extensions: the function runs as native ESM ("type": "module").
import { fetchGoldRate, type GoldRate } from './goldRate.js';
import { clientIp, createRateLimiter } from './rateLimit.js';

const CACHE_TTL_MS = 10 * 60 * 1000;
const RATE_LIMIT = 30; // requests per IP per window (a real visitor needs ~1 per 10 min)
const RATE_WINDOW_S = 60;
const limiter = createRateLimiter({ limit: RATE_LIMIT, windowMs: RATE_WINDOW_S * 1000 });

let cached: { rate: GoldRate; fetchedAt: number } | null = null;
let inflight: Promise<GoldRate> | null = null;

const BASE_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex',
};

function json(body: unknown, status: number, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), { status, headers: { ...BASE_HEADERS, ...headers } });
}

async function getRate(now: number): Promise<GoldRate> {
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
    if (cached) return cached.rate; // upstream down or bad data: serve the last good rate
    throw err;
  }
}

export async function handleGoldRate(request: Request): Promise<Response> {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return json({ error: 'method not allowed' }, 405, { Allow: 'GET, HEAD', 'Cache-Control': 'no-store' });
  }
  if (new URL(request.url).search) {
    return json({ error: 'unexpected query' }, 400, { 'Cache-Control': 'no-store' });
  }

  const limit = limiter(clientIp(request));
  // IETF draft-ietf-httpapi-ratelimit-headers format.
  const limitHeaders = {
    'RateLimit-Policy': `"default";q=${limit.limit};w=${RATE_WINDOW_S}`,
    RateLimit: `"default";r=${limit.remaining};t=${limit.retryAfter}`,
  };
  if (!limit.ok) {
    return json({ error: 'too many requests' }, 429, {
      ...limitHeaders,
      'Retry-After': String(limit.retryAfter),
      'Cache-Control': 'no-store',
    });
  }

  try {
    const rate = await getRate(Date.now());
    // Browser-only caching: no shared/CDN cache, so every request reaches the rate limiter.
    return json(rate, 200, { ...limitHeaders, 'Cache-Control': 'private, max-age=300' });
  } catch {
    return json({ error: 'unavailable' }, 503, { ...limitHeaders, 'Cache-Control': 'no-store', 'Retry-After': '60' });
  }
}

/** Test hooks. */
export function __resetGoldRateCache() {
  cached = null;
  inflight = null;
}
export function __expireGoldRateCache() {
  if (cached) cached.fetchedAt = 0;
}
