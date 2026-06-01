"use client";

import { motion } from "framer-motion";
import { useConfig } from "./ConfigProvider";
import SectionWrapper from "./SectionWrapper";
import { useLang } from "./LangProvider";

export default function Experience() {
  const { t } = useLang();
  const config = useConfig();

  if (!config || !config.experience?.length) return null;

  return (
    <SectionWrapper id="experience">
      <div className="space-y-4 mb-12">
        <span className="text-sm text-neutral-400 font-medium tracking-wide uppercase">
          {t.experience.title}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
          Experience
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-200" />

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
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white border-2 border-neutral-300 mt-1.5" />

            <div
              className={`md:w-1/2 pl-10 md:pl-0 ${
                i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
              }`}
            >
              <span className="text-xs text-neutral-400 font-medium">{exp.year}</span>
            </div>

            <div
              className={`md:w-1/2 pl-10 md:pl-0 ${
                i % 2 === 0 ? "md:pl-12" : "md:pr-12"
              }`}
            >
              <div className="group rounded-xl p-5 bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-lg hover:shadow-neutral-200/50 hover:-translate-y-0.5 transition-all duration-300">
                <h3 className="text-sm font-semibold mb-1 text-neutral-800 group-hover:text-neutral-600 transition-colors">
                  {exp.title}
                </h3>
                <p className="text-xs text-neutral-400 mb-2">{exp.organization}</p>
                <p className="text-xs text-neutral-500 leading-relaxed">{exp.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
