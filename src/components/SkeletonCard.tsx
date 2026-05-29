/**
 * SkeletonCard — pulsing placeholder shown while Supabase data loads
 *
 * Uses Tailwind `animate-pulse` for the shimmer effect.
 * Rendered by loading.tsx (the Next.js loading UI / Suspense fallback).
 */

export default function SkeletonCard({
  wide = false,
}: {
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#1e2a3a] bg-[#0f1420] p-5 animate-pulse ${
        wide ? "col-span-2" : ""
      }`}
    >
      {/* Icon placeholder */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-white/5" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-3 bg-white/5 rounded w-3/4" />
          <div className="h-3 bg-white/5 rounded w-1/2" />
        </div>
      </div>
      {/* Progress bar placeholder */}
      <div className="space-y-1.5">
        <div className="h-2 bg-white/5 rounded w-full" />
        <div className="h-1.5 bg-white/5 rounded-full w-full" />
      </div>
    </div>
  );
}
