"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { InstallBanner } from "@/components/InstallBanner";
import { TrialBanner } from "@/components/TrialBanner";
import { UserButton } from "@clerk/nextjs";

interface SubData {
  subscription_status: string;
  trial_ends_at: string | null;
  daysLeft: number | null;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sub, setSub] = useState<SubData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/subscription")
      .then((r) => r.json())
      .then((data) => {
        setSub(data);
        const blocked = ["canceled", "incomplete_expired"];
        if (blocked.includes(data.subscription_status) && pathname !== "/dashboard/paywall") {
          window.location.href = "/dashboard/paywall";
        }
      })
      .catch(() => {});
  }, [pathname]);

  const handlePortal = async () => {
    setMenuOpen(false);
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-bg)" }}>
      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-4 py-3 border-b sticky top-0 z-40"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
      >
        <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--color-primary)", fontWeight: 500 }}>
          Kiscribe
        </span>

        <div className="flex items-center gap-3">
          <UserButton />
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-2 rounded-lg"
              style={{ color: "var(--color-text-muted)", backgroundColor: menuOpen ? "var(--color-section-alt)" : "transparent" }}
              aria-label="Menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <div
                  className="absolute right-0 top-10 z-50 w-52 rounded-xl py-1 overflow-hidden"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "var(--shadow-lg)",
                  }}
                >
                  <div className="px-4 py-2.5 border-b" style={{ borderColor: "var(--color-border)" }}>
                    <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                      Mon compte
                    </div>
                    {sub && (
                      <div className="text-xs mt-0.5" style={{ color: "var(--color-primary)" }}>
                        {sub.subscription_status === "trialing" && sub.daysLeft !== null
                          ? `Essai — ${sub.daysLeft}j restants`
                          : sub.subscription_status === "active"
                          ? "Abonnement actif"
                          : sub.subscription_status === "past_due"
                          ? "Paiement en attente"
                          : "Essai terminé"}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handlePortal}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left"
                    style={{ color: "var(--color-text)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-section-alt)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                    Gérer mon abonnement
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {sub && (
        <TrialBanner daysLeft={sub.daysLeft} status={sub.subscription_status} />
      )}

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <InstallBanner />
    </div>
  );
}
