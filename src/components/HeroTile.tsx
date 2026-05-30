"use client";

/**
 * HeroTile — large welcome card with learning streak
 *
 * Uses Framer Motion entrance animation (fade + translateY).
 * Hover effect uses spring physics on `scale` via `whileHover`.
 * transform-only animation → zero layout shift.
 */

import { motion } from "framer-motion";
import { Flame, Zap } from "lucide-react";
import { itemVariant } from "@/lib/animations";

const STREAK_DAYS = 12; // Would come from a user profile table in production

export default function HeroTile() {
  return (
    <motion.article
      variants={itemVariant}
      whileHover={{
        scale: 1.01,
        boxShadow: "0 0 25px rgba(99, 102, 241, 0.12)",
        borderColor: "rgba(99, 102, 241, 0.3)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative col-span-1 md:col-span-2 rounded-2xl overflow-hidden border border-[#1e2a3a] bg-[#0f1420] grain p-6 md:p-8 flex flex-col justify-between min-h-[180px]"
    >
      {/* Gradient mesh background — purely decorative, behind content */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(99,102,241,0.25) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(168,85,247,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative">
        <p className="text-slate-400 text-sm mb-1">Good morning 👋</p>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
          Welcome back, <span className="text-indigo-400">Alex</span>
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          You&apos;re on a roll. Keep the momentum going.
        </p>
      </div>

      {/* Streak indicator */}
      <div className="relative flex items-center gap-2 mt-4 self-start bg-[#1a1f30] border border-[#2d3f55] rounded-full px-4 py-2">
        <Flame size={16} className="text-orange-400" />
        <span className="text-sm font-semibold text-slate-200">
          {STREAK_DAYS}-day streak
        </span>
        <Zap size={14} className="text-yellow-400" />
      </div>
    </motion.article>
  );
}
