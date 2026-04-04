import Link from "next/link";

export const metadata = {
  title: "Conditions Générales d'Utilisation — Kiscribe",
};

export default function CGUPage() {
  return (
    <div className="min-h-screen px-4 py-12 max-w-2xl mx-auto" style={{ backgroundColor: "var(--color-bg)" }}>
      <Link href="/" className="text-sm mb-8 inline-block" style={{ color: "var(--color-primary)" }}>
        ← Retour
      </Link>

      <h1
        className="text-3xl mb-8"
        style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}
      >
        Conditions Générales d&apos;Utilisation
      </h1>

      <div className="space-y-6 text-sm" style={{ color: "var(--color-text)", lineHeight: "1.8" }}>
        <p style={{ color: "var(--color-text-muted)" }}>Dernière mise à jour : avril 2026</p>

        <section>
          <h2 className="font-semibold text-base mb-2">1. Objet</h2>
          <p>
            Kiscribe est un service d&apos;assistance à la rédaction de notes cliniques destiné aux
            kinésithérapeutes libéraux. Il utilise l&apos;intelligence artificielle pour transcrire et
            structurer des dictées vocales en notes au format SOAPIE avec suggestions de codes AMK.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">2. Avertissement important</h2>
          <p>
            <strong>La note générée par Kiscribe est une aide à la rédaction et doit impérativement
            être vérifiée, corrigée et validée par le praticien avant tout usage clinique ou
            administratif.</strong> Kiscribe ne se substitue pas au jugement clinique du
            kinésithérapeute. Le praticien reste seul responsable du contenu de ses notes de séance
            et de sa facturation.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">3. Utilisation du service</h2>
          <p>
            L&apos;accès au service est réservé aux professionnels de santé (kinésithérapeutes) exerçant
            en France. L&apos;utilisateur s&apos;engage à ne pas utiliser Kiscribe pour traiter des données
            concernant des tiers sans leur consentement.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">4. Données de santé</h2>
          <p>
            Kiscribe ne stocke aucune donnée de santé sur ses serveurs. L&apos;audio enregistré est
            transmis à des services tiers de transcription et immédiatement supprimé. La note
            générée est renvoyée à l&apos;utilisateur sans être conservée. L&apos;utilisateur est responsable
            du stockage et de la sécurité de ses notes dans son propre logiciel de gestion.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">5. Abonnement et facturation</h2>
          <p>
            Kiscribe est proposé en abonnement mensuel à 49€ HT/mois. Un essai gratuit de 7 jours
            est disponible sans engagement ni CB requise. L&apos;abonnement est renouvelable
            automatiquement et résiliable à tout moment depuis l&apos;espace client.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">6. Limitation de responsabilité</h2>
          <p>
            Kiscribe ne peut être tenu responsable de toute erreur dans les notes générées, de
            tout préjudice résultant d&apos;une utilisation sans validation du praticien, ni de toute
            indisponibilité temporaire du service. La responsabilité de Kiscribe est limitée au
            montant des sommes effectivement versées par l&apos;utilisateur au cours des 3 derniers mois.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">7. Contact</h2>
          <p>
            Pour toute question : <a href="mailto:contact@kiscribe.fr" style={{ color: "var(--color-primary)" }}>contact@kiscribe.fr</a>
          </p>
        </section>
      </div>
    </div>
  );
}
