"use client";

import { motion } from "framer-motion";
import { useConfig } from "./ConfigProvider";
import SectionWrapper from "./SectionWrapper";
import { useLang } from "./LangProvider";

const categoryColors: Record<string, string> = {
  programming: "border-cyan-200 bg-cyan-50 text-cyan-700",
  security: "border-red-200 bg-red-50 text-red-700",
  "machine learning": "border-violet-200 bg-violet-50 text-violet-700",
  systems: "border-indigo-200 bg-indigo-50 text-indigo-700",
  tools: "border-amber-200 bg-amber-50 text-amber-700",
};

const categoryAccents: Record<string, string> = {
  programming: "from-cyan-500 to-cyan-400",
  security: "from-red-500 to-red-400",
  "machine learning": "from-violet-500 to-violet-400",
  systems: "from-indigo-500 to-indigo-400",
  tools: "from-amber-500 to-amber-400",
};

export default function Skills() {
  const { t } = useLang();
  const config = useConfig();

  return (
    <SectionWrapper id="skills" variant="alt3">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          {t.skills.title}
        </h2>
        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {config.skills.map((group, i) => {
          const key = group.category.toLowerCase();
          const accent = categoryAccents[key] || "from-indigo-500 to-violet-400";
          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card card-accent-top rounded-xl p-6 group"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-1 h-4 rounded-full bg-gradient-to-b ${accent}`} />
                <h3 className="text-sm font-semibold text-gray-800">
                  {t.skills.categories[
                    key as keyof typeof t.skills.categories
                  ] || group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className={`px-2.5 py-1 text-xs rounded-lg border ${categoryColors[key] || "border-gray-200 bg-gray-50 text-gray-600"} transition-all duration-200 hover:scale-105`}
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
