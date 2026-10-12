import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#1e4a38]">404</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight">Cette page n’est pas sur le trottoir.</h1>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        Le lien est mort, ou l’adresse a été raccourcie de trop.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center bg-[#1e4a38] px-5 text-[#f6f1e6]"
      >
        Retour à l’accueil
      </Link>
    </div>
  );
}
