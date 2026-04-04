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

      <h1 className="text-3xl mb-8" style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}>
        Politique de confidentialité
      </h1>

      <div className="space-y-6 text-sm" style={{ color: "var(--color-text)", lineHeight: "1.8" }}>
        <p style={{ color: "var(--color-text-muted)" }}>Dernière mise à jour : avril 2026</p>

        <section>
          <h2 className="font-semibold text-base mb-2">1. Responsable de traitement</h2>
          <p>
            AC Scaling LTD, zh.k. Malinova Dolina, bl. 29, entr. B, fl. 8, apt. 49, 1700 Sofia, Bulgarie.
            N° 208059586. Contact : <a href="mailto:contact@kiscribe.fr" style={{ color: "var(--color-primary)" }}>contact@kiscribe.fr</a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">2. Données collectées et finalités</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse mt-2">
              <thead>
                <tr style={{ backgroundColor: "var(--color-section-alt)" }}>
                  <th className="text-left p-2 border" style={{ borderColor: "var(--color-border)" }}>Donnée</th>
                  <th className="text-left p-2 border" style={{ borderColor: "var(--color-border)" }}>Finalité</th>
                  <th className="text-left p-2 border" style={{ borderColor: "var(--color-border)" }}>Base légale</th>
                  <th className="text-left p-2 border" style={{ borderColor: "var(--color-border)" }}>Durée</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Email", "Authentification, notifications", "Contrat", "Durée abonnement + 3 ans"],
                  ["Données de facturation", "Paiement (Stripe)", "Contrat / Obligation légale", "10 ans (obligation comptable)"],
                  ["Logs d'usage anonymisés", "Amélioration du service", "Intérêt légitime", "12 mois"],
                  ["Audio (dictée)", "Transcription — traitement transient", "Contrat", "Supprimé immédiatement"],
                  ["Transcription textuelle", "Génération note — traitement transient", "Contrat", "Supprimé immédiatement"],
                  ["Note SOAPIE générée", "Retournée à l'utilisateur", "Contrat", "Non stockée"],
                ].map(([data, purpose, base, duration]) => (
                  <tr key={data}>
                    <td className="p-2 border" style={{ borderColor: "var(--color-border)" }}><strong>{data}</strong></td>
                    <td className="p-2 border" style={{ borderColor: "var(--color-border)" }}>{purpose}</td>
                    <td className="p-2 border" style={{ borderColor: "var(--color-border)" }}>{base}</td>
                    <td className="p-2 border" style={{ borderColor: "var(--color-border)" }}>{duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">3. Données de santé — architecture zero-storage</h2>
          <p>
            <strong>Kiscribe ne stocke aucune donnée de santé à caractère personnel.</strong>
            L&apos;audio dicté et les transcriptions sont traités en mémoire vive et supprimés
            immédiatement après génération de la note. Cette architecture est conçue pour
            que Kiscribe n&apos;entre pas dans le champ de la réglementation HDS
            (Hébergeurs de Données de Santé, Art. L.1111-8 CSP).
          </p>
          <p className="mt-2">
            Le kinésithérapeute reste responsable de traitement pour les données de santé de
            ses patients et doit s&apos;assurer que son propre logiciel de gestion est conforme
            aux exigences HDS applicables.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">4. Sous-traitants et transferts hors UE</h2>
          <div className="space-y-3 mt-2">
            {[
              {
                name: "Clerk (authentification)",
                location: "USA",
                guarantee: "SCCs + Data Processing Agreement",
                link: "https://clerk.com/privacy",
                health: false,
              },
              {
                name: "Groq (transcription audio)",
                location: "USA",
                guarantee: "Zero-data-retention policy — données non utilisées pour l'entraînement",
                link: "https://groq.com/privacy-policy",
                health: true,
              },
              {
                name: "Anthropic (génération de notes)",
                location: "USA",
                guarantee: "Zero-data-retention API policy — données non utilisées pour l'entraînement",
                link: "https://www.anthropic.com/privacy",
                health: true,
              },
              {
                name: "Stripe (paiement)",
                location: "USA",
                guarantee: "SCCs + Privacy Shield successor framework",
                link: "https://stripe.com/privacy",
                health: false,
              },
              {
                name: "Supabase (base de données)",
                location: "Europe (eu-west-1)",
                guarantee: "Hébergement UE — pas de transfert hors UE",
                link: "https://supabase.com/privacy",
                health: false,
              },
              {
                name: "Vercel (hébergement application)",
                location: "USA / CDN global",
                guarantee: "SCCs — données applicatives uniquement, pas de données de santé",
                link: "https://vercel.com/legal/privacy-policy",
                health: false,
              },
            ].map(({ name, location, guarantee, link, health }) => (
              <div key={name} className="rounded-lg p-3" style={{ backgroundColor: "var(--color-section-alt)", border: "1px solid var(--color-border)" }}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <strong>{name}</strong>
                    {health && (
                      <span className="ml-2 text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--color-accent-bg)", color: "var(--color-accent)" }}>
                        traitement transient
                      </span>
                    )}
                    <div className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>📍 {location}</div>
                    <div className="text-xs mt-0.5">{guarantee}</div>
                  </div>
                </div>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-xs mt-1 inline-block" style={{ color: "var(--color-primary)" }}>
                  Politique de confidentialité →
                </a>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">5. Vos droits (RGPD)</h2>
          <p>Conformément au RGPD (Règlement UE 2016/679), vous disposez des droits suivants :</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Droit d&apos;accès</strong> (Art. 15) — obtenir une copie de vos données</li>
            <li><strong>Droit de rectification</strong> (Art. 16) — corriger des données inexactes</li>
            <li><strong>Droit à l&apos;effacement</strong> (Art. 17) — suppression de votre compte et données</li>
            <li><strong>Droit à la portabilité</strong> (Art. 20) — export de vos données</li>
            <li><strong>Droit d&apos;opposition</strong> (Art. 21) — opposition au traitement</li>
            <li><strong>Droit à la limitation</strong> (Art. 18) — restriction du traitement</li>
          </ul>
          <p className="mt-2">
            Pour exercer ces droits : <a href="mailto:contact@kiscribe.fr" style={{ color: "var(--color-primary)" }}>contact@kiscribe.fr</a>.
            Réponse sous 30 jours. En cas de désaccord, vous pouvez saisir la{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)" }}>CNIL</a>.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">6. Cookies et traceurs</h2>
          <p>
            Kiscribe n&apos;utilise pas de cookies publicitaires ni de traceurs tiers à des fins marketing.
            Les seuls cookies utilisés sont des cookies de session strictement nécessaires au fonctionnement
            de l&apos;authentification (Clerk) et ne nécessitent pas de consentement au titre de l&apos;Art. 82 de la loi Informatique et Libertés.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">7. Sécurité</h2>
          <p>
            Toutes les communications sont chiffrées via HTTPS/TLS 1.3. Les données de compte sont
            gérées par Clerk avec authentification sécurisée. Les données de facturation sont gérées
            exclusivement par Stripe (certifié PCI-DSS Level 1) et ne transitent jamais par les serveurs de Kiscribe.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">8. Contact DPO</h2>
          <p>
            Bien que non obligatoire pour une structure de cette taille, vous pouvez contacter notre
            référent protection des données à :{" "}
            <a href="mailto:contact@kiscribe.fr" style={{ color: "var(--color-primary)" }}>contact@kiscribe.fr</a>
          </p>
        </section>
      </div>
    </div>
  );
}
