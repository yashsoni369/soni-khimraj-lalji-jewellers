// Copy for the service pages. Keep to confirmed facts about the shop
// (see memory/client-nap-and-access.md); anything unconfirmed is marked TODO(owner).
import type { PageType } from '@/lib/routes';
import type { CollectionCategory, LeadIntent, VisitPurpose } from '@/lib/tracking';

export interface PageSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface PageFaq {
  q: string;
  a: string;
}

export type PageCta =
  | { kind: 'whatsapp'; label: string; message: string; intent: LeadIntent; category?: CollectionCategory }
  | { kind: 'book_visit'; label: string; purpose: VisitPurpose };

export interface ServicePageContent {
  key: PageType;
  eyebrow: string;
  h1: string;
  intro: string;
  image: { src: string; width: number; height: number; alt: string };
  /** Shown in the hero and repeated at the end of the page */
  primaryCta: PageCta;
  secondaryCta?: PageCta;
  sections: PageSection[];
  faqs: PageFaq[];
  related: PageType[];
  /** Service schema name; omitted for non-service pages */
  serviceType?: string;
}

const G = 'Namaste Mr. Soni';

export const PAGE_CONTENT: Record<'gold_rate' | 'bridal' | 'old_gold_exchange' | 'silver' | 'gold_dream_scheme', ServicePageContent> = {
  gold_rate: {
    key: 'gold_rate',
    eyebrow: 'Updated every trading day',
    h1: 'Gold Rate Today in Ghatkopar, Mumbai',
    intro:
      'Check today’s benchmark gold rate for 24K, 22K (916) and 18K gold, plus silver, before you visit our shop on Jivdaya Lane, Ghatkopar West. For our exact shop rate including making charges, message us on WhatsApp.',
    image: {
      src: '/images/gold-bangle.webp',
      width: 800,
      height: 533,
      alt: 'Gold bangle – check today’s 22K gold rate in Ghatkopar',
    },
    primaryCta: {
      kind: 'whatsapp',
      label: 'Get Our Shop’s Rate on WhatsApp',
      message: `${G}, could you share today's 22K and 18K gold rate at your shop?`,
      intent: 'gold_rate',
    },
    sections: [
      {
        heading: 'Which gold rate is shown here?',
        paragraphs: [
          'The rates above are the India Bullion and Jewellers Association (IBJA) benchmark. IBJA publishes opening and closing gold and silver rates on trading days, and these rates are recognised by the Reserve Bank of India for gold loans and Sovereign Gold Bonds.',
          'The benchmark excludes 3% GST and making charges, so the final price of a piece of jewellery at any shop will be higher. Ask us on WhatsApp and we will share our current shop rate for the purity you want.',
        ],
      },
      {
        heading: '24K vs 22K vs 18K gold',
        bullets: [
          '24K (999) – 99.9% pure gold. Used for coins and bars; too soft for most jewellery.',
          '22K (916) – 91.6% gold. The standard for Indian gold jewellery such as bangles, chains, necklaces and mangalsutras.',
          '18K (750) – 75% gold. Stronger, so it is used for diamond and stone-set jewellery.',
        ],
      },
      {
        heading: 'How the price of gold jewellery is worked out',
        paragraphs: [
          'Jewellery price = gold rate for the purity × weight, plus making charges, plus 3% GST. Stone-set pieces also include the value of the stones. We explain every part of the bill before you buy.',
        ],
      },
      {
        heading: 'Always check the BIS hallmark',
        paragraphs: [
          'Every gold piece we sell carries the BIS hallmark with a 6-digit HUID code. You can verify the purity of any hallmarked piece yourself on the BIS Care app.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is the 22K gold rate today in Ghatkopar?',
        a: 'The live IBJA benchmark for 22K (916) gold is shown at the top of this page per 10 grams. For our shop rate including making charges, WhatsApp us on +91 91361 75991.',
      },
      {
        q: 'Why is the shop price higher than the gold rate?',
        a: 'The benchmark gold rate excludes 3% GST and making charges. The final jewellery price adds both, and the value of any stones.',
      },
      {
        q: 'When does the gold rate change?',
        a: 'IBJA publishes an opening and a closing rate on trading days. On days the market is closed, the last published rate is shown with its date.',
      },
    ],
    related: ['old_gold_exchange', 'bridal', 'silver'],
  },

  bridal: {
    key: 'bridal',
    eyebrow: 'For the bride and her family',
    h1: 'Bridal Jewellery in Ghatkopar West',
    intro:
      'Bridal Kundan and Polki sets, BIS hallmarked gold necklaces, mangalsutras and made-to-order pieces – chosen with your family at our shop on Jivdaya Lane, Ghatkopar West, where families have trusted us for over 25 years.',
    image: {
      src: '/images/bridal-pearl-necklace-ghatkopar.webp',
      width: 1200,
      height: 800,
      alt: 'Bridal necklace in a red jewellery box at Soni Khimraj Lalji Jewellers, Ghatkopar West',
    },
    primaryCta: { kind: 'book_visit', label: 'Book a Bridal Appointment', purpose: 'bridal' },
    secondaryCta: {
      kind: 'whatsapp',
      label: 'Ask for the bridal catalogue',
      message: `${G}, please share your bridal jewellery catalogue on WhatsApp.`,
      intent: 'catalogue_browse',
      category: 'bridal',
    },
    serviceType: 'Bridal jewellery',
    sections: [
      {
        heading: 'What you will find',
        bullets: [
          'Bridal Kundan and Polki sets',
          'BIS hallmarked 22K (916) gold necklaces, haar, bangles and earrings',
          'Mangalsutras in 22K gold, with or without diamonds',
          'Diamond jewellery in 18K gold for engagement and reception',
          'Custom and made-to-order pieces from your design or photo',
        ],
      },
      {
        heading: 'How a bridal visit works',
        bullets: [
          'Book a time that suits your family – we are open every day, 10 AM to 9:30 PM.',
          'Tell us the functions, outfits and budget, and we will bring out the right pieces.',
          'Want something different? Share a design or photo and our karigars can make it to order.',
          'Every gold piece is BIS hallmarked with a HUID code you can check on the BIS Care app.',
        ],
      },
      {
        heading: 'Exchange old gold towards bridal jewellery',
        paragraphs: [
          'Many families use old gold towards the bride’s jewellery. We test the purity of your old gold in front of you and give you its value against new pieces.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do I need an appointment for bridal shopping?',
        a: 'Walk-ins are welcome every day from 10 AM to 9:30 PM. Booking a time lets us keep the counter and pieces ready for your family.',
      },
      {
        q: 'Can you make a bridal set to my design?',
        a: 'Yes. Share a design, photo or idea and our karigars will make it to order.',
      },
      {
        q: 'Can I use my old gold for bridal jewellery?',
        a: 'Yes. We test its purity in front of you and give you its value against new jewellery.',
      },
    ],
    related: ['old_gold_exchange', 'gold_rate', 'silver'],
  },

  old_gold_exchange: {
    key: 'old_gold_exchange',
    eyebrow: 'Old gold, new designs',
    h1: 'Old Gold Exchange in Ghatkopar West',
    intro:
      'Turn old or unused gold jewellery into something new. Bring it to our shop on Jivdaya Lane, Ghatkopar West – we test the purity in front of you and give you its value against new BIS hallmarked jewellery.',
    image: {
      src: '/images/gold-wedding-bands-ghatkopar.webp',
      width: 1600,
      height: 1067,
      alt: 'Gold rings – exchange old gold for new jewellery in Ghatkopar West',
    },
    primaryCta: {
      kind: 'whatsapp',
      label: 'Get My Old Gold Valued',
      message: `${G}, I'd like to get my old gold valued for exchange. Approximate weight: ___ g. I can share a photo here.`,
      intent: 'old_gold_valuation',
      category: 'exchange',
    },
    secondaryCta: { kind: 'book_visit', label: 'Book a visit', purpose: 'old_gold_exchange' },
    serviceType: 'Old gold exchange',
    sections: [
      {
        heading: 'How old gold exchange works',
        bullets: [
          'Send us a photo and approximate weight on WhatsApp for a first idea, or simply walk in.',
          'At the shop, we test the purity of your old gold in front of you.',
          'Its value is worked out on the day’s gold rate for that purity and weight.',
          'That value goes towards your new jewellery – choose from our collection or have a piece made to order.',
        ],
      },
      {
        heading: 'Why exchange with us',
        bullets: [
          'Purity tested in front of you – nothing happens out of sight.',
          'Over 25 years as the family jeweller of Ghatkopar West.',
          'Every new gold piece is BIS hallmarked with a HUID code.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How is my old gold valued?',
        a: 'We test its purity in front of you, then value it on the day’s gold rate for that purity and weight. That value is given against new jewellery.',
      },
      {
        q: 'Can I get an idea of the value before visiting?',
        a: 'Yes. Send a photo and approximate weight on WhatsApp (+91 91361 75991) and we will guide you. The final value is confirmed after testing at the shop.',
      },
      {
        q: 'Where can I check today’s gold rate?',
        a: 'See our Gold Rate Today page for the daily IBJA benchmark for 24K, 22K and 18K gold.',
      },
    ],
    related: ['gold_rate', 'bridal', 'silver'],
  },

  silver: {
    key: 'silver',
    eyebrow: 'Silver for every occasion',
    h1: 'Silver Jewellery & Articles in Ghatkopar',
    intro:
      'Along with gold and diamond jewellery, we keep silver jewellery, gift articles and pooja items at our shop on Jivdaya Lane, Ghatkopar West. Ask for our latest silver catalogue on WhatsApp or drop in any day from 10 AM to 9:30 PM.',
    image: {
      // TODO(owner): replace with a real photo of the silver collection.
      src: '/images/soni-khimraj-lalji-jewellers-shop-ghatkopar-west.webp',
      width: 840,
      height: 840,
      alt: 'Soni Khimraj Lalji Jewellers shop front on Jivdaya Lane, Ghatkopar West – silver jewellery and articles inside',
    },
    primaryCta: {
      kind: 'whatsapp',
      label: 'Ask for the Silver Catalogue',
      message: `${G}, please share your latest silver jewellery and silver articles catalogue on WhatsApp.`,
      intent: 'silver_catalogue',
      category: 'silver',
    },
    serviceType: 'Silver jewellery and articles',
    sections: [
      {
        heading: 'What we have in silver',
        bullets: ['Silver jewellery', 'Silver gift articles', 'Silver pooja items'],
      },
      {
        heading: 'Today’s silver rate',
        paragraphs: [
          'The IBJA benchmark silver rate per kilogram is shown on our Gold Rate Today page. For the price of a particular piece, ask us on WhatsApp.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do you sell silver jewellery in Ghatkopar West?',
        a: 'Yes – silver jewellery, gift articles and pooja items, at our shop on Jivdaya Lane, Ghatkopar West.',
      },
      {
        q: 'Can I see the silver collection before visiting?',
        a: 'Yes. Message us on WhatsApp (+91 91361 75991) and we will share photos of what is in stock.',
      },
    ],
    related: ['gold_rate', 'bridal', 'old_gold_exchange'],
  },

  // TODO(owner): replace the placeholders with the real scheme terms, then set
  // indexable: true for this route in lib/routes.ts.
  gold_dream_scheme: {
    key: 'gold_dream_scheme',
    eyebrow: 'Monthly gold savings',
    h1: 'Gold Dream Scheme',
    intro:
      'Save a fixed amount every month towards your next piece of gold jewellery with the Gold Dream Scheme at Soni Khimraj Lalji Jewellers, Ghatkopar West.',
    image: {
      src: '/images/gold-bangle.webp',
      width: 800,
      height: 533,
      alt: 'Gold jewellery – Gold Dream Scheme monthly savings plan',
    },
    primaryCta: {
      kind: 'whatsapp',
      label: 'Ask About the Scheme',
      message: `${G}, please share the details of the Gold Dream Scheme.`,
      intent: 'scheme_enquiry',
    },
    serviceType: 'Gold savings scheme',
    sections: [
      {
        heading: 'How the scheme works',
        bullets: [
          'TODO(owner): duration (number of months)',
          'TODO(owner): minimum monthly instalment',
          'TODO(owner): benefit at maturity',
          'TODO(owner): what the amount can be used for',
        ],
      },
    ],
    faqs: [],
    related: ['gold_rate', 'bridal', 'old_gold_exchange'],
  },
};
