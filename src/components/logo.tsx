import { useId } from "react";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function TerraceMark({ className }: { className?: string }) {
  const clipId = `awning-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg viewBox="0 0 72 72" className={className} aria-hidden="true">
      <rect width="72" height="72" rx="8" fill="#f6f1e6" />
      <defs>
        <clipPath id={clipId}>
          <path d="M8 20h56v18c-7 10-14 10-21 0s-14-10-21 0-14 10-14 0V20z" />
        </clipPath>
      </defs>
      <rect x="6" y="12" width="60" height="3" rx="1" fill="#8a6a32" />
      <circle cx="10" cy="13.5" r="1.5" fill="#1e4a38" />
      <circle cx="62" cy="13.5" r="1.5" fill="#1e4a38" />
      <g clipPath={`url(#${clipId})`}>
        <rect x="8" y="18" width="56" height="32" fill="#f4ecdc" />
        <rect x="8" y="18" width="11.2" height="32" fill="#1e4a38" />
        <rect x="30.4" y="18" width="11.2" height="32" fill="#1e4a38" />
        <rect x="52.8" y="18" width="11.2" height="32" fill="#1e4a38" />
      </g>
      <path
        d="M14 52h44M18 52v8M36 52v8M54 52v8M14 62h44"
        stroke="#1e4a38"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  tone = "ink",
}: {
  className?: string;
  markClassName?: string;
  tone?: "ink" | "cream";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <TerraceMark className={cn("size-11 shrink-0", markClassName)} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.15rem] tracking-tight",
            tone === "cream" ? "text-[#f6f1e6]" : "text-foreground",
          )}
        >
          {brand.wordmarkLead}
        </span>
        {brand.wordmarkTail ? (
          <span
            className={cn(
              "mt-1 text-[0.62rem] font-medium uppercase tracking-[0.22em]",
              tone === "cream" ? "text-[#d7b56a]" : "text-[#1e4a38]",
            )}
          >
            {brand.wordmarkTail}
          </span>
        ) : null}
      </span>
    </span>
  );
}
