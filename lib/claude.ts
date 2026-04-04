import Anthropic from "@anthropic-ai/sdk";
import { SOAPIE_SYSTEM_PROMPT } from "@/lib/prompts/soapie-prompt";
import { validateAndCleanNote } from "@/lib/note-validator";
import type { GenerateResult } from "@/types";

let _client: Anthropic | null = null;

function getAnthropicClient(): Anthropic {
  if (!_client) {
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _client;
}

const FALLBACK_RESULT: GenerateResult = {
  note: {
    subjective: "Non renseigné",
    objective: "Non renseigné",
    analysis: "Non renseigné",
    plan: "Non renseigné",
    intervention: "Non renseigné",
    evaluation: "Non renseigné",
  },
  amk: {
    code: "AMK 7.5",
    justification: "Code par défaut — la transcription n'a pas pu être analysée correctement.",
  },
  formatted: "",
};

export async function generateSoapie(transcript: string): Promise<GenerateResult> {
  const client = getAnthropicClient();

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system: SOAPIE_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: transcript,
      },
    ],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    return FALLBACK_RESULT;
  }

  let parsed: {
    subjective?: string;
    objective?: string;
    analysis?: string;
    plan?: string;
    intervention?: string;
    evaluation?: string;
    amk_code?: string;
    amk_justification?: string;
  };

  try {
    // Strip potential markdown code fences
    const raw = textBlock.text.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim();
    parsed = JSON.parse(raw);
  } catch {
    console.error("Failed to parse Claude response:", textBlock.text);
    return FALLBACK_RESULT;
  }

  const rawNote = {
    subjective:   parsed.subjective   ?? "",
    objective:    parsed.objective    ?? "",
    analysis:     parsed.analysis     ?? "",
    plan:         parsed.plan         ?? "",
    intervention: parsed.intervention ?? "",
    evaluation:   parsed.evaluation   ?? "",
  };

  // Validation déterministe : AMK, méta-commentaires, orthographe
  const { note, amk } = validateAndCleanNote(
    rawNote,
    parsed.amk_code ?? "AMK 7.5",
    parsed.amk_justification ?? "",
    transcript
  );

  const date = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formatted = `[Kiscribe] Note de séance — ${date}

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

Code AMK : ${amk.code} — ${amk.justification}`;

  return { note, amk, formatted };
}
