import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur-sm border-b" style={{ borderColor: "var(--color-border)", backgroundColor: "rgba(250,250,248,0.92)" }}>
      <div className="flex items-center justify-between px-5 py-3.5 max-w-2xl mx-auto">
        <span
          className="text-xl tracking-tight"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-primary)" }}
        >
          Kiscribe
        </span>
        <Link
          href="/sign-in"
          className="nav-link text-sm font-medium px-4 py-2 rounded-lg cursor-pointer"
          style={{ color: "var(--color-text-muted)" }}
        >
          Se connecter
        </Link>
      </div>
    </nav>
  );
}
