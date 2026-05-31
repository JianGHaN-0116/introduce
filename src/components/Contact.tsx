"use client";

import { motion } from "framer-motion";
import { useConfig } from "./ConfigProvider";
import SectionWrapper from "./SectionWrapper";
import { Mail, Code2 } from "lucide-react";
import { useLang } from "./LangProvider";

const contactItems = [
  { key: "email", icon: Mail },
  { key: "github", icon: Code2 },
] as const;

export default function Contact() {
  const { t } = useLang();
  const config = useConfig();

  return (
    <SectionWrapper id="contact">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
          {t.contact.title}
        </h2>
        <div className="w-12 h-[2px] bg-gradient-to-r from-cyan-600 to-violet-600" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {contactItems.map((item, i) => {
          const Icon = item.icon;
          const value = config[item.key as keyof typeof config];
          if (typeof value !== "string") return null;
          const href = item.key === "email" ? `mailto:${value}` : value;
          return (
            <motion.a
              key={item.key}
              href={href}
              target={item.key === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card rounded-xl p-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center group-hover:border-cyan-300 transition-colors">
                <Icon size={16} className="text-cyan-600" />
              </div>
              <div>
                <div className="text-xs text-zinc-400 mb-0.5">
                  {t.contact[item.key as keyof typeof t.contact]}
                </div>
                <div className="text-sm text-zinc-700 group-hover:text-zinc-900 transition-colors truncate max-w-[200px]">
                  {value}
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-sm text-zinc-400 italic">
          &ldquo;{config.slogan}&rdquo;
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
