import Image from "next/image";
import type { CaseStudy } from "@/lib/cases";
import { cn } from "@/lib/utils";

export function CaseStudyBlock({
  item,
  flip = false,
}: {
  item: CaseStudy;
  flip?: boolean;
}) {
  return (
    <article id={item.slug} className="scroll-mt-24 grid items-center gap-6 md:grid-cols-2 md:gap-10">
      <div className={cn("relative aspect-[16/9] overflow-hidden bg-[#e7dcc8]", flip && "md:order-2")}>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(min-width: 768px) 46vw, 100vw"
            className="object-cover"
          />
        ) : (
          <p className="flex h-full items-center px-6 text-sm leading-6 text-[#1c1915]">
            Photo de terrasse manquante. On ne met pas l’assiette, ni la salle, à la place.
          </p>
        )}
      </div>
      <div className={flip ? "md:order-1" : undefined}>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#1e4a38]">
          {item.place}
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">{item.name}</h2>
        <p className="mt-2 text-sm text-[#8a6a32]">{item.covers}</p>
        <p className="mt-4 text-base leading-7 text-foreground">{item.built}</p>
        <p className="mt-3 text-base leading-7 text-muted-foreground">{item.result}</p>
        <p className="mt-3 text-sm">
          <a className="underline decoration-[#8a6a32]" href={item.sourceUrl}>
            {item.sourceLabel}
          </a>
        </p>
      </div>
    </article>
  );
}

export function CaseStudyCard({ item }: { item: CaseStudy }) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[16/9] overflow-hidden bg-[#e7dcc8]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(min-width: 768px) 30vw, 100vw"
            className="object-cover"
          />
        ) : (
          <p className="flex h-full items-center px-6 text-sm leading-6 text-[#1c1915]">
            Photo de terrasse manquante. On ne met pas l’assiette, ni la salle, à la place.
          </p>
        )}
      </div>
      <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-[#1e4a38]">
        {item.place}
      </p>
      <h3 className="mt-1 font-display text-2xl tracking-tight">{item.name}</h3>
      <p className="mt-2 text-sm leading-6 text-foreground">{item.built}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.result}</p>
      <p className="mt-2 text-sm">
        <a className="underline decoration-[#8a6a32]" href={item.sourceUrl}>
          {item.sourceLabel}
        </a>
      </p>
    </article>
  );
}
