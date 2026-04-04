import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4" style={{ backgroundColor: "var(--color-bg)" }}>
      <SignUp />
      <p className="text-xs text-center max-w-xs" style={{ color: "var(--color-text-muted)" }}>
        En créant un compte, vous acceptez nos{" "}
        <Link href="/legal/cgu" className="underline" style={{ color: "var(--color-primary)" }}>CGU</Link>
        {" "}et notre{" "}
        <Link href="/legal/privacy" className="underline" style={{ color: "var(--color-primary)" }}>politique de confidentialité</Link>.
        {" "}Réservé aux kinésithérapeutes libéraux exerçant en France.
      </p>
    </div>
  );
}
