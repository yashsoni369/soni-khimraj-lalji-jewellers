// In-memory fixed-window rate limiter for Vercel Functions.
// Per instance: Fluid Compute reuses instances, so this stops a single client
// hammering an endpoint, but limits are not shared across instances/regions.
// For a hard global limit, back this with a shared store (e.g. Redis).

interface Window {
  count: number;
  resetAt: number;
}

export interface RateLimitResult {
  ok: boolean;
  limit: number;
  remaining: number;
  /** seconds until the window resets */
  retryAfter: number;
}

const MAX_TRACKED_KEYS = 10_000;

export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const windows = new Map<string, Window>();

  function sweep(now: number) {
    for (const [key, w] of windows) if (w.resetAt <= now) windows.delete(key);
    // Still too big (e.g. a flood of spoofed keys): drop the oldest entries.
    if (windows.size > MAX_TRACKED_KEYS) {
      const excess = windows.size - MAX_TRACKED_KEYS;
      let i = 0;
      for (const key of windows.keys()) {
        if (i++ >= excess) break;
        windows.delete(key);
      }
    }
  }

  return function check(key: string, now = Date.now()): RateLimitResult {
    if (windows.size > MAX_TRACKED_KEYS) sweep(now);
    let w = windows.get(key);
    if (!w || w.resetAt <= now) {
      w = { count: 0, resetAt: now + windowMs };
      windows.set(key, w);
    }
    w.count++;
    return {
      ok: w.count <= limit,
      limit,
      remaining: Math.max(0, limit - w.count),
      retryAfter: Math.max(1, Math.ceil((w.resetAt - now) / 1000)),
    };
  };
}

/**
 * Client IP for rate limiting. Only proxy-set values are trusted (MDN/OWASP: the
 * leftmost X-Forwarded-For entry is client-controlled and spoofable):
 *   1. `x-real-ip` – set by the hosting proxy (Vercel, nginx) and not client-forgeable there
 *   2. rightmost `x-forwarded-for` hop – appended by the nearest proxy
 */
export function clientIp(request: Request): string {
  const real = request.headers.get('x-real-ip')?.trim();
  if (real) return real;
  const hops = request.headers.get('x-forwarded-for')?.split(',').map((h) => h.trim()).filter(Boolean);
  return hops?.length ? hops[hops.length - 1] : 'unknown';
}
