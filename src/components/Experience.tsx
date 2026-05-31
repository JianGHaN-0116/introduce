"use client";

import { motion } from "framer-motion";
import { useConfig } from "./ConfigProvider";
import SectionWrapper from "./SectionWrapper";
import { useLang } from "./LangProvider";

export default function Experience() {
  const { t } = useLang();
  const config = useConfig();

  return (
    <SectionWrapper id="experience" variant="alt2">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          {t.experience.title}
        </h2>
        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" />
      </div>

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-200 via-violet-100 to-transparent" />

        {config.experience.map((exp, i) => (
          <motion.div
            key={exp.title + exp.year}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`relative flex flex-col md:flex-row gap-4 md:gap-8 mb-8 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-violet-400 border-2 border-white shadow-sm mt-1.5" />

            <div
              className={`md:w-1/2 pl-10 md:pl-0 ${
                i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
              }`}
            >
              <span className="text-xs text-indigo-400 font-medium">{exp.year}</span>
            </div>

            <div
              className={`md:w-1/2 pl-10 md:pl-0 ${
                i % 2 === 0 ? "md:pl-12" : "md:pr-12"
              }`}
            >
              <div className="glass-card card-accent-top rounded-xl p-5 group">
                <h3 className="text-sm font-semibold mb-1 text-gray-800 group-hover:text-indigo-600 transition-colors">{exp.title}</h3>
                <p className="text-xs text-indigo-400 mb-2">{exp.organization}</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
