import type { Metadata } from "next";
import { HomeHeroPhoto } from "@/components/home-hero-photo";
import { HomeIntro } from "@/components/home-intro";
import { HomeOffer } from "@/components/home-offer";
import { HomeProcess } from "@/components/home-process";
import { HomeStrip } from "@/components/home-strip";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-end gap-10 px-5 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-20">
        <HomeIntro />
        <HomeHeroPhoto />
      </section>
      <HomeOffer />
      <HomeProcess />
      <HomeStrip />
    </>
  );
}
