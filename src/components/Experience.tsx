"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import SectionWrapper from "./SectionWrapper";

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Experience
        </h2>
        <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-400" />
      </div>

      <div className="relative">
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/20 via-violet-500/20 to-transparent" />

        <div className="space-y-8">
          {siteConfig.experience.map((exp, i) => (
            <motion.div
              key={exp.title + exp.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative pl-12 md:pl-20"
            >
              <div className="absolute left-2.5 md:left-6.5 top-1.5 w-3 h-3 rounded-full border-2 border-cyan-400/40 bg-[#050510]" />

              <div className="glass-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                  <h3 className="text-sm font-semibold">{exp.title}</h3>
                  <span className="text-[10px] text-white/25 font-mono">
                    {exp.year}
                  </span>
                </div>
                <p className="text-xs text-cyan-400/50 mb-2">
                  {exp.organization}
                </p>
                <p className="text-xs text-white/30 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
