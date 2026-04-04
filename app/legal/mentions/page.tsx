import Link from "next/link";

export const metadata = {
  title: "Mentions légales — Kiscribe",
};

export default function MentionsPage() {
  return (
    <div className="min-h-screen px-4 py-12 max-w-2xl mx-auto" style={{ backgroundColor: "var(--color-bg)" }}>
      <Link href="/" className="text-sm mb-8 inline-block" style={{ color: "var(--color-primary)" }}>
        ← Retour
      </Link>

      <h1 className="text-3xl mb-8" style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}>
        Mentions légales
      </h1>

      <div className="space-y-6 text-sm" style={{ color: "var(--color-text)", lineHeight: "1.8" }}>
        <p style={{ color: "var(--color-text-muted)" }}>Dernière mise à jour : avril 2026</p>

        <section>
          <h2 className="font-semibold text-base mb-2">Éditeur du service</h2>
          <p>
            <strong>AC Scaling LTD</strong><br />
            zh.k. Malinova Dolina, bl. 29, entr. B, fl. 8, apt. 49<br />
            1700 Sofia, Bulgarie<br />
            Numéro d&apos;immatriculation : 208059586<br />
            Email : <a href="mailto:contact@kiscribe.fr" style={{ color: "var(--color-primary)" }}>contact@kiscribe.fr</a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">Directeur de la publication</h2>
          <p>AC Scaling LTD, représentée par son dirigeant.</p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">Hébergement</h2>
          <p>
            <strong>Application web</strong> : Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, USA — <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)" }}>vercel.com</a><br />
            <strong>Base de données</strong> : Supabase Inc., hébergée dans la région Europe (eu-west-1) — <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)" }}>supabase.com</a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur Kiscribe (textes, interfaces, logotypes, architecture logicielle)
            est la propriété exclusive d&apos;AC Scaling LTD. Toute reproduction, représentation ou exploitation
            non autorisée constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">Médiation et règlement des litiges</h2>
          <p>
            Conformément aux dispositions du Code de la consommation relatives au règlement amiable des litiges,
            Kiscribe adhère au Service du Médiateur de la consommation. En cas de litige non résolu,
            vous pouvez recourir à la plateforme européenne de règlement en ligne des litiges :&nbsp;
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)" }}>
              ec.europa.eu/consumers/odr
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-base mb-2">Droit applicable</h2>
          <p>
            Les présentes mentions légales sont soumises au droit français. Tout litige relatif à leur
            interprétation ou leur exécution relève de la compétence exclusive des tribunaux français.
          </p>
        </section>
      </div>
    </div>
  );
}
