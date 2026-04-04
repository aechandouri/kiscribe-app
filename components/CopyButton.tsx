"use client";

import { useState } from "react";

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback for older browsers / iOS PWA
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={[
        "w-full rounded-xl py-3.5 px-4 text-sm font-semibold transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2",
        copied
          ? "bg-green-600 text-white focus-visible:ring-green-600/50"
          : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 active:scale-[0.98] focus-visible:ring-[var(--color-primary)]/50",
      ].join(" ")}
    >
      {copied ? "Copié ✓" : "Copier la note"}
    </button>
  );
}
