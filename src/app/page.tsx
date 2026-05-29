import { Suspense } from "react";
import Sidebar from "@/components/Sidebar";
import BentoGrid from "@/components/BentoGrid";
import HeroTile from "@/components/HeroTile";
import ActivityTile from "@/components/ActivityTile";
import CoursesSection from "@/components/CoursesSection";
import SkeletonCard from "@/components/SkeletonCard";
import MobileNav from "@/components/MobileNav";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <BentoGrid>
          {/* Hero tile spans full width */}
          <HeroTile />

          {/* Suspense shows skeletons while Supabase responds */}
          <Suspense
            fallback={
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            }
          >
            <CoursesSection />
          </Suspense>

          {/* Activity graph */}
          <ActivityTile />
        </BentoGrid>
      </main>

      <MobileNav />
    </div>
  );
}

