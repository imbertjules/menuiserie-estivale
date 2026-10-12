/**
 * Public name. Change `brandName` only — the wordmark, page titles,
 * and the contact mailbox are derived from it.
 */
export const brandName = "Menuiserie Estivale";

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function wordmarkLines(value: string): readonly [string, string] {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return [value.trim(), ""];
  const last = parts[parts.length - 1] ?? "";
  return [parts.slice(0, -1).join(" "), last];
}

const lines = wordmarkLines(brandName);

export const brand = {
  name: brandName,
  wordmarkLead: lines[0],
  wordmarkTail: lines[1],
  email: `contact@${slugify(brandName)}.fr`,
  phoneDisplay: "+33 6 12 92 38 14",
  phoneHref: "tel:+33612923814",
  /** Frame only. Close stops, then the lighter trial. */
  frame: "Paris et alentours",
  /** Order: Levallois, Neuilly, then Versailles. */
  route: "Levallois, Neuilly, puis Versailles",
  /** Lighter than the route. Not a full stop. */
  trial: "Vincennes, à l’essai",
  area: "Paris et alentours, sur rendez-vous",
} as const;

/**
 * Three far cities, three offers. Never one shared tournée label.
 * Rouen is the only standing install city outside the Paris ring.
 */
export const beyond = [
  {
    id: "rouen",
    city: "Rouen",
    text: "Tournée programmée. Terrasses saisonnières sur places de stationnement, du 1er mars au 31 octobre. C’est la ville de pose hors alentours.",
  },
  {
    id: "orleans",
    city: "Orléans",
    text: "Un aller-retour dans la journée, seulement quand plusieurs extensions de places de stationnement sont déjà signées. Pas de tournée hebdomadaire.",
  },
  {
    id: "reims",
    city: "Reims",
    text: "Visites et devis seulement. La réglementation terrasse n’a pas été trouvée. On n’y installe pas de terrasse sur stationnement.",
  },
] as const;

export const beyondMeta =
  "Rouen : pose en tournée saisonnière, du 1er mars au 31 octobre. Orléans : une journée si plusieurs extensions de places sont déjà signées. Reims : visites et devis seulement.";
