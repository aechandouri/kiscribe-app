"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Les données de mes patients sont-elles en sécurité ?",
    a: "Oui — et c'est la base du produit. Ta dictée est transcrite en temps réel et immédiatement supprimée. Aucun nom, aucun contenu de séance n'est stocké sur nos serveurs. L'architecture est stateless par design.",
  },
  {
    q: "Et si le code AMK généré est faux ?",
    a: "Tu valides toujours avant de signer. Kiscribe te propose le code, l'affiche avec sa justification clinique, et tu confirmes avant de copier la note. Tu gardes la main — on t'évite juste la recherche.",
  },
  {
    q: "C'est quoi une PWA ? Je dois télécharger quelque chose ?",
    a: "Non, rien à télécharger. Tu ouvres kiscribe.fr depuis ton téléphone, tu ajoutes l'icône sur ton écran d'accueil en un tap — et ça fonctionne comme une vraie app, même avec une connexion lente.",
  },
  {
    q: "Je dicte devant mon patient ? Ça ne va pas être bizarre ?",
    a: "Pas du tout — tu dictes après la séance, quand le patient est parti ou en salle d'attente. 45 secondes, une seule fois. La note SOAPIE est prête avant que le suivant arrive.",
  },
  {
    q: "L'Avenant 7 va encore changer. Les codes seront toujours à jour ?",
    a: "Oui. Les codes AMK sont mis à jour dès que la nomenclature évolue. C'est exactement pour ça que Kiscribe existe — pour ne pas te laisser seul face aux changements réglementaires.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ backgroundColor: "var(--color-section-alt)" }}>
      <div className="px-5 py-16 max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-primary)" }}>
            Questions fréquentes
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--color-text)",
              fontSize: "clamp(1.7rem, 6vw, 2rem)",
              lineHeight: "1.2",
            }}
          >
            Tu te poses sûrement ces questions.
          </h2>
        </div>

        <div className="space-y-2">
          {FAQS.map(({ q, a }, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: open === i ? "var(--shadow-sm)" : "var(--shadow-xs)",
              }}
            >
              <button
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                  {q}
                </span>
                <span
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: open === i ? "var(--color-primary)" : "var(--color-section-alt)",
                    color: open === i ? "white" : "var(--color-text-muted)",
                    transition: "background-color 200ms ease-out, color 200ms ease-out",
                  }}
                >
                  {open === i ? "−" : "+"}
                </span>
              </button>

              <div
                style={{
                  maxHeight: open === i ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 300ms ease-out",
                }}
              >
                <p
                  className="px-5 pb-5 text-sm"
                  style={{ color: "var(--color-text-muted)", lineHeight: "1.75" }}
                >
                  {a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
