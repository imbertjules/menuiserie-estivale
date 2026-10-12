import { figures, pieces, reasons } from "@/lib/home-copy";

export function HomeOffer() {
  return (
    <>
      <section className="border-y border-border bg-[#faf6ef]">
        <dl className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-3">
          {figures.map((figure) => (
            <div key={figure.value}>
              <dt className="font-display text-4xl tracking-tight text-[#1e4a38]">{figure.value}</dt>
              <dd className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{figure.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <h2 className="max-w-2xl font-display text-3xl tracking-tight text-balance sm:text-5xl">
          Une terrasse change la recette avant de changer la carte.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {reasons.map((reason) => (
            <article key={reason.title} className="border-t border-[#1e4a38] pt-4">
              <h3 className="font-display text-2xl tracking-tight">{reason.title}</h3>
              <p className="mt-3 text-base leading-7 text-muted-foreground">{reason.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#1e4a38] text-[#f6f1e6]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              Ce qu’on pose, et ce qu’on refuse.
            </h2>
            <ul className="mt-6 space-y-3 text-base leading-7 text-[#e7efe9]">
              <li>On ne pose pas un store sur un trottoir trop étroit pour une chaise.</li>
              <li>On ne promet pas l’autorisation avant le passage en mairie.</li>
              <li>On ne vend pas un seul modèle. Sur-mesure ou kit, avec ou sans jardinières.</li>
            </ul>
          </div>
          <ul className="space-y-3 text-base leading-7">
            {pieces.map((piece) => (
              <li key={piece} className="border-b border-white/15 pb-3">
                {piece}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
