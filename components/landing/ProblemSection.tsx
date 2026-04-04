import { AnimatedSection } from "@/components/AnimatedSection";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export function ProblemSection() {
  return (
    <section style={{ backgroundColor: "var(--color-section-alt)" }}>
      <div className="px-5 py-16 max-w-2xl mx-auto">

        <AnimatedSection className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-primary)" }}>
            Le problème
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
            2 heures par jour.<br />Non rémunérées.
          </h2>
          <p className="max-w-[300px] mx-auto text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "1.7" }}>
            Tu as choisi ce métier pour soigner. Pas pour passer tes soirées à rédiger des comptes-rendus.
          </p>
        </AnimatedSection>

        {/* Stat cards with glass + counter */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { target: 2,   suffix: "h",   label: "perdues / jour",   sub: "notes & codes",         delay: 0   },
            { target: 480, suffix: "h",   label: "gaspillées / an",  sub: "soit 60 journées",      delay: 80  },
            { target: 0,   suffix: "€",   label: "de rémunération",  sub: "pour tout ça",          delay: 160 },
          ].map(({ target, suffix, label, sub, delay }) => (
            <AnimatedSection key={label} delay={delay} type="scale-up">
              <div
                className="card-shimmer hover-lift rounded-2xl p-4 text-center flex flex-col"
                style={{
                  backgroundColor: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "var(--shadow-md)",
                  border: "1px solid rgba(255,255,255,0.9)",
                }}
              >
                <div
                  className="font-bold mb-1 stat-value"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.5rem, 5vw, 1.875rem)",
                  }}
                >
                  <AnimatedCounter target={target} suffix={suffix} delay={delay + 200} duration={1600} />
                </div>
                <div className="text-xs font-semibold mb-1" style={{ color: "var(--color-text)" }}>
                  {label}
                </div>
                <div className="text-xs leading-tight" style={{ color: "var(--color-text-muted)" }}>
                  {sub}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Quote */}
        <AnimatedSection delay={240} type="fade-up">
          <blockquote
            className="card-shimmer rounded-2xl px-5 py-5"
            style={{
              backgroundColor: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderLeft: "3px solid var(--color-primary)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <p
              className="italic mb-2.5 text-sm"
              style={{ color: "var(--color-text)", lineHeight: "1.75" }}
            >
              &ldquo;Je suis kiné, pas secrétaire. Mais je passe autant de temps à écrire qu&apos;à soigner. L&apos;Avenant 7 a tout chamboulé, j&apos;étais complètement perdue sur les codes.&rdquo;
            </p>
            <footer className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                M
              </div>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                Marie, 34 ans · Kinésithérapeute libérale, Lyon
              </span>
            </footer>
          </blockquote>
        </AnimatedSection>
      </div>
    </section>
  );
}
