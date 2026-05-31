"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import SectionWrapper from "./SectionWrapper";
import { useLang } from "./LangProvider";

export default function Skills() {
  const { t } = useLang();

  return (
    <SectionWrapper id="skills">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t.skills.title}
        </h2>
        <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-400" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {siteConfig.skills.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5"
          >
            <h3 className="text-sm font-semibold mb-4">
              {t.skills.categories[
                group.category.toLowerCase() as keyof typeof t.skills.categories
              ] || group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-xs rounded-lg border border-white/5 bg-white/[0.02] text-white/40 hover:text-white/60 hover:border-white/10 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
