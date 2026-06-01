"use client";

import { motion } from "framer-motion";
import { useConfig } from "./ConfigProvider";
import SectionWrapper from "./SectionWrapper";
import { FlaskConical, Terminal, GraduationCap } from "lucide-react";
import { useLang } from "./LangProvider";

const iconMap = {
  flask: FlaskConical,
  terminal: Terminal,
  "graduation-cap": GraduationCap,
};

export default function About() {
  const { t } = useLang();
  const config = useConfig();

  if (!config || !config.about?.background) return null;

  return (
    <SectionWrapper id="about">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm text-neutral-400 font-medium tracking-wide uppercase">
              {t.about.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2 text-neutral-900">
              {config.name}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-neutral-500 leading-relaxed"
          >
            {config.about.background}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-500 leading-relaxed"
          >
            {config.about.interests}
          </motion.p>
        </div>

        <div className="space-y-4">
          {config.about.cards.map((card, i) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap] || FlaskConical;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-xl p-5 bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-lg hover:shadow-neutral-200/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 group-hover:bg-neutral-200 transition-colors">
                    <Icon size={18} className="text-neutral-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-800 mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
