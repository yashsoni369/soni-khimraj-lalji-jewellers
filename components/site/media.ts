// Velvet Counter image plates (public/images/redesign). Every plate is generated or stock and
// is listed for replacement with the owner's own photos; alt text says what is shown, never
// that it is a specific piece the shop holds.
const DIR = '/images/redesign/';

export type Plate = { src: string; srcSet: string; width: number; height: number; alt: string };

/** Square tray plates: -600 and -1200 */
export const tray = (name: string, alt: string): Plate => ({
  src: `${DIR}${name}-600.webp`,
  srcSet: `${DIR}${name}-600.webp 600w, ${DIR}${name}-1200.webp 1200w`,
  width: 600,
  height: 600,
  alt,
});

/** Wide plates: -1280 and -1920 */
export const wide = (name: string, alt: string): Plate => ({
  src: `${DIR}${name}-1280.webp`,
  srcSet: `${DIR}${name}-1280.webp 1280w, ${DIR}${name}-1920.webp 1920w`,
  width: 1280,
  height: 714,
  alt,
});

export const PLATES = {
  kundanNecklace: tray('tray-kundan-necklace', 'A kundan necklace with pearl drops on a green velvet tray – bridal kundan jewellery in Ghatkopar West'),
  goldBangles: tray('tray-gold-bangles', 'Four carved gold bangles on a green velvet tray – 22K gold bangles in Ghatkopar West'),
  mangalsutra: tray('tray-mangalsutra', 'A black-bead mangalsutra with a small diamond pendant on a green velvet tray – mangalsutra designs in Ghatkopar West'),
  jhumkas: tray('tray-jhumkas', 'A pair of gold jhumka earrings on a green velvet tray – gold earrings in Ghatkopar West'),
  goldChains: tray('tray-gold-chains', 'Three gold chains laid out on a green velvet tray – BIS hallmarked gold chains in Ghatkopar West'),
  goldRings: tray('tray-gold-rings', 'Four gold rings, one set with a red stone, on a green velvet tray – gold rings in Ghatkopar West'),
  diamondStuds: tray('tray-diamond-studs', 'A diamond pendant necklace, diamond stud earrings and a diamond ring on a green velvet tray – diamond jewellery in Ghatkopar, Mumbai'),
  silverPayal: tray('tray-silver-payal', 'A pair of silver payal anklets with small bells on a green velvet tray – silver jewellery in Ghatkopar'),
  silverPooja: tray('tray-silver-pooja', 'A silver pooja thali with a diya and a small bowl on a green velvet tray – silver articles in Ghatkopar'),
  polkiChoker: tray('tray-polki-choker', 'A polki necklace with matching earrings on a green velvet tray – custom and made-to-order jewellery in Ghatkopar West'),
  touchstone: wide('oldgold-touchstone', 'A gold streak on a black touchstone beside a gold bangle on green velvet – old gold exchange in Ghatkopar West'),
  stepTested: wide('step-tested', 'A black touchstone marked with gold streaks on a glass jewellery counter – old gold purity tested in front of you'),
  stepWeighed: wide('step-weighed', 'A gold ring on a digital jewellery scale on the counter – old gold weighed in front of you'),
  stepValued: wide('step-valued', 'A valuation slip and a pen beside a gold bangle on the counter – old gold valued at the day’s rate in Ghatkopar West'),
  velvet: wide('velvet-texture', ''),
} as const;

/** Props for an <img>; `sizes` describes the rendered width. */
export const imgProps = (p: Plate, sizes: string) => ({
  src: p.src,
  srcSet: p.srcSet,
  sizes,
  width: p.width,
  height: p.height,
  alt: p.alt,
  loading: 'lazy' as const,
  decoding: 'async' as const,
});
