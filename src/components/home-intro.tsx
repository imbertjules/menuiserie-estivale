import Link from "next/link";
import { beyond, brand } from "@/lib/brand";

export function HomeIntro() {
  return (
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#1e4a38]">
            Terrasses de restaurants · {brand.frame}
          </p>
          <h1 className="mt-4 max-w-xl font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
            Le trottoir est votre deuxième salle. On la construit.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            {brand.name} pose la terrasse de deux façons. Sur-mesure, dessinée pour
            la devanture. Ou un kit que l’on règle : largeur, saison, jardinières ou
            non. Store, platelage, pare-vent, chauffage — rien n’est figé d’avance.
          </p>
          <p className="mt-4 max-w-xl text-base leading-7 text-foreground">
            {brand.frame} : {brand.route}. {brand.trial}.
          </p>
          <ul className="mt-3 max-w-xl space-y-2 text-sm leading-6">
            {beyond.map((stop) => (
              <li key={stop.id}>
                <span className="font-medium text-foreground">{stop.city}.</span>{" "}
                <span
                  className={
                    stop.id === "rouen" ? "text-foreground" : "text-muted-foreground"
                  }
                >
                  {stop.text}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center bg-[#1e4a38] px-5 text-base text-[#f6f1e6] hover:bg-[#17392c]"
            >
              Décrire votre emprise
            </Link>
            <Link
              href="/realisations"
              className="inline-flex h-12 items-center justify-center border border-[#1e4a38] px-5 text-base text-[#1e4a38] hover:bg-[#e7efe9]"
            >
              Voir les chantiers
            </Link>
          </div>
        </div>
  );
}
