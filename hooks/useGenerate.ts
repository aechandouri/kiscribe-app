"use client";

import { useState, useCallback } from "react";
import { GenerateState, GenerateResult } from "@/types";

interface UseGenerateReturn {
  state: GenerateState;
  result: GenerateResult | null;
  error: string | null;
  generate: (audioBlob: Blob) => Promise<void>;
  reset: () => void;
}

export function useGenerate(): UseGenerateReturn {
  const [state, setState] = useState<GenerateState>("idle");
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (audioBlob: Blob) => {
    setState("transcribing");
    setError(null);
    setResult(null);

    // Step 1 — Transcription Groq Whisper
    let transcript: string;
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "audio.webm");

      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const { error: msg } = await res.json().catch(() => ({ error: "Erreur de transcription" }));
        if (res.status === 429) {
          throw new Error("Trop de requêtes. Réessaie dans quelques secondes.");
        }
        throw new Error(msg ?? "Erreur de transcription");
      }

      const { transcript: t } = await res.json();
      transcript = t;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Impossible de transcrire l'audio.";
      setState("error");
      setError(msg);
      return;
    }

    // Step 2 — Génération SOAPIE + AMK
    setState("generating");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });

      if (!res.ok) {
        const { error: msg, checkoutUrl } = await res.json().catch(() => ({ error: "Erreur de génération" }));
        if (res.status === 402) {
          // Subscription required
          window.location.href = checkoutUrl ?? "/dashboard";
          return;
        }
        throw new Error(msg ?? "Erreur de génération");
      }

      const data: GenerateResult = await res.json();
      setResult(data);
      setState("done");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Impossible de générer la note SOAPIE.";
      setState("error");
      setError(msg);
    }
  }, []);

  const reset = useCallback(() => {
    setState("idle");
    setResult(null);
    setError(null);
  }, []);

  return { state, result, error, generate, reset };
}
