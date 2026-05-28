"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        Something went wrong: {error.message}
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 rounded-lg text-sm"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        Try again
      </button>
    </div>
  );
}