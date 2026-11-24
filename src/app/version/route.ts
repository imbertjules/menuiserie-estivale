import { NextResponse } from "next/server";

/**
 * Contrôle de déploiement (chaîne o2switch, `scripts/o2switch/cd_prod.py`) :
 * renvoie le SHA servi et la référence déployée.
 *
 * `APP_SHA` / `APP_REF` sont posés par l'environnement d'exécution du site
 * (fichier `apps/menuiserie-env/production.env`, lu par Passenger au démarrage),
 * jamais au build : la route doit donc être rendue à chaque requête, sinon elle
 * figerait « inconnu » et le contrôle de déploiement refuserait la release
 * (retour arrière automatique).
 */
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      app: "menuiserie-estivale",
      sha: process.env.APP_SHA || "inconnu",
      ref: process.env.APP_REF || "inconnu",
      builtAt: process.env.APP_BUILT_AT || "inconnu",
    },
    { headers: { "cache-control": "no-store" } },
  );
}
