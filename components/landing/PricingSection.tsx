import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";

const FEATURES = [
  { text: "Notes SOAPIE illimitées",                              hot: false },
  { text: "Codes AMK post-Avenant 7",                            hot: true  },
  { text: "Aucune app à télécharger — iPhone & Android",         hot: false },
  { text: "Dictée calibrée vocabulaire kiné",                    hot: false },
  { text: "Format Doctolib · Topaze · Oscarenova",               hot: false },
  { text: "Support email réactif",                               hot: false },
];

export function PricingSection() {
  return (
    <section style={{ backgroundColor: "var(--color-section-alt)" }}>
      <div className="px-5 py-16 max-w-2xl mx-auto">

        <AnimatedSection className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-primary)" }}>
            Tarif
          </p>
          <h2
            className="mb-3"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--color-text)",
              fontSize: "clamp(1.7rem, 6vw, 2rem)",
              lineHeight: "1.2",
            }}
          >
            Simple. Transparent.
          </h2>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Un seul plan. Tout inclus. Résiliable à tout moment.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={80} type="scale-up">
          {/* Rotating border wrapper */}
          <div className="shimmer-card rounded-3xl" style={{ borderRadius: "24px" }}>
            <div
              className="card-shimmer rounded-3xl overflow-hidden"
              style={{
                backgroundColor: "var(--color-surface)",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              {/* Top gradient band */}
              <div
                className="h-1.5 w-full"
                style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-primary))", backgroundSize: "200% 100%", animation: "shimmer-sweep 3s ease-in-out infinite" }}
              />

              {/* Price header */}
              <div className="px-6 pt-7 pb-6 text-center" style={{ borderBottom: "1px solid var(--color-border)" }}>
                <div
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold mb-5"
                  style={{
                    backgroundColor: "var(--color-accent-bg)",
                    color: "var(--color-accent)",
                    border: "1px solid rgba(196,169,106,0.3)",
                  }}
                >
                  ★ Early Access — Prix bloqué à vie
                </div>

                <div className="flex items-start justify-center gap-1">
                  <span className="text-lg font-medium mt-3" style={{ color: "var(--color-text-muted)" }}>€</span>
                  <span
                    className="font-bold leading-none"
                    style={{
                      fontFamily: "var(--font-serif)",
                      color: "var(--color-text)",
                      fontSize: "clamp(3.5rem, 12vw, 4.5rem)",
                    }}
                  >
                    49
                  </span>
                  <span className="text-base font-medium mt-4" style={{ color: "var(--color-text-muted)" }}>/mois</span>
                </div>

                <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                  HT · soit ~1.60€ par jour de travail
                </p>

                <div
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold mt-3"
                  style={{ backgroundColor: "var(--color-success-bg)", color: "#2D6A4F" }}
                >
                  ✓ 1 patient remboursé = 1 mois payé
                </div>
              </div>

              {/* Features */}
              <div className="px-6 py-6">
                <ul className="space-y-3.5 mb-7">
                  {FEATURES.map(({ text, hot }) => (
                    <li key={text} className="flex items-center gap-3 text-sm">
                      <span
                        className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold shrink-0"
                        style={{ backgroundColor: hot ? "var(--color-accent)" : "var(--color-primary)", color: "white" }}
                      >
                        ✓
                      </span>
                      <span style={{ color: "var(--color-text)", fontWeight: hot ? 600 : 400 }}>
                        {text}
                        {hot && (
                          <span
                            className="ml-2 text-xs px-1.5 py-0.5 rounded font-medium"
                            style={{ backgroundColor: "var(--color-accent-bg)", color: "var(--color-accent)" }}
                          >
                            Avenant 7
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/sign-up"
                  className="cta-btn cta-glow block w-full text-center rounded-2xl py-4 text-white font-semibold text-base cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, var(--color-primary) 0%, #4A6349 100%)",
                    boxShadow: "var(--shadow-primary)",
                  }}
                >
                  Démarrer l&apos;essai gratuit — 7 jours
                </Link>
                <p className="text-center text-xs mt-3" style={{ color: "var(--color-text-muted)" }}>
                  Aucune carte bancaire requise · Résiliable en 1 clic
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Reassurance strip */}
        <AnimatedSection delay={160} type="fade-in" className="flex items-center justify-center gap-6 mt-6">
          {["RGPD", "Données non stockées", "Support FR"].map((t) => (
            <div key={t} className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
              <span style={{ color: "var(--color-primary)" }}>✓</span> {t}
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
