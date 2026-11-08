import {
  whatsappUrl,
  createSpotlightMessage,
  createVideoRequestMessage,
  createGemstoneMessage,
} from '../../services/whatsappService';
import { TrackedLink } from '../TrackedCTA';
import { StoreAddress } from '../Layout';
import { PageHero, heroPlate } from '../site/PageHero';
import { SectionHead } from '../site/SectionHead';
import { WhatsAppIcon } from '../site/icons';

export const GEMSTONES_HERO = heroPlate('hero-gemstones');

const SPOTLIGHT_PRODUCT = 'gemstone_gold_pendant';

type Stone = { name: string; hindi: string; colour: string };
const RUBY: Stone = { name: 'Ruby', hindi: 'Manik', colour: '#a3162b' };
const PEARL: Stone = { name: 'Pearl', hindi: 'Moti', colour: '#ece4d4' };
const CORAL: Stone = { name: 'Red coral', hindi: 'Moonga', colour: '#c8453b' };
const EMERALD: Stone = { name: 'Emerald', hindi: 'Panna', colour: '#1f8a5b' };
const YELLOW: Stone = { name: 'Yellow sapphire', hindi: 'Pukhraj', colour: '#e2b43a' };
const DIAMOND: Stone = { name: 'Diamond', hindi: 'Heera', colour: '#e8ecee' };
const BLUE: Stone = { name: 'Blue sapphire', hindi: 'Neelam', colour: '#1f3f8f' };

// The commonly accepted Vedic pairing of each rashi with the gemstone of its ruling planet.
const RASHIS: { rashi: string; sign: string; stone: Stone }[] = [
  { rashi: 'Mesha', sign: 'Aries', stone: CORAL },
  { rashi: 'Vrishabha', sign: 'Taurus', stone: DIAMOND },
  { rashi: 'Mithuna', sign: 'Gemini', stone: EMERALD },
  { rashi: 'Karka', sign: 'Cancer', stone: PEARL },
  { rashi: 'Simha', sign: 'Leo', stone: RUBY },
  { rashi: 'Kanya', sign: 'Virgo', stone: EMERALD },
  { rashi: 'Tula', sign: 'Libra', stone: DIAMOND },
  { rashi: 'Vrishchika', sign: 'Scorpio', stone: CORAL },
  { rashi: 'Dhanu', sign: 'Sagittarius', stone: YELLOW },
  { rashi: 'Makara', sign: 'Capricorn', stone: BLUE },
  { rashi: 'Kumbha', sign: 'Aquarius', stone: BLUE },
  { rashi: 'Meena', sign: 'Pisces', stone: YELLOW },
];

