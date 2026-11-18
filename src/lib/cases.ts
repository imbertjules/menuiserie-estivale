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
      "Front de rue large de Drouant, place Gaillon, avec jardinières et bornes. Pas le gros plan de la petite terrasse de gauche.",
    built:
      "La photo est le front de rue, large, avec les jardinières et les bornes. Ce n’est pas le gros plan de la petite terrasse de gauche, sur les places.",
    result:
      "Le nom public est Drouant, 16-18 place Gaillon. « Chez Druant » mène à la même maison. La petite terrasse de gauche n’est pas dans ce cadre.",
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
      "Platelage en bois. Une porte numérotée 5 est dans le cadre. Labess est au 8, cette photo ne montre pas le 8.",
    built:
      "La photo est un platelage en bois. Une porte numérotée 5 est dans le cadre.",
    result:
      "Labess est au 8 rue Aristide Bruant. On ne légende pas cette photo comme le 8. L’enseigne est Labess.",
    covers: "Platelage, porte 5 dans le cadre",
    sourceUrl: "https://www.privateaser.com/lieu/63182-labess-piano-perche",
    sourceLabel: "Photo Privateaser",
  },
];
