"use client";

import { useState } from "react";

interface TrialBannerProps {
  daysLeft: number | null;
  status: string;
}

export function TrialBanner({ daysLeft, status }: TrialBannerProps) {
  const [loading, setLoading] = useState(false);

  const isPastDue = status === "past_due";
  const isTrialEndingSoon = status === "trialing" && daysLeft !== null && daysLeft <= 3;

  if (!isPastDue && !isTrialEndingSoon) return null;

  const handleManageBilling = async () => {
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
    <div
      className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
      style={{
        backgroundColor: isPastDue ? "var(--color-error-bg)" : "var(--color-accent-bg)",
        borderBottom: `1px solid ${isPastDue ? "rgba(224,85,85,0.2)" : "rgba(196,169,106,0.2)"}`,
      }}
    >
      <span style={{ color: isPastDue ? "#B91C1C" : "var(--color-accent)" }}>
        {isPastDue
          ? "Paiement échoué — ton accès sera suspendu sous peu."
          : `Ton essai se termine dans ${daysLeft} jour${daysLeft === 1 ? "" : "s"}.`}
      </span>
      <button
        onClick={handleManageBilling}
        disabled={loading}
        className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold"
        style={{
          backgroundColor: isPastDue ? "#B91C1C" : "var(--color-accent)",
          color: "white",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "…" : isPastDue ? "Mettre à jour" : "Ajouter une carte"}
      </button>
    </div>
  );
}
