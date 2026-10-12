import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import sharp from "sharp";

const downloads = [
  [
    "https://presseagence.fr/wp-content/uploads/Capture-decran-2025-09-23-164111-Copy.jpg",
    "public/realisations/drouant-terrasse-places.jpg",
  ],
  [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Restaurant_Drouant_-_Terrasse_-_Paris.jpg?width=1600",
    "public/realisations/drouant-tables-2017.jpg",
  ],
  [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Drouant_-_terrasse_%28c%29_Julie_Limont_%281%29.jpg?width=1600",
    "public/realisations/drouant-terrasse-2021.jpg",
  ],
  [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Fa%C3%A7ade_-_Restaurant_Drouant_-_Paris.jpg?width=1600",
    "public/realisations/drouant-facade-store.jpg",
  ],
  [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Le_Drouant%2C_Paris_3_November_2016.jpg?width=1600",
    "public/realisations/drouant-nuit-2016.jpg",
  ],
  [
    "https://commons.wikimedia.org/wiki/Special:FilePath/P1220152_Paris_II_restaurant_Drouant_rwk.jpg?width=1600",
    "public/realisations/drouant-hiver-2013.jpg",
  ],
  [
    "https://privateaser-media.s3.eu-west-1.amazonaws.com/etab_photos/63182/1500x750/609861.jpg",
    "public/realisations/labess-rue-en-pente.jpg",
  ],
  [
    "https://privateaser-media.s3.eu-west-1.amazonaws.com/etab_photos/63182/1500x750/609852.jpg",
    "public/realisations/labess-montee.jpg",
  ],
  [
    "https://privateaser-media.s3.eu-west-1.amazonaws.com/etab_photos/63182/1500x750/612354.jpg",
    "public/realisations/labess-tables.jpg",
  ],
];

/** Fractions of the resized frame: left, top, right, bottom. */
const crops = [
  {
    src: "public/realisations/drouant-tables-2017.jpg",
    dest: "public/realisations/detail-pots-drouant.jpg",
    box: [0.42, 0.35, 0.78, 0.92],
  },
  {
    src: "public/realisations/labess-rue-en-pente.jpg",
    dest: "public/realisations/detail-plancher-labess.jpg",
    box: [0, 0.55, 1, 1],
  },
  {
    src: "public/realisations/drouant-facade-store.jpg",
    dest: "public/realisations/detail-store-drouant.jpg",
    box: [0, 0.18, 1, 0.48],
  },
];

async function download(url, dest) {
  const response = await fetch(url, {
    headers: { "User-Agent": "MenuiserieEstivale/1.0 (portfolio; attribution)" },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${url}`);
  }
  const input = Buffer.from(await response.arrayBuffer());
  await mkdir(dirname(dest), { recursive: true });
  await sharp(input)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest);
}

async function crop(src, dest, [l, t, r, b]) {
  const meta = await sharp(src).metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  const left = Math.round(width * l);
  const top = Math.round(height * t);
  const extractWidth = Math.max(1, Math.round(width * r) - left);
  const extractHeight = Math.max(1, Math.round(height * b) - top);
  await sharp(src)
    .extract({ left, top, width: extractWidth, height: extractHeight })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest);
}

for (const [url, dest] of downloads) {
  await download(url, dest);
}

for (const item of crops) {
  await crop(item.src, item.dest, item.box);
}
