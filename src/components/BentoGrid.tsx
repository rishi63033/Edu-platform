"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

interface Props {
  children: ReactNode;
}

export default function BentoGrid({ children }: Props) {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6 auto-rows-auto"
    >
      {children}
    </motion.section>
  );
}
