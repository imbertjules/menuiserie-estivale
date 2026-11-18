import Image from "next/image";

export function HomeHeroPhoto() {
  return (
        <figure className="relative">
          <div className="relative aspect-[16/10] overflow-hidden bg-[#e7dcc8]">
            <Image
              src="/realisations/drouant-terrasse-places.jpg"
              alt="Terrasse de Drouant, place Gaillon, avec jardinières et bornes."
              fill
              priority
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-sm text-muted-foreground">
            Drouant, place Gaillon. Front de rue, jardinières et bornes.
          </figcaption>
        </figure>
  );
}
