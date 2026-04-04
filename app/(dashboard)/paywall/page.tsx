"use client";

import { useState } from "react";

export default function PaywallPage() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5" style={{ backgroundColor: "var(--color-bg)" }}>
      <div
        className="w-full max-w-sm rounded-2xl p-8 text-center"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        {/* Logo */}
        <div className="mb-6">
          <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "var(--color-primary)", fontWeight: 500 }}>
            Kiscribe
          </span>
        </div>

        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: "var(--color-accent-bg)", border: "1px solid rgba(196,169,106,0.3)" }}
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="var(--color-accent)" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>

        <h1 className="mb-2" style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--color-text)", lineHeight: 1.2 }}>
          Ton essai est terminé
        </h1>
        <p className="mb-7 text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
          Active ton abonnement pour continuer à générer tes notes SOAPIE et codes AMK.
        </p>

        {/* Price */}
        <div className="mb-6 py-4 rounded-xl" style={{ backgroundColor: "var(--color-section-alt)", border: "1px solid var(--color-border)" }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "2.2rem", color: "var(--color-text)", letterSpacing: "-0.03em", lineHeight: 1 }}>
            49€
          </div>
          <div className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>par mois · sans engagement</div>
          <div className="text-xs mt-2 font-medium" style={{ color: "var(--color-primary)" }}>
            = 1 patient remboursé par mois
          </div>
        </div>

        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full rounded-xl py-4 font-semibold text-white text-base cta-btn"
          style={{
            backgroundColor: "var(--color-primary)",
            boxShadow: "var(--shadow-primary)",
            opacity: loading ? 0.75 : 1,
          }}
        >
          {loading ? "Redirection…" : "Activer mon abonnement"}
        </button>

        <p className="mt-3 text-xs" style={{ color: "var(--color-text-muted)" }}>
          Paiement sécurisé · Annulable à tout moment
        </p>
      </div>
    </div>
  );
}
