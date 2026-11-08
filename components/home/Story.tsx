import { STORE_INFO } from '../../constants';

// Heritage: the existing paragraph (verbatim) as the story text, then three rolling numbers.
// Motion hooks: [data-fill] lights words up as you read; [data-odo] rolls each number once.
export const Story = () => (
  <section id="heritage" aria-labelledby="heritage-h" data-bg="#0c0f0e" className="sec bg-counter-3">
    <div className="wrap">
      <h2 id="heritage-h" className="kicker text-[#c6aa78]">
        Trusted Jewellers in Ghatkopar West for Over 25 Years
      </h2>
      <p
        data-fill
        className="mt-[clamp(20px,2.6vw,36px)] max-w-[44ch] font-display text-[clamp(1.45rem,2.55vw,2.35rem)] leading-[1.38] text-glass"
      >
        For more than 25 years, Soni Khimraj Lalji Jewellers has been the family jeweller of Ghatkopar West, Mumbai.
        From our shop on Jivdaya Lane we offer BIS hallmarked 22K gold jewellery, diamond jewellery, silver, bridal
        Kundan &amp; Polki sets and mangalsutras – many handcrafted by karigars who have inherited their skills through
        generations. Every piece carries our promise of pure gold, honest weight and the personal care of Mr. Soni
        himself.
      </p>
      {/* the shop's facts as one brass-framed glass label (the rate card's material), numbers inline */}
      <ul className="rate-card mt-[clamp(40px,5vw,72px)] grid max-w-[980px] divide-y divide-brass/25 px-[clamp(20px,3vw,40px)] py-2 font-display text-[clamp(1.15rem,1.7vw,1.5rem)] leading-snug text-glass md:grid-cols-3 md:divide-x md:divide-y-0 md:py-6">
        <li className="py-4 md:px-6 md:py-1 md:first:pl-0">
          <span className="text-brass-hi tabular">
            <span data-odo="25">25</span>+
          </span>{' '}
          years on Jivdaya&nbsp;Lane
        </li>
        <li className="py-4 md:px-6 md:py-1">
          BIS <span className="text-brass-hi tabular"><span data-odo="916">916</span></span> hallmark on 22K gold
        </li>
        <li className="py-4 md:px-6 md:py-1 md:last:pr-0">
          Open <span className="text-brass-hi tabular"><span data-odo="7">7</span></span> days a week
          <span className="block font-sans text-[0.95rem] text-glass-soft">{STORE_INFO.hours}</span>
        </li>
      </ul>
    </div>
  </section>
);
