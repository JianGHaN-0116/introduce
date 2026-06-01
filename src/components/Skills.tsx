"use client";

import { motion } from "framer-motion";
import { useConfig } from "./ConfigProvider";
import SectionWrapper from "./SectionWrapper";
import { useLang } from "./LangProvider";

const accentColors = [
  "bg-cyan-500",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
];

export default function Skills() {
  const { t } = useLang();
  const config = useConfig();

  if (!config || !config.skills?.length) return null;

  return (
    <SectionWrapper id="skills" className="bg-neutral-100/50">
      <div className="space-y-4 mb-12">
        <span className="text-base text-neutral-400 font-medium tracking-wide uppercase">
          {t.skills.title}
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
          Skills
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {config.skills.map((group, i) => {
          const accent = accentColors[i % accentColors.length];
          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group rounded-xl p-5 bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-lg hover:shadow-neutral-200/50 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-1 h-4 rounded-full ${accent}`} />
                <h3 className="text-base font-semibold text-neutral-800">
                  {t.skills.categories[group.category.toLowerCase() as keyof typeof t.skills.categories] || group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium border border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-400 hover:bg-white transition-all"
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
