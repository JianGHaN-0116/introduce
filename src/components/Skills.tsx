"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import SectionWrapper from "./SectionWrapper";

const categoryColors: Record<string, { border: string; text: string }> = {
  Programming: { border: "border-cyan-500/15", text: "text-cyan-300/50" },
  Security: { border: "border-red-500/15", text: "text-red-300/50" },
  "Machine Learning": {
    border: "border-violet-500/15",
    text: "text-violet-300/50",
  },
  Systems: { border: "border-emerald-500/15", text: "text-emerald-300/50" },
  Tools: { border: "border-amber-500/15", text: "text-amber-300/50" },
};

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Skills
        </h2>
        <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-400" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {siteConfig.skills.map((group, i) => {
          const colors = categoryColors[group.category] || {
            border: "border-white/10",
            text: "text-white/40",
          };
          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <h3
                className={`text-xs font-semibold uppercase tracking-wider mb-4 ${colors.text}`}
              >
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className={`text-[11px] px-2.5 py-1 rounded-md border ${colors.border} bg-white/[0.02] text-white/40`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
