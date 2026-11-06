// GET/HEAD /api/gold-rate (resource route). All logic and protection lives in
// lib/goldRateHandler.ts (portable, Web-standard Request/Response).
import type { Route } from './+types/api.gold-rate';
import { handleGoldRate } from '../../lib/goldRateHandler';

export const loader = ({ request }: Route.LoaderArgs) => handleGoldRate(request);
export const action = ({ request }: Route.ActionArgs) => handleGoldRate(request); // → 405 with Allow header
