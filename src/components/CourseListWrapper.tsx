"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function CourseListWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="contents" // Grid item behavior preserved
    >
      {children}
    </motion.div>
  );
}
