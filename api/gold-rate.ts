// Host adapter for GET/HEAD /api/gold-rate. All logic and protection lives in
// lib/goldRateHandler.ts (portable, Web-standard Request/Response).
// `.js` extension: the function runs as native ESM ("type": "module").
import { handleGoldRate } from '../lib/goldRateHandler.js';

export const GET = (request: Request) => handleGoldRate(request);
export const HEAD = GET;
export const POST = GET; // → 405 from the handler, with an Allow header
