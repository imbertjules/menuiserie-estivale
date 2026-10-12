import Link from "next/link";
import { Logo } from "@/components/logo";
import { beyond, brand } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[#1c1915] text-[#f6f1e6]">
      <div className="awning-rule" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo tone="cream" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#d9d0c0]">
            {brand.frame} : {brand.route}.{" "}
            <span className="text-[#b7ad9d]">{brand.trial}.</span>
          </p>
          <ul className="mt-3 max-w-sm space-y-2 text-sm leading-5 text-[#d9d0c0]">
            {beyond.map((stop) => (
              <li key={stop.id}>
                <span className="text-[#f6f1e6]">{stop.city}.</span> {stop.text}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#c4a574]">
            Pages
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/realisations" className="hover:text-white">
                Réalisations
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#c4a574]">
            Atelier
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${brand.email}`} className="hover:text-white">
                {brand.email}
              </a>
            </li>
            <li>
              <a href={brand.phoneHref} className="hover:text-white">
                {brand.phoneDisplay}
              </a>
            </li>
            <li className="text-[#d9d0c0]">{brand.area}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-white/10 px-5 py-5 text-xs text-[#b7ad9d] sm:flex-row sm:justify-between">
        <p>
          © 2026 {brand.name}. Terrasses pour restaurants, {brand.frame}.
        </p>
        <p>Quelques exemples : Drouant, Labess, Melt.</p>
      </div>
    </footer>
  );
}
