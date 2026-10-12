import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { beyond, beyondMeta, brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Écrire à ${brand.name}. ${brand.frame} : ${brand.route}. ${brand.trial}. ${beyondMeta}`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-12 md:grid-cols-[1.15fr_0.85fr] md:py-20">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#1e4a38]">
          Contact
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-balance sm:text-5xl">
          Le quartier, la largeur, la saison.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
          On répond sous un jour ouvré. {brand.frame} : {brand.route}.{" "}
          <span className="text-[#8a6a32]">{brand.trial}.</span> Plus loin, trois
          offres distinctes. Si le formulaire vous agace, le téléphone et le mail
          font le même travail.
        </p>
        <ul className="mt-4 max-w-xl space-y-2 text-sm leading-6">
          {beyond.map((stop) => (
            <li key={stop.id}>
              <span className="font-medium text-foreground">{stop.city}.</span>{" "}
              <span className="text-muted-foreground">{stop.text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <ContactForm />
        </div>
      </div>

      <aside className="h-fit border border-border bg-[#faf6ef] p-6 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#1e4a38]">
          Directement
        </p>
        <p className="mt-4 font-display text-3xl tracking-tight">{brand.name}</p>
        <ul className="mt-6 space-y-4 text-base">
          <li>
            <a className="underline decoration-[#8a6a32]" href={`mailto:${brand.email}`}>
              {brand.email}
            </a>
          </li>
          <li>
            <a className="underline decoration-[#8a6a32]" href={brand.phoneHref}>
              {brand.phoneDisplay}
            </a>
          </li>
          <li className="text-muted-foreground">{brand.area}</li>
          <li>{brand.route}</li>
          <li className="text-sm text-[#8a6a32]">{brand.trial}</li>
          {beyond.map((stop) => (
            <li key={stop.id} className="text-sm leading-6 text-muted-foreground">
              <span className="text-foreground">{stop.city}.</span> {stop.text}
            </li>
          ))}
          <li className="text-muted-foreground">Mardi–vendredi, 9 h–18 h</li>
        </ul>
        <p className="mt-8 text-sm leading-6 text-muted-foreground">
          Le formulaire envoie le message à {brand.email}. Tant que l’envoi
          automatique n’est pas branché, votre messagerie s’ouvre avec le texte déjà
          écrit. Le téléphone répond dans tous les cas.
        </p>
      </aside>
    </div>
  );
}
