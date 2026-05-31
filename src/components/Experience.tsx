"use client";

import { motion } from "framer-motion";
import { useConfig } from "./ConfigProvider";
import SectionWrapper from "./SectionWrapper";
import { useLang } from "./LangProvider";

export default function Experience() {
  const { t } = useLang();
  const config = useConfig();

  return (
    <SectionWrapper id="experience">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
          {t.experience.title}
        </h2>
        <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-600 to-violet-600" />
      </div>

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-zinc-200 via-zinc-100 to-transparent" />

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
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-500 border border-cyan-200 mt-2" />

            <div
              className={`md:w-1/2 pl-10 md:pl-0 ${
                i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
              }`}
            >
              <span className="text-xs text-zinc-400">{exp.year}</span>
            </div>

            <div
              className={`md:w-1/2 pl-10 md:pl-0 ${
                i % 2 === 0 ? "md:pl-12" : "md:pr-12"
              }`}
            >
              <div className="glass-card rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5">
                <h3 className="text-sm font-semibold mb-1 text-zinc-800">{exp.title}</h3>
                <p className="text-xs text-zinc-400 mb-2">{exp.organization}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">
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
