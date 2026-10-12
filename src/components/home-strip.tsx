import Link from "next/link";
import { ShotFigure } from "@/components/shot";
import { brand } from "@/lib/brand";
import { homeStrip } from "@/lib/portfolio";

export function HomeStrip() {
  return (
    <>
      <section className="border-t border-border bg-[#faf6ef]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="font-display text-3xl tracking-tight sm:text-5xl">
                Quelques exemples.
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
                Drouant, Labess et Melt, parmi d’autres réalisations.
              </p>
            </div>
            <Link href="/realisations" className="text-sm font-medium text-[#1e4a38] underline">
              Voir les exemples
            </Link>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {homeStrip.map((shot) => (
              <ShotFigure key={shot.src} shot={shot} sizes="(min-width: 640px) 46vw, 100vw" />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <h2 className="max-w-2xl font-display text-4xl tracking-tight text-balance sm:text-5xl">
          Dites-nous la largeur du trottoir. On vous dit si une chaise y tient.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
          {brand.email} · {brand.phoneDisplay}. Du mardi au vendredi, 9 h–18 h, pas
          pendant le coup de feu.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex h-12 items-center justify-center bg-[#1e4a38] px-5 text-base text-[#f6f1e6] hover:bg-[#17392c]"
        >
          Écrire à l’atelier
        </Link>
      </section>
    </>
  );
}
