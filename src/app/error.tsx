"use client";

/**
 * error.tsx — Next.js App Router error boundary
 *
 * Must be a Client Component (Next.js requirement for error files).
 * Catches any unhandled errors thrown during rendering or data fetching
 * in this route segment.
 */

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center bg-[#080b12]">
      <div className="flex flex-col items-center gap-4 max-w-sm text-center p-8 rounded-2xl border border-red-900/40 bg-red-950/10">
        <AlertTriangle size={32} className="text-red-400" />
        <h2 className="text-lg font-semibold text-slate-200">
          Something went wrong
        </h2>
        <p className="text-sm text-slate-500">{error.message}</p>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-sm hover:bg-indigo-600/30 transition-colors"
        >
          <RefreshCw size={14} />
          Try again
        </button>
      </div>
    </div>
  );
}
