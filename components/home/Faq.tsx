import { Plus } from 'lucide-react';
import { FAQS, STORE_INFO } from '../../constants';
import { TrackedLink } from '../TrackedCTA';

// FAQ: every question (H3) and answer word for word, in native <details>; the first is open.
export const Faq = () => (
  <section id="faq" aria-labelledby="faq-h" data-bg="#181c1a" className="sec bg-counter-2">
    <div className="wrap max-w-[1000px]">
      <h2 id="faq-h" className="kicker text-[#c6aa78]">
        Frequently Asked Questions
      </h2>
      <div className="faq mt-[clamp(24px,3vw,40px)] border-b border-brass/25">
        {FAQS.map((f, i) => (
          <details key={f.q} className="group border-t border-brass/25" open={i === 0}>
            <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5">
              <h3 className="font-display text-[clamp(1.2rem,1.9vw,1.6rem)] leading-snug text-glass">{f.q}</h3>
              <Plus
                size={22}
                aria-hidden="true"
                className="shrink-0 text-brass transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
              />
            </summary>
            <p className="max-w-[68ch] pb-6 text-[1.05rem] font-light leading-relaxed text-glass-soft">{f.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-8 text-[1rem] text-glass-soft">
        Still have a question? Call or WhatsApp us on{' '}
        <TrackedLink
          href={`tel:${STORE_INFO.phone}`}
          track={{ cta: 'phone', location: 'faq', phoneNumber: STORE_INFO.phone }}
          className="inline-flex min-h-[44px] items-center font-semibold text-brass-hi underline underline-offset-4 tabular"
        >
          {STORE_INFO.phoneDisplay}
        </TrackedLink>
        .
      </p>
    </div>
  </section>
);
