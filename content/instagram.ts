// "From our Instagram" strip (home). Curated from the shop's own public posts on
// https://www.instagram.com/sonikhimrajlalji/ (read logged-out, 2026-11-08). Each image is a
// square crop of the post saved to /public/images/instagram; the crops leave out the poster
// template's printed phone number and address, which differ from the confirmed NAP.
// To refresh: pick new posts, save crops at 400x400 WebP, update this list.

export const INSTAGRAM_PROFILE = 'https://www.instagram.com/sonikhimrajlalji/';
export const INSTAGRAM_HANDLE = '@sonikhimrajlalji';

export type InstagramPost = {
  code: string;
  kind: 'p' | 'reel';
  alt: string;
};

export const INSTAGRAM_REEL = {
  code: 'DZ2flJDoXH1',
  video: '/images/instagram/reel-DZ2flJDoXH1.mp4',
  poster: '/images/instagram/reel-DZ2flJDoXH1-poster.webp',
  width: 540,
  height: 720,
  label: 'Bridal gold necklaces from Soni Khimraj Lalji Jewellers, Ghatkopar West – watch the reel on Instagram',
};

export const INSTAGRAM_POSTS: InstagramPost[] = [
  { code: 'DYC1eGJIbsN', kind: 'reel', alt: 'A customer in a purple silk saree outside the shop on Jivdaya Lane, Ghatkopar West' },
  { code: 'Dfeyh7TFLLM', kind: 'p', alt: 'Gold jhumka earrings on a red velvet stand, a Diwali post from Soni Khimraj Lalji Jewellers' },
  { code: 'DfZGfWYFCEK', kind: 'p', alt: 'A gold necklace and earrings on a velvet bust beside Kuber, a Dhanteras post from the shop' },
  { code: 'DfeypBWEwAR', kind: 'reel', alt: 'A hand with gold bangles lighting a diya beside marigolds on a brass thali' },
  { code: 'DfaK-qukqNc', kind: 'reel', alt: 'A girl smiling in the glow of a diya, a Diwali reel from the shop' },
  { code: 'Dfbf-2XlNP2', kind: 'p', alt: 'A carved gold-finish diya lit for Chhoti Diwali among marigolds' },
];

export const postUrl = (p: { code: string; kind: 'p' | 'reel' }) =>
  `https://www.instagram.com/${p.kind}/${p.code}/`;
