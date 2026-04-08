"use client";

import { motion } from "framer-motion";

export function AnimatedSection({ children, className, delay = 0, id }: { children: React.ReactNode; className?: string; delay?: number; id?: string }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </motion.section>
  );
}
