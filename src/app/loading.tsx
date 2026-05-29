/**
 * loading.tsx — Next.js App Router loading UI
 *
 * This file is automatically used as the Suspense fallback for the entire
 * route segment. It shows pulsing skeleton cards while any async Server
 * Component on this route (CoursesSection) is still fetching.
 */

import SkeletonCard from "@/components/SkeletonCard";
import BentoGrid from "@/components/BentoGrid";

export default function Loading() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar skeleton */}
      <div className="hidden md:block w-[220px] flex-shrink-0 bg-[#0f1420] border-r border-[#1e2a3a] animate-pulse" />

      <main className="flex-1 overflow-y-auto">
        <BentoGrid>
          {/* Hero skeleton */}
          <SkeletonCard wide />
          {/* Course skeletons */}
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          {/* Activity skeleton */}
          <SkeletonCard />
        </BentoGrid>
      </main>
    </div>
  );
}
