"use client";

import { useCallback, useState } from "react";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { useGenerate } from "@/hooks/useGenerate";
import { MicButton } from "@/components/MicButton";
import { NoteCard } from "@/components/NoteCard";
import { CopyButton } from "@/components/CopyButton";
import type { SoapieNote, AmkSuggestion } from "@/types";

type PageState = "idle" | "recording" | "processing" | "result" | "error";

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function buildFormattedNote(note: SoapieNote, amk: AmkSuggestion): string {
  const date = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });
  return `[Kiscribe] Note de séance — ${date}

S — Subjectif
${note.subjective}

O — Objectif
${note.objective}

A — Analyse
${note.analysis}

P — Plan
${note.plan}

I — Intervention
${note.intervention}

E — Évaluation
${note.evaluation}

Code AMK : ${amk.code}${amk.justification ? ` — ${amk.justification}` : ""}`;
}

export default function DashboardPage() {
  const recorder = useAudioRecorder();
  const generator = useGenerate();

  // Editable local copy of the note
  const [editedNote, setEditedNote] = useState<SoapieNote | null>(null);
  const [editedAmk, setEditedAmk] = useState<AmkSuggestion | null>(null);

  const pageState: PageState = (() => {
    if (recorder.state === "recording") return "recording";
    if (generator.state === "transcribing" || generator.state === "generating") return "processing";
    if (generator.state === "done" && generator.result) return "result";
    if (generator.state === "error" || recorder.error) return "error";
    return "idle";
  })();

  const handleMicClick = useCallback(() => {
    if (pageState === "idle" || pageState === "error") {
      generator.reset();
      recorder.reset();
      setEditedNote(null);
      setEditedAmk(null);
      recorder.startRecording((blob) => {
        generator.generate(blob).then(() => {
          // Sync editable state once result is ready — handled below via generator.result
        });
      });
    } else if (pageState === "recording") {
      recorder.stopRecording();
    }
  }, [pageState, recorder, generator]);

  const handleNewNote = useCallback(() => {
    generator.reset();
    recorder.reset();
    setEditedNote(null);
    setEditedAmk(null);
  }, [generator, recorder]);

  const handleNoteChange = useCallback((note: SoapieNote, amk: AmkSuggestion) => {
    setEditedNote(note);
    setEditedAmk(amk);
  }, []);

  const error = recorder.error ?? generator.error;

  // Sync editable state from generator result when not yet manually edited
  const displayNote = editedNote ?? generator.result?.note ?? null;
  const displayAmk  = editedAmk  ?? generator.result?.amk  ?? null;

  const formattedText = displayNote && displayAmk
    ? buildFormattedNote(displayNote, displayAmk)
    : generator.result?.formatted ?? "";

  return (
    <div
      className="flex flex-col min-h-[calc(100dvh-64px)] px-4 py-6 max-w-lg mx-auto"
      style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
    >
      {/* Header */}
      <div className="mb-6 text-center">
        <h1
          className="text-2xl font-medium"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}
        >
          Nouvelle dictée
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
          {pageState === "idle"       && "Appuie sur le micro pour commencer"}
          {pageState === "recording"  && "En écoute… Parle naturellement"}
          {pageState === "processing" && (generator.state === "transcribing" ? "Transcription…" : "Génération de la note…")}
          {pageState === "result"     && "Note générée — vérifie et modifie si besoin"}
          {pageState === "error"      && "Une erreur est survenue"}
        </p>
      </div>

      {/* Mic zone */}
      {(pageState === "idle" || pageState === "recording" || pageState === "error") && (
        <div className="flex flex-col items-center gap-4 mb-8">
          <MicButton
            state={pageState === "error" ? "idle" : (pageState as "idle" | "recording")}
            onClick={handleMicClick}
          />
          {pageState === "recording" && (
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--color-recording)" }}
              />
              <span className="text-sm font-mono" style={{ color: "var(--color-recording)" }}>
                {formatDuration(recorder.duration)}
              </span>
            </div>
          )}
          {pageState === "error" && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 text-center max-w-xs">
              {error}
            </div>
          )}
        </div>
      )}

      {/* Processing */}
      {pageState === "processing" && (
        <div className="flex flex-col items-center gap-4 mb-8">
          <MicButton state="processing" onClick={() => {}} disabled />
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            {generator.state === "transcribing" ? "Transcription de l'audio…" : "Rédaction de la note SOAPIE…"}
          </p>
        </div>
      )}

      {/* Result */}
      {pageState === "result" && displayNote && displayAmk && (
        <div className="flex flex-col gap-4">
          <NoteCard
            note={displayNote}
            amk={displayAmk}
            onChange={handleNoteChange}
          />
          <CopyButton text={formattedText} />
          <button
            onClick={handleNewNote}
            className="w-full rounded-xl py-3 px-4 text-sm font-medium border transition-colors"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
          >
            Nouvelle dictée
          </button>
        </div>
      )}
    </div>
  );
}
