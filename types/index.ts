export type RecorderState = "idle" | "recording" | "stopped";
export type GenerateState = "idle" | "transcribing" | "generating" | "done" | "error";

export interface SoapieNote {
  subjective: string;
  objective: string;
  analysis: string;
  plan: string;
  intervention: string;
  evaluation: string;
}

export interface AmkSuggestion {
  code: string;
  justification: string;
}

export interface GenerateResult {
  note: SoapieNote;
  amk: AmkSuggestion;
  formatted: string;
}
