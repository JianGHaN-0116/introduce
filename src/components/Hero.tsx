"use client";

import { motion } from "framer-motion";
import { useConfig } from "./ConfigProvider";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLang } from "./LangProvider";

const techRadar = [
  { label: "Network Security", x: 83.6, y: 50 },
  { label: "AI/ML", x: 77.8, y: 14.4 },
  { label: "IPv6", x: 43.3, y: 7.1 },
  { label: "Python", x: 15.5, y: 30.5 },
  { label: "Pen Testing", x: 15.5, y: 69.5 },
  { label: "Traffic Analysis", x: 69.8, y: 35.3 },
  { label: "RL", x: 30.7, y: 11.2 },
  { label: "Dist. Systems", x: 22.8, y: 50 },
  { label: "LLM", x: 30.7, y: 88.8 },
  { label: "Privacy Comp.", x: 69.8, y: 64.7 },
];

export default function Hero() {
  const { t } = useLang();
  const config = useConfig();

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-xs text-indigo-600 mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              {config.subtitle}
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
            {t.hero.greeting}{" "}
            <span className="gradient-text-hero">{config.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-base md:text-lg text-gray-500 leading-relaxed max-w-xl"
          >
            {config.heroDescription}
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
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300"
            >
              {t.hero.viewProjects}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 shadow-sm"
            >
              {t.hero.contactMe}
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
            <div className="absolute inset-0 rounded-full border border-indigo-100" />
            <div className="absolute inset-8 rounded-full border border-indigo-50" />
            <div className="absolute inset-16 rounded-full border border-gray-100" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-100 to-violet-100 border-2 border-white shadow-lg flex items-center justify-center">
                <img
                  src={config.avatar}
                  alt={config.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
            </div>

            {techRadar.map((item, i) => (
              <motion.div
                key={i}
                className="absolute text-[10px] whitespace-nowrap"
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.05 }}
              >
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-indigo-100 bg-white text-indigo-500 shadow-sm">
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
        <ChevronDown size={20} className="text-indigo-300" />
      </motion.div>
    </section>
  );
}
