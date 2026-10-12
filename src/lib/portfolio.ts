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
  alt: "Front de rue de Drouant, place Gaillon, avec jardinières rectangulaires et bornes. Pas le gros plan de la petite terrasse de gauche.",
  caption:
    "Avec jardinières. Drouant, place Gaillon : bacs et bornes sur le front de rue. Ce n’est pas la petite terrasse de gauche.",
  credit: "Photo Presse Agence",
  creditUrl:
    "https://presseagence.fr/paris-drouant-un-lieu-unique-niche-sur-la-paisible-place-gaillon/",
};

export const withoutPlanters: Shot = {
  src: "/realisations/labess-rue-en-pente.jpg",
  alt: "Platelage en bois dans la pente, sans jardinière. Une porte numérotée 5 est dans le cadre. Labess est au 8.",
  caption:
    "Sans jardinière. Labess : platelage nu, lames dans le sens de la pente. La porte 5 est dans le cadre ; l’adresse est le 8.",
  credit: "Photo Privateaser",
  creditUrl: "https://www.privateaser.com/lieu/63182-labess-piano-perche",
};

export const homeStrip: Shot[] = [withPlanters, withoutPlanters];
