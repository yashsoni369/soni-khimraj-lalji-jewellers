// Cache-Control for server-rendered pages. Browsers always re-check (max-age=0);
// the CDN serves a copy for 10 min, then keeps serving it for up to 1 h while it
// re-renders in the background (stale-while-revalidate). No scheduler involved:
// the first request after 10 min triggers the refresh.
// Query strings (?utm_...) are separate cache entries; each miss costs one render,
// and the upstream rate is still fetched at most every 10 min (lib/goldRateCache.ts).
export const SSR_PAGE_CACHE = 'public, max-age=0, s-maxage=600, stale-while-revalidate=3600';
export const NOT_FOUND_CACHE = 'public, max-age=0, s-maxage=3600';
