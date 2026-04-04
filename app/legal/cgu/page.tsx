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

      <h1 className="text-3xl mb-8" style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}>
        Conditions Générales d&apos;Utilisation
      </h1>

      <div className="space-y-6 text-sm" style={{ color: "var(--color-text)", lineHeight: "1.8" }}>
        <p style={{ color: "var(--color-text-muted)" }}>Dernière mise à jour : avril 2026</p>

        <section>
          <h2 className="font-semibold text-base mb-2">1. Objet</h2>
          <p>
            Kiscribe est un service d&apos;assistance à la rédaction de notes cliniques destiné exclusivement
            aux kinésithérapeutes libéraux exerçant en France. Il utilise l&apos;intelligence artificielle
            pour transcrire des dictées vocales et les structurer en notes au format SOAPIE avec
            suggestions de codes AMK selon la nomenclature NGAP (Avenant 7, juillet 2025).
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">2. Avertissement clinique — à lire impérativement</h2>
          <div
            className="rounded-xl p-4 my-2"
            style={{ backgroundColor: "var(--color-accent-bg)", border: "1px solid rgba(196,169,106,0.3)" }}
          >
            <p>
              <strong>Kiscribe est un outil d&apos;aide à la rédaction, pas un dispositif médical.</strong>
              Les notes et codes AMK générés sont des propositions automatiques qui doivent impérativement
              être vérifiées, corrigées et validées par le praticien avant tout usage clinique, administratif
              ou de facturation auprès de l&apos;Assurance Maladie.
            </p>
            <p className="mt-2">
              Le kinésithérapeute reste seul responsable du contenu de ses notes de séance,
              de l&apos;exactitude de sa facturation et de la conformité de sa pratique aux obligations
              légales et déontologiques. Kiscribe ne se substitue pas au jugement clinique du praticien.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">3. Accès au service et conditions d&apos;utilisation</h2>
          <p>
            L&apos;accès est réservé aux professionnels de santé (kinésithérapeutes, masseurs-kinésithérapeutes)
            titulaires d&apos;un numéro RPPS valide et exerçant légalement en France.
            L&apos;utilisateur s&apos;engage à :
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Ne dicter que des informations relatives à ses propres patients dans le cadre de son exercice professionnel</li>
            <li>Ne pas dicter en présence du patient sans son information préalable</li>
            <li>Vérifier systématiquement les notes et codes AMK générés avant tout usage</li>
            <li>Ne pas utiliser Kiscribe à des fins autres que la rédaction de notes de séance</li>
            <li>Ne pas partager ses identifiants d&apos;accès</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">4. Données de santé et architecture technique</h2>
          <p>
            Kiscribe est conçu selon un principe de <strong>traitement transient</strong> :
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>L&apos;audio enregistré est transmis chiffré (HTTPS/TLS) au service de transcription (Groq) et <strong>immédiatement supprimé</strong> après transcription — aucun fichier audio n&apos;est conservé</li>
            <li>La transcription textuelle est transmise à Anthropic pour structuration et <strong>immédiatement supprimée</strong> après génération de la note</li>
            <li>La note générée est renvoyée à l&apos;utilisateur <strong>sans être stockée</strong> sur les serveurs de Kiscribe</li>
            <li>L&apos;utilisateur reste seul responsable du stockage sécurisé de ses notes dans son propre logiciel de gestion (Doctolib, Topaze, Oscarenova, etc.)</li>
          </ul>
          <p className="mt-2">
            Groq Inc. et Anthropic PBC déclarent contractuellement ne pas utiliser les données transmises
            pour entraîner leurs modèles (zero-data-retention policy). Ces engagements sont disponibles
            dans leurs politiques de confidentialité respectives.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">5. Qualification RGPD</h2>
          <p>
            Dans le cadre de l&apos;utilisation de Kiscribe, le kinésithérapeute agit en qualité de
            <strong> responsable de traitement</strong> au sens du RGPD pour les données de santé
            de ses patients. AC Scaling LTD intervient en qualité de <strong>sous-traitant transient</strong>
            — le traitement s&apos;effectuant en mémoire vive sans persistance. Aucun accord de sous-traitance
            au sens de l&apos;article 28 RGPD n&apos;est requis dès lors qu&apos;aucune donnée de santé n&apos;est stockée.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">6. Propriété des notes générées</h2>
          <p>
            Les notes SOAPIE générées par Kiscribe à partir des dictées de l&apos;utilisateur appartiennent
            intégralement à l&apos;utilisateur. Kiscribe ne revendique aucun droit sur le contenu des notes produites.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">7. Abonnement</h2>
          <p>
            Les conditions commerciales (tarifs, résiliation, remboursement) sont détaillées dans les{" "}
            <Link href="/legal/cgv" style={{ color: "var(--color-primary)" }}>Conditions Générales de Vente</Link>.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">8. Limitation de responsabilité</h2>
          <p>
            AC Scaling LTD ne peut être tenu responsable de :
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Toute erreur dans les notes ou codes AMK générés</li>
            <li>Tout préjudice résultant d&apos;une utilisation sans validation du praticien</li>
            <li>Tout rejet ou litige de facturation avec l&apos;Assurance Maladie</li>
            <li>Toute indisponibilité temporaire du service</li>
            <li>Tout préjudice lié aux services tiers (Groq, Anthropic, Clerk, Stripe)</li>
          </ul>
          <p className="mt-2">
            La responsabilité totale d&apos;AC Scaling LTD est limitée au montant des sommes effectivement
            versées par l&apos;utilisateur au cours des 3 derniers mois précédant le fait générateur.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">9. Modification des CGU</h2>
          <p>
            AC Scaling LTD se réserve le droit de modifier les présentes CGU. Toute modification
            substantielle sera notifiée par email avec un préavis de 30 jours. La poursuite de
            l&apos;utilisation du service après ce délai vaut acceptation des nouvelles CGU.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">10. Droit applicable</h2>
          <p>
            Les présentes CGU sont soumises au droit français. Tout litige relève de la compétence
            exclusive des tribunaux de Paris.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">11. Contact</h2>
          <p>
            AC Scaling LTD — <a href="mailto:contact@kiscribe.fr" style={{ color: "var(--color-primary)" }}>contact@kiscribe.fr</a>
          </p>
        </section>
      </div>
    </div>
  );
}
