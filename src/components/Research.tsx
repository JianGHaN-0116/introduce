"use client";

import { motion } from "framer-motion";
import { useConfig } from "./ConfigProvider";
import SectionWrapper from "./SectionWrapper";
import { useLang } from "./LangProvider";

export default function Research() {
  const { t } = useLang();
  const config = useConfig();

  if (!config || !config.research?.length) return null;

  return (
    <SectionWrapper id="research" className="bg-neutral-100/50">
      <div className="space-y-4 mb-12">
        <span className="text-sm text-neutral-400 font-medium tracking-wide uppercase">
          {t.research.title}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
          Research Areas
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {config.research.map((area, i) => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group rounded-xl p-6 bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-lg hover:shadow-neutral-200/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            <h3 className="text-sm font-semibold text-neutral-800 mb-2 group-hover:text-neutral-600 transition-colors">
              {area.title}
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed mb-4">
              {area.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {area.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-400 hover:bg-white transition-all"
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
