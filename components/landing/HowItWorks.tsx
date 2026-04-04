import { AnimatedSection } from "@/components/AnimatedSection";

const STEPS = [
  {
    number: "01",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4Z" />
        <path d="M19 10a7 7 0 0 1-14 0M12 19v4M8 23h8" />
      </svg>
    ),
    title: "Tu parles",
    description: "Décris la séance naturellement après ton patient. 60 à 45 secondes, sans structure particulière.",
    detail: "Vocabulaire kiné compris — lombalgie, renfo, EVA, psoas…",
  },
  {
    number: "02",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
      </svg>
    ),
    title: "On structure",
    description: "L'IA génère ta note SOAPIE complète avec les 6 sections et suggère le bon code AMK.",
    detail: "Post-Avenant 7 — AMK 7.5, AMK 14, BDK, IFN, IFD",
  },
  {
    number: "03",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
      </svg>
    ),
    title: "Tu valides et tu copies",
    description: "Tu lis la note, tu confirmes le code AMK, et tu copies en un tap dans Doctolib, Topaze ou Oscarenova.",
    detail: "Format structuré S/O/A/P/I/E prêt à coller",
  },
];

export function HowItWorks() {
  return (
    <section className="px-5 py-16 max-w-2xl mx-auto w-full">
      <AnimatedSection className="text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-primary)" }}>
          Comment ça marche
        </p>
        <h2
          className="text-[2rem] leading-tight"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}
        >
          3 étapes.<br />2 minutes maxi.
        </h2>
      </AnimatedSection>

      <div className="flex flex-col gap-4">
        {STEPS.map((step, i) => (
          <AnimatedSection key={i} delay={i * 100}>
            <div
              className="hover-lift flex items-start gap-4 rounded-2xl p-5"
              style={{
                backgroundColor: "var(--color-surface)",
                boxShadow: "var(--shadow-sm)",
                border: "1px solid var(--color-border)",
              }}
            >
              {/* Number + icon */}
              <div className="flex flex-col items-center gap-2 shrink-0 pt-0.5">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-xl"
                  style={{ backgroundColor: "var(--color-primary)", color: "white" }}
                >
                  {step.icon}
                </div>
                <span className="text-xs font-bold font-mono" style={{ color: "var(--color-border)" }}>
                  {step.number}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base mb-1" style={{ color: "var(--color-text)" }}>
                  {step.title}
                </h3>
                <p className="text-sm mb-2.5" style={{ color: "var(--color-text-muted)", lineHeight: "1.6" }}>
                  {step.description}
                </p>
                <div
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "var(--color-accent-bg)", color: "var(--color-accent)" }}
                >
                  <span>✓</span> {step.detail}
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
