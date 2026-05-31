"use client";

import { motion } from "framer-motion";
import { useConfig } from "./ConfigProvider";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLang } from "./LangProvider";

export default function Hero() {
  const { t } = useLang();
  const config = useConfig();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950 text-neutral-50"
    >
      {/* Background dot grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, #525252 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Glow effects */}
      <div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-24 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {config.subtitle}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white"
            >
              {t.hero.greeting}{" "}
              <span className="text-neutral-500">{config.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-neutral-400 leading-relaxed max-w-lg"
            >
              {config.heroDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-neutral-900 text-sm font-medium hover:bg-neutral-200 transition-all duration-200"
              >
                {t.hero.viewProjects}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-sm font-medium text-neutral-300 hover:text-white hover:border-white/30 transition-all duration-200"
              >
                {t.hero.contactMe}
              </a>
            </motion.div>
          </div>

          {/* Right - Avatar card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 -m-8 border border-white/5 rounded-3xl" />
              <div className="absolute inset-0 -m-16 border border-white/[0.02] rounded-3xl" />
              <div className="relative w-72 h-72 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10">
                  <img
                    src={config.avatar}
                    alt={config.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">{config.name}</div>
                  <div className="text-neutral-500 text-sm">{config.title}</div>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 text-[10px] rounded-full border border-white/10 text-neutral-400">
                    Network Security
                  </span>
                  <span className="px-2 py-0.5 text-[10px] rounded-full border border-white/10 text-neutral-400">
                    AI/ML
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={20} className="text-neutral-600" />
      </motion.div>
    </section>
  );
}
