import type { Metadata } from "next";
import Link from "next/link";
import { ShotFigure } from "@/components/shot";
import { brand } from "@/lib/brand";
import { withPlanters, withoutPlanters } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Réalisations",
  description: `Quelques exemples : Drouant, Labess et Melt, parmi d’autres réalisations. ${brand.frame} : ${brand.route}. ${brand.trial}.`,
};

export default function RealisationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:py-20">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#1e4a38]">
        Chantiers
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl tracking-tight text-balance sm:text-6xl">
        Quelques exemples.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
        Drouant, Labess et Melt, parmi d’autres réalisations.
      </p>
      <p className="mt-4 max-w-2xl text-base leading-7">
        L’atelier se déplace à {brand.frame} : {brand.route}. {brand.trial}.
      </p>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
          Avec jardinières, ou sans.
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          Le bac n’est pas d’office. Drouant en a sur le front de rue. Labess, non.
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <ShotFigure shot={withPlanters} priority sizes="(min-width: 768px) 46vw, 100vw" />
          <ShotFigure shot={withoutPlanters} sizes="(min-width: 768px) 46vw, 100vw" />
        </div>
      </section>

      <section className="mt-14 border border-border bg-[#faf6ef] p-6 md:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#1e4a38]">
          Oberkampf, 74 rue de la Folie-Méricourt, 11e
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-tight">Melt</h2>
        <p className="mt-4 max-w-2xl text-base leading-7">
          Photo de terrasse manquante. On ne met pas la salle à la place.
        </p>
      </section>

      <div className="mt-14 border-t border-border pt-10">
        <p className="font-display text-3xl tracking-tight">
          Votre trottoir n’est pas dans ces trois-là.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex h-12 items-center bg-[#1e4a38] px-5 text-[#f6f1e6] hover:bg-[#17392c]"
        >
          Décrire le trottoir
        </Link>
      </div>
    </div>
  );
}
