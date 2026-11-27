import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { ServicePageContent } from '@/content/pages';
import { formatDayMonth, formatInr, formatRateDate, type GoldHistoryDay, type GoldRate } from '@/lib/goldRate';

// Gold-rate page: per-gram rates and the last trading days, from the route loader so both
// tables are in the server HTML. A table is left out when its data is missing.

const WEIGHTS = [1, 8, 10, 100];
const SILVER_WEIGHTS = [1, 10, 100, 1000];
const gramsLabel = (g: number) => (g >= 1000 ? `${g / 1000} kg` : `${g} g`);
const SHOWN_DAYS = 10;

const th = 'whitespace-nowrap py-3 pr-4 text-left text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[#c6aa78] last:pr-0';
const td = 'tabular whitespace-nowrap border-t border-brass/25 py-[clamp(10px,1.2vw,14px)] pr-4 text-[clamp(0.98rem,1.3vw,1.15rem)] text-glass last:pr-0';

const Change = ({ diff }: { diff: number }) => {
  if (diff === 0) return <span className="text-glass-soft">no change</span>;
  const up = diff > 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={`inline-flex items-center gap-0.5 ${up ? 'text-[#9fd8b4]' : 'text-[#f0b4a8]'}`}>
      <Icon size={14} aria-hidden="true" />
      <span className="sr-only">{up ? 'up' : 'down'} </span>
      {formatInr(Math.abs(diff))}
    </span>
  );
};

export const GoldRateTables = ({
  copy,
  rate,
  history,
}: {
  copy: NonNullable<ServicePageContent['rateTables']>;
  rate: GoldRate | null;
  history: GoldHistoryDay[] | null;
}) => {
  const days = history?.slice(0, SHOWN_DAYS) ?? [];
  if (!rate && !days.length) return null;

  return (
    <section aria-label="Gold rate tables" data-bg="#17392d" className="velvet-ground relative overflow-clip py-[clamp(56px,7vw,104px)]">
      <div className="wrap grid gap-[clamp(48px,6vw,88px)] lg:grid-cols-2">
        {rate && (
          <div className="min-w-0">
            <h2 id="rate-per-gram" className="kicker text-brass-hi">
              {copy.perGramHeading}
            </h2>
            <div className="mt-6 overflow-x-auto">
              <table aria-labelledby="rate-per-gram" className="w-full min-w-[340px] border-collapse border-b border-brass/25">
                <caption className="sr-only">
                  IBJA gold rate on {formatRateDate(rate.date)} for 1, 8, 10 and 100 grams
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className={th}>Weight</th>
                    <th scope="col" className={th}>24K (999)</th>
                    <th scope="col" className={th}>22K (916)</th>
                    <th scope="col" className={th}>18K (750)</th>
                  </tr>
                </thead>
                <tbody>
                  {WEIGHTS.map((g) => (
                    <tr key={g}>
                      <th scope="row" className={`${td} text-left font-normal text-glass-soft`}>
                        {g} g
                      </th>
                      <td className={td}>{formatInr((rate.gold.k24.price * g) / 10)}</td>
                      <td className={td}>{formatInr((rate.gold.k22.price * g) / 10)}</td>
                      <td className={td}>{formatInr((rate.gold.k18.price * g) / 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-glass-soft">
              <time dateTime={rate.date}>{formatRateDate(rate.date)}</time> · {copy.perGramNote}
            </p>

            {/* Marathi rate line: searchers also type "आज सोन्याचा दर घाटकोपर" */}
            <div lang="mr" className="mt-10">
              <h3 className="text-[1.05rem] font-semibold text-brass-hi">{copy.marathiHeading}</h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-glass">
                आज २२ कॅरेट (916) सोन्याचा दर {formatInr(rate.gold.k22.price)} प्रति १० ग्रॅम, २४ कॅरेट (999){' '}
                {formatInr(rate.gold.k24.price)} आणि १८ कॅरेट (750) {formatInr(rate.gold.k18.price)} आहे (IBJA,{' '}
                {formatDayMonth(rate.date)}). GST आणि मजुरी वेगळी.
              </p>
            </div>

            {rate.silver && (
              <>
                <h2 id="rate-silver" className="kicker mt-14 text-brass-hi">
                  {copy.silverHeading}
                </h2>
                <div className="mt-6 overflow-x-auto">
                  <table aria-labelledby="rate-silver" className="w-full min-w-[300px] border-collapse border-b border-brass/25">
                    <caption className="sr-only">
                      IBJA 999 silver rate on {formatRateDate(rate.date)} for 1 gram, 10 grams, 100 grams and 1 kg
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" className={th}>Weight</th>
                        <th scope="col" className={th}>Silver (999)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SILVER_WEIGHTS.map((g) => (
                        <tr key={g}>
                          <th scope="row" className={`${td} text-left font-normal text-glass-soft`}>
                            {gramsLabel(g)}
                          </th>
                          <td className={td}>{formatInr((rate.silver!.price * g) / 1000)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-glass-soft">{copy.silverNote}</p>
              </>
            )}
          </div>
        )}

        {days.length > 0 && (
          <div className="min-w-0">
            <h2 id="rate-history" className="kicker text-brass-hi">
              {copy.historyHeading}
            </h2>
            <div className="mt-6 overflow-x-auto">
              <table aria-labelledby="rate-history" className="w-full min-w-[340px] border-collapse border-b border-brass/25">
                <caption className="sr-only">
                  IBJA gold rate per 10 grams for the last {days.length} trading days, with the 22K change from the day before
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className={th}>Date</th>
                    <th scope="col" className={th}>24K</th>
                    <th scope="col" className={th}>22K</th>
                    <th scope="col" className={th}>18K</th>
                  </tr>
                </thead>
                <tbody>
                  {days.map((d, i) => {
                    const prev = history?.[i + 1];
                    return (
                      <tr key={d.date}>
                        <th scope="row" className={`${td} text-left font-normal text-glass-soft`}>
                          <time dateTime={d.date}>{formatDayMonth(d.date)}</time>
                        </th>
                        <td className={td}>{formatInr(d.k24)}</td>
                        <td className={td}>
                          {formatInr(d.k22)}
                          {/* the day's 22K move sits under the price, like the rate card */}
                          {prev && (
                            <span className="block text-[0.8rem]">
                              <Change diff={d.k22 - prev.k22} />
                            </span>
                          )}
                        </td>
                        <td className={td}>{formatInr(d.k18)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-glass-soft">{copy.historyNote}</p>
          </div>
        )}
      </div>
    </section>
  );
};
