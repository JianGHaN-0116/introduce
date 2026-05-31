"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  variant?: "default" | "alt" | "dark";
}

export default function SectionWrapper({
  children,
  id,
  className = "",
  variant = "default",
}: SectionWrapperProps) {
  const variantClasses = {
    default: "bg-neutral-50",
    alt: "bg-neutral-100/50",
    dark: "bg-neutral-950 text-neutral-50",
  };

  return (
    <motion.section
      id={id}
      className={`py-24 md:py-32 px-6 md:px-12 lg:px-24 ${variantClasses[variant]} ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </motion.section>
  );
}
