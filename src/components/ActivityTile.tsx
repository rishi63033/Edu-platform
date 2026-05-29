"use client";

/**
 * ActivityTile — mock GitHub-style contribution graph
 *
 * Generates 16 weeks × 7 days = 112 cells with random activity levels.
 * Each cell fades in with a staggered Framer Motion animation.
 * No real data fetching — this would connect to a learning_events table
 * in a production app.
 */

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { itemVariant } from "@/lib/animations";

// Activity level → Tailwind background color
const LEVEL_COLORS = [
  "bg-white/5",           // 0 — empty
  "bg-indigo-900/60",     // 1 — low
  "bg-indigo-700/70",     // 2 — medium
  "bg-indigo-500/80",     // 3 — high
  "bg-indigo-400",        // 4 — very high
];

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function ActivityTile() {
  const WEEKS = 16;
  const DAYS = 7;

  const grid = useMemo(() => {
    return Array.from({ length: WEEKS }, (_, w) =>
      Array.from({ length: DAYS }, (_, d) => {
        const rand = seededRandom(w * 7 + d);
        if (rand < 0.35) return 0;
        if (rand < 0.55) return 1;
        if (rand < 0.75) return 2;
        if (rand < 0.9) return 3;
        return 4;
      })
    );
  }, []);

  const totalActive = grid.flat().filter((v) => v > 0).length;

  return (
    <motion.article
      variants={itemVariant}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 25px rgba(99, 102, 241, 0.12)",
        borderColor: "rgba(99, 102, 241, 0.3)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative rounded-2xl overflow-hidden border border-[#1e2a3a] bg-[#0f1420] grain p-5 col-span-1 md:col-span-2 lg:col-span-1"
    >
      {/* Distinct Abstract Mesh: Cyan/Indigo bottom-glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 120%, rgba(34,211,238,0.15) 0%, transparent 60%), radial-gradient(circle at 100% 0%, rgba(99,102,241,0.05) 0%, transparent 40%)",
        }}
      />

      <header className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-indigo-400" />
          <h2 className="text-sm font-semibold text-slate-200">
            Learning Activity
          </h2>
        </div>
        <span className="text-xs text-slate-500">{totalActive} active days</span>
      </header>

      {/* Contribution grid */}
      <div className="relative flex gap-1 overflow-x-auto pb-1">
        {grid.map((week, w) => (
          <div key={w} className="flex flex-col gap-1">
            {week.map((level, d) => (
              <motion.div
                key={d}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: (w * DAYS + d) * 0.004,
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
                className={`w-3 h-3 rounded-sm ${LEVEL_COLORS[level]}`}
                title={`Week ${w + 1}, Day ${d + 1}: level ${level}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="relative flex items-center gap-1.5 mt-3 justify-end">
        <span className="text-[10px] text-slate-600">Less</span>
        {LEVEL_COLORS.map((cls, i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-sm ${cls}`} />
        ))}
        <span className="text-[10px] text-slate-600">More</span>
      </div>
    </motion.article>
  );
}
