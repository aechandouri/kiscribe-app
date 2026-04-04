"use client";

import { RecorderState } from "@/types";

interface MicButtonProps {
  state: RecorderState | "processing";
  onClick: () => void;
  disabled?: boolean;
}

export function MicButton({ state, onClick, disabled }: MicButtonProps) {
  const isRecording = state === "recording";
  const isProcessing = state === "processing";

  const ariaLabel =
    state === "idle"
      ? "Démarrer l'enregistrement"
      : state === "recording"
        ? "Arrêter l'enregistrement"
        : state === "processing"
          ? "Traitement en cours…"
          : "Nouvelle dictée";

  return (
    <button
      onClick={onClick}
      disabled={disabled || isProcessing}
      aria-label={ariaLabel}
      className={[
        "relative flex items-center justify-center rounded-full transition-all duration-200",
        "w-20 h-20 min-w-[80px] min-h-[80px]", // 80px circle
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2",
        isRecording
          ? "bg-[var(--color-recording)] focus-visible:ring-[var(--color-recording)]/50 animate-pulse-mic"
          : isProcessing
            ? "bg-[var(--color-primary)]/40 cursor-not-allowed"
            : "bg-[var(--color-primary)] focus-visible:ring-[var(--color-primary)]/50 hover:bg-[var(--color-primary)]/90 active:scale-95",
        "shadow-lg",
      ].join(" ")}
    >
      {isProcessing ? (
        <Spinner />
      ) : isRecording ? (
        <StopIcon />
      ) : (
        <MicIcon />
      )}
    </button>
  );
}

function MicIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      className="w-8 h-8"
      aria-hidden="true"
    >
      <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4Z" />
      <path d="M19 10a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-3.08A7 7 0 0 0 19 10Z" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      className="w-8 h-8"
      aria-hidden="true"
    >
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="w-8 h-8 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z"
      />
    </svg>
  );
}
