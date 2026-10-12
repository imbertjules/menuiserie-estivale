import { steps } from "@/lib/home-steps";

export function HomeProcess() {
  return (
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <h2 className="font-display text-3xl tracking-tight sm:text-5xl">Comment un chantier se mène</h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.n}>
              <p className="font-display text-sm tracking-[0.18em] text-[#8a6a32]">{step.n}</p>
              <h3 className="mt-2 font-display text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
  );
}
