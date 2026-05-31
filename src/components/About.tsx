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

const cardColors = [
  { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-600", hoverBorder: "group-hover:border-cyan-400" },
  { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-600", hoverBorder: "group-hover:border-violet-400" },
  { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-600", hoverBorder: "group-hover:border-emerald-400" },
];

const cardTitleKeys = ["research", "engineering", "academic"] as const;

export default function About() {
  const { t } = useLang();
  const config = useConfig();

  return (
    <SectionWrapper id="about" variant="alt1">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          {t.about.title}
        </h2>
        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <p className="text-gray-500 leading-relaxed text-[15px]">
          {config.about.background}
        </p>
        <p className="text-gray-500 leading-relaxed text-[15px]">
          {config.about.interests}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {config.about.cards.map((card, i) => {
          const Icon = iconMap[card.icon];
          const titleKey = cardTitleKeys[i];
          const color = cardColors[i % cardColors.length];
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card card-accent-top rounded-xl p-6 group"
            >
              <div className={`w-10 h-10 rounded-lg ${color.bg} border ${color.border} ${color.hoverBorder} flex items-center justify-center mb-4 transition-colors`}>
                <Icon size={18} className={color.text} />
              </div>
              <h3 className="text-sm font-semibold mb-2 text-gray-800">
                {t.about.cards[titleKey]}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
