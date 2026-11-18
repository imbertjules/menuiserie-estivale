export type Shot = {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  creditUrl: string;
  license?: string;
  licenseUrl?: string;
};

export const withPlanters: Shot = {
  src: "/realisations/drouant-terrasse-places.jpg",
  alt: "Terrasse de Drouant, place Gaillon, avec jardinières rectangulaires et bornes.",
  caption:
    "Avec jardinières. Drouant, place Gaillon : bacs et bornes sur le front de rue.",
  credit: "Photo Presse Agence",
  creditUrl:
    "https://presseagence.fr/paris-drouant-un-lieu-unique-niche-sur-la-paisible-place-gaillon/",
};

export const withoutPlanters: Shot = {
  src: "/realisations/labess-rue-en-pente.jpg",
  alt: "Platelage en bois dans une rue en pente, sans jardinière, Labess, Montmartre.",
  caption:
    "Sans jardinière. Labess, rue Aristide Bruant : platelage nu, lames dans le sens de la pente.",
  credit: "Photo Privateaser",
  creditUrl: "https://www.privateaser.com/lieu/63182-labess-piano-perche",
};

export const homeStrip: Shot[] = [withPlanters, withoutPlanters];
