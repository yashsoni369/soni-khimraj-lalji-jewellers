// IBJA benchmark gold & silver rates.
// Source today: snapdata.dev (free, no key) which republishes the IBJA rate with
// attribution. To switch to the official paid IBJA API, replace fetchGoldRate()
// only — the GoldRate shape is what the UI depends on.

export interface MetalPrice {
  /** INR */
  price: number;
  /** % change vs the previous trading day, if known */
  changePct: number | null;
}

export interface GoldRate {
  /** ISO date (YYYY-MM-DD) the rate applies to */
  date: string;
  /** 'final' or 'provisional' as reported upstream */
  status: string;
  /** per 10 grams */
  gold: { k24: MetalPrice; k22: MetalPrice; k18: MetalPrice };
  /** per kilogram */
  silver: MetalPrice | null;
  source: 'IBJA';
  via: string;
}

const BASE = 'https://snapdata.dev/api/v1';
const MAX_LOOKBACK_DAYS = 6;

interface Observation {
  date: string;
  instrument: string;
  value: number | null;
  change_pct: number | null;
  status: string;
}
interface Snapshot {
  coverage?: { to?: string };
  observations?: Observation[];
}

async function getJson(url: string): Promise<Snapshot | null> {
  const res = await fetch(url, { headers: { accept: 'application/json' } });
  if (!res.ok) return null;
  return (await res.json()) as Snapshot;
}

const find = (s: Snapshot | null, instrument: string) =>
  s?.observations?.find((o) => o.instrument === instrument && typeof o.value === 'number');

const isComplete = (s: Snapshot | null) =>
  !!(find(s, 'XAU.24K') && find(s, 'XAU.22K') && find(s, 'XAU.18K'));

function previousDay(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

/** Latest snapshot with real values, walking back over closed-market days. */
async function latestComplete(dataset: 'gold' | 'silver', check: (s: Snapshot | null) => boolean) {
  const latest = await getJson(`${BASE}/${dataset}/in/latest.json`);
  if (check(latest)) return latest;
  let day = latest?.coverage?.to ?? new Date().toISOString().slice(0, 10);
  for (let i = 0; i < MAX_LOOKBACK_DAYS; i++) {
    day = previousDay(day);
    const snap = await getJson(`${BASE}/${dataset}/in/${day}.json`);
    if (check(snap)) return snap;
  }
  return null;
}

const toPrice = (o: Observation | undefined, multiplier: number): MetalPrice | null =>
  o && typeof o.value === 'number'
    ? { price: Math.round(o.value * multiplier), changePct: typeof o.change_pct === 'number' ? o.change_pct : null }
    : null;

export async function fetchGoldRate(): Promise<GoldRate> {
  const [gold, silver] = await Promise.all([
    latestComplete('gold', isComplete),
    latestComplete('silver', (s) => !!find(s, 'XAG')).catch(() => null),
  ]);
  if (!gold) throw new Error('gold rate unavailable');

  const k24 = find(gold, 'XAU.24K')!;
  return {
    date: k24.date,
    status: k24.status,
    gold: {
      k24: toPrice(k24, 10)!,
      k22: toPrice(find(gold, 'XAU.22K'), 10)!,
      k18: toPrice(find(gold, 'XAU.18K'), 10)!,
    },
    silver: toPrice(find(silver, 'XAG'), 1),
    source: 'IBJA',
    via: 'snapdata.dev',
  };
}

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
export const formatInr = (n: number) => inr.format(n);

export const formatRateDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
