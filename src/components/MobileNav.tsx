"use client";

/**
 * MobileNav — bottom navigation bar shown on < md screens
 * Replaces sidebar on mobile as required by spec.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
} from "lucide-react";

const ITEMS = [
  { id: "dashboard", label: "Home", Icon: LayoutDashboard },
  { id: "courses", label: "Courses", Icon: BookOpen },
  { id: "progress", label: "Progress", Icon: BarChart2 },
  { id: "settings", label: "Settings", Icon: Settings },
];

export default function MobileNav() {
  const [active, setActive] = useState("dashboard");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex items-center justify-around bg-[#0f1420]/90 backdrop-blur-md border-t border-[#1e2a3a] px-2 py-2 safe-b">
      {ITEMS.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => setActive(id)}
          className="relative flex flex-col items-center gap-0.5 px-4 py-1"
        >
          {active === id && (
            <motion.span
              layoutId="mobile-pill"
              className="absolute inset-0 rounded-xl bg-indigo-500/15"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <Icon
            size={18}
            className={`relative transition-colors ${
              active === id ? "text-indigo-400" : "text-slate-500"
            }`}
          />
          <span
            className={`relative text-[10px] transition-colors ${
              active === id ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
}
