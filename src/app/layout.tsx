import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { beyondMeta, brand } from "@/lib/brand";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const description = `${brand.name} dessine et pose des terrasses pour les restaurants. ${brand.frame} : ${brand.route}. ${brand.trial}. ${beyondMeta}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.name} — terrasses de restaurants, ${brand.frame}`,
    template: `%s · ${brand.name}`,
  },
  description,
  openGraph: {
    title: `${brand.name} — terrasses de restaurants, ${brand.frame}`,
    description,
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-background focus:px-3 focus:py-2"
        >
          Aller au contenu
        </a>
        <SiteHeader />
        <div className="awning-rule" aria-hidden="true" />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
