"use client";

import { motion } from "framer-motion";
import { useConfig } from "./ConfigProvider";
import SectionWrapper from "./SectionWrapper";
import { useLang } from "./LangProvider";

const tagColors = [
  "border-cyan-200 bg-cyan-50 text-cyan-700",
  "border-violet-200 bg-violet-50 text-violet-700",
  "border-indigo-200 bg-indigo-50 text-indigo-700",
  "border-emerald-200 bg-emerald-50 text-emerald-700",
  "border-amber-200 bg-amber-50 text-amber-700",
];

export default function Research() {
  const { t } = useLang();
  const config = useConfig();

  return (
    <SectionWrapper id="research" variant="alt2">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          {t.research.title}
        </h2>
        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" />
        <p className="text-gray-500 max-w-2xl text-[15px]">{t.research.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {config.research.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-card card-accent-top rounded-xl p-6 group"
          >
            <h3 className="text-sm font-semibold mb-2 text-gray-800 group-hover:text-indigo-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, j) => (
                <span
                  key={tag}
                  className={`px-2.5 py-0.5 text-[10px] rounded-md border ${tagColors[(i + j) % tagColors.length]}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
