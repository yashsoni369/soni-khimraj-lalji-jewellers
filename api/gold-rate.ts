// Vercel Function: GET /api/gold-rate → normalised IBJA benchmark rates.
// Cached at the edge for 30 min; serves stale for a day if the upstream is down.
// `.js` extension: the function runs as native ESM ("type": "module"), where
// extensionless relative imports fail. TypeScript maps it back to goldRate.ts.
import { fetchGoldRate } from '../lib/goldRate.js';

export async function GET() {
  try {
    const rate = await fetchGoldRate();
    return Response.json(rate, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=1800, stale-while-revalidate=86400, stale-if-error=604800',
      },
    });
  } catch {
    return Response.json(
      { error: 'unavailable' },
      { status: 503, headers: { 'Cache-Control': 'public, s-maxage=60' } },
    );
  }
}
