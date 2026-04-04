import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-5 py-8" style={{ borderTop: "1px solid var(--color-border)" }}>
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
        <span className="text-base" style={{ fontFamily: "var(--font-serif)", color: "var(--color-primary)" }}>
          Kiscribe
        </span>
        <div className="flex gap-5 text-xs" style={{ color: "var(--color-text-muted)" }}>
          <Link href="/legal/cgu" className="hover:underline cursor-pointer transition-colors" style={{ transition: "color var(--transition-base)" }}>
            CGU
          </Link>
          <Link href="/legal/privacy" className="hover:underline cursor-pointer transition-colors">
            Politique de confidentialité
          </Link>
        </div>
        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          © 2026 Kiscribe · Fait en France 🇫🇷
        </p>
      </div>
    </footer>
  );
}
