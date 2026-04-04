import Link from "next/link";

export const metadata = {
  title: "Conditions Générales de Vente — Kiscribe",
};

export default function CGVPage() {
  return (
    <div className="min-h-screen px-4 py-12 max-w-2xl mx-auto" style={{ backgroundColor: "var(--color-bg)" }}>
      <Link href="/" className="text-sm mb-8 inline-block" style={{ color: "var(--color-primary)" }}>
        ← Retour
      </Link>

      <h1 className="text-3xl mb-8" style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}>
        Conditions Générales de Vente
      </h1>

      <div className="space-y-6 text-sm" style={{ color: "var(--color-text)", lineHeight: "1.8" }}>
        <p style={{ color: "var(--color-text-muted)" }}>Dernière mise à jour : avril 2026</p>

        <section>
          <h2 className="font-semibold text-base mb-2">1. Vendeur</h2>
          <p>
            AC Scaling LTD, zh.k. Malinova Dolina, bl. 29, entr. B, fl. 8, apt. 49, 1700 Sofia, Bulgarie.
            Numéro d&apos;immatriculation : 208059586. Email : contact@kiscribe.fr
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">2. Objet et champ d&apos;application</h2>
          <p>
            Les présentes CGV régissent la vente du service Kiscribe (abonnement SaaS d&apos;assistance à la rédaction
            de notes cliniques par intelligence artificielle) aux kinésithérapeutes libéraux exerçant en France.
            Toute souscription implique l&apos;acceptation pleine et entière des présentes CGV.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">3. Offre et tarifs</h2>
          <p>
            <strong>Abonnement Solo</strong> : 49 € HT / mois (soit 58,80 € TTC à 20% de TVA).<br />
            Un <strong>essai gratuit de 7 jours</strong> est proposé sans engagement ni carte bancaire requise.
            À l&apos;issue de l&apos;essai, l&apos;abonnement est activé uniquement si l&apos;utilisateur renseigne ses informations
            de paiement. Sans action, l&apos;accès est automatiquement suspendu.
          </p>
          <p className="mt-2">
            Kiscribe se réserve le droit de modifier ses tarifs avec un préavis de 30 jours par email.
            Les modifications ne s&apos;appliquent pas aux abonnements en cours avant la date d&apos;entrée en vigueur.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">4. Modalités de paiement</h2>
          <p>
            Le paiement est effectué par carte bancaire via Stripe (Stripe, Inc.). Le prélèvement est
            mensuel, à date anniversaire de souscription. En cas d&apos;échec de paiement, un délai de grâce
            de 7 jours est accordé avant suspension du service.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">5. Résiliation</h2>
          <p>
            L&apos;abonnement est résiliable à tout moment depuis l&apos;espace client (portail Stripe). La résiliation
            prend effet à la fin de la période mensuelle en cours. Aucun remboursement au prorata n&apos;est pratiqué
            sauf en cas de faute exclusive de Kiscribe rendant le service totalement inaccessible sur une
            période supérieure à 72 heures consécutives.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">6. Droit de rétractation</h2>
          <p>
            Conformément à l&apos;article L.221-28 du Code de la consommation, le droit de rétractation ne
            s&apos;applique pas aux contenus numériques fournis immédiatement avec accord exprès de l&apos;utilisateur.
            En souscrivant à Kiscribe et en accédant immédiatement au service, l&apos;utilisateur renonce
            expressément à son droit de rétractation de 14 jours.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">7. Qualité du service et SLA</h2>
          <p>
            Kiscribe s&apos;engage à assurer une disponibilité du service de 99% en moyenne mensuelle, hors
            opérations de maintenance planifiées communiquées 24h à l&apos;avance. En cas d&apos;indisponibilité
            supérieure à 72h consécutives, un avoir proportionnel sera appliqué sur la prochaine facture.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">8. Responsabilité et avertissement clinique</h2>
          <p>
            <strong>Kiscribe est un outil d&apos;aide à la rédaction uniquement.</strong> Les notes générées
            constituent des propositions devant impérativement être vérifiées, corrigées et validées par le
            praticien avant tout usage clinique, administratif ou de facturation. Kiscribe ne se substitue
            en aucun cas au jugement clinique du professionnel de santé.
          </p>
          <p className="mt-2">
            La responsabilité d&apos;AC Scaling LTD est expressément limitée au montant des sommes versées
            par l&apos;utilisateur au cours des 3 derniers mois précédant le fait générateur du dommage.
            AC Scaling LTD ne saurait être tenu responsable de tout préjudice indirect, perte de données,
            perte d&apos;exploitation ou préjudice commercial.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">9. Données personnelles et de santé</h2>
          <p>
            Kiscribe ne stocke aucune donnée de santé sur ses serveurs. Le traitement des données
            personnelles est décrit dans notre{" "}
            <Link href="/legal/privacy" style={{ color: "var(--color-primary)" }}>politique de confidentialité</Link>.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">10. Droit applicable et litiges</h2>
          <p>
            Les présentes CGV sont soumises au droit français. En cas de litige, les parties s&apos;engagent
            à rechercher une solution amiable avant toute action judiciaire. À défaut d&apos;accord, le litige
            sera soumis aux tribunaux compétents de Paris.
          </p>
        </section>
      </div>
    </div>
  );
}
