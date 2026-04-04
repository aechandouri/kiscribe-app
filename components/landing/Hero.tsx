import Link from "next/link";

export function Hero() {
  return (
    <section className="relative px-5 pt-14 pb-16 text-center max-w-2xl mx-auto w-full overflow-hidden">

      {/* Animated blobs */}
      <div className="hero-blob hero-blob-1" aria-hidden="true" />
      <div className="hero-blob hero-blob-2" aria-hidden="true" />
      <div className="hero-blob hero-blob-3" aria-hidden="true" />

      {/* Trust pill */}
      <div
        className="animate-appear inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 text-xs font-semibold"
        style={{
          backgroundColor: "var(--color-surface)",
          color: "var(--color-text-muted)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <span
          className="w-5 h-5 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: "var(--color-primary)", fontSize: "10px" }}
        >
          ✓
        </span>
        Aucune donnée de santé stockée · RGPD
      </div>

      {/* Headline */}
      <h1
        className="animate-appear animate-appear-d1 mb-5"
        style={{
          fontFamily: "var(--font-serif)",
          color: "var(--color-text)",
          fontSize: "clamp(2.4rem, 9vw, 3.25rem)",
          lineHeight: "1.08",
          letterSpacing: "-0.03em",
        }}
      >
        Tes notes kiné<br />
        <em className="hero-em not-italic">en 2 minutes.</em>
      </h1>

      {/* Subline */}
      <p
        className="animate-appear animate-appear-d2 mb-8 max-w-[320px] mx-auto"
        style={{
          color: "var(--color-text-muted)",
          fontSize: "1.05rem",
          lineHeight: "1.7",
        }}
      >
        Tu parles 90 secondes après ta séance. On génère la note SOAPIE complète + le bon code AMK.
      </p>

      {/* CTA group */}
      <div className="animate-appear animate-appear-d3 flex flex-col items-center gap-3 mb-12">
        <Link
          href="/sign-up"
          className="cta-btn cta-glow inline-flex items-center justify-center w-full max-w-[280px] rounded-2xl py-4 px-6 text-white font-semibold text-base cursor-pointer"
          style={{
            backgroundColor: "var(--color-primary)",
            boxShadow: "var(--shadow-primary)",
          }}
        >
          Essayer gratuitement — 7 jours
        </Link>
        <div className="flex items-center gap-3 text-xs" style={{ color: "var(--color-text-muted)" }}>
          <span>Aucune CB requise</span>
          <span style={{ color: "var(--color-border)" }}>·</span>
          <span>Annulable à tout moment</span>
        </div>
      </div>

      {/* Trust strip */}
      <div
        className="animate-appear animate-appear-d4 flex items-center justify-center gap-6 pt-5"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        {[
          { value: "90s",  label: "par séance" },
          { value: "AMK",  label: "post-Avenant 7" },
          { value: "0 app", label: "à télécharger" },
        ].map(({ value, label }) => (
          <div key={value} className="text-center">
            <div
              className="text-base font-bold"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}
            >
              {value}
            </div>
            <div className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
