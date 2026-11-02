// One-time image migration: public/assest/*.png -> public/images/*.webp (+ og image, favicons).
// Originals live in git history (pre `seo/local-overhaul`). Re-run only if you restore them:
//   node scripts/optimize-images.mjs
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const SRC = 'public/assest';
const OUT = 'public/images';
const PUB = 'public';
mkdirSync(OUT, { recursive: true });

const src = (f) => path.join(SRC, f);

// [source, output name, max width]
const PHOTOS = [
  ['dhulan collection.png', 'bridal-pearl-necklace-ghatkopar.webp', 1600],
  ['hertage gold.png', 'gold-wedding-bands-ghatkopar.webp', 1600],
  ['dimaond.png', 'diamond-jewellery-mumbai.webp', 1600],
  ['Bangles.png', 'gold-bangle.webp', 800],
  ['earing.png', 'gold-gemstone-earrings.webp', 700],
  ['ring.png', 'diamond-halo-ring.webp', 800],
  ['month.png', 'gemstone-gold-pendant.webp', 600],
  ['shopimg.png', 'soni-khimraj-lalji-jewellers-shop-ghatkopar-west.webp', 840],
  ['BIS.png', 'bis-hallmark-gold.webp', 400],
  ['trust.png', 'trusted-by-customers.webp', 400],
  ['shiled.png', 'leading-jeweller-25-years.webp', 400],
  ['Dimond.png', 'certified-diamond-jewellery.webp', 400],
  ['crasfman.png', 'seasoned-craftsmen.webp', 400],
  ['BIS_original.png', 'bis-logo.webp', 320],
  ['logo dark.png', 'soni-khimraj-lalji-logo.webp', 600],
];

for (const [file, name, width] of PHOTOS) {
  const info = await sharp(src(file))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile(path.join(OUT, name));
  console.log(`${name.padEnd(56)} ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`);
}

// Square brand logo (with wordmark) for JSON-LD `logo` — Google prefers >=112px, crawlable PNG.
await sharp(src('shop logo.png'))
  .trim()
  .resize(480, 480, { fit: 'contain', background: '#ffffff' })
  .extend({ top: 16, bottom: 16, left: 16, right: 16, background: '#ffffff' })
  .flatten({ background: '#ffffff' })
  .png({ compressionLevel: 9 })
  .toFile(path.join(OUT, 'soni-khimraj-lalji-jewellers-logo.png'));

// Open Graph card 1200x630: real shop-front photo + logo panel.
const shop = await sharp(src('shopimg.png')).resize(630, 630, { fit: 'cover' }).toBuffer();
const logo = await sharp(src('shop logo.png')).trim().resize(470, 300, { fit: 'inside' }).toBuffer();
const logoMeta = await sharp(logo).metadata();
const caption = Buffer.from(`<svg width="570" height="120" xmlns="http://www.w3.org/2000/svg">
  <text x="285" y="40" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="#450202">Ghatkopar West, Mumbai</text>
  <text x="285" y="84" text-anchor="middle" font-family="Arial, sans-serif" font-size="19" letter-spacing="1" fill="#854d0e">BIS HALLMARKED GOLD · DIAMOND · SILVER</text>
</svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#FFFBF5' } })
  .composite([
    { input: shop, left: 0, top: 0 },
    { input: logo, left: 630 + Math.round((570 - logoMeta.width) / 2), top: 90 },
    { input: caption, left: 630, top: 430 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(OUT, 'og-image.jpg'));

// Favicons from the logo mark (no wordmark), on cream so it reads on dark tabs too.
const mark = await sharp(src('logo dark.png')).trim().toBuffer();
const icon = (size, pad) =>
  sharp(mark)
    .resize(size - pad * 2, size - pad * 2, { fit: 'contain', background: '#FFFBF5' })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: '#FFFBF5' })
    .flatten({ background: '#FFFBF5' })
    .png({ compressionLevel: 9 });

await icon(48, 3).toFile(path.join(PUB, 'favicon-48x48.png'));
await icon(180, 16).toFile(path.join(PUB, 'apple-touch-icon.png'));
await icon(192, 16).toFile(path.join(PUB, 'icon-192.png'));
await icon(512, 40).toFile(path.join(PUB, 'icon-512.png'));

// favicon.ico wrapping a 48px PNG (ICO allows embedded PNG payloads).
const png48 = await icon(48, 3).toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // count
header.writeUInt8(48, 6); // width
header.writeUInt8(48, 7); // height
header.writeUInt8(0, 8); // palette
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // planes
header.writeUInt16LE(32, 12); // bpp
header.writeUInt32LE(png48.length, 14); // size
header.writeUInt32LE(22, 18); // offset
writeFileSync(path.join(PUB, 'favicon.ico'), Buffer.concat([header, png48]));

console.log('done');
