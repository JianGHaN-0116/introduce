"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  variant?: "default" | "alt1" | "alt2" | "alt3";
}

const variantStyles = {
  default: "",
  alt1: "section-gradient-1",
  alt2: "section-gradient-2",
  alt3: "section-gradient-3",
};

export default function SectionWrapper({
  children,
  id,
  className = "",
  variant = "default",
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className={`py-24 px-6 md:px-12 lg:px-24 ${variantStyles[variant]} ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </motion.section>
  );
}
