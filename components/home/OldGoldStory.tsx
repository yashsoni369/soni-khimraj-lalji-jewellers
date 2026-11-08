import { Link } from 'react-router';
import { MessageCircle } from 'lucide-react';
import {
  whatsappUrl,
  createKnowledgeMessage,
  createOldGoldValuationMessage,
} from '../../services/whatsappService';
import { TrackedLink } from '../TrackedCTA';
import { SectionHead } from '../site/SectionHead';
import { WhatsAppIcon } from '../site/icons';
import { PLATES, imgProps } from '../site/media';

// Old gold, tested / weighed / valued in front of you. Static split: the copy column sticks on
// desktop while the three steps scroll past; the motion layer may pin [data-oldgold] instead.
const STEPS = [
  { n: '01', title: 'Tested', text: 'A streak on the touchstone shows the purity, while you watch.', plate: PLATES.stepTested },
  { n: '02', title: 'Weighed', text: 'On the scale, where you can read every digit.', plate: PLATES.stepWeighed },
  { n: '03', title: 'Valued', text: 'At the day’s rate, worked out in front of you.', plate: PLATES.stepValued },
];

const KNOWLEDGE = [
  {
    topic: 'bis_hallmark' as const,
    about: 'the BIS Hallmark & HUID on your jewellery',
    title: 'BIS Hallmark & HUID',
    text: 'Trust and transparency in every gram.',
  },
  {
    topic: 'diamond_4cs' as const,
    about: 'the 4Cs of diamond quality',
    title: 'Diamond Quality Guide',
    text: 'Understanding the 4Cs of brilliance.',
  },
];

export const OldGoldStory = () => (
  <section id="knowledge" aria-labelledby="knowledge-h" data-oldgold data-bg="#131917" className="sec bg-counter">
    <div className="wrap grid items-start gap-x-[clamp(32px,5vw,88px)] gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div className="lg:sticky lg:top-[calc(var(--hdr)+40px)]">
        <SectionHead
          id="knowledge-h"
          title={<>The Mark of Purity: BIS Hallmark &amp; HUID</>}
          display={
            <>
              Bring your old gold. <span className="text-brass">We test it in front of you.</span>
            </>
          }
        />
        <p className="mt-6 max-w-[54ch] text-[clamp(1rem,1.2vw,1.15rem)] font-light leading-relaxed text-glass-soft">
          We believe in absolute transparency. Every gold piece in our collection carries the BIS Hallmark with a 6-digit
          HUID code – a guarantee of purity you can verify yourself on the BIS Care app. Understanding gold purity and
          diamond quality is essential to building your personal collection.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
          <TrackedLink
            track={{ cta: 'whatsapp', location: 'old_gold_story', intent: 'old_gold_valuation', category: 'exchange' }}
            href={whatsappUrl(createOldGoldValuationMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-glass min-h-[52px] px-7 text-[1rem]"
          >
            <span className="btn-in">
              <WhatsAppIcon className="size-5" /> Get my old gold valued
            </span>
          </TrackedLink>
          <Link
            to="/old-gold-exchange"
            className="inline-flex min-h-[44px] items-center text-[1rem] text-[#c6aa78] underline-offset-[5px] hover:underline"
          >
            How the exchange works<span aria-hidden="true">&nbsp;→</span>
          </Link>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {KNOWLEDGE.map((k) => (
            <li key={k.topic}>
              <TrackedLink
                track={{ cta: 'content_inquiry', location: 'knowledge', topic: k.topic }}
                href={whatsappUrl(createKnowledgeMessage(k.about))}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full border-t border-brass/40 pt-4 transition-colors hover:border-brass-hi"
              >
                <span className="block font-display text-[1.3rem] text-glass">{k.title}</span>
                <span className="mt-1 block text-[0.92rem] font-light text-glass-soft">{k.text}</span>
                <span className="mt-2 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-[#c6aa78] group-hover:text-brass-hi">
                  <MessageCircle size={14} aria-hidden="true" /> Ask Mr. Soni
                </span>
              </TrackedLink>
            </li>
          ))}
        </ul>
      </div>

      <ol className="grid gap-[clamp(28px,4vw,56px)]">
        {STEPS.map((s) => (
          <li key={s.n} data-og-step={s.n}>
            <figure>
              <div className="overflow-hidden rounded-md border border-brass/25 bg-counter-3">
                <img
                  {...imgProps(s.plate, '(min-width: 1024px) 52vw, 100vw')}
                  data-loupe
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <figcaption className="mt-4 grid grid-cols-[auto_1fr] items-baseline gap-x-4">
                <span className="font-sans text-[0.85rem] font-semibold tracking-[0.12em] text-[#c6aa78] tabular">{s.n}</span>
                <span>
                  <span className="block font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight text-glass">
                    {s.title}
                  </span>
                  <span className="mt-1 block text-[1rem] text-glass-soft">{s.text}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
