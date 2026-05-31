"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import SectionWrapper from "./SectionWrapper";
import { FlaskConical, Terminal, GraduationCap } from "lucide-react";
import { useLang } from "./LangProvider";

const iconMap = {
  flask: FlaskConical,
  terminal: Terminal,
  "graduation-cap": GraduationCap,
};

const cardTitleKeys = ["research", "engineering", "academic"] as const;

export default function About() {
  const { t } = useLang();

  return (
    <SectionWrapper id="about">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t.about.title}
        </h2>
        <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-400" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <p className="text-white/40 leading-relaxed">
          {siteConfig.about.background}
        </p>
        <p className="text-white/40 leading-relaxed">
          {siteConfig.about.interests}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {siteConfig.about.cards.map((card, i) => {
          const Icon = iconMap[card.icon];
          const titleKey = cardTitleKeys[i];
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center mb-4 group-hover:border-cyan-500/30 transition-colors">
                <Icon size={18} className="text-cyan-400/70" />
              </div>
              <h3 className="text-sm font-semibold mb-2">
                {t.about.cards[titleKey]}
              </h3>
              <p className="text-xs text-white/35 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
