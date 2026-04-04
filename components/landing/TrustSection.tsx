import { AnimatedSection } from "@/components/AnimatedSection";

export function TrustSection() {
  return (
    <section style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="px-5 py-16 max-w-2xl mx-auto">
        <AnimatedSection className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-primary)" }}>
            Confidentialité
          </p>
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--color-text)",
              fontSize: "clamp(1.7rem, 6vw, 2rem)",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
            }}
          >
            Tes données patients<br />ne nous appartiennent pas.
          </h2>
          <p className="max-w-[300px] mx-auto text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "1.7" }}>
            On a conçu Kiscribe comme si chaque kiné était aussi juriste RGPD.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-4">
          {[
            {
              icon: "🔒",
              title: "Zéro stockage de données de santé",
              body: "Ta dictée est envoyée à l'IA pour transcription, puis immédiatement supprimée. Aucune donnée patient n'est conservée sur nos serveurs — ni le nom, ni le contenu de la séance.",
            },
            {
              icon: "⚡",
              title: "Traitement à la volée, pas d'archive",
              body: "L'architecture est stateless par design. Chaque dictée est traitée en temps réel et oubliée. On ne peut pas divulguer ce qu'on ne stocke pas.",
            },
            {
              icon: "🇪🇺",
              title: "RGPD — infrastructure européenne",
              body: "Les serveurs sont hébergés en Europe. Tu restes le seul responsable de traitement. Kiscribe est un outil, pas un sous-traitant de données de santé.",
            },
          ].map(({ icon, title, body }, i) => (
            <AnimatedSection key={title} delay={i * 80}>
              <div
                className="flex gap-4 rounded-2xl p-5"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-xs)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg"
                  style={{ backgroundColor: "var(--color-section-alt)" }}
                >
                  {icon}
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1" style={{ color: "var(--color-text)" }}>
                    {title}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)", lineHeight: "1.7" }}>
                    {body}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={300} className="text-center mt-6">
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            Tu as une question sur la conformité ? On répond sous 24h.{" "}
            <a href="mailto:contact@kiscribe.fr" style={{ color: "var(--color-primary)" }}>
              contact@kiscribe.fr
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
