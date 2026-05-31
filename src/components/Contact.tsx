"use client";

import { motion } from "framer-motion";
import { useConfig } from "./ConfigProvider";
import SectionWrapper from "./SectionWrapper";
import { Mail, Code2 } from "lucide-react";
import { useLang } from "./LangProvider";

const contactItems = [
  { key: "email", icon: Mail, color: "bg-cyan-50 border-cyan-200 group-hover:border-cyan-400", iconColor: "text-cyan-600" },
  { key: "github", icon: Code2, color: "bg-violet-50 border-violet-200 group-hover:border-violet-400", iconColor: "text-violet-600" },
] as const;

export default function Contact() {
  const { t } = useLang();
  const config = useConfig();

  return (
    <SectionWrapper id="contact" variant="alt1">
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          {t.contact.title}
        </h2>
        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" />
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
              className="glass-card card-accent-top rounded-xl p-5 flex items-center gap-4 group"
            >
              <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center transition-colors`}>
                <Icon size={16} className={item.iconColor} />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-0.5">
                  {t.contact[item.key as keyof typeof t.contact]}
                </div>
                <div className="text-sm text-gray-700 group-hover:text-indigo-600 transition-colors truncate max-w-[200px]">
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
        <p className="text-sm text-gray-400 italic">
          &ldquo;{config.slogan}&rdquo;
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
