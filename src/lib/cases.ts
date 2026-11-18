export type CaseStudy = {
  slug: string;
  name: string;
  place: string;
  image: string | null;
  imageAlt: string;
  built: string;
  result: string;
  covers: string;
  sourceUrl: string;
  sourceLabel: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "drouant",
    name: "Drouant",
    place: "Place Gaillon, 2e",
    image: "/realisations/drouant-terrasse-places.jpg",
    imageAlt:
      "Terrasse de Drouant, place Gaillon, avec jardinières et bornes.",
    built:
      "Front de rue avec jardinières et bornes, sur les places de stationnement.",
    result:
      "Drouant, 16-18 place Gaillon.",
    covers: "Front de rue, jardinières et bornes",
    sourceUrl:
      "https://presseagence.fr/paris-drouant-un-lieu-unique-niche-sur-la-paisible-place-gaillon/",
    sourceLabel: "Photo Presse Agence",
  },
  {
    slug: "labess",
    name: "Labess",
    place: "8 rue Aristide Bruant, 18e",
    image: "/realisations/labess-rue-en-pente.jpg",
    imageAlt:
      "Platelage en bois dans une rue en pente, Labess, Montmartre.",
    built:
      "Platelage en bois, lames dans le sens de la pente.",
    result:
      "Labess, rue Aristide Bruant, 18e.",
    covers: "Platelage en pente, sans jardinière",
    sourceUrl: "https://www.privateaser.com/lieu/63182-labess-piano-perche",
    sourceLabel: "Photo Privateaser",
  },
];
