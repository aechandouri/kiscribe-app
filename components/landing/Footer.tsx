import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-5 py-10" style={{ borderTop: "1px solid var(--color-border)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div>
            <span className="text-lg block mb-2" style={{ fontFamily: "var(--font-serif)", color: "var(--color-primary)" }}>
              Kiscribe
            </span>
            <p className="text-xs max-w-xs" style={{ color: "var(--color-text-muted)", lineHeight: 1.7 }}>
              Outil d&apos;aide à la rédaction de notes SOAPIE pour kinésithérapeutes libéraux.
              Toute note générée doit être vérifiée et validée par le praticien.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>Légal</div>
              <div className="flex flex-col gap-2 text-xs" style={{ color: "var(--color-text-muted)" }}>
                <Link href="/legal/mentions" className="hover:underline">Mentions légales</Link>
                <Link href="/legal/cgu" className="hover:underline">CGU</Link>
                <Link href="/legal/cgv" className="hover:underline">CGV</Link>
                <Link href="/legal/privacy" className="hover:underline">Confidentialité</Link>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>Contact</div>
              <div className="flex flex-col gap-2 text-xs" style={{ color: "var(--color-text-muted)" }}>
                <a href="mailto:contact@kiscribe.fr" className="hover:underline">contact@kiscribe.fr</a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-2 pt-6 text-xs"
          style={{ borderTop: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}
        >
          <p>© 2026 AC Scaling LTD — Tous droits réservés</p>
          <p>Outil d&apos;aide à la rédaction · Non certifié dispositif médical · Réservé aux professionnels de santé</p>
        </div>
      </div>
    </footer>
  );
}
