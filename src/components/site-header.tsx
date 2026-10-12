"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/realisations", label: "Réalisations" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link
          href="/"
          className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1e4a38]"
          onClick={() => setOpen(false)}
        >
          <Logo />
          <span className="sr-only">Accueil</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Pages">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm tracking-wide focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1e4a38]",
                isActive(link.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Button
            nativeButton={false}
            render={<Link href="/contact" />}
            className="h-10 px-4"
          >
            Parler d’un trottoir
          </Button>
        </nav>

        <Button
          variant="outline"
          size="icon"
          className="size-10 md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
          <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
        </Button>
      </div>

      {open ? (
        <nav
          id="menu-mobile"
          className="border-t border-border px-5 py-4 md:hidden"
          aria-label="Pages"
        >
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                href="/"
                className="block rounded-md px-2 py-3 text-base"
                aria-current={pathname === "/" ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                Accueil
              </Link>
            </li>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-2 py-3 text-base"
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button
                nativeButton={false}
                render={<Link href="/contact" onClick={() => setOpen(false)} />}
                className="h-12 w-full"
              >
                Parler d’un trottoir
              </Button>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
