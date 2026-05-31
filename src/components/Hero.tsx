"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { ArrowRight, ChevronDown } from "lucide-react";

const techRadar = [
  { label: "Network Security", x: 83.6, y: 50 },
  { label: "AI/ML", x: 77.8, y: 14.4 },
  { label: "IPv6", x: 43.3, y: 7.1 },
  { label: "Python", x: 15.5, y: 30.5 },
  { label: "Penetration Testing", x: 15.5, y: 69.5 },
  { label: "Traffic Analysis", x: 69.8, y: 35.3 },
  { label: "Reinforcement Learning", x: 30.7, y: 11.2 },
  { label: "Distributed Systems", x: 22.8, y: 50 },
  { label: "LLM", x: 30.7, y: 88.8 },
  { label: "Privacy Computing", x: 69.8, y: 64.7 },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 pt-20"
    >
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-3 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-white/50 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {siteConfig.subtitle}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text-hero">{siteConfig.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-base md:text-lg text-white/40 leading-relaxed max-w-xl"
          >
            {siteConfig.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#050510] text-sm font-medium hover:bg-white/90 transition-all duration-200"
            >
              View Projects
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-sm font-medium text-white/70 hover:text-white hover:border-white/20 hover:bg-white/[0.03] transition-all duration-200"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="lg:col-span-2 hidden lg:flex items-center justify-center"
        >
          <div className="relative w-80 h-80">
            <div className="absolute inset-0 rounded-full border border-white/5" />
            <div className="absolute inset-8 rounded-full border border-white/5" />
            <div className="absolute inset-16 rounded-full border border-white/5" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center">
                <img
                  src={siteConfig.avatar}
                  alt={siteConfig.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
            </div>

            {techRadar.map((item, i) => (
              <motion.div
                key={i}
                className="absolute text-[10px] text-white/30 whitespace-nowrap"
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.05 }}
              >
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-white/5 bg-white/[0.02]">
                    {item.label}
                  </span>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={20} className="text-white/20" />
      </motion.div>
    </section>
  );
}
