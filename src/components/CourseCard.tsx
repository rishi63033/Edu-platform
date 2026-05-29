"use client";

/**
 * CourseCard — Client Component
 *
 * Key implementation details:
 *  1. Dynamic icon: We import the entire lucide-react icon map and look up the
 *     icon by `icon_name` string from the database. This avoids hardcoding icons.
 *  2. Animated progress bar: useEffect + setTimeout gives the bar a 0→value
 *     animation after mount. We animate `width` via CSS transition, not Framer
 *     Motion, to keep it a simple CSS transform on the bar element only.
 *     The outer card hover uses Framer Motion spring physics.
 *  3. Grain texture via `.grain` CSS class (defined in globals.css).
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { BookOpen } from "lucide-react";
import type { Course } from "@/types";
import { itemVariant } from "@/lib/animations";

type IconName = keyof typeof LucideIcons;

// Gradient palettes cycled by course index
const GRADIENTS = [
  "from-indigo-500/10 via-purple-500/5 to-transparent",
  "from-cyan-500/10 via-blue-500/5 to-transparent",
  "from-emerald-500/10 via-teal-500/5 to-transparent",
  "from-rose-500/10 via-pink-500/5 to-transparent",
];

const ICON_COLORS = [
  "text-indigo-400",
  "text-cyan-400",
  "text-emerald-400",
  "text-rose-400",
];

interface Props {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: Props) {
  const [barWidth, setBarWidth] = useState(0);

  // Animate progress bar from 0 → actual value after mount
  useEffect(() => {
    const timeout = setTimeout(() => setBarWidth(course.progress), 300);
    return () => clearTimeout(timeout);
  }, [course.progress]);

  // Resolve Lucide icon by name from the DB; fall back to BookOpen
  const iconKey = course.icon_name as IconName;
  const IconComponent =
    iconKey in LucideIcons &&
    typeof (LucideIcons as Record<string, unknown>)[iconKey] === "function"
      ? (LucideIcons[iconKey] as React.FC<{ size?: number; className?: string }>)
      : BookOpen;

  const gradientColors = [
    { primary: "rgba(99,102,241,0.15)", secondary: "rgba(168,85,247,0.08)" },
    { primary: "rgba(6,182,212,0.15)", secondary: "rgba(59,130,246,0.08)" },
    { primary: "rgba(16,185,129,0.15)", secondary: "rgba(20,184,166,0.08)" },
    { primary: "rgba(244,63,94,0.15)", secondary: "rgba(236,72,153,0.08)" },
  ];

  const colors = gradientColors[index % gradientColors.length];

  return (
    <motion.article
      variants={itemVariant}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 25px rgba(99, 102, 241, 0.15)",
        borderColor: "rgba(99, 102, 241, 0.4)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative rounded-2xl overflow-hidden border border-[#1e2a3a] bg-[#0f1420] grain p-5 flex flex-col gap-4"
    >
      {/* Abstract Gradient Mesh Background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${colors.primary} 0%, transparent 50%), 
                       radial-gradient(circle at 100% 100%, ${colors.secondary} 0%, transparent 50%)`,
        }}
      />

      {/* Icon + title */}
      <header className="relative flex items-start gap-3">
        <span className="p-2 rounded-lg bg-white/5 border border-white/10">
          <IconComponent size={18} className={ICON_COLORS[index % ICON_COLORS.length]} />
        </span>
        <h2 className="text-sm font-semibold text-slate-200 leading-snug pt-1">
          {course.title}
        </h2>
      </header>

      {/* Progress bar */}
      <div className="relative">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-slate-500">Progress</span>
          <span className="text-xs font-medium text-slate-300">
            {course.progress}%
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-[width] duration-1000 ease-out"
            style={{ width: `${barWidth}%` }}
          />
        </div>
      </div>
    </motion.article>
  );
}
