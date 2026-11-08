import { whatsappUrl, createHelloMessage } from '../../services/whatsappService';
import { TrackedLink } from '../TrackedCTA';
import { WhatsAppIcon } from '../site/icons';

// Why us: the real BIS hallmark mark beside the shop's claims, set as text on one brass-framed glass
// panel (the rate card's material). The claims keep the wording of the old trust-mark images.
const CLAIMS = [
  'Trusted by hundreds of our customers',
  'Leading jewellery brand for over 25 years',
  'Certified diamond jewellery',
  'Crafted by seasoned craftsmen',
];

export const WhyUs = () => (
  <section id="why-us" aria-labelledby="why-us-h" data-bg="#131917" className="sec bg-counter">
    <div className="wrap text-center">
      <h2 id="why-us-h" className="kicker text-[#c6aa78]">
        Why Shop With Soni Khimraj Lalji Jewellers?
      </h2>
      <div className="rate-card mx-auto mt-[clamp(28px,4vw,52px)] grid max-w-[980px] items-center gap-6 p-[clamp(20px,3vw,40px)] text-left sm:grid-cols-[auto_1fr] sm:gap-[clamp(24px,3.5vw,48px)]">
        <img
          src="/images/bis-hallmark-gold.webp"
          width={400}
          height={400}
          loading="lazy"
          decoding="async"
          alt="BIS Hallmark Gold"
          className="tone-brass mx-auto h-[clamp(96px,10vw,140px)] w-auto object-contain"
        />
        <ul className="grid divide-y divide-brass/25 font-display text-[clamp(1.15rem,1.7vw,1.45rem)] leading-snug text-glass sm:grid-cols-2 sm:gap-x-10 sm:divide-y-0">
          {CLAIMS.map((c) => (
            <li key={c} className="py-3 sm:border-b sm:border-brass/25 sm:[&:nth-last-child(-n+2)]:border-b-0">
              {c}
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto mt-[clamp(36px,4.5vw,64px)] max-w-[36ch] font-display text-[clamp(1.35rem,2.2vw,1.9rem)] italic leading-snug text-glass">
        We'd love to meet you. Walk into our Ghatkopar store — or simply say namaste on WhatsApp.
      </p>
      <TrackedLink
        track={{ cta: 'whatsapp', location: 'why_us', intent: 'chat_general' }}
        href={whatsappUrl(createHelloMessage())}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-glass mt-8 min-h-[52px] px-7 text-[1rem]"
      >
        <span className="btn-in">
          <WhatsAppIcon className="size-5" /> Say Hello to Mr. Soni
        </span>
      </TrackedLink>
    </div>
  </section>
);
