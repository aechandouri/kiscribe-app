import { AnimatedSection } from "@/components/AnimatedSection";

const SOAPIE_SECTIONS = [
  { letter: "S", label: "Subjectif",    content: "Douleur lombaire EVA 6/10, aggravée en station debout. Amélioration depuis la séance précédente." },
  { letter: "O", label: "Objectif",     content: "Flexion 70°, extension 15°. Test de Schöber +. Contracture paravertébrale L3-L5." },
  { letter: "A", label: "Analyse",      content: "Lombalgie chronique, amélioration progressive. Déficit de mobilité résiduel, objectif atteint à 60%." },
  { letter: "P", label: "Plan",         content: "Renforcement lombaire + étirements psoas. 3 séances/semaine × 4 semaines." },
  { letter: "I", label: "Intervention", content: "Vélo 10 min. Renfo 3×15. Étirements psoas 3×30s. Massage décontracturant 15 min." },
  { letter: "E", label: "Évaluation",   content: "EVA 2/10 en fin de séance. Bonne tolérance. Patient motivé, observance ++." },
];

export function SoapiePreview() {
  return (
    <section style={{ backgroundColor: "var(--color-section-alt)" }}>
      <div className="px-5 py-16 max-w-2xl mx-auto">

        <AnimatedSection className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-primary)" }}>
            Résultat en direct
          </p>
          <h2
            className="text-[2rem] leading-tight mb-3"
            style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}
          >
            Ce que tu obtiens<br />après 90 secondes.
          </h2>
          <p className="text-sm max-w-xs mx-auto" style={{ color: "var(--color-text-muted)" }}>
            Note SOAPIE complète + code AMK. Prête à coller.
          </p>
        </AnimatedSection>

        {/* Phone wrapper with depth shadow + float */}
        <AnimatedSection delay={120} type="scale-up" className="max-w-sm mx-auto">
          <div
            className="phone-float"
            style={{
              filter: "drop-shadow(0 32px 48px rgba(92,122,95,0.18)) drop-shadow(0 8px 16px rgba(0,0,0,0.1))",
            }}
          >
            <div
              className="rounded-[32px] overflow-hidden"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {/* Phone status bar */}
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{
                  background: "linear-gradient(180deg, var(--color-surface) 0%, rgba(250,250,248,0.95) 100%)",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <span
                  className="text-base font-medium"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--color-primary)" }}
                >
                  Kiscribe
                </span>
                <div
                  className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "#DCFCE7", color: "#16A34A" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ backgroundColor: "#16A34A" }}
                  />
                  Note générée
                </div>
              </div>

              {/* SOAPIE content */}
              <div>
                {SOAPIE_SECTIONS.map(({ letter, label, content }, i) => (
                  <div
                    key={letter}
                    className="px-4 py-3"
                    style={{
                      borderBottom: i < SOAPIE_SECTIONS.length - 1 ? "1px solid var(--color-border)" : "none",
                    }}
                  >
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-bold w-4 shrink-0" style={{ color: "var(--color-primary)" }}>
                        {letter}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-primary)" }}>
                        {label}
                      </span>
                    </div>
                    <p className="text-xs pl-6 leading-relaxed" style={{ color: "var(--color-text)" }}>
                      {content}
                    </p>
                  </div>
                ))}
              </div>

              {/* AMK Badge */}
              <div
                className="mx-4 mb-4 mt-2 rounded-xl p-3"
                style={{
                  background: "linear-gradient(135deg, var(--color-accent-bg) 0%, rgba(255,255,255,0.8) 100%)",
                  border: "1px solid rgba(196,169,106,0.3)",
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  >
                    AMK 7.5
                  </span>
                  <span className="text-xs font-medium" style={{ color: "var(--color-accent)" }}>
                    Code suggéré · tu valides
                  </span>
                </div>
                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                  Rééducation lombaire — Avenant 7 juillet 2025.
                </p>
              </div>

              {/* Copy button */}
              <div className="px-4 pb-5">
                <div
                  className="w-full rounded-xl py-3 text-center text-sm font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, var(--color-primary) 0%, #4A6349 100%)",
                    boxShadow: "var(--shadow-primary)",
                  }}
                >
                  Copier la note ✓
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs mt-5" style={{ color: "var(--color-text-muted)" }}>
            Généré depuis une dictée de 75 secondes · tu valides avant de signer
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
