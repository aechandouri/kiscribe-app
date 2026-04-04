interface AmkBadgeProps {
  code: string;
  justification: string;
}

export function AmkBadge({ code, justification }: AmkBadgeProps) {
  return (
    <div className="mt-4 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 p-4">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-[var(--color-accent)] px-3 py-1 text-sm font-semibold text-white">
          {code}
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-accent)]">
          Code AMK
        </span>
      </div>
      {justification && (
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">{justification}</p>
      )}
    </div>
  );
}
