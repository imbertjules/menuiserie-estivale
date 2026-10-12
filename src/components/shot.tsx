import Image from "next/image";
import type { Shot } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

export function ShotFigure({
  shot,
  className,
  frameClassName,
  sizes = "(min-width: 768px) 46vw, 100vw",
  priority = false,
}: {
  shot: Shot;
  className?: string;
  frameClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <figure className={className}>
      <div
        className={cn(
          "relative aspect-[3/2] overflow-hidden bg-[#e7dcc8]",
          frameClassName,
        )}
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
      <figcaption className="mt-2 text-sm leading-6 text-muted-foreground">
        <span className="text-foreground">{shot.caption}</span>{" "}
        <a className="underline decoration-[#8a6a32]" href={shot.creditUrl}>
          {shot.credit}
        </a>
        {shot.license ? (
          <>
            {" "}
            ·{" "}
            <a className="underline decoration-[#8a6a32]" href={shot.licenseUrl}>
              {shot.license}
            </a>
          </>
        ) : null}
      </figcaption>
    </figure>
  );
}
