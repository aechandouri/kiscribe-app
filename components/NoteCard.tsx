"use client";

import { useState, useCallback } from "react";
import { SoapieNote, AmkSuggestion } from "@/types";

interface NoteCardProps {
  note: SoapieNote;
  amk: AmkSuggestion;
  onChange?: (note: SoapieNote, amk: AmkSuggestion) => void;
}

const SOAPIE_SECTIONS: { key: keyof SoapieNote; label: string; letter: string }[] = [
  { key: "subjective",   label: "Subjectif",    letter: "S" },
  { key: "objective",    label: "Objectif",      letter: "O" },
  { key: "analysis",     label: "Analyse",       letter: "A" },
  { key: "plan",         label: "Plan",          letter: "P" },
  { key: "intervention", label: "Intervention",  letter: "I" },
  { key: "evaluation",   label: "Évaluation",    letter: "E" },
];

const VALID_AMK = ["AMK 7.5", "AMK 14", "AMK 14 + IFN", "BDK", "IFN", "IFD"];

export function NoteCard({ note, amk, onChange }: NoteCardProps) {
  const [editingKey, setEditingKey] = useState<keyof SoapieNote | "amk_code" | "amk_justification" | null>(null);
  const [localNote, setLocalNote] = useState<SoapieNote>(note);
  const [localAmk, setLocalAmk] = useState<AmkSuggestion>(amk);

  const handleNoteChange = useCallback((key: keyof SoapieNote, value: string) => {
    const updated = { ...localNote, [key]: value };
    setLocalNote(updated);
    onChange?.(updated, localAmk);
  }, [localNote, localAmk, onChange]);

  const handleAmkChange = useCallback((field: "code" | "justification", value: string) => {
    const updated = { ...localAmk, [field]: value };
    setLocalAmk(updated);
    onChange?.(localNote, updated);
  }, [localNote, localAmk, onChange]);

  const handleBlur = useCallback(() => {
    setEditingKey(null);
  }, []);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-section-alt)" }}
      >
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-primary)" }}>
          Note SOAPIE
        </span>
        <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          Appuie sur une section pour modifier
        </span>
      </div>

      {/* SOAPIE sections */}
      <div>
        {SOAPIE_SECTIONS.map(({ key, label, letter }, i) => {
          const isEditing = editingKey === key;
          const isEmpty = !localNote[key];

          return (
            <div
              key={key}
              className="px-4 py-3"
              style={{
                borderBottom: i < SOAPIE_SECTIONS.length - 1 ? "1px solid var(--color-border)" : "none",
                backgroundColor: isEditing ? "rgba(92,122,95,0.04)" : "transparent",
                transition: "background-color 150ms ease",
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-xs font-bold w-4 shrink-0"
                  style={{ color: "var(--color-primary)" }}
                >
                  {letter}
                </span>
                <span
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--color-primary)" }}
                >
                  {label}
                </span>
                {!isEditing && (
                  <button
                    onClick={() => setEditingKey(key)}
                    className="ml-auto shrink-0 text-xs px-2 py-0.5 rounded-md"
                    style={{
                      color: "var(--color-text-muted)",
                      backgroundColor: "var(--color-section-alt)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    Modifier
                  </button>
                )}
                {isEditing && (
                  <button
                    onClick={handleBlur}
                    className="ml-auto shrink-0 text-xs px-2 py-0.5 rounded-md font-semibold"
                    style={{
                      color: "white",
                      backgroundColor: "var(--color-primary)",
                    }}
                  >
                    OK ✓
                  </button>
                )}
              </div>

              {isEditing ? (
                <textarea
                  autoFocus
                  value={localNote[key]}
                  onChange={(e) => handleNoteChange(key, e.target.value)}
                  className="w-full text-sm leading-relaxed pl-6 resize-none rounded-lg p-2"
                  style={{
                    color: "var(--color-text)",
                    backgroundColor: "rgba(255,255,255,0.9)",
                    border: "1.5px solid var(--color-primary)",
                    minHeight: "80px",
                    outline: "none",
                    fontFamily: "var(--font-sans)",
                  }}
                  rows={Math.max(3, localNote[key].split("\n").length)}
                />
              ) : (
                <p
                  className="text-sm leading-relaxed pl-6 cursor-text"
                  style={{
                    color: isEmpty ? "var(--color-text-muted)" : "var(--color-text)",
                    fontStyle: isEmpty ? "italic" : "normal",
                  }}
                  onClick={() => setEditingKey(key)}
                >
                  {localNote[key] || "Vide — appuie pour ajouter"}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* AMK */}
      <div
        className="mx-4 my-3 rounded-xl p-3"
        style={{
          background: "linear-gradient(135deg, var(--color-accent-bg) 0%, rgba(255,255,255,0.8) 100%)",
          border: "1px solid rgba(196,169,106,0.3)",
        }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          {editingKey === "amk_code" ? (
            <select
              autoFocus
              value={localAmk.code}
              onChange={(e) => handleAmkChange("code", e.target.value)}
              onBlur={() => setEditingKey(null)}
              className="text-xs font-bold rounded-full px-2.5 py-0.5 text-white border-0"
              style={{ backgroundColor: "var(--color-accent)", outline: "none" }}
            >
              {VALID_AMK.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          ) : (
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white cursor-pointer"
              style={{ backgroundColor: "var(--color-accent)" }}
              onClick={() => setEditingKey("amk_code")}
              title="Modifier le code"
            >
              {localAmk.code}
            </span>
          )}
          <span className="text-xs font-medium" style={{ color: "var(--color-accent)" }}>
            Code AMK
          </span>
          {editingKey !== "amk_justification" && (
            <button
              onClick={() => setEditingKey("amk_justification")}
              className="ml-auto text-xs px-2 py-0.5 rounded-md"
              style={{
                color: "var(--color-text-muted)",
                backgroundColor: "white",
                border: "1px solid var(--color-border)",
              }}
            >
              Modifier
            </button>
          )}
          {editingKey === "amk_justification" && (
            <button
              onClick={() => setEditingKey(null)}
              className="ml-auto text-xs px-2 py-0.5 rounded-md font-semibold"
              style={{ color: "white", backgroundColor: "var(--color-primary)" }}
            >
              OK ✓
            </button>
          )}
        </div>

        {editingKey === "amk_justification" ? (
          <textarea
            autoFocus
            value={localAmk.justification}
            onChange={(e) => handleAmkChange("justification", e.target.value)}
            className="w-full text-xs leading-relaxed resize-none rounded-lg p-2 mt-1"
            style={{
              color: "var(--color-text-muted)",
              backgroundColor: "rgba(255,255,255,0.9)",
              border: "1.5px solid var(--color-accent)",
              outline: "none",
              fontFamily: "var(--font-sans)",
            }}
            rows={2}
          />
        ) : (
          <p
            className="text-xs leading-relaxed cursor-text"
            style={{ color: "var(--color-text-muted)" }}
            onClick={() => setEditingKey("amk_justification")}
          >
            {localAmk.justification || "Aucune justification"}
          </p>
        )}
      </div>
    </div>
  );
}
