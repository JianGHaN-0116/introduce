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

  if (!config || !config.email) return null;

  return (
    <SectionWrapper id="contact" variant="dark">
      <div className="space-y-4 mb-12">
        <span className="text-sm text-neutral-500 font-medium tracking-wide uppercase">
          {t.contact.title}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Get in Touch
        </h2>
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
              className="group flex items-center gap-4 p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Icon size={16} className="text-neutral-400" />
              </div>
              <div>
                <div className="text-xs text-neutral-500 mb-0.5">
                  {t.contact[item.key as keyof typeof t.contact]}
                </div>
                <div className="text-sm text-neutral-300 group-hover:text-white transition-colors truncate max-w-[200px]">
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
        <p className="text-sm text-neutral-500 italic">
          &ldquo;{config.slogan}&rdquo;
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