export const GemstonesPage = () => (
  <div className="bg-counter">
    <PageHero
      id="gemstones-h1"
      plate={GEMSTONES_HERO}
      alt="Coloured gemstones laid out on a green velvet tray on the glass counter of a jewellery shop"
      h1="Rashi Gemstones in Ghatkopar"
      display={
        <>
          <span className="block text-brass">Your rashi,</span>
          <span className="block">your stone.</span>
        </>
      }
      lede="Gemstone pendants set in BIS hallmarked gold, and the traditional stone for each of the twelve rashi, at our Jivdaya Lane shop in Ghatkopar West."
    >
      <a href="#rashi" className="btn btn-glass min-h-[52px] px-7 text-[1rem]">
        <span className="btn-in">Find my rashi stone</span>
      </a>
    </PageHero>

    {/* Moved here from the homepage "Spotlight" */}
    <section id="pendants" aria-labelledby="pendants-h" data-bg="#0c0f0e" className="sec bg-counter-3">
      <div className="wrap grid items-center gap-x-[clamp(32px,5vw,80px)] gap-y-10 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <img
          src="/images/gemstone-gold-pendant.webp"
          width="400"
          height="600"
          loading="lazy"
          decoding="async"
          data-loupe
          className="aspect-[2/3] w-full max-w-[420px] rounded-md object-cover ring-1 ring-brass/30"
          alt="Green gemstone pendant on a gold chain at Soni Khimraj Lalji Jewellers, Ghatkopar West"
        />
        <div>
          <SectionHead id="pendants-h" title="Gemstone Pendants" display="A rich green stone, set in gold" />
          <p className="mt-6 max-w-[48ch] text-[clamp(1.05rem,1.4vw,1.25rem)] font-light leading-relaxed text-glass">
            A rich green gemstone set in BIS hallmarked gold – one of the statement pieces waiting at our Ghatkopar
            West store. Tell us the colour, stone and budget you have in mind, and we will show you pendants, chokers
            and Kundan sets to match.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <TrackedLink
              track={{ cta: 'whatsapp', location: 'gemstones_page', intent: 'private_viewing', product: SPOTLIGHT_PRODUCT }}
              href={whatsappUrl(createSpotlightMessage('gemstone pendants'))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass min-h-[52px] px-7 text-[1rem]"
            >
              <span className="btn-in">
                <WhatsAppIcon className="size-5" /> Reserve a Private Viewing
              </span>
            </TrackedLink>
            <TrackedLink
              track={{ cta: 'whatsapp', location: 'gemstones_page', intent: 'video_request', product: SPOTLIGHT_PRODUCT }}
              href={whatsappUrl(createVideoRequestMessage('gemstone pendants'))}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw inline-flex min-h-[44px] items-center text-[1.05rem] text-[#c6aa78]"
            >
              Request a video →
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>

    <section id="rashi" aria-labelledby="rashi-h" data-bg="#17392d" className="velvet-ground sec">
      <div className="wrap">
        <SectionHead
          id="rashi-h"
          tone="velvet"
          title="Your Rashi and Its Gemstone"
          display="Twelve signs, twelve traditional stones"
        />
        <p className="mt-6 max-w-[60ch] text-[clamp(1rem,1.2vw,1.15rem)] font-light leading-relaxed text-glass-soft">
          These are the commonly accepted pairings. Which stone is right for you is a personal choice, so message Mr.
          Soni on WhatsApp and he will advise you.
        </p>
        <ul className="mt-[clamp(32px,4.5vw,64px)] grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {RASHIS.map((r) => (
            <li key={r.rashi} className="relative flex items-center gap-5 rounded-lg border border-brass/30 bg-velvet-deep/80 p-5 shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-colors focus-within:border-brass-hi hover:border-brass-hi">
              {/* the velvet well the stone sits in */}
              <span
                aria-hidden="true"
                className="grid size-[72px] shrink-0 place-items-center rounded-full bg-[#091a14] shadow-[inset_0_4px_10px_rgba(0,0,0,0.8),0_0_0_1px_rgba(186,153,92,0.4)]"
              >
                <span
                  className="size-9 rounded-full shadow-[inset_-4px_-5px_8px_rgba(0,0,0,0.35),inset_3px_3px_6px_rgba(255,255,255,0.35)]"
                  style={{ backgroundColor: r.stone.colour }}
                />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-[1.5rem] leading-tight text-glass">
                  {r.rashi} <span className="text-[1.05rem] text-glass-mute">({r.sign})</span>
                </h3>
                <p className="mt-1 text-[1.05rem] text-brass-hi">
                  {r.stone.name} <span className="text-glass-soft">· {r.stone.hindi}</span>
                </p>
                <TrackedLink
                  track={{ cta: 'whatsapp', location: 'gemstones_page', intent: 'chat_general', product: `gemstone_${r.stone.name.toLowerCase().replace(/ /g, '_')}` }}
                  href={whatsappUrl(createGemstoneMessage(r.stone.name.toLowerCase(), r.rashi))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex min-h-[44px] items-center gap-2 text-[0.95rem] text-glass underline decoration-brass/70 underline-offset-[5px] after:absolute after:inset-0 hover:decoration-brass-hi"
                >
                  <WhatsAppIcon className="size-[16px] text-brass-hi" />
                  Ask about {r.stone.name.toLowerCase()}
                  <span className="sr-only"> for {r.rashi} ({r.sign})</span>
                </TrackedLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section id="advice" aria-labelledby="advice-h" data-bg="#131917" className="sec bg-counter">
      <div className="wrap">
        <SectionHead id="advice-h" title="Not Sure Which Stone?" display="Ask Mr. Soni on WhatsApp" />
        <p className="mt-6 max-w-[56ch] text-[clamp(1.05rem,1.4vw,1.25rem)] font-light leading-relaxed text-glass-soft">
          Share your rashi and the kind of piece you have in mind, and we will advise you on
          WhatsApp or at the counter.
        </p>
        <TrackedLink
          track={{ cta: 'whatsapp', location: 'gemstones_page', intent: 'chat_general' }}
          href={whatsappUrl(createGemstoneMessage('gemstones'))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-glass mt-8 min-h-[52px] px-7 text-[1rem]"
        >
          <span className="btn-in">
            <WhatsAppIcon className="size-5" /> Ask Mr. Soni about gemstones
          </span>
        </TrackedLink>
      </div>
    </section>

    <StoreAddress location="visit_block" />
  </div>
);
