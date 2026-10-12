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
  {
    slug: "melt",
    name: "Melt",
    place: "Oberkampf, 74 rue de la Folie-Méricourt, 11e",
    image: null,
    imageAlt:
      "Photo de terrasse manquante pour Melt Oberkampf.",
    built:
      "Terrasse devant la façade, 74 rue de la Folie-Méricourt. C’est l’adresse Oberkampf, pas les autres Melt.",
    result:
      "La photo de terrasse manque. Le site, Google Maps et la presse montrent la salle, les assiettes, ou la façade sans tables. On ne met pas ces vues à la place.",
    covers: "Photo de terrasse manquante",
    sourceUrl:
      "https://www.google.com/maps/place/Melt/@48.8656108,2.3708026,17z",
    sourceLabel: "Photo de terrasse manquante",
  },
];
