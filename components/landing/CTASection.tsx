import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";

export function CTASection() {
  return (
    <section className="px-5 py-16 max-w-2xl mx-auto w-full">
      <AnimatedSection type="scale-up">
        <div
          className="rounded-3xl px-6 py-14 text-center relative overflow-hidden"
          style={{ boxShadow: "var(--shadow-lg), 0 0 0 1px rgba(92,122,95,0.15)" }}
        >
          {/* Animated gradient background */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, var(--color-primary) 0%, #3D5E40 50%, #4A6349 100%)",
            }}
          />

          {/* Glow orbs */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: [
                "radial-gradient(ellipse 70% 50% at 50% 120%, rgba(255,255,255,0.08) 0%, transparent 60%)",
                "radial-gradient(ellipse 40% 30% at 10% 10%, rgba(196,169,106,0.12) 0%, transparent 50%)",
                "radial-gradient(ellipse 30% 25% at 90% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)",
              ].join(", "),
            }}
          />

          {/* Shimmer sweep */}
          <div
            aria-hidden="true"
            className="card-shimmer absolute inset-0 pointer-events-none"
          />

          <h2
            className="relative mb-4 text-white"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.7rem, 6vw, 2.2rem)",
              lineHeight: "1.15",
              letterSpacing: "-0.025em",
              textShadow: "0 1px 2px rgba(0,0,0,0.12)",
            }}
          >
            Récupère 2 heures<br />par jour dès demain.
          </h2>

          <p
            className="relative mb-8 max-w-[260px] mx-auto text-sm"
            style={{ color: "rgba(255,255,255,0.82)", lineHeight: "1.7" }}
          >
            Tes patients méritent toute ton énergie. Arrête de la dépenser sur de la paperasse.
          </p>

          <Link
            href="/sign-up"
            className="cta-btn-outline relative inline-flex items-center justify-center rounded-2xl py-4 px-8 font-semibold text-base cursor-pointer"
            style={{
              backgroundColor: "white",
              color: "var(--color-primary)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
            }}
          >
            Commencer — 7 jours gratuits →
          </Link>

          <div className="relative flex items-center justify-center gap-4 mt-7">
            {["Aucune CB", "RGPD", "Annulable à tout moment"].map((t) => (
              <span key={t} className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
