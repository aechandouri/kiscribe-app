import Link from "next/link";

export const metadata = {
  title: "Politique de confidentialité — Kiscribe",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-4 py-12 max-w-2xl mx-auto" style={{ backgroundColor: "var(--color-bg)" }}>
      <Link href="/" className="text-sm mb-8 inline-block" style={{ color: "var(--color-primary)" }}>
        ← Retour
      </Link>

      <h1
        className="text-3xl mb-8"
        style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}
      >
        Politique de confidentialité
      </h1>

      <div className="space-y-6 text-sm" style={{ color: "var(--color-text)", lineHeight: "1.8" }}>
        <p style={{ color: "var(--color-text-muted)" }}>Dernière mise à jour : avril 2026</p>

        <section>
          <h2 className="font-semibold text-base mb-2">Données collectées</h2>
          <p>Kiscribe collecte uniquement :</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Adresse email (pour l&apos;authentification et la facturation)</li>
            <li>Compteurs d&apos;usage anonymisés (nombre de générations, durée estimée en secondes) — sans contenu de santé</li>
            <li>Données de facturation Stripe (gérées par Stripe, non stockées par Kiscribe)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">Données NON collectées</h2>
          <p>
            <strong>Kiscribe ne stocke aucune donnée de santé.</strong> L&apos;audio enregistré
            et les transcriptions sont traitées en mémoire et immédiatement supprimés après
            génération de la note. Aucune note de séance n&apos;est conservée sur les serveurs
            de Kiscribe.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">Services tiers</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Clerk</strong> — authentification (politique : clerk.com/privacy)</li>
            <li><strong>Groq</strong> — transcription audio (politique : groq.com/privacy)</li>
            <li><strong>Anthropic</strong> — structuration du texte (politique : anthropic.com/privacy)</li>
            <li><strong>Stripe</strong> — paiement (politique : stripe.com/privacy)</li>
            <li><strong>Supabase</strong> — base de données hébergée en Europe (politique : supabase.com/privacy)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">Vos droits (RGPD)</h2>
          <p>
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, de
            suppression et de portabilité de vos données. Pour exercer ces droits :&nbsp;
            <a href="mailto:contact@kiscribe.fr" style={{ color: "var(--color-primary)" }}>contact@kiscribe.fr</a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">Hébergement</h2>
          <p>
            L&apos;application est hébergée sur Vercel (CDN global). La base de données est hébergée
            sur Supabase dans la région Europe (eu-west-1). Les données ne sont pas transférées
            hors de l&apos;UE sauf pour les appels API Groq et Anthropic (USA) — qui ne conservent
            aucune donnée.
          </p>
        </section>
      </div>
    </div>
  );
}
