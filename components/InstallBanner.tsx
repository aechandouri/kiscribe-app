"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "kiscribe_install_dismissed";
const VISIT_KEY = "kiscribe_visit_count";

export function InstallBanner() {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Ne rien afficher si déjà en mode standalone (PWA installée)
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    // Ne rien afficher si l'utilisateur a déjà dismissé
    if (localStorage.getItem(STORAGE_KEY)) return;

    // Détecter iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
    setIsIOS(ios);

    // Afficher uniquement à partir de la 2ème visite
    const visits = parseInt(localStorage.getItem(VISIT_KEY) ?? "0", 10) + 1;
    localStorage.setItem(VISIT_KEY, String(visits));

    if (visits >= 2) {
      setShow(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div
        className="rounded-xl p-4 shadow-xl border"
        style={{
          backgroundColor: "white",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/icon-192.png"
              alt="Kiscribe"
              className="w-12 h-12 rounded-xl shrink-0"
            />
            <div>
              <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>
                Installer Kiscribe
              </p>
              {isIOS ? (
                <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                  Appuie sur <strong>Partager</strong> puis{" "}
                  <strong>Sur l&apos;écran d&apos;accueil</strong>
                </p>
              ) : (
                <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                  Installe l&apos;app pour un accès rapide depuis ton téléphone
                </p>
              )}
            </div>
          </div>
          <button
            onClick={dismiss}
            className="text-xs shrink-0 pt-0.5"
            style={{ color: "var(--color-text-muted)" }}
            aria-label="Fermer"
          >
            Plus tard
          </button>
        </div>
      </div>
    </div>
  );
}
