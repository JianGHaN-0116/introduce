"use client";

import { motion } from "framer-motion";
import { useConfig } from "./ConfigProvider";
import SectionWrapper from "./SectionWrapper";
import { useLang } from "./LangProvider";

export default function Research() {
  const { t } = useLang();
  const config = useConfig();

  return (
    <SectionWrapper id="research">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
          {t.research.title}
        </h2>
        <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-600 to-violet-600" />
        <p className="text-zinc-500 max-w-2xl">{t.research.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {config.research.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 group"
          >
            <h3 className="text-sm font-semibold mb-2 text-zinc-800 group-hover:text-cyan-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed mb-4">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] rounded border border-zinc-200 bg-zinc-50 text-zinc-500"
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
